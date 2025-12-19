export default function SocialIcon({ icon: Icon, label }) {
  return (
    <button
      aria-label={label}
      className="
        w-12 h-12 flex items-center justify-center
        rounded-2xl
        bg-[#eef4ee]
        text-green-700
        shadow-[4px_4px_8px_#cfd8cf,-4px_-4px_8px_#ffffff]
        hover:text-green-900
        hover:-translate-y-[1px]
        transition-all
        active:shadow-[inset_4px_4px_8px_#cfd8cf,inset_-4px_-4px_8px_#ffffff]
      "
    >
      <Icon size={20} />
    </button>
  );
}
