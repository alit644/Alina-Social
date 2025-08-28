import { Card, CardContent, CardFooter } from "@/components/ui/card";
import PostCount from "@/components/profile/PostCount";
import MAvatar from "@/components/shared/MAvatar";
import { memo, useCallback, useMemo } from "react";
import type { IProfile } from "@/interfaces";
import { useParams } from "react-router";
import { Button } from "@/components/ui/button";
import { Skeleton } from "../ui/skeleton";
import useAddFriend from "@/hooks/friends/use-add-friend";
import useGetMyFriends from "@/hooks/friends/use-my-friends";
import useUnFollow from "@/hooks/friends/use-unFollow";
import useGetProfileStats from "@/hooks/friends/use-get-profileStatus";
interface UserProfileCardProps {
  data?: Partial<IProfile>;
  isLoadingProfile: boolean;
}
const UserProfileCard = ({
  data = {},
  isLoadingProfile,
}: UserProfileCardProps) => {
  const { userID } = useParams();
  const { mutateAsync, isPending } = useAddFriend(userID || "");
  const { avatar_url = "", username = "", full_name = "", bio = "" } = data;
  const { data: profileStats } = useGetProfileStats(userID || "");
  const { data: myFriends } = useGetMyFriends();

  const isFriend = useMemo(() => {
    return myFriends?.some((friend) => friend.id === userID);
  }, [myFriends, userID]);

  const friendRequestID = useMemo(() => {
    return myFriends?.find((friend) => friend.id === userID)?.friend_request_id;
  }, [myFriends, userID]);

  const { mutateAsync: unFollowMutateAsync, isPending: unFollowIsPending } =
    useUnFollow(friendRequestID || "");
  const handleUnFollow = useCallback(async () => {
    await unFollowMutateAsync();
  }, [unFollowMutateAsync]);

  const handleAddFriend = useCallback(async () => {
    await mutateAsync();
    
  }, [mutateAsync]);
  return (
    <Card className=" shadow-none rounded-md m-0">
      {isLoadingProfile ? (
        <Skeleton className="h-[200px] w-full" />
      ) : (
        <>
          <CardContent className=" ">
            <section className="flex justify-between flex-wrap gap-1 ">
              <div
                className={`flex items-center flex-col sm:flex-row gap-4 sm:gap-2   `}
              >
                <MAvatar
                  src={avatar_url || ""}
                  name={username || ""}
                  className="size-[60px] sm:size-[50px]"
                />
                <div className="flex flex-col">
                  <h3 className="text-lg font-semibold">{full_name}</h3>
                  <p className="text-xs text-gray-500">@{username}</p>
                </div>
              </div>
              {/* bio */}
              <PostCount
                data={profileStats || { posts: 0, friends: 0 }}
                isNav={false}
              />
            </section>

            {/* bio */}
            {bio && (
              <div className="p2 mt-4">
                <p className="text-xs text-gray-500">{bio}</p>
              </div>
            )}
          </CardContent>

          <CardFooter>
            {isFriend ? (
              <div className="flex gap-2 w-full">
                <Button
                  variant="outline"
                  size={"lg"}
                  className="w-full md:w-[200px] border-[var(--danger-500)] text-[var(--danger-300)] hover:text-[var(--danger-300)]"
                  onClick={handleUnFollow}
                  disabled={unFollowIsPending}
                >
                  Unfollow
                </Button>
                <Button
                  variant="outline"
                  size={"lg"}
                  className="w-full md:w-[200px]"
                >
                  Message
                </Button>
              </div>
            ) : (
              <div className="flex gap-2 w-full">
                <Button
                  variant="default"
                  size={"lg"}
                  className="w-full md:w-[200px] dark:bg-[var(--primary-900)] dark:text-[var(--primary-50)]"
                  onClick={handleAddFriend}
                  disabled={isPending}
                >
                  Follow
                </Button>
                <Button
                  variant="outline"
                  size={"lg"}
                  className="w-full md:w-[200px]"
                >
                  Message
                </Button>
              </div>
            )}
          </CardFooter>
        </>
      )}
    </Card>
  );
};

export default memo(UserProfileCard);
