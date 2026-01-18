import { Phone, Mail, MapPin } from "lucide-react";

export const ContactSection = () => {
  return (
    <section id="contact" className="py-20 lg:py-28 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
              Contact Us
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Get in <span className="text-gradient-emergency">Touch</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Have questions or need support? We're here to help.
            </p>
          </div>

          {/* Contact Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Phone */}
            <div className="bg-background rounded-2xl p-8 border border-border hover:shadow-xl transition-all duration-300 group">
              <div className="w-14 h-14 rounded-xl gradient-emergency flex items-center justify-center mb-5 shadow-emergency group-hover:scale-110 transition-transform duration-300">
                <Phone className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-2">
                Phone
              </h3>
              <p className="text-muted-foreground mb-4">
                Available 24/7 for emergencies
              </p>
              <a
                href="tel:+919131331250"
                className="text-primary font-semibold hover:underline text-lg"
              >
                +91 9131331250
              </a>
            </div>

            {/* Email */}
            <div className="bg-background rounded-2xl p-8 border border-border hover:shadow-xl transition-all duration-300 group">
              <div className="w-14 h-14 rounded-xl gradient-safety flex items-center justify-center mb-5 shadow-safety group-hover:scale-110 transition-transform duration-300">
                <Mail className="w-7 h-7 text-secondary-foreground" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-2">
                Email
              </h3>
              <p className="text-muted-foreground mb-4">
                We'll respond within 24 hours
              </p>
              <a
                href="mailto:anshul29cse019@satiengg.in"
                className="text-secondary font-semibold hover:underline text-lg break-all"
              >
                anshul29cse019@satiengg.in
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
