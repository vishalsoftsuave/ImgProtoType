import React, {useState, useEffect, Fragment} from "react";
import { makeStyles } from "@material-ui/core/styles";
import RoomIcon from "@material-ui/icons/Room";
import ClearIcon from '@material-ui/icons/Clear';
import {Link} from "react-router-dom";
import { withRouter } from "react-router";

import mapData from '../staticData/mapData';

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
  viewButton: {
    textDecoration: "none",
    backgroundColor: "white",
    fontWeight: 600,
    padding: "10px 30px",
    '&:hover': { backgroundColor: "white", },
  }
}));

const HotSpot = ({ hotspot, ishotspotActive, hotspotIndex, toggleHotspot, onChangeActiveHotspotData, history }) => {
  const classes = useStyles();
  const [showData, toggleShowData] = useState(true);
  let {top, left, data} = hotspot;

  useEffect(()=>{
    if(data!="")
    {
      toggleShowData(false)
    }else if(!showData)
    {
      toggleShowData(true)
    }
  },[data])
  const redirectMap = (e)=>{
    toggleHotspot(e,false);
    history.push(`/viewimage/${data.index}`);
  }

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
      <Box>
        {showData ? ((mapData.length >0) && mapData.map((data, index)=>{
          return <Fragment key={index}><Button  dataindex={index} onClick={(e, index)=>onChangeActiveHotspotData(e, data.name)}>{data.name}</Button><br/></Fragment>
        })): (<Button variant="outlined" className={classes.viewButton} onClick={(e)=>redirectMap(e)}>{data.name || ""}</Button>)}
      </Box>

    </Box>
    );
	}
};

export default withRouter(HotSpot);
