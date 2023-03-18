import React from "react";
import { useLink, TitleProps } from "@refinedev/core";
import { Button } from "@mui/material";

import {logo, yariga} from 'assets'

export const Title: React.FC<TitleProps> = ({ collapsed }) => {
  const Link = useLink();

  return (
    <Button fullWidth variant="text" disableRipple>
      <Link to="/dashboard">
        {collapsed ? (
          <img src={logo} alt="yariga" width="28px" />
        ) : (
      <img src={yariga} alt="yariga" width="140px" />
        )}
      </Link>
    </Button>
  );
};
