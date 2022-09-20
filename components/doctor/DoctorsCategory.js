import React from "react";
import { useRouter } from "next/router";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import PropTypes from "prop-types";

const DoctorsCategory = ({ title, filter }) => {
  const classes = useStyles();
  const router = useRouter();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <FormControl style={{ width: matches ? "100%" : null }}>
      <RadioGroup column>
        <FormControlLabel
          control={
            <Radio
              size="small"
              value={title}
              checked={filter === title}
              onChange={(e) =>
                router.push("/doctors?category=" + e.target.value)
              }
            />
          }
          label={
            <Typography className={classes.ccrt__dctr__page__left__menu__list}>
              {title}
            </Typography>
          }
        />
      </RadioGroup>
    </FormControl>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    ccrt__dctr__page__left__menu__list: {
      width: "100%",
      padding: "5px",
      textTransform: "capitalize",
      fontSize: "90%",
      fontWeight: "500",
      color: theme.palette.grey[700],
    },
  })
);
DoctorsCategory.propTypes = {
  title: PropTypes.string.isRequired,
  filter: PropTypes.string.isRequired,
};
export default DoctorsCategory;
