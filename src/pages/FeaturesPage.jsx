
import React from 'react';
import { motion } from 'framer-motion';
import FeaturesSection from '@/components/FeaturesSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import CTASection from '@/components/CTASection';

const FeaturesPage = () => {
  return (
    <>
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 relative overflow-hidden">
        <div className="absolute inset-0 hero-gradient -z-10"></div>
        <div className="absolute inset-0 blockchain-pattern opacity-30 -z-10"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Powerful <span className="gradient-text">Features</span> for Smart Contract Management
            </h1>
            <p className="text-xl text-muted-foreground">
              Discover how HALF-CHAIN's innovative features can transform your approach to smart contracts and blockchain technology.
            </p>
          </motion.div>
        </div>
      </section>
      
      <FeaturesSection />
      
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Advanced <span className="gradient-text">Technology</span> Stack
            </h2>
            <p className="text-lg text-muted-foreground">
              Our platform is built on cutting-edge technology to provide the most secure and efficient smart contract experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                  <h3 className="text-xl font-bold mb-3">AI-Powered Contract Generation</h3>
                  <p className="text-muted-foreground">
                    Our advanced AI algorithms analyze your requirements and generate secure, compliant smart contracts tailored to your specific needs.
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                  <h3 className="text-xl font-bold mb-3">Multi-Chain Support</h3>
                  <p className="text-muted-foreground">
                    Deploy your smart contracts across multiple blockchain networks, including Ethereum, Polygon, Binance Smart Chain, and more.
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                  <h3 className="text-xl font-bold mb-3">Automated Security Audits</h3>
                  <p className="text-muted-foreground">
                    Our platform automatically audits your smart contracts for security vulnerabilities before deployment, ensuring maximum protection.
                  </p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800">
                <img  alt="HALF-CHAIN technology stack visualization" className="w-full h-auto" src="https://images.unsplash.com/photo-1677442136019-21780ecad995" />
              </div>
              
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-blue-600 rounded-full blur-3xl opacity-20"></div>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-purple-600 rounded-full blur-3xl opacity-20"></div>
            </motion.div>
          </div>
        </div>
      </section>
      
      <HowItWorksSection />
      <CTASection />
    </>
  );
};

export default FeaturesPage;
