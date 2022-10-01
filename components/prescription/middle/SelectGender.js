import React, { useState } from "react";
import { Grid, Tooltip, Typography } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import OutsideClick from "../OutsideClick";

const SelectGender = ({
  heading,
  title,
  tooltip,
  onChange,
  value,
  onKeyDown,
}) => {
  const classes = useStyles();
  const [isEditMood, setIsEditMood] = useState(false);

  return (
    <Grid container justifyContent="center" alignItems={"center"}>
      <Typography className={classes.ccrt__middle__section__heading}>
        {heading}:
      </Typography>
      <Typography className={classes.ccrt__middle__section__title__wrapper}>
        {isEditMood ? (
          <OutsideClick onClickOutside={() => setIsEditMood(false)}>
            <select
              name="gender"
              id="gender"
              value={value}
              onChange={onChange}
              onKeyDown={
                (onKeyDown,
                (e) => {
                  if (e.key === "Enter") {
                    setIsEditMood(false);
                  }
                })
              }
              className={classes.textField}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </select>
          </OutsideClick>
        ) : (
          <Tooltip title={tooltip} arrow>
            <Typography
              className={classes.ccrt__middle__section__title}
              onClick={() => setIsEditMood(true)}
            >
              {value ? value : title}
            </Typography>
          </Tooltip>
        )}
      </Typography>
    </Grid>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    ccrt__middle__section__heading: {
      fontSize: "85%",
      textTransform: "capitalize",
      fontWeight: "500",
      marginRight: "2px",
    },
    ccrt__middle__section__title__wrapper: {
      width: "200px",
    },
    ccrt__middle__section__title: {
      fontSize: "90%",
      padding: "3px",
      border: `2px solid #ffffff`,
      borderRadius: "5px",
      textTransform: "capitalize",
      transition: "border 0.3s ease",
      "&:hover": {
        border: `2px solid ${theme.palette.grey[300]}`,
      },
    },
    textField: {
      width: "100%",
      height: "100%",
      fontSize: "90%",
      padding: "5px 0px",
      border: `2px solid ${theme.palette.custom.DEFAULT_COLOR_3}`,
      borderRadius: "5px",
      outline: "none",
      background: "transparent",
      color: `${theme.palette.grey[700]}`,
    },
  })
);

export default SelectGender;
