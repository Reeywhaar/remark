/** @jsx createElement */
import { createElement, FunctionComponent } from 'react';
import b from 'bem-react-helper';
import { Theme } from '@app/common/types';

interface Props {
  picture?: string;
  mix?: string;
  theme?: Theme;
}

export const AvatarIcon: FunctionComponent<Props> = ({ mix, theme, picture }) => {
  return (
    <img
      className={b('avatar-icon', { mix: mix }, { theme: theme, default: !picture })}
      src={picture || require('./avatar-icon.svg')}
      alt=""
    />
  );
};
