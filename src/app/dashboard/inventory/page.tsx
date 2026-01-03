'use client';

import React, { useState } from 'react';
import { Button, Input, Select } from 'antd';
import { SearchOutlined, PlusCircleOutlined, DatabaseOutlined } from '@ant-design/icons';
import InventoryTable from '@/components/inventory/InventoryTable';
import CheckInModal from '@/components/inventory/CheckInModal';
import { BloodBag } from '@/types/inventory';
import dayjs from 'dayjs';

// MOCK DATA (Thay bằng API Fetch sau này)
const MOCK_INVENTORY: BloodBag[] = [
    { id: 'VN-2401-001', type: 'WHOLE_BLOOD', group: 'O+', volume: 350, entryDate: '2025-12-01', status: 'AVAILABLE', location: { freezerId: 'A01', shelfId: 1 } },
    { id: 'VN-2401-002', type: 'PLASMA', group: 'A-', volume: 250, entryDate: '2025-11-20', status: 'AVAILABLE', location: { freezerId: 'B02', shelfId: 2 } },
    { id: 'VN-2401-003', type: 'RBC', group: 'B+', volume: 350, entryDate: '2025-12-25', status: 'AVAILABLE', location: { freezerId: 'A01', shelfId: 3 } },
    { id: 'VN-2401-004', type: 'PLATELETS', group: 'AB+', volume: 150, entryDate: '2026-01-01', status: 'AVAILABLE', location: { freezerId: 'C03', shelfId: 1 } },
    { id: 'VN-2401-005', type: 'WHOLE_BLOOD', group: 'O-', volume: 450, entryDate: '2025-12-10', status: 'AVAILABLE', location: { freezerId: 'A01', shelfId: 2 } },
    // Thêm dữ liệu hết hạn để test
    { id: 'VN-2312-999', type: 'WHOLE_BLOOD', group: 'B-', volume: 250, entryDate: '2025-10-01', status: 'EXPIRED', location: { freezerId: 'A01', shelfId: 4 } },
];

export default function InventoryPage() {
    const [searchText, setSearchText] = useState('');
    const [data, setData] = useState<BloodBag[]>(MOCK_INVENTORY);
    const [isCheckInOpen, setIsCheckInOpen] = useState(false);

    // Filter Logic (Client-side)
    const filteredData = data.filter(item =>
        item.id.toLowerCase().includes(searchText.toLowerCase()) ||
        item.group.toLowerCase().includes(searchText.toLowerCase())
    );

    const handleCheckInFinish = async (values: any) => {
        // [LOGIC DATABASE]
        // Tại đây, trong thực tế sẽ gọi API:
        // await fetch('/api/inventory/check-in', { method: 'POST', body: JSON.stringify(values) });

        const newItem: BloodBag = {
            id: values.id,
            type: values.type,
            group: values.group,
            volume: values.volume,
            entryDate: dayjs().toISOString(),
            status: 'AVAILABLE',
            location: {
                freezerId: values.location.freezer,
                shelfId: values.location.shelf,
            }
        };
        setData([newItem, ...data]);
        setIsCheckInOpen(false);
    };

    return (
        <div className="flex flex-col h-full overflow-hidden">
            {/* COMPACT HEADER */}
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between mb-4 shrink-0">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                        <DatabaseOutlined className="text-xl" />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-slate-800 m-0 leading-tight">Quản lý Kho Máu</h1>
                        <p className="text-gray-400 text-xs m-0">Tổng: <b className="text-blue-600">{data.length}</b> đơn vị</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Input
                        prefix={<SearchOutlined className="text-gray-400" />}
                        placeholder="Tìm mã túi, nhóm máu..."
                        className="w-64"
                        variant="filled" // Style nhẹ nhàng hơn
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <Button
                        type="primary"
                        icon={<PlusCircleOutlined />}
                        className="bg-blue-600 shadow-md font-medium"
                        onClick={() => setIsCheckInOpen(true)}
                    >
                        Nhập kho
                    </Button>
                </div>
            </div>

            {/* TABLE CONTENT AREA (Scrollable) */}
            <div className="flex-1 overflow-hidden bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col">
                <InventoryTable data={filteredData} />
            </div>

            <CheckInModal
                open={isCheckInOpen}
                onCancel={() => setIsCheckInOpen(false)}
                onFinish={handleCheckInFinish}
            />
        </div>
    );
}
