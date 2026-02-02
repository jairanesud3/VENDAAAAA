"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import DashboardPreview from '../components/DashboardPreview';
import Features from '../components/Features';
import SocialProof from '../components/SocialProof';
import Pricing from '../components/Pricing';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import DashboardLayout from '../components/DashboardLayout';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import Onboarding from '../components/auth/Onboarding';
import Checkout from '../components/checkout/Checkout';
import FloatingWidgets from '../components/FloatingWidgets';

type ViewState = 'landing' | 'dashboard' | 'login' | 'register' | 'checkout' | 'onboarding';

export default function Home() {
  const [currentView, setCurrentView] = useState<ViewState>('landing');
  const [userData, setUserData] = useState<any>(null);

  // Listen for custom navigation events from deeply nested components
  useEffect(() => {
    const handleCheckoutNav = () => setCurrentView('checkout');
    if (typeof window !== 'undefined') {
        window.addEventListener('navigate-checkout', handleCheckoutNav);
        return () => window.removeEventListener('navigate-checkout', handleCheckoutNav);
    }
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
        onLogin={(mockUser) => {
            // AUTH FLOW LOGIC:
            if (mockUser && mockUser.onboarding_completed) {
                setUserData(mockUser);
                setCurrentView('dashboard');
            } else {
                setUserData(mockUser); // Keep partial data if any
                setCurrentView('onboarding');
            }
        }} 
        onRegisterClick={() => setCurrentView('register')}
        onBack={() => setCurrentView('landing')}
      />
    );
  }

  if (currentView === 'register') {
    return (
      <Register 
        onRegister={() => setCurrentView('onboarding')} // New registrations always go to onboarding
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
}