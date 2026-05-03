import { motion } from 'motion/react';
import { Lock, Info, ArrowLeft, CheckCircle } from 'lucide-react';
import { IMAGES } from '../constants';

interface PaymentStepProps {
  amount: number;
  onBack: () => void;
  onPaymentComplete: () => void;
}

export function PaymentStep({ amount, onBack, onPaymentComplete }: PaymentStepProps) {
  return (
    <motion.main 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="flex-1 w-full max-w-2xl bg-surface-container-lowest rounded-xl shadow-[0_4px_40px_rgba(0,0,0,0.06)] border border-surface-variant flex flex-col items-center relative z-10 overflow-hidden mx-auto my-auto self-center"
    >
      {/* Header */}
      <header className="w-full bg-surface-bright py-8 border-b border-surface-variant flex flex-col items-center justify-center">
        <h1 className="typography-headline-md text-on-surface mb-2">QR決済</h1>
        <div className="flex items-center space-x-2 text-surface-tint">
          <Lock className="w-6 h-6" />
          <span className="typography-body-xl">ダミー決済</span>
        </div>
      </header>

      {/* Content Area */}
      <div className="flex flex-col items-center w-full px-12 py-10">
        
        {/* Amount Display */}
        <div className="mb-10 text-center">
          <h2 className="typography-display-lg text-on-surface mb-2 text-6xl font-extrabold">¥{amount}</h2>
          <p className="typography-body-xl text-on-surface-variant">合計金額</p>
        </div>

        {/* QR Code Container */}
        <div className="bg-surface p-6 rounded-xl border border-surface-variant shadow-sm mb-8 relative">
          {/* QR Code Corners - simulated using absolute divs */}
          <div className="absolute top-4 left-4 w-6 h-6 border-t-4 border-l-4 border-primary rounded-tl-sm"></div>
          <div className="absolute top-4 right-4 w-6 h-6 border-t-4 border-r-4 border-primary rounded-tr-sm"></div>
          <div className="absolute bottom-4 left-4 w-6 h-6 border-b-4 border-l-4 border-primary rounded-bl-sm"></div>
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b-4 border-r-4 border-primary rounded-br-sm"></div>
          
          <img 
            src={IMAGES.QR_CODE} 
            alt="Payment QR Code" 
            className="w-64 h-64 object-cover rounded-lg border border-surface-variant"
          />
        </div>

        {/* Instruction */}
        <div className="flex items-start space-x-4 max-w-md mx-auto bg-surface-container-low p-4 rounded-lg mb-12">
          <Info className="text-primary w-8 h-8 shrink-0 mt-0.5" />
          <p className="typography-body-xl text-on-surface-variant leading-relaxed">
            モック用のQRコードです。支払い完了ボタンで会計完了画面へ進みます。
          </p>
        </div>

        {/* Actions */}
        <div className="w-full flex flex-col space-y-4 px-8">
          <button 
            onClick={onPaymentComplete}
            className="w-full bg-primary hover:bg-surface-tint text-on-primary typography-title-lg py-5 px-6 rounded-lg transition-colors flex items-center justify-center space-x-3 shadow-sm min-h-[64px]"
          >
            <CheckCircle className="w-6 h-6" />
            <span>支払い完了</span>
          </button>
          
          <button 
            onClick={onBack}
            className="w-full bg-transparent border-2 border-outline text-on-surface-variant hover:bg-surface-container-low typography-title-lg py-5 px-6 rounded-lg transition-colors flex items-center justify-center space-x-3 min-h-[64px]"
          >
            <ArrowLeft className="w-6 h-6" />
            <span>戻る</span>
          </button>
        </div>

      </div>
    </motion.main>
  );
}
