import React, { Component, Fragment, useState, useEffect } from "react";
import { Container, Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// icons


// temp image
import Background from "../assets/mapTest.jpg";


const useStyles = makeStyles(theme => ({
  backgroundContainer: {
    padding: "20px",
    backgroundColor: "#9f9f9f",
  },
  backgroundImage: {
    // backgroundColor: "red",
    backgroundImage: `url(${Background})`,
		backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    backgroundPosition: "center"
  },
  toolButton: {
    backgroundColor: "white",
    fontWeight: 800,
    fontSize: "30px",
    padding: '0px 8px',
    borderRadius: '15px'
  }
}));

const ViewImage = () => {
  const [imageHeight, setImageHeight] = useState();
  const [imageWidth, setimageWidth] = useState();
  const classes = useStyles();
  useEffect(()=>{
    getImageSize();
  }, [])
  const getImageSize = () =>{
    let img = new Image();
    img.src = Background;
    img.onload = () => {
      setImageHeight(img.height);
      setimageWidth(img.width);
    }
  }
  
	return (
		<Container>
			<Box mt={10}>
				<h4>Image View</h4>
        image height is : {imageHeight}
        image width is :{imageWidth}
				<Box className={classes.backgroundContainer} border={1} width="100%" height="60vh">
					<Box className={classes.backgroundImage} width="100%" height="60vh">
            <Box style={{float:'right'}}>
              <Box m={2}><i className={classes.toolButton}>{"\u002B"}</i></Box>
              <Box m={2}><i className={classes.toolButton}>{"\u2212"}</i></Box>
              <Box m={2}><i className={classes.toolButton}>{"\u2212"}</i></Box>
            </Box>
					</Box>
				</Box>
			</Box>
		</Container>
	);
};

export default ViewImage;
