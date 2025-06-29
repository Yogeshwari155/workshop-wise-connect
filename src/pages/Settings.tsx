
import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Switch } from '../components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useToast } from '../hooks/use-toast';
import { Settings2, Bell, Shield, Palette, Mail, Globe, Database } from 'lucide-react';

const Settings = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  // General Settings
  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'WorkshopWise',
    siteDescription: 'Professional Workshop Management Platform',
    contactEmail: 'contact@workshopwise.com',
    supportEmail: 'support@workshopwise.com',
    timezone: 'Asia/Kolkata',
    language: 'en',
    currency: 'INR'
  });

  // Notification Settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    workshopReminders: true,
    paymentNotifications: true,
    adminAlerts: true,
    weeklyReports: true,
    marketingEmails: false
  });

  // Security Settings
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    loginAttempts: 5,
    sessionTimeout: 30,
    passwordExpiry: 90,
    requireStrongPassword: true,
    allowMultipleSessions: true
  });

  // Integration Settings
  const [integrationSettings, setIntegrationSettings] = useState({
    googleAnalytics: '',
    facebookPixel: '',
    stripeKey: '',
    razorpayKey: '',
    emailProvider: 'smtp',
    smsProvider: 'twilio'
  });

  const handleSaveSettings = async (section: string) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Settings Saved! ✅",
        description: `${section} settings have been updated successfully.`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Save Failed",
        description: "Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
            System Settings
          </h1>
          <p className="text-gray-600">
            Configure your platform settings and preferences
          </p>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="general" className="flex items-center space-x-2">
              <Settings2 className="h-4 w-4" />
              <span>General</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center space-x-2">
              <Bell className="h-4 w-4" />
              <span>Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>Security</span>
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center space-x-2">
              <Palette className="h-4 w-4" />
              <span>Appearance</span>
            </TabsTrigger>
            <TabsTrigger value="integrations" className="flex items-center space-x-2">
              <Database className="h-4 w-4" />
              <span>Integrations</span>
            </TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="h-5 w-5" />
                  <span>General Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Site Name</Label>
                    <Input
                      value={generalSettings.siteName}
                      onChange={(e) => setGeneralSettings({...generalSettings, siteName: e.target.value})}
                      placeholder="Enter site name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Contact Email</Label>
                    <Input
                      type="email"
                      value={generalSettings.contactEmail}
                      onChange={(e) => setGeneralSettings({...generalSettings, contactEmail: e.target.value})}
                      placeholder="Enter contact email"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Site Description</Label>
                  <Textarea
                    value={generalSettings.siteDescription}
                    onChange={(e) => setGeneralSettings({...generalSettings, siteDescription: e.target.value})}
                    placeholder="Enter site description"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label>Timezone</Label>
                    <Select value={generalSettings.timezone} onValueChange={(value) => setGeneralSettings({...generalSettings, timezone: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Asia/Kolkata">Asia/Kolkata (IST)</SelectItem>
                        <SelectItem value="UTC">UTC</SelectItem>
                        <SelectItem value="America/New_York">America/New_York (EST)</SelectItem>
                        <SelectItem value="Europe/London">Europe/London (GMT)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Language</Label>
                    <Select value={generalSettings.language} onValueChange={(value) => setGeneralSettings({...generalSettings, language: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="hi">Hindi</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Currency</Label>
                    <Select value={generalSettings.currency} onValueChange={(value) => setGeneralSettings({...generalSettings, currency: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="INR">INR (₹)</SelectItem>
                        <SelectItem value="USD">USD ($)</SelectItem>
                        <SelectItem value="EUR">EUR (€)</SelectItem>
                        <SelectItem value="GBP">GBP (£)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Button 
                    onClick={() => handleSaveSettings('General')}
                    disabled={loading}
                    className="bg-gradient-to-r from-primary-500 to-accent-500"
                  >
                    {loading ? 'Saving...' : 'Save General Settings'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="h-5 w-5" />
                  <span>Notification Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Email Notifications</Label>
                      <p className="text-sm text-gray-600">Receive notifications via email</p>
                    </div>
                    <Switch
                      checked={notificationSettings.emailNotifications}
                      onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, emailNotifications: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">SMS Notifications</Label>
                      <p className="text-sm text-gray-600">Receive notifications via SMS</p>
                    </div>
                    <Switch
                      checked={notificationSettings.smsNotifications}
                      onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, smsNotifications: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Push Notifications</Label>
                      <p className="text-sm text-gray-600">Receive browser push notifications</p>
                    </div>
                    <Switch
                      checked={notificationSettings.pushNotifications}
                      onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, pushNotifications: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Workshop Reminders</Label>
                      <p className="text-sm text-gray-600">Get reminders about upcoming workshops</p>
                    </div>
                    <Switch
                      checked={notificationSettings.workshopReminders}
                      onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, workshopReminders: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Payment Notifications</Label>
                      <p className="text-sm text-gray-600">Notifications about payments and transactions</p>
                    </div>
                    <Switch
                      checked={notificationSettings.paymentNotifications}
                      onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, paymentNotifications: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Admin Alerts</Label>
                      <p className="text-sm text-gray-600">Important system alerts for administrators</p>
                    </div>
                    <Switch
                      checked={notificationSettings.adminAlerts}
                      onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, adminAlerts: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Weekly Reports</Label>
                      <p className="text-sm text-gray-600">Receive weekly performance reports</p>
                    </div>
                    <Switch
                      checked={notificationSettings.weeklyReports}
                      onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, weeklyReports: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Marketing Emails</Label>
                      <p className="text-sm text-gray-600">Promotional emails and announcements</p>
                    </div>
                    <Switch
                      checked={notificationSettings.marketingEmails}
                      onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, marketingEmails: checked})}
                    />
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Button 
                    onClick={() => handleSaveSettings('Notification')}
                    disabled={loading}
                    className="bg-gradient-to-r from-primary-500 to-accent-500"
                  >
                    {loading ? 'Saving...' : 'Save Notification Settings'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Security Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Two-Factor Authentication</Label>
                      <p className="text-sm text-gray-600">Add an extra layer of security to accounts</p>
                    </div>
                    <Switch
                      checked={securitySettings.twoFactorAuth}
                      onCheckedChange={(checked) => setSecuritySettings({...securitySettings, twoFactorAuth: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Require Strong Passwords</Label>
                      <p className="text-sm text-gray-600">Enforce strong password requirements</p>
                    </div>
                    <Switch
                      checked={securitySettings.requireStrongPassword}
                      onCheckedChange={(checked) => setSecuritySettings({...securitySettings, requireStrongPassword: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Allow Multiple Sessions</Label>
                      <p className="text-sm text-gray-600">Allow users to login from multiple devices</p>
                    </div>
                    <Switch
                      checked={securitySettings.allowMultipleSessions}
                      onCheckedChange={(checked) => setSecuritySettings({...securitySettings, allowMultipleSessions: checked})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label>Max Login Attempts</Label>
                    <Input
                      type="number"
                      value={securitySettings.loginAttempts}
                      onChange={(e) => setSecuritySettings({...securitySettings, loginAttempts: Number(e.target.value)})}
                      min="3"
                      max="10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Session Timeout (minutes)</Label>
                    <Input
                      type="number"
                      value={securitySettings.sessionTimeout}
                      onChange={(e) => setSecuritySettings({...securitySettings, sessionTimeout: Number(e.target.value)})}
                      min="15"
                      max="480"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Password Expiry (days)</Label>
                    <Input
                      type="number"
                      value={securitySettings.passwordExpiry}
                      onChange={(e) => setSecuritySettings({...securitySettings, passwordExpiry: Number(e.target.value)})}
                      min="30"
                      max="365"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Button 
                    onClick={() => handleSaveSettings('Security')}
                    disabled={loading}
                    className="bg-gradient-to-r from-primary-500 to-accent-500"
                  >
                    {loading ? 'Saving...' : 'Save Security Settings'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appearance Settings */}
          <TabsContent value="appearance">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Palette className="h-5 w-5" />
                  <span>Appearance Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center py-12">
                  <Palette className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Theme Customization
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Appearance settings will be available in the next update
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center justify-center space-x-4">
                      <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
                      <div className="w-8 h-8 bg-purple-500 rounded-full"></div>
                      <div className="w-8 h-8 bg-green-500 rounded-full"></div>
                      <div className="w-8 h-8 bg-red-500 rounded-full"></div>
                    </div>
                    <p className="text-sm text-gray-500">Coming Soon: Custom themes and branding options</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Integration Settings */}
          <TabsContent value="integrations">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="h-5 w-5" />
                  <span>Integration Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Analytics & Tracking</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>Google Analytics ID</Label>
                        <Input
                          value={integrationSettings.googleAnalytics}
                          onChange={(e) => setIntegrationSettings({...integrationSettings, googleAnalytics: e.target.value})}
                          placeholder="GA-XXXXXXXXX-X"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Facebook Pixel ID</Label>
                        <Input
                          value={integrationSettings.facebookPixel}
                          onChange={(e) => setIntegrationSettings({...integrationSettings, facebookPixel: e.target.value})}
                          placeholder="Enter Facebook Pixel ID"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Gateways</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>Stripe Publishable Key</Label>
                        <Input
                          value={integrationSettings.stripeKey}
                          onChange={(e) => setIntegrationSettings({...integrationSettings, stripeKey: e.target.value})}
                          placeholder="pk_live_..."
                          type="password"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Razorpay Key ID</Label>
                        <Input
                          value={integrationSettings.razorpayKey}
                          onChange={(e) => setIntegrationSettings({...integrationSettings, razorpayKey: e.target.value})}
                          placeholder="rzp_live_..."
                          type="password"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Communication</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>Email Provider</Label>
                        <Select value={integrationSettings.emailProvider} onValueChange={(value) => setIntegrationSettings({...integrationSettings, emailProvider: value})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="smtp">SMTP</SelectItem>
                            <SelectItem value="sendgrid">SendGrid</SelectItem>
                            <SelectItem value="mailgun">Mailgun</SelectItem>
                            <SelectItem value="ses">AWS SES</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>SMS Provider</Label>
                        <Select value={integrationSettings.smsProvider} onValueChange={(value) => setIntegrationSettings({...integrationSettings, smsProvider: value})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="twilio">Twilio</SelectItem>
                            <SelectItem value="textlocal">TextLocal</SelectItem>
                            <SelectItem value="msg91">MSG91</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Button 
                    onClick={() => handleSaveSettings('Integration')}
                    disabled={loading}
                    className="bg-gradient-to-r from-primary-500 to-accent-500"
                  >
                    {loading ? 'Saving...' : 'Save Integration Settings'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default Settings;
