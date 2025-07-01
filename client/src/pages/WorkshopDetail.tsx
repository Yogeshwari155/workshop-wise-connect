
import React, { useState } from 'react';
import { useParams } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Star, 
  Bookmark,
  Share2,
  ChevronRight,
  CheckCircle,
  DollarSign
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

interface Workshop {
  id: number;
  title: string;
  company: string;
  price: number;
  originalPrice: number;
  mode: string;
  duration: string;
  seats: number;
  bookedSeats: number;
  rating: number;
  reviews: number;
  image: string;
  description: string;
  instructor: string;
  instructorImage: string;
  level: string;
  category: string;
  date: string;
  time: string;
  location: string;
  highlights: string[];
  requirements: string[];
  agenda: Array<{
    time: string;
    topic: string;
    description: string;
  }>;
}

const WorkshopDetail = () => {
  const { id } = useParams();
  const [workshop, setWorkshop] = useState<Workshop | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Mock workshop data - in real app, this would come from API
  React.useEffect(() => {
    const mockWorkshop: Workshop = {
      id: parseInt(id || '1'),
      title: 'Advanced React Development Workshop',
      company: 'TechCorp Solutions',
      price: 2999,
      originalPrice: 4999,
      mode: 'Hybrid',
      duration: '2 days',
      seats: 30,
      bookedSeats: 23,
      rating: 4.8,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop',
      description: 'Master advanced React concepts including hooks, context, performance optimization, and modern development patterns. This comprehensive workshop will take your React skills to the next level.',
      instructor: 'Sarah Johnson',
      instructorImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b567?w=150&h=150&fit=crop',
      level: 'Advanced',
      category: 'Frontend Development',
      date: '2024-04-15',
      time: '09:00 AM - 05:00 PM',
      location: 'Tech Hub, Mumbai & Online',
      highlights: [
        'Hands-on coding exercises',
        'Real-world project implementation',
        'Performance optimization techniques',
        'Modern React patterns and best practices',
        'Certificate of completion',
        'Lifetime access to resources'
      ],
      requirements: [
        'Basic knowledge of React',
        'JavaScript ES6+ familiarity',
        'Node.js installed on your machine',
        'Code editor (VS Code recommended)',
        'Stable internet connection for online participants'
      ],
      agenda: [
        {
          time: '09:00 - 10:30',
          topic: 'Advanced Hooks',
          description: 'Deep dive into useEffect, useCallback, useMemo, and custom hooks'
        },
        {
          time: '10:45 - 12:00',
          topic: 'Context & State Management',
          description: 'Advanced state management patterns and context optimization'
        },
        {
          time: '13:00 - 14:30',
          topic: 'Performance Optimization',
          description: 'React.memo, lazy loading, and performance profiling'
        },
        {
          time: '14:45 - 17:00',
          topic: 'Project Implementation',
          description: 'Build a complete application using learned concepts'
        }
      ]
    };
    setWorkshop(mockWorkshop);
  }, [id]);

  if (!workshop) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">Loading...</div>
        </div>
        <Footer />
      </div>
    );
  }

  const availableSeats = workshop.seats - workshop.bookedSeats;
  const discountPercentage = Math.round(((workshop.originalPrice - workshop.price) / workshop.originalPrice) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-600 mb-6">
          <span>Workshops</span>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span>{workshop.category}</span>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-gray-900">{workshop.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero Section */}
            <Card>
              <div className="relative">
                <img
                  src={workshop.image}
                  alt={workshop.title}
                  className="w-full h-64 object-cover rounded-t-lg"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-green-500">{workshop.mode}</Badge>
                </div>
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    className="bg-white"
                  >
                    <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
                  </Button>
                  <Button variant="outline" size="sm" className="bg-white">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <span>{workshop.company}</span>
                  <span>•</span>
                  <Badge variant="outline">{workshop.level}</Badge>
                </div>
                
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {workshop.title}
                </h1>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{workshop.rating}</span>
                    <span className="text-gray-600">({workshop.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <Users className="h-4 w-4" />
                    <span>{workshop.bookedSeats} enrolled</span>
                  </div>
                </div>
                
                <p className="text-gray-700 leading-relaxed">
                  {workshop.description}
                </p>
              </CardContent>
            </Card>

            {/* Instructor */}
            <Card>
              <CardHeader>
                <CardTitle>Your Instructor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <img
                    src={workshop.instructorImage}
                    alt={workshop.instructor}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{workshop.instructor}</h3>
                    <p className="text-gray-600">Senior React Developer with 8+ years experience</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* What You'll Learn */}
            <Card>
              <CardHeader>
                <CardTitle>What You'll Learn</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {workshop.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{highlight}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Agenda */}
            <Card>
              <CardHeader>
                <CardTitle>Workshop Agenda</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {workshop.agenda.map((item, index) => (
                    <div key={index} className="flex gap-4 pb-4 border-b border-gray-100 last:border-b-0">
                      <div className="text-sm font-medium text-primary-600 min-w-24">
                        {item.time}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">{item.topic}</h4>
                        <p className="text-gray-600 text-sm">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card>
              <CardHeader>
                <CardTitle>Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {workshop.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Card>
                <CardContent className="p-6">
                  {/* Pricing */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-3xl font-bold text-gray-900">
                        ₹{workshop.price.toLocaleString()}
                      </span>
                      <span className="text-lg text-gray-500 line-through">
                        ₹{workshop.originalPrice.toLocaleString()}
                      </span>
                      <Badge variant="destructive">{discountPercentage}% OFF</Badge>
                    </div>
                    <p className="text-sm text-gray-600">Early bird pricing ends soon!</p>
                  </div>

                  <Separator className="my-4" />

                  {/* Details */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{new Date(workshop.date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{workshop.time}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{workshop.location}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">
                        {availableSeats} seats available of {workshop.seats}
                      </span>
                    </div>
                  </div>

                  {/* Registration Button */}
                  <Button 
                    className="w-full mb-4" 
                    size="lg"
                    disabled={availableSeats === 0}
                  >
                    <DollarSign className="h-4 w-4 mr-2" />
                    {availableSeats > 0 ? 'Register Now' : 'Fully Booked'}
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    30-day money-back guarantee
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default WorkshopDetail;
