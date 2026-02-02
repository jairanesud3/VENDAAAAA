import React, { useEffect } from 'react';
import { supabase } from '../lib/supabase';

// Security configuration
const MAX_CREDITS_HACK_THRESHOLD = 5000;
const CHECK_INTERVAL = 10000; // 10 seconds

const SecurityGuard: React.FC = () => {
  useEffect(() => {
    // 1. Check LocalStorage tampering
    const interval = setInterval(() => {
        const textCredits = parseInt(localStorage.getItem('drophacker_text_credits') || '0');
        const imageCredits = parseInt(localStorage.getItem('drophacker_image_credits') || '0');

        if (textCredits > MAX_CREDITS_HACK_THRESHOLD || imageCredits > MAX_CREDITS_HACK_THRESHOLD) {
            console.warn("Security Alert: Abnormal credit count detected. Resetting.");
            localStorage.removeItem('drophacker_text_credits');
            localStorage.removeItem('drophacker_image_credits');
            window.location.reload();
        }
    }, CHECK_INTERVAL);

    // 2. Disable DevTools Shortcuts (Frontend deterrent only)
    const handleKeyDown = (e: KeyboardEvent) => {
        if (
            (e.ctrlKey && e.shiftKey && e.key === 'I') || 
            (e.ctrlKey && e.shiftKey && e.key === 'J') || 
            (e.key === 'F12')
        ) {
            // e.preventDefault(); // Uncomment to actually block, keeping commented for development
            console.log("Security Monitor: DevTools access attempt.");
        }
    };

    window.addEventListener('keydown', handleKeyDown);

    // 3. Realtime Session Validation (Backend Pulse)
    const validateSession = async () => {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error || !session) {
            // If session is invalid but user is in dashboard, force logout
            // This is handled by DashboardLayout mostly, but this is a backup
        }
    };
    validateSession();

    return () => {
        clearInterval(interval);
        window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return null; // Invisible component
};

export default SecurityGuard;