import { Skeleton } from "@/components/ui/skeleton";

const PostSkeleton = () => {
  return (
    <>
     <div className="mb-6">
     <Skeleton className="h-[134px] w-full rounded-xl" />

     </div>
      {Array.from({ length: 3 }).map((_, index) => (
        <div className="flex flex-col space-y-3 p-2 h-[333px]" key={index}>
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2 w-full">
              <Skeleton className="h-4" />
              <Skeleton className="h-4" />
            </div>
          </div>
          <Skeleton className="h-[260px] w-full rounded-xl" />
        </div>
      ))}
    </>
  );
};

export default PostSkeleton;
