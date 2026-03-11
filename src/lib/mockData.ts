import { Craftsman, Category, Order, Review, ChatMessage } from "./types";

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
    id: "1", name: "Jan Novák", avatar: "", category: "Instalatér",
    rating: 4.8, reviewCount: 124, hourlyRate: 450, distance: 3.2,
    available: true, description: "Zkušený instalatér s 15 lety praxe. Specializuji se na opravy vodovodů, topení a kanalizací.",
    phone: "+420 777 123 456", completedJobs: 312, location: "Praha 4", workRadius: 25, premium: true,
  },
  {
    id: "2", name: "Petr Svoboda", avatar: "", category: "Elektrikář",
    rating: 4.9, reviewCount: 89, hourlyRate: 550, distance: 5.1,
    available: true, description: "Certifikovaný elektrikář. Provádím kompletní elektroinstalace, opravy a revize.",
    phone: "+420 608 234 567", completedJobs: 198, location: "Praha 6", workRadius: 30,
  },
  {
    id: "3", name: "Karel Dvořák", avatar: "", category: "Malíř",
    rating: 4.6, reviewCount: 67, hourlyRate: 380, distance: 1.8,
    available: false, description: "Profesionální malíř pokojů. Kvalitní materiály, čistá práce.",
    phone: "+420 773 345 678", completedJobs: 156, location: "Praha 2", workRadius: 15,
  },
  {
    id: "4", name: "Martin Černý", avatar: "", category: "Truhlář",
    rating: 4.7, reviewCount: 43, hourlyRate: 500, distance: 8.4,
    available: true, description: "Zakázková výroba nábytku, opravy dveří a oken.",
    phone: "+420 602 456 789", completedJobs: 89, location: "Praha 10", workRadius: 20,
  },
  {
    id: "5", name: "Tomáš Procházka", avatar: "", category: "Instalatér",
    rating: 4.5, reviewCount: 56, hourlyRate: 420, distance: 4.7,
    available: true, description: "Spolehlivý instalatér pro bytové i komerční prostory.",
    phone: "+420 721 567 890", completedJobs: 134, location: "Praha 5", workRadius: 20,
  },
  {
    id: "6", name: "David Kučera", avatar: "", category: "Zámečník",
    rating: 4.9, reviewCount: 91, hourlyRate: 600, distance: 2.3,
    available: true, description: "Nouzové otevírání dveří, výměna zámků, bezpečnostní systémy.",
    phone: "+420 777 678 901", completedJobs: 267, location: "Praha 1", workRadius: 35, premium: true,
  },
];

export const reviews: Review[] = [
  { id: "1", customerName: "Marie K.", rating: 5, text: "Skvělá práce, rychlé a čisté provedení. Doporučuji!", date: "2024-01-15" },
  { id: "2", customerName: "Jiří M.", rating: 4, text: "Solidní řemeslník, přišel včas a odvedl dobrou práci.", date: "2024-01-10" },
  { id: "3", customerName: "Eva S.", rating: 5, text: "Profesionální přístup, férová cena. Určitě oslovím znovu.", date: "2024-01-05" },
  { id: "4", customerName: "Pavel D.", rating: 4, text: "Dobrá komunikace, kvalitní materiály.", date: "2023-12-28" },
];

export const mockOrders: Order[] = [
  {
    id: "ORD-001", craftsman: craftsmen[0],
    customer: { name: "Marie Kovářová", phone: "+420 777 111 222" },
    description: "Kapající kohoutek v kuchyni, potřeba výměny těsnění.",
    status: "in_progress", estimatedPrice: 1200, paymentMethod: "card",
    createdAt: "2024-01-20T10:30:00",
  },
  {
    id: "ORD-002", craftsman: craftsmen[1],
    customer: { name: "Marie Kovářová", phone: "+420 777 111 222" },
    description: "Instalace nových zásuvek v obývacím pokoji (3 ks).",
    status: "pending", estimatedPrice: 2800, paymentMethod: "cash",
    createdAt: "2024-01-21T14:00:00",
  },
  {
    id: "ORD-003", craftsman: craftsmen[2],
    customer: { name: "Jan Horák", phone: "+420 608 333 444" },
    description: "Vymalování ložnice, cca 20m².",
    status: "completed", estimatedPrice: 3500, paymentMethod: "card",
    createdAt: "2024-01-15T09:00:00", rating: 5, review: "Perfektní práce!",
  },
  {
    id: "ORD-004", craftsman: craftsmen[0],
    customer: { name: "Petr Novotný", phone: "+420 721 555 666" },
    description: "Oprava odtoku ve sprše.",
    status: "accepted", estimatedPrice: 900, paymentMethod: "card",
    createdAt: "2024-01-22T08:15:00",
  },
];

export const mockMessages: ChatMessage[] = [
  { id: "1", senderId: "customer", text: "Dobrý den, kdy byste mohl přijít?", timestamp: "2024-01-20T10:35:00" },
  { id: "2", senderId: "craftsman", text: "Dobrý den, mohu přijít dnes odpoledne kolem 14:00. Hodí se vám to?", timestamp: "2024-01-20T10:38:00" },
  { id: "3", senderId: "customer", text: "Ano, to by bylo skvělé. Děkuji!", timestamp: "2024-01-20T10:40:00" },
  { id: "4", senderId: "craftsman", text: "Výborně, budu u vás ve 14:00. S pozdravem.", timestamp: "2024-01-20T10:42:00" },
];
