import React from "react";
import Head from "next/head";
import { Grid, Typography } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import {
  CANCER_CAUSES,
  CANCER_TYPES,
  COMMON_CANCERS,
  FaqData,
  RISK_FACTORS,
} from "../data/faq/data";
import UnorderedList from "../components/misc/UnorderedList";
import OrderedList from "../components/misc/OrderedList";
import { APP_BAR_HEIGHT } from "../misc/constants";

const Faq = () => {
  const classes = useStyles();
  return (
    <Grid
      container
      justifyContent={"center"}
      alignItems="center"
      className={classes.ccrt__faq__banner}
    >
      <Head>
        <title>Frequently Asked Questions</title>
      </Head>
      <Grid
        container
        justifyContent={"center"}
        alignItems="center"
        style={{ width: "95%" }}
      >
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          style={{ marginTop: 20 }}
        >
          <Typography className={classes.ccrt__faq__title}>
            Frequently Asked Questions
          </Typography>
        </Grid>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          style={{ background: "#fff" }}
        >
          {FaqData.map((item, index) => (
            <Grid item xs={12} key={item.id}>
              <Typography className={classes.questionStyle}>
                {index + 1}.{item.question}
              </Typography>

              {item.answer.map((paragraph, index) => (
                <Typography
                  key={index.toString()}
                  className={classes.paragraphStyleWithBottomMargin}
                >
                  {paragraph}
                </Typography>
              ))}
            </Grid>
          ))}

          <Grid item xs={12}>
            <Typography className={classes.questionStyle}>
              {FaqData.length + 1}. What are the causes of cancer?
            </Typography>

            <Typography className={classes.paragraphStyle}>
              {`Carcinogenesis is the development of cancer and the substances causing cancer are referred to as carcinogens. The external agents responsible for cancer are categorized as-`}
            </Typography>
            <UnorderedList options={CANCER_CAUSES} />
            <Typography className={classes.paragraphStyle}>
              {`Other risk factors are-`}
            </Typography>
            <UnorderedList options={RISK_FACTORS} />
            <Typography className={classes.paragraphStyleWithBottomMargin}>
              {`Not a single cause accounts for the development of cancer, rather it is a multistep process where multiple factors contribute to its progression.`}
            </Typography>
            <Typography className={classes.paragraphStyleWithBottomMargin}>
              {`Diagnosis is important to understand the specific type of cancer so that the treatment becomes easier and lives can be saved. Laboratory test (blood test, urine/feces test), endoscopy (visual examination of the interior of a hollow body organ), tumor biopsy (physical examination of tissue or body fluid) and imaging are performed to diagnose cancer.`}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography className={classes.questionStyle}>
              {FaqData.length + 2}. Cancer Types
            </Typography>

            <Typography className={classes.paragraphStyle}>
              {`According to the tissue of origin, types of cancers are-`}
            </Typography>
            <OrderedList options={CANCER_TYPES} />
            <Typography className={classes.paragraphStyle}>
              {`More than 100 types of cancers are classified according to the organs involved (WHO, 2018). The most common are-`}
            </Typography>
            <OrderedList options={COMMON_CANCERS} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    ccrt__faq__banner: {
      paddingTop: APP_BAR_HEIGHT,
    },
    ccrt__faq__title: {
      fontWeight: "bold",
      color: theme.palette.custom.BLACK,
      fontSize: "120%",
    },
    paragraphStyleWithBottomMargin: {
      fontWeight: 500,
      color: theme.palette.custom.BLACK,
      fontSize: "85%",
      marginBottom: 10,
    },
    paragraphStyle: {
      fontWeight: 500,
      color: theme.palette.custom.BLACK,
      fontSize: "85%",
    },
    questionStyle: {
      fontWeight: "bold",
      color: theme.palette.custom.BLACK,
      fontSize: "100%",
      marginBottom: 10,
    },
    listStyle: {
      color: theme.palette.custom.BLACK,
    },
  })
);
export default Faq;
