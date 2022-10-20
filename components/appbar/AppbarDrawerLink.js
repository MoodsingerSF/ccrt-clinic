import React from "react";
import { ListItem, Typography } from "@mui/material";
import PropTypes from "prop-types";
const AppbarDrawerLink = ({ icon, name, onClick }) => {
  return (
    <ListItem style={{ padding: 0, margin: 0 }} onClick={onClick}>
      {icon}
      <Typography
        style={{
          fontSize: "80%",
          fontWeight: "500",
          color: "white",
          padding: "8px 0px",
        }}
      >
        {name}
      </Typography>
    </ListItem>
  );
};

AppbarDrawerLink.propTypes = {
  icon: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default AppbarDrawerLink;
