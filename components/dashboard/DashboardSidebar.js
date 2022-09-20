import React, { useContext, useState } from "react";
import Link from "next/link";
import { Grid, Typography } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import { DEFAULT_COLOR, DEFAULT_COLOR_MINUS_2 } from "../../misc/colors";
import { Context } from "../../contexts/user-context/UserContext";
import { DASHBOARD_ROUTES } from "./Routes";

const DashboardSidebar = () => {
  const classes = useStyles();

  const [selected, setSelected] = useState(0);
  const { getRole } = useContext(Context);
  const handleClickTest = (index) => {
    setSelected(index);
  };

  return (
    <Grid className={classes.ccrt__dashboard__sidebar__container}>
      <Grid
        container
        justifyContent="center"
        className={classes.ccrt__dashboard__sidebar__header}
      >
        <Typography>Dashboard kit</Typography>
      </Grid>
      <Grid container className={classes.ccrt__dashboard__sidebar__menu}>
        <ul className={classes.ccrt__dashboard__sidebar__menu__items}>
          {DASHBOARD_ROUTES.map((item, index) => {
            if (item.allowedRoles.includes(getRole())) {
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
            }
            return null;
          })}
        </ul>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles(() =>
  createStyles({
    ccrt__dashboard__sidebar__container: {
      padding: "10px 0",
      minHeight: "100vh",
      width: "100%",
    },
    ccrt__dashboard__sidebar__header: {
      color: "#FFFFFF",
      textTransform: "capitalize",
      borderBottom: "2px solid #ffffff",
      paddingBottom: "10px",
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
      "&:hover": {
        background: DEFAULT_COLOR,
        borderLeft: "5px solid #FFFFFF",
      },
    },
    ccrt__dashboard__sidebar__menu__item__link: {
      textDecoration: "none",
      color: "#FFF",
      width: "100%",
      cursor: "pointer",
      padding: "10px",
      fontSize: "85%",
      fontWeight: "500",
    },
    ccrt__dashboard__sidebar__menu__item__active: {
      background: DEFAULT_COLOR,
      cursor: "pointer",
      borderLeft: "5px solid #FFFFFF",
    },
  })
);
export default DashboardSidebar;
