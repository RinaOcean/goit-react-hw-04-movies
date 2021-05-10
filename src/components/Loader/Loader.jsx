import BounceLoader from 'react-spinners/BounceLoader';
import { css } from '@emotion/core';
const override = css`
  z-index: 10000;
  position: absolute;
  top: 50%;
  left: 50%;
`;
const Loader = () => <BounceLoader color={'#744b81'} css={override} />;

export default Loader;
