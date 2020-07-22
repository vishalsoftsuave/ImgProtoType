import React, {Component, Fragment} from 'react';
import PinchZoomPan from "react-responsive-pinch-zoom-pan";
import { Container, Box } from "@material-ui/core";
import Hotspot from "./Hotspot"

class WelcomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 561,
            height: 500,
            top:133,
            left:391,
            originalTop:133,
            originalLeft:391,
            display: true,
            hotspotList: [],
            isCreateHotSpot: true
        }
        this.myRef = React.createRef();
        this.myRefZoom = React.createRef();
    }

    createHotSpot = (event) => {
        if(!this.state.isCreateHotSpot)
            return;
        let clickedAt = {
            left: event.pageX - event.currentTarget.offsetLeft,
            top: event.pageY - event.currentTarget.offsetTop
        }
        let newHotSpot = {
            originalLeft: (this.myRefZoom.current.state.left*-1) +(clickedAt.left/this.myRefZoom.current.state.scale),
            originalTop: (this.myRefZoom.current.state.top *-1)+(clickedAt.top/this.myRefZoom.current.state.scale),
            display: true
        }
        let left=this.myRefZoom.current.state.left +(newHotSpot.originalLeft*this.myRefZoom.current.state.scale);
        let top=this.myRefZoom.current.state.top +(newHotSpot.originalTop*this.myRefZoom.current.state.scale);
        newHotSpot = {...newHotSpot, ...{left: left, top: top}}
        this.setState({hotspotList: [...this.state.hotspotList, newHotSpot]});
    }



    render() {
        return (
            <Container>
                <Box mt={10} width="100%">
                   {/* <div style={{
                        marginLeft: '400px',
                        marginTop: '130px',
                        width: '561px',
                        height: '500px',
                        overflow:'hidden'
                    }}>
                        <div onWheel={this.onMouseWheel}
                             draggable="true"
                             style={{
                            width: this.state.width+'px',
                            height: this.state.height+'px'
                        }}>
                           <img src={'https://live.staticflickr.com/4561/38054606355_26429c884f_b.jpg'} style={{width:'100%'}}/>
                        </div>
                    </div>*/}
                    <Box onWheel={this.onMouseWheel} onClick={this.createHotSpot} style={{position:'relative', width: '500px', height: '500px', overflow:"hidden" }}>
                    {/* {this.state.display && <Hotspot style={{position: "relative"}} coordinates={{left: this.state.left, top: this.state.top }}/>} */}
                    {this.state.hotspotList.length>0 && 
                    this.state.hotspotList.map((hotspot, index)=>{
                        let {display, top, left} = hotspot;
                        if(display)
                            return <Hotspot coordinates={{left, top}}/>
                        return ""
                    })
                    }
                        <PinchZoomPan ref={this.myRefZoom} initialScale={1}>
                            <img ref={this.myRef} className='testing' style={{cursor:"crosshair !important"}} alt='Test Image' src='https://live.staticflickr.com/4561/38054606355_26429c884f_b.jpg' />
                        </PinchZoomPan>
                    </Box>
                </Box>
            </Container>
        );
    }

    onMouseWheel = (event) => {
        setTimeout(()=>{
/*
            let width = this.myRef.current.width
            console.log(this.myRef.current.style.transform)
*/
            let {hotspotList} = this.state;
            if(!hotspotList.length>0){
                return;
            }
            hotspotList = hotspotList.map((hotspot)=>{
                let {display, originalLeft, originalTop} = hotspot;
                hotspot.left=this.myRefZoom.current.state.left +(originalLeft*this.myRefZoom.current.state.scale);
                hotspot.top=this.myRefZoom.current.state.top +(originalTop*this.myRefZoom.current.state.scale);
                hotspot.display = hotspot.left>=0 && hotspot.top>=0;
                return hotspot;
            })
            this.setState({hotspotList});
            // let left=this.myRefZoom.current.state.left +(this.state.originalLeft*this.myRefZoom.current.state.scale)
            // let top=this.myRefZoom.current.state.top +(this.state.originalTop*this.myRefZoom.current.state.scale)
            // let display = left>=0 && top>=0
            // this.setState({left,top, display})
        },50)

    }
}

export default WelcomePage;