"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Star } from "lucide-react";
import { testimonials } from "@/data/testimonials";

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const prev = () =>
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () =>
    setCurrent((c) => (c + 1) % testimonials.length);

  const testimonial = testimonials[current];

  return (
    <section className="py-16 md:py-24 bg-surface-2">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-accent text-sm font-medium tracking-widest uppercase mb-2">
            Témoignages
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold">
            Ce que disent nos clients
          </h2>
        </div>

        <div className="relative bg-white rounded-2xl p-8 md:p-12 shadow-premium">
          <Quote
            size={48}
            className="text-accent-100 absolute top-6 left-6"
          />

          <div className="text-center relative z-10">
            <div className="flex justify-center gap-0.5 mb-6">
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  size={20}
                  className={
                    i < testimonial.rating
                      ? "fill-accent-alt text-accent-alt"
                      : "text-border"
                  }
                />
              ))}
            </div>

            <blockquote className="text-lg md:text-xl text-primary leading-relaxed mb-6 italic">
              &ldquo;{testimonial.text}&rdquo;
            </blockquote>

            <div>
              <p className="font-heading font-semibold text-primary">
                {testimonial.name}
              </p>
              <p className="text-text-muted text-sm">{testimonial.location}</p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="p-2 rounded-full border border-border hover:bg-surface-2 transition-colors"
              aria-label="Précédent"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    i === current ? "bg-accent w-6" : "bg-border"
                  }`}
                  aria-label={`Témoignage ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-2 rounded-full border border-border hover:bg-surface-2 transition-colors"
              aria-label="Suivant"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
