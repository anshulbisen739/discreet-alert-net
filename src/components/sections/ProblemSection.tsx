import { PhoneOff, AlertCircle, Clock, ShieldOff } from "lucide-react";

const problems = [
  {
    icon: PhoneOff,
    title: "Unable to Call",
    description: "In dangerous situations, making a phone call can alert the attacker and escalate the threat.",
  },
  {
    icon: AlertCircle,
    title: "Fear of Detection",
    description: "Victims often can't seek help openly without risking further harm to themselves.",
  },
  {
    icon: Clock,
    title: "Slow Response Time",
    description: "Traditional emergency systems require verbal communication, causing critical delays.",
  },
  {
    icon: ShieldOff,
    title: "Lack of Discreet Tools",
    description: "Most safety apps require visible interaction, making them impractical in emergencies.",
  },
];

export const ProblemSection = () => {
  return (
    <section id="about" className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
            The Challenge
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Why This System is{" "}
            <span className="text-gradient-emergency">Needed?</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Traditional emergency systems fail when victims cannot speak or make visible calls for help. We identified the critical gaps.
          </p>
        </div>

        {/* Problem Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {problems.map((problem, index) => (
            <div
              key={problem.title}
              className="group relative bg-card rounded-2xl p-6 lg:p-8 border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-xl animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <problem.icon className="w-7 h-7 text-primary" />
              </div>

              {/* Content */}
              <h3 className="font-display text-xl font-bold text-foreground mb-3">
                {problem.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {problem.description}
              </p>

              {/* Decorative Element */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-bl-[4rem] rounded-tr-2xl -z-10 group-hover:bg-primary/10 transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
