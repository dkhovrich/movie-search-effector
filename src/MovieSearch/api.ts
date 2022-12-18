import { parse } from "date-fns";
import { MovieDto, movieDtoSchema } from "./schema";
import { Movie } from "./types";

const movieDtoToMovie = (movie: MovieDto): Movie => ({
    title: movie.Title,
    year: movie.Year,
    released: parse(movie.Released, "dd MMM yyyy", new Date()),
    runtime: movie.Runtime,
    genre: movie.Genre,
    director: movie.Director,
    actors: movie.Actors.split(", ").map(actor => actor.trim()),
    plot: movie.Plot,
    poster: movie.Poster
});

const API_KEY = "9f81b54f";

export async function fetchMovie(title: string): Promise<Movie> {
    const url = new URL("https://www.omdbapi.com");
    url.searchParams.set("apiKey", API_KEY);
    url.searchParams.set("t", title);

    const response = await fetch(url);
    const data = await response.json();

    const movieDto = movieDtoSchema.parse(data);
    return movieDtoToMovie(movieDto);
}
