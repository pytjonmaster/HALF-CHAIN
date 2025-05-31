
import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border/50">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <img-replace src="/placeholder-logo-footer.svg" alt="HALF-CHAIN Logo" className="h-8 w-auto" />
              <span className="sr-only">HALF-CHAIN</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              AI-powered smart contract automation and blockchain technology for security and transparency.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <p className="font-semibold text-foreground mb-4">Platform</p>
            <ul className="space-y-3">
              <li>
                <Link to="/features" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/smart-contracts" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Smart Contracts
                </Link>
              </li>
              <li>
                <Link to="/compliance" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Compliance
                </Link>
              </li>
              <li>
                <Link to="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  API Documentation
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <p className="font-semibold text-foreground mb-4">Company</p>
            <ul className="space-y-3">
              <li>
                <Link to="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <p className="font-semibold text-foreground mb-4">Legal</p>
            <ul className="space-y-3">
              <li>
                <Link to="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link to="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Security
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border/50 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} HALF-CHAIN. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <p className="text-xs text-muted-foreground">
                Powered by advanced blockchain technology and AI
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
