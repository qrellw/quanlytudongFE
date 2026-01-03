'use client';

import React from 'react';
import { Modal, Form, Input, Select, Button, InputNumber } from 'antd';
import { ScanOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

interface CheckInModalProps {
    open: boolean;
    onCancel: () => void;
    onFinish: (values: any) => void;
}

export default function CheckInModal({ open, onCancel, onFinish }: CheckInModalProps) {
    const [form] = Form.useForm();

    const handleOk = () => {
        form.validateFields().then((values) => {
            onFinish(values);
            form.resetFields();
        });
    };

    return (
        <Modal
            open={open}
            onCancel={onCancel}
            onOk={handleOk}
            title="Nhập kho thủ công (Backup)"
            width={500}
            centered
            okText="Lưu"
            cancelText="Hủy"
        >
            <p className="text-gray-400 text-xs mb-4 italic">
                * Dùng cho trường hợp máy quét hỏng hoặc nhập liệu bổ sung.
            </p>

            <Form form={form} layout="vertical" initialValues={{ type: 'WHOLE_BLOOD', group: 'O+', volume: 350 }}>
                {/* 1. Barcode */}
                <Form.Item name="id" label="Mã Barcode" rules={[{ required: true, message: 'Bắt buộc' }]}>
                    <Input prefix={<ScanOutlined />} placeholder="Quét hoặc nhập tay..." autoFocus />
                </Form.Item>

                {/* 2. Thông tin máu */}
                <div className="grid grid-cols-2 gap-4">
                    <Form.Item name="group" label="Nhóm máu">
                        <Select>
                            {['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'].map(g => (
                                <Select.Option key={g} value={g}>{g}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item name="type" label="Loại chế phẩm">
                        <Select>
                            <Select.Option value="WHOLE_BLOOD">Máu toàn phần</Select.Option>
                            <Select.Option value="PLASMA">Huyết tương</Select.Option>
                        </Select>
                    </Form.Item>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Form.Item name="volume" label="Thể tích (ml)">
                        <Select>
                            <Select.Option value={250}>250 ml</Select.Option>
                            <Select.Option value={350}>350 ml</Select.Option>
                            <Select.Option value={450}>450 ml</Select.Option>
                        </Select>
                    </Form.Item>
                </div>

                {/* 3. Vị trí (Nhập tay) */}
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                    <span className="text-xs font-bold text-gray-500 block mb-2">VỊ TRÍ LƯU TRỮ (Xác nhận thực tế)</span>
                    <div className="grid grid-cols-2 gap-2">
                        <Form.Item name={['location', 'freezer']} label="Tủ" initialValue="A01" className="mb-0">
                            <Input />
                        </Form.Item>
                        <Form.Item name={['location', 'shelf']} label="Kệ" initialValue={1} className="mb-0">
                            <InputNumber min={1} className="w-full" />
                        </Form.Item>
                    </div>
                </div>
            </Form>
        </Modal>
    );
}
