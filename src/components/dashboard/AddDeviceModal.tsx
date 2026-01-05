'use client';

import React from 'react';
import { Modal, Form, Input, Select, Button } from 'antd';

interface AddDeviceModalProps {
    open: boolean;
    onCancel: () => void;
    onCreate: (values: any) => void;
    loading?: boolean;
}

export default function AddDeviceModal({ open, onCancel, onCreate, loading }: AddDeviceModalProps) {
    const [form] = Form.useForm();

    const handleOk = () => {
        form.validateFields()
            .then((values) => {
                onCreate(values);
                form.resetFields();
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
    };

    return (
        <Modal
            open={open}
            title="Thêm Thiết Bị Mới"
            onCancel={onCancel}
            onOk={handleOk}
            confirmLoading={loading}
            okText="Thêm mới"
            cancelText="Hủy bỏ"
            okButtonProps={{ className: 'bg-blue-600' }}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={{ status: 'running', type: 'freezer' }}
            >
                <Form.Item
                    name="name"
                    label="Tên thiết bị"
                    rules={[{ required: true, message: 'Vui lòng nhập tên thiết bị!' }]}
                >
                    <Input placeholder="Ví dụ: Tủ mát số 1" />
                </Form.Item>

                <Form.Item
                    name="model"
                    label="Model / Số hiệu"
                    rules={[{ required: true, message: 'Vui lòng nhập model!' }]}
                >
                    <Input placeholder="Ví dụ: PANASONIC-XYZ" />
                </Form.Item>

                <div className="grid grid-cols-2 gap-4">
                    <Form.Item
                        name="type"
                        label="Loại thiết bị"
                        rules={[{ required: true, message: 'Chọn loại thiết bị!' }]}
                    >
                        <Select>
                            <Select.Option value="freezer">Tủ đông (-20°C)</Select.Option>
                            <Select.Option value="cooler">Tủ mát (2-8°C)</Select.Option>
                            <Select.Option value="centrifuge">Máy ly tâm</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="status"
                        label="Trạng thái ban đầu"
                    >
                        <Select>
                            <Select.Option value="running">Đang hoạt động</Select.Option>
                            <Select.Option value="maintenance">Đang bảo trì</Select.Option>
                            <Select.Option value="offline">Chưa kết nối</Select.Option>
                        </Select>
                    </Form.Item>
                </div>

                <Form.Item
                    name="location"
                    label="Vị trí lắp đặt"
                    rules={[{ required: true, message: 'Vui lòng nhập vị trí!' }]}
                >
                    <Input placeholder="Ví dụ: Phòng lấy máu sảnh A" />
                </Form.Item>
            </Form>
        </Modal>
    );
}
