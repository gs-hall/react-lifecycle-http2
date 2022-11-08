import React from "react";
import "../fa/css/font-awesome.min.css";

export default function Icon({icon, addClassName, ...rest}) {
  if (!icon) return null;
  return (
    <i className={"fa " + icon + (addClassName ? " " + addClassName : "")} {...rest} />
  );
};

