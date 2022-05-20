import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { dislikePost, likePost } from "../features";

export const useLikePosts = (post) => {
  const dispatch = useDispatch();
  const [isLiked, setLiked] = useState(false);
  const { user: authUser, token } = useSelector((store) => store.auth);
  const { posts } = useSelector((store) => store.posts);

  useEffect(() => {
    (() => {
      if (
        Boolean(
          post.likes.likedBy.find(
            (currUsername) => currUsername === authUser.username
          )
        )
      )
        setLiked(true);
      else setLiked(false);
    })();
  }, [post, authUser, posts]);

  const handlelikes = () => {
    if (isLiked) dispatch(dislikePost({ postId: post._id, token }));
    else dispatch(likePost({ postId: post._id, token }));
  };
  return { isLiked, handlelikes };
};
