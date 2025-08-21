
import type { Realm, Technique, PlayerState, Monster } from './types';

export const REALMS: Realm[] = [
  { name: 'Phàm Nhân', tuViRequired: 100, strengthBonus: 5 },
  { name: 'Luyện Khí Kỳ', tuViRequired: 500, strengthBonus: 10 },
  { name: 'Trúc Cơ Kỳ', tuViRequired: 2500, strengthBonus: 25 },
  { name: 'Kim Đan Kỳ', tuViRequired: 10000, strengthBonus: 100 },
  { name: 'Nguyên Anh Kỳ', tuViRequired: 50000, strengthBonus: 500 },
  { name: 'Hoá Thần Kỳ', tuViRequired: 250000, strengthBonus: 2000 },
  { name: 'Luyện Hư Kỳ', tuViRequired: 1000000, strengthBonus: 8000 },
  { name: 'Đại Thừa Kỳ', tuViRequired: 5000000, strengthBonus: 25000 },
  { name: 'Độ Kiếp Kỳ', tuViRequired: Infinity, strengthBonus: 100000 },
];

export const TECHNIQUES: Technique[] = [
    { id: 1, name: 'Tạp Dị Công Pháp', description: 'Công pháp cơ bản nhất, hiệu quả thấp.', tuViPerClick: 1, cost: 0 },
    { id: 2, name: 'Huyền Nguyên Công', description: 'Công pháp nhập môn của các tông phái nhỏ.', tuViPerClick: 5, cost: 200 },
    { id: 3, name: 'Thái Ất Quyết', description: 'Công pháp phổ biến, giúp tu luyện nhanh hơn.', tuViPerClick: 25, cost: 1500 },
    { id: 4, name: 'Vạn Cổ Trường Xuân Công', description: 'Công pháp thượng thừa, tu vi tăng tiến vượt bậc.', tuViPerClick: 100, cost: 10000 },
    { id: 5, name: 'Thôn Thiên Ma Công', description: 'Ma công bá đạo, hấp thu linh khí cực nhanh nhưng ẩn chứa nguy hiểm.', tuViPerClick: 500, cost: 80000 },
];

export const MONSTERS: Monster[] = [
    { name: 'Dã Lang', strength: 8, tuViReward: 10, linhThachReward: 5 },
    { name: 'Hắc Hùng', strength: 20, tuViReward: 30, linhThachReward: 15 },
    { name: 'Nhị Đầu Xà', strength: 80, tuViReward: 100, linhThachReward: 50 },
    { name: 'Kim Mao Sư Vương', strength: 400, tuViReward: 500, linhThachReward: 250 },
    { name: 'Thái Cổ Giao Long', strength: 1800, tuViReward: 2500, linhThachReward: 1000 },
    { name: 'Thượng Cổ Ma Viên', strength: 7500, tuViReward: 10000, linhThachReward: 5000},
];

export const INITIAL_PLAYER_STATE: PlayerState = {
  name: 'Đạo Hữu',
  realmIndex: 0,
  tuVi: 0,
  linhThach: 10,
  techniqueId: 1,
  strength: 5,
};
