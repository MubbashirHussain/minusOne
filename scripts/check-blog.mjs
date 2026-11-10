import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { once } from 'node:events';

// Run after npm run build. Verify actual production responses, without a browser.
const port = process.env.BLOG_TEST_PORT || '3100';
const server = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '--hostname', '127.0.0.1', '--port', port], { stdio: ['ignore', 'pipe', 'pipe'] });
const origin = `http://127.0.0.1:${port}`;
let ready;
const started = new Promise(resolve => { ready = resolve; });
server.stdout.on('data', chunk => { if (chunk.toString().includes('Ready')) ready(); });
server.stderr.on('data', chunk => process.stderr.write(chunk));
const timer = setTimeout(() => { server.kill(); console.error('Production server startup timed out.'); process.exit(1); }, 30_000);
const expectedOrigin = new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://minus-one-hazel.vercel.app').origin;
try {
  await Promise.race([started, once(server, 'exit').then(() => { throw new Error('Production server exited before becoming ready.'); })]);
  for (const path of ['/', '/blog', '/blog/designing-motion-with-purpose', '/blog/a-responsive-portfolio-starts-with-content']) {
    const response = await fetch(origin + path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
    assert.ok(canonical, `${path}: canonical exists`);
    assert.equal(new URL(canonical).href, new URL(path, expectedOrigin).href, `${path}: canonical`);
    assert.ok(html.includes('href="/blog"'), `${path}: blog navigation`);
    if (path.startsWith('/blog')) {
      assert.equal((html.match(/<h1[\s>]/g) || []).length, 1, `${path}: one primary heading`);
      assert.ok(html.includes('application/ld+json'), `${path}: structured data`);
      assert.ok(html.includes('property="og:image"'), `${path}: social preview`);
      assert.ok(html.includes('name="description"'), `${path}: description`);
      assert.ok(html.includes(path === '/blog' ? 'The journal' : 'journal-prose'), `${path}: server-rendered content`);
    }
    console.log(`PASS ${path}: production HTML and metadata`);
  }
  const sitemap = await (await fetch(origin + '/sitemap.xml')).text();
  assert.ok(sitemap.includes('/blog/designing-motion-with-purpose'));
  assert.ok(sitemap.includes('/blog/a-responsive-portfolio-starts-with-content'));
  assert.ok(!sitemap.includes('/test'));
  const robots = await (await fetch(origin + '/robots.txt')).text();
  assert.ok(robots.includes('/sitemap.xml'));
  assert.ok(robots.includes('Disallow: /test'));
  assert.equal((await fetch(origin + '/blog/missing-post')).status, 404);
  const image = await fetch(origin + '/opengraph-image');
  assert.equal(image.status, 200);
  assert.ok(image.headers.get('content-type')?.includes('image/png'));
  console.log('PASS sitemap, robots, unknown article 404, and Open Graph PNG');
} catch (error) {
  console.error(error);
  process.exitCode = 1;
} finally {
  clearTimeout(timer);
  server.kill();
}
