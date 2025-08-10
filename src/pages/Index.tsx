
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Zap, Users, Target, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Snugx - Digital Solutions That Drive Results</title>
        <meta name="description" content="Transform your business with our cutting-edge digital solutions. We create innovative web applications, mobile apps, and digital experiences that drive growth." />
      </Helmet>

      <div className="min-h-screen pt-24">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-light-text to-neon-green bg-clip-text text-transparent">
                Digital Solutions
                <br />
                That Drive Results
              </h1>
              <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto">
                We transform businesses through innovative web applications, mobile solutions, 
                and digital experiences that captivate users and drive growth.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="btn-primary px-8 py-4 text-lg" asChild>
                  <Link to="/contact">
                    Start Your Project
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button className="btn-secondary px-8 py-4 text-lg" asChild>
                  <Link to="/case-studies">View Our Work</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
                Why Choose <span className="text-neon-green">Snugx</span>?
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  {
                    icon: <Zap className="w-8 h-8 text-neon-green" />,
                    title: "Lightning Fast",
                    description: "Optimized performance that keeps your users engaged"
                  },
                  {
                    icon: <Users className="w-8 h-8 text-neon-green" />,
                    title: "User Focused",
                    description: "Designed with your users' needs and experience in mind"
                  },
                  {
                    icon: <Target className="w-8 h-8 text-neon-green" />,
                    title: "Goal Oriented",
                    description: "Every solution is built to achieve your business objectives"
                  },
                  {
                    icon: <Award className="w-8 h-8 text-neon-green" />,
                    title: "Premium Quality",
                    description: "High-quality code and design that stands the test of time"
                  }
                ].map((feature, index) => (
                  <Card key={index} className="glass border-light-text/10 hover:border-neon-green/30 transition-all duration-300">
                    <CardContent className="p-6 text-center">
                      <div className="mb-4 flex justify-center">
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-semibold mb-2 text-light-text">
                        {feature.title}
                      </h3>
                      <p className="text-gray-400">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="glass border-neon-green/20">
                <CardContent className="p-12 text-center">
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    Ready to Transform Your Business?
                  </h2>
                  <p className="text-xl text-gray-400 mb-8">
                    Let's discuss how we can help you achieve your digital goals and drive real results.
                  </p>
                  <Button className="btn-primary px-8 py-4 text-lg" asChild>
                    <Link to="/contact">
                      Get Started Today
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Index;
