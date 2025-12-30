'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Layout, Button, Input, ConfigProvider, Badge, Avatar, Menu } from 'antd';
import {
    MenuUnfoldOutlined, MenuFoldOutlined, SearchOutlined,
    BellOutlined, UserOutlined, AppstoreOutlined,
    DatabaseOutlined, WarningOutlined
} from '@ant-design/icons';
import { usePathname, useRouter } from 'next/navigation';

const { Header, Sider, Content } = Layout;

// --- CONFIG ---
const COLORS = {
    primary: '#1890FF',
    bgContent: '#F3F4F6',  // Gray-100
    bgFrame: '#FFFFFF',    // White
};

type DashboardLayoutProps = {
    children: React.ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const [collapsed, setCollapsed] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    // Logo path
    const logoSrc = '/icon/logo.png';

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: COLORS.primary,
                    borderRadius: 8,
                    fontFamily: 'Inter, sans-serif',
                },
                components: {
                    Menu: {
                        itemBg: '#ffffff',
                        itemSelectedBg: '#e6f7ff', // Blue-50 equivalent
                        itemSelectedColor: '#1890ff',
                    },
                },
            }}
        >
            <Layout className="min-h-screen font-sans" style={{ background: COLORS.bgFrame }}>

                {/* === SIDEBAR === */}
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={collapsed}
                    width={260}
                    style={{ background: COLORS.bgFrame, borderRight: 'none' }}
                    className="sticky top-0 h-screen z-50 shadow-none border-none transition-all duration-300"
                >
                    {/* LOGO AREA */}
                    <div className={`py-6 flex items-center transition-all duration-300 ${collapsed ? 'justify-center px-2' : 'justify-start px-6'}`}>
                        <div className="relative w-[40px] h-[40px] shrink-0 overflow-hidden transition-all duration-300">
                            {/* 
                  [KHU VỰC DÀNH CHO FE DEV]
                  Nếu chưa có logo thật thì dùng tạm placeholder hoặc text
               */}
                            <Image
                                src={logoSrc}
                                alt="Logo"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>

                        {/* Tên hệ thống - Animate Opacity instead of unmount */}
                        <div className={`ml-3 overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out ${collapsed ? 'w-0 opacity-0' : 'w-[160px] opacity-100'}`}>
                            <h1 className="font-bold text-slate-800 text-sm leading-tight m-0 tracking-tight">
                                Hệ thống <br /> Quản lý tủ đông
                            </h1>
                        </div>
                    </div>

                    {/* MENU */}
                    <div className="mt-2 px-3">
                        {/* Text "Quản lý" - Animate opacity */}
                        <div className={`text-[10px] font-bold text-gray-400 px-4 mb-2 mt-2 uppercase tracking-widest overflow-hidden transition-all duration-300 ${collapsed ? 'h-0 opacity-0 mb-0' : 'h-auto opacity-100'}`}>
                            Quản lý
                        </div>

                        <Menu
                            mode="inline"
                            selectedKeys={[pathname]}
                            style={{ borderRight: 0 }}
                            items={[
                                {
                                    key: '/dashboard',
                                    icon: <AppstoreOutlined />,
                                    label: 'Tổng quan',
                                    onClick: () => router.push('/dashboard')
                                },
                                {
                                    key: '/dashboard/devices',
                                    icon: <DatabaseOutlined />,
                                    label: 'Danh sách thiết bị',
                                    onClick: () => router.push('/dashboard/devices')
                                },
                                {
                                    key: '/dashboard/warnings',
                                    icon: <WarningOutlined />,
                                    label: 'Cảnh báo & Sự cố',
                                    onClick: () => router.push('/dashboard/warnings')
                                },
                            ]}
                        />
                    </div>
                </Sider>

                {/* === RIGHT SIDE === */}
                <Layout style={{ background: COLORS.bgFrame }}>

                    {/* HEADER */}
                    <Header
                        className="px-6 h-18 flex items-center justify-between sticky top-0 z-40"
                        style={{ background: COLORS.bgFrame, borderBottom: 'none', height: '72px' }}
                    >
                        <div className="flex items-center gap-4 w-1/2">
                            <Button
                                type="text"
                                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                                onClick={() => setCollapsed(!collapsed)}
                                className="text-gray-500 hover:bg-gray-100"
                            />

                            <Input
                                prefix={<SearchOutlined className="text-gray-400" />}
                                placeholder="Tìm kiếm..."
                                className="w-64 rounded-full bg-gray-100 border-none hover:bg-gray-200 focus:bg-white focus:shadow-sm h-10 transition-all hidden md:flex"
                            />
                        </div>

                        <div className="flex items-center gap-4">
                            <Badge count={3} size="small" offset={[-2, 2]}>
                                <Button shape="circle" icon={<BellOutlined />} className="border-gray-100 text-gray-500 hover:text-blue-600 hover:border-blue-100 shadow-sm" />
                            </Badge>

                            <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 pr-3 rounded-full transition-colors">
                                <Avatar style={{ backgroundColor: '#1890FF' }} icon={<UserOutlined />} />
                                <span className="text-sm font-medium text-gray-700 hidden md:block">Admin User</span>
                            </div>
                        </div>
                    </Header>

                    {/* MAIN CONTENT WRAPPER */}
                    <Content
                        className="overflow-hidden"
                        style={{
                            margin: '0 24px 24px 0',
                            borderRadius: '20px',           // Bo góc 20px (có thể chỉnh xuống 15px)
                            background: COLORS.bgContent,
                            padding: '24px',
                            height: 'calc(100vh - 96px)', // Full height minus Header & Margin
                            overflowY: 'auto',
                            position: 'relative',
                            boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.02)'
                        }}
                    >
                        {children}
                    </Content>

                </Layout>
            </Layout>
        </ConfigProvider>
    );
}
