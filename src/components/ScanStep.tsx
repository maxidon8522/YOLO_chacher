import { useRef, type ChangeEvent } from 'react';
import { motion } from 'motion/react';
import { Camera, Utensils, CheckCircle } from 'lucide-react';
import { IMAGES } from '../constants';

interface ScanStepProps {
  onImageUpload: (file: File) => void;
}

export function ScanStep({ onImageUpload }: ScanStepProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) onImageUpload(file);
  };

  return (
    <motion.main 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex-grow flex flex-col items-center justify-center p-margin-edge w-full max-w-5xl mx-auto"
    >
      {/* Progress Indicator */}
      <div className="w-full max-w-4xl mb-12 hidden md:block">
        <div className="flex justify-between items-center relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-surface-variant z-0 rounded-full"></div>
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0 h-1 bg-primary z-0 rounded-full"></div>
          
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center mb-2 font-bold shadow-sm">1</div>
            <span className="typography-label-caps text-primary">SCAN TRAY</span>
          </div>
          <div className="relative z-10 flex flex-col items-center opacity-50">
            <div className="w-10 h-10 rounded-full bg-surface-container-high text-on-surface flex items-center justify-center mb-2 font-bold">2</div>
            <span className="typography-label-caps text-on-surface">REVIEW</span>
          </div>
          <div className="relative z-10 flex flex-col items-center opacity-50">
            <div className="w-10 h-10 rounded-full bg-surface-container-high text-on-surface flex items-center justify-center mb-2 font-bold">3</div>
            <span className="typography-label-caps text-on-surface">PAY</span>
          </div>
        </div>
      </div>

      <div className="text-center mb-10 max-w-2xl mx-auto">
        <h1 className="typography-display-lg text-on-surface mb-4">YOLOセルフレジ</h1>
        <p className="typography-body-xl text-on-surface-variant">料理画像をアップロードすると、ファイル名から商品を認識します。</p>
      </div>

      {/* Upload Area */}
      <div 
        onClick={openFilePicker}
        className="w-full max-w-3xl bg-surface-container-lowest rounded-xl border-2 border-dashed border-outline-variant shadow-[0_4px_20px_rgba(0,0,0,0.05)] flex flex-col items-center justify-center p-12 hover:bg-surface-container-low transition-colors cursor-pointer group"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
          data-testid="tray-image-input"
        />
        <div className="w-32 h-32 bg-secondary-container rounded-full flex items-center justify-center mb-8 group-hover:scale-105 transition-transform duration-300">
          <Utensils className="w-16 h-16 text-on-secondary-container" strokeWidth={1.5} />
        </div>
        
        <button 
          className="bg-primary text-on-primary typography-body-xl py-4 px-8 rounded-full shadow-md hover:bg-surface-tint hover:shadow-lg transition-all min-h-[64px] flex items-center justify-center space-x-3 w-full max-w-sm mb-6 flex-shrink-0 font-semibold"
          onClick={(e) => { e.stopPropagation(); openFilePicker(); }}
        >
          <Camera className="w-6 h-6" />
          <span>画像をアップロード</span>
        </button>
        
        <p className="typography-body-xl text-on-surface-variant text-center">例: udon_tempura_onigiri.jpg</p>
      </div>

      {/* Visual Hint */}
      <div className="mt-12 flex items-center space-x-6 bg-surface-container-low rounded-xl p-4 shadow-sm max-w-2xl w-full border border-surface-container-high">
        <div className="flex-shrink-0 w-24 h-24 bg-surface-container-lowest rounded-lg border border-outline-variant overflow-hidden relative shadow-sm">
          <img 
            alt="Sample healthy meal tray" 
            src={IMAGES.HEALTHY_TRAY} 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-primary" strokeWidth={2.5} fill="white" />
          </div>
        </div>
        <div>
          <h3 className="typography-title-lg text-on-surface mb-1">ファイル名で認識するデモです</h3>
          <p className="typography-body-xl text-on-surface-variant text-sm">kake / udon / kitsune / tempura / onigiri / inari / tea / ocha に対応しています。</p>
        </div>
      </div>
    </motion.main>
  );
}
