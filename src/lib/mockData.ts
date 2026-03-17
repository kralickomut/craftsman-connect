import { Craftsman, Category, Order } from "./types";

export const categories: Category[] = [
  { id: "1", name: "Instalatér", icon: "🔧", count: 48 },
  { id: "2", name: "Elektrikář", icon: "⚡", count: 35 },
  { id: "3", name: "Malíř", icon: "🎨", count: 29 },
  { id: "4", name: "Truhlář", icon: "🪚", count: 22 },
  { id: "5", name: "Zámečník", icon: "🔑", count: 18 },
  { id: "6", name: "Podlahář", icon: "🏠", count: 15 },
  { id: "7", name: "Klempíř", icon: "🛠️", count: 12 },
  { id: "8", name: "Zedník", icon: "🧱", count: 20 },
];

export const craftsmen: Craftsman[] = [
  {
    id: "1", firstName: "Jan", lastName: "Novák", email: "jan.novak@email.cz",
    category: "Instalatér", hourlyRate: 450, distance: 3.2,
    available: true, description: "Zkušený instalatér s 15 lety praxe. Specializuji se na opravy vodovodů, topení a kanalizací.",
    location: "Praha 4", workRadius: 25, profileComplete: true,
  },
  {
    id: "2", firstName: "Petr", lastName: "Svoboda", email: "petr.svoboda@email.cz",
    category: "Elektrikář", hourlyRate: 550, distance: 5.1,
    available: true, description: "Certifikovaný elektrikář. Provádím kompletní elektroinstalace, opravy a revize.",
    location: "Praha 6", workRadius: 30, profileComplete: true,
  },
  {
    id: "3", firstName: "Karel", lastName: "Dvořák", email: "karel.dvorak@email.cz",
    category: "Malíř", hourlyRate: 380, distance: 1.8,
    available: false, description: "Profesionální malíř pokojů. Kvalitní materiály, čistá práce.",
    location: "Praha 2", workRadius: 15, profileComplete: true,
  },
  {
    id: "4", firstName: "Martin", lastName: "Černý", email: "martin.cerny@email.cz",
    category: "Truhlář", hourlyRate: 500, distance: 8.4,
    available: true, description: "Zakázková výroba nábytku, opravy dveří a oken.",
    location: "Praha 10", workRadius: 20, profileComplete: true,
  },
  {
    id: "5", firstName: "Tomáš", lastName: "Procházka", email: "tomas.prochazka@email.cz",
    category: "Instalatér", hourlyRate: 420, distance: 4.7,
    available: true, description: "Spolehlivý instalatér pro bytové i komerční prostory.",
    location: "Praha 5", workRadius: 20, profileComplete: true,
  },
  {
    id: "6", firstName: "David", lastName: "Kučera", email: "david.kucera@email.cz",
    category: "Zámečník", hourlyRate: 600, distance: 2.3,
    available: true, description: "Nouzové otevírání dveří, výměna zámků, bezpečnostní systémy.",
    location: "Praha 1", workRadius: 35, profileComplete: true,
  },
];

export const mockOrders: Order[] = [
  {
    id: "ORD-001", craftsman: craftsmen[0],
    customer: { firstName: "Marie", lastName: "Kovářová", location: "Praha 3" },
    description: "Kapající kohoutek v kuchyni, potřeba výměny těsnění.",
    status: "pending", paymentMethod: "cash",
    createdAt: "2024-01-20T10:30:00",
  },
  {
    id: "ORD-002", craftsman: craftsmen[0],
    customer: { firstName: "Jiří", lastName: "Horák", location: "Praha 8" },
    description: "Instalace nového bojleru v koupelně, starý je porouchaný.",
    status: "pending", paymentMethod: "cash",
    createdAt: "2024-01-21T14:00:00",
  },
  {
    id: "ORD-003", craftsman: craftsmen[1],
    customer: { firstName: "Eva", lastName: "Stehlíková", location: "Praha 6" },
    description: "Nefunkční zásuvka v obývacím pokoji, jiskří při zapojení.",
    status: "pending", paymentMethod: "cash",
    createdAt: "2024-01-22T09:15:00",
  },
];
