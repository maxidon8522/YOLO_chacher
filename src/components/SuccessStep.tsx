import { motion } from 'motion/react';
import { CheckCircle, ArrowRight } from 'lucide-react';

interface SuccessStepProps {
  amount: number;
  onRestart: () => void;
}

export function SuccessStep({ amount, onRestart }: SuccessStepProps) {
  return (
    <motion.main 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex-grow flex items-center justify-center p-margin-edge relative overflow-hidden"
    >
      {/* Decorative Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-fixed-dim rounded-full mix-blend-multiply filter blur-3xl opacity-30 pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary-fixed rounded-full mix-blend-multiply filter blur-3xl opacity-40 pointer-events-none"></div>
      
      <div className="bg-surface-container-lowest rounded-xl shadow-[0px_8px_30px_rgba(0,0,0,0.08)] border border-surface-variant p-16 max-w-2xl w-full text-center relative z-10 flex flex-col items-center">
        
        {/* Success Icon */}
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
          className="w-32 h-32 bg-primary-container rounded-full flex items-center justify-center mb-8 shadow-inner"
        >
          <CheckCircle className="w-20 h-20 text-on-primary-container" strokeWidth={2.5} />
        </motion.div>

        <h1 className="typography-display-lg text-on-surface mb-6">会計が完了しました</h1>
        
        <div className="bg-surface-container-low rounded-lg py-4 px-8 mb-6 inline-block border border-surface-variant">
          <p className="typography-title-lg text-primary font-bold">支払い金額: ¥{amount}</p>
        </div>

        <p className="typography-body-xl text-on-surface-variant mb-12 max-w-md mx-auto">
          ご利用ありがとうございました。
        </p>

        <button 
          onClick={onRestart}
          className="bg-primary hover:bg-surface-tint text-on-primary typography-title-lg py-6 px-16 rounded-full shadow-md transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-4 min-h-[72px] min-w-[320px]"
        >
          <span>次の会計へ</span>
          <ArrowRight className="w-6 h-6" />
        </button>

      </div>
    </motion.main>
  );
}
