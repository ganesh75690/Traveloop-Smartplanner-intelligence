// Reusable Badge — variants: default | success | warning | danger | info | primary
export default function Badge({ label, variant = "default", className = "" }) {
  const variants = {
    default: "bg-[#F3F4F6] text-[#6B7280]",
    primary: "bg-[#E8F1FD] text-[#006CE4]",
    success: "bg-[#E6F7EE] text-[#00A651]",
    warning: "bg-[#FFFBEB] text-[#D97706]",
    danger:  "bg-[#FEF2F2] text-[#EF4444]",
    info:    "bg-[#EFF6FF] text-[#3B82F6]",
    accent:  "bg-[#FFF0EB] text-[#FF6B35]",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${variants[variant] || variants.default} ${className}`}
    >
      {label}
    </span>
  );
}
