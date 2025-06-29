
import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { TrendingUp, Users, Calendar, DollarSign, Download, Filter } from 'lucide-react';

const Reports = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [reportType, setReportType] = useState('overview');

  // Mock data for charts
  const workshopData = [
    { month: 'Jan', workshops: 12, users: 45, revenue: 25000 },
    { month: 'Feb', workshops: 15, users: 52, revenue: 32000 },
    { month: 'Mar', workshops: 18, users: 68, revenue: 41000 },
    { month: 'Apr', workshops: 22, users: 89, revenue: 55000 },
    { month: 'May', workshops: 25, users: 95, revenue: 62000 },
    { month: 'Jun', workshops: 28, users: 112, revenue: 78000 }
  ];

  const categoryData = [
    { name: 'Technology', value: 35, color: '#8884d8' },
    { name: 'Marketing', value: 25, color: '#82ca9d' },
    { name: 'Design', value: 20, color: '#ffc658' },
    { name: 'Business', value: 15, color: '#ff7300' },
    { name: 'Others', value: 5, color: '#00ff88' }
  ];

  const userGrowthData = [
    { month: 'Jan', total: 150, new: 25 },
    { month: 'Feb', total: 180, new: 30 },
    { month: 'Mar', total: 220, new: 40 },
    { month: 'Apr', total: 280, new: 60 },
    { month: 'May', total: 350, new: 70 },
    { month: 'Jun', total: 425, new: 75 }
  ];

  const topWorkshops = [
    { title: 'Advanced React Development', registrations: 45, rating: 4.8, revenue: 12000 },
    { title: 'Digital Marketing Masterclass', registrations: 38, rating: 4.6, revenue: 9500 },
    { title: 'UI/UX Design Workshop', registrations: 32, rating: 4.9, revenue: 8000 },
    { title: 'Data Science Fundamentals', registrations: 28, rating: 4.7, revenue: 7000 },
    { title: 'Python for Beginners', registrations: 25, rating: 4.5, revenue: 0 }
  ];

  const recentActivities = [
    { type: 'registration', user: 'John Doe', workshop: 'React Development', time: '2 hours ago' },
    { type: 'completion', user: 'Jane Smith', workshop: 'Digital Marketing', time: '4 hours ago' },
    { type: 'new_workshop', workshop: 'AI Fundamentals', company: 'TechCorp', time: '6 hours ago' },
    { type: 'payment', user: 'Mike Johnson', amount: 1500, time: '8 hours ago' },
    { type: 'review', user: 'Sarah Wilson', workshop: 'UI/UX Design', rating: 5, time: '1 day ago' }
  ];

  const exportReport = () => {
    // Mock export functionality
    const reportData = {
      timeRange,
      reportType,
      workshopData,
      categoryData,
      userGrowthData,
      topWorkshops,
      generatedAt: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `workshop-report-${timeRange}-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
                Reports & Analytics
              </h1>
              <p className="text-gray-600">
                Comprehensive insights into workshop performance and user engagement
              </p>
            </div>
            <div className="flex space-x-4">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Last Week</SelectItem>
                  <SelectItem value="month">Last Month</SelectItem>
                  <SelectItem value="quarter">Last Quarter</SelectItem>
                  <SelectItem value="year">Last Year</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={exportReport} variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Workshops</p>
                  <p className="text-2xl font-bold text-gray-900">156</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +12% from last month
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900">2,847</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +18% from last month
                  </p>
                </div>
                <Users className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">₹4,85,000</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +25% from last month
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg. Rating</p>
                  <p className="text-2xl font-bold text-gray-900">4.7</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +0.2 from last month
                  </p>
                </div>
                <div className="text-2xl">⭐</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Workshop Performance Chart */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Workshop Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={workshopData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="workshops" fill="#8884d8" name="Workshops" />
                  <Bar dataKey="users" fill="#82ca9d" name="Registrations" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Category Distribution */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Workshop Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* User Growth Chart */}
        <Card className="border-0 shadow-lg mb-8">
          <CardHeader>
            <CardTitle>User Growth Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="total" stroke="#8884d8" name="Total Users" strokeWidth={2} />
                <Line type="monotone" dataKey="new" stroke="#82ca9d" name="New Users" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Performing Workshops */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Top Performing Workshops</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topWorkshops.map((workshop, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{workshop.title}</h4>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-sm text-gray-600">{workshop.registrations} registrations</span>
                        <div className="flex items-center space-x-1">
                          <span className="text-sm text-yellow-600">⭐ {workshop.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      {workshop.revenue > 0 ? (
                        <span className="font-medium text-green-600">₹{workshop.revenue.toLocaleString()}</span>
                      ) : (
                        <Badge className="bg-green-500 text-white">FREE</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0">
                      {activity.type === 'registration' && <Users className="h-5 w-5 text-blue-600" />}
                      {activity.type === 'completion' && <Calendar className="h-5 w-5 text-green-600" />}
                      {activity.type === 'new_workshop' && <TrendingUp className="h-5 w-5 text-purple-600" />}
                      {activity.type === 'payment' && <DollarSign className="h-5 w-5 text-yellow-600" />}
                      {activity.type === 'review' && <span className="text-lg">⭐</span>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-gray-900">
                        {activity.type === 'registration' && (
                          <>
                            <span className="font-medium">{activity.user}</span> registered for{' '}
                            <span className="font-medium">{activity.workshop}</span>
                          </>
                        )}
                        {activity.type === 'completion' && (
                          <>
                            <span className="font-medium">{activity.user}</span> completed{' '}
                            <span className="font-medium">{activity.workshop}</span>
                          </>
                        )}
                        {activity.type === 'new_workshop' && (
                          <>
                            New workshop <span className="font-medium">{activity.workshop}</span> added by{' '}
                            <span className="font-medium">{activity.company}</span>
                          </>
                        )}
                        {activity.type === 'payment' && (
                          <>
                            <span className="font-medium">{activity.user}</span> made a payment of{' '}
                            <span className="font-medium">₹{activity.amount}</span>
                          </>
                        )}
                        {activity.type === 'review' && (
                          <>
                            <span className="font-medium">{activity.user}</span> rated{' '}
                            <span className="font-medium">{activity.workshop}</span> {activity.rating} stars
                          </>
                        )}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">{activity.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Reports;
