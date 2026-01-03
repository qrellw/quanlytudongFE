import DashboardLayout from '@/components/layout/DashboardLayout';
import type { Metadata } from 'next';
export const metadata: Metadata = {
    title: 'Hệ thống quản lý Tủ đông',
    description: 'Dashboard giám sát và điều khiển',
};

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <DashboardLayout>
            {children}
        </DashboardLayout>
    );
}
