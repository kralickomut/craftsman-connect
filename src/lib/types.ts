export interface Craftsman {
  id: string;
  name: string;
  avatar: string;
  category: string;
  rating: number;
  reviewCount: number;
  hourlyRate: number;
  distance: number;
  available: boolean;
  description: string;
  phone?: string;
  completedJobs: number;
  location: string;
  workRadius: number;
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
  customer: { name: string; phone: string };
  description: string;
  status: "pending" | "accepted" | "in_progress" | "completed" | "cancelled";
  estimatedPrice: number;
  paymentMethod: "card" | "cash";
  createdAt: string;
  rating?: number;
  review?: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
}

export interface Review {
  id: string;
  customerName: string;
  rating: number;
  text: string;
  date: string;
}
