# Hướng Dẫn Dành Cho "Dev Logic" (Backend/Functionality Integration)

Chào mừng người anh em thiện lành đến với dự án! 👋

Nếu bạn đang đọc file này, bạn đóng vai trò là **"Dev Logic"**.
Để bạn dễ hình dung, hãy tưởng tượng chúng ta đang chế tạo một chiếc xe hơi 🚗:
*   **Dev UI/UX (Người tạo ra file này):** Đã làm xong vỏ xe, sơn đẹp lung linh, ghế ngồi êm ái, vô lăng cầm sướng tay. Nhưng... xe chưa chạy được. 🛑
*   **Dev Logic (Bạn):** Nhiệm vụ của bạn là **lắp động cơ, đổ xăng và đấu nối dây điện** để xe chạy được, còi bấm kêu, đèn bật sáng.

---

## Sự Khác Biệt Với "Handoff" (Bàn giao thiết kế)
Có thể bạn thắc mắc file này khác gì Handoff. 
*   **Handoff** (từ Designer -> Dev UI): Chỉ ra nút này màu gì, cách lề bao nhiêu pixel. -> *Dev UI (Tui) đã làm xong rồi.*
*   **Training này** (từ Dev UI -> Dev Logic): Chỉ ra components này cần dữ liệu gì, sự kiện bấm nút xử lý ở đâu. -> *Đây là việc của bạn.*

---

## 3 Nhiệm Vụ Cốt Lõi Của Bạn

### 1. "Thổi hồn" vào dữ liệu (Data Wiring)
Hiện tại, các thông số trên giao diện đều là **Dữ liệu giả (Mock Data/Hardcode)** để lên mẫu.
Bạn cần thay thế chúng bằng dữ liệu thật từ Server/API.

**Ví dụ thực tế:**
Trong file `src/components/dashboard/KPICard.tsx`, tui đang code cứng:
```tsx
// Code hiện tại (Tĩnh)
const KPIS = [
   { title: 'TỔNG THIẾT BỊ', val: 64, ... } 
];
```

**Việc bạn cần làm:**
1. Viết Hook (ví dụ `useKPI()`) để gọi API lấy số liệu thật.
2. Truyền số liệu thật đó vào component `KPICard`.
```tsx
// Code bạn sẽ sửa (Động)
const { data, isLoading } = useKPI(); // Hook bạn viết
// ...
<KPICard val={data.totalDevices} ... />
```

### 2. Xử lý tương tác (Event Handling)
Tui đã vẽ các nút bấm (Button), nhưng bấm vào... chưa có gì xảy ra cả (hoặc chỉ `console.log` cho vui).
Bạn cần gán hành động thực tế cho nó.

**Ví dụ:** Nút "Thêm thiết bị" ở `src/app/dashboard/page.tsx`.
*   **Tui làm:** Đã tạo sẵn component `AddDeviceModal` và gắn sự kiện mở Modal rồi.
*   **Bạn làm:** Vào file `dashboard/page.tsx`, tìm hàm `handleCreateDevice`. Hiện tại nó chỉ in ra console. Bạn cần gọi API POST dữ liệu từ `values` lên Server để lưu lại.

### 3. Quản lý trạng thái (State Management)
Bạn cần xử lý các trường hợp người dùng gặp phải mà tui chưa vẽ hết hoặc chỉ vẽ tĩnh:
*   **Loading:** Khi mạng lag, dữ liệu chưa về -> Bạn cần hiện vòng quay loading (Spin) thay vì để bảng trống trơn.
*   **Error:** Khi server lỗi -> Bạn phải bắt lỗi (try/catch) và hiện thông báo đỏ (Notification).
*   **Empty:** Khi không tìm thấy kết quả tìm kiếm -> Hiện thông báo "Không có dữ liệu".

---

## Quy Ước Code Chung (Dành cho Logic Dev)

1.  **Không sửa CSS/Layout nếu không cần thiết:** Tui đã căn chỉnh pixel-perfect rồi. Nếu bạn cần ẩn hiện component, hãy dùng biến điều kiện (Conditional Rendering) chứ đừng xóa class CSS.
    *   *Sai:* Xóa class `hidden`.
    *   *Đúng:* `{isVisible && <Component />}`
2.  **Đặt Logic ở đâu?**
    *   Nên tách logic gọi API ra các **Custom Hooks** trong thư mục `src/hooks`.
    *   Ví dụ: `useInventory.ts`, `useWarnings.ts`. Đừng viết tất cả `fetch()` nhồi nhét trong file giao diện.

---

Chúc bạn code vui vẻ, không bug! 🚀
*Ký tên: Người làm UI có tâm.*
