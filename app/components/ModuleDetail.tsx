"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, CheckCircle, ImageIcon, Presentation } from "lucide-react";
import Image from "next/image";
import PresentationView from "./PresentationView";
import ImageSlider from "./ImageSlider";
import ZoomableImage from "./ZoomableImage";
import MediaSlider from "./MediaSlider";

interface ModuleDetailProps {
  module: {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    description: string;
    topics: string[];
    details?: {
      overview: string;
      keyPoints: string[];
      applications: string[];
      imageUrl?: string;
      ledTypes?: {
        title: string;
        types: Array<{
          name: string;
          description: string;
          imageUrl?: string;
          features: string[];
          applications: string[];
        }>;
      };
    };
  };
  isOpen: boolean;
  onClose: () => void;
}

export default function ModuleDetail({
  module,
  isOpen,
  onClose,
}: ModuleDetailProps) {
  const IconComponent = module.icon;
  const [presentationMode, setPresentationMode] = useState(false);

  // Function to find all matching images and videos based on base filename
  const findMatchingImages = (baseImageUrl: string): string[] => {
    if (!baseImageUrl) return [];
    
    // Extract base name without extension
    const baseName = baseImageUrl.replace(/\.(jpeg|jpg|png|gif|webp|mp4)$/i, '');
    
    // Known media files in public folder - in a real app, this would be dynamic
    const allMedia = [
      "/Digital billboards and signage.jpeg",
      "/Digital billboards and signage-1.jpeg",
      "/Digital billboards and signage-2.jpeg",
      "/Digital billboards and signage-5.jpeg",
      "/Indoor and outdoor video walls.jpeg",
      "/Indoor and outdoor video walls-1.jpeg",
      "/Indoor and outdoor video walls-2.jpeg",
      "/Indoor and outdoor video walls-3.jpeg",
      "/Indoor and outdoor video walls-4.jpeg",
      "/custamize led.jpeg",
      "/custamize led-1.jpeg",
      "/custamize led-2.jpeg",
      "/custamize led-3.jpeg",
      "/custamize led-4.jpeg",
      "/custamize led-5.jpeg",
      "/custamize led-6.jpeg",
      "/custamize led-7.mp4",
      "/Broadcast and control room displays.jpeg",
      "/Broadcast and control room displays-1.jpeg",
      "/Broadcast and control room displays-2.jpeg",
      "/Broadcast and control room displays-3.jpeg",
      "/LED Display Structure and Components.mp4",
      "/LED Display Structure and Components-1.mp4",
      "/LED Display Structure and Components-2.mp4",
      "/LED Display Structure and Components-3.mp4",
      "/LED Display Structure and Components-4.mp4",
      "/LED Display Structure and Components-5.jpeg",
      "/LED Display Structure and Components-6.jpeg",
      "/Indoor screen.mp4",
      "/Indoor screen-1.mp4",
      "/Indoor screen-2.mp4",
      "/Indoor screen-3.jpeg",
      "/Indoor screen-4.jpeg",
      "/Indoor screen-5.jpeg",
    ];

    // Find all media files that match the base name pattern
    const matchingMedia = allMedia.filter(media => {
      const mediaBaseName = media.replace(/\.(jpeg|jpg|png|gif|webp|mp4)$/i, '');
      // Match exact base name or base name with -1, -2, etc.
      return mediaBaseName === baseName || mediaBaseName.startsWith(baseName + '-');
    });

    // Sort to ensure order: base, -1, -2, etc.
    return matchingMedia.sort((a, b) => {
      const aNum = a.match(/-(\d+)/)?.[1] || '0';
      const bNum = b.match(/-(\d+)/)?.[1] || '0';
      if (aNum === '0' && bNum !== '0') return -1;
      if (aNum !== '0' && bNum === '0') return 1;
      return parseInt(aNum) - parseInt(bNum);
    });
  };

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  const detailContent = {
    "LED Display Fundamentals": {
      overview:
        "LED display screens are composed of thousands of individual LED pixels arranged in a matrix to create images and videos. Understanding the fundamentals of LED display technology is crucial for anyone working with video walls, digital billboards, and commercial displays. LED displays come in various technologies (SMD, COB, GOB), each with unique characteristics and applications. The structure includes LED chips, circuit substrates, encapsulation layers, and protective coatings.",
      visualOverviewImage: "/LED Display Fundamentals - Visual Overview.jpeg",
      keyPoints: [
        "LED displays use RGB (Red, Green, Blue) pixels to create full-color images",
        "Pixel pitch determines resolution and viewing distance - smaller pitch means higher resolution",
        "Display structure includes: PAC circuit substrate, LED chips, compound encapsulation, and black coating",
        "Module dimensions (e.g., 320mm x 160mm) determine screen size and installation flexibility",
        "Brightness and contrast ratios affect visibility in different environments",
        "Refresh rate impacts video quality and smoothness",
        "Color calibration ensures accurate color reproduction",
      ],
      applications: [
        {
          title: "Indoor and outdoor video walls",
          imageUrl: "/Indoor and outdoor video walls.jpeg",
          description: "Large-scale LED video walls for indoor and outdoor installations, providing stunning visual displays for events, concerts, and public spaces.",
        },
        {
          title: "Digital billboards and signage",
          imageUrl: "/Digital billboards and signage.jpeg",
          description: "High-brightness outdoor LED displays for advertising, wayfinding, and information display in public areas.",
        },
        {
          title: "Broadcast and control room displays",
          imageUrl: "/Broadcast and control room displays.jpeg",
          description: "High-resolution LED displays for broadcast studios, control rooms, and monitoring applications requiring precise image quality.",
        },
        {
          title: "Retail and commercial installations",
          imageUrl: "/Indoor and outdoor video walls-1.jpeg",
          description: "LED displays for retail stores, shopping malls, and commercial spaces to enhance customer engagement and brand visibility.",
        },
        {
          title: "Customize LED",
          imageUrl: "/custamize led.jpeg",
          description: "Customized LED display solutions with unique shapes, sizes, and configurations tailored to specific architectural and design requirements.",
        },
        {
          title: "Pixel Pitch & Resolution",
          description: "Understanding pixel pitch is crucial for selecting the right LED display. Pixel pitch (P) refers to the distance between the centers of two adjacent pixels, measured in millimeters. Smaller pixel pitch means higher resolution and closer viewing distances.",
          details: {
            type: "pixel-pitch",
            sections: [
              {
                pitch: "P0.7–P1.2 mm",
                applications: "Broadcast, control rooms, luxury retail",
                viewingDistance: "Very close (1–3 m)",
                description: "Ultra-fine pixel pitch displays provide exceptional image quality for close viewing applications where detail and clarity are paramount.",
              },
              {
                pitch: "P1.5–P2.5 mm",
                applications: "Corporate lobbies, conference rooms, showrooms",
                viewingDistance: "~2.5–5 m",
                description: "Fine pixel pitch displays offer excellent image quality for medium-distance viewing in professional and commercial environments.",
              },
              {
                pitch: "P3.0–P3.9 mm",
                applications: "Auditoriums, malls & large halls",
                viewingDistance: "5–10 m",
                description: "Standard pixel pitch displays provide good image quality for larger spaces where viewers are at greater distances.",
              },
            ],
          },
        },
        {
          title: "LED Display Structure & Components",
          imageUrl: "/LED Display Structure and Components.mp4",
          description: "LED displays consist of multiple layers and components working together to create high-quality visual output. Understanding the structure is essential for installation, maintenance, and troubleshooting.",
          details: {
            type: "components",
            components: [
              {
                name: "PAC Circuit Substrate",
                description: "The base layer that provides electrical connections and structural support for all LED components.",
                function: "Power distribution and signal routing",
              },
              {
                name: "LED Chips",
                description: "Individual RGB (Red, Green, Blue) LED chips that emit light to create pixels and images.",
                function: "Light emission and color generation",
              },
              {
                name: "Compound Encapsulation",
                description: "Protective layer that seals and protects LED chips from environmental factors while maintaining optical clarity.",
                function: "Environmental protection and optical performance",
              },
              {
                name: "Black Coating",
                description: "Outer layer that provides contrast, reduces glare, and protects the display surface.",
                function: "Contrast enhancement and surface protection",
              },
            ],
          },
        },
      ],
      ledTypes: {
        title: "Types of LEDs",
        types: [
          {
            name: "SMD (Surface Mount Device)",
            description: "SMD LED displays feature red, green, and blue LED chips mounted directly onto printed circuit boards (PCBs). This technology enables higher pixel density, improved color accuracy, and is widely used in both indoor and outdoor LED display screens. Each RGB LED package is individually mounted, allowing for precise control and easy replacement. The structure shows individual LED packages visible on the module surface with standard dimensions like 320mm x 160mm.",
            imageUrl: "/SMD.jpeg",
            imageCaption: "SMD LED Display Module - Individual RGB LED packages mounted on PCB surface",
            features: [
              "RGB chips mounted directly on PCB surface",
              "Higher pixel density and resolution",
              "Wide viewing angle (120-160 degrees)",
              "Cost-effective display solution",
              "Suitable for indoor and outdoor displays",
              "Easy maintenance and LED replacement",
            ],
            applications: [
              "Indoor LED video walls",
              "Outdoor advertising displays",
              "Digital billboards and signage",
              "Retail store displays",
              "Stadium and arena screens",
              "Conference room displays",
            ],
          },
          {
            name: "COB (Chip on Board)",
            description: "COB LED displays bond multiple LED chips directly onto the PCB without individual packaging, then encapsulate them with a protective layer. This creates a seamless, smooth surface with ultra-fine pixel pitches ideal for high-resolution display applications. The compound encapsulation provides excellent protection and thermal management. The exploded view shows the layered structure: PAC circuit substrate (bottom), LED chips (RGB array), compound encapsulation layer, and black coating (top).",
            imageUrl: "/COB.jpeg",
            imageCaption: "COB LED Display Structure - Exploded view showing PAC circuit substrate, LED chips, compound encapsulation, and black coating layers",
            features: [
              "Multiple LED chips bonded directly to PCB",
              "Ultra-fine pixel pitch for high resolution",
              "Seamless and smooth display surface",
              "Superior brightness and contrast",
              "Enhanced thermal management",
              "Better protection against moisture and dust",
            ],
            applications: [
              "High-resolution control room displays",
              "Premium retail and showroom screens",
              "Broadcast studio video walls",
              "Close-viewing distance applications",
              "Professional presentation displays",
              "High-end commercial installations",
            ],
          },
          {
            name: "GOB (Glue on Board)",
            description: "GOB LED displays enhance traditional SMD technology by adding a transparent protective layer (glue) over the LED modules. This protective coating significantly increases durability and resistance to moisture, dust, and physical impact while maintaining SMD's visual performance. The transparent coating allows water to bead up on the surface (hydrophobic effect), providing excellent weather resistance and protection against environmental factors. This makes GOB ideal for outdoor installations.",
            imageUrl: "/GOB.jpeg",
            imageCaption: "GOB LED Display - Transparent protective coating showing water beading effect for weather resistance",
            features: [
              "Transparent protective layer over SMD modules",
              "Enhanced protection against physical damage",
              "Superior moisture and dust resistance",
              "Maintains SMD display quality and performance",
              "Extended lifespan in harsh environments",
              "Ideal for high-traffic and rental applications",
            ],
            applications: [
              "Outdoor LED display screens",
              "Rental and staging displays",
              "High-traffic public areas",
              "Sports venues and arenas",
              "Transportation hubs",
              "Durable commercial installations",
            ],
          },
        ],
      },
    },
    "LED Screen Applications": {
      overview:
        "LED display screen technology has revolutionized digital signage and visual communication with its versatility, high brightness, and long lifespan. Applications span across indoor and outdoor environments, from retail stores to stadiums.",
      keyPoints: [
        "Indoor video walls for retail and corporate environments",
        "Outdoor digital billboards and large-format displays",
        "Broadcast and control room monitoring displays",
        "Stadium and arena scoreboards and screens",
        "Transportation hubs and public information displays",
      ],
      applications: [
        "Retail store digital signage",
        "Corporate lobbies and conference rooms",
        "Sports venues and entertainment centers",
        "Airports and transportation terminals",
      ],
    },
    "LED Screen Control Systems": {
      overview:
        "LED display controllers and video processors are essential components that manage content, regulate power, and ensure optimal screen performance. Control systems enable content management, brightness adjustment, and network connectivity.",
      keyPoints: [
        "LED display controllers and sending cards",
        "Video processors and scalers for content management",
        "Content management software (CMS) platforms",
        "Network protocols and connectivity options",
        "Brightness and color calibration systems",
      ],
      applications: [
        "Multi-screen video wall installations",
        "Remote content management and scheduling",
        "Live video streaming and broadcasting",
        "Interactive display systems",
      ],
    },
    "Installation & Maintenance": {
      overview:
        "Proper installation and regular maintenance are critical for LED display screen performance and longevity. Following best practices ensures safety, optimal image quality, and extended screen lifespan.",
      keyPoints: [
        "Structural mounting and support systems",
        "Proper cable management and power distribution",
        "Environmental protection and IP ratings",
        "Pixel calibration and color uniformity",
        "Regular cleaning and inspection procedures",
      ],
      applications: [
        "Indoor video wall installations",
        "Outdoor billboard and signage projects",
        "Permanent and rental display setups",
        "High-traffic commercial installations",
      ],
    },
    "Testing & Quality Control": {
      overview:
        "Comprehensive testing ensures LED display screens meet performance, safety, and quality standards. Quality control processes verify color accuracy, brightness uniformity, and reliability across display modules.",
      keyPoints: [
        "Brightness and contrast ratio measurements",
        "Color accuracy and uniformity testing",
        "Pixel pitch and resolution validation",
        "Viewing angle and color shift analysis",
        "Safety certification and compliance standards",
      ],
      applications: [
        "Display manufacturing quality assurance",
        "Pre-installation testing and validation",
        "Post-installation calibration and tuning",
        "Performance benchmarking and comparison",
      ],
    },
    "Energy Efficiency": {
      overview:
        "LED display screens offer significant energy savings compared to traditional display technologies. Understanding power consumption, efficiency metrics, and calculating ROI helps justify LED display adoption in various applications.",
      keyPoints: [
        "Power consumption per square meter analysis",
        "Energy-efficient display modes and scheduling",
        "Long lifespan reduces replacement and maintenance costs",
        "Lower heat generation reduces cooling requirements",
        "Environmental benefits and sustainability",
      ],
      applications: [
        "Large-format display installations",
        "24/7 digital signage operations",
        "Energy-conscious commercial projects",
        "Sustainability and green building initiatives",
      ],
    },
    "Safety Standards": {
      overview:
        "Adhering to safety standards protects installers, users, and ensures compliance with regulations. Understanding electrical safety, structural requirements, thermal management, and risk assessment is essential for LED display installations.",
      keyPoints: [
        "Electrical safety standards (IEC, UL, CE)",
        "Structural mounting and load requirements",
        "Thermal management and ventilation",
        "EMC/EMI compliance for interference",
        "Installation and maintenance safety protocols",
      ],
      applications: [
        "Display product certification",
        "Installation safety compliance",
        "Public safety and building codes",
        "Regulatory compliance and approvals",
      ],
    },
    "Market Trends & Future": {
      overview:
        "The LED display screen market continues to evolve with new technologies, finer pixel pitches, and innovative applications. Understanding trends helps professionals stay ahead in this rapidly changing industry.",
      keyPoints: [
        "Ultra-fine pixel pitch displays (P0.9 and below)",
        "Transparent and flexible LED screen technologies",
        "Integration with AI and interactive technologies",
        "Growing adoption in retail and corporate environments",
        "Sustainability and energy efficiency focus",
      ],
      applications: [
        "Market research and analysis",
        "Product development strategy",
        "Investment and business planning",
        "Technology roadmap development",
      ],
    },
    "What WEJHA is providing and can be provide in LED": {
      overview:
        "WEJHA offers comprehensive LED display solutions including indoor screens, outdoor screens, transparent screens, smart film, decorative screens, floor screens, holographic screens, interactive screens, kinetic screens, and rental screens. Our products and services are designed to meet diverse architectural and design requirements.",
      keyPoints: [
        "Indoor screen",
        "Outdoor screen",
        "Transparent screen",
        "Smart film",
        "Decorative screen",
        "Floor screen",
        "Holographic screen",
        "Interactive screen",
        "Kinetic screen",
        "Rental screen",
      ],
      applications: [
        {
          title: "Indoor screen",
          imageUrl: "/Indoor screen.mp4",
          description: "High-quality indoor LED display screens designed for retail stores, corporate lobbies, conference rooms, and indoor environments requiring superior image quality and close viewing distances.",
        },
      ],
    },
  };

  const content = detailContent[module.title as keyof typeof detailContent] || {
    overview: module.description,
    keyPoints: module.topics,
    applications: [],
  };

  // Generate slides for presentation mode
  const generateSlides = () => {
    const slides: any[] = [];

    // Visual Overview image slide (if available)
    if ('visualOverviewImage' in content && content.visualOverviewImage) {
      slides.push({
        type: "image",
        title: `${module.title} - Visual Overview`,
        imageUrl: content.visualOverviewImage,
        imageCaption: "System architecture and work process diagram",
        content: "This diagram illustrates the complete LED display system setup, including input sources, processing units, and connections.",
      });
    }

    // Overview slide
    slides.push({
      type: "content",
      title: "Overview",
      content: content.overview,
    });

    // Key Points slide
    if (content.keyPoints && content.keyPoints.length > 0) {
      slides.push({
        type: "list",
        title: "Key Points",
        items: content.keyPoints,
      });
    }

    // LED Types slides (if available)
    if ('ledTypes' in content && content.ledTypes) {
      slides.push({
        type: "title",
        title: content.ledTypes.title,
      });

      content.ledTypes.types.forEach((ledType: any) => {
        slides.push({
          type: "led-type",
          ledType: ledType,
        });
      });
    }

    // Applications slides with images and details
    if (content.applications && content.applications.length > 0) {
      // Check if applications have images or details
      const hasImages = content.applications.some((app: any) => 
        typeof app === 'object' && app !== null && app.imageUrl
      );
      const hasDetails = content.applications.some((app: any) => 
        typeof app === 'object' && app !== null && app.details
      );

      if (hasImages || hasDetails) {
        // Add title slide
        slides.push({
          type: "title",
          title: "Real-World Applications",
        });

        // Add individual slides for each application
        content.applications.forEach((app: any) => {
          if (typeof app === 'object' && app !== null) {
            // If application has image/video
            if (app.imageUrl) {
              // Find all matching media (images and videos)
              const matchingMedia = findMatchingImages(app.imageUrl);
              const mediaToUse = matchingMedia.length > 1 ? matchingMedia : [app.imageUrl];
              
              slides.push({
                type: "image",
                title: app.title,
                imageUrl: mediaToUse.length > 1 ? mediaToUse : mediaToUse[0],
                imageCaption: app.description || app.title,
                content: app.description,
              });
            }
            
            // If application has Pixel Pitch details
            if (app.details && app.details.type === "pixel-pitch" && app.details.sections) {
              slides.push({
                type: "title",
                title: app.title,
              });
              app.details.sections.forEach((section: any, sIndex: number) => {
                slides.push({
                  type: "content",
                  title: section.pitch,
                  content: `${section.description}\n\nApplications: ${section.applications}\nViewing Distance: ${section.viewingDistance}`,
                });
              });
            }
            
            // If application has Components details
            if (app.details && app.details.type === "components" && app.details.components) {
              slides.push({
                type: "title",
                title: app.title,
              });
              app.details.components.forEach((component: any, cIndex: number) => {
                slides.push({
                  type: "content",
                  title: component.name,
                  content: `${component.description}\n\nFunction: ${component.function}`,
                });
              });
            }
            
            // If application has only description (no image, no details)
            if (!app.imageUrl && !app.details && app.description) {
              slides.push({
                type: "content",
                title: app.title,
                content: app.description,
              });
            }
          }
        });
      } else {
        // Fallback to list if no images or details
        slides.push({
          type: "list",
          title: "Applications",
          items: content.applications.map((app: any) => 
            typeof app === 'object' && app !== null ? app.title : app
          ),
        });
      }
    }

    // Topics covered slide
    slides.push({
      type: "list",
      title: "Topics Covered",
      items: module.topics,
    });

    return slides;
  };

  const slides = generateSlides();

  // If presentation mode, show PresentationView
  if (presentationMode) {
    return (
      <PresentationView
        slides={slides}
        moduleTitle={module.title}
        moduleDescription={module.description}
        isOpen={isOpen}
        onClose={() => {
          setPresentationMode(false);
          onClose();
        }}
      />
    );
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 sm:inset-4 md:inset-8 lg:inset-16 z-50 overflow-y-auto"
            onClick={(e) => {
              if (e.target === e.currentTarget) onClose();
            }}
          >
            <div className="bg-white rounded-none sm:rounded-2xl shadow-2xl max-w-6xl mx-auto min-h-full sm:min-h-[80vh] max-h-screen sm:max-h-[90vh] flex flex-col">
              {/* Header */}
              <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 sm:p-6 rounded-t-none sm:rounded-t-2xl z-10 flex-shrink-0">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center space-x-2 sm:space-x-4 flex-1 min-w-0">
                    <div className="p-2 sm:p-3 bg-white/20 rounded-lg backdrop-blur-sm flex-shrink-0">
                      <IconComponent className="h-6 w-6 sm:h-8 sm:w-8" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2 truncate">{module.title}</h2>
                      <p className="text-sm sm:text-base text-blue-100 line-clamp-2">{module.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
                    <button
                      onClick={() => setPresentationMode(true)}
                      className="p-2 hover:bg-white/20 active:bg-white/30 rounded-lg transition-colors flex items-center space-x-1 sm:space-x-2 touch-manipulation"
                      title="Presentation Mode"
                    >
                      <Presentation className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span className="text-xs sm:text-sm hidden sm:inline">Presentation</span>
                    </button>
                    <button
                      onClick={onClose}
                      className="p-2 hover:bg-white/20 active:bg-white/30 rounded-lg transition-colors touch-manipulation"
                      aria-label="Close"
                    >
                      <X className="h-5 w-5 sm:h-6 sm:w-6" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8 overflow-y-auto flex-1">
                {/* Image Section */}
                {'visualOverviewImage' in content && content.visualOverviewImage ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="space-y-3"
                  >
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                      {module.title} - Visual Overview
                    </h3>
                    <div className="relative h-64 sm:h-80 md:h-96 rounded-lg sm:rounded-xl overflow-hidden bg-gradient-to-br from-blue-100 to-indigo-100">
                      <ZoomableImage
                        src={content.visualOverviewImage}
                        alt={`${module.title} - Visual Overview`}
                        fill
                        className="object-contain p-4 bg-white"
                        sizes="(max-width: 768px) 100vw, 80vw"
                        quality={90}
                      />
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="relative h-48 sm:h-64 rounded-lg sm:rounded-xl overflow-hidden bg-gradient-to-br from-blue-100 to-indigo-100"
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <IconComponent className="h-32 w-32 text-blue-600 opacity-20" />
                    </div>
                  </motion.div>
                )}

                {/* Overview */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-blue-50 rounded-lg sm:rounded-xl p-4 sm:p-6 border-l-4 border-blue-600"
                >
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
                    Overview
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                    {content.overview}
                  </p>
                </motion.div>

                {/* Key Points */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                    Key Points
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                    {content.keyPoints.map((point, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        className="flex items-start space-x-2 sm:space-x-3 bg-white p-3 sm:p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
                      >
                        <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <p className="text-sm sm:text-base text-gray-700">{point}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* LED Types Section - Only for LED Fundamentals */}
                {'ledTypes' in content && content.ledTypes && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200"
                  >
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
                      {content.ledTypes.title}
                    </h3>
                    <div className="space-y-4 sm:space-y-6">
                      {content.ledTypes.types.map((ledType: any, index: number) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 + index * 0.15 }}
                          className="bg-white rounded-lg p-4 sm:p-6 border border-gray-200 hover:border-indigo-300 hover:shadow-lg transition-all"
                        >
                          <div className="flex items-start justify-between mb-3 sm:mb-4 gap-2">
                            <h4 className="text-lg sm:text-xl font-bold text-indigo-600 flex-1">
                              {ledType.name}
                            </h4>
                            <div className="px-2 sm:px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs sm:text-sm font-semibold flex-shrink-0">
                              {ledType.name.split(" ")[0]}
                            </div>
                          </div>
                          
                          {/* Image Section */}
                          <div className="mb-4 sm:mb-6 rounded-lg sm:rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-300">
                            <div className="relative w-full h-48 sm:h-64 md:h-80">
                              {ledType.imageUrl ? (
                                <>
                                  <Image
                                    src={ledType.imageUrl}
                                    alt={`${ledType.name} - LED Technology`}
                                    fill
                                    className="object-contain p-4 bg-white"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    quality={90}
                                    priority={index === 0}
                                    onError={(e) => {
                                      // Image failed to load - show fallback
                                      const target = e.target as HTMLImageElement;
                                      target.style.display = "none";
                                      const parent = target.parentElement;
                                      if (parent) {
                                        const fallback = parent.querySelector('.image-fallback');
                                        if (fallback) {
                                          (fallback as HTMLElement).style.display = "flex";
                                        }
                                      }
                                    }}
                                  />
                                  <div className="image-fallback hidden absolute inset-0 items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100">
                                    <div className="text-center p-8">
                                      <ImageIcon className="h-16 w-16 text-indigo-400 mx-auto mb-4" />
                                      <p className="text-gray-600 font-semibold">{ledType.name}</p>
                                      <p className="text-sm text-gray-500 mt-2">Add image to /public/images/</p>
                                    </div>
                                  </div>
                                </>
                              ) : (
                                <div className="flex items-center justify-center h-full bg-gradient-to-br from-indigo-100 to-purple-100">
                                  <div className="text-center p-8">
                                    <ImageIcon className="h-16 w-16 text-indigo-400 mx-auto mb-4" />
                                    <p className="text-gray-600 font-semibold">{ledType.name}</p>
                                    <p className="text-sm text-gray-500 mt-2">Add image to /public/images/</p>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                          {ledType.imageCaption && (
                            <p className="mt-3 mb-4 text-sm text-gray-600 italic text-center bg-blue-50 p-3 rounded-lg border border-blue-100">
                              {ledType.imageCaption}
                            </p>
                          )}

                          <p className="text-gray-700 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                            {ledType.description}
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                            <div>
                              <h5 className="font-semibold text-gray-900 mb-2 sm:mb-3 flex items-center text-base sm:text-lg">
                                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-600 mr-2 flex-shrink-0" />
                                Key Features
                              </h5>
                              <ul className="space-y-2 sm:space-y-2.5">
                                {ledType.features.map((feature: string, fIndex: number) => (
                                  <li
                                    key={fIndex}
                                    className="text-xs sm:text-sm text-gray-700 flex items-start leading-relaxed"
                                  >
                                    <span className="text-indigo-600 mr-2 mt-1.5 font-bold flex-shrink-0">▸</span>
                                    <span>{feature}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h5 className="font-semibold text-gray-900 mb-2 sm:mb-3 flex items-center text-base sm:text-lg">
                                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-600 mr-2 flex-shrink-0" />
                                Applications
                              </h5>
                              <ul className="space-y-2 sm:space-y-2.5">
                                {ledType.applications.map((app: string, aIndex: number) => (
                                  <li
                                    key={aIndex}
                                    className="text-xs sm:text-sm text-gray-700 flex items-start leading-relaxed"
                                  >
                                    <span className="text-indigo-600 mr-2 mt-1.5 font-bold flex-shrink-0">▸</span>
                                    <span>{app}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Applications */}
                {content.applications && content.applications.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="bg-indigo-50 rounded-lg sm:rounded-xl p-4 sm:p-6"
                  >
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
                      Real-World Applications
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                      {content.applications.map((app: any, index: number) => {
                        const isObject = typeof app === 'object' && app !== null;
                        const title = isObject ? app.title : app;
                        const imageUrl = isObject ? app.imageUrl : null;
                        const description = isObject ? app.description : null;

                        // Find all matching media (images and videos) for this application
                        const matchingMedia = imageUrl ? findMatchingImages(imageUrl) : [];
                        const hasMultipleMedia = matchingMedia.length > 1;
                        const hasVideo = matchingMedia.some(m => m.toLowerCase().endsWith('.mp4'));

                        return (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 + index * 0.1 }}
                            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                          >
                            {imageUrl && (
                              <div className="relative w-full h-40 sm:h-48">
                                {hasMultipleMedia ? (
                                  <MediaSlider
                                    media={matchingMedia}
                                    alt={title}
                                    interval={5000}
                                    autoPlay={true}
                                  />
                                ) : hasVideo ? (
                                  <div className="relative w-full h-full">
                                    <video
                                      src={imageUrl}
                                      className="w-full h-full object-cover"
                                      controls
                                      playsInline
                                      loop
                                      muted
                                    />
                                  </div>
                                ) : (
                                  <ZoomableImage
                                    src={imageUrl}
                                    alt={title}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    quality={85}
                                  />
                                )}
                              </div>
                            )}
                            <div className="p-3 sm:p-4">
                              <div className="flex items-start space-x-2 mb-2">
                                <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 flex-shrink-0" />
                                <h4 className="text-base sm:text-lg font-semibold text-gray-900">{title}</h4>
                              </div>
                              {description && (
                                <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                                  {description}
                                </p>
                              )}
                              
                              {/* Pixel Pitch Details */}
                              {isObject && app.details && app.details.type === "pixel-pitch" && app.details.sections && (
                                <div className="mt-4 space-y-3 pt-3 border-t border-gray-200">
                                  {app.details.sections.map((section: any, sIndex: number) => (
                                    <div key={sIndex} className="bg-blue-50 rounded-lg p-3">
                                      <div className="flex items-center justify-between mb-2">
                                        <span className="font-bold text-blue-700 text-sm">
                                          {section.pitch}
                                        </span>
                                        <span className="text-xs text-gray-600 bg-white px-2 py-1 rounded">
                                          {section.viewingDistance}
                                        </span>
                                      </div>
                                      <p className="text-xs text-gray-700 font-medium mb-1">
                                        {section.applications}
                                      </p>
                                      <p className="text-xs text-gray-600">
                                        {section.description}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              )}

                              {/* Structure & Components Details */}
                              {isObject && app.details && app.details.type === "components" && app.details.components && (
                                <div className="mt-4 space-y-2 pt-3 border-t border-gray-200">
                                  {app.details.components.map((component: any, cIndex: number) => (
                                    <div key={cIndex} className="bg-indigo-50 rounded-lg p-3">
                                      <h5 className="font-semibold text-indigo-700 text-sm mb-1">
                                        {component.name}
                                      </h5>
                                      <p className="text-xs text-gray-700 mb-1">
                                        {component.description}
                                      </p>
                                      <p className="text-xs text-indigo-600 italic">
                                        Function: {component.function}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* Topics Covered */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (content.applications && content.applications.length > 0) ? 1.0 : (('ledTypes' in content && content.ledTypes) ? 0.8 : 0.5) }}
                >
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                    Topics Covered
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
                    {module.topics.map((topic, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: ((content.applications && content.applications.length > 0) ? 1.1 : (('ledTypes' in content && content.ledTypes) ? 0.9 : 0.6)) + index * 0.05 }}
                        className="flex items-center space-x-2 sm:space-x-3 bg-gradient-to-r from-gray-50 to-blue-50 p-3 sm:p-4 rounded-lg"
                      >
                        <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600 flex-shrink-0" />
                        <span className="text-sm sm:text-base text-gray-700 font-medium">{topic}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Footer */}
              <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-6 rounded-b-2xl">
                <div className="flex justify-end">
                  <button
                    onClick={onClose}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <span>Close</span>
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

