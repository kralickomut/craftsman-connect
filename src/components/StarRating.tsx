import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  onRate?: (rating: number) => void;
  size?: "sm" | "md";
}

export default function StarRating({ rating, onRate, size = "md" }: StarRatingProps) {
  const starSize = size === "sm" ? "h-4 w-4" : "h-5 w-5";

  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={!onRate}
          onClick={() => onRate?.(star)}
          className={onRate ? "cursor-pointer hover:scale-110 transition-transform" : "cursor-default"}
        >
          <Star
            className={`${starSize} ${
              star <= rating
                ? "fill-accent text-accent"
                : "fill-muted text-muted"
            }`}
          />
        </button>
      ))}
    </div>
  );
}
