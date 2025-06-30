
import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import ProfileManagement from '../components/ProfileManagement';

const Profile = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
            My Profile
          </h1>
          <p className="text-gray-600">
            Manage your personal information and account settings
          </p>
        </div>

        <ProfileManagement />
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
