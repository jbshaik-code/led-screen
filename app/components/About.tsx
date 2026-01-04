"use client";

import { Award, Users, Clock, Target, MessageCircle, Phone } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

const getFeatures = (t: (key: string) => string) => [
  {
    icon: Award,
    title: t("about.certified"),
    description: t("about.certifiedDesc"),
  },
  {
    icon: Users,
    title: t("about.expert"),
    description: t("about.expertDesc"),
  },
  {
    icon: Clock,
    title: t("about.flexible"),
    description: t("about.flexibleDesc"),
  },
  {
    icon: Target,
    title: t("about.practical"),
    description: t("about.practicalDesc"),
  },
];

export default function About() {
  const [showContactModal, setShowContactModal] = useState(false);
  const { t } = useLanguage();

  const contactInfo = {
    whatsapp: "https://wa.me/966550182835",
    wechatId: "ullahmisbah15",
    employees: [
      {
        name: "Mohammed Misbah ullah",
        whatsapp: "https://wa.me/966550182835",
        wechatId: "ullahmisbah15",
      },
      {
        name: "Sam Xie",
        whatsapp: "https://wa.me/16267408299",
        wechatId: "q718739872",
      },
      {
        name: "Waddah Mansour",
        whatsapp: "https://wa.me/966596640390",
        wechatId: "wxid_o0j1axixsz7e22",
      },
    ],
  };

  const clickableItems = [
    "AV/Display Engineers",
    "LED Screen Installers",
    "Video Wall Technicians",
    "Display Maintenance Professionals",
  ];

  const handleItemClick = () => {
    setShowContactModal(true);
  };

  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 px-2">
            {t("about.title")}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            {t("about.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12 md:mb-16">
          {getFeatures(t).map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="mb-3 sm:mb-4">
                  <div className="inline-flex p-2 sm:p-3 bg-blue-100 rounded-lg">
                    <IconComponent className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-lg sm:rounded-xl md:rounded-2xl p-6 sm:p-8 md:p-12 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                {t("about.courseOverview")}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 leading-relaxed">
                {t("about.courseText")}
              </p>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {t("about.courseText2")}
              </p>
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                {t("about.whoShouldAttend")}
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                {[
                  "AV/Display Engineers",
                  "LED Screen Installers",
                  "Video Wall Technicians",
                  "Display Maintenance Professionals",
                  "Project Managers",
                  "Students & Enthusiasts",
                ].map((item, index) => {
                  const isClickable = clickableItems.includes(item);
                  return (
                    <li
                      key={index}
                      className={`flex items-center text-sm sm:text-base ${
                        isClickable
                          ? "text-blue-600 hover:text-blue-700 cursor-pointer transition-colors"
                          : "text-gray-600"
                      }`}
                      onClick={isClickable ? handleItemClick : undefined}
                    >
                      <span className="w-2 h-2 bg-blue-600 rounded-full mr-2 sm:mr-3 flex-shrink-0"></span>
                      <span className={isClickable ? "underline" : ""}>{item}</span>
                    </li>
                  );
                })}
              </ul>
              
              {/* Contact Modal */}
              {showContactModal && (
                <div
                  className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                  onClick={() => setShowContactModal(false)}
                >
                  <div
                    className="bg-white rounded-lg sm:rounded-xl p-6 sm:p-8 max-w-md w-full shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <h4 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
                      {t("footer.contact")}
                    </h4>
                    
                    <div className="space-y-4 sm:space-y-6">
                      {contactInfo.employees.map((employee, index) => (
                        <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                          <h5 className="font-semibold text-gray-900 mb-3 text-base sm:text-lg">
                            {employee.name}
                          </h5>
                          {employee.whatsapp && (
                            <div className="space-y-2">
                              <a
                                href={employee.whatsapp}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors"
                              >
                                <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                                <span className="text-sm sm:text-base">WhatsApp: {employee.whatsapp.replace("https://wa.me/", "")}</span>
                              </a>
                              {employee.wechatId && (
                                <div className="flex items-center space-x-2 text-gray-700">
                                  <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
                                  <span className="text-sm sm:text-base">WeChat ID: {employee.wechatId}</span>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 flex flex-col sm:flex-row gap-3">
                      <a
                        href={contactInfo.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 px-4 py-2 sm:py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors text-center flex items-center justify-center space-x-2"
                      >
                        <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                        <span>Open WhatsApp</span>
                      </a>
                      <button
                        onClick={() => setShowContactModal(false)}
                        className="px-4 py-2 sm:py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

