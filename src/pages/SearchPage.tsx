import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { categories, craftsmen } from "@/lib/mockData";
import CraftsmanCard from "@/components/CraftsmanCard";

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  
  const [category, setCategory] = useState<string>(initialCategory);
  const [maxDistance, setMaxDistance] = useState(50);
  const [locationQuery, setLocationQuery] = useState("");
  const [showFilters, setShowFilters] = useState(true);

  const filtered = useMemo(() => {
    return craftsmen.filter((c) => {
      if (category !== "all" && c.category !== category) return false;
      if (c.distance > maxDistance) return false;
      if (locationQuery && !c.location.toLowerCase().includes(locationQuery.toLowerCase())) return false;
      return true;
    });
  }, [category, maxDistance, locationQuery]);

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Najít řemeslníka</h1>

      <div className="flex gap-3 mb-6">
        <div className="relative flex-1">
          <Input
            placeholder="Zadejte vaši lokalitu (např. Praha 4)..."
            value={locationQuery}
            onChange={(e) => setLocationQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          Filtry
        </Button>
      </div>

      {showFilters && (
        <div className="grid sm:grid-cols-2 gap-6 p-5 rounded-lg border bg-card mb-6 animate-fade-in">
          <div>
            <Label className="mb-2 block">Kategorie</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Všechny kategorie</SelectItem>
                {categories.map((c) => (
                  <SelectItem key={c.id} value={c.name}>{c.icon} {c.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="mb-2 block">Max. vzdálenost: {maxDistance} km</Label>
            <Slider value={[maxDistance]} onValueChange={([v]) => setMaxDistance(v)} min={1} max={50} step={1} />
          </div>
        </div>
      )}

      <p className="text-sm text-muted-foreground mb-4">{filtered.length} výsledků</p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((c) => (
          <CraftsmanCard key={c.id} craftsman={c} />
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <p className="text-lg">Žádní řemeslníci nenalezeni.</p>
          <p className="text-sm mt-1">Zkuste upravit filtry.</p>
        </div>
      )}
    </div>
  );
}
