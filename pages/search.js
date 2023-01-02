import React, { useEffect, useState } from "react";
import { ButtonGroup, Grid } from "@mui/material";
import { useRouter } from "next/router";
import { searchDoctor } from "../controllers/UserController";
// import axios from "axios";
import DoctorCard from "../components/cards/doctor-home/DoctorCard";
import NoContentToShowComponent from "../components/misc/NoContentToShowComponent";
import LoaderComponent from "../components/misc/LoaderComponent";
// import BlogCard from "../components/cards/BlogCard";
import { prettyDate } from "../controllers/DateController";
import { APP_BAR_HEIGHT, BODY_HEIGHT } from "../misc/constants";
import BlogCard from "../components/home-page/blogs/BlogCard";
import { searchBlogs } from "../controllers/BlogController";
import ActionButton from "../components/button/ActionButton";

const search = () => {
  const router = useRouter();
  const searchParam = router.query.keyword;
  const [contentType, setContentType] = useState("DOCTOR");
  const [doctors, setDoctors] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const retrieveDoctors = async (searchParam) => {
    try {
      if (!searchParam) return;

      setLoading(true);
      const doctorData = await searchDoctor(searchParam);
      setDoctors(doctorData);

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  const retrieveBlogs = async (searchParam) => {
    try {
      if (!searchParam) return;
      setLoading(true);
      const blogData = await searchBlogs(searchParam);
      setBlogs(blogData);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (contentType === "DOCTOR") retrieveDoctors(searchParam);
  }, [searchParam, contentType]);

  useEffect(() => {
    if (contentType === "BLOG") retrieveBlogs(searchParam);
  }, [searchParam, contentType]);

  return (
    <Grid
      container
      justifyContent={"center"}
      alignItems={"flex-start"}
      style={{ minHeight: BODY_HEIGHT, marginTop: APP_BAR_HEIGHT }}
    >
      <Grid item style={{ width: "95%" }}>
        <Grid container justifyContent={"center"} alignItems={"flex-start"}>
          <Grid
            container
            justifyContent={"center"}
            alignItems={"center"}
            item
            xs={12}
            my={2}
          >
            <ButtonGroup
              disableElevation
              variant="contained"
              aria-label="Disabled elevation buttons"
            >
              <ActionButton
                title="Doctors"
                type={contentType === "DOCTOR" ? "success" : "info"}
                onClick={() => setContentType("DOCTOR")}
              />
              <ActionButton
                title=" Blogs "
                type={contentType === "BLOG" ? "success" : "info"}
                onClick={() => setContentType("BLOG")}
              />
            </ButtonGroup>
          </Grid>
        </Grid>

        <Grid container style={{ marginTop: 20 }}>
          {loading ? (
            <Grid container>
              <LoaderComponent />
            </Grid>
          ) : contentType === "DOCTOR" ? (
            <Grid container justifyContent={"center"} alignItems={"center"}>
              {!loading && doctors.length !== 0 ? (
                <Grid
                  container
                  justifyContent={"flex-start"}
                  alignItems={"center"}
                  spacing={2}
                  item
                  style={{ width: "95%" }}
                >
                  {doctors.map((doctor) => (
                    <Grid item xs={6} sm={6} md={4} lg={3} key={doctor.userId}>
                      <DoctorCard
                        doctorId={doctor.userId}
                        imageUrl={doctor.profileImageUrl}
                        name={doctor.fullName}
                        specializations={doctor.specializations}
                        fee={doctor.fee}
                      />
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <NoContentToShowComponent
                  title={"No Doctor Found With This Keyword"}
                />
              )}
            </Grid>
          ) : (
            <Grid container justifyContent={"center"} alignItems={"center"}>
              {!loading && blogs.length !== 0 ? (
                <Grid
                  container
                  justifyContent={"flex-start"}
                  alignItems={"center"}
                  spacing={2}
                  item
                  style={{ width: "95%" }}
                >
                  {blogs.map((item) => (
                    <Grid item xs={6} sm={6} md={3} lg={3} key={item.blogId}>
                      <BlogCard
                        image={item.imageUrl}
                        name={item.title}
                        tags={item.tags}
                        blogId={item.blogId}
                        date={prettyDate(item.creationTime)}
                      />
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <NoContentToShowComponent
                  title={"No Blog Found With This Keyword"}
                />
              )}
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default search;
