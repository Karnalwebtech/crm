import * as z from "zod"
import { Rating, AnimeStatus, VideoQuality, AgeRating } from "@/types/anime/anime"

export const animeSchema = z.object({
  id: z.string().min(1, "ID is required"),
  title: z.string().min(1, "Title is required"),
  alternativeTitles: z.array(z.string()).optional(),
  description: z.string().min(1, "Description is required"),
  rating: z.nativeEnum(Rating),
  duration: z.number().min(1, "Duration must be at least 1 minute"),
  airedFrom: z.date(),
  airedTo: z.date().optional(),
  status: z.nativeEnum(AnimeStatus),
  score: z.number().min(0).max(10).optional(),
  ageRating: z.nativeEnum(AgeRating),
  genres: z.array(z.string()).min(1, "At least one genre is required"),
  coverImage: z.string().url("Must be a valid URL"),
  bannerImage: z.string().url("Must be a valid URL").optional(),
  seasons: z.array(z.object({
    id: z.string().min(1, "Season ID is required"),
    number: z.number().min(1, "Season number must be at least 1"),
    title: z.string().min(1, "Season title is required"),
    episodes: z.array(z.object({
      id: z.string().min(1, "Episode ID is required"),
      number: z.number().min(1, "Episode number must be at least 1"),
      title: z.string().min(1, "Episode title is required"),
      duration: z.number().min(1, "Episode duration must be at least 1 minute"),
      description: z.string().optional(),
      thumbnail: z.string().url("Must be a valid URL").optional(),
      airDate: z.date(),
      videoSources: z.array(z.object({
        quality: z.nativeEnum(VideoQuality),
        format: z.string().min(1, "Format is required"),
        url: z.string().url("Must be a valid URL"),
      })).min(1, "At least one video source is required"),
    })).min(1, "At least one episode is required"),
  })).min(1, "At least one season is required"),
})

export type AnimeFormValues = z.infer<typeof animeSchema>

