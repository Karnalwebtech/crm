"use client"
import { AnimeCard } from "@/components/cards/anime-card";
import { Button } from "@/components/ui/button";
import { UserCog2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const sampleAnimes = [
  {
    id: "1",
    title: "Naruto Shippūden",
    description:
      "After 2 and a half years Naruto finally returns to his village of Konoha, and sets about putting his ambitions to work, though it will not be easy to achieve them.",
    rating: "PG-13",
    duration: 25,
    airedFrom: new Date("2007-02-15"),
    status: "FINISHED",
    score: 221,
    ageRating: "PG-13",
    genres: ["Action", "Adventure", "Fantasy"],
    coverImage:
      "https://image.tmdb.org/t/p/w342/xUfRZu2mi8jH6SzQEJGP6tjBuYj.jpg?height=400&width=300",
  },
  {
    id: "2",
    title: "Demon Slayer: Kimetsu no Yaiba",
    description:
      "It is the Taisho Period in Japan. Tanjiro, a kindhearted boy who sells charcoal for a living, finds his family slaughtered by a demon.",
    rating: "PG-13",
    duration: 52,
    airedFrom: new Date("2019-04-06"),
    status: "AIRING",
    score: 63,
    ageRating: "PG-13",
    genres: ["Action", "Fantasy"],
    coverImage:
      "https://image.tmdb.org/t/p/w342/xUfRZu2mi8jH6SzQEJGP6tjBuYj.jpg?height=400&width=300",
  },
  // Add more sample animes as needed
];
export const Movie = () => {
    const router = useRouter();
  return (
    <div>
      <div className="w-[150px] my-4 flex gap-4">
        <Button
          className="bg-black text-white hover:text-black"
          onClick={() => router.push("/anime/movie/add-new")}
        >
          Add new
        </Button>
        {/* <CacheRemover pattern={[cache_keys.projects]} /> */}
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sampleAnimes.map((anime) => (
          <AnimeCard key={anime.id} anime={anime} />
        ))}
      </div>
    </div>
  );
};
