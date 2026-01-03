'use client';

import React from 'react';
import { Button } from 'antd';
import { DropboxOutlined, CheckCircleOutlined, WarningOutlined, ThunderboltFilled, DatabaseOutlined, MedicineBoxOutlined } from '@ant-design/icons';
import KPICard, { KPIItem } from '@/components/dashboard/KPICard';
import TempChart from '@/components/dashboard/TempChart';
import WarningList from '@/components/dashboard/WarningList';
import { BloodBagIcon } from '@/components/icons/BloodBagIcon';

// --- DATA MOCK ---
const KPIS: KPIItem[] = [
   { title: 'TỔNG THIẾT BỊ', val: 64, unit: 'máy', icon: <DatabaseOutlined />, color: 'text-blue-600', bg: 'bg-blue-50' },
   { title: 'ĐANG HOẠT ĐỘNG', val: 60, unit: 'máy', icon: <CheckCircleOutlined />, color: 'text-green-600', bg: 'bg-green-50' },
   { title: 'CẢNH BÁO LỖI', val: 4, unit: 'vụ', icon: <WarningOutlined />, color: 'text-red-600', bg: 'bg-red-50' },
   { title: 'SỐ TÚI MÁU', val: 1240, unit: 'túi', icon: <BloodBagIcon style={{ fontSize: '24px' }} />, color: 'text-cyan-600', bg: 'bg-cyan-50' },
];

export default function DashboardPage() {
   return (
      <div className="flex flex-col gap-6">

         {/* 1. Page Header */}
         <div className="flex justify-between items-end">
            <div>
               <h1 className="text-2xl font-bold text-slate-800 m-0 tracking-tight">Tổng quan hệ thống</h1>
               <p className="text-gray-500 text-sm mt-1">Cập nhật lần cuối: Vừa xong</p>
            </div>
            <Button type="primary" size="large" icon={<DropboxOutlined />} className="bg-blue-600 shadow-md shadow-blue-200 h-10 px-6 rounded-lg border-none hover:shadow-lg transition-all">
               Thêm thiết bị
            </Button>
         </div>

         {/* 2. KPI Section */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {KPIS.map((kpi, idx) => (
               <div key={idx} className="h-full">
                  <KPICard data={kpi} />
               </div>
            ))}
         </div>

         {/* 3. Main Content Grid */}
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Chart */}
            <div className="lg:col-span-2 h-[400px]">
               <TempChart />
            </div>

            {/* Right: Warnings */}
            <div className="h-[400px]">
               <WarningList />
            </div>
         </div>
      </div>
   );
}