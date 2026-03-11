import { ExternalLink } from "lucide-react";

interface AdBannerProps {
  variant?: "horizontal" | "compact";
}

const ads = [
  {
    title: "Kvalitní nářadí se slevou 20 %",
    description: "Nakupte profesionální nářadí značky Bosch a Makita za skvělé ceny.",
    cta: "Nakoupit nyní",
    color: "from-primary to-primary/80",
  },
  {
    title: "Pojištění řemeslníků od 299 Kč/měsíc",
    description: "Chraňte svou práci i klienty. Sjednání online za 5 minut.",
    cta: "Zjistit více",
    color: "from-accent/90 to-accent/70",
  },
  {
    title: "Stavebniny Pronto — doprava zdarma",
    description: "Široký sortiment materiálů s rozvozem po celé Praze.",
    cta: "Prohlédnout",
    color: "from-primary/90 to-accent/60",
  },
];

export default function AdBanner({ variant = "horizontal" }: AdBannerProps) {
  // Pick a "random" ad based on current second to simulate rotation
  const ad = ads[Math.floor(Date.now() / 10000) % ads.length];

  if (variant === "compact") {
    return (
      <div className={`rounded-lg bg-gradient-to-r ${ad.color} p-4 text-primary-foreground`}>
        <p className="text-xs font-medium uppercase tracking-wider opacity-70 mb-1">Sponzorováno</p>
        <p className="font-semibold text-sm">{ad.title}</p>
        <p className="text-xs opacity-80 mt-1">{ad.description}</p>
        <button className="mt-2 text-xs font-semibold underline underline-offset-2 flex items-center gap-1 opacity-90 hover:opacity-100">
          {ad.cta} <ExternalLink className="h-3 w-3" />
        </button>
      </div>
    );
  }

  return (
    <div className={`rounded-xl bg-gradient-to-r ${ad.color} p-6 md:p-8 text-primary-foreground`}>
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider opacity-70 mb-1">Sponzorováno</p>
          <h3 className="text-lg md:text-xl font-bold">{ad.title}</h3>
          <p className="text-sm opacity-80 mt-1 max-w-md">{ad.description}</p>
        </div>
        <button className="bg-primary-foreground/20 hover:bg-primary-foreground/30 backdrop-blur-sm text-primary-foreground font-semibold px-5 py-2.5 rounded-lg text-sm flex items-center gap-2 transition-colors">
          {ad.cta} <ExternalLink className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
