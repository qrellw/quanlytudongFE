// Định nghĩa các loại chế phẩm máu
export type BloodProductType = 'WHOLE_BLOOD' | 'PLASMA' | 'RBC' | 'PLATELETS';
export type BloodGroup = 'A' | 'B' | 'AB' | 'O';
export type RhFactor = '+' | '-';

// Trạng thái của túi máu
export type BagStatus = 'AVAILABLE' | 'RESERVED' | 'EXPIRED' | 'used';

// Interface Túi Máu (Chi tiết từng túi)
// Dùng cho màn hình "Danh sách túi máu"
export interface BloodBag {
    id: string;              // Barcode "VN-123"
    type: BloodProductType;  // Loại chế phẩm
    group: string;           // "O+", "A-", ... (Kết hợp group + rh)
    volume: number;          // 350ml
    entryDate: string;       // ISO Date
    status: BagStatus;
    location: {
        freezerId: string;     // "A01"
        shelfId: number;       // 1
    };
}

// Interface Tủ Đông Tổng Quan (MỚI)
// Dùng cho màn hình "Tìm tủ theo nhóm máu"
export interface FreezerSummary {
    id: string;              // "A01"
    name: string;            // "Tủ đông Kho Huyết học"

    // Trạng thái tủ
    temperature: number;     // -18
    status: 'NORMAL' | 'WARNING' | 'ERROR';

    // Thống kê sức chứa
    capacity: number;        // 300
    totalBags: number;       // 150

    // Quan trọng: Thống kê số lượng theo nhóm máu
    // Ví dụ: { "O": 50, "A": 30 }
    inventoryBreakdown: {
        'O': number;
        'A': number;
        'B': number;
        'AB': number;
    };
}
