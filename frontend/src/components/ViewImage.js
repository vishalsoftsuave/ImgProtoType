import React, { Component, Fragment } from "react";
import PinchZoomPan from "react-responsive-pinch-zoom-pan";
import {
	Container,
	Box,
	Typography,
	Button,
	TextField,
} from "@material-ui/core";
import Hotspot from "./Hotspot";

import mapData from "../staticData/mapData"

class ViewImage extends Component {
	constructor(props) {
		super(props);
		let mapIndex = props.match.params.id;
		this.state = {
			hotspotList: [],
			ishotspotActive: false,
			activeHotspotIndex: "",
			mapIndex,
			imageSize: 500
		};
		this.myRef = React.createRef();
		this.myRefZoom = React.createRef();
		}

		componentDidMount(){
			this.setState(this.getHotspotListData());
		}

		getHotspotListData= ()=>{
			let hotspotList = [];
			let mapIndex= this.props.match.params.id;
			let hotspotListArray =JSON.parse(localStorage.getItem("hotspotListArray"));
			if(Array.isArray(hotspotListArray)){
				let hotspotListObject = hotspotListArray.find((hotspotList)=>hotspotList.mapid===mapIndex)
				if(hotspotListObject)
					hotspotList = hotspotListObject.hotspotList;
			}
			return {hotspotList, mapIndex}
		}
		componentDidUpdate(prevProps, prevState){
			if(prevProps.match.params.id != this.props.match.params.id)
			{
				this.storeHotspotData();
				this.setState(this.getHotspotListData(), ()=>this.onMouseWheel);
			}else if(prevState.hotspotList && (prevState.hotspotList.length != this.state.hotspotList.length))
			{
				this.onMouseWheel();
			}
		}
    
    onChangeActiveHotspotData = (e, data)=>{
        let {hotspotList, activeHotspotIndex} = this.state;
				let hotspot = hotspotList.find((hotspot, index) => index == activeHotspotIndex);
				let index = e.currentTarget.getAttribute("dataindex");
        hotspot.data = { name: data, index};
        this.setState({hotspotList});
		}

		storeHotspotData = () =>{	
			let hotspotListArray = JSON.parse(localStorage.getItem("hotspotListArray"));
			let newhotspotList = []
			if(Array.isArray(hotspotListArray)){
				newhotspotList = hotspotListArray.find(hotspotList=>hotspotList.mapid==this.state.mapIndex);
				if(newhotspotList)
					newhotspotList.hotspotList = this.state.hotspotList
				else{
					hotspotListArray.push({mapid: this.state.mapIndex, hotspotList: this.state.hotspotList})
				}		
			}else{
				hotspotListArray = [];
				hotspotListArray.push({mapid: this.state.mapIndex, hotspotList: this.state.hotspotList});
			}
			localStorage.setItem('hotspotListArray', JSON.stringify(hotspotListArray));
		}

	createHotSpot = (event) => {
				let zoomIconClicked = event.target.closest(".iconButton") ? true: false;
        if(zoomIconClicked)
        this.onMouseWheel(event)

        if (zoomIconClicked || this.state.ishotspotActive) return;
		let clickedAt = {
			left: event.pageX - event.currentTarget.offsetLeft,
			top: event.pageY - event.currentTarget.offsetTop,
		};
		let newHotSpot = {
			originalLeft:
				this.myRefZoom.current.state.left * -1 +
				clickedAt.left / this.myRefZoom.current.state.scale,
			originalTop:
				this.myRefZoom.current.state.top * -1 +
				clickedAt.top / this.myRefZoom.current.state.scale,
			display: true,
		};
		let left =
			this.myRefZoom.current.state.left +
			newHotSpot.originalLeft * this.myRefZoom.current.state.scale;
		let top =
			this.myRefZoom.current.state.top +
            newHotSpot.originalTop * this.myRefZoom.current.state.scale;
		newHotSpot = { 
            ...newHotSpot,
            ...{ left, top, data: "" },
            };
		this.setState({ hotspotList: [...this.state.hotspotList, newHotSpot] });
	};

	hotspotClicked = (e, type) => {
        if(type)
		{
            let index = e.currentTarget.getAttribute("hotspotindex");
            this.setState({ ishotspotActive: true, activeHotspotIndex: index });
        }else{
            this.setState({ishotspotActive: false, activeHotspotIndex: ""});
        }
        e.stopPropagation();
        
    };

	render() {
        let {hotspotList, ishotspotActive, activeHotspotIndex} = this.state;
        if(ishotspotActive && activeHotspotIndex != null)
        {
            hotspotList = hotspotList.filter((hotspot,index)=>index==activeHotspotIndex)
        }
		return (
			<Container>
				<Box mt={10} width="100%"  align={"center"} 
				// style={{display: "flex", height:"90vh", alignItems: "center", justifyContent:"center"}} 
				>
					<Box
						onWheel={this.onMouseWheel}
						onClick={this.createHotSpot}
						style={{
							position: "relative",
							backgroundColor: "black",
							width: this.state.imageSize+"px",
							height: this.state.imageSize+"px",
						}}
					>
						{hotspotList.length > 0 &&
							hotspotList.map((hotspot, index) => {
								let { display, top, left } = hotspot;
								if (display)
									return (
										<Hotspot
											key={index}
											toggleHotspot={this.hotspotClicked}
											hotspotIndex={index}
											hotspot={hotspot}
											ishotspotActive={ishotspotActive}
											onChangeActiveHotspotData={this.onChangeActiveHotspotData}
										/>
									);
								return "";
							})}
						<PinchZoomPan ref={this.myRefZoom} initialScale={1} className="testingDiv">
							<img
								ref={this.myRef}
								className="testing"
								style={{ cursor: "crosshair !important" }}
								alt="Test Image"
								src={mapData[this.state.mapIndex].image}							/>
						</PinchZoomPan>
					</Box>
				</Box>
			</Container>
		);
	}

	onMouseWheel = (event) => {
		setTimeout(() => {
			let { hotspotList } = this.state;
			if (!hotspotList.length > 0) {
				return;
			}
			hotspotList = hotspotList.map((hotspot) => {
				let { display, originalLeft, originalTop } = hotspot;
				hotspot.left =
					this.myRefZoom.current.state.left +
					originalLeft * this.myRefZoom.current.state.scale;
				hotspot.top =
					this.myRefZoom.current.state.top +
					originalTop * this.myRefZoom.current.state.scale;
				hotspot.display = (hotspot.left >= 0  && hotspot.left < this.state.imageSize) && (hotspot.top >= 0 && hotspot.top <this.state.imageSize);
				return hotspot;
			});
			this.setState({ hotspotList });
		}, 50);
    };
    
    componentWillUnmount(){
			this.storeHotspotData();
    }
}

export default ViewImage;
