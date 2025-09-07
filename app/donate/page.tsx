"use client"
import React, { useState } from 'react';
import Navbar from "../../components/modern-navbar";
import Footer from "../../components/footer";
import { CreditCard, ArrowRight, Smartphone, Building } from 'lucide-react';

const MakeADonationPage = () => {
  const [donationAmount, setDonationAmount] = useState(50);

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Navbar />

      <main className="pt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-emerald-400 mb-4 tracking-tight">
              Make a Donation
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
              Your support empowers communities in Tana River County, Kenya, through media and technology.
            </p>
          </div>

          {/* Impact Section */}
          <div className="bg-gray-900 rounded-2xl p-8 mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Your Impact</h2>
            <p className="text-gray-300 mb-6">
              Every contribution helps us maintain radio equipment, support educational and health programs, train local staff, and expand outreach in underserved communities.
            </p>
            <ul className="grid md:grid-cols-2 gap-4 text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400">•</span> Upgrade broadcasting infrastructure
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400">•</span> Fund community health and education initiatives
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400">•</span> Train and empower local team members
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400">•</span> Reach more communities in need
              </li>
            </ul>
          </div>

          {/* Donation Options */}
          <div className="bg-gray-900 rounded-2xl p-8">
            <div className="flex items-center gap-4 mb-6">
              <CreditCard className="h-6 w-6 text-emerald-400" />
              <h2 className="text-2xl md:text-3xl font-bold text-white">Donation Options</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {/* One-Time Donation with PayPal */}
              <div className="bg-gray-800 rounded-xl p-6 text-center transition-all hover:shadow-lg">
                <h3 className="text-xl font-semibold text-emerald-400 mb-2">One-Time Donation</h3>
                <p className="text-gray-300 mb-4">Make a single contribution of any amount</p>
                <div className="mb-4">
                  <div className="flex justify-center gap-2 mb-4">
                    {[25, 50, 100, 250].map((amount) => (
                      <button
                        key={amount}
                        onClick={() => setDonationAmount(amount)}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                          donationAmount === amount
                            ? 'bg-emerald-500 text-white'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                      >
                        ${amount}
                      </button>
                    ))}
                  </div>
                  <input
                    type="number"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(Number(e.target.value))}
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Custom amount"
                  />
                </div>
                <div className="flex justify-center gap-4 flex-wrap">
                  <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg transition-colors flex items-center gap-2">
                    Donate Now
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <a
                    href="https://www.paypal.com/donate"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <img
                      src="https://www.paypalobjects.com/webstatic/en_US/i/buttons/PP_logo_h_100x26.png"
                      alt="PayPal"
                      className="h-5"
                    />
                  </a>
                </div>
              </div>

              {/* Bank Transfer */}
              <div className="bg-gray-800 rounded-xl p-6 text-center transition-all hover:shadow-lg">
                <Building className="h-8 w-8 text-emerald-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-emerald-400 mb-2">Bank Transfer</h3>
                <p className="text-gray-300 mb-4">Send your donation directly via bank transfer:</p>
                <ul className="text-sm text-gray-300 text-left space-y-1">
                  <li><strong>Bank:</strong> Equity Bank Limited</li>
                  <li><strong>Branch:</strong> Malindi</li>
                  <li><strong>Account Name:</strong> Amani Center</li>
                  <li><strong>Account No:</strong> 0450284519543</li>
                  <li><strong>SWIFT Code:</strong> EQBLKENA</li>
                  <li><strong>Currency:</strong> USD</li>
                </ul>
              </div>

              {/* M-Pesa Paybill */}
              <div className="bg-gray-800 rounded-xl p-6 text-center transition-all hover:shadow-lg">
                <Smartphone className="h-8 w-8 text-emerald-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-emerald-400 mb-2">M-Pesa (Kenya)</h3>
                <p className="text-gray-300 mb-4">Donate easily via M-Pesa Paybill:</p>
                <ul className="text-sm text-gray-300 text-left space-y-1">
                  <li><strong>Paybill:</strong> 913716</li>
                  <li><strong>Account Name:</strong> Amani Center</li>
                </ul>
              </div>
            </div>

            <p className="text-gray-300 text-center text-sm">
              All donations are deeply appreciated and help us sustain our mission 🙏
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MakeADonationPage;
