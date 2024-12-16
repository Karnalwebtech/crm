import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Eye } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnimeCardProps {
  anime: any;
  className?: string;
}

export function AnimeCard({ anime, className }: AnimeCardProps) {
  return (
    <Card
      className={cn(
        "group relative overflow-hidden transition-all hover:scale-105",
        className
      )}
    >
      {/* Rating Badge */}
      <div className="absolute left-2 top-2 z-20">
        <Badge
          variant="destructive"
          className="bg-orange-500 text-xs font-bold"
        >
          PG-13
        </Badge>
      </div>

      {/* Views Badge */}
      <div className="absolute right-2 top-2 z-20  overflow-hidden">
        <Badge
          variant="secondary"
          className="flex items-center gap-1 bg-black/50 backdrop-blur-sm"
        >
          <Eye className="h-3 w-3" />
          <span className="text-xs">{anime.score || 0}</span>
        </Badge>
      </div>

      {/* Cover Image */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={anime.coverImage}
          alt={anime.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Content */}
      <CardHeader className="p-4">
        <h3 className="line-clamp-1 text-lg font-bold">{anime.title}</h3>
      </CardHeader>

      <CardContent className="p-4 pt-0">
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {anime.description}
        </p>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{anime.duration} min</span>
          {anime.status === "AIRING" && (
            <>
              <span>•</span>
              <span className="text-green-500">Airing</span>
            </>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
