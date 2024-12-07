import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface CollapsibleGeneratorFormProps {
  children: React.ReactNode;
  onSubmit?: () => void;
}

export function CollapsibleGeneratorForm({ children, onSubmit }: CollapsibleGeneratorFormProps) {
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

  if (!isMobile) {
    return <div className="space-y-6">{children}</div>;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      {isOpen ? (
        <div className="bg-white border-t shadow-lg p-4 space-y-4 animate-slide-up">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">Generar Imagen</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
            >
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
          {children}
        </div>
      ) : (
        <Button
          className="w-full rounded-none bg-black text-white hover:bg-gray-900"
          onClick={() => setIsOpen(true)}
        >
          <ChevronUp className="h-4 w-4 mr-2" />
          Generar Imagen
        </Button>
      )}
    </div>
  );
} 