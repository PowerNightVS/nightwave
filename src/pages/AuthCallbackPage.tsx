import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export function AuthCallbackPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const exchangeCodeForToken = async (code: string) => {
    try {
      const response = await fetch('https://powernight.space/api/auth/callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();
      if (data.token) {
        localStorage.setItem('discord_token', data.token);
        navigate('/streams');
      } else {
        console.error('No token received');
        navigate('/');
      }
    } catch (error) {
      console.error('Token exchange failed:', error);
      navigate('/');
    }
  };

  useEffect(() => {
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    if (error) {
      console.error('Discord OAuth error:', error);
      navigate('/');
      return;
    }

    if (code) {
      // Exchange code for token with your backend
      exchangeCodeForToken(code);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, navigate]);

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-cyber-cyan font-mono">Authenticating...</p>
      </div>
    </div>
  );
}
