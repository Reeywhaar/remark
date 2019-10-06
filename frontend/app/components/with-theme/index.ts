/** @jsx createElement */
import { ComponentType } from 'react';
import { connect, ConnectedComponent } from 'react-redux';
import { StoreState } from '@app/store';
import { Theme } from '@app/common/types';

const themeProvider = (state: StoreState) => ({ theme: state.theme });

/**
 * Connects redux theme property to component's
 */
function withTheme<P extends { theme: Theme }>(
  PlainComponent: ComponentType<P>
): ConnectedComponent<ComponentType<P>, Omit<P, 'theme'>> {
  return connect(
    themeProvider,
    {}
  )(PlainComponent as any);
}

export default withTheme;
