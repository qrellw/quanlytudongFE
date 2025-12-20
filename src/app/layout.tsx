import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import AntdRegistry from '@/lib/AntdRegistry'; // <--- Import cái vừa tạo
import { ConfigProvider } from 'antd';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'IoT Dashboard',
  description: 'Quản lý tủ đông',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AntdRegistry>
          {/* ConfigProvider: Nơi chỉnh màu sắc toàn dự án */}
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: '#1677ff', // Màu xanh mặc định (Sửa thành màu khác nếu thích)
                borderRadius: 12,         // Bo góc nhẹ
              },
            }}
          >
            {children}
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}