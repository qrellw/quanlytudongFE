'use client';

import React from 'react';
import Image from 'next/image'; // 1. Import cái này

// 2. Link đến logo của bạn (nhớ bỏ file vào public/images/)
const logoImage = '/icon/logo.png';

type LoginCardProps = {
  title: string;
  children: React.ReactNode;
};

export default function LoginCard({ title, children }: LoginCardProps) {
  return (
    <div className="relative w-full max-w-[469px]">
      {/* Card Background - Glassmorphic */}
      <div className="absolute inset-0 rounded-[20px] bg-white/68 shadow-[0px_10px_30px_0px_rgba(170,170,170,0.32)] backdrop-blur-sm" />
      
      {/* Card Content */}
      <div className="relative flex flex-col items-center px-6 py-[65px]">
        
        {/* --- PHẦN SỬA ĐỔI: LOGO IMAGE --- */}
        <div className="mb-[35px] relative h-[100px] w-[100px]">
          <Image
            src={logoImage}
            alt="Logo FM"
            fill // Tự động căn full khung 100x100
            className="object-contain" // Giữ tỉ lệ logo không bị méo
            priority
          />
        </div>
        {/* -------------------------------- */}

        {/* Title */}
        <h1 className="mb-10 text-center text-2xl text-[rgba(31,31,31,0.76)]">
          {title}
        </h1>

        {/* Children - Form slot */}
        <div className="w-full max-w-[416px]">
          {children}
        </div>
      </div>
    </div>
  );
}