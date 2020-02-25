import React , {useState, useEffect} from 'react'
import Layout from '../components/layout'
import ReactMapGL , { Marker, Popup }from 'react-map-gl'
import { siteMetadata } from '../../gatsby-config'
import { Avatar, Badge } from 'antd'
import { Link, graphql } from 'gatsby'
import fakeData from 'fakeData'
import Geolocation from '../util/geoLocation'
import 'mapbox-gl/dist/mapbox-gl.css'

// import Map from '../components/map'


const MapPage = ({ data }) => {
  const {allStrapiArticle} = data
  const {edges} = allStrapiArticle
  const {sanFran} = fakeData
  const [showPopup, setShowPopup] = useState({})
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    // latitude: 37.7577,
    // longitude: -95.665,
    latitude: sanFran.lat,
    longitude: sanFran.lng,
    zoom: sanFran.zoom
  });
  console.log('map', edges)
  useEffect (() => {
    // if (addGeoData.length > 0) addGeoData.map(article => Geolocation(article.node))
    // edges.map(article => Geolocation(article.node))
  })

  return(
  <Layout content={'map'}>
   <ReactMapGL
      mapStyle="mapbox://styles/jojoleto/ck6oid21g29it1ir3gbypurj9"
      mapboxApiAccessToken= {siteMetadata.mapboxToken}
      {...viewport}
      onViewportChange={setViewport}
   >
         { edges.map(document => console.log(document) || (
      <React.Fragment key={document.node.id}>
         <Marker
          latitude={document.node.geolocation.lat}
          longitude= {document.node.geolocation.lng}
         >
        <div        
          onClick={()=>setShowPopup({
          //...showPopup
          [document.node.id]:true
        })}
        >
          <Badge count={5} style={{boxShadow:'0 0 0 0'}}>
            <Avatar style={{ backgroundColor: '#87d068' }} icon="user"/>  
          </Badge>
        </div>
         </Marker>
         {
           showPopup[document.node.id]? (
             <Popup
             latitude={document.node.geolocation.lat}
             longitude= {document.node.geolocation.lng}
             closeButton={true}
             closeOnClick={false}
             dynamicPosition={true}
             onClose={()=>setShowPopup({})}
             anchor="top"
             >
              <div className ="popup">
              <li key={document.node.id}>
                <h5>
                <Link to={`/${document.node.id}`}>{document.node.title}</Link>
                </h5>
              </li>
              </div>
             </Popup>
           ):null
         }
      </React.Fragment>
     ))}
   </ReactMapGL>
  </Layout>
)}

export default MapPage

export const pageQuery = graphql`  
  query MapPageQuery {
    allStrapiArticle {
      edges {
        node {
          id
          title
          location
          isGeo
          geolocation {
            lat
            lng
          }
        }
      }
    }
  }
`