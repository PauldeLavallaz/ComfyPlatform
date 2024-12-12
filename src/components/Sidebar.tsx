import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { 
  Workflow,
  Sparkles,
  CreditCard,
  Camera,
  Instagram,
  Globe,
  MessageCircle,
  Menu,
  X
} from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { SparklesIcon } from "lucide-react";

interface SidebarItem {
  name: string;
  icon: React.ReactNode;
  href: string;
  external?: boolean;
}

interface SidebarSection {
  title: string;
  items: SidebarItem[];
}

const sidebarItems: SidebarSection[] = [
  {
    title: "APLICACIÓN",
    items: [
      { name: "Flujos", icon: <Workflow className="w-4 h-4" />, href: "/" },
      { name: "Generador Básico", icon: <Sparkles className="w-4 h-4" />, href: "/generator/basic" },
      { name: "Franatics", icon: <CreditCard className="w-4 h-4" />, href: "/generator/franatics" },
      { name: "Luján Tech", icon: <Camera className="w-4 h-4" />, href: "/generator/lujan-tech" },
    ]
  },
  {
    title: "CONTACTO",
    items: [
      { 
        name: "Instagram", 
        icon: <Instagram className="w-4 h-4" />, 
        href: "https://www.instagram.com/morfeoacademy",
        external: true
      },
      { 
        name: "Web", 
        icon: <Globe className="w-4 h-4" />, 
        href: "https://www.morfeoacademy.com/",
        external: true
      },
      { 
        name: "WhatsApp", 
        icon: <MessageCircle className="w-4 h-4" />, 
        href: "https://wa.me/1140318493",
        external: true
      },
    ]
  }
];

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <>
      {/* Menu button solo visible cuando el sidebar está cerrado en móvil */}
      {isMobile && !isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed top-4 left-4 z-50 p-2 bg-black text-white rounded-md"
        >
          <Menu size={24} />
        </button>
      )}

      <aside className={`
        ${isMobile ? (isOpen ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0'}
        w-64 bg-white border-r fixed h-full min-h-screen overflow-y-auto flex flex-col transition-transform duration-300 ease-in-out
        md:translate-x-0 z-40
      `}>
        {/* Logo and Close Button Container */}
        <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">
            Morfeo Dreams Lab
          </Link>
          {isMobile && isOpen && (
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-gray-100 rounded-md"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-8 overflow-y-auto">
          {sidebarItems.map((section) => (
            <div key={section.title}>
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                {section.title}
              </h2>
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li key={item.name}>
                    {item.external ? (
                      <a 
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-sm text-gray-600 hover:text-black hover:bg-gray-50 rounded-md p-2 transition-colors"
                        onClick={() => isMobile && setIsOpen(false)}
                      >
                        {item.icon}
                        {item.name}
                      </a>
                    ) : (
                      <Link 
                        href={item.href}
                        className="flex items-center gap-3 text-sm text-gray-600 hover:text-black hover:bg-gray-50 rounded-md p-2 transition-colors"
                        onClick={() => isMobile && setIsOpen(false)}
                      >
                        {item.icon}
                        {item.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* User - Fixed at bottom */}
        <div className="sticky bottom-0 bg-white p-4 border-t mt-auto">
          <UserButton afterSignOutUrl="/" />
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
} 