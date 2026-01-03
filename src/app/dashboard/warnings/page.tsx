'use client';

import React from 'react';
import { Table, Tag, Input, Select, Button, DatePicker } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { SearchOutlined, ReloadOutlined, WarningOutlined, ThunderboltFilled, ExclamationCircleOutlined } from '@ant-design/icons';

// --- MOCK DATA ---
interface WarningItem {
    id: string;
    level: 'high' | 'medium' | 'low';
    device: string;
    message: string;
    location: string;
    time: string;
    status: 'new' | 'acknowledged' | 'resolved';
}

const WARNINGS: WarningItem[] = [
    { id: 'W001', level: 'high', device: 'Tủ đông A01', message: 'Nhiệt độ vượt ngưỡng (-5°C)', location: 'Khu vực 1', time: '14:20 03/01/2025', status: 'new' },
    { id: 'W002', level: 'medium', device: 'Kho lạnh B2', message: 'Mất tín hiệu kết nối', location: 'Khu vực 2', time: '14:15 03/01/2025', status: 'new' },
    { id: 'W003', level: 'low', device: 'Tủ Vắc-xin', message: 'Cửa tủ đóng chưa kín', location: 'Phòng Lab', time: '14:08 03/01/2025', status: 'acknowledged' },
    { id: 'W004', level: 'high', device: 'Tủ C03', message: 'Nhiệt độ cao bất thường', location: 'Khu vực 1', time: '13:30 03/01/2025', status: 'resolved' },
    { id: 'W005', level: 'low', device: 'Tủ đông A02', message: 'Cảnh báo nguồn điện chập chờn', location: 'Khu vực 3', time: '10:00 03/01/2025', status: 'resolved' },
    { id: 'W006', level: 'medium', device: 'Server TT', message: 'Dung lượng ổ cứng đầy 90%', location: 'Phòng Server', time: '09:15 03/01/2025', status: 'resolved' },
];

export default function WarningPage() {

    const columns: ColumnsType<WarningItem> = [
        {
            title: 'Mức độ',
            dataIndex: 'level',
            key: 'level',
            width: 120,
            render: (level) => {
                let color = 'default';
                let icon = <ExclamationCircleOutlined />;
                let text = 'Thấp';

                if (level === 'high') { color = 'error'; icon = <ThunderboltFilled />; text = 'Nghiêm trọng'; }
                if (level === 'medium') { color = 'warning'; icon = <WarningOutlined />; text = 'Cảnh báo'; }
                if (level === 'low') { color = 'blue'; text = 'Thông báo'; }

                return (
                    <Tag icon={icon} color={color} className="mr-0 font-bold border-none px-2 py-0.5 rounded-full flex w-fit items-center gap-1">
                        {text}
                    </Tag>
                );
            }
        },
        {
            title: 'Thiết bị & Vị trí',
            key: 'device',
            render: (_, record) => (
                <div>
                    <div className="font-bold text-slate-700">{record.device}</div>
                    <div className="text-xs text-slate-400">{record.location}</div>
                </div>
            )
        },
        {
            title: 'Nội dung cảnh báo',
            dataIndex: 'message',
            key: 'message',
            render: (text) => <span className="font-medium text-slate-800">{text}</span>
        },
        {
            title: 'Thời gian',
            dataIndex: 'time',
            key: 'time',
            width: 150,
            render: (text) => <span className="text-slate-500 font-mono text-xs">{text}</span>
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            width: 150,
            render: (status) => {
                let color = 'default';
                let text = 'Mới';
                if (status === 'acknowledged') { color = 'processing'; text = 'Đang xử lý'; }
                if (status === 'resolved') { color = 'success'; text = 'Đã xử lý'; }
                return <Tag color={color} className="uppercase text-[10px] font-bold">{text}</Tag>;
            }
        },
    ];

    return (
        <div className="space-y-6">
            {/* HERDER */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 m-0">Lịch sử Cảnh báo & Sự cố</h1>
                    <p className="text-slate-500 text-sm mt-1">Theo dõi và xử lý các sự cố phát sinh từ hệ thống giám sát</p>
                </div>
                <div className="flex gap-2">
                    <Button icon={<ReloadOutlined />}>Làm mới</Button>
                    <Button type="primary" danger icon={<WarningOutlined />}>Báo cáo sự cố</Button>
                </div>
            </div>

            {/* FILTER BAR */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-wrap gap-4 items-center">
                <Input prefix={<SearchOutlined className="text-gray-400" />} placeholder="Tìm kiếm cảnh báo..." className="w-64" />
                <Select defaultValue="all" className="w-40" options={[
                    { value: 'all', label: 'Tất cả mức độ' },
                    { value: 'high', label: 'Nghiêm trọng' },
                    { value: 'medium', label: 'Cảnh báo' },
                    { value: 'low', label: 'Thông báo' },
                ]} />
                <Select defaultValue="all" className="w-40" options={[
                    { value: 'all', label: 'Tất cả trạng thái' },
                    { value: 'new', label: 'Mới' },
                    { value: 'process', label: 'Đang xử lý' },
                    { value: 'done', label: 'Đã xử lý' },
                ]} />
                <DatePicker.RangePicker className="w-64" placeholder={['Từ ngày', 'Đến ngày']} />
            </div>

            {/* TABLE */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <Table
                    columns={columns}
                    dataSource={WARNINGS}
                    rowKey="id"
                    pagination={{ pageSize: 10 }}
                />
            </div>
        </div>
    );
}
