import { memo, useCallback } from "react";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import MAvatar from "./MAvatar";
import type { IFriend } from "@/interfaces";
import { useFriendsStore } from "@/store/useFriends";
import { Link } from "react-router";

const FriendsCard = ({ data }: { data: IFriend }) => {
  const { addFriend, isLoading } = useFriendsStore();
  const handleAddFriend = useCallback(async () => {
    await addFriend(data.id);
  }, [data.id, addFriend]);

  return (
    <article
      className={`flex justify-between items-center gap-2 not-last:mb-4`}
    >
      <Link to={`/user/${data.id}`}>
        <div className={`flex items-center gap-2 `}>
          <MAvatar
            src={data.avatar_url || ""}
            name={data.full_name || ""}
            className="size-[50px]"
          />
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold">{data.full_name} </h3>
            <p className="text-sm text-gray-500">@{data.username}</p>
          </div>
        </div>
      </Link>
      <div className="flex flex-col items-end">
        <Button
          variant="ghost"
          size="icon"
          className="text-end bg-[var(--neutral-50)] hover:bg-[var(--neutral-100)] animate-accordion-up"
          onClick={handleAddFriend}
          disabled={isLoading}
        >
          <Plus className="h-5 w-5 text-[var(--neutral-500)] hover:text-[var(--primary-900)]" />
        </Button>
      </div>
    </article>
  );
};

export default memo(FriendsCard);
