import { useParams, Link } from "react-router-dom";
import { MapPin, Clock, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { craftsmen } from "@/lib/mockData";

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
              {craftsman.firstName.charAt(0)}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-2xl font-bold">{craftsman.firstName} {craftsman.lastName}</h1>
                <Badge variant={craftsman.available ? "default" : "secondary"} className={craftsman.available ? "bg-success text-success-foreground" : ""}>
                  {craftsman.available ? "Dostupný" : "Nedostupný"}
                </Badge>
              </div>
              <p className="text-muted-foreground mt-1">{craftsman.category}</p>
              <div className="flex flex-wrap items-center gap-4 mt-3 text-sm">
                <span className="flex items-center gap-1 font-semibold text-accent">
                  <Clock className="h-4 w-4" /> {craftsman.hourlyRate} Kč/h
                </span>
                <span className="flex items-center gap-1 text-muted-foreground">
                  <MapPin className="h-4 w-4" /> {craftsman.location} · {craftsman.distance} km od vás
                </span>
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

          <Link to={`/order/${craftsman.id}`}>
            <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold" size="lg">
              Poptat službu
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
