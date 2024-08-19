import React from "react";
import { useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Movie } from "../api/fetch-movies";
import { Button } from "../components/ui/button";
import { ItemContext } from "../context";

export default React.memo(function MovieCard({ movie }: { movie: Movie }) {
  const { onItemSelect } = useContext(ItemContext);
  const router = useRouter();

  const handleDetail = (movie: Movie) => {
    onItemSelect(movie);
    router.push(`/detail?id=${movie.id}`);
  };

  return (
    <div
      className="bg-white shadow-md rounded-lg p-4 border-t max-w-sm mx-auto w-[260px] h-[380px] hover:shadow-xl transition-shadow duration-300 ease-in-out cursor-pointer"
      key={movie.id}
    >
      <Image
        src={movie.poster}
        alt={`Poster of ${movie.title}`}
        className="w-full h-52 object-cover rounded-lg"
        width={320}
        height={360}
      />
      <div className="mt-2">
        <h2 className="text-lg text-gray-600 font-semibold">{movie.title}</h2>
        <p className="text-gray-600 text-sm">{movie.genre}</p>
        <p className="mt-1 text-gray-400">Rate: {movie.rating || 0}</p>
        <p className="text-gray-400 text-sm">
          Release Date: {movie.releaseDate}
        </p>
        <p>
          <Button
            variant="link"
            onClick={() => handleDetail(movie)}
            className="ml-[-14px]"
          >
            View details
          </Button>
        </p>
      </div>
    </div>
  );
});
