import { Zap, Smartphone, DollarSign, TrendingUp, Smile, VolumeX } from "lucide-react";

const benefits = [
  {
    icon: Zap,
    title: "Fast Emergency Response",
    description: "Get help within minutes, not hours. Our system prioritizes speed above all.",
  },
  {
    icon: Smartphone,
    title: "No Hardware Required",
    description: "Works on any smartphone. No special devices or equipment needed.",
  },
  {
    icon: DollarSign,
    title: "Cost-effective Solution",
    description: "Affordable safety for everyone. No expensive subscriptions or fees.",
  },
  {
    icon: TrendingUp,
    title: "Highly Scalable",
    description: "From individual users to enterprise deployments. Grows with your needs.",
  },
  {
    icon: Smile,
    title: "Easy to Use",
    description: "Intuitive interface designed for all ages. No technical knowledge required.",
  },
  {
    icon: VolumeX,
    title: "Works Silently",
    description: "No audible alerts that could endanger you. Complete discretion guaranteed.",
  },
];

export const BenefitsSection = () => {
  return (
    <section className="py-20 lg:py-28 bg-muted/50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-secondary font-semibold text-sm uppercase tracking-wider mb-4">
            Benefits
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Why Choose{" "}
            <span className="text-gradient-safety">SilentSOS</span>?
          </h2>
          <p className="text-lg text-muted-foreground">
            Designed with your safety and convenience in mind. Here's what sets us apart.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              className="group relative bg-background rounded-2xl p-8 border border-border overflow-hidden hover:shadow-xl transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Background Gradient */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl gradient-safety flex items-center justify-center mb-6 shadow-safety group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon className="w-7 h-7 text-secondary-foreground" />
                </div>

                <h3 className="font-display text-xl font-bold text-foreground mb-3">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
