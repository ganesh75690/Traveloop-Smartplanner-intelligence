// Reusable Input component
export default function Input({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  className = "",
  ...rest
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label className="text-xs font-semibold text-[#374151] uppercase tracking-wider">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full bg-[#F8FAFF] border rounded-xl px-4 py-3 text-sm text-[#1A1A2E] placeholder-[#9CA3AF] outline-none transition-all duration-200 font-medium
          ${error
            ? "border-[#EF4444] focus:border-[#EF4444] focus:ring-2 focus:ring-[#EF4444]/20"
            : "border-[#E5E9F2] focus:border-[#006CE4] focus:ring-2 focus:ring-[#006CE4]/15 hover:border-[#C7D4F0]"
          }`}
        {...rest}
      />
      {error && <p className="text-xs text-[#EF4444] font-medium">{error}</p>}
    </div>
  );
}
