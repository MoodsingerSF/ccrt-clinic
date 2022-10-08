import React, { useState } from "react";
import { Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { BOX_SHADOW } from "../misc/colors";
import Image from "next/image";
import bgImg from "../public/image/home-page/donate/bg.png";
import DonationRequestCard from "../components/cards/DonationRequestCard";
import profilePic1 from "../public/image/home-page/doctors/Doctor1.png";
import profilePic2 from "../public/image/home-page/doctors/Doctor2.png";
import { APP_BAR_HEIGHT } from "../misc/constants";

const data = [
  {
    id: 1,
    name: "Azizul Islam Rajib",
    amount: "10,000",
    about: `Add rice and stir very gently to distribute. Top with artichokes and
            peppers, and cook without stirring, until most of the liquid is
            absorbed, 15 to 18 minutes. Reduce heat to medium-low, add reserved
            shrimp and mussels, tucking them down into the rice, and cook again
            without stirring, until mussels have opened and rice is just tender,
            5 to 7 minutes more. (Discard any mussels that don&apos;t open.)`,
    profilePic: profilePic1,
    number: "01968421270",
  },
  {
    id: 2,
    name: "Rakibul Islam Rafi",
    amount: "10,000",
    about: `Add rice and stir very gently to distribute. Top with artichokes and
            peppers, and cook without stirring, until most of the liquid is
            absorbed, 15 to 18 minutes. Reduce heat to medium-low, add reserved
            shrimp and mussels, tucking them down into the rice, and cook again
            without stirring, until mussels have opened and rice is just tender,
            5 to 7 minutes more. (Discard any mussels that don&apos;t open.)`,
    profilePic: profilePic2,
    number: "01968421270",
  },
  {
    id: 3,
    name: "Azizul Islam Rajib",
    amount: "10,000",
    about: `Add rice and stir very gently to distribute. Top with artichokes and
            peppers, and cook without stirring, until most of the liquid is
            absorbed, 15 to 18 minutes. Reduce heat to medium-low, add reserved
            shrimp and mussels, tucking them down into the rice, and cook again
            without stirring, until mussels have opened and rice is just tender,
            5 to 7 minutes more. (Discard any mussels that don&apos;t open.)`,
    profilePic: profilePic1,
    number: "01968421270",
  },
  {
    id: 4,
    name: "Rakibul Islam Rafi",
    amount: "10,000",
    about: `Add rice and stir very gently to distribute. Top with artichokes and
            peppers, and cook without stirring, until most of the liquid is
            absorbed, 15 to 18 minutes. Reduce heat to medium-low, add reserved
            shrimp and mussels, tucking them down into the rice, and cook again
            without stirring, until mussels have opened and rice is just tender,
            5 to 7 minutes more. (Discard any mussels that don&apos;t open.)`,
    profilePic: profilePic2,
    number: "01968421270",
  },
  {
    id: 5,
    name: "Azizul Islam Rajib",
    amount: "10,000",
    about: `Add rice and stir very gently to distribute. Top with artichokes and
            peppers, and cook without stirring, until most of the liquid is
            absorbed, 15 to 18 minutes. Reduce heat to medium-low, add reserved
            shrimp and mussels, tucking them down into the rice, and cook again
            without stirring, until mussels have opened and rice is just tender,
            5 to 7 minutes more. (Discard any mussels that don&apos;t open.)`,
    profilePic: profilePic1,
    number: "01968421270",
  },
  {
    id: 6,
    name: "Rakibul Islam Rafi",
    amount: "1,00,00,000",
    about: `Add rice and stir very gently to distribute. Top with artichokes and
            peppers, and cook without stirring, until most of the liquid is
            absorbed, 15 to 18 minutes. Reduce heat to medium-low, add reserved
            shrimp and mussels, tucking them down into the rice, and cook again
            without stirring, until mussels have opened and rice is just tender,
            5 to 7 minutes more. (Discard any mussels that don&apos;t open.)`,
    profilePic: profilePic2,
    number: "01968421270",
  },
];

const RequestDonationList = () => {
  const classes = useStyles();

  // eslint-disable-next-line no-unused-vars
  const [lists, setLists] = useState(data);

  return (
    <Grid
      container
      justifyContent={"center"}
      alignItems="center"
      className={classes.ccrt_request_donation_list_container}
    >
      <Grid
        container
        justifyContent={"center"}
        alignItems={"center"}
        className={classes.ccrt__donation__container}
      >
        <Image src={bgImg} alt="bg" layout="fill" />
        <Grid
          container
          justifyContent={"center"}
          alignItems="center"
          style={{ position: "absolute" }}
        >
          <Typography
            className={classes.ccrt__donation__container__header__text}
          >
            {`We can't do this without your support`}
          </Typography>
          <Grid container justifyContent={"center"} alignItems="center">
            <Typography
              className={classes.ccrt__donation__request__row__button}
            >
              donate today
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        item
        xs={11}
        md={10}
        justifyContent={"center"}
        alignItems="center"
        spacing={2}
        my={2}
      >
        {lists.map((user) => (
          <Grid container item xs={11} sm={5} md={4} lg={3} key={user.id}>
            <DonationRequestCard
              name={user.name}
              profilePic={user.profilePic}
              amount={user.amount}
              details={user.about}
              number={user.number}
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  ccrt_request_donation_list_container: {
    marginTop: APP_BAR_HEIGHT,
  },
  ccrt__donation__container__header__text: {
    fontSize: "32px",
    textTransform: "capitalize",
    fontWeight: "700",
    letterSpacing: "1px",
    textAlign: "center",
  },
  ccrt__donation__container: {
    position: "relative",
    height: "350px",
  },
  ccrt__donation__container__wrapper: {
    background: theme.palette.custom.DEFAULT_COLOR_3,
    boxShadow: BOX_SHADOW,
    borderRadius: "5px",
    padding: "10px",
    margin: "10px 0",
  },
  ccrt__donation__container__header: {
    fontSize: "90%",
    color: "#fff",
    fontWeight: "300",
  },
  ccrt__donation__request__row__button: {
    fontSize: "90%",
    marginRight: "20px",
    border: `1px solid ${theme.palette.custom.DEFAULT_COLOR_2}`,
    borderRadius: "5px",
    textAlign: "center",
    lineHeight: "1.7",
    textTransform: "capitalize",
    cursor: "pointer",
    padding: "0 10px",
    transition: "all 0.3s ease",
    "&:hover": {
      border: `1px solid ${theme.palette.custom.DEFAULT_COLOR_3}`,
      background: theme.palette.custom.DEFAULT_COLOR_3,
      color: "#fff",
    },
  },
}));
export default RequestDonationList;
