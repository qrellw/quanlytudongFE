# Handoff for Logic Developer (API Integration)

Document này liệt kê các vị trí UI đã hoàn thiện nhưng cần Logic/API tích hợp.
Frontend UI (Antigravity & User) sẽ đánh dấu các vị trí này trong code bằng comment: `[KHU VỰC DÀNH CHO BACKEND DEV]`

## 1. Authentication

### Login Form
- **File**: `src/components/auth/login/LoginForm.tsx`
- **Function**: `onFinish`
- **Logic cần làm**:
    - [ ] Thay thế đoạn Mock `setTimeout` bằng API call `/api/auth/login`.
    - [ ] Xử lý Response trả về (Lưu Token vào Cookie/LocalStorage).
    - [ ] Redirect người dùng dựa trên Role (nếu cần).

### Reset Password Focus
- **File**: `src/components/auth/resetpass/ResetPasswordForm.tsx`
- **Function**: `onFinish`
- **Logic cần làm**:
    - [ ] Lấy `token` từ URL (Search Params).
    - [ ] Gọi API `/api/auth/reset-password` với body là `{ token, newPassword }`.
    - [ ] Xử lý thông báo lỗi từ server (Token hết hạn, sai token...).

## 2. Dashboard (Upcoming)
*(Đang refactor, sẽ update sau khi tách component)*
- **KPI Cards**: Cần API lấy số liệu realtime.
- **Chart**: Cần API lấy dữ liệu nhiệt độ theo giờ.
- **Warning List**: Cần WebSocket hoặc API polling để nhận cảnh báo mới nhất.
