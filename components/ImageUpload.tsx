
import React, { useState, useRef } from 'react';
import { Upload, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

interface ImageUploadProps {
  onUploadSuccess: (url: string) => void;
  label?: string;
  className?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onUploadSuccess, label = "رفع صورة", className = "" }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const IMGBB_API_KEY = "a16fdd9aead1214d64e435c9b83a0c2e";

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setStatus('idle');

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        onUploadSuccess(result.data.url);
        setStatus('success');
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        throw new Error(result.error?.message || 'فشل الرفع');
      }
    } catch (error) {
      console.error('Upload error:', error);
      setStatus('error');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-1">{label}</label>}
      <div 
        onClick={() => fileInputRef.current?.click()}
        className={`relative group cursor-pointer border-2 border-dashed rounded-2xl p-4 flex flex-col items-center justify-center transition-all min-h-[100px] bg-gray-50/50 hover:bg-white hover:border-primary ${
          status === 'error' ? 'border-red-300 bg-red-50' : 
          status === 'success' ? 'border-green-300 bg-green-50' : 
          'border-gray-200'
        }`}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          accept="image/*" 
          className="hidden" 
        />
        
        {isUploading ? (
          <div className="flex flex-col items-center gap-2 text-primary">
            <Loader2 className="animate-spin" size={24} />
            <span className="text-xs font-bold">جاري الرفع...</span>
          </div>
        ) : status === 'success' ? (
          <div className="flex flex-col items-center gap-2 text-green-600">
            <CheckCircle2 size={24} />
            <span className="text-xs font-bold">تم الرفع بنجاح!</span>
          </div>
        ) : status === 'error' ? (
          <div className="flex flex-col items-center gap-2 text-red-500">
            <AlertCircle size={24} />
            <span className="text-xs font-bold">حدث خطأ، حاول مجدداً</span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 text-gray-400 group-hover:text-primary">
            <Upload size={24} />
            <span className="text-xs font-bold">اضغط أو اسحب الصورة هنا</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
