import React, { useState } from "react";
import { Button, Grid } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import RatingField from "./RatingField";
import { makeStyles } from "@mui/styles";

const RatingSection = () => {
  const classes = useStyles();

  const [listened, setListened] = useState(3.5);
  const [time, setTime] = useState(4.9);
  const [respect, setRespect] = useState(4);
  const [instructions, setInstructions] = useState(4.5);
  const [understand, setUnderstand] = useState(3.5);

  const handleChangeListened = (e) => {
    setListened(e.target.value);
  };
  const handleChangeTime = (e) => {
    setTime(e.target.value);
  };
  const handleChangeRespect = (e) => {
    setRespect(e.target.value);
  };
  const handleChangeInstructions = (e) => {
    setInstructions(e.target.value);
  };
  const handleChangeUnderstand = (e) => {
    setUnderstand(e.target.value);
  };
  return (
    <Grid container className={classes.ccrt__rating__section}>
      <RatingField
        title="Listened Carefully to You"
        value={listened}
        onChange={handleChangeListened}
      />
      <RatingField
        title="Spent Enough Time With You"
        value={time}
        onChange={handleChangeTime}
      />
      <RatingField
        title="Showed Respect for You"
        value={respect}
        onChange={handleChangeRespect}
      />
      <RatingField
        title="Gave Easy to Understand Instructions"
        value={instructions}
        onChange={handleChangeInstructions}
      />
      <RatingField
        title="Explanations Easy to Understand"
        value={understand}
        onChange={handleChangeUnderstand}
      />
      <Grid container justifyContent={"flex-end"} style={{ marginTop: "10px" }}>
        <Button
          fullWidth
          variant="contained"
          size="small"
          endIcon={<SendIcon fontSize="small" />}
        >
          Send
        </Button>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles({
  ccrt__rating__section: {
    borderRadius: "3px",
    padding: "10px",
    boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
  },
});
export default RatingSection;
