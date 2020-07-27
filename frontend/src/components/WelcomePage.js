import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {Link} from "react-router-dom"

import {
	Container,
	Box,
	Button,
} from "@material-ui/core";


import mapData from "../staticData/mapData"

const useStyles = makeStyles((theme) => ({
	mapContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  map: {
		width: "400px",
    height: "400px",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    margin: "25px",
    backgroundPosition: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"

  },
  viewButton: {
    textDecoration: "none",
    backgroundColor: "white",
    fontWeight: 600,
    padding: "10px 30px",
    '&:hover': { backgroundColor: "white", },
  }
	
}));


const WelcomePage = (props) => {
  const classes = useStyles();
  return (
    <Container>
      <Box mt={30} display={"flex"} className={classes.mapContainer}>
        <Box className={classes.map} border={1} style={{backgroundImage: `url(${mapData[0].image})`}}>
            <Link to={`/viewimage/0`}><Button variant="outlined" className={classes.viewButton}>View</Button></Link>
        </Box>
      </Box>
    </Container>
  );
}

export default WelcomePage;