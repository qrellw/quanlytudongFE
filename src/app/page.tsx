import { Button, DatePicker, Space, Card } from 'antd';

export default function Home() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Card title="Test Ant Design" style={{ width: 300 }}>
        <Space orientation="vertical" style={{ width: '100%' }}>
          <p>Dự án đã sẵn sàng!</p>
          
          <DatePicker style={{ width: '100%' }} />
          
          <Button type="primary" block>
            Bấm thử đi
          </Button>
          
          <Button danger block>
            Nút cảnh báo
          </Button>
        </Space>
      </Card>
    </div>
  );
}