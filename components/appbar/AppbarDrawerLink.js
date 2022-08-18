import React from "react";
import Link from "next/link";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";

const AppbarDrawerLink = ({ link, icon, name }) => {
  return (
    <Link href={link}>
      <ListItem>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText
          disableTypography
          primary={name}
          style={{
            marginLeft: "-20px",
            fontSize: "80%",
            fontWeight: "600",
          }}
        />
      </ListItem>
    </Link>
  );
};

export default AppbarDrawerLink;
