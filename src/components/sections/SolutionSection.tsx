import { Shield, Zap, Cloud, MapPin } from "lucide-react";

const highlights = [
  { icon: Shield, label: "Silent SOS" },
  { icon: MapPin, label: "Real-time Tracking" },
  { icon: Cloud, label: "Cloud-based" },
  { icon: Zap, label: "Works Instantly" },
];

export const SolutionSection = () => {
  return (
    <section className="py-20 lg:py-28 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div className="animate-fade-in-up">
            <span className="inline-block text-secondary font-semibold text-sm uppercase tracking-wider mb-4">
              Our Solution
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Intelligent{" "}
              <span className="text-gradient-safety">Safety System</span>{" "}
              That Works Silently
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Our Silent Emergency Assistance System empowers users to send distress signals without making a sound. Using advanced gesture recognition, one-tap activation, and voice triggers, help is always within reach—even in the most threatening situations.
            </p>

            {/* Highlights Grid */}
            <div className="grid grid-cols-2 gap-4">
              {highlights.map((item, index) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 p-4 rounded-xl bg-background border border-border hover:border-secondary/30 hover:shadow-md transition-all duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-10 h-10 rounded-lg gradient-safety flex items-center justify-center shadow-safety">
                    <item.icon className="w-5 h-5 text-secondary-foreground" />
                  </div>
                  <span className="font-semibold text-foreground">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Diagram */}
          <div className="relative animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="bg-background rounded-3xl p-8 shadow-xl border border-border">
              {/* Workflow Diagram */}
              <div className="space-y-6">
                {/* Step 1 */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full gradient-emergency flex items-center justify-center shadow-emergency text-primary-foreground font-bold">
                    1
                  </div>
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full w-full gradient-emergency animate-pulse" />
                  </div>
                  <div className="bg-primary/10 rounded-lg px-4 py-2">
                    <span className="text-sm font-medium text-primary">SOS Activated</span>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full gradient-safety flex items-center justify-center shadow-safety text-secondary-foreground font-bold">
                    2
                  </div>
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full w-3/4 gradient-safety animate-pulse" style={{ animationDelay: '0.5s' }} />
                  </div>
                  <div className="bg-secondary/10 rounded-lg px-4 py-2">
                    <span className="text-sm font-medium text-secondary">Location Captured</span>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-bold shadow-lg">
                    3
                  </div>
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full w-1/2 bg-accent animate-pulse" style={{ animationDelay: '1s' }} />
                  </div>
                  <div className="bg-accent/10 rounded-lg px-4 py-2">
                    <span className="text-sm font-medium text-accent">Alerts Sent</span>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-success flex items-center justify-center text-success-foreground font-bold shadow-lg">
                    4
                  </div>
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full w-1/4 bg-success animate-pulse" style={{ animationDelay: '1.5s' }} />
                  </div>
                  <div className="bg-success/10 rounded-lg px-4 py-2">
                    <span className="text-sm font-medium text-success">Help Arrives</span>
                  </div>
                </div>
              </div>

              {/* Decorative */}
              <div className="mt-8 pt-6 border-t border-border">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Average response time</span>
                  <span className="font-bold text-foreground">Under 2 minutes</span>
                </div>
              </div>
            </div>

            {/* Background Decoration */}
            <div className="absolute -z-10 top-8 left-8 right-8 bottom-8 rounded-3xl gradient-safety opacity-20 blur-xl" />
          </div>
        </div>
      </div>
    </section>
  );
};
