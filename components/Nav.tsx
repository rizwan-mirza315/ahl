"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState } from "react";

const links = [
  { href: "/standings", label: "STANDINGS" },
  { href: "/schedule", label: "SCHEDULE" },
  { href: "/stats", label: "STATS" },
  { href: "/teams/dc", label: "TEAMS" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-black sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex items-center h-[88px]">
        {/* Logo + league name */}
        <Link href="/" className="flex items-center gap-3 flex-shrink-0" onClick={() => setOpen(false)}>
          <Image src="/ahl-logo-v2.png" alt="AHL" width={80} height={80} />
          <span className="text-white text-[28px] font-black tracking-tight leading-none italic">AHL</span>
        </Link>

        {/* Hamburger on the right */}
        <button
          onClick={() => setOpen((o) => !o)}
          className="ml-auto text-white p-2 flex-shrink-0"
          aria-label="Toggle menu"
        >
          {open ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          )}
        </button>
      </div>

      {/* Dropdown */}
      {open && (
        <div className="bg-black border-t border-[#222]">
          {links.map((link) => {
            const active =
              link.label === "STANDINGS" ? pathname === "/standings" :
              link.label === "STATS"     ? pathname === "/stats" :
              link.label === "SCHEDULE"  ? pathname === "/schedule" :
              link.label === "TEAMS"     ? pathname.startsWith("/teams") :
              false;
            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`flex items-center px-6 py-4 text-[13px] font-bold tracking-wider border-b border-[#1a1a1a] transition-colors ${
                  active
                    ? "text-white border-l-4 border-l-[#c8102e] pl-5"
                    : "text-[#999] hover:text-white hover:bg-[#111]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
