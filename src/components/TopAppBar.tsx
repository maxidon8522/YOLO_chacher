import { ShoppingCart, HelpCircle } from 'lucide-react';
import { AppStep } from '../types';

interface TopAppBarProps {
  currentStep: AppStep;
}

export function TopAppBar({ currentStep }: TopAppBarProps) {
  return (
    <header className="bg-surface-container-lowest border-b-2 border-surface-variant sticky top-0 z-50">
      <div className="flex justify-between items-center px-10 py-6 w-full max-w-full">
        <div className="typography-headline-md text-primary tracking-tight">
          YOLO Cafeteria Self Checkout
        </div>
        
        {currentStep === AppStep.REVIEW && (
          <div className="hidden md:flex space-x-12">
            {/* Top-level Navigation Example */}
            <div className="typography-title-lg text-primary border-b-4 border-primary pb-1">
              Review
            </div>
          </div>
        )}

        <div className="flex items-center space-x-6">
          <button 
            className="text-on-surface-variant hover:bg-surface-container-low transition-colors rounded-full p-3 flex items-center justify-center"
            aria-label="Shopping Cart"
          >
            <ShoppingCart className="w-8 h-8" />
          </button>
          <button 
            className="text-on-surface-variant hover:bg-surface-container-low transition-colors rounded-full p-3 flex items-center justify-center"
            aria-label="Help"
          >
            <HelpCircle className="w-8 h-8" />
          </button>
        </div>
      </div>
    </header>
  );
}
