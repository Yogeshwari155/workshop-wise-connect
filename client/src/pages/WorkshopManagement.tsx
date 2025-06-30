
import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useToast } from '../hooks/use-toast';
import { Workshop } from '../types/workshop';
import { Calendar, Plus, Edit, Trash2, Search, Filter, MapPin, Clock, Users } from 'lucide-react';

const WorkshopManagement = () => {
  const { toast } = useToast();
  const [workshops, setWorkshops] = useState<Workshop[]>([
    {
      id: 1,
      title: "Advanced React Development",
      company: "TechCorp Solutions",
      date: "15 Jan 2025",
      time: "10:00 AM",
      mode: "Online",
      status: "available",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=200&fit=crop",
      price: 0,
      seats: 30,
      registeredSeats: 12
    },
    {
      id: 2,
      title: "Digital Marketing Masterclass",
      company: "Growth Academy",
      date: "20 Jan 2025",
      time: "2:00 PM",
      mode: "Hybrid",
      location: "Mumbai",
      status: "available",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=300&h=200&fit=crop",
      price: 1500,
      seats: 25,
      registeredSeats: 8
    },
    {
      id: 3,
      title: "Data Science Fundamentals",
      company: "DataMinds Inc",
      date: "10 Jan 2025",
      time: "9:00 AM",
      mode: "Offline",
      location: "Bangalore",
      status: "completed",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=300&h=200&fit=crop",
      price: 2000,
      seats: 20,
      registeredSeats: 20
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [modeFilter, setModeFilter] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingWorkshop, setEditingWorkshop] = useState<Workshop | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    date: '',
    time: '',
    mode: 'Online' as Workshop['mode'],
    location: '',
    price: 0,
    seats: 30,
    description: ''
  });

  const filteredWorkshops = workshops.filter(workshop => {
    const matchesSearch = workshop.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workshop.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || workshop.status === statusFilter;
    const matchesMode = modeFilter === 'all' || workshop.mode === modeFilter;
    return matchesSearch && matchesStatus && matchesMode;
  });

  const handleAddWorkshop = () => {
    const newWorkshop: Workshop = {
      id: Date.now(),
      title: formData.title,
      company: formData.company,
      date: formData.date,
      time: formData.time,
      mode: formData.mode,
      location: formData.mode !== 'Online' ? formData.location : undefined,
      status: 'available',
      image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=300&h=200&fit=crop",
      price: formData.price,
      seats: formData.seats,
      registeredSeats: 0
    };

    setWorkshops([...workshops, newWorkshop]);
    setFormData({ title: '', company: '', date: '', time: '', mode: 'Online', location: '', price: 0, seats: 30, description: '' });
    setIsAddDialogOpen(false);
    
    toast({
      title: "Workshop Added Successfully! ✅",
      description: `${newWorkshop.title} has been added to the system.`,
    });
  };

  const handleEditWorkshop = (workshop: Workshop) => {
    setEditingWorkshop(workshop);
    setFormData({
      title: workshop.title,
      company: workshop.company,
      date: workshop.date,
      time: workshop.time,
      mode: workshop.mode,
      location: workshop.location || '',
      price: workshop.price,
      seats: workshop.seats || 30,
      description: ''
    });
  };

  const handleUpdateWorkshop = () => {
    if (!editingWorkshop) return;

    const updatedWorkshops = workshops.map(workshop =>
      workshop.id === editingWorkshop.id
        ? { 
            ...workshop, 
            ...formData,
            location: formData.mode !== 'Online' ? formData.location : undefined
          }
        : workshop
    );

    setWorkshops(updatedWorkshops);
    setEditingWorkshop(null);
    setFormData({ title: '', company: '', date: '', time: '', mode: 'Online', location: '', price: 0, seats: 30, description: '' });
    
    toast({
      title: "Workshop Updated Successfully! ✅",
      description: `${formData.title} has been updated.`,
    });
  };

  const handleDeleteWorkshop = (workshopId: number) => {
    const workshopToDelete = workshops.find(w => w.id === workshopId);
    setWorkshops(workshops.filter(workshop => workshop.id !== workshopId));
    
    toast({
      title: "Workshop Deleted! 🗑️",
      description: `${workshopToDelete?.title} has been removed from the system.`,
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'available':
        return <Badge className="bg-green-500 text-white">Available</Badge>;
      case 'completed':
        return <Badge className="bg-blue-500 text-white">Completed</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-500 text-white">Cancelled</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getModeBadge = (mode: string) => {
    switch (mode) {
      case 'Online':
        return <Badge className="bg-purple-500 text-white">Online</Badge>;
      case 'Offline':
        return <Badge className="bg-orange-500 text-white">Offline</Badge>;
      case 'Hybrid':
        return <Badge className="bg-cyan-500 text-white">Hybrid</Badge>;
      default:
        return <Badge variant="secondary">{mode}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
            Workshop Management
          </h1>
          <p className="text-gray-600">
            Manage all workshops in the system
          </p>
        </div>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>All Workshops ({filteredWorkshops.length})</span>
              </CardTitle>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-primary-500 to-accent-500">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Workshop
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Add New Workshop</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Title</Label>
                        <Input
                          value={formData.title}
                          onChange={(e) => setFormData({...formData, title: e.target.value})}
                          placeholder="Enter workshop title"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Company</Label>
                        <Input
                          value={formData.company}
                          onChange={(e) => setFormData({...formData, company: e.target.value})}
                          placeholder="Enter company name"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Date</Label>
                        <Input
                          type="date"
                          value={formData.date}
                          onChange={(e) => setFormData({...formData, date: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Time</Label>
                        <Input
                          type="time"
                          value={formData.time}
                          onChange={(e) => setFormData({...formData, time: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Mode</Label>
                        <Select value={formData.mode} onValueChange={(value: Workshop['mode']) => setFormData({...formData, mode: value})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Online">Online</SelectItem>
                            <SelectItem value="Offline">Offline</SelectItem>
                            <SelectItem value="Hybrid">Hybrid</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      {formData.mode !== 'Online' && (
                        <div className="space-y-2">
                          <Label>Location</Label>
                          <Input
                            value={formData.location}
                            onChange={(e) => setFormData({...formData, location: e.target.value})}
                            placeholder="Enter location"
                          />
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Price (₹)</Label>
                        <Input
                          type="number"
                          value={formData.price}
                          onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                          placeholder="0"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Total Seats</Label>
                        <Input
                          type="number"
                          value={formData.seats}
                          onChange={(e) => setFormData({...formData, seats: Number(e.target.value)})}
                          placeholder="30"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        placeholder="Enter workshop description"
                        rows={3}
                      />
                    </div>

                    <div className="flex space-x-2">
                      <Button onClick={handleAddWorkshop} className="flex-1">
                        Add Workshop
                      </Button>
                      <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="flex-1">
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            
            {/* Search and Filter */}
            <div className="flex space-x-4 mt-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  className="pl-10"
                  placeholder="Search workshops..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Select value={modeFilter} onValueChange={setModeFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Modes</SelectItem>
                  <SelectItem value="Online">Online</SelectItem>
                  <SelectItem value="Offline">Offline</SelectItem>
                  <SelectItem value="Hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Workshop</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Mode & Location</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Seats</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredWorkshops.map((workshop) => (
                  <TableRow key={workshop.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <img src={workshop.image} alt={workshop.title} className="w-12 h-12 rounded-lg object-cover" />
                        <div>
                          <div className="font-medium">{workshop.title}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{workshop.company}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1 text-sm">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span>{workshop.date}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span>{workshop.time}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {getModeBadge(workshop.mode)}
                        {workshop.location && (
                          <div className="flex items-center space-x-1 text-sm text-gray-600">
                            <MapPin className="h-3 w-3" />
                            <span>{workshop.location}</span>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {workshop.price === 0 ? (
                        <Badge className="bg-green-500 text-white">FREE</Badge>
                      ) : (
                        <span className="font-medium">₹{workshop.price}</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">
                          {workshop.registeredSeats || 0}/{workshop.seats || 0}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(workshop.status)}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Dialog open={editingWorkshop?.id === workshop.id} onOpenChange={(open) => !open && setEditingWorkshop(null)}>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditWorkshop(workshop)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Edit Workshop</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 max-h-96 overflow-y-auto">
                              {/* Same form fields as Add Workshop */}
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label>Title</Label>
                                  <Input
                                    value={formData.title}
                                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label>Company</Label>
                                  <Input
                                    value={formData.company}
                                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                                  />
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label>Date</Label>
                                  <Input
                                    type="date"
                                    value={formData.date}
                                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label>Time</Label>
                                  <Input
                                    type="time"
                                    value={formData.time}
                                    onChange={(e) => setFormData({...formData, time: e.target.value})}
                                  />
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label>Mode</Label>
                                  <Select value={formData.mode} onValueChange={(value: Workshop['mode']) => setFormData({...formData, mode: value})}>
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="Online">Online</SelectItem>
                                      <SelectItem value="Offline">Offline</SelectItem>
                                      <SelectItem value="Hybrid">Hybrid</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                {formData.mode !== 'Online' && (
                                  <div className="space-y-2">
                                    <Label>Location</Label>
                                    <Input
                                      value={formData.location}
                                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                                    />
                                  </div>
                                )}
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label>Price (₹)</Label>
                                  <Input
                                    type="number"
                                    value={formData.price}
                                    onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label>Total Seats</Label>
                                  <Input
                                    type="number"
                                    value={formData.seats}
                                    onChange={(e) => setFormData({...formData, seats: Number(e.target.value)})}
                                  />
                                </div>
                              </div>

                              <div className="flex space-x-2">
                                <Button onClick={handleUpdateWorkshop} className="flex-1">
                                  Update Workshop
                                </Button>
                                <Button variant="outline" onClick={() => setEditingWorkshop(null)} className="flex-1">
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteWorkshop(workshop.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default WorkshopManagement;
