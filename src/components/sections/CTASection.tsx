import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, ArrowRight, Play } from "lucide-react";

export const CTASection = () => {
  return (
    <section className="py-20 lg:py-28 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl gradient-emergency shadow-emergency mb-8 animate-pulse-emergency">
            <Shield className="w-10 h-10 text-primary-foreground" />
          </div>

          {/* Heading */}
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Your Safety Should{" "}
            <span className="text-gradient-emergency">Never Be Silent</span>
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Join thousands who have already taken control of their safety. Get started today and experience peace of mind like never before.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth">
              <Button variant="hero" size="xl" className="group">
                Register Now
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Button variant="heroOutline" size="xl">
              <Play className="w-5 h-5" />
              Request Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 pt-16 border-t border-border">
            <div className="text-center">
              <div className="font-display text-3xl md:text-4xl font-bold text-primary mb-2">10K+</div>
              <p className="text-sm text-muted-foreground">Active Users</p>
            </div>
            <div className="text-center">
              <div className="font-display text-3xl md:text-4xl font-bold text-secondary mb-2">99.9%</div>
              <p className="text-sm text-muted-foreground">Uptime</p>
            </div>
            <div className="text-center">
              <div className="font-display text-3xl md:text-4xl font-bold text-success mb-2">&lt;2min</div>
              <p className="text-sm text-muted-foreground">Avg Response</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
