"use client";

import { Award, Users, Clock, Target } from "lucide-react";

const features = [
  {
    icon: Award,
    title: "Certified Training",
    description:
      "Industry-recognized certification upon completion of the training program",
  },
  {
    icon: Users,
    title: "Expert Instructors",
    description:
      "Learn from experienced professionals with years of industry expertise",
  },
  {
    icon: Clock,
    title: "Flexible Schedule",
    description:
      "Self-paced learning with lifetime access to training materials",
  },
  {
    icon: Target,
    title: "Practical Focus",
    description:
      "Hands-on training with real-world applications and case studies",
  },
];

export default function About() {
  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 px-2">
            About the Training
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Our comprehensive LED display screen technical training program is designed to
            provide you with in-depth knowledge and practical skills in LED display screen
            technology, applications, installation, and maintenance.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12 md:mb-16">
          {features.map((feature, index) => {
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
                Course Overview
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 leading-relaxed">
                This bilingual technical training program covers all essential
                aspects of LED display screen technology, from fundamental concepts to advanced
                applications. The course is structured to accommodate both
                beginners and experienced professionals working with video walls and digital displays.
              </p>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                You'll learn about LED display principles, screen installation techniques,
                maintenance procedures, control systems, safety standards, and much more. The
                training includes practical examples, case studies, and
                real-world scenarios to enhance your understanding of LED display technology.
              </p>
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                Who Should Attend
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                {[
                  "AV/Display Engineers",
                  "LED Screen Installers",
                  "Video Wall Technicians",
                  "Display Maintenance Professionals",
                  "Project Managers",
                  "Students & Enthusiasts",
                ].map((item, index) => (
                  <li key={index} className="flex items-center text-sm sm:text-base text-gray-600">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-2 sm:mr-3 flex-shrink-0"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

