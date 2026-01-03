'use client';

import React, { useState } from 'react';
import { Button, Input, Select, Empty } from 'antd';
import { PlusOutlined, FilterOutlined } from '@ant-design/icons';
import DeviceCard, { Device } from '../../../components/dashboard/DeviceCard';

// 1. DATA MOCK (Giả lập dữ liệu từ Backend)
const DEVICES_MOCK: Device[] = [
    { id: '1', name: 'Tủ đông A01', model: 'Sanaky VH-250', temp: -18, status: 'running', location: 'Kho lạnh 1', lastUpdate: '1 phút trước' },
    { id: '2', name: 'Tủ Vắc-xin B2', model: 'Panasonic MED', temp: -5, status: 'error', location: 'Phòng Lab', lastUpdate: 'Vừa xong' },
    { id: '3', name: 'Tủ trữ máu O', model: 'Toshiba Inverter', temp: -20, status: 'running', location: 'Kho Huyết học', lastUpdate: '5 phút trước' },
    { id: '4', name: 'Tủ Sinh phẩm C1', model: 'LG Smart Freeze', temp: -15, status: 'warning', location: 'Kho lạnh 2', lastUpdate: '10 phút trước' },
    { id: '5', name: 'Tủ đông A02 (Dự phòng)', model: 'Sanaky VH-250', temp: 0, status: 'offline', location: 'Kho lạnh 1', lastUpdate: '2 ngày trước' },
    { id: '6', name: 'Tủ Âm sâu (-80)', model: 'Thermo Fisher', temp: -81, status: 'running', location: 'Phòng Lab VIP', lastUpdate: '1 phút trước' },
    { id: '7', name: 'Tủ mẫu xét nghiệm', model: 'Funiki HPC', temp: -12, status: 'warning', location: 'Tầng 2', lastUpdate: '30 phút trước' },
    { id: '8', name: 'Tủ cách ly', model: 'Alaska', temp: -18, status: 'running', location: 'Khu cách ly', lastUpdate: '1 giờ trước' },
];

export default function DevicesPage() {
    const [filterStatus, setFilterStatus] = useState<string>('all');
    const [searchText, setSearchText] = useState('');

    // Logic lọc dữ liệu (Client-side filtering)
    const filteredData = DEVICES_MOCK.filter(item => {
        const matchStatus = filterStatus === 'all' || item.status === filterStatus;
        const matchText = item.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.location.toLowerCase().includes(searchText.toLowerCase());
        return matchStatus && matchText;
    });

    return (
        <div className="flex flex-col gap-6 h-full">

            {/* PAGE HEADER & FILTERS */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-5 rounded-2xl shadow-sm border border-gray-100 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 m-0 tracking-tight">Danh sách thiết bị</h1>
                    <p className="text-gray-500 text-sm mt-1">Quản lý {DEVICES_MOCK.length} tủ đông và thiết bị IoT</p>
                </div>

                <div className="flex flex-wrap gap-3 w-full md:w-auto">
                    <Input
                        placeholder="Tìm theo tên, vị trí..."
                        prefix={<FilterOutlined className="text-gray-400" />}
                        className="w-full md:w-64 rounded-xl bg-gray-50 border-none hover:bg-gray-100"
                        onChange={(e) => setSearchText(e.target.value)}
                    />

                    <Select
                        defaultValue="all"
                        className="w-full md:w-40"
                        onChange={(val) => setFilterStatus(val)}
                        options={[
                            { value: 'all', label: 'Tất cả trạng thái' },
                            { value: 'running', label: '🟢 Đang chạy' },
                            { value: 'warning', label: '🟠 Cảnh báo' },
                            { value: 'error', label: '🔴 Đang lỗi' },
                            { value: 'offline', label: '⚫ Mất kết nối' },
                        ]}
                    />

                    <Button type="primary" icon={<PlusOutlined />} className="bg-blue-600 rounded-xl shadow-md border-none h-10 px-5">
                        Thêm thiết bị
                    </Button>
                </div>
            </div>

            {/* LIST AREA (GRID LOOP) */}
            {filteredData.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-10">
                    {/* 
                  VÒNG LẶP (MAP) 
                  Đây là nơi "nhân bản" component DeviceCard
               */}
                    {filteredData.map((device) => (
                        <DeviceCard key={device.id} data={device} />
                    ))}
                </div>
            ) : (
                // Empty State
                <div className="flex-1 flex flex-col items-center justify-center bg-white rounded-2xl border border-dashed border-gray-300 min-h-[400px]">
                    <Empty description="Không tìm thấy thiết bị nào" />
                </div>
            )}
        </div>
    );
}
