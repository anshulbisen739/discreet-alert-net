import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useAdminRole } from "@/hooks/useAdminRole";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Shield,
  MapPin,
  Users,
  History,
  Settings,
  LogOut,
  Plus,
  Phone,
  Mail,
  AlertTriangle,
  CheckCircle,
  Clock,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type EmergencyContact = Database['public']['Tables']['emergency_contacts']['Row'];
type Alert = Database['public']['Tables']['alerts']['Row'];

const Dashboard = () => {
  const { user, signOut, loading: authLoading } = useAuth();
  const { isAdmin } = useAdminRole();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [contacts, setContacts] = useState<EmergencyContact[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [sendingAlert, setSendingAlert] = useState(false);
  const [activeTab, setActiveTab] = useState<'sos' | 'contacts' | 'history' | 'settings'>('sos');

  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  // Fetch user data
  useEffect(() => {
    if (user) {
      fetchData();
      setupRealtimeSubscription();
    }
  }, [user]);

  const fetchData = async () => {
    try {
      // Fetch emergency contacts
      const { data: contactsData, error: contactsError } = await supabase
        .from('emergency_contacts')
        .select('*')
        .order('priority', { ascending: true });

      if (contactsError) throw contactsError;
      setContacts(contactsData || []);

      // Fetch alerts
      const { data: alertsData, error: alertsError } = await supabase
        .from('alerts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      if (alertsError) throw alertsError;
      setAlerts(alertsData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoadingData(false);
    }
  };

  const setupRealtimeSubscription = () => {
    const channel = supabase
      .channel('alerts-realtime')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'alerts',
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setAlerts((prev) => [payload.new as Alert, ...prev]);
          } else if (payload.eventType === 'UPDATE') {
            setAlerts((prev) =>
              prev.map((a) => (a.id === payload.new.id ? (payload.new as Alert) : a))
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const triggerSOS = async () => {
    if (!user) return;
    
    setSendingAlert(true);
    
    try {
      // Get current location
      let latitude: number | null = null;
      let longitude: number | null = null;
      
      if (navigator.geolocation) {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 5000,
          });
        }).catch(() => null);
        
        if (position) {
          latitude = position.coords.latitude;
          longitude = position.coords.longitude;
        }
      }

      // Create alert
      const { error } = await supabase.from('alerts').insert({
        user_id: user.id,
        latitude,
        longitude,
        status: 'active',
        trigger_method: 'tap',
      });

      if (error) throw error;

      toast({
        title: "🚨 SOS Alert Sent!",
        description: "Your emergency contacts have been notified.",
      });
    } catch (error) {
      console.error('Error sending SOS:', error);
      toast({
        title: "Error",
        description: "Failed to send SOS. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSendingAlert(false);
    }
  };

  const resolveAlert = async (alertId: string) => {
    try {
      const { error } = await supabase
        .from('alerts')
        .update({ status: 'resolved', resolved_at: new Date().toISOString() })
        .eq('id', alertId);

      if (error) throw error;

      toast({
        title: "Alert Resolved",
        description: "Your contacts have been notified that you are safe.",
      });
    } catch (error) {
      console.error('Error resolving alert:', error);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (authLoading || loadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const activeAlert = alerts.find((a) => a.status === 'active');

  return (
    <div className="min-h-screen bg-muted/50">
      {/* Header */}
      <header className="bg-background border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl gradient-emergency flex items-center justify-center shadow-emergency">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-xl text-foreground">
              Silent<span className="text-primary">SOS</span>
            </span>
          </a>
          <div className="flex items-center gap-2">
            {isAdmin && (
              <Button variant="outline" size="sm" onClick={() => navigate('/admin')}>
                <ShieldCheck className="w-4 h-4 mr-2" />
                Admin
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Active Alert Banner */}
        {activeAlert && (
          <div className="mb-8 bg-primary/10 border border-primary/30 rounded-2xl p-6 animate-pulse">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center animate-pulse-emergency">
                  <AlertTriangle className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-foreground">
                    Active Emergency Alert
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Triggered {new Date(activeAlert.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
              <Button variant="safety" onClick={() => resolveAlert(activeAlert.id)}>
                <CheckCircle className="w-4 h-4 mr-2" />
                I'm Safe
              </Button>
            </div>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {[
            { id: 'sos', icon: AlertTriangle, label: 'SOS' },
            { id: 'contacts', icon: Users, label: 'Contacts' },
            { id: 'history', icon: History, label: 'History' },
            { id: 'settings', icon: Settings, label: 'Settings' },
          ].map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? 'default' : 'outline'}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className="flex-shrink-0"
            >
              <tab.icon className="w-4 h-4 mr-2" />
              {tab.label}
            </Button>
          ))}
        </div>

        {/* SOS Tab */}
        {activeTab === 'sos' && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                Emergency SOS
              </h2>
              <p className="text-muted-foreground mb-8">
                Tap the button below to send an immediate alert to all your emergency contacts with your current location.
              </p>

              {/* SOS Button */}
              <div className="relative inline-block mb-8">
                <div className="absolute inset-0 bg-primary/30 rounded-full animate-ping-slow" />
                <button
                  onClick={triggerSOS}
                  disabled={sendingAlert || !!activeAlert}
                  className="relative w-40 h-40 rounded-full gradient-emergency shadow-emergency flex items-center justify-center text-primary-foreground font-display font-bold text-3xl transition-transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed animate-pulse-emergency"
                >
                  {sendingAlert ? (
                    <Loader2 className="w-12 h-12 animate-spin" />
                  ) : (
                    "SOS"
                  )}
                </button>
              </div>

              {activeAlert && (
                <p className="text-primary font-semibold">
                  You have an active alert. Resolve it before sending a new one.
                </p>
              )}

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="bg-background rounded-xl p-4 border border-border">
                  <Users className="w-6 h-6 text-secondary mb-2 mx-auto" />
                  <p className="text-2xl font-bold text-foreground">{contacts.length}</p>
                  <p className="text-sm text-muted-foreground">Emergency Contacts</p>
                </div>
                <div className="bg-background rounded-xl p-4 border border-border">
                  <History className="w-6 h-6 text-primary mb-2 mx-auto" />
                  <p className="text-2xl font-bold text-foreground">{alerts.length}</p>
                  <p className="text-sm text-muted-foreground">Total Alerts</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Contacts Tab */}
        {activeTab === 'contacts' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-2xl font-bold text-foreground">
                Emergency Contacts
              </h2>
              <Button variant="hero" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Contact
              </Button>
            </div>

            {contacts.length === 0 ? (
              <div className="text-center py-12 bg-background rounded-2xl border border-border">
                <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  No Contacts Yet
                </h3>
                <p className="text-muted-foreground mb-4">
                  Add trusted contacts who will be notified in case of emergency.
                </p>
                <Button variant="hero">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Contact
                </Button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {contacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="bg-background rounded-xl p-6 border border-border hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-foreground">{contact.contact_name}</h3>
                        <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                          <Phone className="w-4 h-4" />
                          {contact.contact_phone}
                        </div>
                        {contact.contact_email && (
                          <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                            <Mail className="w-4 h-4" />
                            {contact.contact_email}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-muted-foreground">Priority</span>
                        <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">
                          {contact.priority}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground mb-6">
              Alert History
            </h2>

            {alerts.length === 0 ? (
              <div className="text-center py-12 bg-background rounded-2xl border border-border">
                <History className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  No Alerts Yet
                </h3>
                <p className="text-muted-foreground">
                  Your alert history will appear here.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="bg-background rounded-xl p-6 border border-border"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            alert.status === 'active'
                              ? 'bg-primary/20 text-primary'
                              : alert.status === 'resolved'
                              ? 'bg-success/20 text-success'
                              : 'bg-muted text-muted-foreground'
                          }`}
                        >
                          {alert.status === 'active' ? (
                            <AlertTriangle className="w-5 h-5" />
                          ) : alert.status === 'resolved' ? (
                            <CheckCircle className="w-5 h-5" />
                          ) : (
                            <Clock className="w-5 h-5" />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-foreground capitalize">
                            {alert.status} Alert
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(alert.created_at).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      {alert.latitude && alert.longitude && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          <span>
                            {alert.latitude.toFixed(4)}, {alert.longitude.toFixed(4)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground mb-6">
              Settings
            </h2>
            <div className="bg-background rounded-2xl p-6 border border-border">
              <p className="text-muted-foreground">
                Settings page coming soon. Manage your profile, notification preferences, and more.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
