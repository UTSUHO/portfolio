import TabNav from "./tab-nav";

export default function HomeTabNav() {
  return (
    <div
      className="absolute z-40 box-border pointer-events-none"
      aria-label="Home tab navigation"
      style={{
        top: "calc(100vh - var(--height-navbar))",
        bottom: 0,
        right: 0,
        width: "calc((100% - var(--width-sidebar)) / 12 * 8)",
      }}
    >
      <div className="sticky w-full pointer-events-auto" style={{ top: 0 }}>
        <TabNav />
      </div>
    </div>
  );
}
