import { 
  Volume2, 
  Hand, 
  Mic, 
  MapPin, 
  Users, 
  Cloud, 
  Lock, 
  Battery, 
  ShieldCheck 
} from "lucide-react";

const features = [
  {
    icon: Volume2,
    title: "Silent SOS Activation",
    description: "Send distress signals without making any sound that could alert an attacker.",
  },
  {
    icon: Hand,
    title: "Gesture Trigger",
    description: "Activate emergency mode through customizable gesture patterns on your device.",
  },
  {
    icon: Mic,
    title: "Voice Command",
    description: "Use coded voice phrases to trigger alerts when gestures aren't possible.",
  },
  {
    icon: MapPin,
    title: "Real-time GPS Tracking",
    description: "Continuous location updates ensure responders always know where you are.",
  },
  {
    icon: Users,
    title: "Trusted Contacts Alert",
    description: "Instantly notify your emergency contacts with your location and status.",
  },
  {
    icon: Cloud,
    title: "Cloud-based Backend",
    description: "Reliable cloud infrastructure ensures 99.9% uptime for critical moments.",
  },
  {
    icon: Lock,
    title: "Secure Authentication",
    description: "Military-grade encryption protects your data and prevents false alerts.",
  },
  {
    icon: Battery,
    title: "Low Battery Usage",
    description: "Optimized algorithms ensure minimal impact on your device's battery life.",
  },
  {
    icon: ShieldCheck,
    title: "Privacy Protection",
    description: "Your location is only shared during emergencies, never stored unnecessarily.",
  },
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 lg:py-28 bg-muted/50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-secondary font-semibold text-sm uppercase tracking-wider mb-4">
            Features
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Everything You Need for{" "}
            <span className="text-gradient-safety">Complete Safety</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Comprehensive features designed with your safety as the top priority, combining cutting-edge technology with ease of use.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group bg-background rounded-2xl p-6 lg:p-8 border border-border hover:border-secondary/30 transition-all duration-300 hover:shadow-xl animate-fade-in-up"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl gradient-safety flex items-center justify-center mb-5 shadow-safety group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-7 h-7 text-secondary-foreground" />
              </div>

              {/* Content */}
              <h3 className="font-display text-xl font-bold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
