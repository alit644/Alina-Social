export interface ILoginInput {
  id: string;
  name: "email" | "password";
  type: "email" | "password";
  placeholder: string;
  validation: {
    required?: string;
    pattern?: RegExp;
    min?: number;
    max?: number;
  };
}

export interface IRegisterInput {
  id: string;
  name: "email" | "password" | "username" | "name";
  type: "email" | "password" | "text";
  placeholder: string;
  validation: {
    required?: string;
    pattern?: RegExp;
    min?: number;
    max?: number;
  };
}

export interface IGeneralInput {
  id: string;
  name: "full_name" | "username";
  type: "text" | "email" | "password";
  placeholder: string;
  validation: {
    required?: string;
    pattern?: RegExp;
    min?: number;
    max?: number;
  };
}

export interface ISignUpData {
  email: string;
  password: string;
  name: string;
  username: string;
}

export interface ISignInData {
  email: string;
  password: string;
}

export interface IProfile {
  id: string;
  full_name: string;
  username: string;
  email: string;
  bio: string;
  avatar_url: string;
}

export interface IPost {
  id: string;
  content: string;
  image_url: string;
  user_id: string;
  created_at: string;
  comment_count?: number;
  author_name?: string;
  author_avatar?: string;
  author_id?: string;
  is_liked? :boolean
  likes_count?: number
  profiles?: {
    avatar_url: string;
    full_name: string;
    username: string;
  };
}

export interface IComment {
  id: string;
  content: string;
  user_id: string;
  post_id: string;
  created_at: string;
  profiles?: {
    id?: string;
    avatar_url: string;
    full_name: string;
    username: string;
  };
}
export interface IFriend {
  id: string;
  full_name: string;
  username: string;
  email?: string;
  bio?: string;
  avatar_url?: string;
}

export interface IFriendRequest {
  id: string;
  status: "pending" | "accepted" | "rejected";
  created_at: string;
  sender?: {
    id: string;
    full_name: string;
    username: string;
    avatar_url: string;
  };
  receiver?: {
    id: string;
    full_name: string;
    username: string;
    avatar_url: string;
  };
}
export interface IOutgoingRequest {
  id: string;
  created_at: string;
  receiver?: {
    id: string;
    full_name: string;
    username: string;
    avatar_url: string;
  };
  status: "pending";
}

export interface IMFriend {
  id: string;
  full_name: string;
  username: string;
  avatar_url: string;
  friend_request_id: string;
}

export interface INotification {
  content: string;
  created_at: string;
  id: string;
  is_read: boolean;
  post_id: string;
  sender_id: string;
  type: "like" | "comment" | "friend_request";
  fk_sender?: {
    avatar_url: string;
    full_name: string;
    username: string;
  };
}
