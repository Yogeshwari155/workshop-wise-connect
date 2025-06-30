
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Router, Route, Switch } from "wouter";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Workshops from "./pages/Workshops";
import WorkshopDetail from "./pages/WorkshopDetail";
import WorkshopRegistration from "./pages/WorkshopRegistration";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Feedback from "./pages/Feedback";
import NotFound from "./pages/NotFound";
import UserManagement from "./pages/UserManagement";
import WorkshopManagement from "./pages/WorkshopManagement";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import { AuthProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <Router>
          <Switch>
            <Route path="/" component={Index} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/workshops" component={Workshops} />
            <Route path="/workshop/:id" component={WorkshopDetail} />
            <Route path="/workshop/:id/register" component={WorkshopRegistration} />
            <Route path="/dashboard" component={UserDashboard} />
            <Route path="/admin" component={AdminDashboard} />
            <Route path="/users" component={UserManagement} />
            <Route path="/workshop-management" component={WorkshopManagement} />
            <Route path="/reports" component={Reports} />
            <Route path="/settings" component={Settings} />
            <Route path="/profile" component={Profile} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route path="/feedback" component={Feedback} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
