import React, { useState, useEffect } from "react";
import uuid from "uuid";
import styled from "styled-components";
import JavascriptTimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import ReactTimeAgo from "react-time-ago";
import faker from "faker";

JavascriptTimeAgo.locale(en);

const initialComments = [
  {
    id: "a936cbe8-6bbd-4591-98e3-6bb3c727baac",
    text: "Hey",
    timestamp: 1565969911147,
    user: {
      displayName: "Samiwel Thomas",
      avatar: "https://avatars2.githubusercontent.com/u/4097796?s=460&v=4"
    }
  }
];

const createComment = text => ({
  id: uuid.v4(),
  text,
  timestamp: Date.now(),
  user: createUser()
});

const createUser = options => ({
  displayName: faker.fake("{{name.firstName}} {{name.lastName}}"),
  avatar: faker.fake("{{image.avatar}}"),
  ...options
});

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const Sidebar = styled.div`
  width: calc((100vw / 12) * 2);
`;

const Timestamp = styled(ReactTimeAgo)`
  color: grey;
`;

export default () => {
  const [comments, setComments] = useState(initialComments);
  const [comment, setComment] = useState("");

  function submitComment(e) {
    e.preventDefault();
    e.stopPropagation();
    setComments([...comments, createComment(comment)]);
    setComment("");
  }

  useEffect(() => {
    console.log(comments);
  }, [comments]);

  return (
    <Container>
      <Sidebar>
        <p>
          This is a proof of concept for how commenting might work on EQ Author
        </p>

        {comments.length === 0 && <div>There are no comments to display</div>}

        {comments.length > 0 &&
          comments.map(comment => (
            <div key={comment.id}>
              <header>
                <div>
                  <img src={comment.user.avatar} width={32} />
                  {comment.user.displayName}
                </div>
                <Timestamp date={comment.timestamp} />
              </header>

              <p>{comment.text}</p>
            </div>
          ))}

        <form onSubmit={submitComment}>
          <input
            type="text"
            placeholder="Add a comment"
            value={comment}
            onChange={e => setComment(e.target.value)}
          />
        </form>
      </Sidebar>
    </Container>
  );
};
