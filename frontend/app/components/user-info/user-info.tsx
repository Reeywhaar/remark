/** @jsx createElement */
import { createElement, Component } from 'react';
import b from 'bem-react-helper';
import { connect } from 'react-redux';

import { StoreState } from '@app/store';
import { Comment } from '@app/common/types';
import { fetchInfo } from '@app/store/user-info/actions';
import { userInfo } from '@app/common/user-info-settings';

import LastCommentsList from './last-comments-list';
import { AvatarIcon } from '../avatar-icon';
import postMessage from '@app/utils/postMessage';
import { bindActions } from '@app/utils/actionBinder';

const boundActions = bindActions({ fetchInfo });

type Props = {
  comments: Comment[] | null;
} & typeof boundActions;

interface State {
  isLoading: boolean;
  error: string | null;
}

class UserInfo extends Component<Props, State> {
  state = { isLoading: true, error: null };

  componentWillMount(): void {
    if (!this.props.comments && this.state.isLoading) {
      this.props
        .fetchInfo()
        .then(() => {
          this.setState({ isLoading: false });
        })
        .catch(() => {
          this.setState({ isLoading: false, error: 'Something went wrong' });
        });
    }

    document.addEventListener('keydown', UserInfo.onKeyDown);
  }

  componentWillUnmount(): void {
    document.removeEventListener('keydown', UserInfo.onKeyDown);
  }

  render() {
    const user = userInfo;
    const { comments = [] } = this.props;
    const state = this.state;

    // TODO: handle
    if (!user) {
      return null;
    }

    return (
      <div className={b('user-info', {})}>
        <AvatarIcon mix="user-info__avatar" picture={user.picture} />
        <p className="user-info__title">Last comments by {user.name}</p>
        <p className="user-info__id">{user.id}</p>

        {!!comments && <LastCommentsList isLoading={state.isLoading} comments={comments} />}
      </div>
    );
  }

  /**
   * Global on `keydown` handler which is set on component mount.
   * Listens for user's `esc` key press
   */
  static onKeyDown(e: KeyboardEvent): void {
    // ESCAPE key pressed
    if (e.keyCode === 27) {
      postMessage({ isUserInfoShown: false });
    }
  }
}

export const ConnectedUserInfo = connect(
  (
    state: StoreState
  ): {
    comments: Comment[] | null;
  } => ({
    comments: state.userComments![userInfo.id!],
  }),
  boundActions
)(UserInfo);
