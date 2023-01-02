import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import React, { useState } from "react";
import useSuggestions from "../../hooks/useSuggestions";
import { DASHBOARD_TITLE_MARGIN_TOP } from "../../misc/constants";
import CustomButton from "../button/CustomButton";
import NoContentToShowComponent from "../misc/NoContentToShowComponent";
import DashboardLoaderComponent from "./DashboardLoaderComponent";
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
        {loading && page === 0 ? (
          <DashboardLoaderComponent />
        ) : suggestions.length === 0 ? (
          <NoContentToShowComponent title={"No suggestions to show."} />
        ) : (
          <Grid container>
            <TableContainer>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell align="left">
                      <Typography className={classes.titleStyle}>
                        Name
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography className={classes.titleStyle}>
                        Email
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography className={classes.titleStyle}>
                        Message
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
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
                </TableBody>
              </Table>
            </TableContainer>
            <Grid container justifyContent={"center"} alignItems="center">
              <Grid item xs={12} sm={4}>
                {hasMore && (
                  <CustomButton
                    title={"Load More"}
                    onClick={() => setPage((prev) => prev + 1)}
                    loading={loading}
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
    table: {
      marginTop: theme.spacing(3),

      "& thead th": {
        fontWeight: "500",
        color: "#FFFFFF",
        background: theme.palette.custom.BLACK,
      },
      "& tbody td": {
        fontWeight: "400",
        fontSize: "85%",
        padding: "10px",
      },
      "& tbody tr:hover": {
        background: theme.palette.custom.TABLE_HOVER_COLOR,
        cursor: "pointer",
      },
    },
    titleStyle: {
      color: "white",
      fontSize: "85%",
      fontWeight: 500,
    },
  })
);

export default SuggestionComp;
