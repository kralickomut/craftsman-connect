export interface Craftsman {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  category: string;
  hourlyRate: number;
  distance: number;
  available: boolean;
  description: string;
  location: string;
  workRadius: number;
  profileComplete: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
}

export interface Order {
  id: string;
  craftsman: Craftsman;
  customer: { firstName: string; lastName: string; location: string };
  description: string;
  status: "pending" | "accepted" | "cancelled";
  paymentMethod: "cash";
  createdAt: string;
}
