/** @jsx createElement */
import { createElement, FunctionComponent } from 'react';
import b from 'bem-react-helper';

interface Props {
  separator?: boolean;
}

export const DropdownItem: FunctionComponent<Props> = ({ separator = false, children }) => {
  return <div className={b('dropdown__item', {}, { separator })}>{children}</div>;
};
