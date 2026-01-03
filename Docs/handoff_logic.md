# Ghi chú Bàn giao Logic / API (Handoff)

Tài liệu này chỉ dẫn chính xác vị trí trong code Frontend mà team Logic/Backend cần can thiệp.

## 1. Authentication (Xác thực)

### 📄 File: `src/components/auth/login/LoginForm.tsx`
*   **Dòng 30-53**: `[KHU VỰC DÀNH CHO BACKEND DEV]`
    *   **Logic cần thay thế**:
        1. Xóa đoạn `setTimeout` mock login.
        2. Gọi API `POST /api/auth/login` với `values.username` và `values.password`.
        3. Lưu `token` vào `localStorage` hoặc `Cookie`.
        4. Kiểm tra `role` để điều hướng user.

### 📄 File: `src/components/auth/resetpass/ResetPasswordForm.tsx`
*   **Dòng 20-30**: `[KHU VỰC DÀNH CHO BACKEND DEV]`
    *   **Logic cần thêm**:
        1. Lấy `token` từ URL (Query Param `?token=...`).
        2. Gọi API `POST /api/auth/reset-password`.

---

## 2. Dashboard Integration

### 📄 File: `src/components/dashboard/TempChart.tsx`
*   **Dòng 6-8**: Mock Data `const data = [...]`.
    *   **Yêu cầu**: Chuyển thành Async Component hoặc gọi API Fetch dữ liệu nhiệt độ realtime.

### 📄 File: `src/components/dashboard/WarningList.tsx`
*   **Dòng 8-14**: Mock Data `const warnings = [...]`.
    *   **Yêu cầu**: Kết nối với Socket hoặc API Poll để lấy cảnh báo mới nhất.

---

## 3. Device Management

### 📄 File: `src/app/dashboard/devices/page.tsx`
*   **Dòng 9-18**: `const DEVICES_MOCK = [...]`.
    *   **Yêu cầu**:
        1. Thay thế `DEVICES_MOCK` bằng `useSWR` hoặc `React Query` để fetch list thiết bị.
        2. Xử lý Search/Filter trên Server-side thay vì Client-side filtering ở dòng 25 (nếu dữ liệu quá lớn).

### 📄 File: `src/components/dashboard/DeviceCard.tsx`
*   File này là **Pure Component (UI only)**.
*   Nó nhận Prop `data: Device` (Xem định nghĩa trong `backend_specs.md`).
*   Logic Developer **KHÔNG** cần sửa file này, chỉ cần truyền đúng cục data vào.

---

## 4. Tài liệu Tham chiếu
*   Xem chi tiết cấu trúc dữ liệu tại: `backend_specs.md`
