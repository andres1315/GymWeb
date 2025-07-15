// Componente reutilizable para seleccionar días
interface DaySelectorProps {
  value: string[];
  onChange: (value: string[]) => void;
  label: string;
  description?: string;
}

export function DaySelector({ value, onChange, label, description }: DaySelectorProps) {
  const days = [
    { label: "Lun", value: "monday", tooltip: "Lunes" },
    { label: "Mar", value: "tuesday", tooltip: "Martes" },
    { label: "Mie", value: "wednesday", tooltip: "Miércoles" },
    { label: "Jue", value: "thursday", tooltip: "Jueves" },
    { label: "Vie", value: "friday", tooltip: "Viernes" },
    { label: "Sab", value: "saturday", tooltip: "Sábado" },
    { label: "Dom", value: "sunday", tooltip: "Domingo" },
    { label: "Fes", value: "holiday", tooltip: "Festivo" },
  ];
  return (
    <div className="p-2 rounded-lg bg-gradient-to-r from-slate-500/10 to-emerald-700/10 border border-slate-500/20">
      <div className="font-medium mb-1">{label}</div>
      <div className="grid grid-cols-8 gap-2">
        {days.map((day) => {
          const checked = value.includes(day.value);
          return (
            <div key={day.label} className="text-center">
              <button
                type="button"
                className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-medium cursor-pointer transition-all border border-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-400 ${
                  checked
                    ? "bg-emerald-500 text-white shadow-lg"
                    : "bg-white/10 text-gray-400 hover:bg-white/20"
                }`}
                aria-pressed={checked}
                onClick={() => {
                  if (checked) {
                    onChange(value.filter((v: string) => v !== day.value));
                  } else {
                    onChange([...value, day.value]);
                  }
                }}
                title={day.tooltip}
              >
                {day.label}
              </button>
            </div>
          );
        })}
      </div>
      {description && (
        <p className="text-xs text-gray-400 mt-2">{description}</p>
      )}
    </div>
  );
}