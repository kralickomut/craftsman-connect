import { useState, useMemo } from "react";
import { Search as SearchIcon, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { categories, craftsmen } from "@/lib/mockData";
import CraftsmanCard from "@/components/CraftsmanCard";

export default function SearchPage() {
  const [category, setCategory] = useState<string>("all");
  const [maxDistance, setMaxDistance] = useState(50);
  const [maxRate, setMaxRate] = useState(1000);
  const [sortBy, setSortBy] = useState<string>("rating");
  const [showFilters, setShowFilters] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    let list = craftsmen.filter((c) => {
      if (category !== "all" && c.category !== category) return false;
      if (c.distance > maxDistance) return false;
      if (c.hourlyRate > maxRate) return false;
      if (searchQuery && !c.name.toLowerCase().includes(searchQuery.toLowerCase()) && !c.category.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });

    list.sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "distance") return a.distance - b.distance;
      if (sortBy === "price") return a.hourlyRate - b.hourlyRate;
      return 0;
    });

    return list;
  }, [category, maxDistance, maxRate, sortBy, searchQuery]);

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Najít řemeslníka</h1>

      {/* Search bar */}
      <div className="flex gap-3 mb-6">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Hledat podle jména nebo kategorie..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          Filtry
        </Button>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 p-5 rounded-lg border bg-card mb-6 animate-fade-in">
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

          <div>
            <Label className="mb-2 block">Max. sazba: {maxRate} Kč/h</Label>
            <Slider value={[maxRate]} onValueChange={([v]) => setMaxRate(v)} min={100} max={1500} step={50} />
          </div>

          <div>
            <Label className="mb-2 block">Řadit podle</Label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Hodnocení</SelectItem>
                <SelectItem value="distance">Vzdálenost</SelectItem>
                <SelectItem value="price">Cena</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {/* Results */}
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
