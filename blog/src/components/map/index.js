import React , {useState } from 'react'
import ReactMapGL, { Marker, Popup} from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

import { siteMetadata } from '../../../gatsby-config'

const { mapboxToken } = siteMetadata

const Map = ({geoCenter, style}) =>{
    const [showPopup, setShowPopup] =useState(false)
    const [viewport, setViewport] = useState(style && geoCenter ?
      {
        width: style.width,
        height: style.height,
        latitude: geoCenter.lat,
        longitude: geoCenter.lng,
        zoom: style.zoom
      } 
      :{
        width: '100vw',
        height: '100vh',
        latitude: 37.2294,
        longitude: -119.5094,
        zoom: 6.5, 
      });

    const onClick = event => {
          setShowPopup({isOpen:true})
    }
      return(
        <ReactMapGL
        width = '100%'
        height = '100%'
        mapStyle="mapbox://styles/jojoleto/ck6oid21g29it1ir3gbypurj9"
        mapboxApiAccessToken= {mapboxToken}
        {...viewport}
        onViewportChange={setViewport}
        // onClick = {onClick}
     >
       {
         <React.Fragment>
          <Marker
            latitude={geoCenter.lat}
            longitude={geoCenter.lng}
            >
            <div
                onKeyDown={()=>{}}
                onClick={onClick}
                role='presentation'
              >
                <svg
                  className="marker yellow"
                  style={{
                    cursor: 'pointer',
                    transform: "translate(-50%, -100%)",
                    fill: '#F3B73E',
                    height: `${4 * viewport.zoom}px`,
                    width: `${4 * viewport.zoom}px`,
                  }}
                  version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512 512">
                  <g>
                    <g>
                      <path d="M256,0C153.755,0,70.573,83.182,70.573,185.426c0,126.888,165.939,313.167,173.004,321.035
                        c6.636,7.391,18.222,7.378,24.846,0c7.065-7.868,173.004-194.147,173.004-321.035C441.425,83.182,358.244,0,256,0z M256,278.719
                        c-51.442,0-93.292-41.851-93.292-93.293S204.559,92.134,256,92.134s93.291,41.851,93.291,93.293S307.441,278.719,256,278.719z"/>
                    </g>
                  </g>
                </svg>
              </div>
          </Marker>
         </React.Fragment>
       }
        {
         showPopup.isOpen ?(
             <Popup
             latitude={viewport.latitude}
             longitude={viewport.longitude}
             closeButton={true}
             closeOnClick={true}
             dynamicPosition={true}
             onClose={()=>setShowPopup({})}
             anchor="top"
            > 
            <div style={{paddingTop:'25px'}}>
                <p>latitude: {viewport.latitude}</p>
                <p>longitude: {viewport.longitude}</p>
            </div>

            </Popup>
         ):null
        }
     </ReactMapGL>
      )
}
export default Map