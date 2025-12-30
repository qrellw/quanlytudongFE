import AuthLayout from '@/components/layout/Authlayout';
import AuthCard from '@/components/auth/AuthCard';
import ForgotPasswordForm from '@/components/auth/forgotpass/ForgotPasswordForm';
import { Metadata } from 'next'; 

export const metadata: Metadata = {
  title: 'Quên mật khẩu', // <-- Đây là chữ ông muốn hiển thị
  description: 'Trang quên mật khẩu hệ thống quản lý tủ đông', 
  icons: {
    icon: '/icon/logo.png', 
  },
};

export default function ForgotPasswordPage() {
  return (
    <AuthLayout>
      <AuthCard title="Quên mật khẩu">
        <ForgotPasswordForm />
      </AuthCard>
    </AuthLayout>
  );
}