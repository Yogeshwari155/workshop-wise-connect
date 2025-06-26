
import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Calendar, Users, MapPin, IndianRupee, ArrowRight, Star, Building } from 'lucide-react';

const Index = () => {
  const featuredWorkshops = [
    {
      id: 1,
      title: "Advanced React Development",
      company: "TechCorp Solutions",
      date: "15 Jan 2025",
      time: "10:00 AM",
      mode: "Online",
      price: 2500,
      seats: 25,
      bookedSeats: 18,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=200&fit=crop",
      tags: ["React", "JavaScript", "Frontend"]
    },
    {
      id: 2,
      title: "Digital Marketing Masterclass",
      company: "Growth Academy",
      date: "20 Jan 2025",
      time: "2:00 PM",
      mode: "Hybrid",
      location: "Mumbai",
      price: 0,
      seats: 50,
      bookedSeats: 35,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=200&fit=crop",
      tags: ["Marketing", "Business", "Growth"]
    },
    {
      id: 3,
      title: "Python for Beginners",
      company: "CodeAcademy",
      date: "25 Jan 2025",
      time: "11:00 AM",
      mode: "Online",
      price: 1800,
      seats: 30,
      bookedSeats: 22,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=200&fit=crop",
      tags: ["Python", "Programming", "Beginner"]
    }
  ];

  const categories = [
    { name: "Programming", icon: "💻", count: 24 },
    { name: "Design", icon: "🎨", count: 18 },
    { name: "Business", icon: "📊", count: 32 },
    { name: "Marketing", icon: "📢", count: 15 },
    { name: "Data Science", icon: "📈", count: 12 },
    { name: "Photography", icon: "📸", count: 8 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-display font-bold text-gray-900 mb-6">
              Learn from the{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-600">
                Best Experts
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Join thousands of learners in hands-on workshops led by industry professionals. 
              From coding to design, marketing to business - find your next skill.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/workshops">
                <Button size="lg" className="bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 px-8 py-4 text-lg">
                  Explore Workshops
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/register">
                <Button size="lg" variant="outline" className="px-8 py-4 text-lg">
                  Get Started Free
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-center text-gray-900 mb-12">
            Popular Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category) => (
              <Link key={category.name} to="/workshops">
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-3">{category.icon}</div>
                    <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                    <p className="text-sm text-gray-600">{category.count} workshops</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Workshops */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-display font-bold text-gray-900">
              Workshops Near You
            </h2>
            <Link to="/workshops">
              <Button variant="outline">View All</Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredWorkshops.map((workshop) => (
              <Link key={workshop.id} to={`/workshop/${workshop.id}`}>
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                  <div className="relative">
                    <img 
                      src={workshop.image} 
                      alt={workshop.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      {workshop.price === 0 ? (
                        <Badge className="bg-green-500 text-white">FREE</Badge>
                      ) : (
                        <Badge className="bg-primary-500 text-white">PAID</Badge>
                      )}
                      <Badge variant="secondary">{workshop.mode}</Badge>
                    </div>
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{workshop.rating}</span>
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{workshop.title}</h3>
                    <p className="text-gray-600 mb-4 flex items-center">
                      <Building className="h-4 w-4 mr-1" />
                      {workshop.company}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {workshop.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{workshop.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{workshop.seats - workshop.bookedSeats} seats left</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        {workshop.price === 0 ? (
                          <span className="text-2xl font-bold text-green-600">FREE</span>
                        ) : (
                          <div className="flex items-center">
                            <IndianRupee className="h-5 w-5 text-gray-900" />
                            <span className="text-2xl font-bold text-gray-900">{workshop.price}</span>
                          </div>
                        )}
                      </div>
                      {workshop.location && (
                        <div className="flex items-center space-x-1 text-gray-600">
                          <MapPin className="h-4 w-4" />
                          <span>{workshop.location}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming This Week */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-center text-gray-900 mb-12">
            Upcoming Events This Week
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredWorkshops.slice(0, 4).map((workshop) => (
              <Link key={workshop.id} to={`/workshop/${workshop.id}`}>
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="bg-gradient-to-r from-primary-500 to-accent-500 p-2 rounded-lg">
                        <Calendar className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{workshop.title}</h3>
                        <p className="text-sm text-gray-600">{workshop.company}</p>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      <p>{workshop.date} • {workshop.time}</p>
                      <p className="mt-1">{workshop.mode} • {workshop.seats - workshop.bookedSeats} seats left</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
