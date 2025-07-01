
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Users, Calendar, MapPin, Image, Video } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

interface GalleryItem {
  id: number;
  type: 'image' | 'video';
  src: string;
  title: string;
  date: string;
  location: string;
  participants: number;
  description: string;
  tags: string[];
}

const Gallery = () => {
  const [filter, setFilter] = useState<'all' | 'image' | 'video'>('all');

  const galleryItems: GalleryItem[] = [
    {
      id: 1,
      type: 'image',
      src: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop',
      title: 'React Development Workshop',
      date: '2024-03-15',
      location: 'Tech Hub, Mumbai',
      participants: 35,
      description: 'Hands-on React development session with industry experts',
      tags: ['React', 'Frontend', 'JavaScript']
    },
    {
      id: 2,
      type: 'image',
      src: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop',
      title: 'AI & Machine Learning Bootcamp',
      date: '2024-02-28',
      location: 'Innovation Center, Bangalore',
      participants: 42,
      description: 'Deep dive into ML algorithms and practical AI applications',
      tags: ['AI', 'Machine Learning', 'Python']
    },
    {
      id: 3,
      type: 'video',
      src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop',
      title: 'Full Stack Development Workshop',
      date: '2024-01-20',
      location: 'CodeSpace, Delhi',
      participants: 28,
      description: 'Complete web development from frontend to backend',
      tags: ['Full Stack', 'Node.js', 'React']
    },
    {
      id: 4,
      type: 'image',
      src: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop',
      title: 'Data Science Workshop',
      date: '2024-01-10',
      location: 'DataLab, Pune',
      participants: 38,
      description: 'Data analysis, visualization, and statistical modeling',
      tags: ['Data Science', 'Python', 'Analytics']
    },
    {
      id: 5,
      type: 'video',
      src: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800&h=600&fit=crop',
      title: 'Cloud Computing Seminar',
      date: '2023-12-15',
      location: 'CloudCon, Hyderabad',
      participants: 55,
      description: 'AWS, Azure, and Google Cloud platform overview',
      tags: ['Cloud', 'AWS', 'DevOps']
    },
    {
      id: 6,
      type: 'image',
      src: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop',
      title: 'Cybersecurity Workshop',
      date: '2023-11-30',
      location: 'SecureHub, Chennai',
      participants: 31,
      description: 'Network security, ethical hacking, and data protection',
      tags: ['Security', 'Networking', 'Ethical Hacking']
    }
  ];

  const filteredItems = galleryItems.filter(item => 
    filter === 'all' || item.type === filter
  );

  const stats = {
    totalEvents: galleryItems.length,
    totalParticipants: galleryItems.reduce((sum, item) => sum + item.participants, 0),
    cities: Array.from(new Set(galleryItems.map(item => item.location.split(', ')[1]))).length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Navigation />
      
      <div className="container mx-auto px-4 py-16">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Gallery & Past Events
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Take a look at our successful workshops and the amazing learning experiences 
            we've created together with our community of developers and tech enthusiasts.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="text-3xl font-bold text-primary-600 mb-2">{stats.totalEvents}</div>
              <div className="text-gray-600">Workshops Conducted</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="text-3xl font-bold text-accent-600 mb-2">{stats.totalParticipants}+</div>
              <div className="text-gray-600">Happy Participants</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="text-3xl font-bold text-green-600 mb-2">{stats.cities}</div>
              <div className="text-gray-600">Cities Covered</div>
            </div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-sm border">
            <Button
              variant={filter === 'all' ? 'default' : 'ghost'}
              onClick={() => setFilter('all')}
              className="mx-1"
            >
              All Media
            </Button>
            <Button
              variant={filter === 'image' ? 'default' : 'ghost'}
              onClick={() => setFilter('image')}
              className="mx-1"
            >
              <Image className="h-4 w-4 mr-2" />
              Photos
            </Button>
            <Button
              variant={filter === 'video' ? 'default' : 'ghost'}
              onClick={() => setFilter('video')}
              className="mx-1"
            >
              <Video className="h-4 w-4 mr-2" />
              Videos
            </Button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative">
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-64 object-cover"
                />
                {item.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                    <div className="bg-white bg-opacity-90 rounded-full p-3">
                      <Play className="h-8 w-8 text-primary-600" />
                    </div>
                  </div>
                )}
                <div className="absolute top-3 right-3">
                  <Badge variant={item.type === 'video' ? 'destructive' : 'secondary'}>
                    {item.type === 'video' ? 'Video' : 'Photo'}
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {item.description}
                </p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-2" />
                    {new Date(item.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-2" />
                    {item.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="h-4 w-4 mr-2" />
                    {item.participants} participants
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Join Our Next Workshop?
            </h2>
            <p className="text-xl mb-6 opacity-90">
              Don't miss out on our upcoming events. Register now and be part of our growing community!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-white text-primary-600 hover:bg-gray-100">
                View Upcoming Workshops
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary-600">
                Join Our Community
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Gallery;
