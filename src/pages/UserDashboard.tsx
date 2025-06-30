
import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useAuth } from '../contexts/AuthContext';
import { Calendar, Clock, MapPin, Users, Star, TrendingUp, Award, BookOpen } from 'lucide-react';

interface Workshop {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  seats?: number;
}

interface Registration {
  id: string;
  workshopId: string;
  userId: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  workshop: Workshop;
  rating: number | null;
}

const mockRegistrations: Registration[] = [
  {
    id: '1',
    workshopId: '101',
    userId: 'user123',
    status: 'confirmed',
    workshop: {
      id: '101',
      title: 'React Fundamentals',
      description: 'Learn the basics of React development.',
      date: '2024-08-15',
      time: '10:00 AM - 4:00 PM',
      location: 'Online',
      seats: 30,
    },
    rating: null,
  },
  {
    id: '2',
    workshopId: '102',
    userId: 'user123',
    status: 'completed',
    workshop: {
      id: '102',
      title: 'Node.js Masterclass',
      description: 'Become a Node.js expert.',
      date: '2024-07-20',
      time: '9:00 AM - 5:00 PM',
      location: 'Bangalore',
      seats: 25,
    },
    rating: 5,
  },
  {
    id: '3',
    workshopId: '103',
    userId: 'user123',
    status: 'pending',
    workshop: {
      id: '103',
      title: 'UI/UX Design',
      description: 'Design beautiful user interfaces.',
      date: '2024-09-01',
      time: '11:00 AM - 3:00 PM',
      location: 'Mumbai',
      seats: 20,
    },
    rating: null,
  },
  {
    id: '4',
    workshopId: '104',
    userId: 'user123',
    status: 'confirmed',
    workshop: {
      id: '104',
      title: 'Next.js Framework',
      description: 'The world’s leading React framework for building full-stack applications.',
      date: '2024-08-22',
      time: '10:00 AM - 4:00 PM',
      location: 'Online',
      seats: 30,
    },
    rating: null,
  },
];

const UserDashboard = () => {
  const { user } = useAuth();
  const [registrations, setRegistrations] = useState<Registration[]>(mockRegistrations);

  const handleCancelRegistration = (workshopId: string) => {
    setRegistrations(prev => prev.filter(reg => reg.workshopId !== workshopId));
  };

  const handleRateWorkshop = (workshopId: string, rating: number) => {
    setRegistrations(prev => 
      prev.map(reg => 
        reg.workshopId === workshopId 
          ? { ...reg, rating }
          : reg
      )
    );
  };

  const upcomingWorkshops = registrations.filter(reg => reg.status === 'confirmed');
  const completedWorkshops = registrations.filter(reg => reg.status === 'completed');
  const pendingWorkshops = registrations.filter(reg => reg.status === 'pending');

  const totalWorkshops = registrations.length;
  const completionRate = totalWorkshops > 0 ? (completedWorkshops.length / totalWorkshops) * 100 : 0;
  const averageRating = completedWorkshops.reduce((acc, reg) => acc + (reg.rating || 0), 0) / completedWorkshops.length || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
            Welcome, {user?.name}!
          </h1>
          <p className="text-gray-600">
            Here's an overview of your workshop registrations and progress.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Workshops */}
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6 space-y-4">
              <div className="bg-gradient-to-r from-primary-500 to-accent-500 p-3 rounded-full w-14 h-14 flex items-center justify-center text-white mx-auto">
                <BookOpen className="h-6 w-6" />
              </div>
              <div className="text-center space-y-2">
                <CardTitle className="text-2xl font-bold text-gray-900">{totalWorkshops}</CardTitle>
                <CardHeader className="text-gray-600">Total Workshops</CardHeader>
              </div>
            </CardContent>
          </Card>

          {/* Completion Rate */}
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6 space-y-4">
              <div className="bg-gradient-to-r from-green-400 to-green-600 p-3 rounded-full w-14 h-14 flex items-center justify-center text-white mx-auto">
                <TrendingUp className="h-6 w-6" />
              </div>
              <div className="text-center space-y-2">
                <CardTitle className="text-2xl font-bold text-gray-900">{completionRate.toFixed(1)}%</CardTitle>
                <CardHeader className="text-gray-600">Completion Rate</CardHeader>
              </div>
            </CardContent>
          </Card>

          {/* Average Rating */}
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6 space-y-4">
              <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 p-3 rounded-full w-14 h-14 flex items-center justify-center text-white mx-auto">
                <Star className="h-6 w-6" />
              </div>
              <div className="text-center space-y-2">
                <CardTitle className="text-2xl font-bold text-gray-900">{averageRating.toFixed(1)}</CardTitle>
                <CardHeader className="text-gray-600">Average Rating</CardHeader>
              </div>
            </CardContent>
          </Card>

          {/* Workshops Completed */}
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6 space-y-4">
              <div className="bg-gradient-to-r from-blue-400 to-blue-600 p-3 rounded-full w-14 h-14 flex items-center justify-center text-white mx-auto">
                <Award className="h-6 w-6" />
              </div>
              <div className="text-center space-y-2">
                <CardTitle className="text-2xl font-bold text-gray-900">{completedWorkshops.length}</CardTitle>
                <CardHeader className="text-gray-600">Workshops Completed</CardHeader>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Workshop Tabs */}
        <Tabs defaultValue="upcoming" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upcoming">Upcoming ({upcomingWorkshops.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completedWorkshops.length})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({pendingWorkshops.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {upcomingWorkshops.map((registration) => (
                <Card key={registration.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <h3 className="text-xl font-semibold text-gray-900">
                          {registration.workshop.title}
                        </h3>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          {registration.status}
                        </Badge>
                      </div>

                      <p className="text-gray-600 text-sm">
                        {registration.workshop.description}
                      </p>

                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4" />
                          <span>{registration.workshop.date}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4" />
                          <span>{registration.workshop.time}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4" />
                          <span>{registration.workshop.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4" />
                          <span>{registration.workshop.seats || 'N/A'} seats available</span>
                        </div>
                      </div>

                      <div className="flex space-x-3 pt-4">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleCancelRegistration(registration.workshopId)}
                        >
                          Cancel Registration
                        </Button>
                        <Button size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {completedWorkshops.map((registration) => (
                <Card key={registration.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <h3 className="text-xl font-semibold text-gray-900">
                          {registration.workshop.title}
                        </h3>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          {registration.status}
                        </Badge>
                      </div>

                      <p className="text-gray-600 text-sm">
                        {registration.workshop.description}
                      </p>

                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4" />
                          <span>{registration.workshop.date}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4" />
                          <span>{registration.workshop.time}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4" />
                          <span>{registration.workshop.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4" />
                          <span>{registration.workshop.seats || 'N/A'} seats available</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 pt-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => handleRateWorkshop(registration.workshopId, star)}
                          >
                            <Star
                              className={`h-5 w-5 ${
                                star <= (registration.rating || 0)
                                  ? 'text-yellow-400 fill-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="pending" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {pendingWorkshops.map((registration) => (
                <Card key={registration.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <h3 className="text-xl font-semibold text-gray-900">
                          {registration.workshop.title}
                        </h3>
                        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                          {registration.status}
                        </Badge>
                      </div>

                      <p className="text-gray-600 text-sm">
                        {registration.workshop.description}
                      </p>

                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4" />
                          <span>{registration.workshop.date}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4" />
                          <span>{registration.workshop.time}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4" />
                          <span>{registration.workshop.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4" />
                          <span>{registration.workshop.seats || 'N/A'} seats available</span>
                        </div>
                      </div>

                      <div className="flex space-x-3 pt-4">
                        <Button variant="outline" size="sm">
                          Contact Support
                        </Button>
                        <Button size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default UserDashboard;
