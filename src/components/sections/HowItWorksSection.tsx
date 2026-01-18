import { Hand, MapPin, Bell, Radio, CheckCircle } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Hand,
    title: "Activate SOS Silently",
    description: "User triggers alert through gesture, tap pattern, or voice command without visible interaction.",
    color: "primary",
  },
  {
    number: "02",
    icon: MapPin,
    title: "Capture Live Location",
    description: "System immediately captures and continuously updates the user's GPS coordinates.",
    color: "secondary",
  },
  {
    number: "03",
    icon: Bell,
    title: "Alert Trusted Contacts",
    description: "Instant notifications sent to pre-configured emergency contacts and authorities.",
    color: "accent",
  },
  {
    number: "04",
    icon: Radio,
    title: "Enable Continuous Tracking",
    description: "Real-time location sharing remains active until the emergency is resolved.",
    color: "warning",
  },
  {
    number: "05",
    icon: CheckCircle,
    title: "Emergency Resolved",
    description: "User confirms safety, tracking stops, and incident report is generated.",
    color: "success",
  },
];

export const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
            Process
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            How It{" "}
            <span className="text-gradient-emergency">Works</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            A seamless five-step process designed for maximum efficiency during critical moments.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line - Desktop */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-success opacity-20" />

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className="relative animate-fade-in-up"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Card */}
                <div className="bg-card rounded-2xl p-6 border border-border hover:border-primary/20 hover:shadow-xl transition-all duration-300 group h-full">
                  {/* Number Badge */}
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-5 font-display font-bold text-lg ${
                    step.color === 'primary' ? 'gradient-emergency text-primary-foreground shadow-emergency' :
                    step.color === 'secondary' ? 'gradient-safety text-secondary-foreground shadow-safety' :
                    step.color === 'accent' ? 'bg-accent text-accent-foreground' :
                    step.color === 'warning' ? 'bg-warning text-warning-foreground' :
                    'bg-success text-success-foreground'
                  } group-hover:scale-110 transition-transform duration-300`}>
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className={`w-10 h-10 rounded-lg mb-4 flex items-center justify-center ${
                    step.color === 'primary' ? 'bg-primary/10' :
                    step.color === 'secondary' ? 'bg-secondary/10' :
                    step.color === 'accent' ? 'bg-accent/10' :
                    step.color === 'warning' ? 'bg-warning/10' :
                    'bg-success/10'
                  }`}>
                    <step.icon className={`w-5 h-5 ${
                      step.color === 'primary' ? 'text-primary' :
                      step.color === 'secondary' ? 'text-secondary' :
                      step.color === 'accent' ? 'text-accent' :
                      step.color === 'warning' ? 'text-warning' :
                      'text-success'
                    }`} />
                  </div>

                  {/* Content */}
                  <h3 className="font-display text-lg font-bold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow - Desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-24 -right-2 transform translate-x-1/2 z-10">
                    <div className="w-4 h-4 rounded-full bg-background border-2 border-muted" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
