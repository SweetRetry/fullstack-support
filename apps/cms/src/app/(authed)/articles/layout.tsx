"use client";

import React from "react";

const layout = (props: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) => {
  return (
    <>
      {props.children}
      {props.modal}
    </>
  );
};

export default layout;
