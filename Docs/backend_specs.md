# Backend Interface & Data Specifications

Tài liệu này định nghĩa chi tiết các Props, Interface và kiểu dữ liệu mà Back-end cần cung cấp cho Front-end.

---

## 1. Authentication (Xác thực)

### A. Đăng nhập (`LoginForm.tsx`)
*   **Vị trí**: `src/components/auth/login/LoginForm.tsx`
*   **API Yêu cầu**: `POST /api/auth/login`
*   **Payload (Input)**:
    ```typescript
    {
      username: string; // "admin"
      password: string; // "123456"
      remember?: boolean;
    }
    ```
*   **Response (Output)**:
    ```typescript
    {
       token: string; // JWT Token
       user: {
          id: string;
          role: 'admin' | 'staff' | 'supervisor';
          name: string;
       }
    }
    ```

---

## 2. Dashboard - Tổng quan

### A. KPI Cards (`KPICard.tsx`)
*   **Kiểu dữ liệu (Props)**:
    ```typescript
    export type KPIItem = {
        title: string;   // "Tủ hoạt động"
        val: number;     // 12
        unit: string;    // "thiết bị"
        color: string;   // "text-blue-500"
        bg: string;      // "bg-blue-50"
    };
    ```

### B. Biểu đồ Nhiệt độ (`TempChart.tsx`)
*   **Data Structure**:
    ```typescript
    type TempDataPoint = number; // Giá trị nhiệt độ, ví dụ: [20, 21, 20.5, ...]
    // Hoặc đơn giản là mảng number[] cho 24h qua
    ```

---

## 3. Inventory - Quản lý Kho Máu (NEW UPDATE)

Để giải quyết bài toán: **"Tìm nhóm O -> Hiển thị các tủ có chứa nhóm O"**, Backend cần cung cấp dữ liệu dạng **Tổng hợp (Aggregation)** theo từng Tủ (Freezer), thay vì trả về từng ô (Slot).

### A. Danh sách Túi Máu (List View)
*   **API**: `GET /api/inventory/items`
*   **Model**:
    ```typescript
    interface BloodBag {
       id: string; // Barcode "VN-123"
       type: 'WHOLE' | 'PLASMA' | 'RBC';
       group: 'O' | 'A' | 'B' | 'AB';
       rh: '+' | '-'; // Rhesus
       volume: number;
       location: {
           freezerId: string; // "A01"
           shelfId: number;   // 1
           // Không bắt buộc row/col nếu chưa cần chính xác
       }
    }
    ```

### B. Thống kê theo Tủ (Freezer Overview View)
Đây là API quan trọng để vẽ giao diện "Tìm tủ theo nhóm máu".
*   **API**: `GET /api/inventory/freezer-summary`
*   **Model (FreezerSummary)**:
    ```typescript
    interface FreezerSummary {
       id: string;          // "A01"
       name: string;        // "Tủ đông A01"
       totalBags: number;   // 150
       capacity: number;    // 300 (Sức chứa tối đa)
       temperature: number; // -18 (Nhiệt độ hiện tại)
       status: 'NORMAL' | 'WARNING' | 'ERROR';
       
       // Thống kê số lượng theo nhóm máu
       inventoryBreakdown: {
          'O': number;  // 50
          'A': number;  // 30
          'B': number;  // 20
          'AB': number; // 10
       };
       
       // Thống kê theo loại chế phẩm (Optional)
       typeBreakdown: {
          'WHOLE': number;
          'PLASMA': number;
       }
    }
    ```
*   **Logic Frontend**:
    *   Khi user chọn lọc "Nhóm O": Frontend sẽ duyệt qua mảng `FreezerSummary`.
    *   Hiển thị các Tủ có `inventoryBreakdown['O'] > 0`.
    *   Sắp xếp ưu tiên tủ có số lượng nhiều nhất lên đầu.

---

## 4. Quản lý Thiết bị (Devices)
*   **Interface**: `Device` (Như đã định nghĩa trong `types/devices.ts` hoặc `DeviceCard.tsx`).
