import { z } from "zod";

export const movieDtoSchema = z.object({
    Title: z.string(),
    Year: z.coerce.number(),
    Released: z.string(),
    Runtime: z.string(),
    Genre: z.string(),
    Director: z.string(),
    Actors: z.string(),
    Plot: z.string(),
    Poster: z.string()
});

export type MovieDto = z.infer<typeof movieDtoSchema>;
