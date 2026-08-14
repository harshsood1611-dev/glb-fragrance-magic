import { MODELS } from "@/lib/models";
import { setModel, toggleSpinZ } from "@/lib/stage";
import { useModel, useSpinZ } from "@/hooks/use-stage";
import { cn } from "@/lib/utils";

/** Small floating control to preview each uploaded GLB in the same scene. */
export function ModelSwitcher() {
  const { index } = useModel();
  const spinZ = useSpinZ();

  return (
    <div className="glass-panel pointer-events-auto fixed bottom-6 left-6 z-50 flex items-center gap-1 rounded-full p-1">
      {MODELS.map((model, i) => (
        <button
          key={model.id}
          type="button"
          onClick={() => setModel(i)}
          className={cn(
            "rounded-full px-4 py-2 font-mono text-[0.6rem] tracking-[0.25em] uppercase transition-colors",
            i === index
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {model.label}
        </button>
      ))}
      <span className="mx-1 h-5 w-px bg-border" aria-hidden />
      <button
        type="button"
        onClick={() => toggleSpinZ()}
        aria-pressed={spinZ}
        title="Toggle Z-axis tumble (or drag vertically in the atelier)"
        className={cn(
          "rounded-full px-4 py-2 font-mono text-[0.6rem] tracking-[0.25em] uppercase transition-colors",
          spinZ
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground",
        )}
      >
        Z Spin
      </button>
    </div>
  );
}
