/* eslint-disable react/prop-types */
import React, { useContext, useState } from "react";
import { Grid, Typography } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import { Context } from "../../contexts/user-context/UserContext";
import { DASHBOARD_ROUTES } from "./Routes";
import { findIndexOfActiveRoute } from "../../controllers/DashboardRouteController";
import { useRouter } from "next/router";

const DashboardSidebar = ({
  routeName,
  showMobile = false,
  onClose,
  onNegativeFeedback,
}) => {
  const classes = useStyles();
  const router = useRouter();
  const [selected, setSelected] = useState(findIndexOfActiveRoute(routeName));
  const { getRole } = useContext(Context);
  const handleClickTest = (index, path) => {
    router.push("/dashboard/" + path);
    setSelected(index);
  };

  return (
    <Grid className={classes.ccrt__dashboard__sidebar__container}>
      <Grid container>
        {showMobile ? null : (
          <Grid
            container
            justifyContent="center"
            className={classes.ccrt__dashboard__sidebar__header}
          >
            <Typography
              style={{
                color: "#FFFFFF",
                textTransform: "capitalize",
                fontSize: "100%",
                fontWeight: 500,
              }}
            >
              Dashboard
            </Typography>
          </Grid>
        )}
        <Grid container className={classes.ccrt__dashboard__sidebar__menu}>
          {DASHBOARD_ROUTES.map((item, index) => {
            if (item.allowedRoles.includes(getRole())) {
              return (
                <Grid
                  key={index}
                  container
                  // justifyContent={"flex-start"}
                  alignItems="center"
                  className={
                    selected === index
                      ? classes.ccrt__dashboard__sidebar__menu__item__active
                      : classes.ccrt__dashboard__sidebar__menu__item
                  }
                  onClick={
                    showMobile
                      ? () => {
                          handleClickTest(index, item.path),
                            onNegativeFeedback(),
                            onClose();
                        }
                      : () => handleClickTest(index, item.path)
                  }
                >
                  <>
                    {item.icon}
                    <Typography>
                      <Grid
                        container
                        className={
                          classes.ccrt__dashboard__sidebar__menu__item__link
                        }
                      >
                        {item.heading}
                      </Grid>
                    </Typography>
                  </>
                </Grid>
              );
            }
            return null;
          })}
        </Grid>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    ccrt__dashboard__sidebar__container: {
      padding: "10px 0",
    },
    ccrt__dashboard__sidebar__header: {
      borderBottom: `2px solid ${theme.palette.custom.GREEN}`,
      paddingBottom: "10px",
    },
    ccrt__dashboard__sidebar__menu: {
      paddingTop: "10px",
      overflowY: "auto",
    },
    ccrt__dashboard__sidebar__menu__items: {
      padding: "0",
      margin: "0",
      width: "100%",
      listStyle: "none",
    },
    ccrt__dashboard__sidebar__menu__item: {
      cursor: "pointer",
      borderLeft: `5px solid ${"transparent"}`,
      "&:hover": {
        background: theme.palette.custom.GREY,
        borderLeft: `5px solid ${theme.palette.custom.GREEN}`,
      },
    },
    ccrt__dashboard__sidebar__menu__item__link: {
      textDecoration: "none",
      color: "#FFF",
      width: "100%",
      cursor: "pointer",
      padding: "10px 0px",

      fontSize: "80%",
      fontWeight: "500",
    },
    ccrt__dashboard__sidebar__menu__item__active: {
      cursor: "pointer",
      borderLeft: `5px solid ${theme.palette.custom.GREEN}`,
    },
  })
);
export default DashboardSidebar;
