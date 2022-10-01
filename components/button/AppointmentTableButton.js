import React from "react";
import PropTypes from "prop-types";
import theme from "../../themes/theme";

const AppointmentTableButton = ({ title, onClick }) => {
  return (
    <button
      style={{
        textTransform: "capitalize",
        fontWeight: "500",
        color: theme.palette.custom.DEFAULT_COLOR,
        background: "#fff",
        border: `1px solid ${theme.palette.custom.DEFAULT_COLOR}`,
        borderRadius: "5px",
        cursor: "pointer",
        margin: "5px",
        padding: "5px",
        transition: "all 0.3s ease",
        "&:hover": {
          background: theme.palette.custom.DEFAULT_COLOR,
        },
      }}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

AppointmentTableButton.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
export default AppointmentTableButton;
