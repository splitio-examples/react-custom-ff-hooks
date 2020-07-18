import { withSplitFactory } from "@splitsoftware/splitio-react";

const SDK_CONFIG = {
  core: {
    authorizationKey: process.env.REACT_APP_SPLIT_API_KEY,
    key: 'dev'
  },
  debug: true
};

const withSplit = withSplitFactory(SDK_CONFIG);
export default withSplit;
