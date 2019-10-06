/** @jsx createElement */
import { createElement, Component, FocusEvent, ComponentProps } from 'react';
import b from 'bem-react-helper';

import noop from '@app/utils/noop';
import { Theme } from '@app/common/types';

type Props = {
  type?: string;
  kind?: string;
  theme: Theme;
  mix?: string;

  onClick?: (e: MouseEvent) => void;
  onFocus?: (e: FocusEvent) => void;
  onBlur?: (e: FocusEvent) => void;
} & ComponentProps<'button'>;

interface State {
  isClicked: boolean;
  isFocused: boolean;
}

export class Button extends Component<Props, State> {
  static defaultProps = {
    type: 'button',
    onClick: noop,
    onBlur: noop,
    onFocus: noop,
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      isClicked: false,
      isFocused: false,
    };

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  onMouseDown() {
    this.setState({
      isClicked: true,
    });
  }

  onClick(e: MouseEvent) {
    this.props.onClick!(e);
  }

  onBlur(e: FocusEvent<HTMLButtonElement>) {
    this.setState({
      isClicked: false,
      isFocused: false,
    });

    this.props.onBlur!(e);
  }

  onFocus(e: FocusEvent<HTMLButtonElement>) {
    this.setState({
      isFocused: true,
    });

    this.props.onFocus!(e);
  }

  render() {
    const { children, className, mix, theme, type, kind } = this.props;
    const { isClicked, isFocused } = this.state;

    let rclassName = b(
      'button',
      { mix: mix },
      { theme: theme, type: type, kind: kind, clicked: isClicked, focused: isFocused }
    );
    if (className) {
      rclassName +=
        ' ' + b(className, {}, { theme: theme, type: type, kind: kind, clicked: isClicked, focused: isFocused });
    }

    const localProps = { ...this.props };
    delete localProps.children;
    delete localProps.mix;

    return (
      <button
        {...localProps}
        className={rclassName}
        onMouseDown={this.onMouseDown}
        onBlur={this.onBlur}
        onFocus={this.onFocus}
      >
        {children}
      </button>
    );
  }
}
