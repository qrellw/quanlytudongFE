import AuthLayout from '@/components/layout/Authlayout';
import LoginCard from '@/components/auth/AuthCard';
import LoginForm from '@/components/auth/login/LoginForm';

export default function LoginPage() {
  return (
    <AuthLayout>
      <LoginCard title="Hệ thống quản lý tủ đông">
        <LoginForm />
      </LoginCard>
    </AuthLayout>
  );
}