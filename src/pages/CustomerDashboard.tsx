import { useState } from "react";
import { Link } from "react-router-dom";
import { MessageCircle, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockOrders } from "@/lib/mockData";
import StatusBadge from "@/components/StatusBadge";
import StarRating from "@/components/StarRating";
import { toast } from "sonner";

export default function CustomerDashboard() {
  const [orders, setOrders] = useState(mockOrders);
  const active = orders.filter((o) => ["pending", "accepted", "in_progress"].includes(o.status));
  const completed = orders.filter((o) => o.status === "completed");

  const cancelOrder = (id: string) => {
    setOrders((prev) => prev.map((o) => o.id === id ? { ...o, status: "cancelled" as const } : o));
    toast.success("Zakázka zrušena.");
  };

  const rateOrder = (id: string, rating: number) => {
    setOrders((prev) => prev.map((o) => o.id === id ? { ...o, rating } : o));
    toast.success("Děkujeme za hodnocení!");
  };

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Moje zakázky</h1>

      <Tabs defaultValue="active">
        <TabsList>
          <TabsTrigger value="active">Aktivní ({active.length})</TabsTrigger>
          <TabsTrigger value="completed">Dokončené ({completed.length})</TabsTrigger>
          <TabsTrigger value="all">Všechny ({orders.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="mt-4 space-y-4">
          {active.length === 0 && <p className="text-muted-foreground py-8 text-center">Žádné aktivní zakázky.</p>}
          {active.map((order) => (
            <Card key={order.id}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <p className="font-semibold">{order.craftsman.name}</p>
                      <StatusBadge status={order.status} />
                    </div>
                    <p className="text-sm text-muted-foreground">{order.craftsman.category}</p>
                    <p className="text-sm mt-2">{order.description}</p>
                    <p className="text-sm text-muted-foreground mt-2">Odhad: <span className="font-semibold text-foreground">{order.estimatedPrice} Kč</span></p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Link to={`/chat/${order.id}`}>
                      <Button variant="outline" size="sm" className="gap-1 w-full">
                        <MessageCircle className="h-3.5 w-3.5" /> Chat
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm" className="gap-1 text-destructive" onClick={() => cancelOrder(order.id)}>
                      <X className="h-3.5 w-3.5" /> Zrušit
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="completed" className="mt-4 space-y-4">
          {completed.map((order) => (
            <Card key={order.id}>
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-2">
                  <p className="font-semibold">{order.craftsman.name}</p>
                  <StatusBadge status={order.status} />
                </div>
                <p className="text-sm">{order.description}</p>
                <p className="text-sm text-muted-foreground mt-2">{order.estimatedPrice} Kč</p>
                <div className="mt-3">
                  <p className="text-sm text-muted-foreground mb-1">Vaše hodnocení:</p>
                  <StarRating rating={order.rating || 0} onRate={(r) => rateOrder(order.id, r)} />
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="all" className="mt-4 space-y-4">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardContent className="p-5">
                <div className="flex items-center gap-3">
                  <p className="font-semibold">{order.craftsman.name}</p>
                  <StatusBadge status={order.status} />
                  <span className="ml-auto text-sm text-muted-foreground">{order.estimatedPrice} Kč</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{order.description}</p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
