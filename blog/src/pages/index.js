import React , {useState} from 'react'
import Layout from '../components/layout'
import ReactMapGL , { Marker, Popup }from 'react-map-gl'
import { siteMetadata } from '../../gatsby-config'
import { Avatar, Badge } from 'antd';
import { Link, graphql } from 'gatsby'
import fakeData from 'fakeData'
import 'mapbox-gl/dist/mapbox-gl.css';
// import Map from '../components/map'

const IndexPage = ({ data }) => {
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

  return(
  <Layout content={'map'}>
   <ReactMapGL
      mapStyle="mapbox://styles/jojoleto/ck6oid21g29it1ir3gbypurj9"
      mapboxApiAccessToken= {siteMetadata.mapboxToken}
      {...viewport}
      onViewportChange={setViewport}
   >
     {data.allStrapiArticle.edges.map(document =>(
       <React.Fragment key={document.node.id}>
         <Marker
          latitude={37.7749}
          longitude= {-122.4194}
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
             latitude={37.7749}
             longitude= {-122.4194}
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

export default IndexPage

export const pageQuery = graphql`  
  query IndexQuery {
    allStrapiArticle {
      edges {
        node {
          id
          image {
            childImageSharp {
              fixed(width: 200, height: 125) {
                ...GatsbyImageSharpFixed
              }
            }
          }
          title
          content
        }
      }
    }
  }
`