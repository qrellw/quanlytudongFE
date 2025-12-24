import React from 'react';
import { Metadata } from 'next';
import AuthLayout from '@/components/layout/Authlayout'; // 1. Layout nền (đã làm từ đầu)
import AuthCard from '@/components/auth/AuthCard';            // 2. Card kính (ông vừa gửi)
import ResetPasswordForm from '@/components/auth/resetpass/ResetPasswordForm'; // 3. Form logic (vừa xong)

// Đặt tên Tab trình duyệt cho chuyên nghiệp
export const metadata: Metadata = {
  title: 'Đặt lại mật khẩu - Smart Freezer',
  description: 'Thay đổi mật khẩu đăng nhập hệ thống',
};

export default function ResetPasswordPage() {
  return (
    // Layout bao bên ngoài (Background ảnh + Footer)
    <AuthLayout>
      
      {/* Card kính nằm ở giữa */}
      <AuthCard title="Đặt lại mật khẩu">
        
        {/* Nhét cái Form vào ruột của Card */}
        <ResetPasswordForm />
        
      </AuthCard>

    </AuthLayout>
  );
}