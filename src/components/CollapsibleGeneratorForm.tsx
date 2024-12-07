import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { X } from 'lucide-react';

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
    <>
      {/* Botón Generar en la parte superior */}
      <div className="fixed top-4 right-4 z-40">
        <Button
          className="bg-black text-white hover:bg-gray-900"
          onClick={() => setIsOpen(true)}
        >
          Generar
        </Button>
      </div>

      {/* Modal de generación */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Modal */}
          <div className="fixed inset-x-4 top-[20%] z-50 bg-white rounded-lg shadow-xl animate-slide-up">
            <div className="p-4">
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Generar Imagen</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Form Content */}
              <div className="space-y-4">
                {children}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
} 