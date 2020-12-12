import React from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const StyledTabs = withStyles({
  indicator: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    "& > span": {
      maxWidth: 100,
      width: "100%",
      backgroundColor: "#ff7610",
    },
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const StyledTab = withStyles((theme) => ({
  root: {
    textTransform: "none",
    color: "#000",
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    border: "none",
    "&:focus": {
      opacity: 1,
    },
  },
}))((props) => <Tab disableRipple {...props} />);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  padding: {
    padding: theme.spacing(3),
  },
  demo2: {
    backgroundColor: "#fff",
  },
}));
export default function SimpleTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <div className={classes.demo2}>
        <StyledTabs
          centered
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          {props.label1 ? (
            <StyledTab label={props.label1} {...a11yProps(0)} />
          ) : (
            ""
          )}
          {props.label2 ? (
            <StyledTab label={props.label2} {...a11yProps(1)} />
          ) : (
            ""
          )}
          {props.label3 ? (
            <StyledTab label={props.label3} {...a11yProps(2)} />
          ) : (
            ""
          )}
          {props.label4 ? (
            <StyledTab label={props.label4} {...a11yProps(3)} />
          ) : (
            ""
          )}
        </StyledTabs>
      </div>
      {props.child1 ? (
        <TabPanel value={value} index={0}>
          {props.child1}
        </TabPanel>
      ) : (
        ""
      )}
      {props.child2 ? (
        <TabPanel value={value} index={1}>
          {props.child2}
        </TabPanel>
      ) : (
        ""
      )}
      {props.child3 ? (
        <TabPanel value={value} index={2}>
          {props.child3}
        </TabPanel>
      ) : (
        ""
      )}
      {props.child4 ? (
        <TabPanel value={value} index={3}>
          {props.child4}
        </TabPanel>
      ) : (
        ""
      )}
    </div>
  );
}
