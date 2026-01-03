"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "en" | "zh";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    // Load saved language preference from localStorage
    const savedLang = localStorage.getItem("language") as Language;
    if (savedLang === "en" || savedLang === "zh") {
      setLanguageState(savedLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

// Translations
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.modules": "Training Modules",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.title": "LED Screen Training",
    
    // Hero
    "hero.title": "LED Display Screen",
    "hero.subtitle": "Technical Training",
    "hero.description": "Master LED display screen technology through comprehensive bilingual training designed for professionals working with video walls and digital displays",
    "hero.startLearning": "Start Learning",
    "hero.learnMore": "Learn More",
    
    // Training Modules
    "modules.title": "Training Modules",
    "modules.subtitle": "Comprehensive curriculum covering all aspects of LED display screen technology",
    "modules.clickToLearn": "Click on any module to learn more",
    "modules.learnMore": "Learn More",
    "modules.moreTopics": "more topics",
    
    // About
    "about.title": "About the Training",
    "about.description": "Our comprehensive LED display screen technical training program is designed to provide you with in-depth knowledge and practical skills in LED display screen technology, applications, installation, and maintenance.",
    "about.certified": "Certified Training",
    "about.certifiedDesc": "Industry-recognized certification upon completion of the training program",
    "about.expert": "Expert Instructors",
    "about.expertDesc": "Learn from experienced professionals with years of industry expertise",
    "about.flexible": "Flexible Schedule",
    "about.flexibleDesc": "Self-paced learning with lifetime access to training materials",
    "about.practical": "Practical Focus",
    "about.practicalDesc": "Hands-on training with real-world applications and case studies",
    "about.courseOverview": "Course Overview",
    "about.courseText": "This bilingual technical training program covers all essential aspects of LED display screen technology, from fundamental concepts to advanced applications. The course is structured to accommodate both beginners and experienced professionals working with video walls and digital displays.",
    "about.courseText2": "You'll learn about LED display principles, screen installation techniques, maintenance procedures, control systems, safety standards, and much more. The training includes practical examples, case studies, and real-world scenarios to enhance your understanding of LED display technology.",
    "about.whoShouldAttend": "Who Should Attend",
    
    // Footer
    "footer.description": "Comprehensive bilingual technical training for LED display screen technology and applications.",
    "footer.quickLinks": "Quick Links",
    "footer.contact": "Contact",
    "footer.rights": "All rights reserved.",
  },
  zh: {
    // Navigation
    "nav.home": "首页",
    "nav.modules": "培训模块",
    "nav.about": "关于",
    "nav.contact": "联系我们",
    "nav.title": "LED屏幕培训",
    
    // Hero
    "hero.title": "LED显示屏",
    "hero.subtitle": "技术培训",
    "hero.description": "通过全面的双语培训掌握LED显示屏技术，专为从事视频墙和数字显示的专业人士设计",
    "hero.startLearning": "开始学习",
    "hero.learnMore": "了解更多",
    
    // Training Modules
    "modules.title": "培训模块",
    "modules.subtitle": "涵盖LED显示屏技术各个方面的综合课程",
    "modules.clickToLearn": "点击任何模块了解更多",
    "modules.learnMore": "了解更多",
    "modules.moreTopics": "更多主题",
    
    // About
    "about.title": "关于培训",
    "about.description": "我们全面的LED显示屏技术培训计划旨在为您提供LED显示屏技术、应用、安装和维护方面的深入知识和实践技能。",
    "about.certified": "认证培训",
    "about.certifiedDesc": "完成培训计划后获得行业认可的认证",
    "about.expert": "专家讲师",
    "about.expertDesc": "向拥有多年行业专业经验的资深专业人士学习",
    "about.flexible": "灵活安排",
    "about.flexibleDesc": "自主学习，终身访问培训材料",
    "about.practical": "实践重点",
    "about.practicalDesc": "具有实际应用和案例研究的实践培训",
    "about.courseOverview": "课程概述",
    "about.courseText": "这个双语技术培训计划涵盖LED显示屏技术的所有基本方面，从基本概念到高级应用。该课程的结构适合初学者和有经验的从事视频墙和数字显示的专业人士。",
    "about.courseText2": "您将学习LED显示原理、屏幕安装技术、维护程序、控制系统、安全标准等等。培训包括实际示例、案例研究和真实场景，以增强您对LED显示技术的理解。",
    "about.whoShouldAttend": "适合人群",
    
    // Footer
    "footer.description": "LED显示屏技术和应用的综合双语技术培训。",
    "footer.quickLinks": "快速链接",
    "footer.contact": "联系方式",
    "footer.rights": "版权所有。",
  },
};

