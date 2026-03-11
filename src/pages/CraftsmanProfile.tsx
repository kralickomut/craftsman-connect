import { useParams, Link } from "react-router-dom";
import { Star, MapPin, Clock, Phone, CheckCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { craftsmen, reviews } from "@/lib/mockData";
import StarRating from "@/components/StarRating";

export default function CraftsmanProfile() {
  const { id } = useParams();
  const craftsman = craftsmen.find((c) => c.id === id);

  if (!craftsman) {
    return (
      <div className="container py-16 text-center">
        <p className="text-lg text-muted-foreground">Řemeslník nenalezen.</p>
        <Link to="/search"><Button className="mt-4">Zpět na hledání</Button></Link>
      </div>
    );
  }

  return (
    <div className="container py-8 max-w-3xl">
      <Link to="/search" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4" /> Zpět na hledání
      </Link>

      <Card>
        <CardContent className="p-6 md:p-8">
          <div className="flex items-start gap-5">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-3xl">
              {craftsman.name.charAt(0)}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-2xl font-bold">{craftsman.name}</h1>
                <Badge variant={craftsman.available ? "default" : "secondary"} className={craftsman.available ? "bg-success text-success-foreground" : ""}>
                  {craftsman.available ? "Dostupný" : "Nedostupný"}
                </Badge>
              </div>
              <p className="text-muted-foreground mt-1">{craftsman.category}</p>
              <div className="flex flex-wrap items-center gap-4 mt-3 text-sm">
                <span className="flex items-center gap-1 font-semibold text-accent">
                  <Star className="h-4 w-4 fill-accent" /> {craftsman.rating}
                  <span className="text-muted-foreground font-normal">({craftsman.reviewCount} recenzí)</span>
                </span>
                <span className="flex items-center gap-1 text-muted-foreground"><MapPin className="h-4 w-4" /> {craftsman.distance} km od vás</span>
                <span className="flex items-center gap-1 text-muted-foreground"><Clock className="h-4 w-4" /> {craftsman.hourlyRate} Kč/h</span>
                <span className="flex items-center gap-1 text-muted-foreground"><CheckCircle className="h-4 w-4" /> {craftsman.completedJobs} zakázek</span>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          <div>
            <h2 className="font-semibold mb-2">O mně</h2>
            <p className="text-muted-foreground">{craftsman.description}</p>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">Lokalita</p>
              <p className="font-semibold">{craftsman.location}</p>
            </div>
            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">Oblast působení</p>
              <p className="font-semibold">{craftsman.workRadius} km</p>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="flex flex-wrap gap-3">
            <Link to={`/order/${craftsman.id}`} className="flex-1 min-w-[200px]">
              <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold" size="lg">
                Objednat službu
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="gap-2">
              <Phone className="h-4 w-4" /> Zavolat
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Reviews */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Recenze</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {reviews.map((r) => (
            <div key={r.id} className="border-b last:border-0 pb-4 last:pb-0">
              <div className="flex items-center justify-between">
                <p className="font-semibold">{r.customerName}</p>
                <StarRating rating={r.rating} size="sm" />
              </div>
              <p className="text-sm text-muted-foreground mt-1">{r.text}</p>
              <p className="text-xs text-muted-foreground mt-1">{r.date}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
