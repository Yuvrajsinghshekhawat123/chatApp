 import { 
  FaShieldAlt, 
  FaBolt, 
  FaUsers, 
  FaCloudUploadAlt, 
  FaPalette, 
  FaGlobe 
} from "react-icons/fa";

export  function WhyChooseConnectly() {
  const features = [
    {
      icon: <FaShieldAlt />,
      title: "End-to-End Encryption",
      desc: "Your messages, calls, and files are secured with military-grade encryption.",
    },
    {
      icon: <FaBolt />,
      title: "Lightning Fast",
      desc: "Send messages, photos, and videos instantly with optimized delivery.",
    },
    {
      icon: <FaUsers />,
      title: "Group Connections",
      desc: "Create groups and collaborate with up to 256 people easily.",
    },
    {
      icon: <FaCloudUploadAlt />,
      title: "Cloud Sync",
      desc: "Access your chats from any device with safe cloud backup.",
    },
    {
      icon: <FaPalette />,
      title: "Customizable",
      desc: "Themes, wallpapers, and sounds so you can personalize everything.",
    },
    {
      icon: <FaGlobe />,
      title: "Available Worldwide",
      desc: "Connect anywhere with global compatibility and low-network support.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center">

        {/* Title */}
        <h2 className="text-4xl font-bold text-gray-800 mb-6">
          Why Choose <span className="text-purple-600">Connectly?</span>
        </h2>

        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-14">
          Our platform is designed to deliver a seamless, fast and secure communication experience across all your devices.
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((item, i) => (
            <div
              key={i}
              className="bg-white shadow-md rounded-xl p-8 hover:shadow-xl transition transform hover:-translate-y-2"
            >
              {/* Icon */}
              <div className="w-16 h-16 mx-auto mb-5 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white text-3xl">
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}






export  function HowConnectlyWorks() {
  const steps = [
    {
      number: "1",
      title: "Create Account",
      desc: "Sign up with your email or phone number in seconds.",
    },
    {
      number: "2",
      title: "Find Contacts",
      desc: "Connect with friends who are already using Connectly.",
    },
    {
      number: "3",
      title: "Start Chatting",
      desc: "Send messages, share media, and make voice calls.",
    },
    {
      number: "4",
      title: "Explore Features",
      desc: "Discover groups, channels, and advanced messaging options.",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="max-w-7xl mx-auto px-6">

        {/* Title */}
        <h2 className="text-4xl font-bold text-center text-gray-800">
          How Connectly Works
        </h2>

        <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mt-4">
          Getting started with Connectly is simple and takes just a few minutes.
        </p>

        {/* Steps */}
        <div className="relative mt-16 flex flex-col md:flex-row items-center justify-between gap-16 md:gap-0">

          {/* Line Behind Steps (Desktop Only) */}
          <div className="hidden md:block absolute left-[10%] right-[10%] top-10 h-1 bg-gradient-to-r from-indigo-500 to-purple-400 rounded-full"></div>

          {steps.map((step, index) => (
            <div
              key={index}
              className="relative z-10 flex flex-col items-center text-center max-w-[250px]"
            >
              {/* Number */}
              <div className="w-20 h-20 bg-white border-4 border-indigo-500 rounded-full flex items-center justify-center text-2xl font-bold text-indigo-600 shadow-lg mb-4">
                {step.number}
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600">{step.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}








export function WhatOurUsersSay() {
  const testimonials = [
    {
      initials: "JS",
      name: "John Smith",
      role: "Project Manager",
      content:
        "Connectly has completely transformed how our team communicates. The group features and file sharing make collaboration seamless.",
    },
    {
      initials: "MJ",
      name: "Maria Johnson",
      role: "Graphic Designer",
      content:
        "I love how easy it is to stay connected with my family across different countries. The voice messages feature is my favorite!",
    },
    {
      initials: "DW",
      name: "David Wilson",
      role: "Software Engineer",
      content:
        "The security features give me peace of mind knowing my conversations are private. Highly recommend Connectly to everyone.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Title */}
        <h2 className="text-4xl font-bold text-center text-gray-800">
          What Our Users Say
        </h2>

        <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mt-4 mb-14">
          Join millions of satisfied users who trust Connectly for their daily communication.
        </p>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-xl p-8 hover:shadow-xl transition transform hover:-translate-y-2"
            >
              {/* Quote Text */}
              <p className="text-gray-600 italic mb-6">
                "{item.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white flex items-center justify-center font-bold text-lg">
                  {item.initials}
                </div>

                {/* Info */}
                <div>
                  <h4 className="text-gray-800 font-semibold">{item.name}</h4>
                  <p className="text-gray-500 text-sm">{item.role}</p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}



 import { FaRocket, FaPlayCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

export function ReadyToGetStarted() {
  return (
    <section className="py-20 bg-gradient-to-br from-indigo-500 to-cyan-400 text-white text-center">
      <div className="max-w-4xl mx-auto px-6">

        {/* Title */}
        <h2 className="text-4xl font-bold mb-4">
          Ready to Get Started?
        </h2>

        {/* Subtitle */}
        <p className="text-lg opacity-90 max-w-2xl mx-auto mb-10">
          Join millions of users who trust Connectly for their daily communication.
          Sign up now and start connecting.
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-6 flex-wrap">

          {/* Get Started Button */}
          <Link to="/auth/register" className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-xl shadow hover:shadow-xl transition flex items-center gap-2">
            <FaRocket className="text-indigo-600" />
            Get Started Free
          </Link >

          {/* Watch Demo Button */}
          <button className="px-6 py-3 border border-white text-white font-semibold rounded-xl hover:bg-white/20 transition flex items-center gap-2">
            <FaPlayCircle className="text-white" />
            Watch Demo
          </button>

        </div>
      </div>
    </section>
  );
}
