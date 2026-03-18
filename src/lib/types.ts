export interface Craftsman {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  category: string;
  hourlyRate: number;
  distance: number;     // REMOVE IN REAL APP, this needs to be auto calculated
  description: string;
  location: string;
  workRadius: number;
  profileComplete: boolean;
}

// export interface Customer {
//   id: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   passHash: string;
//   location: string;
// }

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;      // REMOVE IN REAL APP, this needs to be auto calculated
  description: string;
}

export interface Order {
  id: string;
  craftsman: Craftsman;
  customer: { firstName: string; lastName: string; location: string };
  description: string;
  status: "pending" | "accepted" | "ongoing" | "completed";
  paymentMethod: "cash";
  createdAt: string;
}
