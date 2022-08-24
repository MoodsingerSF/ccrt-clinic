import React from "react";
import Head from "next/head";
import Image from "next/image";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Typography,
} from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FaqData } from "../data/faq/data";
import img from "../public/image/ccrt-bg/CCRT_bg.jpg";

const Faq = () => {
  const classes = useStyles();
  return (
    <Grid container>
      <Head>
        <title>Faq</title>
      </Head>
      <Grid container justifyContent="center" alignItems="center">
        <Grid container className={classes.ccrt__faq__banner}>
          <Image src={img} alt="bg_img" layout="fill" />
        </Grid>
        <h2 className={classes.ccrt__faq__title}>FAQ</h2>
      </Grid>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ background: "#fff", padding: "20px 0" }}
      >
        {FaqData.map((item) => (
          <Accordion key={item.id}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>{item.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{item.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles(() =>
  createStyles({
    ccrt__faq__banner: {
      height: "40vh",
      width: "100vw",
      overflow: "hidden",
      zIndex: "-1",
    },
    ccrt__faq__title: {
      position: "absolute",
      top: "29%",
      color: "#fff",
      margin: "0",
      fontSize: "32px",
      lineHeight: "48px",
      textShadow: "1px 1px 1px #3c5c5e",
    },
  })
);
export default Faq;
