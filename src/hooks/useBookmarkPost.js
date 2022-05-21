import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removePostFromBookmark, addPostToBookmark } from "../features";

export const useBookmarkPost = (post) => {
  const dispatch = useDispatch();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { user: authUser, token } = useSelector((store) => store.auth);
  const { posts } = useSelector((store) => store.posts);

  useEffect(() => {
    (() => {
      if (
        authUser.bookmarks.length > 0 &&
        Boolean(
          authUser.bookmarks.find((currPostId) => currPostId === post._id)
        )
      )
        setIsBookmarked(true);
      else setIsBookmarked(false);
    })();
  }, [post, authUser, posts]);

  const handleBookmark = () => {
    if (isBookmarked)
      dispatch(removePostFromBookmark({ postId: post._id, token }));
    else dispatch(addPostToBookmark({ postId: post._id, token }));
  };
  return { isBookmarked, handleBookmark };
};
