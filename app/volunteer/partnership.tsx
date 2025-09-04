"use client";
import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../../components/ui/dialog";

const PartnershipVolunteerForm = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    skills: "",
    partnershipInterests: [],
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  // Use backend URL from .env
  const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"; // Fallback for local testing

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        partnershipInterests: checked
          ? [...prev.partnershipInterests, value]
          : prev.partnershipInterests.filter((interest) => interest !== value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage("");

    try {
      // Map partnershipInterests to opportunities for backend compatibility
      const payload = {
        ...formData,
        opportunities: formData.partnershipInterests, // Rename field to match backend
      };

      const response = await fetch(`${API_BASE_URL}/api/volunteer-application`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      let result;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        result = await response.json();
      } else {
        const responseText = await response.text();
        console.error("Non-JSON response received:", responseText);
        throw new Error(`Server returned a non-JSON response (status: ${response.status}). Please check the API endpoint.`);
      }

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          skills: "",
          partnershipInterests: [],
          message: "",
        });
        setTimeout(() => {
          setIsSubmitting(false);
          onClose();
        }, 1500);
      } else {
        setSubmitStatus("error");
        setErrorMessage(result.error || "Failed to submit application. Please try again.");
        setIsSubmitting(false);
        console.error("Server error:", result.error, result.details);
      }
    } catch (error) {
      console.error("Form submission failed:", error.message);
      setSubmitStatus("error");
      setErrorMessage(error.message || "An unexpected error occurred. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display text-emerald-400">Partnership Volunteer Application</DialogTitle>
          <DialogDescription className="text-gray-400">
            Volunteer to support our partnerships and community initiatives.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-gray-700 bg-gray-800 p-2 text-white"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-gray-700 bg-gray-800 p-2 text-white"
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-300">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-gray-700 bg-gray-800 p-2 text-white"
            />
          </div>
          <div>
            <label htmlFor="skills" className="block text-sm font-medium text-gray-300">
              Skills & Experience
            </label>
            <textarea
              id="skills"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-gray-700 bg-gray-800 p-2 text-white"
              rows={3}
              placeholder="e.g., fundraising, networking, project management"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Partnership Interests</label>
            <div className="mt-2 space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="partnershipInterests"
                  value="fundraising"
                  checked={formData.partnershipInterests.includes("fundraising")}
                  onChange={handleChange}
                  className="rounded border-gray-700 text-emerald-400 focus:ring-emerald-500"
                />
                Fundraising
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="partnershipInterests"
                  value="in-kind contributions"
                  checked={formData.partnershipInterests.includes("in-kind contributions")}
                  onChange={handleChange}
                  className="rounded border-gray-700 text-emerald-400 focus:ring-emerald-500"
                />
                In-Kind Contributions
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="partnershipInterests"
                  value="strategic collaboration"
                  checked={formData.partnershipInterests.includes("strategic collaboration")}
                  onChange={handleChange}
                  className="rounded border-gray-700 text-emerald-400 focus:ring-emerald-500"
                />
                Strategic Collaboration
              </label>
            </div>
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-300">
              Additional Information
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-gray-700 bg-gray-800 p-2 text-white"
              rows={4}
              placeholder="Tell us why you're interested in volunteering for partnerships"
            />
          </div>
          {submitStatus === "success" && (
            <p className="text-emerald-400">Application submitted successfully! A confirmation has been sent to your email.</p>
          )}
          {submitStatus === "error" && (
            <p className="text-red-400">{errorMessage}</p>
          )}
          <div className="flex justify-end gap-4">
            <Button type="button" onClick={onClose} className="bg-gray-700 hover:bg-gray-600" disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" className="bg-emerald-500 hover:bg-emerald-600" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PartnershipVolunteerForm;