'use client';

import React from 'react';
import { FireFilled, RightOutlined } from '@ant-design/icons';
import { Tag } from 'antd';

export default function WarningList() {
    // [KHU VỰC DÀNH CHO FE DEV - LOGIC]
    const warnings = [
        { name: 'Tủ đông A01 (-5°C)', time: 'Vừa xong', loc: 'Khu vực 1', level: 'high' },
        { name: 'Kho lạnh B2 (Mất tín hiệu)', time: '5 phút trước', loc: 'Khu vực 2', level: 'medium' },
        { name: 'Tủ Vắc-xin (Cửa hở)', time: '12 phút trước', loc: 'Phòng Lab', level: 'low' },
        { name: 'Tủ C03 (Nhiệt độ cao)', time: '1 giờ trước', loc: 'Khu vực 1', level: 'high' },
    ];

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                    <FireFilled className="text-red-500" /> Cảnh báo
                </h3>
                <Tag color="red" className="mr-0 rounded-full px-2 border-none bg-red-50 text-red-600 font-bold">{warnings.length}</Tag>
            </div>

            <div className="flex flex-col gap-3 overflow-y-auto flex-1 pr-1 custom-scrollbar">
                {warnings.map((item, i) => (
                    <div key={i} className="group flex items-center gap-3 p-3 rounded-xl bg-red-50/30 border border-red-50 hover:border-red-200 hover:bg-red-50 transition-all cursor-pointer">
                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shrink-0"></div>
                        <div className="flex-1">
                            <h4 className="text-sm font-bold text-gray-800 group-hover:text-red-700 transition-colors">{item.name}</h4>
                            <p className="text-[11px] text-gray-500 flex justify-between mt-1">
                                <span>{item.time}</span>
                                <span>• {item.loc}</span>
                            </p>
                        </div>
                        <RightOutlined className="text-xs text-gray-300 group-hover:text-red-400" />
                    </div>
                ))}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-50 text-center">
                <button className="text-xs font-semibold text-blue-600 hover:underline">Xem tất cả lịch sử</button>
            </div>
        </div>
    );
}
