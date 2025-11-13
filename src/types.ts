// Shared type for all screens
export interface MenuItem {
  id: number;
  name: string;
  price: number;
  course: 'Starter' | 'Main' | 'Dessert';
}
