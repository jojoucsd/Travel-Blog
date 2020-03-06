import React , {useState, createRef} from 'react'
import ReactMapGL, {Source, Layer, Popup} from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

import { siteMetadata } from '../../../gatsby-config'
import {clusterLayer, clusterCountLayer, unclusteredPointLayer} from './layers';

const { mapboxToken } = siteMetadata

const Map = () =>{

    const [showPopup, setShowPopup] =useState({})
    const [viewport, setViewport] = useState({
        width: '100vw',
        height: '100vh',
        latitude: 37.2294,
        longitude: -119.5094,
        zoom: 6.5, 
      });
    
    const sourceRef = createRef(null)

    const onClick = event => {
        console.log(event)
        if(event.features[0] !== undefined) {
        const feature = event.features[0];
        const clusterId = feature.properties.cluster_id;

        const mapboxSource = sourceRef.current.getSource()

        mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) =>{
            if(err){
                return;
            }
            setViewport({
                ...viewport,
                longitude: feature.geometry.coordinates[0],
                latitude: feature.geometry.coordinates[1],
                zoom,
                transitionDuration: 500
            })
        })
        }else{
            setShowPopup({isOpen:true})
            setViewport({
                ...viewport,
                longitude: event.lngLat[0],
                latitude: event.lngLat[1],
                zoom : 8,
                transitionDuration: 500
                })
        }
    }

      return(
        <ReactMapGL
        width ='100%'
        height = '100%'
        mapStyle="mapbox://styles/jojoleto/ck6oid21g29it1ir3gbypurj9"
        mapboxApiAccessToken= {mapboxToken}
        {...viewport}
        onViewportChange={setViewport}
        interactiveLayerIds= {[clusterLayer.id]}
        onClick = {onClick}
     >
        <Source
          type="geojson"
          data="https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson"
          cluster={true}
          clusterMaxZoom={14}
          clusterRadius={50}
          ref={sourceRef}
        >
          <Layer {...clusterLayer} />
          <Layer {...clusterCountLayer} />
          <Layer {...unclusteredPointLayer} />
        </Source>

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