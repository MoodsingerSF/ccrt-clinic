import { createStyles, makeStyles } from "@mui/styles";
import { DEFAULT_COLOR, DEFAULT_COLOR_MINUS_2 } from "../misc/colors";

export const useStyles = makeStyles((theme) =>
  createStyles({
    ccrt__blogDetails__section: {
      position: "relative",
      margin: "20px 0",
    },
    ccrt__blogDetails__container__mobile: {
      padding: "0 10px",
    },
    ccrt__blogDetails__container_tablet: {
      position: "relative",
      width: "90%",
    },
    ccrt__blogDetails__search__container: {
      position: "relative",
    },
    ccrt__blogDetails__searchField: {
      paddingRight: "55px",
    },
    ccrt__blog__details__search__button: {
      position: "absolute",
      right: "0",
      background: DEFAULT_COLOR_MINUS_2,
      color: "white",
      padding: "12px 15px",
      cursor: "pointer",
      borderTopRightRadius: "5px",
      borderBottomRightRadius: "5px",
    },
    ccrt__blogDetails__author__containerMobile: {
      margin: "40px 0 0 0",
      padding: "20px 10px 0",
      border: `1px solid ${DEFAULT_COLOR_MINUS_2}`,
    },
    ccrt__blogDetails__container__container__Tablet: {
      margin: "20px 0 0 0",
      padding: "20px 10px 0",
      border: `1px solid ${DEFAULT_COLOR_MINUS_2}`,
    },
    ccrt__blogDetails__author__avatar__mobile: {
      height: "100px",
      width: "100px",
    },
    ccrt__blogDetails__author__avatar__tablet: {
      height: "150px",
      width: "150px",
    },
    ccrt__blogDetails__author__info: {
      marginTop: "20px",
    },
    ccrt__blogDetails__author__title: {
      textDecoration: "none",
      fontSize: "24px",
      lineHeight: "32px",
      fontWeight: "700",
      margin: "0 0 2px",
      color: DEFAULT_COLOR,
    },
    ccrt__blogDetails__author__subtitle: {
      fontSize: "18px",
      lineHeight: "32px",
      fontWeight: "600",
      color: "#696969",
      margin: "0 0 9px",
    },
    ccrt__blogDetails__author__share: {
      display: "inline-block",
      listStyle: "none",
      margin: "0 10px",
    },
    ccrt__blogDetails__tags__container: {
      margin: "20px 0 0 0",
      padding: "34px 40px",
      border: `1px solid ${DEFAULT_COLOR_MINUS_2}`,
    },
    ccrt__blogDetails__popular_tag__title: {
      fontSize: "24px",
      fontWeight: "700",
      textTransform: "capitalize",
      paddingBottom: "25px",
      margin: "0 0 29px",
      borderBottom: `1px solid ${DEFAULT_COLOR_MINUS_2}`,
      color: DEFAULT_COLOR,
      width: "100vw",
      textAlign: "center",
    },
    ccrt__blogDetails__popular_tags: {
      textDecoration: "none",
      cursor: "pointer",
      background: DEFAULT_COLOR_MINUS_2,
      color: "#fff",
      margin: "5px",
      "&:hover": {
        background: DEFAULT_COLOR,
      },
    },
    ccrt__blogDetails__right__section__mobile: {
      padding: "0 20px",
    },
    ccrt__blogDetails__right__section__tablet: {
      padding: "15px 25px 30px",
    },
    ccrt__blogDetails__right__section__desktop_Lg: {
      border: `1px solid ${DEFAULT_COLOR_MINUS_2}`,
    },
    ccrt__blogDetails__right__title__mobile: {
      fontSize: "100%",
      textAlign: "justify",
      fontWeight: "700",
      margin: "0 0 13px",
      color: DEFAULT_COLOR,
    },
    ccrt__blogDetails__right__title_tablet: {
      textAlign: "justify",
      lineHeight: "35px",
      margin: "0 0 13px",
      color: DEFAULT_COLOR,
    },
    ccrt__blogDetails__right__tags: {
      margin: "5px",
      background: DEFAULT_COLOR_MINUS_2,
      color: "#fff",
    },
    ccrt__blogDetails__right__blog__tags__mobile: {
      justifyContent: "right",
    },
    ccrt__blogDetails__right__blog__tags__tablet: {
      justifyContent: "right",
    },
    ccrt__blogDetails__right__blog__tags__laptop: {
      justifyContent: "right",
    },
    ccrt__blogDetails__right__blog__tags__LG: {
      justifyContent: "left",
    },
    ccrt__blogDetails__right__blog_meta: {
      fontSize: "16px",
      marginRight: "20px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    ccrt__blogDetails__right__icon: {
      fontSize: "20px",
      marginRight: "5px",
    },
    ccrt__blogDetails__author__card: {
      display: "none",
    },
    ccrt__blogDetails__author__Desktop_Md: {
      display: "none",
    },
    ccrt__blog__popular_tags: {
      display: "none",
    },
    ccrt__blog__popular_tags__Desktop_Md: {
      display: "none",
    },
  })
);
