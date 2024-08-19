import { Inter } from "next/font/google";
import { useCallback, useEffect, useState } from "react";
import fetchMovies, { Movie } from "../api/fetch-movies";
import MovieCard from "./card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [movieName, setMovieName] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  async function fetchData() {
    setLoading(true);
    try {
      const data = await fetchMovies({ q: movieName });
      setMovies(data?.data.data || []);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && movieName) {
        fetchData();
      }
    },
    [movieName]
  );

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <main className={`min-h-screen bg-white p-24 ${inter.className}`}>
        <div className="flex items-center justify-center gap-2 mb-6">
          <Input
            placeholder="Input name to search"
            value={movieName}
            onChange={(e) => setMovieName(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button type="button" onClick={fetchData} disabled={loading}>
            Search
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 gap-y-6">
          {movies.length > 0 &&
            movies.map((movie) => (
              <div key={movie.id}>
                <MovieCard key={movie.id} movie={movie} />
              </div>
            ))}
        </div>
      </main>
    </>
  );
}
