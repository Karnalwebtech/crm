import { UseFormReturn, useFieldArray } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { EpisodeForm } from "./EpisodeForm"
import { AnimeFormValues } from "@/zod-schemas/anime/animeSchema"

interface EpisodesListProps {
  form: UseFormReturn<AnimeFormValues>
  seasonIndex: number
}

export function EpisodesList({ form, seasonIndex }: EpisodesListProps) {
  const { fields: episodeFields, append: appendEpisode } = useFieldArray({
    control: form.control,
    name: `seasons.${seasonIndex}.episodes`,
  })

  return (
    <div>
      <h4 className="text-sm font-medium mb-2">Episodes</h4>
      <Accordion type="single" collapsible className="w-full">
        {episodeFields.map((episode, episodeIndex) => (
          <AccordionItem key={episode.id} value={`episode-${episodeIndex}`}>
            <AccordionTrigger>Episode {episodeIndex + 1}</AccordionTrigger>
            <AccordionContent>
              <EpisodeForm form={form} seasonIndex={seasonIndex} episodeIndex={episodeIndex} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="mt-2"
        onClick={() => appendEpisode({
          id: '',
          number: episodeFields.length + 1,
          title: '',
          duration: 0,
          description: '',
          thumbnail: '',
          airDate: new Date(),
          videoSources: []
        })}
      >
        Add Episode
      </Button>
    </div>
  )
}

