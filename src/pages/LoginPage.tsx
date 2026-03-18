import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) { toast.error("Vyplňte všechna pole."); return; }
    toast.success("Přihlášení úspěšné!");
    navigate("/search");
  };

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-10rem)] py-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Vítejte zpět</CardTitle>
          <p className="text-sm text-muted-foreground">Přihlaste se do svého účtu</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" type="email" placeholder="vas@email.cz" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1" />
          </div>
          <div>
            <Label htmlFor="password">Heslo</Label>
            <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1" />
          </div>
          <Button onClick={handleLogin} className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold" size="lg">
            Přihlásit se
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Nemáte účet?{" "}
            <Link to="/register" className="text-accent hover:underline font-medium">Zaregistrujte se</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
