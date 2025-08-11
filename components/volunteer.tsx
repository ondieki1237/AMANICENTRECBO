// pages/Volunteer.js
import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import ModernNavbar from "@/components/modern-navbar";
import Footer from "@/components/footer";

interface FormData {
  name: string;
  location: string;
  email: string;
  phone: string;
  interest: string;
  otherReasons: string;
}

const Volunteer = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    location: '',
    email: '',
    phone: '',
    interest: '',
    otherReasons: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation
    if (!formData.name || !formData.email || !formData.interest) {
      alert('Please fill in all required fields (Name, Email, Interest).');
      return;
    }
    console.log('Volunteer Form:', formData);
    // Submit form data to backend or show confirmation
    alert('Thank you for signing up to volunteer!');
    setFormData({
      name: '',
      location: '',
      email: '',
      phone: '',
      interest: '',
      otherReasons: '',
    });
  };

  return (
    <div className="min-h-screen">
      <ModernNavbar />
      <section className="py-16 bg-gradient-to-r from-emerald-600 via-emerald-700 to-red-600 min-h-screen">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl md:text-5xl text-white mb-8">Volunteer With Us</h1>
          <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed font-light max-w-3xl mx-auto">
            Join our mission to unite communities and make a difference in Tana River County.
          </p>
          <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="text-white/90 text-lg mb-2 block">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 rounded-full text-emerald-600 focus:outline-none focus:ring-2 focus:ring-white"
                required
              />
            </div>
            {/* Location */}
            <div>
              <label htmlFor="location" className="text-white/90 text-lg mb-2 block">
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter your city or town"
                className="w-full px-4 py-3 rounded-full text-emerald-600 focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>
            {/* Email */}
            <div>
              <label htmlFor="email" className="text-white/90 text-lg mb-2 block">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-full text-emerald-600 focus:outline-none focus:ring-2 focus:ring-white"
                required
              />
            </div>
            {/* Phone Number */}
            <div>
              <label htmlFor="phone" className="text-white/90 text-lg mb-2 block">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className="w-full px-4 py-3 rounded-full text-emerald-600 focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>
            {/* Interest */}
            <div>
              <label htmlFor="interest" className="text-white/90 text-lg mb-2 block">
                Area of Interest *
              </label>
              <select
                id="interest"
                name="interest"
                value={formData.interest}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-full text-emerald-600 focus:outline-none focus:ring-2 focus:ring-white"
                required
              >
                <option value="">Select an interest</option>
                <option value="community-outreach">Community Outreach</option>
                <option value="peacebuilding">Peacebuilding</option>
                <option value="media-production">Media Production (Vox Radio)</option>
                <option value="youth-empowerment">Youth Empowerment</option>
                <option value="other">Other</option>
              </select>
            </div>
            {/* Other Reasons */}
            <div>
              <label htmlFor="otherReasons" className="text-white/90 text-lg mb-2 block">
                Other Reasons to Volunteer
              </label>
              <textarea
                id="otherReasons"
                name="otherReasons"
                value={formData.otherReasons}
                onChange={handleChange}
                placeholder="Tell us why you want to volunteer"
                className="w-full px-4 py-3 rounded-lg text-emerald-600 focus:outline-none focus:ring-2 focus:ring-white h-32"
              />
            </div>
            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              className="bg-white text-emerald-600 hover:bg-gray-100 px-12 py-4 text-lg font-semibold rounded-full shadow-2xl hover:shadow-white/25 transition-all duration-300"
            >
              Submit Application
              <ArrowRight className="ml-3 h-5 w-5" />
            </Button>
          </form>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Volunteer;