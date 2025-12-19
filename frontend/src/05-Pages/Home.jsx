 import { FaSignal, FaWifi, FaBatteryThreeQuarters, FaRocket, FaPlayCircle } from "react-icons/fa";
import  {HowConnectlyWorks, ReadyToGetStarted, WhatOurUsersSay, WhyChooseConnectly} from "../02-Components/03-homeComponents/subChild1";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      {/* HERO SECTION */}
      <section className="relative py-24 bg-gradient-to-br from-[#f5f7fa] to-[#e4edf5] overflow-hidden">
        {/* Background Circle */}
        <div className="absolute -top-1/2 -right-10 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-indigo-400/10 to-cyan-300/10"></div>

        <div className="max-w-7xl mx-auto px-5 relative z-10">
          <div className="flex flex-col md:flex-row items-center md:justify-between gap-16">

            {/* Text Section */}
            <div className="max-w-xl text-center md:text-left">
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight bg-gradient-to-br from-gray-800 to-indigo-600 bg-clip-text text-transparent">
                Modern Messaging for Everyone
              </h1>

              <p className="text-lg text-gray-600 mt-5">
                Connect with friends, family, and colleagues with our secure,
                fast, and intuitive messaging platform. No ads, no tracking —
                just pure communication.
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center md:justify-start">
                 <Link to="/auth/register" className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-xl shadow hover:shadow-xl transition flex items-center gap-2">
            <FaRocket className="text-indigo-600" />
            Get Started Free
          </Link >

                <button className="px-6 py-3 border border-indigo-600 text-indigo-600 font-semibold rounded-xl hover:bg-indigo-50 transition flex items-center gap-2">
                  <FaPlayCircle className="text-blue" />Watch Demo
                </button>
              </div>
            </div>

            {/* Phone Mockup */}
            <div className="flex justify-center md:justify-end w-full md:w-auto">
              <div className="w-[260px] md:w-[300px] h-[520px] md:h-[600px] bg-white rounded-[40px] shadow-xl border-[10px] border-gray-800 overflow-hidden">

                {/* Phone Screen */}
                <div className="w-full h-full bg-gradient-to-br from-purple-600 to-indigo-800 text-white p-5 flex flex-col">

                  {/* Status Bar */}
                  <div className="flex justify-between items-center mb-6">
                    <div className="font-semibold">9:41</div>

                    <div className="flex items-center gap-3 text-sm">
                      <FaSignal className="w-4 h-4" aria-hidden="true" />
                      <FaWifi className="w-4 h-4" aria-hidden="true" />
                      <FaBatteryThreeQuarters className="w-4 h-4" aria-hidden="true" />
                    </div>
                  </div>

                  {/* Chat Messages */}
                  <div className="flex flex-col gap-4">
                    <div className="max-w-[80%] p-3 rounded-2xl bg-white/20 text-sm backdrop-blur-md self-start rounded-bl-md">
                      Hey! Are we still meeting tomorrow?
                    </div>

                    <div className="max-w-[80%] p-3 rounded-2xl bg-white text-gray-800 text-sm self-end rounded-br-md">
                      Yes, definitely! 2 PM at the usual place.
                    </div>

                    <div className="max-w-[80%] p-3 rounded-2xl bg-white/20 text-sm self-start rounded-bl-md">
                      But, I am busy
                    </div>

                    <div className="max-w-[80%] p-3 rounded-2xl bg-white text-gray-800 text-sm self-end rounded-br-md">
                      You have to come.
                    </div>

                    <div className="max-w-[80%] p-3 rounded-2xl bg-white/20 text-sm self-start rounded-bl-md">
                      Perfect! I'll bring the documents.
                    </div>

                    <div className="max-w-[80%] p-3 rounded-2xl bg-white text-gray-800 text-sm self-end rounded-br-md">
                      Great! See you then 😊
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <WhyChooseConnectly />

      <HowConnectlyWorks/>
      <WhatOurUsersSay/>
      <ReadyToGetStarted/>
    </>
  );
}
