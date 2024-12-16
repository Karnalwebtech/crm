interface Paths {
  crm: {
    product_service: string;
    crm: string;
    vendor: string;
    customer: string;
    expense: string;
    users: string;
    order: {
      list: string;
      form: string;
    };
    purchases: {
      list: string;
      form: string;
    };
  };
  dashboard: {
    products: string;
    users: string;
    inventory: string;
  };
  anime: {
    uploadVideo: string;
    movie: string;
    categorie: string;
    users: string;
    inventory: string;
  };
  karnalwebtech: {
    post: string;
    media: string;
    post_categorie: string;
    post_tag: string;
    contacts: string;
    portfolio: string;
    portfolio_categorie: string;
    portfolio_tag: string;
    users: string;
    inventory: string;
  };
}

export const paths: Paths = {
  crm: {
    order: {
      list: "/crm/orders",
      form: "/crm/orders/form",
    },
    purchases: {
      list: "/crm/purchase",
      form: "/crm/purchase/form",
    },
    product_service: "/crm/product",
    crm: "/crm",
    expense: "/crm/expense",
    customer: "/crm/customer",
    vendor: "/crm/vendor",
    users: "/crm/users",
  },
  dashboard: {
    products: "/products",
    users: "/users",
    inventory: "/inventory",
  },
  anime: {
    uploadVideo: "/anime/upload-video",
    movie: "/anime/movie",
    categorie: "/anime/categorie",
    users: "/anime/users",
    inventory: "/anime/inventory",
  },
  karnalwebtech: {
    post: "/karnalwebtech/post",
    media: "/karnalwebtech/media",
    post_categorie: "/karnalwebtech/post/categorie",
    post_tag: "/karnalwebtech/post/tag",
    contacts: "/karnalwebtech/contacts",
    users: "/streaming/users",
    inventory: "/streaming/inventory",
    portfolio: "/karnalwebtech/portfolio",
    portfolio_categorie: "/karnalwebtech/portfolio/categorie",
    portfolio_tag: "/karnalwebtech/portfolio/tag",
  },
};




// export interface Anime {
//   id: string
//   title: string
//   alternativeTitles?: string[]
//   description: string
//   rating: Rating
//   duration: number // in minutes
//   airedFrom: Date
//   airedTo?: Date
//   status: AnimeStatus
//   score?: number
//   ageRating: AgeRating
//   genres: string[]
//   coverImage: string
//   bannerImage?: string
// }

// export interface Episode {
//   id: string
//   animeId: string
//   number: number
//   title: string
//   duration: number
//   description?: string
//   thumbnail?: string
//   videoSources: VideoSource[]
//   airDate: Date
// }

// export interface Season {
//   id: string
//   animeId: string
//   number: number
//   title: string
//   episodes: Episode[]
// }

// export interface VideoSource {
//   quality: VideoQuality
//   format: string
//   url: string
// }

// export enum AnimeStatus {
//   ONGOING = 'ONGOING',
//   COMPLETED = 'COMPLETED',
//   UPCOMING = 'UPCOMING',
//   CANCELED = 'CANCELED'
// }

// export enum VideoQuality {
//   P1080 = '1080p',
//   P720 = '720p',
//   P480 = '480p'
// }

// export enum AgeRating {
//   G = 'G',
//   PG = 'PG',
//   PG13 = 'PG-13',
//   R = 'R',
//   NC17 = 'NC-17'
// }




// "use client"

// import { useState } from "react"
// import { useForm, useFieldArray, Controller } from "react-hook-form"
// import { zodResolver } from "@hookform/resolvers/zod"
// import * as z from "zod"
// import { format } from "date-fns"
// import { Anime, Episode, Season, VideoSource, AnimeStatus, VideoQuality, AgeRating, Rating } from "../types/anime"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Checkbox } from "@/components/ui/checkbox"
// import { Calendar } from "@/components/ui/calendar"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { CalendarIcon, Plus, Minus } from 'lucide-react'
// import { cn } from "@/lib/utils"
// import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// const animeSchema = z.object({
//   id: z.string().min(1, "ID is required"),
//   title: z.string().min(1, "Title is required"),
//   alternativeTitles: z.array(z.string()).optional(),
//   description: z.string().min(1, "Description is required"),
//   rating: z.nativeEnum(Rating),
//   duration: z.number().min(1, "Duration must be at least 1 minute"),
//   airedFrom: z.date(),
//   airedTo: z.date().optional(),
//   status: z.nativeEnum(AnimeStatus),
//   score: z.number().min(0).max(10).optional(),
//   ageRating: z.nativeEnum(AgeRating),
//   genres: z.array(z.string()).min(1, "At least one genre is required"),
//   coverImage: z.string().url("Must be a valid URL"),
//   bannerImage: z.string().url("Must be a valid URL").optional(),
//   seasons: z.array(z.object({
//     id: z.string().min(1, "Season ID is required"),
//     number: z.number().min(1, "Season number must be at least 1"),
//     title: z.string().min(1, "Season title is required"),
//     episodes: z.array(z.object({
//       id: z.string().min(1, "Episode ID is required"),
//       number: z.number().min(1, "Episode number must be at least 1"),
//       title: z.string().min(1, "Episode title is required"),
//       duration: z.number().min(1, "Episode duration must be at least 1 minute"),
//       description: z.string().optional(),
//       thumbnail: z.string().url("Must be a valid URL").optional(),
//       airDate: z.date(),
//       videoSources: z.array(z.object({
//         quality: z.nativeEnum(VideoQuality),
//         format: z.string().min(1, "Format is required"),
//         url: z.string().url("Must be a valid URL"),
//       })).min(1, "At least one video source is required"),
//     })).min(1, "At least one episode is required"),
//   })).min(1, "At least one season is required"),
// })

// type AnimeFormValues = z.infer<typeof animeSchema>

// export function AnimeForm() {
//   const [alternativeTitles, setAlternativeTitles] = useState<string[]>([])
//   const [genres, setGenres] = useState<string[]>([])

//   const form = useForm<AnimeFormValues>({
//     resolver: zodResolver(animeSchema),
//     defaultValues: {
//       alternativeTitles: [],
//       genres: [],
//       seasons: [{ id: "", number: 1, title: "", episodes: [] }],
//     },
//   })

//   const { fields: seasonFields, append: appendSeason, remove: removeSeason } = useFieldArray({
//     control: form.control,
//     name: "seasons",
//   })

//   function onSubmit(values: AnimeFormValues) {
//     console.log(values)
//     // Here you would typically send the data to your backend
//   }

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//         <Card>
//           <CardHeader>
//             <CardTitle>Anime Details</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <FormField
//               control={form.control}
//               name="id"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>ID</FormLabel>
//                   <FormControl>
//                     <Input placeholder="Unique anime ID" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="title"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Title</FormLabel>
//                   <FormControl>
//                     <Input placeholder="Anime title" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="alternativeTitles"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Alternative Titles</FormLabel>
//                   <FormControl>
//                     <div className="flex flex-wrap gap-2">
//                       {alternativeTitles.map((title, index) => (
//                         <div key={index} className="flex items-center bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-sm">
//                           {title}
//                           <Button
//                             type="button"
//                             variant="ghost"
//                             size="sm"
//                             className="ml-2 h-auto p-0 text-secondary-foreground"
//                             onClick={() => {
//                               const newTitles = alternativeTitles.filter((_, i) => i !== index)
//                               setAlternativeTitles(newTitles)
//                               field.onChange(newTitles)
//                             }}
//                           >
//                             ×
//                           </Button>
//                         </div>
//                       ))}
//                       <Input
//                         placeholder="Add alternative title"
//                         onKeyDown={(e) => {
//                           if (e.key === 'Enter') {
//                             e.preventDefault()
//                             const input = e.target as HTMLInputElement
//                             if (input.value) {
//                               const newTitles = [...alternativeTitles, input.value]
//                               setAlternativeTitles(newTitles)
//                               field.onChange(newTitles)
//                               input.value = ''
//                             }
//                           }
//                         }}
//                       />
//                     </div>
//                   </FormControl>
//                   <FormDescription>Press Enter to add a new alternative title</FormDescription>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="description"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Description</FormLabel>
//                   <FormControl>
//                     <Textarea placeholder="Anime description" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="rating"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Rating</FormLabel>
//                   <Select onValueChange={field.onChange} defaultValue={field.value}>
//                     <FormControl>
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select a rating" />
//                       </SelectTrigger>
//                     </FormControl>
//                     <SelectContent>
//                       {Object.values(Rating).map((rating) => (
//                         <SelectItem key={rating} value={rating}>
//                           {rating}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="duration"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Duration (minutes)</FormLabel>
//                   <FormControl>
//                     <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="airedFrom"
//               render={({ field }) => (
//                 <FormItem className="flex flex-col">
//                   <FormLabel>Aired From</FormLabel>
//                   <Popover>
//                     <PopoverTrigger asChild>
//                       <FormControl>
//                         <Button
//                           variant={"outline"}
//                           className={cn(
//                             "w-[240px] pl-3 text-left font-normal",
//                             !field.value && "text-muted-foreground"
//                           )}
//                         >
//                           {field.value ? (
//                             format(field.value, "PPP")
//                           ) : (
//                             <span>Pick a date</span>
//                           )}
//                           <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
//                         </Button>
//                       </FormControl>
//                     </PopoverTrigger>
//                     <PopoverContent className="w-auto p-0" align="start">
//                       <Calendar
//                         mode="single"
//                         selected={field.value}
//                         onSelect={field.onChange}
//                         disabled={(date) =>
//                           date > new Date() || date < new Date("1900-01-01")
//                         }
//                         initialFocus
//                       />
//                     </PopoverContent>
//                   </Popover>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="airedTo"
//               render={({ field }) => (
//                 <FormItem className="flex flex-col">
//                   <FormLabel>Aired To</FormLabel>
//                   <Popover>
//                     <PopoverTrigger asChild>
//                       <FormControl>
//                         <Button
//                           variant={"outline"}
//                           className={cn(
//                             "w-[240px] pl-3 text-left font-normal",
//                             !field.value && "text-muted-foreground"
//                           )}
//                         >
//                           {field.value ? (
//                             format(field.value, "PPP")
//                           ) : (
//                             <span>Pick a date</span>
//                           )}
//                           <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
//                         </Button>
//                       </FormControl>
//                     </PopoverTrigger>
//                     <PopoverContent className="w-auto p-0" align="start">
//                       <Calendar
//                         mode="single"
//                         selected={field.value}
//                         onSelect={field.onChange}
//                         disabled={(date) =>
//                           date > new Date() || date < new Date("1900-01-01")
//                         }
//                         initialFocus
//                       />
//                     </PopoverContent>
//                   </Popover>
//                   <FormDescription>Leave empty if still airing</FormDescription>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="status"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Status</FormLabel>
//                   <Select onValueChange={field.onChange} defaultValue={field.value}>
//                     <FormControl>
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select a status" />
//                       </SelectTrigger>
//                     </FormControl>
//                     <SelectContent>
//                       {Object.values(AnimeStatus).map((status) => (
//                         <SelectItem key={status} value={status}>
//                           {status}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="score"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Score</FormLabel>
//                   <FormControl>
//                     <Input type="number" step="0.1" min="0" max="10" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
//                   </FormControl>
//                   <FormDescription>Score from 0 to 10</FormDescription>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="ageRating"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Age Rating</FormLabel>
//                   <Select onValueChange={field.onChange} defaultValue={field.value}>
//                     <FormControl>
//                       <SelectTrigger><SelectTrigger>
//                         <SelectValue placeholder="Select an age rating" />
//                       </SelectTrigger>
//                     </FormControl>
//                     <SelectContent>
//                       {Object.values(AgeRating).map((rating) => (
//                         <SelectItem key={rating} value={rating}>
//                           {rating}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="genres"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Genres</FormLabel>
//                   <FormControl>
//                     <div className="flex flex-wrap gap-2">
//                       {genres.map((genre, index) => (
//                         <div key={index} className="flex items-center bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-sm">
//                           {genre}
//                           <Button
//                             type="button"
//                             variant="ghost"
//                             size="sm"
//                             className="ml-2 h-auto p-0 text-secondary-foreground"
//                             onClick={() => {
//                               const newGenres = genres.filter((_, i) => i !== index)
//                               setGenres(newGenres)
//                               field.onChange(newGenres)
//                             }}
//                           >
//                             ×
//                           </Button>
//                         </div>
//                       ))}
//                       <Input
//                         placeholder="Add genre"
//                         onKeyDown={(e) => {
//                           if (e.key === 'Enter') {
//                             e.preventDefault()
//                             const input = e.target as HTMLInputElement
//                             if (input.value) {
//                               const newGenres = [...genres, input.value]
//                               setGenres(newGenres)
//                               field.onChange(newGenres)
//                               input.value = ''
//                             }
//                           }
//                         }}
//                       />
//                     </div>
//                   </FormControl>
//                   <FormDescription>Press Enter to add a new genre</FormDescription>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="coverImage"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Cover Image URL</FormLabel>
//                   <FormControl>
//                     <Input placeholder="https://example.com/cover.jpg" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="bannerImage"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Banner Image URL</FormLabel>
//                   <FormControl>
//                     <Input placeholder="https://example.com/banner.jpg" {...field} />
//                   </FormControl>
//                   <FormDescription>Optional banner image</FormDescription>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Seasons and Episodes</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <Accordion type="single" collapsible className="w-full">
//               {seasonFields.map((season, seasonIndex) => (
//                 <AccordionItem key={season.id} value={`season-${seasonIndex}`}>
//                   <AccordionTrigger>Season {seasonIndex + 1}</AccordionTrigger>
//                   <AccordionContent>
//                     <div className="space-y-4">
//                       <FormField
//                         control={form.control}
//                         name={`seasons.${seasonIndex}.id`}
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel>Season ID</FormLabel>
//                             <FormControl>
//                               <Input {...field} />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
//                       <FormField
//                         control={form.control}
//                         name={`seasons.${seasonIndex}.number`}
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel>Season Number</FormLabel>
//                             <FormControl>
//                               <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
//                       <FormField
//                         control={form.control}
//                         name={`seasons.${seasonIndex}.title`}
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel>Season Title</FormLabel>
//                             <FormControl>
//                               <Input {...field} />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
//                       <div>
//                         <h4 className="text-sm font-medium mb-2">Episodes</h4>
//                         {form.watch(`seasons.${seasonIndex}.episodes`)?.map((episode, episodeIndex) => (
//                           <Accordion key={episode.id} type="single" collapsible className="w-full mb-4">
//                             <AccordionItem value={`episode-${episodeIndex}`}>
//                               <AccordionTrigger>Episode {episodeIndex + 1}</AccordionTrigger>
//                               <AccordionContent>
//                                 <div className="space-y-4">
//                                   <FormField
//                                     control={form.control}
//                                     name={`seasons.${seasonIndex}.episodes.${episodeIndex}.id`}
//                                     render={({ field }) => (
//                                       <FormItem>
//                                         <FormLabel>Episode ID</FormLabel>
//                                         <FormControl>
//                                           <Input {...field} />
//                                         </FormControl>
//                                         <FormMessage />
//                                       </FormItem>
//                                     )}
//                                   />
//                                   <FormField
//                                     control={form.control}
//                                     name={`seasons.${seasonIndex}.episodes.${episodeIndex}.number`}
//                                     render={({ field }) => (
//                                       <FormItem>
//                                         <FormLabel>Episode Number</FormLabel>
//                                         <FormControl>
//                                           <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
//                                         </FormControl>
//                                         <FormMessage />
//                                       </FormItem>
//                                     )}
//                                   />
//                                   <FormField
//                                     control={form.control}
//                                     name={`seasons.${seasonIndex}.episodes.${episodeIndex}.title`}
//                                     render={({ field }) => (
//                                       <FormItem>
//                                         <FormLabel>Episode Title</FormLabel>
//                                         <FormControl>
//                                           <Input {...field} />
//                                         </FormControl>
//                                         <FormMessage />
//                                       </FormItem>
//                                     )}
//                                   />
//                                   <FormField
//                                     control={form.control}
//                                     name={`seasons.${seasonIndex}.episodes.${episodeIndex}.duration`}
//                                     render={({ field }) => (
//                                       <FormItem>
//                                         <FormLabel>Duration (minutes)</FormLabel>
//                                         <FormControl>
//                                           <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
//                                         </FormControl>
//                                         <FormMessage />
//                                       </FormItem>
//                                     )}
//                                   />
//                                   <FormField
//                                     control={form.control}
//                                     name={`seasons.${seasonIndex}.episodes.${episodeIndex}.description`}
//                                     render={({ field }) => (
//                                       <FormItem>
//                                         <FormLabel>Description</FormLabel>
//                                         <FormControl>
//                                           <Textarea {...field} />
//                                         </FormControl>
//                                         <FormMessage />
//                                       </FormItem>
//                                     )}
//                                   />
//                                   <FormField
//                                     control={form.control}
//                                     name={`seasons.${seasonIndex}.episodes.${episodeIndex}.thumbnail`}
//                                     render={({ field }) => (
//                                       <FormItem>
//                                         <FormLabel>Thumbnail URL</FormLabel>
//                                         <FormControl>
//                                           <Input {...field} />
//                                         </FormControl>
//                                         <FormMessage />
//                                       </FormItem>
//                                     )}
//                                   />
//                                   <FormField
//                                     control={form.control}
//                                     name={`seasons.${seasonIndex}.episodes.${episodeIndex}.airDate`}
//                                     render={({ field }) => (
//                                       <FormItem className="flex flex-col">
//                                         <FormLabel>Air Date</FormLabel>
//                                         <Popover>
//                                           <PopoverTrigger asChild>
//                                             <FormControl>
//                                               <Button
//                                                 variant={"outline"}
//                                                 className={cn(
//                                                   "w-[240px] pl-3 text-left font-normal",
//                                                   !field.value && "text-muted-foreground"
//                                                 )}
//                                               >
//                                                 {field.value ? (
//                                                   format(field.value, "PPP")
//                                                 ) : (
//                                                   <span>Pick a date</span>
//                                                 )}
//                                                 <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
//                                               </Button>
//                                             </FormControl>
//                                           </PopoverTrigger>
//                                           <PopoverContent className="w-auto p-0" align="start">
//                                             <Calendar
//                                               mode="single"
//                                               selected={field.value}
//                                               onSelect={field.onChange}
//                                               disabled={(date) =>
//                                                 date > new Date() || date < new Date("1900-01-01")
//                                               }
//                                               initialFocus
//                                             />
//                                           </PopoverContent>
//                                         </Popover>
//                                         <FormMessage />
//                                       </FormItem>
//                                     )}
//                                   />
//                                   <div>
//                                     <h5 className="text-sm font-medium mb-2">Video Sources</h5>
//                                     {form.watch(`seasons.${seasonIndex}.episodes.${episodeIndex}.videoSources`)?.map((source, sourceIndex) => (
//                                       <div key={sourceIndex} className="space-y-4 mb-4">
//                                         <FormField
//                                           control={form.control}
//                                           name={`seasons.${seasonIndex}.episodes.${episodeIndex}.videoSources.${sourceIndex}.quality`}
//                                           render={({ field }) => (
//                                             <FormItem>
//                                               <FormLabel>Quality</FormLabel>
//                                               <Select onValueChange={field.onChange} defaultValue={field.value}>
//                                                 <FormControl>
//                                                   <SelectTrigger>
//                                                     <SelectValue placeholder="Select quality" />
//                                                   </SelectTrigger>
//                                                 </FormControl>
//                                                 <SelectContent>
//                                                   {Object.values(VideoQuality).map((quality) => (
//                                                     <SelectItem key={quality} value={quality}>
//                                                       {quality}
//                                                     </SelectItem>
//                                                   ))}
//                                                 </SelectContent>
//                                               </Select>
//                                               <FormMessage />
//                                             </FormItem>
//                                           )}
//                                         />
//                                         <FormField
//                                           control={form.control}
//                                           name={`seasons.${seasonIndex}.episodes.${episodeIndex}.videoSources.${sourceIndex}.format`}
//                                           render={({ field }) => (
//                                             <FormItem>
//                                               <FormLabel>Format</FormLabel>
//                                               <FormControl>
//                                                 <Input {...field} />
//                                               </FormControl>
//                                               <FormMessage />
//                                             </FormItem>
//                                           )}
//                                         />
//                                         <FormField
//                                           control={form.control}
//                                           name={`seasons.${seasonIndex}.episodes.${episodeIndex}.videoSources.${sourceIndex}.url`}
//                                           render={({ field }) => (
//                                             <FormItem>
//                                               <FormLabel>URL</FormLabel>
//                                               <FormControl>
//                                                 <Input {...field} />
//                                               </FormControl>
//                                               <FormMessage />
//                                             </FormItem>
//                                           )}
//                                         />
//                                       </div>
//                                     ))}
//                                     <Button
//                                       type="button"
//                                       variant="outline"
//                                       size="sm"
//                                       className="mt-2"
//                                       onClick={() => {
//                                         const currentSources = form.getValues(`seasons.${seasonIndex}.episodes.${episodeIndex}.videoSources`) || []
//                                         form.setValue(`seasons.${seasonIndex}.episodes.${episodeIndex}.videoSources`, [
//                                           ...currentSources,
//                                           { quality: VideoQuality.P720, format: '', url: '' }
//                                         ])
//                                       }}
//                                     >
//                                       Add Video Source
//                                     </Button>
//                                   </div>
//                                 </div>
//                               </AccordionContent>
//                             </AccordionItem>
//                           </Accordion>
//                         ))}
//                         <Button
//                           type="button"
//                           variant="outline"
//                           size="sm"
//                           className="mt-2"
//                           onClick={() => {
//                             const currentEpisodes = form.getValues(`seasons.${seasonIndex}.episodes`) || []
//                             form.setValue(`seasons.${seasonIndex}.episodes`, [
//                               ...currentEpisodes,
//                               {
//                                 id: '',
//                                 number: currentEpisodes.length + 1,
//                                 title: '',
//                                 duration: 0,
//                                 description: '',
//                                 thumbnail: '',
//                                 airDate: new Date(),
//                                 videoSources: []
//                               }
//                             ])
//                           }}
//                         >
//                           Add Episode
//                         </Button>
//                       </div>
//                     </div>
//                   </AccordionContent>
//                 </AccordionItem>
//               ))}
//             </Accordion>
//             <Button
//               type="button"
//               variant="outline"
//               size="sm"
//               className="mt-4"
//               onClick={() => appendSeason({ id: '', number: seasonFields.length + 1, title: '', episodes: [] })}
//             >
//               Add Season
//             </Button>
//           </CardContent>
//         </Card>

//         <Button type="submit">Submit</Button>
//       </form>
//     </Form>
//   )
// }

