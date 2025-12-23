'use client';

import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import type { FormProps } from 'antd';

type ForgotPasswordFormValues = {
  email: string;
};

export default function ForgotPasswordForm() {
  const [form] = Form.useForm<ForgotPasswordFormValues>();
  const [loading, setLoading] = useState(false);

  const onFinish: FormProps<ForgotPasswordFormValues>['onFinish'] = async (values) => {
    setLoading(true);
    
    try {
      // ==========================================
      // TODO: DEV LOGIC - PASTE CODE VÀO ĐÂY
      // ==========================================
      // Ví dụ:
      // const response = await fetch('/api/auth/forgot-password', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email: values.email }),
      // });
      // const data = await response.json();
      // if (!response.ok) throw new Error(data.message);
      // 
      // message.success('Link khôi phục đã được gửi đến email của bạn!');
      // router.push('/auth/login');
      // ==========================================
      
      // MOCK - Xóa đoạn này khi có logic thật
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Email:', values.email);
      
    } catch (error) {
      console.error('Lỗi:', error);
      // TODO: DEV LOGIC - Xử lý error
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      form={form}
      name="forgot-password"
      onFinish={onFinish}
      autoComplete="off"
      className="w-full"
    >
      {/* Email */}
      <Form.Item<ForgotPasswordFormValues>
        name="email"
        rules={[
          { required: true, message: 'Vui lòng nhập email!' },
          { type: 'email', message: 'Email không hợp lệ!' },
        ]}
        className="mb-[43px]"
      >
        <Input
          prefix={<MailOutlined style={{ color: '#1890ff' }} />}
          placeholder="abcd@gmail.com"
          size="large"
          className="h-[52px]"
          disabled={loading}
        />
      </Form.Item>

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
          {loading ? 'Đang gửi...' : 'Gửi link khôi phục'}
        </Button>
      </Form.Item>
    </Form>
  );
}