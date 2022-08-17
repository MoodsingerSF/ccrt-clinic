import React, { useContext, useState } from "react";
import Link from "next/link";
import { Drawer, Typography, Box, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";
import { DEFAULT_COLOR, DEFAULT_COLOR_MINUS_2 } from "../../misc/colors";
import { Context } from "../../contexts/user-context/UserContext";
import { DASHBOARD_ROUTES } from "../dashboard/Routes";

const CustomDrawer = ({ isDrawerOpen, setIsDrawerOpen }) => {
  const classes = useStyles();
  const { getRole } = useContext(Context);
  const [selected, setSelected] = useState(0);

  const handleClickTest = (index) => {
    setSelected(index);
  };
  const userRole = getRole();
  // console.log(userRole);
  // console.log(userRole === Role.USER);
  return (
    <>
      <Drawer
        anchor="left"
        classes={{ paper: classes.paper }}
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <Box p={2} className={classes.ccrt__dashboard__drawer}>
          <Typography variant="h1" component="div">
            Dashboard
          </Typography>
        </Box>
        <Box className={classes.ccrt__dashboard__sidebar__menu}>
          <ul className={classes.ccrt__dashboard__sidebar__menu__items}>
            {DASHBOARD_ROUTES.map((item, index) => {
              console.log(item.allowedRoles.includes(userRole));
              if (item.allowedRoles.includes(userRole)) {
                return (
                  <li
                    key={index}
                    className={
                      selected === index
                        ? classes.ccrt__dashboard__sidebar__menu__item__active
                        : classes.ccrt__dashboard__sidebar__menu__item
                    }
                    onClick={() => handleClickTest(index)}
                  >
                    <Link href={item.path}>
                      <Grid
                        container
                        className={
                          classes.ccrt__dashboard__sidebar__menu__item__link
                        }
                      >
                        {item.heading}
                      </Grid>
                    </Link>
                  </li>
                );
              } else return null;
            })}
          </ul>
        </Box>
      </Drawer>
    </>
  );
};

const useStyles = makeStyles({
  paper: {
    background: DEFAULT_COLOR_MINUS_2,
  },
  ccrt__dashboard__drawer: {
    borderBottom: "2px solid #fff",
    color: "#fff",
    width: "300px",
  },
  ccrt__dashboard__sidebar__menu: {
    marginTop: "10px",
  },
  ccrt__dashboard__sidebar__menu__items: {
    padding: "0",
    margin: "0",
    width: "100%",
    listStyle: "none",
  },
  ccrt__dashboard__sidebar__menu__item: {
    cursor: "pointer",
    borderLeft: `5px solid ${DEFAULT_COLOR_MINUS_2}`,
  },
  ccrt__dashboard__sidebar__menu__item__link: {
    textDecoration: "none",
    color: "#fff",
    padding: "10px",
  },
  ccrt__dashboard__sidebar__menu__item__active: {
    background: DEFAULT_COLOR,
    color: "#ffffff",
    cursor: "pointer",
    borderLeft: "5px solid #FFFFFF",
  },
});

export default CustomDrawer;

CustomDrawer.propTypes = {
  isDrawerOpen: PropTypes.bool,
  setIsDrawerOpen: PropTypes.func,
};
