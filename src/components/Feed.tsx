import React, { useState, useEffect } from "react";
import styles from "./Feed.module.css";

import { db } from "../firebase";
import TweetInput from "./TweetInput";
import Post from "./Post";

const Feed: React.FC = () => {
  const [posts, setPosts] = useState([
    {
      id: "",
      avatar: "",
      image: "",
      text: "",
      timestamp: null,
      username: "",
    },
  ]);

  useEffect(() => {
    const unSub = db //unSubscriptionの関数がcollectionの戻り値
      .collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot(
        (
          snapshot //firebaseに何らかのデータがあるたびに処理が走る
        ) =>
          setPosts(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              avatar: doc.data().avatar,
              image: doc.data().image,
              text: doc.data().text,
              timestamp: doc.data().timestamp,
              username: doc.data().username,
            }))
          )
      );
    return () => {
      // クリーンナップ関数
      unSub();
    };
  }, []); // このコンポーネントがマウントされたときに1回だけ実行される

  return (
    <div className={styles.feed}>
      <TweetInput />

    {/* postが0件の場合にレンダリングさせないようにする */}
      {posts[0]?.id && (
        <>
          {posts.map((post) => (
            <Post
              key={post.id}
              postId={post.id}
              avatar={post.avatar}
              image={post.image}
              text={post.text}
              timestamp={post.timestamp}
              username={post.username}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default Feed;
