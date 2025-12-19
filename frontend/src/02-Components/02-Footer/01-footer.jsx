 import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-16">
      <div className="max-w-7xl mx-auto px-6">

        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12">

          {/* Brand Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                C
              </div>
              <h3 className="text-2xl font-bold text-white">Connectly</h3>
            </div>

            <p className="text-gray-400 leading-relaxed">
              A modern messaging platform that prioritizes your privacy and connection experience.
              Fast, secure, and beautifully designed for everyone.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4 mt-6">
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-blue-500 transition">
                <FaFacebook className="text-white text-xl" />
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-pink-500 transition">
                <FaInstagram className="text-white text-xl" />
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-sky-400 transition">
                <FaTwitter className="text-white text-xl" />
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-blue-600 transition">
                <FaLinkedin className="text-white text-xl" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Product</h3>
            <ul className="space-y-3">
              <li><a className="hover:text-white transition" href="#">Features</a></li>
              <li><a className="hover:text-white transition" href="#">Security</a></li>
              <li><a className="hover:text-white transition" href="#">Business</a></li>
              <li><a className="hover:text-white transition" href="#">Download</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-3">
              <li><a className="hover:text-white transition" href="#">About</a></li>
              <li><a className="hover:text-white transition" href="#">Careers</a></li>
              <li><a className="hover:text-white transition" href="#">Brand Center</a></li>
              <li><a className="hover:text-white transition" href="#">Press</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-3">
              <li><a className="hover:text-white transition" href="#">Help Center</a></li>
              <li><a className="hover:text-white transition" href="#">Contact Us</a></li>
              <li><a className="hover:text-white transition" href="#">Status</a></li>
              <li><a className="hover:text-white transition" href="#">Community</a></li>
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-14 pt-8 text-center">
          <p className="text-gray-500">
            &copy; {new Date().getFullYear()} Connectly. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
