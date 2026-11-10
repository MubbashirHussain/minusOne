import { ImageResponse } from "next/og";
export const alt = "Mubbashir Hussain — Design, Code & Motion";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OpenGraphImage() {
  return new ImageResponse(<div style={{ background: "#181b17", color: "#f5f4ec", width: "100%", height: "100%", display: "flex", flexDirection: "column", padding: 72, justifyContent: "space-between", fontFamily: "sans-serif" }}>
    <div style={{ display: "flex", fontSize: 24, color: "#bbff00" }}>MUBBASHIR HUSSAIN / CREATIVE DEVELOPER</div>
    <div style={{ display: "flex", fontSize: 110, letterSpacing: -6 }}>Design. Code. Motion.</div>
    <div style={{ display: "flex", fontSize: 28 }}>Notes from the space in between.</div>
  </div>, size);
}
