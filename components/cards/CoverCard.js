import React, { useEffect, useRef, useState } from "react";
import { Box, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import Image from "next/image";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import ConfirmationModal from "../modal/ConfirmationModal";
import { deleteCover, visibleCover } from "../../controllers/CoverController";
import { COVER_FILTER } from "../../misc/constants";
import { errorHandler } from "../../misc/functions";

const CoverCard = ({
  imageUrl,
  id,
  type,
  openSnackbar,
  status,
  onDeleteSuccess,
}) => {
  const classes = useStyles();
  const ref = useRef(null);
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [height, setHeight] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleDeleteCover = async () => {
    try {
      setLoading(true);
      await deleteCover(id);
      setLoading(false);
      onDeleteSuccess();
      openSnackbar("Cover has been removed successfully.");
      setOpenConfirmationModal(false);
    } catch (error) {
      setLoading(false);
      openSnackbar(error.message);
    }
  };

  const makeItVisible = async () => {
    try {
      setLoading(true);
      await visibleCover(id, COVER_FILTER.VISIBLE);
      setLoading(false);
      openSnackbar("This cover is now visible.");
    } catch (error) {
      setLoading(false);
      errorHandler(error, openSnackbar);
    }
  };

  const makeItNonVisible = async () => {
    try {
      setLoading(true);
      await visibleCover(id, COVER_FILTER.NON_VISIBLE);
      setLoading(false);
      onDeleteSuccess();
      openSnackbar("This cover is now non-visible.");
    } catch (error) {
      setLoading(false);
      errorHandler(error, openSnackbar);
    }
  };

  useEffect(() => {
    if (ref && ref.current) {
      setHeight((ref.current.offsetWidth * 14) / 19);
    }
  }, [ref]);

  return (
    <Grid item xs={12} ref={ref} style={{ position: "relative" }}>
      <Box
        className={classes.ccrt__image__container}
        style={{
          height: height,
        }}
      >
        <Image
          loader={({ src }) => src}
          src={imageUrl}
          alt="banner"
          layout="fill"
          objectFit="contain"
        />
      </Box>
      <Grid
        container
        style={{ position: "absolute", bottom: "0", background: "#fff" }}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography className={classes.ccrt__tag__wrapper}>{type}</Typography>
        <Grid>
          {status === "VISIBLE" ? (
            <IconButton className={classes.ccrt__icon__wrapper}>
              <Tooltip title="Visible this cover" arrow>
                <VisibilityOutlinedIcon
                  className={classes.iconStyle}
                  onClick={makeItNonVisible}
                />
              </Tooltip>
            </IconButton>
          ) : (
            <IconButton className={classes.ccrt__icon__wrapper}>
              <Tooltip title="Visible this cover" arrow>
                <VisibilityOffOutlinedIcon
                  className={classes.iconStyle}
                  onClick={makeItVisible}
                />
              </Tooltip>
            </IconButton>
          )}

          <IconButton className={classes.ccrt__icon__wrapper}>
            <Tooltip title="Delete this cover" arrow>
              <DeleteIcon
                className={classes.iconStyle}
                onClick={() => {
                  setOpenConfirmationModal(true);
                }}
              />
            </Tooltip>
          </IconButton>
        </Grid>
      </Grid>
      {openConfirmationModal && (
        <ConfirmationModal
          title="Do you want to remove this cover?"
          open={openConfirmationModal}
          onNegativeFeedback={() => {
            setOpenConfirmationModal(false);
          }}
          onPositiveFeedback={handleDeleteCover}
          loading={loading}
        />
      )}
    </Grid>
  );
};
CoverCard.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  onSuccessfulRemoval: PropTypes.func.isRequired,
  openSnackbar: PropTypes.func.isRequired,
  status: PropTypes.any,
  onDeleteSuccess: PropTypes.func.isRequired,
};
const useStyles = makeStyles((theme) => ({
  ccrt__image__container: {
    position: "relative",
    boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
    marginBottom: "20px",
  },
  ccrt__tag__wrapper: {
    padding: "2px 15px",
    fontSize: "80%",
    borderRadius: "50px",
    background: theme.palette.custom.TAG_BACKGROUND,
    lineHeight: "1.7",
    margin: "5px",
  },
  ccrt__icon__wrapper: {
    margin: "5px",
  },
  iconStyle: {
    fontSize: "120%",
    cursor: "pointer",
    padding: "5px",
  },
}));
export default CoverCard;
