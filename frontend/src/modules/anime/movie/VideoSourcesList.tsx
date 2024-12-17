import { UseFormReturn, useFieldArray } from "react-hook-form"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { VideoQuality } from "@/types/anime/anime"
import { AnimeFormValues } from "@/zod-schemas/anime/animeSchema"

interface VideoSourcesListProps {
  form: UseFormReturn<AnimeFormValues>
  seasonIndex: number
  episodeIndex: number
}

export function VideoSourcesList({ form, seasonIndex, episodeIndex }: VideoSourcesListProps) {
  const { fields: videoSourceFields, append: appendVideoSource } = useFieldArray({
    control: form.control,
    name: `seasons.${seasonIndex}.episodes.${episodeIndex}.videoSources`,
  })

  return (
    <div>
      <h5 className="text-sm font-medium mb-2">Video Sources</h5>
      {videoSourceFields.map((source, sourceIndex) => (
        <div key={sourceIndex} className="space-y-4 mb-4">
          <FormField
            control={form.control}
            name={`seasons.${seasonIndex}.episodes.${episodeIndex}.videoSources.${sourceIndex}.quality`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quality</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select quality" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(VideoQuality).map((quality) => (
                      <SelectItem key={quality} value={quality}>
                        {quality}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`seasons.${seasonIndex}.episodes.${episodeIndex}.videoSources.${sourceIndex}.format`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Format</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`seasons.${seasonIndex}.episodes.${episodeIndex}.videoSources.${sourceIndex}.url`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="mt-2"
        onClick={() => {
          const currentSources = form.getValues(`seasons.${seasonIndex}.episodes.${episodeIndex}.videoSources`) || []
          form.setValue(`seasons.${seasonIndex}.episodes.${episodeIndex}.videoSources`, [
            ...currentSources,
            { quality: VideoQuality.P720, format: '', url: '' }
          ])
        }}
      >
        Add Video Source
      </Button>
    </div>
  )
}

