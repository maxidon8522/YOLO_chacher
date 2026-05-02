import { motion } from 'motion/react';
import { Camera, Info, RefreshCw, Minus, Plus, Trash2, PlusCircle, Search, QrCode } from 'lucide-react';
import { IMAGES } from '../constants';
import { CartItem } from '../types';

interface ReviewStepProps {
  cart: CartItem[];
  updateQuantity: (id: string, delta: number) => void;
  removeItem: (id: string) => void;
  onRestartScan: () => void;
  onProceedToPayment: () => void;
}

export function ReviewStep({ cart, updateQuantity, removeItem, onRestartScan, onProceedToPayment }: ReviewStepProps) {
  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <motion.main 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex-1 flex flex-col xl:flex-row p-margin-edge gap-gutter max-w-[1600px] mx-auto w-full pb-32 xl:pb-margin-edge"
    >
      {/* Left Column: Image Preview */}
      <section className="w-full xl:w-2/5 flex flex-col gap-6">
        <div className="bg-surface-container-lowest rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-surface-variant overflow-hidden flex flex-col h-full">
          <div className="p-6 border-b border-surface-variant bg-surface-container-low">
            <h2 className="typography-title-lg text-on-surface flex items-center gap-3">
              <Camera className="w-6 h-6 text-primary" />
              Tray Scan
            </h2>
          </div>
          
          <div className="p-6 flex-1 flex flex-col items-center justify-center bg-surface">
            <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden border-2 border-dashed border-outline-variant">
              <img 
                src={IMAGES.TRAY_WITH_BBOX} 
                alt="Detected tray" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Note: In a real app bounding boxes would be drawn dynamically over the base image */}
            </div>
            <div className="mt-6 flex items-start gap-4 w-full bg-secondary-container text-on-secondary-container p-4 rounded-lg">
              <Info className="w-6 h-6 flex-shrink-0 mt-0.5" />
              <p className="typography-body-xl">AI recognition complete. You can manually adjust items if needed.</p>
            </div>
          </div>

          <div className="p-6 border-t border-surface-variant bg-surface-container-low flex justify-center">
            <button 
              onClick={onRestartScan}
              className="w-full typography-headline-md border-2 border-outline text-on-surface-variant py-4 px-6 rounded-lg hover:bg-surface-variant transition-colors flex items-center justify-center gap-3 min-h-[48px] bg-transparent"
            >
              <RefreshCw className="w-6 h-6" />
              Restart Scan
            </button>
          </div>
        </div>
      </section>

      {/* Right Column: Order Summary */}
      <section className="w-full xl:w-3/5 flex flex-col gap-6">
        <div className="bg-surface-container-lowest rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-surface-variant overflow-hidden flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-surface-variant bg-surface-container-low flex justify-between items-center">
            <h2 className="typography-display-lg text-on-surface">Order Summary</h2>
            <span className="bg-primary-container text-on-primary-container px-4 py-2 rounded-full typography-label-caps whitespace-nowrap">
              {cart.reduce((s, i) => s + i.quantity, 0)} Items
            </span>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4 max-h-[500px]">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 bg-surface rounded-xl border border-surface-variant hover:border-primary transition-colors">
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-24 h-24 rounded-lg overflow-hidden bg-surface-container flex-shrink-0 shadow-sm border border-surface-variant">
                    <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="typography-title-lg text-on-surface">{item.name}</h3>
                    <span className="text-on-surface-variant typography-body-xl">¥{item.price}</span>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  {/* Stepper */}
                  <div className="flex items-center bg-surface-container-high rounded-full border border-outline-variant overflow-hidden h-[48px]">
                    <button 
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-[48px] h-full flex items-center justify-center text-on-surface hover:bg-surface-variant transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <span className="w-12 text-center typography-headline-md text-on-surface">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-[48px] h-full flex items-center justify-center text-on-surface hover:bg-surface-variant transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="w-24 text-right">
                    <span className="typography-headline-md text-on-surface">¥{item.price * item.quantity}</span>
                  </div>
                  
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="w-[48px] h-[48px] flex items-center justify-center text-error hover:bg-error-container rounded-full transition-colors flex-shrink-0"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-6 h-6" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Add Section */}
          <div className="p-6 border-t border-surface-variant bg-surface">
            <h4 className="typography-title-lg text-on-surface mb-4">Add Missing Item</h4>
            <div className="flex flex-wrap gap-4">
              <button className="flex items-center gap-2 bg-surface border-2 border-outline-variant text-on-surface hover:border-primary hover:bg-surface-bright transition-colors px-6 py-3 rounded-full typography-body-xl min-h-[48px]">
                <PlusCircle className="w-5 h-5 text-primary" />
                Inari Sushi
              </button>
              <button className="flex items-center gap-2 bg-surface border-2 border-outline-variant text-on-surface hover:border-primary hover:bg-surface-bright transition-colors px-6 py-3 rounded-full typography-body-xl min-h-[48px]">
                <PlusCircle className="w-5 h-5 text-primary" />
                Onigiri
              </button>
              <button className="flex items-center gap-2 bg-surface border-2 border-outline-variant text-on-surface hover:border-primary hover:bg-surface-bright transition-colors px-6 py-3 rounded-full typography-body-xl min-h-[48px]">
                <Search className="w-5 h-5" />
                Browse Full Menu
              </button>
            </div>
          </div>

          {/* Total & Checkout */}
          <div className="p-8 border-t border-surface-variant bg-surface-container-low">
            <div className="flex justify-between items-end mb-8">
              <span className="typography-headline-md text-on-surface-variant">Total Amount</span>
              <span className="typography-display-lg text-primary text-6xl">¥{totalAmount}</span>
            </div>
            
            <button 
              onClick={onProceedToPayment}
              className="w-full bg-primary text-on-primary typography-display-lg !text-3xl py-6 px-8 rounded-xl shadow-lg hover:bg-surface-tint hover:shadow-xl transition-all flex items-center justify-center gap-4 min-h-[80px]"
            >
              Proceed to QR Payment
              <QrCode className="w-8 h-8" />
            </button>
          </div>
        </div>
      </section>
    </motion.main>
  );
}
