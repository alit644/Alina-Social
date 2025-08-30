import FriendsCard from "@/components/shared/FriendsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import NoResults from "@/components/shared/NoResults";
import { Skeleton } from "@/components/ui/skeleton";
import type { IFriend } from "@/interfaces";
import useGetFriends from "@/hooks/friends/use-get-friends";
import { Button } from "@/components/ui/button";
const AllFriends = () => {
  const { data, isLoading , hasNextPage , fetchNextPage , isFetchingNextPage} = useGetFriends(6);
  const infiniteDataFriends = data?.pages.flatMap((page) => page?.data ?? []);

  const renderFriend = infiniteDataFriends?.map((friend: IFriend) => {
    return <FriendsCard key={friend.id} data={friend} />;
  });
  return (
    <Card className="shadow-none rounded-md">
      <CardHeader>
        <CardTitle className="H4">All Friends</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="px-2 sm:px-4">
        {isLoading ? (
          <div className="flex flex-col gap-4">
            <Skeleton className="h-[60px]" />
            <Skeleton className="h-[60px]" />
          </div>
        ) : infiniteDataFriends?.length !== undefined && infiniteDataFriends?.length > 0 ? (
          renderFriend
        ) : (
          <NoResults />
        )}
         {hasNextPage && (
                <Button
                  className="w-full mt-4 dark:bg-gray-800 dark:text-white"
                  onClick={() => fetchNextPage()}
                >
                  {isFetchingNextPage ? "Loading..." : "Load More"}
                </Button>
              )}
              {!hasNextPage &&
                !isLoading &&
                infiniteDataFriends?.length !== undefined &&
                infiniteDataFriends?.length > 0 && (
                  <div className="text-center py-6 text-muted-foreground text-sm">
                    You&apos;ve reached the end!
                  </div>
                )}
      </CardContent>
    </Card>
  );
};

export default AllFriends;
