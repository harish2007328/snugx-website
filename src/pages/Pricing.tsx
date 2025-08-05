import { Check, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import Footer from '@/components/Footer';
const Pricing = () => {
  const plans = [{
    name: "Starter",
    price: "₹6,999",
    description: "Perfect for portfolios or personal use",
    features: ["1-page custom design", "Mobile-responsive & fast", "Contact form + social links", "Help with domain & hosting", "Basic SEO", "Ready in 3–5 days"],
    popular: false,
    icon: "🟢"
  }, {
    name: "Standard",
    price: "₹14,999",
    description: "Great for small businesses & creators",
    features: ["Up to 5 custom pages", "Blog or portfolio section", "WhatsApp chat + lead form", "Strong SEO setup", "Smooth animations", "Ready in 7–10 days"],
    popular: true,
    icon: "🟡"
  }, {
    name: "Premium",
    price: "₹29,999+",
    description: "For brands, shops & large-scale projects",
    features: ["Up to 10 pages or eCommerce store", "Advanced animations & features", "Google Analytics + custom tools", "Shopify/WooCommerce setup", "Ongoing support (optional)", "Ready in 12–15+ days"],
    popular: false,
    icon: "🔴"
  }];
  const addOns = [{
    name: "Extra page",
    price: "$299"
  }, {
    name: "Custom animation",
    price: "$499"
  }, {
    name: "Third-party integration",
    price: "$799"
  }, {
    name: "Advanced SEO package",
    price: "$999"
  }, {
    name: "Maintenance (per month)",
    price: "$299"
  }];
  return <div className="min-h-screen pt-24">
      {/* Header */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-7xl mx-auto px-8">
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
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => <Card key={index} className={`bg-gradient-to-br from-dark-bg via-secondary/20 to-dark-bg border border-white/10 relative overflow-visible transition-all duration-300 hover:border-neon-green/30 hover:shadow-xl hover:shadow-neon-green/10 backdrop-blur-sm flex flex-col ${plan.popular ? 'ring-2 ring-neon-green scale-105' : ''}`}>
                {plan.popular && <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-neon-green text-dark-bg px-6 py-2 rounded-full text-sm font-semibold flex items-center space-x-2 shadow-lg w-auto ">
                      <Star size={16} />
                      <span className="w-full text-center text-xs">Most Popular</span>
                    </div>
                  </div>}
                
                <CardHeader className="text-center pb-6 pt-8 flex-shrink-0">
                  <div className="text-4xl mb-4">{plan.icon}</div>
                  <CardTitle className="text-2xl font-bold mb-3">{plan.name}</CardTitle>
                  <div className="text-4xl font-bold text-neon-green mb-3">{plan.price}</div>
                  <p className="text-gray-400 text-sm mb-4 italic leading-relaxed">{plan.description}</p>
                </CardHeader>
                
                <CardContent className="flex-grow flex flex-col justify-between pt-0">
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, idx) => <li key={idx} className="flex items-start space-x-3">
                        <Check size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm leading-relaxed text-gray-300">
                          {feature}
                        </span>
                      </li>)}
                  </ul>
                  
                  <Button className={`w-full py-4 text-base font-semibold transition-all duration-300 ${plan.popular ? 'bg-neon-green text-dark-bg hover:bg-neon-green/90 hover:scale-105' : 'bg-white/10 text-white hover:bg-white/20 border border-white/20 hover:border-neon-green/30'}`} asChild>
                    <Link to="/contact">
                      Get Started
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-20 px-4 bg-secondary/20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Popular Add-ons</h2>
            <p className="text-gray-400">Enhance your website with these additional services</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {addOns.map((addon, index) => <div key={index} className="flex justify-between items-center p-4 bg-gradient-to-r from-dark-bg via-secondary/20 to-dark-bg border border-white/10 rounded-lg hover:border-neon-green/30 transition-all duration-300 backdrop-blur-sm">
                <span className="text-light-text">{addon.name}</span>
                <span className="text-neon-green font-semibold">{addon.price}</span>
              </div>)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 mx-auto">
        <div className="max-w-7xl mx-auto text-center space-y-10 py-20 px-6 bg-[#e5ff00] max-w-7xl mx-auto rounded-[10px]">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-[#111111] leading-relaxed">
            Ready to <span className="bg-[#1a1a1a] text-[#f5f5f5] text-[#1a1a1a] font-bold px-4 py-1 rounded-md">Transform ✦</span> Your Business?
          </h2>
          <p className="text-lg text-[#111111]/80 font-normal">
            Join hundreds of successful businesses that chose Snugx for their digital transformation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button size="lg" className="bg-[#111111] text-[#f5f5f5] border-2 border-[#111111]/50 hover:bg-[#f5f5f5]/90 hover:text-[#111111] transition-colors duration-300 px-10 py-4 rounded-full" asChild>
              <Link to="/contact">Start Your Project Today</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default Pricing;