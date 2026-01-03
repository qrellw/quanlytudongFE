'use client';

import React from 'react';
import { Table, Tag, Space, Button, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { DeleteOutlined } from '@ant-design/icons';
import { BloodBag } from '@/types/inventory';
import dayjs from 'dayjs';

interface InventoryTableProps {
    data: BloodBag[];
    loading?: boolean;
}

export default function InventoryTable({ data, loading }: InventoryTableProps) {

    // Cấu hình cột cho bảng
    const columns: ColumnsType<BloodBag> = [
        {
            title: 'Mã Barcode',
            dataIndex: 'id',
            key: 'id',
            render: (text) => <span className="font-mono font-bold text-blue-600">{text}</span>,
        },
        {
            title: 'Nhóm Máu',
            dataIndex: 'group',
            key: 'group',
            render: (group) => {
                let color = 'default';
                if (group.includes('O')) color = 'blue';
                if (group.includes('A')) color = 'green';
                if (group.includes('B')) color = 'orange';
                if (group.includes('AB')) color = 'purple';
                return <Tag color={color} className="font-bold">{group}</Tag>;
            }
        },
        {
            title: 'Loại Chế Phẩm',
            dataIndex: 'type',
            key: 'type',
            render: (type) => (
                <span className="text-xs uppercase font-semibold text-gray-500">
                    {type.replace('_', ' ')}
                </span>
            ),
        },
        {
            title: 'Dung Tích',
            dataIndex: 'volume',
            key: 'volume',
            render: (val) => <span>{val} ml</span>,
        },
        {
            title: 'Vị trí',
            key: 'location',
            render: (_, record) => (
                <span className="text-sm">
                    {record.location ? (
                        <>Tủ <b>{record.location.freezerId}</b> - Kệ {record.location.shelfId}</>
                    ) : <span className="text-gray-400 italic">Chưa xếp</span>}
                </span>
            )
        },

    ];

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <Table
                columns={columns}
                dataSource={data}
                rowKey="id"
                loading={loading}
                pagination={{ pageSize: 10, size: 'small' }} // Tăng pageSize, gọn pagination
                size="middle"
                scroll={{ y: 'calc(100vh - 280px)' }} // [QUAN TRỌNG] Scroll nội bộ
                className="custom-table"
            />
        </div>
    );
}
