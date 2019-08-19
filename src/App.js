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
  display: flex;
  flex-direction: column;
  width: calc((100vw / 12) * 3);
  height: 100vh;
  /* background: lightgray; */

  @media (max-width: 768px) {
    width: 100vw;
  }

  @media (max-width: 1024px) {
    width: calc((100vw / 12) * 4);
  }
`;

const Timestamp = styled(ReactTimeAgo)`
  color: grey;
`;

const CommentBox = styled.input`
  flex: 1 0 auto;
  padding: 0.5em 0.5em;
  font-size: 0.9em;
`;

const Avatar = styled.img`
  border-radius: 0.2em;
  margin-right: 0.5em;
  flex: 0 0 auto;
`;

const Comment = styled.div`
  margin: 0.2em 1em;
`;

const Form = styled.form`
  display: flex;
  flex-direction: row;
`;

const Hbox = styled.div`
  display: flex;
  flex-direction: row;
`;

const Name = styled.div`
  font-weight: bold;
  margin-right: 0.5em;
`;

const VBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const CommentText = styled.div`
  padding: 0.5em 0;
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
            <Comment key={comment.id}>
              <Hbox>
                <Avatar src={comment.user.avatar} width={42} height={42} />
                <VBox>
                  <Hbox>
                    <Name>{comment.user.displayName}</Name>
                    <Timestamp date={comment.timestamp} />
                  </Hbox>
                  <CommentText>{comment.text}</CommentText>
                </VBox>
              </Hbox>
            </Comment>
          ))}

        <Form onSubmit={submitComment}>
          <CommentBox
            type="text"
            placeholder="Add a comment"
            value={comment}
            onChange={e => setComment(e.target.value)}
          />
        </Form>
      </Sidebar>
    </Container>
  );
};
