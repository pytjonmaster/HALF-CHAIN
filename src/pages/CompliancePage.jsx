
import React from 'react';
import { motion } from 'framer-motion';
import ComplianceSection from '@/components/ComplianceSection';
import CTASection from '@/components/CTASection';

const CompliancePage = () => {
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
              Regulatory <span className="gradient-text">Compliance</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              HALF-CHAIN ensures all smart contracts meet regulatory requirements with built-in KYC/AML verification and compliance features.
            </p>
          </motion.div>
        </div>
      </section>
      
      <ComplianceSection />
      
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Global Regulatory <span className="gradient-text">Standards</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Our platform is designed to comply with regulatory standards across multiple jurisdictions, ensuring your smart contracts are legally sound wherever you operate.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center shrink-0 mr-4">
                    <span className="font-bold text-blue-600 dark:text-blue-300">1</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">Multi-Jurisdictional Compliance</h3>
                    <p className="text-muted-foreground">
                      Our system automatically adapts to the regulatory requirements of different countries and regions.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center shrink-0 mr-4">
                    <span className="font-bold text-blue-600 dark:text-blue-300">2</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">Regulatory Updates</h3>
                    <p className="text-muted-foreground">
                      We continuously monitor regulatory changes and update our compliance mechanisms accordingly.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center shrink-0 mr-4">
                    <span className="font-bold text-blue-600 dark:text-blue-300">3</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">Compliance Reporting</h3>
                    <p className="text-muted-foreground">
                      Generate comprehensive compliance reports for auditors and regulatory authorities.
                    </p>
                  </div>
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
                <img  alt="Global regulatory compliance visualization" className="w-full h-auto" src="https://images.unsplash.com/photo-1526378943601-d11040cfc513" />
              </div>
              
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-blue-600 rounded-full blur-3xl opacity-20"></div>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-purple-600 rounded-full blur-3xl opacity-20"></div>
            </motion.div>
          </div>
        </div>
      </section>
      
      <CTASection />
    </>
  );
};

export default CompliancePage;
