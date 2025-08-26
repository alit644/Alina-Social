import type { INotification } from "@/interfaces";
import MAvatar from "./shared/MAvatar";
import dayjs from "@/helper/dayjs";
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

export default NotificationsCard;

// -- WARNING: This schema is for context only and is not meant to be run. -- Table order and constraints may not be valid for execution. CREATE TABLE public.comments ( id uuid NOT NULL DEFAULT uuid_generate_v4(), post_id uuid, user_id uuid, content text NOT NULL, created_at timestamp with time zone DEFAULT now(), CONSTRAINT comments_pkey PRIMARY KEY (id), CONSTRAINT comments_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id), CONSTRAINT fk_comments_user FOREIGN KEY (user_id) REFERENCES public.profiles(id), CONSTRAINT comments_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(id) ); CREATE TABLE public.friend_requests ( id uuid NOT NULL DEFAULT gen_random_uuid(), sender_id uuid NOT NULL, receiver_id uuid NOT NULL, status text NOT NULL DEFAULT 'pending'::text CHECK (status = ANY (ARRAY['pending'::text, 'accepted'::text, 'rejected'::text])), created_at timestamp without time zone DEFAULT now(), CONSTRAINT friend_requests_pkey PRIMARY KEY (id), CONSTRAINT fk_sender FOREIGN KEY (sender_id) REFERENCES public.profiles(id), CONSTRAINT fk_receiver FOREIGN KEY (receiver_id) REFERENCES public.profiles(id) ); CREATE TABLE public.likes ( id uuid NOT NULL DEFAULT gen_random_uuid(), post_id uuid, user_id uuid, created_at timestamp with time zone DEFAULT now(), CONSTRAINT likes_pkey PRIMARY KEY (id), CONSTRAINT fk_post FOREIGN KEY (post_id) REFERENCES public.posts(id), CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES public.profiles(id), CONSTRAINT likes_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(id), CONSTRAINT likes_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id) ); CREATE TABLE public.notifications ( id uuid NOT NULL DEFAULT gen_random_uuid(), user_id uuid NOT NULL, sender_id uuid, type text NOT NULL, content text, post_id uuid, is_read boolean DEFAULT false, created_at timestamp without time zone DEFAULT now(), CONSTRAINT notifications_pkey PRIMARY KEY (id), CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES public.profiles(id), CONSTRAINT fk_sender FOREIGN KEY (sender_id) REFERENCES public.profiles(id) ); CREATE TABLE public.posts ( id uuid NOT NULL DEFAULT gen_random_uuid(), user_id uuid, content text, image_url text, created_at timestamp with time zone DEFAULT now(), likes_count integer DEFAULT 0, CONSTRAINT posts_pkey PRIMARY KEY (id), CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES public.profiles(id), CONSTRAINT posts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id) ); CREATE TABLE public.profiles ( id uuid NOT NULL, username text NOT NULL, email text NOT NULL UNIQUE, avatar_url text, bio text, created_at timestamp with time zone DEFAULT now(), full_name text, CONSTRAINT profiles_pkey PRIMARY KEY (id), CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id) );
