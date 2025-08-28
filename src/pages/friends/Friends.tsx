import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import NoResults from "@/components/shared/NoResults";
import MAvatar from "@/components/shared/MAvatar";
import { Button } from "@/components/ui/button";
import { useFriendsStore } from "@/store/useFriends";
import type { IMFriend } from "@/interfaces";
import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router";
import useGetMyFriends from "@/hooks/friends/use-my-friends";
const Friends = () => {
  const {  unFollow } = useFriendsStore();
  const queryClient = useQueryClient();
  const { data: friendsData , isLoading } = useGetMyFriends()

  const handleUnFollow = useCallback(
    async (friend_request_id: string) => {
      await unFollow(friend_request_id);
      queryClient.invalidateQueries({ queryKey: ["my-friends"] });
    },
    [unFollow, queryClient]
  );

  const renderMyFriends = friendsData?.map((item: IMFriend) => (
    <div
      className="flex justify-between items-center gap-3 not-last:mb-4 "
      key={item.id}
    >
      <Link to={`/user/${item.id}`} className="flex-1">
        <div className={`flex items-center gap-2 `}>
          <MAvatar
            src={item?.avatar_url || ""}
            name={item?.full_name || ""}
            className="size-[50px]"
          />
          <div className="flex flex-col">
            <h3 className="text-md sm:text-lg font-semibold">
              {item?.full_name}{" "}
            </h3>
            <p className="text-sm text-gray-500">@{item?.username}</p>
          </div>
        </div>
      </Link>

      {/* accept and reject */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          title="UnFollow"
          className="border-[var(--danger-200)] text-[var(--danger-500)] hover:bg-[var(--danger-200)] hover:border-[var(--danger-500)] hover:text-white"
          onClick={() => handleUnFollow(item.friend_request_id)}
          disabled={isLoading}
        >
          UnFollow
        </Button>
      </div>
    </div>
  ));
  return (
    <Card className="shadow-none rounded-md">
      <CardHeader>
        <CardTitle className="H4">My Friends</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="px-2 sm:px-4">
        {isLoading ? (
          <div className="flex flex-col gap-4">
            <Skeleton className="h-[60px]" />
            <Skeleton className="h-[60px]" />
          </div>
        ) : friendsData?.length !== undefined && friendsData?.length > 0 ? (
          renderMyFriends
        ) : (
          <NoResults />
        )}
      </CardContent>
    </Card>
  );
};

export default Friends;
