import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@mui/styles";
import DonateModal from "../modal/DonateModal";
import { Grid } from "@mui/material";
import CustomButton from "../button/CustomButton";
import DetailsModal from "../modal/DetailsModal";
// import profilePic2 from "../../public/image/home-page/doctors/Doctor2.png";

const DonationRequestCard = ({
  name,
  profileImageUrl,
  amount,
  details,
  number,
  requestId,
  openSnackbar,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const [openDonateModal, setOpenDonateModal] = useState(false);
  const [viewDetails, setViewDetails] = useState(false);
  return (
    <>
      <Grid
        container
        alignItems={"flex-start"}
        className={classes.ccrt__card__container}
      >
        <Grid
          container
          style={{
            position: "relative",
            height: 150,
            borderRadius: 5,
            marginBottom: 10,
            background: theme.palette.custom.BLACK,
          }}
        >
          {profileImageUrl && (
            <Image
              loader={({ src }) => src}
              src={"/" + profileImageUrl}
              alt="blog"
              layout="fill"
              objectFit="cover"
              style={{ borderRadius: 5 }}
            />
          )}
        </Grid>
        {/* <CardContent className={classes.ccrt__card_content}> */}
        <Grid container direction={"column"}>
          <Typography className={classes.ccrt__card__content__name}>
            {name}
          </Typography>
          <Typography className={classes.ccrt__card__content__amount}>
            Requested Amount: {amount}&#2547;
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            className={classes.ccrt__card__content__details}
            onClick={() => setViewDetails(true)}
          >
            {details}
          </Typography>
          <Grid container style={{ marginTop: 5 }}>
            <CustomButton
              title="Donate"
              onClick={() => setOpenDonateModal(true)}
              color={theme.palette.custom.GREEN}
            />
          </Grid>
        </Grid>
      </Grid>
      <DetailsModal
        open={viewDetails}
        onClose={() => setViewDetails(false)}
        details={details}
      />
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
    padding: 0,
    margin: 0,
    marginBottom: "5px",
    // border: `1px solid #fff`,
    // transition: "all 0.3s ease",
    // "&:hover": {
    //   border: `1px solid ${theme.palette.custom.DEFAULT_COLOR_3}`,
    //   transform: "scale(1.05)",
    // },
  },
  ccrt__card_media: {
    cursor: "pointer",
    position: "relative",
    height: 150,
    background: theme.palette.custom.BLACK,
  },
  ccrt__card_content: {
    display: "flex",
    justifyContent: "space-between",
  },
  ccrt__card__content__name: {
    fontSize: "85%",
    fontWeight: "500",
    color: theme.palette.custom.BLACK,
  },
  ccrt__card__content__amount: {
    fontSize: "85%",
    fontWeight: "500",
    color: theme.palette.custom.BLACK,
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
    fontSize: "85%",
    color: theme.palette.custom.GREY,
    fontWeight: "400",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    "-webkit-line-clamp": 3 /* number of lines to show */,
    "-webkit-box-orient": "vertical",
    cursor: "pointer",
    "&:hover": {
      color: theme.palette.custom.BLACK,
    },
  },
}));

DonationRequestCard.propTypes = {
  name: PropTypes.string.isRequired,
  profileImageUrl: PropTypes.string,
  amount: PropTypes.number.isRequired,
  details: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  requestId: PropTypes.string.isRequired,
  openSnackbar: PropTypes.func.isRequired,
};

export default DonationRequestCard;
