import React, { useState } from 'react';
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
import Checkout from './components/checkout/Checkout';
import FloatingWidgets from './components/FloatingWidgets';

type ViewState = 'landing' | 'dashboard' | 'login' | 'register' | 'checkout';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('landing');

  // Simple Routing
  if (currentView === 'dashboard') {
    return <DashboardLayout onBack={() => setCurrentView('landing')} />;
  }

  if (currentView === 'login') {
    return (
      <Login 
        onLogin={() => setCurrentView('dashboard')} 
        onRegisterClick={() => setCurrentView('register')}
        onBack={() => setCurrentView('landing')}
      />
    );
  }

  if (currentView === 'register') {
    return (
      <Register 
        onRegister={() => setCurrentView('dashboard')}
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
          <Hero onNavigate={() => setCurrentView('checkout')} />
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