import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Layouts
import MainLayout from '@/layouts/MainLayout';

// Pages
import HomePage from '@/pages/HomePage';
import FeaturesPage from '@/pages/FeaturesPage';
import SmartContractPage from '@/pages/SmartContractPage';
import CompliancePage from '@/pages/CompliancePage';
import NotFoundPage from '@/pages/NotFoundPage';

// Auth Components
import SignIn from '@/components/SignIn';
import SignUp from '@/components/SignUp';
import ForgotPassword from '@/components/ForgotPassword';
import ResetPassword from '@/components/ResetPassword';
import { AuthProvider } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
    <AnimatePresence mode="wait">
      <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="features" element={<FeaturesPage />} />
            <Route 
              path="smart-contracts" 
              element={
                <ProtectedRoute>
                  <SmartContractPage />
                </ProtectedRoute>
              } 
            />
          <Route path="compliance" element={<CompliancePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </AnimatePresence>
    </AuthProvider>
  );
}

export default App;
