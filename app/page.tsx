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

// Types for View State Management
type ViewState = 'landing' | 'dashboard' | 'login' | 'register' | 'checkout' | 'onboarding';

export default function Home() {
  const [currentView, setCurrentView] = useState<ViewState>('landing');
  const [userData, setUserData] = useState<any>(null);

  // Effect to handle navigation events from deep components (like Pricing cards)
  useEffect(() => {
    const handleCheckoutNav = () => setCurrentView('checkout');
    const handleLoginNav = () => setCurrentView('login');
    
    if (typeof window !== 'undefined') {
        window.addEventListener('navigate-checkout', handleCheckoutNav);
        window.addEventListener('navigate-login', handleLoginNav);
        
        return () => {
            window.removeEventListener('navigate-checkout', handleCheckoutNav);
            window.removeEventListener('navigate-login', handleLoginNav);
        };
    }
  }, []);

  // --- ROUTING LOGIC ---

  // 1. Dashboard View (Protected)
  if (currentView === 'dashboard') {
    return <DashboardLayout userData={userData} onBack={() => setCurrentView('landing')} />;
  }

  // 2. Onboarding Flow
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

  // 3. Login Screen
  if (currentView === 'login') {
    return (
      <Login 
        onLogin={(mockUser) => {
            if (mockUser && mockUser.onboarding_completed) {
                setUserData(mockUser);
                setCurrentView('dashboard');
            } else {
                setUserData(mockUser);
                setCurrentView('onboarding');
            }
        }} 
        onRegisterClick={() => setCurrentView('register')}
        onBack={() => setCurrentView('landing')}
      />
    );
  }

  // 4. Register Screen
  if (currentView === 'register') {
    return (
      <Register 
        onRegister={() => setCurrentView('onboarding')} 
        onLoginClick={() => setCurrentView('login')}
        onBack={() => setCurrentView('landing')}
      />
    );
  }

  // 5. Checkout Screen
  if (currentView === 'checkout') {
    return (
      <Checkout 
        onBack={() => setCurrentView('landing')}
        onSuccess={() => {
            // Simulate successful purchase leading to dashboard
            setUserData({
                id: 'paid_user',
                user_metadata: { full_name: 'Cliente VIP', avatar_url: null }
            });
            setCurrentView('dashboard');
        }}
      />
    );
  }

  // 6. Landing Page (Default)
  return (
    <div className="min-h-screen bg-transparent text-slate-400 selection:bg-primary selection:text-white font-sans">
      <Navbar onNavigate={() => setCurrentView('login')} />

      <main className="relative">
        <div className="container mx-auto px-4 pt-32 pb-20">
          <Hero onNavigate={() => setCurrentView('onboarding')} />
          <DashboardPreview />
          <Features />
        </div>
        
        <SocialProof />
        <Pricing />
        <FAQ />
      </main>

      <Footer />
      <FloatingWidgets />
    </div>
  );
}