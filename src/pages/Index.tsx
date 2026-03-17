import { Link } from "react-router-dom";
import { ArrowRight, Search, CheckCircle, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { categories } from "@/lib/mockData";

const steps = [
  { icon: Search, title: "Vyberte kategorii", description: "Zvolte typ řemeslníka, kterého potřebujete." },
  { icon: Users, title: "Vyberte řemeslníka", description: "Prohlédněte si nabídku podle lokace a vzdálenosti." },
  { icon: CheckCircle, title: "Poptejte práci", description: "Popište problém a odešlete poptávku." },
];

export default function Index() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-accent/20" />
        <div className="container relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground leading-tight">
              Najděte spolehlivého{" "}
              <span className="text-accent">řemeslníka</span>{" "}
              ve vašem okolí
            </h1>
            <p className="mt-4 text-lg text-primary-foreground/80 max-w-lg">
              Vyberte si z široké nabídky ověřených řemeslníků a poptejte práci jednoduše online.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/search">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2 font-semibold text-base px-8">
                  Najít řemeslníka
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/register?role=craftsman">
                <Button size="lg" className="bg-primary-foreground/15 text-primary-foreground border border-primary-foreground/30 hover:bg-primary-foreground/25 font-semibold text-base px-8">
                  Jsem řemeslník
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">Kategorie služeb</h2>
          <p className="text-muted-foreground text-center mb-10">Vyberte si z široké nabídky řemeslnických služeb</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link key={cat.id} to={`/search?category=${cat.name}`}>
                <Card className="card-hover text-center cursor-pointer">
                  <CardContent className="p-6">
                    <span className="text-4xl">{cat.icon}</span>
                    <h3 className="mt-3 font-semibold text-foreground">{cat.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{cat.count} řemeslníků</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-secondary/50">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Jak to funguje</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <div key={i} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground mb-4">
                  <step.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold mb-1">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
