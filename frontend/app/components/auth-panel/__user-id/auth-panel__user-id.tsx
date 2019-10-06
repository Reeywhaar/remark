/** @jsx createElement */
import { createElement, ComponentProps, FunctionComponent } from 'react';
import b from 'bem-react-helper';
import { Theme } from '@app/common/types';

type Props = {
  id: string;
  theme: Theme;
} & Omit<ComponentProps<'div'>, 'ref'>;

export const UserID: FunctionComponent<Props> = ({ id, theme, ...props }) => (
  <div {...props} className={b('auth-panel__user-id', {}, { theme: theme })} title={id}>
    {id}
  </div>
);
