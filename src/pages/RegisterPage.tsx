import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const defaultRole = searchParams.get("role") || "customer";
  const [role, setRole] = useState(defaultRole);

  const handleRegister = () => {
    toast.success("Registrace úspěšná! Můžete se přihlásit.");
    navigate("/login");
  };

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-10rem)] py-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Vytvořit účet</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={role} onValueChange={setRole} className="mb-4">
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="customer">Zákazník</TabsTrigger>
              <TabsTrigger value="craftsman">Řemeslník</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Jméno</Label>
                <Input placeholder="Jan" className="mt-1" />
              </div>
              <div>
                <Label>Příjmení</Label>
                <Input placeholder="Novák" className="mt-1" />
              </div>
            </div>
            <div>
              <Label>E-mail</Label>
              <Input type="email" placeholder="vas@email.cz" className="mt-1" />
            </div>
            <div>
              <Label>Heslo</Label>
              <Input type="password" placeholder="••••••••" className="mt-1" />
            </div>

            {role === "customer" && (
              <div>
                <Label>Vaše lokalita</Label>
                <Input placeholder="Praha 4" className="mt-1" />
              </div>
            )}

            <Button onClick={handleRegister} className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold" size="lg">
              Zaregistrovat se
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Máte účet?{" "}
              <Link to="/login" className="text-accent hover:underline font-medium">Přihlaste se</Link>
            </p>

            {role === "craftsman" && (
              <p className="text-center text-xs text-muted-foreground">
                Po registraci si doplníte profil (sazba, lokace, specializace) v panelu řemeslníka.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
