
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Zap, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      <div className="absolute inset-0 hero-gradient -z-10"></div>
      <div className="absolute inset-0 blockchain-pattern opacity-10 -z-10"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-foreground">
              Smart Contract <span className="accent-text">Automation</span> Powered by AI
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl">
              HALF-CHAIN combines blockchain technology with AI to create secure, 
              transparent, and compliant smart contracts for businesses and individuals.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="rounded-full">
                <Link to="/smart-contracts">
                  Create Smart Contract <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg" className="rounded-full text-foreground hover:bg-primary/10">
                <Link to="/features">
                  Explore Features
                </Link>
              </Button>
            </div>
            
            <div className="flex items-center mt-8 text-sm text-muted-foreground">
              <Shield className="h-5 w-5 mr-2 text-primary" />
              <span>Enterprise-grade security</span>
              <span className="mx-2">•</span>
              <Zap className="h-5 w-5 mr-2 text-primary" />
              <span>Regulatory compliant</span>
              <span className="mx-2">•</span>
              <FileText className="h-5 w-5 mr-2 text-primary" />
              <span>AML/KYC integrated</span>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-xl overflow-hidden shadow-2xl border border-border">
              <img-replace alt="HALF-CHAIN platform interface showing code and network graphics" className="w-full h-auto" />
            </div>
            
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary/30 rounded-full blur-3xl opacity-50"></div>
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/20 rounded-full blur-3xl opacity-40"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
