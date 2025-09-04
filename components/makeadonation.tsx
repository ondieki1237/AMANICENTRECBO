// pages/Donate.js
import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from "./ui/button";
import ModernNavbar from "./modern-navbar";
import Footer from "./footer";

const Donate = () => {
  const [donationType, setDonationType] = useState('one-time');
  const [amount, setAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add payment gateway integration logic here (e.g., Stripe, PayPal)
    if (!amount && !customAmount) {
      alert('Please select or enter a donation amount.');
      return;
    }
    console.log('Donation:', { donationType, amount: customAmount || amount });
    // Redirect to payment gateway or show confirmation
  };

  return (
    <div className="min-h-screen">
      <ModernNavbar />
      <section className="py-16 bg-gradient-to-r from-emerald-600 via-emerald-700 to-red-600 min-h-screen">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl md:text-5xl text-white mb-8">Make a Donation</h1>
          <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed font-light max-w-3xl mx-auto">
            Your support helps us empower communities and create lasting change in Tana River County.
          </p>
          <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-8">
            {/* Donation Type */}
            <div className="flex justify-center gap-4">
              <button
                type="button"
                onClick={() => setDonationType('one-time')}
                className={`px-6 py-3 text-lg font-semibold rounded-full ${
                  donationType === 'one-time'
                    ? 'bg-white text-emerald-600'
                    : 'bg-white/20 text-white'
                }`}
              >
                One-Time
              </button>
              <button
                type="button"
                onClick={() => setDonationType('recurring')}
                className={`px-6 py-3 text-lg font-semibold rounded-full ${
                  donationType === 'recurring'
                    ? 'bg-white text-emerald-600'
                    : 'bg-white/20 text-white'
                }`}
              >
                Recurring
              </button>
            </div>
            {/* Donation Amount */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {['10', '25', '50', '100'].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => {
                    setAmount(value);
                    setCustomAmount('');
                  }}
                  className={`py-3 text-lg font-semibold rounded-full ${
                    amount === value ? 'bg-white text-emerald-600' : 'bg-white/20 text-white'
                  }`}
                >
                  ${value}
                </button>
              ))}
            </div>
            {/* Custom Amount */}
            <div>
              <label htmlFor="customAmount" className="text-white/90 text-lg mb-2 block">
                Or Enter Custom Amount
              </label>
              <input
                type="number"
                id="customAmount"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  setAmount('');
                }}
                placeholder="Enter amount"
                className="w-full px-4 py-3 rounded-full text-emerald-600 focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>
            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              className="bg-white text-emerald-600 hover:bg-gray-100 px-12 py-4 text-lg font-semibold rounded-full shadow-2xl hover:shadow-white/25 transition-all duration-300"
            >
              Donate Now
              <ArrowRight className="ml-3 h-5 w-5" />
            </Button>
          </form>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Donate;