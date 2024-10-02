"use client";
import React, { useState } from "react";
import { ArrowLeft, User, Bell, Gamepad2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
const Settings = () => {
  const [activeSection, setActiveSection] = useState("User Profile");
  const router = useRouter();

  const sections = [
    {
      name: "User Settings",
      icon: <User size={20} />,
      subsections: ["User Profile", "Privacy & Safety"],
    },
    {
      name: "App Settings",
      icon: <Bell size={20} />,
      subsections: ["Notifications", "Appearance", "Accessibility"],
    },
    {
      name: "Activity Settings",
      icon: <Gamepad2 size={20} />,
      subsections: ["Activity Privacy", "Registered Games"],
    },
  ];

  return (
    <div
      className="flex flex-row justify-center bg-gradient-to-br from-[rgb(22,0,6,1)] to-[rgba(153,182,255,1)] min-h-screen"
      id="whole-container"
    >
      <div className="flex flex-row w-[90%] my-8 rounded-lg overflow-hidden bg-black bg-opacity-20 backdrop-blur-3xl shadow-xl text-white">
        <div className="w-64 p-4 border-r border-white border-opacity-10">
          <button
            onClick={() => router.push("/servers")}
            className="flex items-center text-gray-300 hover:text-white mb-6"
          >
            <ArrowLeft size={20} className="mr-2" /> ESC
          </button>
          {sections.map((section) => (
            <div key={section.name} className="mb-4">
              <h3 className="text-xs font-semibold text-gray-300 uppercase mb-2">
                {section.name}
              </h3>
              <ul>
                {section.subsections.map((subsection) => (
                  <li
                    key={subsection}
                    className={`cursor-pointer p-2 rounded ${
                      activeSection === subsection
                        ? "bg-white bg-opacity-10 text-white"
                        : "text-gray-300 hover:bg-white hover:bg-opacity-5 hover:text-white"
                    }`}
                    onClick={() => setActiveSection(subsection)}
                  >
                    {subsection}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex-1 p-6 ">
          <h2 className="text-2xl font-bold mb-6">{activeSection}</h2>
          {activeSection === "User Profile" && (
            <div className="w-full h-full flex flex-col p-4">
              <div
                className="flex flex-col w-full max-w-2xl mx-auto bg-gray-800 bg-opacity-60 rounded-xl overflow-hidden shadow-lg"
                id="user-card"
              >
                <div className="h-28 bg-[url('/banner.gif')] bg-cover"></div>
                <div className="px-6 py-4 relative">
                  <div className="absolute -top-12 left-6 border-4 border-gray-800 rounded-full overflow-hidden">
                    <div className="realtive">
                      <Image
                        src="/deco.png"
                        width={100}
                        height={100}
                        alt="Decoration"
                        className="absolute top-0 left-0 z-[100]"
                      />
                      <Image
                        src="/pfp.jpeg"
                        width={80}
                        height={80}
                        alt="Profile picture"
                        className="rounded-full"
                      />
                    </div>
                  </div>
                  <div className="mt-12">
                    <div className="flex items-center justify-between mb-2">
                      <h2 className="text-2xl font-bold text-white">
                        qeqqer
                        <span className="text-sm font-normal text-gray-400 ml-2">
                          #0000
                        </span>
                      </h2>
                      <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200">
                        Edit Profile
                      </button>
                    </div>
                    <div
                      className="flex flex-wrap gap-2 p-3 bg-gray-700 bg-opacity-50 rounded-xl"
                      id="badge-section"
                    >
                      {[
                        { src: "/early.png", alt: "Early Supporter" },
                        { src: "/bug1.png", alt: "Bug Hunter" },
                        { src: "/moderator.png", alt: "Moderator" },
                        {
                          src: "/hypersquad_events.png",
                          alt: "HyperSquad Events",
                        },
                        { src: "/hypersquad.png", alt: "HyperSquad" },
                        { src: "/nitro.png", alt: "Nitro Classic" },
                        {
                          src: "/boosting.png",
                          alt: "1200 BC",
                        },
                      ].map((badge, index) => (
                        <div key={index} className="group relative">
                          <Image
                            src={badge.src}
                            height={24}
                            width={24}
                            alt={badge.alt}
                            className="transition-transform duration-200 transform group-hover:scale-110"
                          />
                          <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            {badge.alt}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeSection === "Notifications" && (
            <div>
              <p className="text-gray-300">notification.</p>
            </div>
          )}
          {activeSection === "Activity Privacy" && (
            <div>
              <p className="text-gray-300">activity.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
