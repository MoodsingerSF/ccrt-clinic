import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import BlogRequestRow from "./BlogRequestRow";
import useBlogs from "../../../hooks/useBlogs";
import { VerificationStatus } from "../../../enums/VerificationStatus";
import { SNACKBAR_INITIAL_STATE } from "../../../misc/constants";
import CustomSnackbar from "../../snackbar/CustomSnackbar";
import {
  handleSnackbarClose,
  handleSnackbarOpen,
} from "../../../misc/functions";
import LoaderBackdrop from "../../backdrops/LoaderBackdrop";
import NoContentToShowComponent from "../../misc/NoContentToShowComponent";
const BlogRequest = () => {
  const classes = useStyle();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [snackbar, setSnackbar] = useState(SNACKBAR_INITIAL_STATE);
  const { loading, blogs, totalBlogs } = useBlogs(
    page,
    VerificationStatus.PENDING
  );
  const [loading2, setLoading2] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const openSnackbar = (message) => {
    handleSnackbarOpen(message, setSnackbar);
  };
  const handleLoadingOpen = () => {
    setLoading2(true);
  };
  const handleLoadingClose = () => {
    setLoading2(false);
  };

  return (
    <>
      {!loading ? (
        blogs.length === 0 ? (
          <NoContentToShowComponent title="No blog requests to show." />
        ) : (
          <TableContainer>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Author</TableCell>
                  <TableCell align="center" style={{ width: "200px" }}>
                    Blog title
                  </TableCell>
                  <TableCell align="right">Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {blogs
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(
                    ({
                      avatar,
                      fullName,
                      blogId,
                      title,
                      description,
                      imageUrl,
                      tags,
                    }) => (
                      <BlogRequestRow
                        key={blogId}
                        blogId={blogId}
                        avatar={avatar}
                        creatorName={fullName}
                        status="pending"
                        title={title}
                        description={description}
                        imageUrl={imageUrl}
                        tags={tags}
                        openSnackbar={openSnackbar}
                        handleLoadingOpen={handleLoadingOpen}
                        handleLoadingClose={handleLoadingClose}
                      />
                    )
                  )}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5]}
              component="div"
              count={totalBlogs}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        )
      ) : (
        <LoaderBackdrop open={true} />
      )}
      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        onClose={() => {
          handleSnackbarClose(setSnackbar);
        }}
      />
      <LoaderBackdrop open={loading2} />
    </>
  );
};

const useStyle = makeStyles((theme) =>
  createStyles({
    table: {
      marginTop: theme.spacing(3),
      "& thead th": {
        fontWeight: "500",
        color: "#FFFFFF",
        background: theme.palette.primary.main_minus_2,
      },
      "& tbody td": {
        fontWeight: "400",
        fontSize: "85%",
        padding: "10px ",
      },
      "& tbody tr:hover": {
        background: theme.palette.custom.TABLE_HOVER_COLOR,
        cursor: "pointer",
      },
    },
  })
);

export default BlogRequest;
