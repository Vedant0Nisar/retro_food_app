
import React from 'react';
import { Users, CreditCard, Printer, Clock, Bell, HelpCircle } from 'lucide-react';
import RetroHeader from '../components/RetroHeader';
import RetroNavbar from '../components/RetroNavbar';

const Settings = () => {
  const settingsOptions = [
    {
      icon: <Users size={24} />,
      title: 'Staff Management',
      description: 'Add or remove staff accounts',
    },
    {
      icon: <CreditCard size={24} />,
      title: 'Payment Methods',
      description: 'Configure payment options',
    },
    {
      icon: <Printer size={24} />,
      title: 'Printer Setup',
      description: 'Connect and configure printers',
    },
    {
      icon: <Clock size={24} />,
      title: 'Business Hours',
      description: 'Set restaurant operating hours',
    },
    {
      icon: <Bell size={24} />,
      title: 'Notifications',
      description: 'Configure alerts and notifications',
    },
    {
      icon: <HelpCircle size={24} />,
      title: 'Help & Support',
      description: 'Contact support or view tutorials',
    },
  ];

  return (
    <div className="min-h-screen pb-16 bg-retro-cream">
      <RetroHeader title="Settings" />

      <main className="p-4">
        <div className="mb-8">
          <div className="retro-card p-6 mb-4">
            <h2 className="text-xl font-bold mb-4">App Settings</h2>

            <div className="space-y-4">
              {settingsOptions.map((option, index) => (
                <div
                  key={index}
                  className="flex items-center p-3 border-b last:border-0 border-gray-200 cursor-pointer hover:bg-gray-50"
                >
                  <div className="p-2 bg-retro-teal rounded-full text-white mr-4">
                    {option.icon}
                  </div>
                  <div>
                    <h3 className="font-medium">{option.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {option.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="retro-card p-6">
            <h2 className="text-xl font-bold mb-4">App Information</h2>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Version</span>
                <span>1.0.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Built with</span>
                <span>React</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last updated</span>
                <span>April 11, 2025</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <RetroNavbar />
    </div>
  );
};

export default Settings;
