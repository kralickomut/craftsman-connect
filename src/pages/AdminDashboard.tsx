import { useState } from "react";
import { Users, ShoppingCart, DollarSign, TrendingUp, Plus, Pencil, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { categories as initialCategories } from "@/lib/mockData";
import { toast } from "sonner";

export default function AdminDashboard() {
  const [cats, setCats] = useState(initialCategories);
  const [newCatName, setNewCatName] = useState("");
  const [commission, setCommission] = useState("15");

  const addCategory = () => {
    if (!newCatName.trim()) return;
    setCats([...cats, { id: String(cats.length + 1), name: newCatName, icon: "🔨", count: 0 }]);
    setNewCatName("");
    toast.success("Kategorie přidána!");
  };

  const deleteCategory = (id: string) => {
    setCats(cats.filter((c) => c.id !== id));
    toast("Kategorie odstraněna.");
  };

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Admin panel</h1>

      {/* KPI */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card><CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10"><ShoppingCart className="h-5 w-5 text-accent" /></div>
            <div>
              <p className="text-2xl font-bold">156</p>
              <p className="text-xs text-muted-foreground">Zakázky tento měsíc</p>
            </div>
          </div>
        </CardContent></Card>
        <Card><CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10"><DollarSign className="h-5 w-5 text-success" /></div>
            <div>
              <p className="text-2xl font-bold">482 500 Kč</p>
              <p className="text-xs text-muted-foreground">GMV</p>
            </div>
          </div>
        </CardContent></Card>
        <Card><CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10"><Users className="h-5 w-5 text-primary" /></div>
            <div>
              <p className="text-2xl font-bold">1 240</p>
              <p className="text-xs text-muted-foreground">Aktivní uživatelé</p>
            </div>
          </div>
        </CardContent></Card>
        <Card><CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10"><TrendingUp className="h-5 w-5 text-accent" /></div>
            <div>
              <p className="text-2xl font-bold">72 375 Kč</p>
              <p className="text-xs text-muted-foreground">Provize platformy</p>
            </div>
          </div>
        </CardContent></Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Správa kategorií</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 mb-4">
              <Input placeholder="Nová kategorie..." value={newCatName} onChange={(e) => setNewCatName(e.target.value)} />
              <Button onClick={addCategory} className="gap-1 bg-accent text-accent-foreground hover:bg-accent/90">
                <Plus className="h-4 w-4" /> Přidat
              </Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ikona</TableHead>
                  <TableHead>Název</TableHead>
                  <TableHead>Řemeslníků</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cats.map((cat) => (
                  <TableRow key={cat.id}>
                    <TableCell>{cat.icon}</TableCell>
                    <TableCell className="font-medium">{cat.name}</TableCell>
                    <TableCell>{cat.count}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" onClick={() => deleteCategory(cat.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Commission */}
        <Card>
          <CardHeader>
            <CardTitle>Nastavení provize</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Provize platformy (%)</Label>
              <Input type="number" value={commission} onChange={(e) => setCommission(e.target.value)} className="mt-1 max-w-[200px]" />
              <p className="text-sm text-muted-foreground mt-2">Procento z každé zakázky, které platforma inkasuje.</p>
            </div>
            <Button onClick={() => toast.success("Provize aktualizována!")} className="bg-accent text-accent-foreground hover:bg-accent/90">
              Uložit provizi
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
