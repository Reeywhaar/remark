/** @jsx createElement */
import { createElement, FunctionComponent } from 'react';
import b, { Mix } from 'bem-react-helper';

interface Props {
  mix?: Mix;
}

const Preloader: FunctionComponent<Props> = props => (
  <div className={b('preloader', props)}>
    <div className="preloader__bounce" />
    <div className="preloader__bounce" />
    <div className="preloader__bounce" />
  </div>
);

export default Preloader;
