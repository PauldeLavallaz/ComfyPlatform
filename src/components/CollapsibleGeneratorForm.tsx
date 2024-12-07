import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { X, Wand2 } from 'lucide-react';

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
          size="lg"
          className="bg-black text-white hover:bg-gray-900 rounded-full px-6 py-6 font-medium text-base shadow-lg flex items-center gap-2"
          onClick={() => setIsOpen(true)}
        >
          <Wand2 className="w-5 h-5" />
          Generar
        </Button>
      </div>

      {/* Modal y Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50">
          {/* Overlay */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Modal */}
          <div className="absolute inset-x-0 top-0 max-h-[90vh] overflow-y-auto">
            <div className="mx-4 mt-16 bg-white rounded-xl shadow-xl animate-slide-up">
              <div className="p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Generar Imagen</h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="hover:bg-gray-100 rounded-full"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                {/* Form Content */}
                <div className="space-y-4">
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 