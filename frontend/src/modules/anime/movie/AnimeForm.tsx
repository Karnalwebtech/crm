"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AnimeDetails } from "./AnimeDetails"
import { SeasonsList } from "./SeasonsList"
import { AnimeFormValues, animeSchema } from "@/zod-schemas/anime/animeSchema"

export function AnimeForm() {
  const [alternativeTitles, setAlternativeTitles] = useState<string[]>([])
  const [genres, setGenres] = useState<string[]>([])

  const form = useForm<AnimeFormValues>({
    resolver: zodResolver(animeSchema),
    defaultValues: {
      alternativeTitles: [],
      genres: [],
      seasons: [{ id: "", number: 1, title: "", episodes: [] }],
    },
  })

  function onSubmit(values: AnimeFormValues) {
    console.log(values)
    // Here you would typically send the data to your backend
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Anime Details</CardTitle>
          </CardHeader>
          <CardContent>
            <AnimeDetails
              form={form}
              alternativeTitles={alternativeTitles}
              setAlternativeTitles={setAlternativeTitles}
              genres={genres}
              setGenres={setGenres}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Seasons and Episodes</CardTitle>
          </CardHeader>
          <CardContent>
            <SeasonsList form={form} />
          </CardContent>
        </Card>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

