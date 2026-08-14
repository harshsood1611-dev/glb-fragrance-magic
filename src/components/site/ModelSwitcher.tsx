import { MODELS } from "@/lib/models";
import { setModel } from "@/lib/stage";
import { useModel } from "@/hooks/use-stage";
import { cn } from "@/lib/utils";

/** Small floating control to preview each uploaded GLB in the same scene. */
export function ModelSwitcher() {
  const { index } = useModel();

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
    </div>
  );
}
