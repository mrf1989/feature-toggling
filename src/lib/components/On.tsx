import React, { Fragment, ReactNode } from "react";

export const On = (args: { children: ReactNode, featureToggleEnabled?: boolean }) => (
  <Fragment>{args.featureToggleEnabled && args.children}</Fragment>
);
