'use client';

import React from 'react';
import { Card, Tag, Button } from 'antd';
import { PoweroffOutlined, SettingOutlined, WarningOutlined, ThunderboltFilled } from '@ant-design/icons';

// Định nghĩa Type để export cho page dùng
export interface Device {
    id: string;
    name: string;
    model: string;
    temp: number;
    status: 'running' | 'warning' | 'error' | 'offline';
    location: string;
    lastUpdate: string;
}

export default function DeviceCard({ data }: { data: Device }) {

    // Helper chọn màu dựa trên trạng thái
    const getStatusInfo = (status: Device['status']) => {
        switch (status) {
            case 'running': return { color: 'success', text: 'Đang hoạt động', bg: 'bg-green-50', border: 'border-green-100', iconColor: 'text-green-500' };
            case 'warning': return { color: 'warning', text: 'Cảnh báo', bg: 'bg-orange-50', border: 'border-orange-100', iconColor: 'text-orange-500' };
            case 'error': return { color: 'error', text: 'Đang lỗi', bg: 'bg-red-50', border: 'border-red-100', iconColor: 'text-red-500' };
            case 'offline': return { color: 'default', text: 'Mất kết nối', bg: 'bg-gray-50', border: 'border-gray-200', iconColor: 'text-gray-400' };
            default: return { color: 'default', text: 'Unknown', bg: 'bg-white', border: 'border-gray-100', iconColor: 'text-gray-400' };
        }
    };

    const info = getStatusInfo(data.status);

    return (
        <Card
            hoverable
            className={`rounded-2xl border ${info.border} overflow-hidden font-sans transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}
            styles={{ body: { padding: 0 } }}
        >
            {/* HEADER CARD */}
            <div className={`px-5 py-4 flex justify-between items-start ${info.bg} border-b ${info.border}`}>
                <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm ${info.iconColor}`}>
                        {data.status === 'offline' ? <PoweroffOutlined /> : <ThunderboltFilled />}
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-800 text-base m-0 leading-tight">{data.name}</h3>
                        <span className="text-xs text-slate-500">{data.model}</span>
                    </div>
                </div>
                {/* Status Badge */}
                <Tag color={info.color} className="m-0 rounded-full font-semibold border-none px-2 py-0.5">
                    {info.text}
                </Tag>
            </div>

            {/* BODY CONTENT */}
            <div className="p-5 flex flex-col gap-4 bg-white">
                {/* Nhiệt độ nổi bật */}
                <div className="flex justify-between items-end">
                    <div>
                        <div className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Nhiệt độ hiện tại</div>
                        <div className={`text-4xl font-bold tracking-tight ${data.temp > -10 ? 'text-red-500' : 'text-slate-700'}`}>
                            {data.temp}°C
                        </div>
                    </div>

                    <div className="text-right">
                        <div className="text-xs text-gray-400 mb-1">Vị trí</div>
                        <div className="text-sm font-medium text-slate-700 bg-gray-100 px-2 py-1 rounded-md inline-block">
                            {data.location}
                        </div>
                    </div>
                </div>

                {/* Thông tin phụ */}
                <div className="pt-4 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                        <WarningOutlined /> Cập nhật: {data.lastUpdate}
                    </span>
                    <Button type="text" size="small" icon={<SettingOutlined />} className="text-gray-400 hover:text-blue-600">
                        Cấu hình
                    </Button>
                </div>
            </div>
        </Card>
    );
}
