// pages/volunteer.jsx
"use client";
import React, { useState } from "react";
import Navbar from "@/components/modern-navbar";
import Footer from "@/components/footer";
import VolunteerApplicationForm from "./volunteerform";
import PartnershipVolunteerForm from "./partnership";
import { Users, Heart, Radio, Briefcase, ArrowRight, Sparkles, Handshake } from "lucide-react";
import { Button } from "@/components/ui/button";

const VolunteerPage = () => {
  const [isVolunteerModalOpen, setIsVolunteerModalOpen] = useState(false);
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);

  const openVolunteerModal = () => setIsVolunteerModalOpen(true);
  const closeVolunteerModal = () => setIsVolunteerModalOpen(false);
  const openPartnerModal = () => setIsPartnerModalOpen(true);
  const closePartnerModal = () => setIsPartnerModalOpen(false);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <div className="inline-block bg-emerald-500/20 p-4 rounded-full mb-4">
              <Sparkles className="h-8 w-8 text-emerald-400" />
            </div>
            <h1 className="text-4xl font-display text-emerald-400 mb-4">Join Our Mission</h1>
            <p className="text-xl text-gray-400">
              Volunteer as a worker or partner with us to support our community initiatives
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gray-900 rounded-lg p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-emerald-500/20 p-3 rounded-lg">
                  <Heart className="h-6 w-6 text-emerald-400" />
                </div>
                <h2 className="text-2xl font-display text-white">Volunteer as a Worker</h2>
              </div>
              <p className="text-gray-400 mb-4">
                Join our mission to empower communities through media and technology. As a volunteer,
                you'll have the opportunity to make a real difference in the lives of people in
                Tana River County.
              </p>
              <p className="text-gray-400">
                Whether you're interested in radio broadcasting, community outreach, or technical
                support, we have a place for you in our team.
              </p>
            </div>

            <div className="bg-gray-900 rounded-lg p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-emerald-500/20 p-3 rounded-lg">
                  <Handshake className="h-6 w-6 text-emerald-400" />
                </div>
                <h2 className="text-2xl font-display text-white">Volunteer for Partnerships</h2>
              </div>
              <p className="text-gray-400 mb-4">
                Support our CBO by volunteering to build partnerships. Help us secure financial support,
                in-kind donations, or strategic collaborations to amplify our impact.
              </p>
              <p className="text-gray-400">
                Whether you have skills in fundraising, networking, or project management, your
                contributions will help us expand our initiatives.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-900 rounded-lg p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-emerald-500/20 p-3 rounded-lg">
                  <Sparkles className="h-6 w-6 text-emerald-400" />
                </div>
                <h2 className="text-2xl font-display text-white">Volunteer Opportunities</h2>
              </div>
              <div className="space-y-4">
                <div className="border-b border-gray-800 pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Radio className="h-5 w-5 text-emerald-400" />
                    <h3 className="text-lg text-emerald-400">Radio Broadcasting</h3>
                  </div>
                  <p className="text-gray-400">Help produce and present radio shows in multiple languages</p>
                </div>
                <div className="border-b border-gray-800 pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-5 w-5 text-emerald-400" />
                    <h3 className="text-lg text-emerald-400">Community Outreach</h3>
                  </div>
                  <p className="text-gray-400">Engage with local communities and gather stories</p>
                </div>
                <div className="border-b border-gray-800 pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Briefcase className="h-5 w-5 text-emerald-400" />
                    <h3 className="text-lg text-emerald-400">Technical Support</h3>
                  </div>
                  <p className="text-gray-400">Maintain and improve our broadcasting equipment</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="h-5 w-5 text-emerald-400" />
                    <h3 className="text-lg text-emerald-400">Content Creation</h3>
                  </div>
                  <p className="text-gray-400">Develop educational and informative content for our programs</p>
                </div>
              </div>
              <div className="mt-6">
                <Button
                  onClick={openVolunteerModal}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg transition-colors flex items-center gap-2 w-full justify-center"
                >
                  Apply as Volunteer
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="bg-gray-900 rounded-lg p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-emerald-500/20 p-3 rounded-lg">
                  <Handshake className="h-6 w-6 text-emerald-400" />
                </div>
                <h2 className="text-2xl font-display text-white">Partnership Volunteer Opportunities</h2>
              </div>
              <div className="space-y-4">
                <div className="border-b border-gray-800 pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Handshake className="h-5 w-5 text-emerald-400" />
                    <h3 className="text-lg text-emerald-400">Fundraising</h3>
                  </div>
                  <p className="text-gray-400">Help secure funding for our programs</p>
                </div>
                <div className="border-b border-gray-800 pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Briefcase className="h-5 w-5 text-emerald-400" />
                    <h3 className="text-lg text-emerald-400">In-Kind Contributions</h3>
                  </div>
                  <p className="text-gray-400">Coordinate donations of equipment or resources</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-5 w-5 text-emerald-400" />
                    <h3 className="text-lg text-emerald-400">Strategic Collaboration</h3>
                  </div>
                  <p className="text-gray-400">Build partnerships with organizations and stakeholders</p>
                </div>
              </div>
              <div className="mt-6">
                <Button
                  onClick={openPartnerModal}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg transition-colors flex items-center gap-2 w-full justify-center"
                >
                  Apply as Partnership Volunteer
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <VolunteerApplicationForm isOpen={isVolunteerModalOpen} onClose={closeVolunteerModal} />
      <PartnershipVolunteerForm isOpen={isPartnerModalOpen} onClose={closePartnerModal} />

      <Footer />
    </div>
  );
};

export default VolunteerPage;