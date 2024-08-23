import React from "react";
import { Button, ButtonProps } from "../ui/button";
import { Loader2 } from "lucide-react";

const ButtonLoading: React.FC<{ loading: boolean } & ButtonProps> = ({
  loading,
  children,
  className,
  ...props
}) => {
  return (
    <Button disabled={loading} className={className} {...props}>
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  );
};

export default ButtonLoading;
