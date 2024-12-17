export enum Rating {
    G = "G",
    PG = "PG",
    PG13 = "PG-13",
    R = "R",
    NC17 = "NC-17"
  }
  
  export enum AnimeStatus {
    AIRING = "Airing",
    FINISHED = "Finished",
    NOT_YET_AIRED = "Not yet aired"
  }
  
  export enum VideoQuality {
    P360 = "360p",
    P480 = "480p",
    P720 = "720p",
    P1080 = "1080p",
    P1440 = "1440p",
    P2160 = "2160p"
  }
  
  export enum AgeRating {
    G = "G - All Ages",
    PG = "PG - Children",
    PG13 = "PG-13 - Teens 13 or older",
    R = "R - 17+ (violence & profanity)",
    RX = "Rx - Hentai"
  }
  
  export interface VideoSource {
    quality: VideoQuality;
    format: string;
    url: string;
  }
  
  export interface Episode {
    id: string;
    number: number;
    title: string;
    duration: number;
    description?: string;
    thumbnail?: string;
    airDate: Date;
    videoSources: VideoSource[];
  }
  
  export interface Season {
    id: string;
    number: number;
    title: string;
    episodes: Episode[];
  }
  
  export interface Anime {
    id: string;
    title: string;
    alternativeTitles?: string[];
    description: string;
    rating: Rating;
    duration: number;
    airedFrom: Date;
    airedTo?: Date;
    status: AnimeStatus;
    score?: number;
    ageRating: AgeRating;
    genres: string[];
    coverImage: string;
    bannerImage?: string;
    seasons: Season[];
  }
  
  