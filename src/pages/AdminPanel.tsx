import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useAdminRole } from "@/hooks/useAdminRole";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Shield,
  Users,
  AlertTriangle,
  BarChart3,
  LogOut,
  Loader2,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  TrendingUp,
  Activity,
  UserCheck,
  AlertCircle,
} from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type Profile = Database['public']['Tables']['profiles']['Row'];
type Alert = Database['public']['Tables']['alerts']['Row'];
type UserRole = Database['public']['Tables']['user_roles']['Row'];

interface UserWithRole extends Profile {
  roles: UserRole[];
  email?: string;
}

interface AlertWithUser extends Alert {
  profiles?: Profile;
}

const AdminPanel = () => {
  const { user, signOut, loading: authLoading } = useAuth();
  const { isAdmin, loading: adminLoading } = useAdminRole();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [alerts, setAlerts] = useState<AlertWithUser[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [activeTab, setActiveTab] = useState<'users' | 'alerts' | 'analytics'>('analytics');

  // Stats
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalAlerts: 0,
    activeAlerts: 0,
    resolvedAlerts: 0,
    alertsToday: 0,
    alertsThisWeek: 0,
  });

  // Redirect if not logged in or not admin
  useEffect(() => {
    if (!authLoading && !adminLoading) {
      if (!user) {
        navigate("/auth");
      } else if (!isAdmin) {
        toast({
          title: "Access Denied",
          description: "You do not have permission to access this page.",
          variant: "destructive",
        });
        navigate("/dashboard");
      }
    }
  }, [user, isAdmin, authLoading, adminLoading, navigate, toast]);

  useEffect(() => {
    if (isAdmin) {
      fetchData();
      setupRealtimeSubscription();
    }
  }, [isAdmin]);

  const fetchData = async () => {
    try {
      // Fetch all profiles
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (profilesError) throw profilesError;

      // Fetch all user roles
      const { data: rolesData, error: rolesError } = await supabase
        .from('user_roles')
        .select('*');

      if (rolesError) throw rolesError;

      // Combine profiles with roles
      const usersWithRoles: UserWithRole[] = (profilesData || []).map((profile) => ({
        ...profile,
        roles: (rolesData || []).filter((role) => role.user_id === profile.id),
      }));

      setUsers(usersWithRoles);

      // Fetch all alerts with user profiles
      const { data: alertsData, error: alertsError } = await supabase
        .from('alerts')
        .select(`
          *,
          profiles:user_id (*)
        `)
        .order('created_at', { ascending: false });

      if (alertsError) throw alertsError;
      setAlerts(alertsData || []);

      // Calculate stats
      const now = new Date();
      const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const weekStart = new Date(todayStart.getTime() - 7 * 24 * 60 * 60 * 1000);

      const activeAlerts = (alertsData || []).filter((a) => a.status === 'active').length;
      const resolvedAlerts = (alertsData || []).filter((a) => a.status === 'resolved').length;
      const alertsToday = (alertsData || []).filter(
        (a) => new Date(a.created_at) >= todayStart
      ).length;
      const alertsThisWeek = (alertsData || []).filter(
        (a) => new Date(a.created_at) >= weekStart
      ).length;

      setStats({
        totalUsers: profilesData?.length || 0,
        totalAlerts: alertsData?.length || 0,
        activeAlerts,
        resolvedAlerts,
        alertsToday,
        alertsThisWeek,
      });
    } catch (error) {
      console.error('Error fetching admin data:', error);
      toast({
        title: "Error",
        description: "Failed to load admin data.",
        variant: "destructive",
      });
    } finally {
      setLoadingData(false);
    }
  };

  const setupRealtimeSubscription = () => {
    const channel = supabase
      .channel('admin-alerts-realtime')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'alerts',
        },
        () => {
          fetchData();
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'profiles',
        },
        () => {
          fetchData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const updateAlertStatus = async (alertId: string, status: 'resolved' | 'cancelled' | 'escalated') => {
    try {
      const { error } = await supabase
        .from('alerts')
        .update({ 
          status, 
          resolved_at: status === 'resolved' ? new Date().toISOString() : null 
        })
        .eq('id', alertId);

      if (error) throw error;

      toast({
        title: "Alert Updated",
        description: `Alert status changed to ${status}.`,
      });
    } catch (error) {
      console.error('Error updating alert:', error);
      toast({
        title: "Error",
        description: "Failed to update alert.",
        variant: "destructive",
      });
    }
  };

  if (authLoading || adminLoading || loadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-primary/20 text-primary';
      case 'resolved':
        return 'bg-success/20 text-success';
      case 'cancelled':
        return 'bg-muted text-muted-foreground';
      case 'escalated':
        return 'bg-warning/20 text-warning';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-primary/20 text-primary';
      case 'moderator':
        return 'bg-secondary/20 text-secondary';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-muted/50">
      {/* Header */}
      <header className="bg-background border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl gradient-emergency flex items-center justify-center shadow-emergency">
                <Shield className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-xl text-foreground">
                Silent<span className="text-primary">SOS</span>
              </span>
            </a>
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold">
              Admin Panel
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')}>
              Dashboard
            </Button>
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {[
            { id: 'analytics', icon: BarChart3, label: 'Analytics' },
            { id: 'users', icon: Users, label: 'Users' },
            { id: 'alerts', icon: AlertTriangle, label: 'All Alerts' },
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

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-8">
            <h2 className="font-display text-2xl font-bold text-foreground">
              System Analytics
            </h2>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="bg-background rounded-xl p-6 border border-border">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center">
                    <Users className="w-5 h-5 text-secondary" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-foreground">{stats.totalUsers}</p>
                <p className="text-sm text-muted-foreground">Total Users</p>
              </div>

              <div className="bg-background rounded-xl p-6 border border-border">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-foreground">{stats.totalAlerts}</p>
                <p className="text-sm text-muted-foreground">Total Alerts</p>
              </div>

              <div className="bg-background rounded-xl p-6 border border-border">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center animate-pulse-emergency">
                    <Activity className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-primary">{stats.activeAlerts}</p>
                <p className="text-sm text-muted-foreground">Active Alerts</p>
              </div>

              <div className="bg-background rounded-xl p-6 border border-border">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-success" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-foreground">{stats.resolvedAlerts}</p>
                <p className="text-sm text-muted-foreground">Resolved</p>
              </div>

              <div className="bg-background rounded-xl p-6 border border-border">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-accent" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-foreground">{stats.alertsToday}</p>
                <p className="text-sm text-muted-foreground">Today</p>
              </div>

              <div className="bg-background rounded-xl p-6 border border-border">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-secondary" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-foreground">{stats.alertsThisWeek}</p>
                <p className="text-sm text-muted-foreground">This Week</p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-background rounded-2xl p-6 border border-border">
              <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                Recent Alerts
              </h3>
              {alerts.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">No alerts yet.</p>
              ) : (
                <div className="space-y-3">
                  {alerts.slice(0, 5).map((alert) => (
                    <div
                      key={alert.id}
                      className="flex items-center justify-between p-4 bg-muted/50 rounded-xl"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${getStatusColor(alert.status)}`}
                        >
                          <AlertTriangle className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">
                            {alert.profiles?.full_name || 'Unknown User'}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(alert.created_at).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusColor(alert.status)}`}>
                        {alert.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl font-bold text-foreground">
                User Management
              </h2>
              <div className="flex items-center gap-2 text-muted-foreground">
                <UserCheck className="w-5 h-5" />
                <span>{users.length} users</span>
              </div>
            </div>

            {users.length === 0 ? (
              <div className="text-center py-12 bg-background rounded-2xl border border-border">
                <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  No Users Yet
                </h3>
                <p className="text-muted-foreground">
                  Users will appear here once they sign up.
                </p>
              </div>
            ) : (
              <div className="bg-background rounded-2xl border border-border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="text-left p-4 font-semibold text-foreground">User</th>
                        <th className="text-left p-4 font-semibold text-foreground">Phone</th>
                        <th className="text-left p-4 font-semibold text-foreground">Roles</th>
                        <th className="text-left p-4 font-semibold text-foreground">Joined</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {users.map((userItem) => (
                        <tr key={userItem.id} className="hover:bg-muted/30 transition-colors">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                <span className="text-primary font-semibold">
                                  {userItem.full_name?.charAt(0)?.toUpperCase() || 'U'}
                                </span>
                              </div>
                              <div>
                                <p className="font-semibold text-foreground">
                                  {userItem.full_name || 'No name'}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  ID: {userItem.id.slice(0, 8)}...
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className="text-muted-foreground">
                              {userItem.phone_number || 'Not set'}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="flex gap-2 flex-wrap">
                              {userItem.roles.length > 0 ? (
                                userItem.roles.map((role) => (
                                  <span
                                    key={role.id}
                                    className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${getRoleBadge(role.role)}`}
                                  >
                                    {role.role}
                                  </span>
                                ))
                              ) : (
                                <span className="text-muted-foreground text-sm">No roles</span>
                              )}
                            </div>
                          </td>
                          <td className="p-4">
                            <span className="text-muted-foreground text-sm">
                              {new Date(userItem.created_at).toLocaleDateString()}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Alerts Tab */}
        {activeTab === 'alerts' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl font-bold text-foreground">
                All Alerts
              </h2>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-2 text-primary">
                  <AlertCircle className="w-5 h-5" />
                  {stats.activeAlerts} active
                </span>
              </div>
            </div>

            {alerts.length === 0 ? (
              <div className="text-center py-12 bg-background rounded-2xl border border-border">
                <AlertTriangle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  No Alerts Yet
                </h3>
                <p className="text-muted-foreground">
                  Alerts will appear here when users trigger them.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`bg-background rounded-xl p-6 border ${
                      alert.status === 'active' ? 'border-primary/50 shadow-emergency' : 'border-border'
                    }`}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center ${getStatusColor(alert.status)}`}
                        >
                          {alert.status === 'active' ? (
                            <AlertTriangle className="w-6 h-6 animate-pulse" />
                          ) : alert.status === 'resolved' ? (
                            <CheckCircle className="w-6 h-6" />
                          ) : (
                            <XCircle className="w-6 h-6" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-foreground">
                              {alert.profiles?.full_name || 'Unknown User'}
                            </p>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${getStatusColor(alert.status)}`}>
                              {alert.status}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {new Date(alert.created_at).toLocaleString()}
                            </span>
                            {alert.trigger_method && (
                              <span>Trigger: {alert.trigger_method}</span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        {alert.latitude && alert.longitude && (
                          <a
                            href={`https://www.google.com/maps?q=${alert.latitude},${alert.longitude}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-secondary hover:underline"
                          >
                            <MapPin className="w-4 h-4" />
                            View Location
                          </a>
                        )}

                        {alert.status === 'active' && (
                          <div className="flex gap-2">
                            <Button
                              variant="safety"
                              size="sm"
                              onClick={() => updateAlertStatus(alert.id, 'resolved')}
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Resolve
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateAlertStatus(alert.id, 'cancelled')}
                            >
                              <XCircle className="w-4 h-4 mr-1" />
                              Cancel
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>

                    {alert.notes && (
                      <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                        <p className="text-sm text-muted-foreground">{alert.notes}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
