import { Badge } from "@/components/ui/badge";

const statusMap: Record<string, { label: string; className: string }> = {
  pending: { label: "Čeká na přijetí", className: "bg-warning text-warning-foreground" },
  accepted: { label: "Přijato", className: "bg-primary text-primary-foreground" },
  in_progress: { label: "Probíhá", className: "bg-accent text-accent-foreground" },
  completed: { label: "Dokončeno", className: "bg-success text-success-foreground" },
  cancelled: { label: "Zrušeno", className: "bg-destructive text-destructive-foreground" },
};

export default function StatusBadge({ status }: { status: string }) {
  const config = statusMap[status] || { label: status, className: "" };
  return <Badge className={config.className}>{config.label}</Badge>;
}
