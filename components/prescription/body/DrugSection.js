import React from "react";
import { Grid, Typography } from "@mui/material";
import DrugAddedForm from "./DrugAddedForm";
import PropTypes from "prop-types";
import { makeStyles, createStyles } from "@mui/styles";

const DrugSection = ({ showAddedForm, drugLists, setDrugLists }) => {
  const classes = useStyles();
  return (
    <Grid container justifyContent={"center"} alignItems="center">
      <Typography className={classes.ccrt__prescription__drugsection__heading}>
        Drugs
      </Typography>
      <Grid container>
        {drugLists && (
          <Grid container>
            {drugLists.map((item, index) => (
              <Grid
                key={item.id}
                container
                className={classes.ccrt__prescription__drug_item}
              >
                <Typography
                  className={classes.ccrt__prescription__drug_item__index}
                >
                  {index + 1}.
                </Typography>
                <Typography className={classes.ccrt__prescription__drug_name}>
                  {item.drugName}
                </Typography>
                <Grid
                  container
                  flexDirection={"row"}
                  className={classes.ccrt__prescription__drug__rule}
                >
                  <Typography
                    className={classes.ccrt__prescription__drug__perDay}
                  >
                    {item.perDay}
                  </Typography>
                  <Typography
                    className={classes.ccrt__prescription__drug__when}
                  >
                    ({item.when})
                  </Typography>
                </Grid>
              </Grid>
            ))}
          </Grid>
        )}
        {showAddedForm && (
          <DrugAddedForm drugLists={drugLists} setDrugLists={setDrugLists} />
        )}
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    ccrt__prescription__drugsection__heading: {
      width: "100%",
      textAlign: "center",
      padding: "20px 0",
      borderBottom: `1px solid ${theme.palette.custom.DEFAULT_COLOR_3}`,
      borderLeft: `1px dashed ${theme.palette.custom.DEFAULT_COLOR_3}`,
      borderRight: `1px dashed ${theme.palette.custom.DEFAULT_COLOR_3}`,
    },
    ccrt__prescription__drug_item: {
      padding: "0 0 0 20px",
      background: "#f1ffff",
      margin: "20px 0 5px 0",
      height: "70px",
    },
    ccrt__prescription__drug_item__index: {
      marginRight: "5px",
    },
    ccrt__prescription__drug_name: {
      fontSize: "100%",
      fontWeight: "300",
    },
    ccrt__prescription__drug__rule: {
      marginLeft: "20px",
    },
    ccrt__prescription__drug__perDay: {
      fontSize: "90%",
    },
    ccrt__prescription__drug__when: {
      fontSize: "90%",
      marginLeft: "20px",
    },
  })
);

DrugSection.propTypes = {
  showAddedForm: PropTypes.bool.isRequired,
};
export default DrugSection;
