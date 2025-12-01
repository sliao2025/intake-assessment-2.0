export default function MultiSelectGroup({
  options,
  values,
  onChange,
}: {
  options: { key: string; label: string; none?: boolean }[];
  values: string[];
  onChange: (next: string[]) => void;
}) {
  const toggle = (k: string, none?: boolean) => {
    if (none) {
      // "None" is exclusive
      onChange(values.includes(k) ? [] : [k]);
      return;
    }
    // remove any existing "none"
    const cleaned = values.filter((v) => v !== "none");
    if (cleaned.includes(k)) {
      onChange(cleaned.filter((v) => v !== k));
    } else {
      onChange([...cleaned, k]);
    }
  };

  return (
    <div className="grid grid-cols-2 xl:grid-cols-3 gap-2">
      {options.map((opt) => {
        const active = values.includes(opt.key);
        return (
          <button
            key={opt.key}
            type="button"
            onClick={() => toggle(opt.key, opt.none)}
            className={`w-full text-left rounded-xl border border-b-4 px-3 py-2 ${
              active ? "border-[#113e60] bg-white" : "border-slate-300 bg-white"
            }`}
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                readOnly
                checked={active}
                className="h-4 w-4 rounded border-slate-400"
              />
              <span className="text-slate-800">{opt.label}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
