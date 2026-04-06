export default function OvrBadge({ ovr, size = "md" }: { ovr: number; size?: "sm" | "md" | "lg" }) {
  const color = { num: "#c8102e", shadow: "#7a0018", bg: "#fff0f2", border: "#c8102e" };

  const sizes = {
    sm: { num: "text-lg",    sub: "text-[8px]",  px: "px-2 py-0.5" },
    md: { num: "text-2xl",   sub: "text-[9px]",  px: "px-2.5 py-1" },
    lg: { num: "text-4xl",   sub: "text-[11px]", px: "px-3 py-1.5" },
  };

  const s = sizes[size];

  return (
    <div
      className={`inline-flex flex-col items-center rounded-lg border ${s.px}`}
      style={{ backgroundColor: color.bg, borderColor: color.border }}
    >
      <span
        className={`${s.num} font-black italic leading-none`}
        style={{
          color: color.num,
          textShadow: `1px 2px 0px ${color.shadow}`,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {ovr}
      </span>
      <span
        className={`${s.sub} font-black tracking-[0.15em] uppercase leading-none`}
        style={{ color: color.shadow }}
      >
        OVR
      </span>
    </div>
  );
}
