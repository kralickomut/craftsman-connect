import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, Banknote, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { craftsmen } from "@/lib/mockData";
import { toast } from "sonner";

export default function OrderPage() {
  const { craftsmanId } = useParams();
  const navigate = useNavigate();
  const craftsman = craftsmen.find((c) => c.id === craftsmanId);
  const [description, setDescription] = useState("");

  if (!craftsman) {
    return (
      <div className="container py-16 text-center">
        <p className="text-lg text-muted-foreground">Řemeslník nenalezen.</p>
      </div>
    );
  }

  const handleSubmit = () => {
    if (!description.trim()) {
      toast.error("Prosím popište svůj problém.");
      return;
    }
    toast.success("Poptávka odeslána! Řemeslník ji brzy uvidí.");
    navigate("/search");
  };

  return (
    <div className="container py-8 max-w-2xl">
      <button onClick={() => navigate(-1)} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4" /> Zpět
      </button>

      <h1 className="text-2xl font-bold mb-6">Poptat službu</h1>

      {/* Craftsman summary */}
      <Card className="mb-6">
        <CardContent className="p-5 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">
            {craftsman.firstName.charAt(0)}
          </div>
          <div>
            <p className="font-semibold">{craftsman.firstName} {craftsman.lastName}</p>
            <p className="text-sm text-muted-foreground flex items-center gap-3">
              <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {craftsman.hourlyRate} Kč/h</span>
              <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {craftsman.location}</span>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>Popis problému</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="description">Co potřebujete opravit nebo nainstalovat?</Label>
            <Textarea
              id="description"
              placeholder="Popište svůj problém co nejpodrobněji..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-2 min-h-[150px]"
            />
          </div>

          <Separator />

          <div>
            <Label>Způsob platby</Label>
            <div className="mt-3 flex items-center gap-3 p-4 rounded-lg border bg-muted/30">
              <Banknote className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm font-medium">Platba hotově po dokončení práce</span>
            </div>
          </div>

          <Button onClick={handleSubmit} size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold">
            Odeslat poptávku
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
