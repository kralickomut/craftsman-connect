import { Link } from "react-router-dom";
import { Star, MapPin, Clock, Crown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Craftsman } from "@/lib/types";

export default function CraftsmanCard({ craftsman }: { craftsman: Craftsman }) {
  return (
    <Link to={`/craftsman/${craftsman.id}`}>
      <Card className={`card-hover cursor-pointer overflow-hidden ${craftsman.premium ? "ring-2 ring-accent/50 relative" : ""}`}>
        {craftsman.premium && (
          <div className="absolute top-0 right-0 bg-accent text-accent-foreground text-xs font-bold px-2.5 py-1 rounded-bl-lg flex items-center gap-1 z-10">
            <Crown className="h-3 w-3" /> TOP
          </div>
        )}
        <CardContent className="p-5">
          <div className="flex items-start gap-4">
            <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full font-bold text-xl ${craftsman.premium ? "bg-accent text-accent-foreground" : "bg-primary text-primary-foreground"}`}>
              {craftsman.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-semibold text-foreground truncate">{craftsman.name}</h3>
                <Badge variant={craftsman.available ? "default" : "secondary"} className={craftsman.available ? "bg-success text-success-foreground" : ""}>
                  {craftsman.available ? "Dostupný" : "Nedostupný"}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-0.5">{craftsman.category}</p>
              <div className="flex flex-wrap items-center gap-3 mt-2 text-sm">
                <span className="flex items-center gap-1 text-accent">
                  <Star className="h-4 w-4 fill-accent" />
                  <span className="font-semibold">{craftsman.rating}</span>
                  <span className="text-muted-foreground">({craftsman.reviewCount})</span>
                </span>
                <span className="flex items-center gap-1 text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  {craftsman.distance} km
                </span>
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  {craftsman.hourlyRate} Kč/h
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
