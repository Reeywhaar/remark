/** @jsx createElement */
import { createElement, FunctionComponent } from 'react';

import { Comment as CommentType } from '@app/common/types';

import { Comment } from '../comment';
import Preloader from '../preloader';

interface Props {
  comments: CommentType[];
  isLoading: boolean;
}

const LastCommentsList: FunctionComponent<Props> = ({ comments, isLoading }) => {
  if (isLoading) {
    return <Preloader mix="user-info__preloader" />;
  }

  return (
    <div>
      {comments.map(comment => (
        <Comment
          key={`comment-${comment.id}`}
          data={comment}
          level={0}
          view="user"
          user={null}
          isCommentsDisabled={false}
          theme="light"
          post_info={null}
        />
      ))}
    </div>
  );
};

export default LastCommentsList;
