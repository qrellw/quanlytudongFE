'use client';

import React, { useState } from 'react';
import { Form, Input, Checkbox, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import type { FormProps } from 'antd';

type LoginFormValues = {
  username: string;
  password: string;
  remember?: boolean;
};

export default function LoginForm() {
  const [form] = Form.useForm<LoginFormValues>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish: FormProps<LoginFormValues>['onFinish'] = async (values) => {
    setLoading(true);
    
    try {
      // ==========================================
      // TODO: DEV LOGIC - PASTE CODE VÀO ĐÂY
      // ==========================================
      // Ví dụ:
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     username: values.username,
      //     password: values.password,
      //   }),
      // });
      // const data = await response.json();
      // if (!response.ok) throw new Error(data.message);
      // 
      // if (values.remember) {
      //   localStorage.setItem('accessToken', data.accessToken);
      // } else {
      //   sessionStorage.setItem('accessToken', data.accessToken);
      // }
      // 
      // message.success('Đăng nhập thành công!');
      // router.push('/dashboard');
      // ==========================================
      
      // MOCK - Xóa đoạn này khi có logic thật
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Form values:', values);
      
    } catch (error) {
      console.error('Lỗi:', error);
      // TODO: DEV LOGIC - Xử lý error (show message, log, etc.)
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // ==========================================
    // TODO: DEV LOGIC - PASTE CODE VÀO ĐÂY
    // ==========================================
    // Hoặc có thể dùng default navigation:
    router.push('/forgotpass');
    // ==========================================
  };

  return (
    <Form
      form={form}
      name="login"
      onFinish={onFinish}
      autoComplete="off"
      initialValues={{ remember: true }}
      className="w-full"
    >
      {/* Username */}
      <Form.Item<LoginFormValues>
        name="username"
        rules={[
          { required: true, message: 'Vui lòng nhập tên đăng nhập!' },
          { min: 3, message: 'Tên đăng nhập phải có ít nhất 3 ký tự!' },
        ]}
        className="mb-10"
      >
        <Input
          prefix={<UserOutlined style={{ color: '#1890ff' }} />}
          placeholder="tendangnhap"
          size="large"
          className="h-[52px]"
          disabled={loading}
        />
      </Form.Item>

      {/* Password */}
      <Form.Item<LoginFormValues>
        name="password"
        rules={[
          { required: true, message: 'Vui lòng nhập mật khẩu!' },
          { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' },
        ]}
        className="mb-11"
      >
        <Input.Password
          prefix={<LockOutlined style={{ color: '#1890ff' }} />}
          placeholder="******"
          size="large"
          className="h-[52px]"
          disabled={loading}
        />
      </Form.Item>

      {/* Remember & Forgot password */}
      <div className="mb-11 flex items-center justify-between">
        <Form.Item<LoginFormValues>
          name="remember"
          valuePropName="checked"
          className="mb-0"
        >
          <Checkbox className="text-[11px]" disabled={loading}>
            Duy trì đăng nhập
          </Checkbox>
        </Form.Item>

        <a
          href="../../../app/(auth)/forgotpass/page.tsx"
          onClick={handleForgotPassword}
          className="text-[11px] text-black transition-colors hover:text-[#1890ff]"
        >
          Quên mật khẩu?
        </a>
      </div>

      {/* Submit Button */}
      <Form.Item className="mb-0">
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          block
          loading={loading}
          className="h-[40px]"
        >
          {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
        </Button>
      </Form.Item>
    </Form>
  );
}