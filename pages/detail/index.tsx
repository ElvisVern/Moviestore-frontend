import Link from "next/link";
import { useContext } from "react";
import Image from "next/image";
import { ItemContext } from "../../context";
import { Button } from "@/components/ui/button";
import Rate from "./rate";

function DetailPage() {
  const { item } = useContext(ItemContext);

  return (
    <div className="min-h-screen bg-white px-24 flex flex-col items-center justify-center ">
      <div className="mb-4 ml-[-2px]">
        <Button variant="link">
          <Link href="/">返回主页</Link>
        </Button>
      </div>

      {item && (
        <>
          <Image
            src={item.poster}
            alt={`Poster of ${item.title}`}
            className="h-52 object-cover rounded-lg"
            width={320}
            height={360}
          />
          <div className="my-4">
            <h2 className="text-lg text-gray-600 font-semibold">
              {item.title}
            </h2>
            <p className="text-gray-600 text-sm">{item.genre}</p>
            <p className="mt-1 text-gray-400">Rate: {item.rating || 0}</p>
            <p className="text-gray-400 text-sm">
              Published on: {item.releaseDate}
            </p>
          </div>
          <Rate movieId={item.id}></Rate>
        </>
      )}
    </div>
  );
}

export default DetailPage;
