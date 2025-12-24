'use client';

import React, { useState } from 'react';
import { Form, Input, Checkbox, Button, message } from 'antd';
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

  // Hook thông báo (Popup)
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish: FormProps<LoginFormValues>['onFinish'] = async (values) => {
    setLoading(true);

    try {
      console.log('📦 Đang đăng nhập với:', values);

      // =================================================================
      // 👇 [KHU VỰC DÀNH CHO BACKEND DEV]
      // Sau này có API thật thì xóa đoạn Mock dưới này đi và thay bằng fetch/axios
      // =================================================================

      // --- [MOCK LOGIC: KIỂM TRA TÀI KHOẢN CỨNG] ---
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // QUY ĐỊNH: Tài khoản mặc định để test
          const MOCK_USER = 'admin';
          const MOCK_PASS = '123456';

          if (values.username === MOCK_USER && values.password === MOCK_PASS) {
            // Nếu đúng -> Trả về thành công
            resolve({ token: 'fake_token_vip_pro', role: 'admin' });
          } else {
            // Nếu sai -> Trả về lỗi
            reject(new Error('Sai tài khoản hoặc mật khẩu! '));
          }
        }, 1000); // Giả vờ mạng lag 1 giây
      });
      
      // =================================================================
      // 👆 [HẾT KHU VỰC LOGIC]
      // =================================================================

      // [THÀNH CÔNG]
      messageApi.success('Đăng nhập thành công!');
      
      // Chuyển hướng sau 1s
      setTimeout(() => {
         router.push('/dashboard'); 
      }, 1000);

    } catch (error: any) {
      // [THẤT BẠI]
      console.error('Lỗi:', error);
      messageApi.error(error.message);

      // Xóa pass để nhập lại
      form.setFieldValue('password', '');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push('/forgotpassword');
  };

  return (
    <>
      {contextHolder}

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
          ]}
          className="mb-10"
        >
          <Input
            prefix={<UserOutlined style={{ color: '#1890ff' }} />}
            placeholder="Username (admin)"
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
          ]}
          className="mb-11"
        >
          <Input.Password
            prefix={<LockOutlined style={{ color: '#1890ff' }} />}
            placeholder="Password (123456)"
            size="large"
            className="h-[52px]"
            disabled={loading}
          />
        </Form.Item>

        {/* Remember & Forgot */}
        <div className="mb-11 flex items-center justify-between">
          <Form.Item<LoginFormValues>
            name="remember"
            valuePropName="checked"
            noStyle
          >
            <Checkbox className="text-[11px]" disabled={loading}>
              Duy trì đăng nhập
            </Checkbox>
          </Form.Item>

          <a
            href="/forgotpassword"
            onClick={handleForgotPassword}
            className="text-[13px] text-black transition-colors hover:text-[#1890ff]"
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
    </>
  );
}