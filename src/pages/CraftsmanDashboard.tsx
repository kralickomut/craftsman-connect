import { useState } from "react";
import { Check, X, CheckCircle, Clock, DollarSign, BarChart3, ToggleLeft, ToggleRight, Crown, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { mockOrders } from "@/lib/mockData";
import StatusBadge from "@/components/StatusBadge";
import { toast } from "sonner";
import { Order } from "@/lib/types";

export default function CraftsmanDashboard() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [available, setAvailable] = useState(true);
  const [hourlyRate, setHourlyRate] = useState("450");
  const [workRadius, setWorkRadius] = useState("25");
  const [premium, setPremium] = useState(false);

  const pending = orders.filter((o) => o.status === "pending");
  const active = orders.filter((o) => ["accepted", "in_progress"].includes(o.status));
  const completed = orders.filter((o) => o.status === "completed");

  const acceptOrder = (id: string) => {
    setOrders((prev) => prev.map((o) => o.id === id ? { ...o, status: "accepted" as const } : o));
    toast.success("Zakázka přijata!");
  };

  const rejectOrder = (id: string) => {
    setOrders((prev) => prev.map((o) => o.id === id ? { ...o, status: "cancelled" as const } : o));
    toast("Zakázka odmítnuta.");
  };

  const completeOrder = (id: string) => {
    setOrders((prev) => prev.map((o) => o.id === id ? { ...o, status: "completed" as const } : o));
    toast.success("Zakázka dokončena!");
  };

  const totalEarnings = completed.reduce((sum, o) => sum + o.estimatedPrice, 0);

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Panel řemeslníka</h1>
        <Button
          variant={available ? "default" : "secondary"}
          onClick={() => { setAvailable(!available); toast(available ? "Nastaven jako nedostupný" : "Nastaven jako dostupný"); }}
          className={`gap-2 ${available ? "bg-success text-success-foreground" : ""}`}
        >
          {available ? <ToggleRight className="h-4 w-4" /> : <ToggleLeft className="h-4 w-4" />}
          {available ? "Dostupný" : "Nedostupný"}
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card><CardContent className="p-4 text-center">
          <Clock className="h-5 w-5 mx-auto text-accent mb-1" />
          <p className="text-2xl font-bold">{pending.length}</p>
          <p className="text-xs text-muted-foreground">Nové poptávky</p>
        </CardContent></Card>
        <Card><CardContent className="p-4 text-center">
          <BarChart3 className="h-5 w-5 mx-auto text-primary mb-1" />
          <p className="text-2xl font-bold">{active.length}</p>
          <p className="text-xs text-muted-foreground">Aktivní zakázky</p>
        </CardContent></Card>
        <Card><CardContent className="p-4 text-center">
          <CheckCircle className="h-5 w-5 mx-auto text-success mb-1" />
          <p className="text-2xl font-bold">{completed.length}</p>
          <p className="text-xs text-muted-foreground">Dokončené</p>
        </CardContent></Card>
        <Card><CardContent className="p-4 text-center">
          <DollarSign className="h-5 w-5 mx-auto text-accent mb-1" />
          <p className="text-2xl font-bold">{totalEarnings.toLocaleString()} Kč</p>
          <p className="text-xs text-muted-foreground">Výdělky</p>
        </CardContent></Card>
      </div>

      <Tabs defaultValue="requests">
        <TabsList>
          <TabsTrigger value="requests">Poptávky ({pending.length})</TabsTrigger>
          <TabsTrigger value="active">Aktivní ({active.length})</TabsTrigger>
          <TabsTrigger value="settings">Nastavení</TabsTrigger>
        </TabsList>

        <TabsContent value="requests" className="mt-4 space-y-4">
          {pending.length === 0 && <p className="text-muted-foreground py-8 text-center">Žádné nové poptávky.</p>}
          {pending.map((order) => (
            <Card key={order.id}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="font-semibold">{order.customer.name}</p>
                    <p className="text-sm mt-1">{order.description}</p>
                    <p className="text-sm text-muted-foreground mt-2">Odhad: {order.estimatedPrice} Kč · {order.paymentMethod === "card" ? "Kartou" : "Hotově"}</p>
                    <p className="text-sm text-muted-foreground">Tel: {order.customer.phone}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => acceptOrder(order.id)} className="gap-1 bg-success text-success-foreground">
                      <Check className="h-4 w-4" /> Přijmout
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => rejectOrder(order.id)} className="gap-1">
                      <X className="h-4 w-4" /> Odmítnout
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="active" className="mt-4 space-y-4">
          {active.map((order) => (
            <Card key={order.id}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <p className="font-semibold">{order.customer.name}</p>
                      <StatusBadge status={order.status} />
                    </div>
                    <p className="text-sm">{order.description}</p>
                    <p className="text-sm text-muted-foreground mt-1">Tel: {order.customer.phone}</p>
                  </div>
                  <Button size="sm" onClick={() => completeOrder(order.id)} className="gap-1 bg-success text-success-foreground">
                    <CheckCircle className="h-4 w-4" /> Dokončit
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="settings" className="mt-4">
          <Card>
            <CardHeader><CardTitle>Nastavení profilu</CardTitle></CardHeader>
            <CardContent className="space-y-4 max-w-md">
              <div>
                <Label>Hodinová sazba (Kč)</Label>
                <Input type="number" value={hourlyRate} onChange={(e) => setHourlyRate(e.target.value)} className="mt-1" />
              </div>
              <div>
                <Label>Oblast působení (km)</Label>
                <Input type="number" value={workRadius} onChange={(e) => setWorkRadius(e.target.value)} className="mt-1" />
              </div>
              <Separator />
              <Button onClick={() => toast.success("Nastavení uloženo!")} className="bg-accent text-accent-foreground hover:bg-accent/90">
                Uložit nastavení
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
