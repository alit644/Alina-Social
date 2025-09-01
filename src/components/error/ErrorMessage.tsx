import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function ErrorMessage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
     {/* git */}
     <img loading="lazy" src="/gif.gif" alt="Oops, Not Found" width={'150px'} height={'150px'} className="object-contain mx-auto select-none pointer-events-none"/>
      <h1 className="text-2xl font-bold">Oops, Not Found</h1>
      {/* Short description */}
      <p className="text-md md:text-lg text-gray-600 dark:text-gray-300 mt-4 max-w-lg">
        Looks like you’ve hit a page that doesn’t exist. Let’s get you back on
        track!
      </p>
      

      {/* Buttons */}
      <div className="flex gap-4 mt-8">
        <Button variant="outline" className="px-6 py-3 text-lg ">
          <Link to="/">Go to Homepage</Link>
        </Button>
      </div>
    </div>
  );
}
