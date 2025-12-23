'use client';

import React from 'react';
import Image from 'next/image'; // 1. Import thằng này
import Footer from './footer';

// 2. Giả sử ảnh nền nằm ở thư mục `public/background/background.webp`
const bgImage = '/background/background.webp'; 

type AuthLayoutProps = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    // Thêm 'relative' để làm mốc cho ảnh absolute bên trong
    <div className="relative flex min-h-screen items-center justify-center bg-[#f6fdff] overflow-hidden">
      
      {/* Background Image Layer (Dùng Next/Image) */}
      <div className="absolute inset-0 z-0">
        <Image
          src={bgImage}          // Đường dẫn ảnh trong public
          alt="Authentication Background"
          fill                   // Tự động tràn màn hình
          priority               // Load ảnh này ngay lập tức vì nó là nền
          quality={80}           // Giảm chất lượng tí cho nhẹ (mặc định 75)
          className="object-cover opacity-30 blur-[8px]" // CSS: Phủ kín + Mờ mờ + Nhòe
          sizes="100vw" // Báo cho trình duyệt biết ảnh này luôn to bằng màn hình
        />
      </div>

      {/* Content (Card Login) */}
      <div className="relative z-10 flex w-full flex-col items-center justify-center px-4 py-[70px]">
        {children}
      </div>

      {/* Footer */}
      <div className="absolute bottom-6 left-0 right-0 z-10">
        <Footer />
      </div>
    </div>
  );
}