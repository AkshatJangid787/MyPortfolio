
import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Services from "./pages/Services";
import References from "./pages/References";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import About from "./pages/About";
import Preloader from "./components/Preloader";
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

const queryClient = new QueryClient();

const App = () => {
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    // Set minimum preloader duration of 4 seconds
    const timer = setTimeout(() => {
      setShowPreloader(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const handlePreloaderComplete = () => {
    setShowPreloader(false);
  };

  if (showPreloader) {
    return <Preloader onComplete={handlePreloaderComplete} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navbar />
          <main className="min-h-screen">
            <Routes>
              <Route path="/akshu-secret-login" element={<AdminLogin />} />
               <Route path="/akshu-secret-login/dashboard" element={<AdminDashboard />} />
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/references" element={<References />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
