import { UseFormReturn, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SeasonForm } from "./SeasonForm";
import { AnimeFormValues } from "@/zod-schemas/anime/animeSchema";

interface SeasonsListProps {
  form: UseFormReturn<AnimeFormValues>;
}

export function SeasonsList({ form }: SeasonsListProps) {
  const { fields: seasonFields, append: appendSeason } = useFieldArray({
    control: form.control,
    name: "seasons",
  });

  return (
    <div>
      <Accordion type="single" collapsible className="w-full">
        {seasonFields.map((season, index) => (
          <AccordionItem key={season.id} value={`season-${index}`}>
            <AccordionTrigger>Season {index + 1}</AccordionTrigger>
            <AccordionContent>
              <SeasonForm form={form} seasonIndex={index} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="mt-4"
        onClick={() =>
          appendSeason({
            id: "",
            number: seasonFields.length + 1,
            title: "",
            episodes: [],
          })
        }
      >
        Add Season
      </Button>
    </div>
  );
}
