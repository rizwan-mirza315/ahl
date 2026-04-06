export default function OvrBadge({ ovr, size = "md" }: { ovr: number; size?: "sm" | "md" | "lg" }) {
  const color =
    ovr >= 85 ? { num: "#FFB800", shadow: "#a07400", bg: "#fff8e0", border: "#FFB800" } :
    ovr >= 75 ? { num: "#A8A8A8", shadow: "#555", bg: "#f5f5f5", border: "#bbb" } :
    ovr >= 65 ? { num: "#CD7F32", shadow: "#7a4510", bg: "#fff3ec", border: "#CD7F32" } :
                { num: "#888",    shadow: "#444", bg: "#f5f5f5", border: "#ccc" };

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
