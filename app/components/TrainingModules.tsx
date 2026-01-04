"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  CircuitBoard,
  Monitor,
  Settings,
  Wrench,
  TestTube,
  TrendingUp,
  Shield,
  BarChart,
  ChevronRight,
} from "lucide-react";
import ModuleDetail from "./ModuleDetail";

const modules = [
  {
    icon: CircuitBoard,
    title: "LED Display Fundamentals",
    description:
      "Understanding the basic principles, structure, and working mechanism of LED display screens and modules",
    topics: [
      "LED Display Structure & Components",
      "Pixel Pitch & Resolution",
      "Types of LED Displays (SMD, COB, GOB)",
      "Color Gamut & Calibration",
    ],
  },
  {
    icon: Monitor,
    title: "LED Screen Applications",
    description:
      "Exploring various applications of LED display screens across different industries and use cases",
    topics: [
      "Nova star application and controller",
      "colour light application and controller",
      "Cloud based controller is different",
      "Live screening controller is different",
      "Broadcast & Control Rooms",
    ],
  },
  {
    icon: Settings,
    title: "LED Screen Control Systems",
    description:
      "Learning about LED display controllers, video processors, and content management systems",
    topics: [
      "Controller Types & Specifications",
      "Video Processing & Scaling",
      "Content Management Software",
      "Network & Connectivity",
    ],
  },
  {
    icon: Wrench,
    title: "Installation & Maintenance",
    description:
      "Practical training on proper installation techniques, mounting methods, and maintenance procedures for LED screens",
    topics: [
      "Installation Guidelines & Standards",
      "Mounting & Structural Support",
      "Troubleshooting Common Issues",
      "Maintenance & Service Procedures",
    ],
  },
  {
    icon: TestTube,
    title: "Testing & Quality Control",
    description:
      "Understanding testing methods, quality standards, and performance metrics for LED display screens",
    topics: [
      "Display Testing Procedures",
      "Quality Standards & Certifications",
      "Performance Metrics & Benchmarks",
      "Color Accuracy & Uniformity",
    ],
  },
  {
    icon: TrendingUp,
    title: "Energy Efficiency",
    description:
      "Learning about energy efficiency, power consumption, cost savings, and environmental benefits of LED displays",
    topics: [
      "Power Consumption Analysis",
      "Cost-Benefit Analysis",
      "Environmental Impact",
      "ROI & Lifecycle Costs",
    ],
  },
  {
    icon: Shield,
    title: "Safety Standards",
    description:
      "Comprehensive safety guidelines and compliance requirements for LED display screen installations",
    topics: [
      "Electrical Safety Standards",
      "Thermal Management & Cooling",
      "Compliance & Certifications",
      "Risk Assessment & Mitigation",
    ],
  },
  {
    icon: BarChart,
    title: "Market Trends & Future",
    description:
      "Exploring current market trends and future developments in LED display screen technology",
    topics: [
      "Market Analysis & Growth",
      "Emerging Display Technologies",
      "Future Applications & Innovations",
      "Industry Outlook & Predictions",
    ],
  },
];

export default function TrainingModules() {
  const [selectedModule, setSelectedModule] = useState<typeof modules[0] | null>(null);

  return (
    <section id="modules" className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 px-2">
            Training Modules
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Comprehensive curriculum covering all aspects of LED display screen technology
          </p>
          <p className="text-xs sm:text-sm text-gray-500 mt-2 px-4">
            Click on any module to learn more
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {modules.map((module, index) => {
            const IconComponent = module.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedModule(module)}
                className="bg-gradient-to-br from-white to-gray-50 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-200 hover:border-blue-300 active:border-blue-400 hover:shadow-xl active:shadow-lg transition-all duration-300 group cursor-pointer relative overflow-hidden touch-manipulation"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-indigo-50/0 group-hover:from-blue-50/50 group-hover:to-indigo-50/50 transition-all duration-300" />
                <div className="relative z-10">
                  <div className="mb-3 sm:mb-4">
                    <div className="inline-flex p-2 sm:p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 group-hover:scale-110 transition-all duration-300">
                      <IconComponent className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                    </div>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {module.title}
                  </h3>
                  <p className="text-gray-600 mb-3 sm:mb-4 text-xs sm:text-sm leading-relaxed">
                    {module.description}
                  </p>
                  <ul className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
                    {module.topics.slice(0, 3).map((topic, topicIndex) => (
                      <li
                        key={topicIndex}
                        className="text-xs sm:text-sm text-gray-500 flex items-start"
                      >
                        <span className="text-blue-600 mr-2 flex-shrink-0">•</span>
                        <span>{topic}</span>
                      </li>
                    ))}
                    {module.topics.length > 3 && (
                      <li className="text-xs sm:text-sm text-blue-600 font-medium">
                        +{module.topics.length - 3} more topics
                      </li>
                    )}
                  </ul>
                  <div className="flex items-center text-blue-600 font-semibold text-xs sm:text-sm mt-3 sm:mt-4 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Learn More</span>
                    <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {selectedModule && (
        <ModuleDetail
          module={selectedModule}
          isOpen={!!selectedModule}
          onClose={() => setSelectedModule(null)}
        />
      )}
    </section>
  );
}

