import { Grid, Typography } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import React, { useState } from "react";
import useSuggestions from "../../hooks/useSuggestions";
import { DASHBOARD_TITLE_MARGIN_TOP } from "../../misc/constants";
import CustomButton from "../button/CustomButton";
import LoaderComponent from "../misc/LoaderComponent";
import NoContentToShowComponent from "../misc/NoContentToShowComponent";
import DashboardTitle from "./DashboardTitle";
import SuggestionRow from "./SuggestionRow";

const SuggestionComp = () => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const { data: suggestions, hasMore, loading } = useSuggestions(page, 15);

  return (
    <Grid container>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ marginBottom: 10, marginTop: DASHBOARD_TITLE_MARGIN_TOP }}
      >
        <DashboardTitle title={"Suggestions"} />
      </Grid>
      <Grid container>
        {loading ? (
          <LoaderComponent />
        ) : suggestions.length === 0 ? (
          <NoContentToShowComponent title={"No suggestions to show."} />
        ) : (
          <Grid container>
            <table className={classes.ccrt__table}>
              <thead className={classes.ccrt__table__head}>
                <tr className={classes.ccrt__table__heading__row}>
                  <th
                    className={classes.ccrt__table__heading}
                    style={{ width: "20%" }}
                    align="left"
                  >
                    <Typography className={classes.titleStyle}>Name</Typography>
                  </th>
                  <th
                    className={classes.ccrt__table__heading}
                    style={{ width: "20%" }}
                  >
                    <Typography className={classes.titleStyle}>
                      Email
                    </Typography>
                  </th>
                  <th
                    className={classes.ccrt__table__heading}
                    style={{ width: "60%" }}
                  >
                    <Typography className={classes.titleStyle}>
                      Message
                    </Typography>
                  </th>
                </tr>
              </thead>
              <tbody>
                {suggestions.map((item, index) => {
                  return (
                    <SuggestionRow
                      key={item.id}
                      index={index}
                      name={item.name}
                      email={item.email}
                      message={item.message}
                    />
                  );
                })}
              </tbody>
            </table>
            <Grid container justifyContent={"center"} alignItems="center">
              <Grid item xs={12} sm={4}>
                {hasMore && (
                  <CustomButton
                    title={"Load More"}
                    onClick={() => setPage((prev) => prev + 1)}
                  />
                )}
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    ccrt__table: {
      background: "#fff",
      lineHeight: "1.25",
      marginBottom: "24px",
      width: "100%",
      borderCollapse: "collapse",
      borderSpacing: "0",
    },
    ccrt__table__head: {
      background: theme.palette.custom.BLACK,
    },
    ccrt__table__heading__row: {
      color: "#fff",
    },
    ccrt__table__heading: {
      padding: "18px 6px 18px 12px",
      fontSize: "90%",
      fontWeight: "500",
    },
    titleStyle: {
      color: "white",
      fontSize: "85%",
    },
  })
);

export default SuggestionComp;
