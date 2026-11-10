"use client";

// Page content stays server-rendered. The optional node intro can be added as
// an overlay here without replacing children or blocking article indexing.
export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
