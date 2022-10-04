import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Rating,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RatingField from "./RatingField";
import { makeStyles } from "@mui/styles";
// import PropTypes from "prop-types";

const PatientReviews = () => {
  const classes = useStyles();
  const [overallReview, setOverallReview] = useState(null);
  useEffect(() => {
    setOverallReview((3.5 + 4.9 + 4 + 4.5 + 3.5) / 5);
  }, [overallReview]);
  return (
    <Grid container>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.ccrt__patient_review__header}>
            Patient Reviews
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container>
            <Grid
              container
              justifyContent={"center"}
              alignItems="center"
              mb={2}
            >
              <Rating value={overallReview} precision={0.5} size="medium" />
              <Typography className={classes.ccrt_overall_review__text}>
                <span className={classes.ccrt__overall_review__span}>
                  {overallReview}/5
                </span>{" "}
                Overall Rating (30 reviews)
              </Typography>
            </Grid>
            <RatingField title="Listened Carefully to You" value={3.5} />
            <RatingField title="Spent Enough Time With You" value={4.9} />
            <RatingField title="Showed Respect for You" value={4} />
            <RatingField
              title="Gave Easy to Understand Instructions"
              value={4.5}
            />
            <RatingField title="Explanations Easy to Understand" value={3.5} />
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Grid>
  );
};

const useStyles = makeStyles({
  ccrt__patient_review__header: {
    fontSize: "120%",
    fontWeight: "700",
  },
  ccrt_overall_review__text: {
    fontWeight: "500",
    fontSize: "105%",
  },
  ccrt__overall_review__span: {
    margin: "0 10px",
    fontSize: "100%",
    fontWeight: "300",
  },
});
export default PatientReviews;
