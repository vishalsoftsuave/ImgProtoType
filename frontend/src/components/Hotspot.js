import React, {useState, useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import RoomIcon from "@material-ui/icons/Room";
import ClearIcon from '@material-ui/icons/Clear';

import { Box, Typography, Button, TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	hotspot: {
		position: "absolute",
		fontSize: "25px",
		width: "2px",
		fontWeight: 900,
		zIndex: "1",
		color: "red",
		lineHeight: "0px",
		height: "0px",
	},
	hotspotBox: {
    border: "solid 1.5px",
		position: "absolute",
		backgroundColor: "white",
    display: "inline",
    zIndex: "1",
    padding: 10,
    borderRadius: "25px",
    minWidth: "300px"
  },
  textField: {
    '& input': {
      padding: '5px',
      fontWeight: 600
    },

    '& fieldset': {
      borderRadius: 0
    }
  },
}));

const HotSpot = ({ hotspot, ishotspotActive, hotspotIndex, toggleHotspot, onChangeActiveHotspotData }) => {
  const classes = useStyles();
  let {top, left, value} = hotspot;

	if (!ishotspotActive)
		return (
			<i
				className={classes.hotspot}
				style={{
					top: (top || 0) + "px",
					left: (left || 0) + "px",
				}}
				hotspotindex={hotspotIndex}
				onClick={e=>toggleHotspot(e,true)}
			>
				<RoomIcon />
			</i>
		);
	else {
		return (
    <Box className={classes.hotspotBox} style={{
      top: (top || 0) + "px",
      left: (left || 0) + "px",
    }}>
      <ClearIcon style={{float: "right", cursor: "pointer"}} onClick={e=>toggleHotspot(e,false)}/>
      <TextField name="value" onChange={(e)=>onChangeActiveHotspotData(e)}className={classes.textField} variant="outlined" value={value || ""} />

    </Box>
    );
	}
};

export default HotSpot;
