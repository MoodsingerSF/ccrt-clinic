import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import { blogData } from "../../../data/blog/data";
import BlogRequestRow from "./BlogRequestRow";

const BlogRequest = () => {
  const classes = useStyle();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <TableContainer
      className={classes.ccrt__dashboard__blog__request}
      // component={Paper}
    >
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
          {blogData
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((item) => (
              <BlogRequestRow key={item.blogId} item={item} />
            ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={blogData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

const useStyle = makeStyles((theme) =>
  createStyles({
    ccrt__dashboard__blog__request: {
      marginTop: "100px",
    },
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
