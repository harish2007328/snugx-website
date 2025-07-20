
import { Check, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import Footer from '@/components/Footer';

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "$2,999",
      description: "Perfect for small businesses and startups",
      features: [
        "5-page responsive website",
        "Modern design & UI/UX",
        "Mobile optimization",
        "Contact form integration",
        "SEO basics",
        "2 rounds of revisions",
        "30-day support"
      ],
      popular: false,
      deliveryTime: "7-10 days"
    },
    {
      name: "Professional",
      price: "$5,999",
      description: "Ideal for growing businesses",
      features: [
        "10-page responsive website",
        "Custom design & branding",
        "CMS integration",
        "E-commerce functionality",
        "Advanced SEO",
        "Analytics setup",
        "3 rounds of revisions",
        "60-day support",
        "Performance optimization"
      ],
      popular: true,
      deliveryTime: "10-14 days"
    },
    {
      name: "Enterprise",
      price: "$12,999",
      description: "For large businesses and complex projects",
      features: [
        "Unlimited pages",
        "Custom web application",
        "Advanced integrations",
        "Database design",
        "User authentication",
        "API development",
        "Unlimited revisions",
        "6-month support",
        "Dedicated project manager",
        "Training sessions"
      ],
      popular: false,
      deliveryTime: "14-21 days"
    }
  ];

  const addOns = [
    { name: "Extra page", price: "$299" },
    { name: "Custom animation", price: "$499" },
    { name: "Third-party integration", price: "$799" },
    { name: "Advanced SEO package", price: "$999" },
    { name: "Maintenance (per month)", price: "$299" }
  ];

  const faqs = [
    {
      question: "What's included in the design process?",
      answer: "We start with research and strategy, create wireframes and mockups, design the full website, and iterate based on your feedback."
    },
    {
      question: "Do you provide ongoing support?",
      answer: "Yes! All plans include support for bug fixes and minor updates. We also offer extended maintenance packages."
    },
    {
      question: "Can I upgrade my plan later?",
      answer: "Absolutely! You can upgrade your plan at any time, and we'll adjust the pricing accordingly."
    },
    {
      question: "What if I'm not satisfied?",
      answer: "We offer a 100% money-back guarantee within the first 14 days if you're not completely satisfied."
    }
  ];

  return (
    <div className="min-h-screen pt-24">
      {/* Header */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Simple, <span className="text-neon-green">Transparent</span> Pricing
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Choose the perfect plan for your business. No hidden fees, no surprises.
          </p>
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <Check size={16} className="text-neon-green" />
              <span>No setup fees</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check size={16} className="text-neon-green" />
              <span>Money-back guarantee</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check size={16} className="text-neon-green" />
              <span>Free consultation</span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card 
                key={index} 
                className={`glass relative overflow-hidden transition-all duration-300 hover:glass-strong ${
                  plan.popular ? 'ring-2 ring-neon-green' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="bg-neon-green text-dark-bg px-4 py-1 rounded-full text-sm font-semibold flex items-center space-x-1">
                      <Star size={14} />
                      <span>Most Popular</span>
                    </div>
                  </div>
                )}
                
                <CardHeader className="text-center pb-8 pt-8">
                  <CardTitle className="text-2xl font-bold mb-2">{plan.name}</CardTitle>
                  <div className="text-4xl font-bold text-neon-green mb-2">{plan.price}</div>
                  <p className="text-gray-400 text-sm mb-4">{plan.description}</p>
                  <div className="text-sm text-neon-green">Delivery: {plan.deliveryTime}</div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-3">
                        <Check size={16} className="text-neon-green flex-shrink-0" />
                        <span className="text-sm text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full mt-8 py-3 ${
                      plan.popular ? 'btn-primary' : 'btn-secondary'
                    }`}
                    asChild
                  >
                    <Link to="/contact">
                      Get Started
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-20 px-4 bg-gradient-to-r from-neon-green/5 to-transparent">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Popular Add-ons</h2>
            <p className="text-gray-400">Enhance your website with these additional services</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {addOns.map((addon, index) => (
              <div key={index} className="flex justify-between items-center p-4 glass rounded-lg">
                <span className="text-light-text">{addon.name}</span>
                <span className="text-neon-green font-semibold">{addon.price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Frequently Asked <span className="text-neon-green">Questions</span>
          </h2>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="glass">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3 text-neon-green">{faq.question}</h3>
                  <p className="text-gray-300">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Get <span className="text-neon-green">Started?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Let's discuss your project and find the perfect solution for your business.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="btn-primary px-8 py-4" asChild>
              <Link to="/contact">Start Your Project</Link>
            </Button>
            <Button size="lg" className="btn-secondary px-8 py-4" asChild>
              <Link to="/case-studies">View Our Work</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Pricing;
