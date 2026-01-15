import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { FeaturesPage } from './pages/FeaturesPage';
import { SupportPage } from './pages/SupportPage';
import { StreamsPage } from './pages/StreamsPage';
import { AuthCallbackPage } from './pages/AuthCallbackPage';
export function App() {
  return <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/streams" element={<StreamsPage />} />
          <Route path="/auth/callback" element={<AuthCallbackPage />} />
        </Routes>
      </Layout>
    </Router>;
}