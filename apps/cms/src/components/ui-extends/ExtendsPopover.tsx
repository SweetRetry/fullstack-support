"use client";
import React, { useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";

const ExtendsPopover = ({
  trigger,
  content,
}: {
  trigger: React.ReactElement;
  content: React.ReactElement;
}) => {
  const [open, setOpen] = useState(false);
  let closeTimer: number;

  const handleClose = () => {
    closeTimer = window.setTimeout(() => {
      setOpen(false);
    }, 200);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        asChild
        onMouseEnter={() => {
          closeTimer && clearTimeout(closeTimer);
          setOpen(true);
        }}
        onMouseLeave={() => handleClose()}
      >
        {trigger}
      </PopoverTrigger>
      <PopoverContent
        className="p-2"
        align="end"
        onMouseEnter={() => closeTimer && clearTimeout(closeTimer)}
        onMouseLeave={() => setOpen(false)}
      >
        {content}
      </PopoverContent>
    </Popover>
  );
};

export default ExtendsPopover;
