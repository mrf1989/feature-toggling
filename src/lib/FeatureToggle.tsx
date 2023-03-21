import React, { Fragment, ReactElement } from "react";
import { pricingState } from "../state";
import { useRecoilValue } from "recoil";

export const FeatureToogle = (args: { children: ReactElement | ReactElement[], feature: string }) => {
  const pricing = useRecoilValue(pricingState);
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
