import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import DashboardPreview from './components/DashboardPreview';
import Features from './components/Features';
import SocialProof from './components/SocialProof';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import DashboardLayout from './components/DashboardLayout';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Onboarding from './components/auth/Onboarding';
import Checkout from './components/checkout/Checkout';
import FloatingWidgets from './components/FloatingWidgets';

type ViewState = 'landing' | 'dashboard' | 'login' | 'register' | 'checkout' | 'onboarding';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('landing');
  const [userData, setUserData] = useState<any>(null);

  // Listen for custom navigation events from deeply nested components
  useEffect(() => {
    const handleCheckoutNav = () => setCurrentView('checkout');
    window.addEventListener('navigate-checkout', handleCheckoutNav);
    return () => window.removeEventListener('navigate-checkout', handleCheckoutNav);
  }, []);

  // Flow Logic
  if (currentView === 'dashboard') {
    return <DashboardLayout userData={userData} onBack={() => setCurrentView('landing')} />;
  }

  if (currentView === 'onboarding') {
    return (
      <Onboarding 
        onComplete={(data) => {
          setUserData(data);
          setCurrentView('dashboard');
        }}
        onBack={() => setCurrentView('landing')}
      />
    );
  }

  if (currentView === 'login') {
    return (
      <Login 
        onLogin={() => {
            // Simulate fetching existing user profile
            setUserData({
                id: 'user_returning',
                email: 'cliente@exemplo.com',
                user_metadata: {
                    full_name: 'Ricardo Oliveira',
                    avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop'
                }
            });
            setCurrentView('dashboard');
        }} 
        onRegisterClick={() => setCurrentView('register')}
        onBack={() => setCurrentView('landing')}
      />
    );
  }

  if (currentView === 'register') {
    return (
      <Register 
        onRegister={() => setCurrentView('onboarding')} // New users go to onboarding
        onLoginClick={() => setCurrentView('login')}
        onBack={() => setCurrentView('landing')}
      />
    );
  }

  if (currentView === 'checkout') {
    return (
      <Checkout 
        onBack={() => setCurrentView('landing')}
        onSuccess={() => setCurrentView('dashboard')}
      />
    );
  }

  // Render Landing Page
  return (
    <div className="min-h-screen bg-transparent text-slate-400 selection:bg-primary selection:text-white">
      {/* Navbar Section */}
      <Navbar onNavigate={() => setCurrentView('login')} />

      <main className="relative">
        <div className="container mx-auto px-4 pt-32 pb-20">
          {/* Hero redirects to Onboarding (Start Free) */}
          <Hero onNavigate={() => setCurrentView('onboarding')} />
          <DashboardPreview />
          <Features />
        </div>
        
        {/* Full width sections */}
        <SocialProof />
        <Pricing />
        <FAQ />
      </main>

      <Footer />
      <FloatingWidgets />
    </div>
  );
};

export default App;