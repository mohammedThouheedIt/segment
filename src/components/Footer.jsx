import { Button } from "@mui/material";
import React from "react";

const Footer = ({ handleClear, handleSubmit }) => {
  return (
    <div className="footer">
      <div className="btn-wrapper">
        <Button onClick={handleSubmit} variant="contained" className="save-btn">
          {"Save the Segment"}
        </Button>
        <Button onClick={handleClear} variant="outlined" className="cancel-btn">
          {"Cancel"}
        </Button>
      </div>
    </div>
  );
};

export default Footer;
