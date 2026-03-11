import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, CreditCard, Banknote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { craftsmen } from "@/lib/mockData";
import { toast } from "sonner";

export default function OrderPage() {
  const { craftsmanId } = useParams();
  const navigate = useNavigate();
  const craftsman = craftsmen.find((c) => c.id === craftsmanId);
  const [description, setDescription] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");

  if (!craftsman) {
    return (
      <div className="container py-16 text-center">
        <p className="text-lg text-muted-foreground">Řemeslník nenalezen.</p>
      </div>
    );
  }

  const estimatedPrice = craftsman.hourlyRate * 2;

  const handleSubmit = () => {
    if (!description.trim()) {
      toast.error("Prosím popište svůj problém.");
      return;
    }
    toast.success("Objednávka odeslána! Potvrzení obdržíte e-mailem.");
    navigate("/dashboard");
  };

  return (
    <div className="container py-8 max-w-2xl">
      <button onClick={() => navigate(-1)} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4" /> Zpět
      </button>

      <h1 className="text-2xl font-bold mb-6">Objednat službu</h1>

      {/* Craftsman summary */}
      <Card className="mb-6">
        <CardContent className="p-5 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">
            {craftsman.name.charAt(0)}
          </div>
          <div>
            <p className="font-semibold">{craftsman.name}</p>
            <p className="text-sm text-muted-foreground">{craftsman.category} · {craftsman.hourlyRate} Kč/h</p>
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
              className="mt-2 min-h-[120px]"
            />
          </div>

          <Separator />

          <div>
            <Label>Orientační cena</Label>
            <div className="mt-2 p-4 rounded-lg bg-secondary">
              <p className="text-2xl font-bold text-foreground">{estimatedPrice} Kč</p>
              <p className="text-sm text-muted-foreground">Odhad na základě hodinové sazby (2 hodiny práce)</p>
            </div>
          </div>

          <Separator />

          <div>
            <Label>Způsob platby</Label>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="mt-3 space-y-3">
              <div className="flex items-center gap-3 p-4 rounded-lg border cursor-pointer hover:bg-muted/50">
                <RadioGroupItem value="card" id="card" />
                <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer flex-1">
                  <CreditCard className="h-5 w-5 text-muted-foreground" />
                  Platba kartou online
                </Label>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-lg border cursor-pointer hover:bg-muted/50">
                <RadioGroupItem value="cash" id="cash" />
                <Label htmlFor="cash" className="flex items-center gap-2 cursor-pointer flex-1">
                  <Banknote className="h-5 w-5 text-muted-foreground" />
                  Platba hotově po dokončení
                </Label>
              </div>
            </RadioGroup>
          </div>

          <Button onClick={handleSubmit} size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold">
            Potvrdit objednávku
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
