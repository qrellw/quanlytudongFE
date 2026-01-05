# Ghi chú Bàn giao Logic / API (Handoff)

Tài liệu này đánh dấu **toàn bộ** các điểm mock data và logic giả lập trong Frontend mà team Logic/Backend cần thực hiện đấu nối.

## 1. Authentication & Layout (Hệ thống chung)

### 📄 File: `src/components/layout/DashboardLayout.tsx`
*   **User Info (Dòng 157)**: Đang hardcode "Admin User".
    *   *Yêu cầu*: Lấy từ Global State / Context (sau khi login).
*   **Notification Badge (Dòng 151)**: Đang hardcode số `3`.
    *   *Yêu cầu*: Gọi API lấy số lượng thông báo chưa đọc.
*   **Logo (Dòng 69)**: Hiện đang dùng placeholder. Nếu có API Config hệ thống thì lấy URL logo từ đó.

### 📄 File: `src/components/auth/login/LoginForm.tsx` (Dự kiến)
*   **Logic Submit**:
    *   *Yêu cầu*: Thay thế `setTimeout` bằng API `POST /auth/login`.

---

## 2. Dashboard Integration (Trang Tổng quan)

### 📄 File: `src/app/dashboard/page.tsx`
*   **KPI Data (Biến `KPIS`)**: Dữ liệu hardcode.
    *   *Yêu cầu*: Gọi API Dashboard Stats để điền số liệu (Tổng thiết bị, Đang hoạt động, Cảnh báo...).
*   **Thêm thiết bị (Hàm `handleCreateDevice`)**:
    *   *Hiện tại*: Chỉ `console.log` và show message thành công giả.
    *   *Yêu cầu*: Gọi API `POST /devices` với payload từ form.

### 📄 File: `src/components/dashboard/AddDeviceModal.tsx`
*   **Options (Form Select)**:
    *   *Lưu ý*: Các options (Tủ đông, tủ mát...) đang hardcode. Nếu hệ thống cho phép admin cấu hình loại thiết bị động, cần gọi API lấy danh sách `DeviceTypes`.

### 📄 File: `src/components/dashboard/TempChart.tsx`
*   **Mock Data (Biến `data`)**: Mảng số tĩnh.
    *   *Yêu cầu*: Thay thế bằng API lấy dữ liệu nhiệt độ theo thời gian thực (hoặc lịch sử 24h).

### 📄 File: `src/components/dashboard/WarningList.tsx`
*   **Mock Data (Biến `warnings`)**:
    *   *Yêu cầu*: Gọi API lấy 5 cảnh báo mới nhất.

---

## 3. Warning Management (Quản lý Cảnh báo)

### 📄 File: `src/app/dashboard/warnings/page.tsx`
*   **Mock Data (Biến `WARNINGS`)**:
    *   *Yêu cầu*: Thay thế bằng API `GET /warnings` (có phân trang).
*   **Search & Filter Logic**:
    *   *Hiện tại*: Chỉ là UI tĩnh.
    *   *Yêu cầu*: Bắt sự kiện thay đổi Input/Select -> Gọi lại API với params filter (ví dụ: `?level=high&status=new`).

---

## 4. Inventory Management (Kho máu)

### 📄 File: `src/components/inventory/InventoryTable.tsx`
*   **Table Data (Prop `data`)**: 
    *   *Hiện tại*: Nhận từ prop (nhưng prop này đang được truyền mock từ page cha).
    *   *Yêu cầu*: Page cha (`inventory/page.tsx`) cần gọi API `GET /blood-bags` và truyền xuống.

---

## 5. Device Management (Danh sách thiết bị)

### 📄 File: `src/app/dashboard/devices/page.tsx` (Nếu đã tạo)
*   **Danh sách thiết bị**:
    *   *Yêu cầu*: Tương tự Warning Page, cần gọi API lấy danh sách thiết bị và xử lý phân trang/tìm kiếm server-side.

---

## Tóm tắt công việc ưu tiên
1.  **Auth**: Login & User Profile.
2.  **Dashboard**: KPI Stats & Chart (trông cho nguy hiểm đầu tiên).
3.  **Core Feature**: CRUD Thiết bị (Add Device) & CRUD Cảnh báo.
