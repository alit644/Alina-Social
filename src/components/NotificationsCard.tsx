import type { INotification } from "@/interfaces";
import MAvatar from "./shared/MAvatar";
import dayjs from "@/helper/dayjs";
import { memo } from "react";
interface INotificationsCard {
  data: INotification;
}

const NotificationsCard = ({ data }: INotificationsCard) => {
  return (
    <div className="flex items-center justify-between p-4 not-last:border-b">
      <div className="flex items-center gap-2">
        <MAvatar
          src={data?.fk_sender?.avatar_url || ""}
          name={data?.fk_sender?.full_name || ""}
          className="size-[45px]"
        />
        <div>
          <h3 className="text-lg font-semibold">
            {data?.fk_sender?.full_name}
          </h3>
          <p className="text-sm text-[var(--neutral-600)]">{data?.content}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {/* time */}
        <span className="text-[var(--neutral-500)]">
          {dayjs(data?.created_at).fromNow()}
        </span>
        {/* is read */}
        {!data?.is_read&& (
          <span className="size-2 rounded-full bg-[var(--primary-900)]" />
        )}
      </div>
    </div>
  );
};

export default memo(NotificationsCard);

