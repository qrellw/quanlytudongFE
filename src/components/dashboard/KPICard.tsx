'use client';

import React from 'react';

export type KPIItem = {
    title: string;
    val: number;
    unit: string;
    icon: React.ReactNode;
    color: string;
    bg: string;
};

type KPICardProps = {
    data: KPIItem;
};

export default function KPICard({ data }: KPICardProps) {
    return (
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer h-full">
            <div>
                <p className="text-gray-400 text-[11px] font-bold uppercase tracking-wider mb-1">{data.title}</p>
                <h3 className="text-3xl font-black text-slate-800 tracking-tight">
                    {data.val} <span className="text-sm font-normal text-gray-400 ml-1">{data.unit}</span>
                </h3>
            </div>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${data.bg} ${data.color}`}>
                {data.icon}
            </div>
        </div>
    );
}
