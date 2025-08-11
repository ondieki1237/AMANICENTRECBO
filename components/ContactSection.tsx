'use client';
import { useState } from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<null | { type: string; message: string }>(null);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus(null);
    setShowModal(false); // Reset modal state

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
      phone: formData.get('phone') || '',
      subject: formData.get('subject') || '',
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/send-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      console.log('Response status:', response.status); // Debug log
      const responseData = await response.json();
      console.log('Response data:', responseData); // Debug log

      if (response.ok && responseData.success) {
        setFormStatus({ type: 'success', message: 'Message sent!' });
        setShowModal(true);
        e.currentTarget.reset();
      } else {
        throw new Error(responseData.error || 'Failed to send message');
      }
    } catch (error: any) {
      console.error('Fetch error:', error); // Debug log
      setFormStatus({ type: 'error', message: error.message || 'Error. Try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setFormStatus(null); // Clear form status on modal close
  };

  return (
    <section id="contact" className="py-12 bg-transparent text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-black drop-shadow-[0_0_4px_rgba(255,255,255,0.3)]">
            Let's Make an Impact
          </h2>
          <p className="mt-2 text-black text-sm sm:text-base max-w-md mx-auto font-medium">
            Join our mission for impact. Let's connect!
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Contact Info */}
          <div className="space-y-3">
            {[
              { icon: MapPin, text: 'Minjila, Tana River, Kenya' },
              { icon: Phone, text: '+254 123 456 789' },
              { icon: Mail, text: 'info@amanicentercbo.org' },
            ].map((item, idx) => (
              <div
                key={idx}
                className="group flex items-center p-3 bg-black/10 rounded-lg backdrop-blur-sm hover:bg-red-500/10 transition-all duration-300"
              >
                <item.icon className="h-4 w-4 text-green-500 mr-2 group-hover:scale-110 transition-transform" />
                <span className="text-black text-xs sm:text-sm font-medium">{item.text}</span>
              </div>
            ))}
          </div>
          {/* Contact Form */}
          <div className="p-5 bg-black/20 rounded-xl backdrop-blur-lg border border-red-500/20 shadow-[0_0_15px_rgba(255,0,0,0.2)]">
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                name="name"
                placeholder="Name"
                required
                className="w-full px-3 py-2 bg-transparent border border-gray-700 rounded-md focus:outline-none focus:border-red-500 text-white text-xs sm:text-sm placeholder-black transition-all"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                className="w-full px-3 py-2 bg-transparent border border-gray-700 rounded-md focus:outline-none focus:border-red-500 text-white text-xs sm:text-sm placeholder-black transition-all"
              />
              <textarea
                name="message"
                rows={3}
                placeholder="Message"
                required
                className="w-full px-3 py-2 bg-transparent border border-gray-700 rounded-md focus:outline-none focus:border-red-500 text-white resize-none text-xs sm:text-sm placeholder-black transition-all"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-red-500 hover:bg-red-600 text-white py-2 text-xs sm:text-sm font-bold rounded-md shadow-md hover:shadow-[0_0_10px_rgba(255,0,0,0.5)] transition-all duration-300"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send'}
              </button>
              {formStatus && !showModal && (
                <div
                  className={`text-center text-xs sm:text-sm font-medium ${
                    formStatus.type === 'success' ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {formStatus.message}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Pop-up Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 max-w-sm w-full mx-4 shadow-[0_0_15px_rgba(255,0,0,0.3)]">
            <h3 className="text-lg font-bold text-black mb-4">Message Sent!</h3>
            <p className="text-black text-sm mb-6">
              Thank you for contacting us, we will respond to you shortly.
            </p>
            <button
              onClick={closeModal}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-2 text-sm font-bold rounded-md shadow-md hover:shadow-[0_0_10px_rgba(255,0,0,0.5)] transition-all duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ContactSection;