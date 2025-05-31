
import React from 'react';
import { motion } from 'framer-motion';
import SmartContractForm from '@/components/SmartContractForm';

const SmartContractPage = () => {
  return (
    <>
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 relative overflow-hidden bg-background/90 backdrop-blur-2xl">
        <div className="absolute inset-0 hero-gradient opacity-60 -z-20"></div>
        <div className="absolute inset-0 blockchain-pattern opacity-10 -z-10"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Create Your <span className="accent-text">Smart Contract</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Use our AI-powered platform to create, customize, and deploy secure smart contracts in minutes.
            </p>
          </motion.div>
          
          <SmartContractForm />
        </div>
      </section>
    </>
  );
};

export default SmartContractPage;
