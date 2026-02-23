import { Hammer, TreePine, Paintbrush, Clock } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Hammer: <Hammer size={32} />,
  TreePine: <TreePine size={32} />,
  Brush: <Paintbrush size={32} />,
  Clock: <Clock size={32} />,
};

import { values } from "@/data/values";

export function ValuesSection() {
  return (
    <section className="py-16 md:py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value) => (
            <div
              key={value.id}
              className="text-center p-6 rounded-xl hover:bg-surface-2 transition-all duration-300 group"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent-50 text-accent mb-4 group-hover:bg-accent group-hover:text-white transition-all duration-300">
                {iconMap[value.icon] || <Hammer size={32} />}
              </div>
              <h3 className="font-heading text-lg font-semibold mb-2">
                {value.title}
              </h3>
              <p className="text-text-muted text-sm leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
