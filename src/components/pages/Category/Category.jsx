import * as React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function Caterogy() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Box sx={{ bgcolor: "background.paper" }}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="New Movie" {...a11yProps(0)} />
          <Tab label="Anime" {...a11yProps(1)} />
          <Tab label="Action" {...a11yProps(2)} />
          <Tab label="Romantic" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel
          style={{ color: "#000" }}
          value={value}
          index={0}
          dir={theme.direction}
        >
          Item One
        </TabPanel>
        <TabPanel
          style={{ color: "#000" }}
          value={value}
          index={1}
          dir={theme.direction}
        >
          Item Two
        </TabPanel>
        <TabPanel
          style={{ color: "#000" }}
          value={value}
          index={2}
          dir={theme.direction}
        >
          Item Three
        </TabPanel>
        <TabPanel
          style={{ color: "#000" }}
          value={value}
          index={3}
          dir={theme.direction}
        >
          Item Four
        </TabPanel>
      </SwipeableViews>
    </Box>
  );
}
