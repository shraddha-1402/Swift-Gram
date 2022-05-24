const sortPosts = ({ posts, method }) => {
  switch (method) {
    case "Latest":
      return posts.sort(
        (post1, post2) => new Date(post2.createdAt) - new Date(post1.createdAt)
      );

    case "Trending":
      return posts.sort(
        (post1, post2) =>
          post2.likes.likeCount +
          post2.comments.length -
          (post1.likes.likeCount + post1.comments.length)
      );

    default:
      return posts;
  }
};

export { sortPosts };
