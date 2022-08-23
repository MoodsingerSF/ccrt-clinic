import React from "react";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import Heading from "../section-heading/Heading";
import { CategoryData } from "../../../data/doctors-by-category/data";
import CategoryCard from "./CategoryCard";

const Category = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ padding: matches ? "0 50px" : "0 8px" }}
    >
      <Heading title="doctors by category" />
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ margin: "0 0 30px 0" }}
      >
        {CategoryData.map((item) => (
          <CategoryCard key={item.id} title={item.title} />
        ))}
      </Grid>
    </Grid>
  );
};

export default Category;
