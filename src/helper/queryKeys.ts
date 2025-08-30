export const queryKeys = {
 profile: (id?: string) => ["profile", id],
 profileStats: (id?: string) => ["profile", "stats", id],
 friends: (id?: string) => ["profile", "friends", id],
 outgoingRequests: (id?: string) => ["profile", "friends", "outgoing-requests", id],
 incomingRequests: (id?: string) => ["profile", "friends", "incoming-requests", id],

 posts: {
   all: ["posts", "all"],
   byUser: (id: string) => ["posts", "user", id],
   myPosts: (id?: string) => ["posts", "my-posts", id],
 },
};
