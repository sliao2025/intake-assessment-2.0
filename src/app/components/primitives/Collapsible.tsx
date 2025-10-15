import { ChevronDown } from "lucide-react";

export default function Collapsible({
  title,
  children,
  open,
  setOpen,
  enabled,
  subtitle,
  complete,
}: {
  title: string;
  subtitle?: React.ReactNode;
  open: boolean;
  setOpen: (v: boolean) => void;
  enabled: boolean;
  children: React.ReactNode;
  complete: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border px-4 py-3 ${
        complete ? "bg-green-50" : "bg-white"
      } ${
        enabled
          ? complete
            ? "border-green-500"
            : "border-slate-300"
          : "border-slate-200 opacity-60"
      }`}
    >
      <button
        type="button"
        disabled={!enabled}
        onClick={() => enabled && setOpen(!open)}
        className={`w-full flex items-center justify-between text-left ${
          enabled ? "cursor-pointer" : "cursor-not-allowed"
        }`}
      >
        <div>
          <div className="font-semibold text-slate-900">{title}</div>
        </div>
        <ChevronDown
          className={`h-5 w-5 transition-transform ${
            open ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>
      {subtitle && (
        <div className="mt-1 text-slate-500 text-sm">{subtitle}</div>
      )}
      {open && <div className="pt-3">{children}</div>}
    </div>
  );
}
