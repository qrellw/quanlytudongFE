import AuthLayout from '@/components/layout/Authlayout';
import AuthCard from '@/components/auth/AuthCard';
import LoginForm from '@/components/auth/login/LoginForm';
import { Metadata } from 'next'; 

export const metadata: Metadata = {
  title: 'Đăng nhập - Hệ thống quản lý Tủ đông', // <-- Đây là chữ ông muốn hiển thị
  description: 'Trang đăng nhập hệ thống quản lý tủ đông', 
  icons: {
    icon: '/icon/logo.png', 
  },
};

export default function LoginPage() {
  return (
    <AuthLayout>
      <AuthCard title="Hệ thống quản lý tủ đông">
        <LoginForm />
      </AuthCard>
    </AuthLayout>
  );
}