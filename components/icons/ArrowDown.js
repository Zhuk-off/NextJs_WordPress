import * as React from "react";
const SvgArrowDown = (props) => (
  <svg
    height="24"
    viewBox="0 0 24 24"
    width="24"
    className="arrow-down_svg__fill-current arrow-down_svg__text-3xl"
    {...props}
  >
    <path d="M24 24H0V0h24v24z" fill="none" opacity={0.87} />
    <path d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z" />
  </svg>
);
export default SvgArrowDown;
