import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { X, Wand2 } from 'lucide-react';

interface CollapsibleGeneratorFormProps {
  children: React.ReactNode;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function CollapsibleGeneratorForm({ 
  children, 
  isOpen, 
  onOpenChange 
}: CollapsibleGeneratorFormProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const open = isOpen ?? internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;

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
      {isMobile && !open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed top-4 right-4 z-40 bg-black text-white px-6 py-3 rounded-full shadow-lg"
        >
          <Wand2 className="w-5 h-5" />
          Generar
        </button>
      )}

      {open && (
        <div className="fixed inset-0 z-50">
          {/* Overlay */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setOpen(false)}
          />
          
          {/* Modal */}
          <div className="absolute inset-x-0 top-0 min-h-screen bg-white animate-slide-up">
            <div className="p-6">
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Generar Imagen</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setOpen(false)}
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
      )}
    </>
  );
} 