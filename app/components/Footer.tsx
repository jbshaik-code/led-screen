"use client";

import { Monitor, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="bg-gray-900 text-gray-300 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-3 sm:mb-4">
              <Monitor className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400" />
              <span className="text-lg sm:text-xl font-bold text-white">LED Screen Training</span>
            </div>
            <p className="text-sm sm:text-base text-gray-400">
              Comprehensive bilingual technical training for LED display screen technology
              and applications.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3 sm:mb-4 text-base sm:text-lg">Quick Links</h3>
            <ul className="space-y-1.5 sm:space-y-2">
              <li>
                <a href="#home" className="hover:text-blue-400 active:text-blue-300 transition-colors text-sm sm:text-base touch-manipulation block">
                  Home
                </a>
              </li>
              <li>
                <a href="#modules" className="hover:text-blue-400 active:text-blue-300 transition-colors text-sm sm:text-base touch-manipulation block">
                  Training Modules
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-blue-400 active:text-blue-300 transition-colors text-sm sm:text-base touch-manipulation block">
                  About
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3 sm:mb-4 text-base sm:text-lg">Contact</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li className="flex items-start space-x-2">
                <Mail className="h-4 w-4 mt-0.5 sm:mt-1 flex-shrink-0" />
                <div className="flex flex-col text-xs sm:text-sm">
                  <a href="mailto:ullahmisbah15@gmail.com" className="hover:text-blue-400 transition-colors break-all">ullahmisbah15@gmail.com</a>
                  <a href="mailto:m.misbah@wejha.com" className="hover:text-blue-400 transition-colors break-all">m.misbah@wejha.com</a>
                </div>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <a href="tel:+966550182835" className="text-xs sm:text-sm hover:text-blue-400 transition-colors">+966550182835</a>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-0.5 sm:mt-1 flex-shrink-0" />
                <span className="text-xs sm:text-sm">Technical Training Center, KSA</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 sm:pt-8 text-center text-gray-400">
          <p className="text-xs sm:text-sm">&copy; {new Date().getFullYear()} LED Display Screen Technical Training. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

