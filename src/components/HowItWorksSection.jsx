
import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Cpu, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const steps = [
  {
    icon: <FileText className="h-10 w-10 text-primary-foreground" />,
    title: 'Define Requirements',
    description: 'Specify your contract requirements through our intuitive interface or API.'
  },
  {
    icon: <Cpu className="h-10 w-10 text-primary-foreground" />,
    title: 'AI Generation',
    description: 'Our AI analyzes your requirements and generates a secure, compliant smart contract.'
  },
  {
    icon: <CheckCircle className="h-10 w-10 text-primary-foreground" />,
    title: 'Review & Deploy',
    description: 'Review the generated contract, make any necessary adjustments, and deploy to the blockchain.'
  }
];

const HowItWorksSection = () => {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden bg-card">
      <div className="absolute inset-0 grid-pattern opacity-5 -z-10"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            How <span className="accent-text">HALF-CHAIN</span> Works
          </h2>
          <p className="text-lg text-muted-foreground">
            Our streamlined process makes creating and deploying smart contracts simple and efficient.
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row justify-between items-stretch gap-8 lg:gap-4">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="w-full lg:w-1/3 flex"
              >
                <div className="bg-gradient-to-br from-primary/80 to-primary rounded-xl p-8 h-full w-full shadow-xl">
                  <div className="bg-background/20 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold text-primary-foreground mb-4">{step.title}</h3>
                  <p className="text-primary-foreground/80">{step.description}</p>
                </div>
              </motion.div>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:flex items-center justify-center px-4">
                  <ArrowRight className="h-8 w-8 text-muted-foreground" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 p-8 border border-border rounded-xl bg-background shadow-lg max-w-4xl mx-auto"
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-full md:w-1/2">
              <h3 className="text-2xl font-bold mb-4 text-foreground">Ready to get started?</h3>
              <p className="text-muted-foreground mb-6">
                Create your first smart contract in minutes with our guided process.
              </p>
              <div className="flex space-x-4">
                <Button asChild>
                  <Link to="/smart-contracts">Create Contract</Link>
                </Button>
                <Button asChild variant="secondary" className="text-foreground hover:bg-primary/10">
                  <Link to="/features">Learn More</Link>
                </Button>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <img-replace alt="Smart contract creation process with code snippets and network diagrams" className="w-full h-auto rounded-lg shadow-md" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
