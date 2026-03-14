export interface CommunityUser {
  id: number;
  username: string;
  avatar?: string;
  brands: number;
  tried: number;
  fav: number;
}

export const communityUsers: CommunityUser[] = [
  { id: 1, username: "smoke_connoisseur", brands: 42, tried: 186, fav: 35 },
  { id: 2, username: "tobacco_scholar", brands: 38, tried: 152, fav: 28 },
  { id: 3, username: "yunnan_lover", brands: 35, tried: 140, fav: 42 },
  { id: 4, username: "dragon_puff", brands: 30, tried: 128, fav: 22 },
  { id: 5, username: "golden_leaf", brands: 28, tried: 115, fav: 31 },
  { id: 6, username: "jade_smoke", brands: 25, tried: 98, fav: 18 },
  { id: 7, username: "silk_road_cigs", brands: 22, tried: 87, fav: 25 },
  { id: 8, username: "panda_smoker", brands: 20, tried: 76, fav: 15 },
  { id: 9, username: "huangshan_fan", brands: 18, tried: 65, fav: 20 },
  { id: 10, username: "nanjing_collector", brands: 15, tried: 54, fav: 12 },
  { id: 11, username: "cigar_master88", brands: 12, tried: 45, fav: 8 },
  { id: 12, username: "zhonghua_daily", brands: 10, tried: 38, fav: 16 },
];
