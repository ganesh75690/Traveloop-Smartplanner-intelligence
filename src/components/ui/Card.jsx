// Reusable Card component
export default function Card({ children, className = "", onClick, hover = false }) {
  return (
    <div
      onClick={onClick}
      className={`bg-white border border-[#E5E9F2] rounded-2xl shadow-sm
        ${hover
          ? "hover:border-[#006CE4]/30 hover:shadow-md transition-all duration-200 cursor-pointer"
          : ""
        }
        ${className}`}
    >
      {children}
    </div>
  );
}
