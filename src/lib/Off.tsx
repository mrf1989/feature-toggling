import React, { Fragment, ReactNode } from "react";

export const Off = (args: { children: ReactNode, featureToggleEnabled?: boolean }) => (
  <Fragment>{!args.featureToggleEnabled && args.children}</Fragment>
);
