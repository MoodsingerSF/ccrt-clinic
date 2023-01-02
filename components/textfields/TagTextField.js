import React, { useRef, useState } from "react";
import { Autocomplete, TextField, Typography } from "@mui/material";
import { useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
const TagTextField = ({
  label,
  value,
  onChange,
  error = false,
  errorText,
  retrieveSuggestions,
  processData,
}) => {
  const cancelToken = useRef(null);
  const [suggestions, setSuggestions] = useState([]);
  const [prefix, setPrefix] = useState("");
  console.log(label + " text field rendered");
  const getSuggestions = async (cancelToken, prefix) => {
    try {
      const data = await retrieveSuggestions(cancelToken, prefix);
      setSuggestions(processData(data));
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getSuggestions(cancelToken, prefix);
    return () => {
      cancelToken.current();
    };
  }, [prefix]);
  return (
    <>
      <Autocomplete
        fullWidth
        size="small"
        multiple
        id="tags-outlined"
        value={value}
        options={suggestions}
        getOptionLabel={(option) => option}
        onChange={onChange}
        freeSolo
        renderInput={(params) => (
          <TextField
            {...params}
            onChange={(event) => setPrefix(event.target.value)}
            label={label}
          />
        )}
      />
      {error && (
        <Typography style={{ color: "red", fontSize: "70%" }}>
          {errorText}
        </Typography>
      )}
    </>
  );
};
TagTextField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.bool,
  errorText: PropTypes.string.isRequired,
  retrieveSuggestions: PropTypes.func.isRequired,
  processData: PropTypes.func.isRequired,
};
export default TagTextField;
