'use client';

import React from 'react';

export default function TempChart() {
    // [LOGIC] Mock data: Nhiệt độ ổn định (ví dụ: -20 độ C) với dao động nhỏ
    // Giá trị này được scale 0-100 để vẽ. Ví dụ 50 là mốc chuẩn.
    const data = [35, 68, 42, 75, 55, 82, 48, 65, 45, 78, 52, 60];

    // Helper: Tạo đường cong Bezier mềm mại (Catmull-Rom logic simplifed or Cubic Spline)
    // Để đơn giản và đẹp, ta dùng hàm tính Control Points cơ bản
    const getPath = (points: number[], width: number, height: number) => {
        if (points.length === 0) return "";

        const maxX = points.length - 1;
        const maxY = 100; // Max value mock

        const mapXY = (val: number, idx: number) => {
            const x = (idx / maxX) * width;
            const y = height - (val / maxY) * height;
            return { x, y };
        };

        const coords = points.map(mapXY);

        // Bắt đầu path
        let d = `M ${coords[0].x},${coords[0].y}`;

        for (let i = 0; i < coords.length - 1; i++) {
            const p0 = coords[i === 0 ? 0 : i - 1];
            const p1 = coords[i];
            const p2 = coords[i + 1];
            const p3 = coords[i + 2] || p2;

            const cp1x = p1.x + (p2.x - p0.x) * 0.25; // Tăng Tension lên 0.25 cho cong mềm hơn
            const cp1y = p1.y + (p2.y - p0.y) * 0.25;
            const cp2x = p2.x - (p3.x - p1.x) * 0.25;
            const cp2y = p2.y - (p3.y - p1.y) * 0.25;

            d += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`;
        }

        return d;
    };

    const width = 300; // Tăng resolution nội bộ
    const height = 150;

    const linePath = getPath(data, width, height);
    // Area path đóng khung xuống dưới đáy
    const areaPath = `${linePath} L ${width},${height} L 0,${height} Z`;

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="font-bold text-slate-800 m-0">Biến động nhiệt độ</h3>
                    <p className="text-gray-400 text-xs m-0 mt-1">Nhiệt độ ngăn đông (Avg: -20°C)</p>
                </div>
                <select className="text-xs border-none bg-gray-50 rounded-md px-2 py-1 text-gray-500 cursor-pointer hover:bg-gray-100 outline-none">
                    <option>Hôm nay</option>
                    <option>Hôm qua</option>
                </select>
            </div>

            {/* Chart Container */}
            {/* Sử dụng min-h-0 để flex child có thể shrink trong container fixed height */}
            <div className="flex-1 w-full relative min-h-0">
                <svg
                    viewBox={`0 0 ${width} ${height}`}
                    className="w-full h-full overflow-visible"
                    preserveAspectRatio="none"
                    width="100%"
                    height="100%"
                >
                    <defs>
                        <linearGradient id="smoothGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                        </linearGradient>
                    </defs>

                    {/* Grid Lines */}
                    {[0, 25, 50, 75, 100].map(val => {
                        const y = height - (val / 100) * height;

                        return (
                            <line key={val} x1="0" y1={y} x2={width} y2={y} stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" />
                        );
                    })}

                    {/* Area Fill */}
                    <path d={areaPath} fill="url(#smoothGradient)" />

                    {/* Main Line: Smooth Curve */}
                    <path
                        d={linePath}
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />

                    {/* Removed Points for cleaner look */}
                </svg>
            </div>

            <div className="flex justify-between mt-2 text-[10px] text-gray-400">
                <span>00:00</span>
                <span>06:00</span>
                <span>12:00</span>
                <span>18:00</span>
                <span>23:59</span>
            </div>
        </div>
    );
}
