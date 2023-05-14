import React, { Fragment, ReactElement, useContext } from "react";
import { FeatureContext } from "..";

export const FeatureToogle = (args: { children: ReactElement | ReactElement[], feature: string }) => {
  const featureContext = useContext(FeatureContext);
  const pricing = featureContext.resolve() as any;

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
