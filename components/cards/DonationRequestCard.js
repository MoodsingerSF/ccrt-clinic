import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Image from "next/image";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import DonateModal from "../modal/DonateModal";
import profilePic2 from "../../public/image/home-page/doctors/Doctor2.png";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const DonationRequestCard = ({
  name,
  profilePic,
  amount,
  details,
  number,
  requestId,
  openSnackbar,
}) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [openDonateModal, setOpenDonateModal] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <Card className={classes.ccrt__card__container}>
        <CardMedia className={classes.ccrt__card_media}>
          <Image
            src={profilePic ? profilePic : profilePic2}
            alt="blog"
            layout="fill"
            objectFit="contain"
          />
        </CardMedia>
        <CardContent className={classes.ccrt__card_content}>
          <Typography className={classes.ccrt__card__content__name}>
            {name}
          </Typography>
          <Typography className={classes.ccrt__card__content__amount}>
            {amount}&#2547;
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Typography
            className={classes.ccrt__card__action__button}
            onClick={() => setOpenDonateModal(true)}
          >
            donate
          </Typography>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography
              variant="body2"
              color="text.secondary"
              className={classes.ccrt__card__content__details}
            >
              {details}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
      {openDonateModal && (
        <DonateModal
          open={openDonateModal}
          onNegativeFeedback={() => setOpenDonateModal(false)}
          name={name}
          amount={amount}
          number={number}
          requestId={requestId}
          openSnackbar={openSnackbar}
        />
      )}
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  ccrt__card__container: {
    width: "100%",
    marginBottom: "5px",
    border: `1px solid #fff`,
    transition: "all 0.3s ease",
    "&:hover": {
      border: `1px solid ${theme.palette.custom.DEFAULT_COLOR_3}`,
      transform: "scale(1.05)",
    },
  },
  ccrt__card_media: {
    cursor: "pointer",
    position: "relative",
    height: 250,
  },
  ccrt__card_content: {
    display: "flex",
    justifyContent: "space-between",
  },
  ccrt__card__content__name: {
    fontSize: "88%",
    fontWeight: "500",
  },
  ccrt__card__content__amount: {
    fontSize: "90%",
  },
  ccrt__card__action__button: {
    fontSize: "80%",
    fontWeight: "500",
    textTransform: "uppercase",
    cursor: "pointer",
    border: `1px solid ${theme.palette.custom.DEFAULT_COLOR_2}`,
    padding: "5px 10px",
    borderRadius: "5px",
    transition: "all 0.3s ease",
    "&:hover": {
      border: `1px solid ${theme.palette.custom.DEFAULT_COLOR_3}`,
      background: theme.palette.custom.DEFAULT_COLOR_3,
      color: "#fff",
    },
  },
  ccrt__card__content__details: {
    textAlign: "justify",
    fontSize: "85%",
  },
}));

DonationRequestCard.propTypes = {
  name: PropTypes.string.isRequired,
  profilePic: PropTypes.string,
  amount: PropTypes.number.isRequired,
  details: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  requestId: PropTypes.string.isRequired,
  openSnackbar: PropTypes.func.isRequired,
};

export default DonationRequestCard;
