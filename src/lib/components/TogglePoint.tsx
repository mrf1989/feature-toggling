import React, { Fragment, ReactElement, useContext } from "react";
import { AppContext } from "../..";

export const TogglePoint = (args: { children: ReactElement | ReactElement[], feature: string }) => {
  const appContext = useContext(AppContext);
  const pricing = appContext.getFeatures() as any;

  if (!args.feature) {
    return null;
  }

  const toggledChildren = React.Children.map(args.children, (child) =>
    React.cloneElement(child, {
      featureToggleEnabled: pricing[args.feature],
    })
  );

  return (
    <Fragment>
      {toggledChildren}
    </Fragment>
  );
};
