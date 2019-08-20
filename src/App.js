import React, { useState } from "react";
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
    },
    replies: [
      {
        id: "a936cbe8-6bbd-4591-98e3-6bb3c727baacd",
        text: "This is a reply",
        timestamp: 1565969911147,
        user: {
          displayName: "Samiwel Thomas",
          avatar: "https://avatars2.githubusercontent.com/u/4097796?s=460&v=4"
        }
      }
    ]
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
  padding: 1em;
  display: flex;
  flex-direction: column;
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  /* background: lightgray; */
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

const CommentWrapper = styled.div`
  margin: 0.2em 1em;

  ${props => console.log(props.level)}
  ${props =>
    props.level > 0 && `margin-left: calc(0.2em + (${props.level} * 1em));`}
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

const Comment = ({ comment, level }) => {
  const [showReplyField, setShowReplyField] = useState(false);

  function replyButtonClicked() {
    setShowReplyField(!showReplyField);
  }

  return (
    <CommentWrapper level={level}>
      <Hbox>
        <Avatar src={comment.user.avatar} width={42} height={42} />
        <VBox>
          <Hbox>
            <Name>{comment.user.displayName}</Name>
            <Timestamp date={comment.timestamp} />
            <button
              type="button"
              onClick={replyButtonClicked}
              disabled={showReplyField}
            >
              Reply
            </button>
          </Hbox>
          <CommentText>{comment.text}</CommentText>
        </VBox>
      </Hbox>
      {comment.replies && comment.replies.length > 0 && (
        <CommentList
          comments={comment.replies}
          level={level + 1}
          parent={comment}
        />
      )}
      {showReplyField && (
        <InlineCommentForm
          placeholder={`Reply to ${comment.user.displayName.split(" ")[0]}`}
          onBlur={() => setShowReplyField(false)}
          autoFocus
        />
      )}
    </CommentWrapper>
  );
};

const CommentList = ({ comments, level }) => {
  if (comments.length === 0) {
    return <div>There are no comments to display</div>;
  }

  return (
    <>
      {comments.map(comment => {
        return <Comment key={comment.id} comment={comment} level={level} />;
      })}
    </>
  );
};

const InlineCommentForm = ({ onSubmit, placeholder, ...rest }) => {
  const [comment, setComment] = useState();

  function handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    onSubmit(comment);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <CommentBox
        type="text"
        placeholder={placeholder}
        value={comment}
        onChange={e => setComment(e.target.value)}
        {...rest}
      />
    </Form>
  );
};

export default () => {
  const [comments, setComments] = useState(initialComments);

  function submitComment(comment) {
    setComments([...comments, createComment(comment)]);
  }

  return (
    <Container>
      <Sidebar>
        <p>
          This is a proof of concept for how commenting might work on EQ Author
        </p>
        <CommentList comments={comments} level={0} />
        <InlineCommentForm
          onSubmit={submitComment}
          placeholder="Add a comment"
        />
      </Sidebar>
    </Container>
  );
};
