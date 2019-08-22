import React from "react";
import { addReplyDeep } from "./App";

describe("replying to a comment", () => {
  let comments;
  let reply;

  let commentNoReplies;
  let commentWithReplies;

  beforeEach(() => {
    commentNoReplies = {
      id: "1",
      replies: []
    };

    commentWithReplies = {
      id: "1",
      replies: [
        {
          id: "2",
          replies: [
            {
              id: "3",
              replies: []
            }
          ]
        }
      ]
    };

    comments = [commentNoReplies];

    reply = {
      id: "reply",
      replies: []
    };
  });

  it("should reply to top level", () => {
    expect(addReplyDeep(comments, "1", reply)).toEqual([
      {
        id: "1",
        replies: [reply]
      }
    ]);
  });

  it("should reply to a reply", () => {
    const result = addReplyDeep([commentWithReplies], "2", reply);
    expect(result[0].replies[0].replies).toHaveLength(2);
  });
});
