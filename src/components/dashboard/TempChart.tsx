'use client';

import React from 'react';

export default function TempChart() {
    // [KHU VỰC DÀNH CHO FE DEV - LOGIC]
    // Mock data, sau này sẽ thay bằng Props hoặc API fetch
    const data = [40, 60, 45, 70, 30, 55, 65, 80, 50, 40, 60, 75];

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-slate-800">Biến động nhiệt độ (24h)</h3>
                <select className="text-xs border-none bg-gray-50 rounded-md px-2 py-1 text-gray-500 cursor-pointer hover:bg-gray-100 outline-none">
                    <option>Hôm nay</option>
                    <option>Hôm qua</option>
                </select>
            </div>

            {/* Chart Area (Mock Visual) */}
            <div className="flex-1 flex items-end justify-between gap-2 px-4 pb-0 border-b border-l border-gray-50 min-h-[200px]">
                {data.map((h, i) => (
                    <div
                        key={i}
                        className="w-full bg-blue-100 hover:bg-blue-600 transition-all rounded-t-md relative group cursor-pointer"
                        style={{ height: `${h}%` }}
                    >
                        {/* Tooltip nhỏ khi hover */}
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                            {h}°C
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-between mt-2 text-[10px] text-gray-400 px-4">
                <span>00:00</span>
                <span>12:00</span>
                <span>23:59</span>
            </div>
        </div>
    );
}
