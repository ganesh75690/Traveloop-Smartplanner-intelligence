// Reusable Button — variants: primary | secondary | ghost | danger | outline
export default function Button({
  children,
  variant = "primary",
  size = "md",
  onClick,
  disabled = false,
  fullWidth = false,
  type = "button",
  className = "",
}) {
  const base =
    "inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none";

  const sizes = {
    sm:  "px-3 py-1.5 text-xs",
    md:  "px-4 py-2.5 text-sm",
    lg:  "px-6 py-3 text-sm",
    xl:  "px-8 py-3.5 text-base",
  };

  const variants = {
    primary:
      "bg-[#006CE4] text-white hover:bg-[#0057B8] hover:-translate-y-0.5 active:translate-y-0 shadow-sm hover:shadow-md",
    secondary:
      "bg-[#E8F1FD] text-[#006CE4] hover:bg-[#D1E4FB] hover:-translate-y-0.5 active:translate-y-0",
    outline:
      "bg-white text-[#006CE4] border border-[#006CE4] hover:bg-[#E8F1FD] hover:-translate-y-0.5 active:translate-y-0",
    ghost:
      "bg-transparent text-[#6B7280] hover:text-[#1A1A2E] hover:bg-[#F3F4F6]",
    danger:
      "bg-[#EF4444] text-white hover:bg-[#DC2626] hover:-translate-y-0.5 active:translate-y-0 shadow-sm",
    accent:
      "bg-[#FF6B35] text-white hover:bg-[#E85A25] hover:-translate-y-0.5 active:translate-y-0 shadow-sm",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${sizes[size]} ${variants[variant] || variants.primary} ${fullWidth ? "w-full" : ""} ${className}`}
    >
      {children}
    </button>
  );
}
