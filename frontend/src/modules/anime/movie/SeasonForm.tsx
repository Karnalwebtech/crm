import { UseFormReturn } from "react-hook-form"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { EpisodesList } from "./EpisodesList"
import { AnimeFormValues } from "@/zod-schemas/anime/animeSchema"

interface SeasonFormProps {
  form: UseFormReturn<AnimeFormValues>
  seasonIndex: number
}

export function SeasonForm({ form, seasonIndex }: SeasonFormProps) {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name={`seasons.${seasonIndex}.id`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Season ID</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`seasons.${seasonIndex}.number`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Season Number</FormLabel>
            <FormControl>
              <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`seasons.${seasonIndex}.title`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Season Title</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <EpisodesList form={form} seasonIndex={seasonIndex} />
    </div>
  )
}

