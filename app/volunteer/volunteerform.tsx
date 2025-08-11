"use client";
import React, { useState } from "react";
import { X, Sparkles, ArrowRight } from "lucide-react";

const VolunteerApplicationForm = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    skills: "",
    opportunities: [],
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Use backend URL from .env with fallback for local development
  const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      opportunities: checked
        ? [...prev.opportunities, value]
        : prev.opportunities.filter((opp) => opp !== value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus(null);

    // Client-side email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormStatus({ type: "error", message: "Please enter a valid email address" });
      setShowModal(true);
      setIsSubmitting(false);
      return;
    }

    console.log("Submitting form data:", formData);
    console.log("API Endpoint:", `${API_BASE_URL}/api/volunteer-application`);

    try {
      const response = await fetch(`${API_BASE_URL}/api/volunteer-application`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      let responseData;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        responseData = await response.json();
      } else {
        const responseText = await response.text();
        console.error("Non-JSON response:", responseText);
        throw new Error(`Server returned a non-JSON response (status: ${response.status})`);
      }

      console.log("Backend response:", responseData);

      if (response.ok && responseData.success) {
        setFormStatus({ type: "success", message: "Application submitted successfully!" });
        setShowModal(true);
        e.target.reset();
        setFormData({
          name: "",
          email: "",
          phone: "",
          skills: "",
          opportunities: [],
          message: "",
        });
      } else {
        throw new Error(responseData.error || "Failed to submit application");
      }
    } catch (error) {
      console.error("Submission error:", error.message);
      setFormStatus({ type: "error", message: error.message || "Error submitting application. Please try again." });
      setShowModal(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setFormStatus(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 p-4 sm:p-6 lg:p-8 overflow-y-auto">
      <div className="bg-gray-900 rounded-lg p-8 w-full max-w-lg mx-auto mt-8 mb-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <div className="bg-emerald-500/20 p-3 rounded-lg">
              <Sparkles className="h-6 w-6 text-emerald-400" />
            </div>
            <h2 className="text-2xl font-display text-white">Volunteer Application</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-400">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="mt-1 w-full p-3 bg-gray-800 rounded-lg text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-400">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="mt-1 w-full p-3 bg-gray-800 rounded-lg text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-400">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="mt-1 w-full p-3 bg-gray-800 rounded-lg text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400">Volunteer Opportunities</label>
            <div className="mt-2 space-y-2">
              {["Radio Broadcasting", "Community Outreach", "Technical Support", "Content Creation"].map((opp) => (
                <div key={opp} className="flex items-center">
                  <input
                    type="checkbox"
                    id={opp}
                    name="opportunities"
                    value={opp}
                    checked={formData.opportunities.includes(opp)}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 text-emerald-500 focus:ring-emerald-500 border-gray-700 rounded"
                  />
                  <label htmlFor={opp} className="ml-2 text-gray-400">{opp}</label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="skills" className="block text-sm font-medium text-gray-400">
              Skills & Experience
            </label>
            <textarea
              id="skills"
              name="skills"
              value={formData.skills}
              onChange={handleInputChange}
              rows={4}
              className="mt-1 w-full p-3 bg-gray-800 rounded-lg text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Tell us about your relevant skills or experience"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-400">
              Additional Information
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={4}
              className="mt-1 w-full p-3 bg-gray-800 rounded-lg text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Anything else you'd like us to know?"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Submit Application"}
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>
      </div>

      {/* Pop-up Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-lg p-6 max-w-sm w-full mx-4 shadow-[0_0_15px_rgba(0,255,128,0.3)]">
            <h3
              className={`text-lg font-bold text-white mb-4 ${
                formStatus?.type === "success" ? "text-emerald-400" : "text-red-400"
              }`}
            >
              {formStatus?.type === "success" ? "Application Submitted!" : "Submission Error"}
            </h3>
            <p className="text-gray-400 text-sm mb-6">{formStatus?.message}</p>
            <button
              onClick={closeModal}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2 text-sm font-bold rounded-lg shadow-md hover:shadow-[0_0_10 tuppx_rgba(0,255,128,0.5)] transition-all duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VolunteerApplicationForm;