import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Grid } from "@mui/material";
import { useRouter } from "next/router";
import { searchBlogs, searchDoctor } from "../controllers/UserController";
// import axios from "axios";
import DoctorCard from "../components/cards/doctor-home/DoctorCard";
import NoContentToShowComponent from "../components/misc/NoContentToShowComponent";
import LoaderComponent from "../components/misc/LoaderComponent";
import BlogCard from "../components/cards/BlogCard";
import { prettyDate } from "../controllers/DateController";
import { APP_BAR_HEIGHT, BODY_HEIGHT } from "../misc/constants";

const search = () => {
  const router = useRouter();
  const searchParam = router.query.keyword;
  //   const cancelToken = useRef();

  // const [searchText, setSearchText] = useState("");
  const [showContent, setShowContent] = useState("DOCTOR");
  const [doctors, setDoctors] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  // const onSearch = () => {
  //   router.push({
  //     pathname: "/search",
  //     query: {
  //       keyword: searchText,
  //     },
  //   });
  // };

  const retrieveDoctors_Blogs = async (searchParam) => {
    try {
      if (!searchParam) return;
      //   if (cancelToken.current && typeof cancelToken.current !== "undefined") {
      //     cancelToken.current.cancel();
      //   }
      //   cancelToken.current = axios.CancelToken.source();
      //   if (page === 0) {
      //     setProducts([]);
      //     setHasMore(true);
      //   }
      setLoading(true);
      const doctorData = await searchDoctor(
        searchParam

        // cancelToken.current.token
      );
      setDoctors(doctorData);
      const blogData = await searchBlogs(
        // {
        searchParam
        // },
        // cancelToken.current.token
      );
      setBlogs(blogData);
      //   console.log(data);
      //   if (data.length < limit) {
      //     setHasMore(false);
      //   }
      //   if (page === 0 && products.length === 0) {
      //     setProducts(data);
      //   } else {
      //     setProducts((prev) => [...prev, ...data]);
      //   }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    retrieveDoctors_Blogs(searchParam);
  }, [searchParam]);

  console.log(doctors);

  return (
    <Grid
      // container
      style={{ minHeight: BODY_HEIGHT, marginTop: APP_BAR_HEIGHT }}
    >
      <Grid container justifyContent={"center"} alignItems={"center"}>
        <Grid
          container
          justifyContent={"flex-start"}
          alignItems={"center"}
          item
          xs={10}
          my={2}
        >
          <ButtonGroup
            disableElevation
            variant="contained"
            aria-label="Disabled elevation buttons"
          >
            <Button onClick={() => setShowContent("DOCTOR")}>Doctor</Button>
            <Button onClick={() => setShowContent("BLOG")}>Blog</Button>
          </ButtonGroup>
        </Grid>
      </Grid>

      {loading ? (
        <Grid container>
          <LoaderComponent />
        </Grid>
      ) : showContent === "DOCTOR" ? (
        <Grid container justifyContent={"center"} alignItems={"center"}>
          {!loading && doctors.length !== 0 ? (
            <Grid
              container
              justifyContent={"flex-start"}
              alignItems={"center"}
              spacing={2}
              item
              xs={10}
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
            // <Grid
            //   container
            //   justifyContent={"flex-start"}
            //   alignItems={"center"}
            //   spacing={2}
            //   item
            //   xs={10}
            // >
            //   {blogs.map((blog) => (
            //     <Grid item xs={6} sm={6} md={4} lg={3} key={blog.blogId}>
            //       <BlogCard
            //         blogId={blog.blogId}
            //         title={blog.title}
            //         description={blog.description}
            //         image={blog.imageUrl}
            //         name={blog.title}
            //         tags={blog.tags}
            //         date={prettyDate(blog.creationTime)}
            //       />
            //     </Grid>
            //   ))}
            // </Grid>
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
              xs={10}
            >
              {blogs.map((blog) => (
                <Grid item xs={6} sm={6} md={4} lg={3} key={blog.blogId}>
                  <BlogCard
                    blogId={blog.blogId}
                    title={blog.title}
                    description={blog.description}
                    image={blog.imageUrl}
                    name={blog.title}
                    tags={blog.tags}
                    date={prettyDate(blog.creationTime)}
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
  );
};

export default search;
