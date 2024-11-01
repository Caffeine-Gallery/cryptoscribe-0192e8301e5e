import Text "mo:base/Text";

import Array "mo:base/Array";

actor {
    type Post = {
        title: Text;
        author: Text;
        body: Text;
    };

    stable var posts: [Post] = [];

    public func addPost(title: Text, author: Text, body: Text): async () {
        let newPost: Post = { title; author; body };
        posts := Array.append([newPost], posts);
    };

    public query func getPosts(): async [Post] {
        return posts;
    };
}
