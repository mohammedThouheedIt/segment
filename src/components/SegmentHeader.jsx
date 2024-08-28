import React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const SegmentHeader = ({ toggleDrawer }) => {
  return (
    <Box
      sx={{ width: 400, backgroundColor: "#39aebc" }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <ArrowBackIosNewIcon sx={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary={"Saving Segment"} sx={{ color: "#fff" }} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};

export default SegmentHeader;
