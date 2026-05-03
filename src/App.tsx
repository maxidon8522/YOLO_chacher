import { useState } from 'react';
import { AppStep, CartItem, Product, ProductId } from './types';
import { PRODUCT_IMAGES } from './constants';
import { TopAppBar } from './components/TopAppBar';
import { ScanStep } from './components/ScanStep';
import { ReviewStep } from './components/ReviewStep';
import { PaymentStep } from './components/PaymentStep';
import { SuccessStep } from './components/SuccessStep';
import { AnimatePresence } from 'motion/react';

const PRODUCTS: Record<ProductId, Product> = {
  kake_udon: { id: 'kake_udon', name: 'かけうどん', price: 420, imageUrl: PRODUCT_IMAGES.kake_udon },
  kitsune_udon: { id: 'kitsune_udon', name: 'きつねうどん', price: 520, imageUrl: PRODUCT_IMAGES.kitsune_udon },
  tempura: { id: 'tempura', name: '天ぷら', price: 180, imageUrl: PRODUCT_IMAGES.tempura },
  onigiri: { id: 'onigiri', name: 'おにぎり', price: 150, imageUrl: PRODUCT_IMAGES.onigiri },
  inari: { id: 'inari', name: 'いなり寿司', price: 130, imageUrl: PRODUCT_IMAGES.inari },
  tea: { id: 'tea', name: 'お茶', price: 120, imageUrl: PRODUCT_IMAGES.tea }
};

const PRODUCT_ORDER: ProductId[] = ['kake_udon', 'kitsune_udon', 'tempura', 'onigiri', 'inari', 'tea'];

function countMatches(fileName: string, pattern: RegExp) {
  return fileName.match(pattern)?.length ?? 0;
}

export function parseImageFileName(fileName: string): CartItem[] {
  const normalized = fileName.toLowerCase();
  const counts: Partial<Record<ProductId, number>> = {};
  const kitsuneCount = countMatches(normalized, /kitsune/g);

  if (kitsuneCount > 0) {
    counts.kitsune_udon = kitsuneCount;
  } else {
    const kakeCount = countMatches(normalized, /kake|udon/g);
    if (kakeCount > 0) counts.kake_udon = kakeCount;
  }

  const tempuraCount = countMatches(normalized, /tempura/g);
  const onigiriCount = countMatches(normalized, /onigiri/g);
  const inariCount = countMatches(normalized, /inari/g);
  const teaCount = countMatches(normalized, /tea|ocha/g);

  if (tempuraCount > 0) counts.tempura = tempuraCount;
  if (onigiriCount > 0) counts.onigiri = onigiriCount;
  if (inariCount > 0) counts.inari = inariCount;
  if (teaCount > 0) counts.tea = teaCount;

  return PRODUCT_ORDER.flatMap((id) => {
    const quantity = counts[id] ?? 0;
    return quantity > 0 ? [{ ...PRODUCTS[id], quantity }] : [];
  });
}

export function calculateTotal(items: CartItem[]) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export default function App() {
  const [currentStep, setCurrentStep] = useState<AppStep>(AppStep.SCAN);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [uploadedFileName, setUploadedFileName] = useState('');

  const handleImageUpload = (file: File) => {
    setUploadedFileName(file.name);
    setCart(parseImageFileName(file.name));
    setCurrentStep(AppStep.REVIEW);
  };

  const addItem = (itemId: ProductId) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === itemId);
      if (existingItem) {
        return prevCart.map((item) => item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prevCart, { ...PRODUCTS[itemId], quantity: 1 }];
    });
  };

  const incrementItem = (itemId: ProductId) => {
    setCart((prevCart) => prevCart.map((item) => (
      item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    )));
  };

  const decrementItem = (itemId: ProductId) => {
    setCart((prevCart) => prevCart.map((item) => (
      item.id === itemId ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
    )));
  };

  const removeItem = (itemId: ProductId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  const resetState = () => {
    setCurrentStep(AppStep.SCAN);
    setCart([]);
    setUploadedFileName('');
  };

  const totalAmount = calculateTotal(cart);

  const render = () => (
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
              onImageUpload={handleImageUpload}
            />
          )}
          {currentStep === AppStep.REVIEW && (
            <ReviewStep 
              cart={cart}
              uploadedFileName={uploadedFileName}
              products={PRODUCT_ORDER.map((id) => PRODUCTS[id])}
              addItem={addItem}
              incrementItem={incrementItem}
              decrementItem={decrementItem}
              removeItem={removeItem}
              onRestartScan={resetState}
              onProceedToPayment={() => setCurrentStep(AppStep.PAYMENT)}
            />
          )}
          {currentStep === AppStep.PAYMENT && (
            <PaymentStep 
              amount={totalAmount}
              onBack={() => setCurrentStep(AppStep.REVIEW)}
              onPaymentComplete={() => setCurrentStep(AppStep.SUCCESS)}
            />
          )}
          {currentStep === AppStep.SUCCESS && (
            <SuccessStep 
              amount={totalAmount}
              onRestart={resetState}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );

  return render();
}
