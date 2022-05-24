import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";

/**
 * Posts can be added here.
 * You can add default posts of your wish with different attributes
 * */

export const posts = [
  {
    _id: "DJsssndsor",
    content:
      "ctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod  avoluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "adarshbalika",
    createdAt: "2022-02-25T10:55:06+05:30",
    updatedAt: formatDate(),
    comments: [
      {
        _id: uuid(),
        username: "john_ferguson",
        text: "Interesting",
        name: "John Ferguson",
        avatarURL:
          "https://res.cloudinary.com/doigywl1z/image/upload/v1652959071/avatar1_vkolbj.jpg",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
      {
        _id: uuid(),
        username: "natalieee",
        text: "Wow!",
        name: "Natalie Robinson",
        avatarURL:
          "https://res.cloudinary.com/doigywl1z/image/upload/v1652959062/avatar6_puj5vv.jpg",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
    ],
  },
  {
    _id: "dssdUfghSNSL",
    content:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui ",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "john_ferguson",

    comments: [
      {
        _id: uuid(),
        username: "john_ferguson",
        text: "Interesting",
        name: "John Ferguson",
        avatarURL:
          "https://res.cloudinary.com/doigywl1z/image/upload/v1652959071/avatar1_vkolbj.jpg",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
      {
        _id: uuid(),
        username: "natalieee",
        text: "Wow!",
        name: "Natalie Robinson",
        avatarURL:
          "https://res.cloudinary.com/doigywl1z/image/upload/v1652959062/avatar6_puj5vv.jpg",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
    ],
    createdAt: "2021-01-15T10:55:06+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: "sdfjUUsddeeEEH23",
    content:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui ",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "john_ferguson",

    comments: [
      {
        _id: uuid(),
        username: "john_ferguson",
        text: "Interesting",
        name: "John Ferguson",
        avatarURL:
          "https://res.cloudinary.com/doigywl1z/image/upload/v1652959071/avatar1_vkolbj.jpg",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
      {
        _id: uuid(),
        username: "natalieee",
        text: "Wow!",
        name: "Natalie Robinson",
        avatarURL:
          "https://res.cloudinary.com/doigywl1z/image/upload/v1652959062/avatar6_puj5vv.jpg",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
    ],
    createdAt: "2022-07-15T10:55:06+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: "dssdUSNfdfdfSL",
    content:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui ",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "natalieee",

    comments: [
      {
        _id: uuid(),
        username: "john_ferguson",
        text: "Interesting",
        name: "John Ferguson",
        avatarURL:
          "https://res.cloudinary.com/doigywl1z/image/upload/v1652959071/avatar1_vkolbj.jpg",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
      {
        _id: uuid(),
        username: "natalieee",
        text: "Wow!",
        name: "Natalie Robinson",
        avatarURL:
          "https://res.cloudinary.com/doigywl1z/image/upload/v1652959062/avatar6_puj5vv.jpg",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
    ],
    createdAt: "2022-10-15T10:55:06+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: "sdffdgfjUUEEH23",
    content:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui ",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "elijah12",

    comments: [
      {
        _id: uuid(),
        username: "john_ferguson",
        text: "Interesting",
        name: "John Ferguson",
        avatarURL:
          "https://res.cloudinary.com/doigywl1z/image/upload/v1652959071/avatar1_vkolbj.jpg",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
      {
        _id: uuid(),
        username: "natalieee",
        text: "Wow!",
        name: "Natalie Robinson",
        avatarURL:
          "https://res.cloudinary.com/doigywl1z/image/upload/v1652959062/avatar6_puj5vv.jpg",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
    ],
    createdAt: "2022-07-05T10:55:06+05:30",
    updatedAt: formatDate(),
  },
];
