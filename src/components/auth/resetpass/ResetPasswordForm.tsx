'use client';

import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

export default function ResetPasswordForm() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      console.log('📦 Mật khẩu mới:', values.newPassword);

      // =================================================================
      // 👇 [KHU VỰC DÀNH CHO BACKEND DEV]
      // Paste logic gọi API đổi mật khẩu vào đây (có thể cần lấy token từ URL)
      // =================================================================
      
      // --- [MOCK DATA - GIẢ LẬP ĐỂ TEST UI] ---
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Giả vờ đợi 1.5s
      // ----------------------------------------

      // =================================================================
      // 👆 [HẾT KHU VỰC LOGIC]
      // =================================================================

      messageApi.success('Đổi mật khẩu thành công! Vui lòng đăng nhập lại.');

      // Chuyển hướng về trang login sau 1.5s
      setTimeout(() => {
        router.push('/login'); 
      }, 1500);

    } catch (error) {
      messageApi.error('Có lỗi xảy ra, vui lòng thử lại!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {contextHolder}
      
      <Form
        form={form}
        name="reset_password"
        onFinish={onFinish}
        layout="vertical"
        className="w-full"
      >
        {/* 1. Mật khẩu mới */}
        <Form.Item
          name="newPassword"
          rules={[
            { required: true, message: 'Vui lòng nhập mật khẩu mới!' },
            { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' },
          ]}
          className="mb-6"
          hasFeedback // Hiện dấu tích xanh khi nhập đúng
        >
          <Input.Password
            prefix={<LockOutlined className="text-gray-400" />}
            placeholder="Nhập mật khẩu mới"
            size="large"
            className="h-[52px]"
          />
        </Form.Item>

        {/* 2. Nhập lại mật khẩu (Có logic check khớp) */}
        <Form.Item
          name="confirmPassword"
          dependencies={['newPassword']} // Phụ thuộc vào ô trên
          hasFeedback
          className="mb-10"
          rules={[
            { required: true, message: 'Vui lòng xác nhận lại mật khẩu!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Mật khẩu nhập lại không khớp!'));
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="text-gray-400" />}
            placeholder="Nhập lại mật khẩu"
            size="large"
            className="h-[52px]"
          />
        </Form.Item>

        {/* 3. Nút Submit */}
        <Form.Item className="mb-0">
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            block
            loading={loading}
            className="h-[40px] font-medium"
          >
            Đổi mật khẩu
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}