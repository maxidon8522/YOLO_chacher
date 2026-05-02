import { useState } from 'react';
import { AppStep, CartItem } from './types';
import { IMAGES } from './constants';
import { TopAppBar } from './components/TopAppBar';
import { ScanStep } from './components/ScanStep';
import { ReviewStep } from './components/ReviewStep';
import { PaymentStep } from './components/PaymentStep';
import { SuccessStep } from './components/SuccessStep';
import { AnimatePresence } from 'motion/react';

const INITIAL_CART: CartItem[] = [
  { id: '1', name: 'Kake Udon', price: 420, quantity: 1, imageUrl: IMAGES.KAKE_UDON },
  { id: '2', name: 'Tempura', price: 180, quantity: 1, imageUrl: IMAGES.TEMPURA },
  { id: '3', name: 'Green Tea', price: 120, quantity: 1, imageUrl: IMAGES.GREEN_TEA }
];

export default function App() {
  const [currentStep, setCurrentStep] = useState<AppStep>(AppStep.SCAN);
  const [cart, setCart] = useState<CartItem[]>([]);

  const handleScanComplete = () => {
    // Simulate AI detection loading initial cart items
    setCart([...INITIAL_CART]);
    setCurrentStep(AppStep.REVIEW);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prevCart) => prevCart.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeItem = (id: string) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== id));
  };

  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen flex flex-col bg-surface relative">
      {(currentStep === AppStep.SCAN || currentStep === AppStep.REVIEW || currentStep === AppStep.SUCCESS) && (
        <TopAppBar currentStep={currentStep} />
      )}
      
      {/* Background blobs for payment/success steps - handled inside components for better context framing, but can add global if needed */}
      {(currentStep === AppStep.PAYMENT) && (
         <>
           <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary-container rounded-full blur-[120px] opacity-20 pointer-events-none z-0"></div>
           <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] bg-secondary-container rounded-full blur-[100px] opacity-30 pointer-events-none z-0"></div>
         </>
      )}

      <div className="flex-grow flex flex-col z-10 w-full relative">
        <AnimatePresence mode="wait">
          {currentStep === AppStep.SCAN && (
            <ScanStep 
              key="scan"
              onScanComplete={handleScanComplete} 
            />
          )}
          {currentStep === AppStep.REVIEW && (
            <ReviewStep 
              key="review"
              cart={cart}
              updateQuantity={updateQuantity}
              removeItem={removeItem}
              onRestartScan={() => setCurrentStep(AppStep.SCAN)}
              onProceedToPayment={() => setCurrentStep(AppStep.PAYMENT)}
            />
          )}
          {currentStep === AppStep.PAYMENT && (
            <PaymentStep 
              key="payment"
              amount={totalAmount}
              onBack={() => setCurrentStep(AppStep.REVIEW)}
              onPaymentComplete={() => setCurrentStep(AppStep.SUCCESS)}
            />
          )}
          {currentStep === AppStep.SUCCESS && (
            <SuccessStep 
              key="success"
              amount={totalAmount}
              onRestart={() => setCurrentStep(AppStep.SCAN)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
