import React from 'react';
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles(theme => ({
  hotspot: {
    position:'relative', 
    fontSize: '25px', 
    width:'2px',
    fontWeight:900,
    zIndex:'1',
    color:'red'
  }
}));

// {position:'relative', fontSize: '25px',
// width:'2px',fontWeight:900, display:this.state.display,
//                         zIndex:'1',
//                         color:'red'}

const HotSpot = ({  coordinates }) => {
  const classes = useStyles();
  return (
    <i className={classes.hotspot} style={{top: (coordinates.top || 0)+"px", left: (coordinates.left||0)+"px"}}>.</i>
  );
}

export default HotSpot;