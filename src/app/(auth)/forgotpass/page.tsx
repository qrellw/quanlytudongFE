import AuthLayout from '@/components/layout/Authlayout';
import LoginCard from '@/components/auth/AuthCard';
import ForgotPasswordForm from '@/components/auth/forgotpass/ForgotPasswordForm';

export default function ForgotPasswordPage() {
  return (
    <AuthLayout>
      <LoginCard title="Quên mật khẩu">
        <ForgotPasswordForm />
      </LoginCard>
    </AuthLayout>
  );
}