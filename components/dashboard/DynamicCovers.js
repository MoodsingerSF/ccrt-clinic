import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import theme from "../../themes/theme";
import CoverCardSelect from "../cards/CoverCardSelect";
import { retrieveAllCovers } from "../../controllers/CoverController";
import LoaderComponent from "../misc/LoaderComponent";
import NoContentToShowComponent from "../misc/NoContentToShowComponent";
import DashboardTitle from "./DashboardTitle";
import { COVER_FILTER } from "../../misc/constants";
import DashboardFilterComponent from "../misc/DashboardFilterComponent";
import CoverCard from "../cards/CoverCard";
import { SNACKBAR_INITIAL_STATE } from "../../misc/constants";
import { handleSnackbarClose, handleSnackbarOpen } from "../../misc/functions";
import CustomSnackbar from "../snackbar/CustomSnackbar";

const iconStyle = {
  fontSize: "500%",
  color: theme.palette.primary.main,
};

const selectCoverData = [
  {
    id: "1",
    type: "DOCTOR",
    icon: <AccountBoxIcon style={iconStyle} />,
  },
  {
    id: "2",
    type: "BLOG",
    icon: <TextSnippetIcon style={iconStyle} />,
  },
];

const DynamicCovers = () => {
  const [covers, setCovers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState(COVER_FILTER.VISIBLE);
  const [snackbar, setSnackbar] = useState(SNACKBAR_INITIAL_STATE);

  const openSnackbar = (message) => {
    handleSnackbarOpen(message, setSnackbar);
  };

  const getCovers = async () => {
    try {
      setLoading(true);
      const covers = await retrieveAllCovers(type);
      setCovers(covers);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    getCovers();
  }, [type]);

  return (
    <Grid container>
      <Grid container justifyContent={"flex-start"} alignItems={"center"}>
        <DashboardTitle title="Add a new cover" />
        <Grid
          container
          spacing={2}
          justifyContent="center"
          style={{ marginBottom: 20 }}
        >
          {selectCoverData.map((item) => (
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              item
              key={item.id}
              xs={6}
              sm={4}
              md={3}
            >
              <CoverCardSelect
                type={item.type}
                icon={item.icon}
                onSuccess={(cover) => {
                  console.log(cover);
                }}
                openSnackbar={openSnackbar}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid container justifyContent={"flex-start"} alignItems={"center"}>
        <Grid item xs={4} mb={2}>
          <DashboardFilterComponent
            value={type}
            onChange={(e) => {
              setType(e.target.value);
            }}
            options={COVER_FILTER}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {loading ? (
          <Grid container justifyContent={"center"} alignItems="center">
            <LoaderComponent />
          </Grid>
        ) : covers.length === 0 ? (
          <NoContentToShowComponent title="No cover has been added yet." />
        ) : (
          covers.map((item) => {
            return (
              <Grid item xs={12} sm={6} md={6} lg={4} key={item.coverId}>
                <CoverCard
                  id={item.coverId}
                  type={item.type}
                  imageUrl={item.imageUrl}
                  openSnackbar={openSnackbar}
                  status={type}
                  onDeleteSuccess={() => {
                    setCovers((prev) =>
                      prev.filter((item2) => item2.coverId !== item.coverId)
                    );
                  }}
                />
              </Grid>
            );
          })
        )}
      </Grid>
      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        onClose={() => {
          handleSnackbarClose(setSnackbar);
        }}
      />
    </Grid>
  );
};

export default DynamicCovers;
