import React, {Component, Fragment} from 'react';
import PinchZoomPan from "react-responsive-pinch-zoom-pan";

class WelcomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 561,
            height: 500
        }
        this.myRef = React.createRef();


    }

    render() {
        return (
            <Fragment>
                <div>
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

                    <div onWheel={this.onMouseWheel} style={{ width: '500px', height: '500px' }}>
                        <PinchZoomPan >
                            <img ref={this.myRef} alt='Test Image' src='http://picsum.photos/750/750' />
                        </PinchZoomPan>
                    </div>
                </div>
            </Fragment>
        );
    }

    onMouseWheel = (event) => {
        setTimeout(()=>{
            let width = this.myRef.current.width
            console.log(width)
        },200)

    }
}

export default WelcomePage;