import { useState } from "react";
import { Clock, MapPin, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockOrders, categories } from "@/lib/mockData";
import { toast } from "sonner";

export default function CraftsmanDashboard() {
  const [orders] = useState(mockOrders);

  // Profile state
  const [hourlyRate, setHourlyRate] = useState("450");
  const [location, setLocation] = useState("Praha 4");
  const [workRadius, setWorkRadius] = useState("25");
  const [category, setCategory] = useState("Instalatér");
  const [description, setDescription] = useState("Zkušený instalatér s 15 lety praxe.");

  const pending = orders.filter((o) => o.status === "pending");

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString("cs-CZ", {
      day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit"
    });
  };

  const handleSaveProfile = () => {
    if (!hourlyRate || !location || !workRadius || !category) {
      toast.error("Vyplňte všechna povinná pole pro dokončení profilu.");
      return;
    }
    toast.success("Profil uložen!");
  };

  const profileComplete = !!(hourlyRate && location && workRadius && category);

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Panel řemeslníka</h1>

      {!profileComplete && (
        <div className="mb-6 p-4 rounded-lg border-2 border-accent bg-accent/5 text-sm">
          <p className="font-semibold text-accent">⚠ Doplňte svůj profil</p>
          <p className="text-muted-foreground mt-1">Bez kompletního profilu nemůžete přijímat poptávky. Vyplňte sazbu, lokaci, oblast působení a specializaci.</p>
        </div>
      )}

      <Tabs defaultValue="requests">
        <TabsList>
          <TabsTrigger value="requests">Poptávky ({pending.length})</TabsTrigger>
          <TabsTrigger value="profile">Můj profil</TabsTrigger>
        </TabsList>

        <TabsContent value="requests" className="mt-4 space-y-4">
          {!profileComplete && (
            <p className="text-muted-foreground py-8 text-center">Nejdříve dokončete svůj profil, abyste mohli přijímat poptávky.</p>
          )}
          {profileComplete && pending.length === 0 && (
            <p className="text-muted-foreground py-8 text-center">Žádné nové poptávky.</p>
          )}
          {profileComplete && pending.map((order) => (
            <Card key={order.id}>
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                    <User className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-semibold">{order.customer.firstName} {order.customer.lastName}</p>
                      <span className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5" /> {order.customer.location}
                      </span>
                    </div>
                    <p className="text-sm mt-2">{order.description}</p>
                    <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {formatDate(order.createdAt)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="profile" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Nastavení profilu</CardTitle>
              <p className="text-sm text-muted-foreground">Vyplňte všechna pole pro aktivaci profilu a příjem poptávek.</p>
            </CardHeader>
            <CardContent className="space-y-4 max-w-lg">
              <div>
                <Label>Specializace *</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="mt-1"><SelectValue placeholder="Vyberte kategorii" /></SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => (
                      <SelectItem key={c.id} value={c.name}>{c.icon} {c.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Hodinová sazba (Kč) *</Label>
                <Input type="number" value={hourlyRate} onChange={(e) => setHourlyRate(e.target.value)} className="mt-1" />
              </div>
              <div>
                <Label>Lokace *</Label>
                <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Praha 4" className="mt-1" />
              </div>
              <div>
                <Label>Jak daleko chci jezdit (km) *</Label>
                <Input type="number" value={workRadius} onChange={(e) => setWorkRadius(e.target.value)} className="mt-1" />
              </div>

              <Separator />

              <div>
                <Label>Popis (volitelné)</Label>
                <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Napište něco o sobě..." className="mt-1" />
              </div>

              <Button onClick={handleSaveProfile} className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold">
                Uložit profil
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
