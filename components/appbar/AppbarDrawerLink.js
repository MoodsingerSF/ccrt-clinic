import React from "react";
import Link from "next/link";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import PropTypes from "prop-types";
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

AppbarDrawerLink.propTypes = {
  link: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
};

export default AppbarDrawerLink;
