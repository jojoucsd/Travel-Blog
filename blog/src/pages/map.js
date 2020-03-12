import React , {useState} from 'react'
import Layout from '../components/layout'
import CardComponent from '../components/cardComponent'
import ReactMapGL , { Marker, Popup }from 'react-map-gl'
import { siteMetadata } from '../../gatsby-config'
import { Avatar } from 'antd'
import { graphql } from 'gatsby'
import 'mapbox-gl/dist/mapbox-gl.css'
import '../styles/global.css'
// import Map from '../components/map'


const MapPage = ({ data }) => {
  const {allStrapiArticle} = data
  const {edges} = allStrapiArticle
  const [showPopup, setShowPopup] = useState({})
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 37.2294,
    longitude: -119.5094,
    zoom: 6.5, 
  });

  const checkSrc = (string) =>{
    return string.startsWith('http') ? string : `${process.env.IMAGE_BASE_URL}${string}`
  }

  return(
  <Layout content={'map'}>
   <ReactMapGL
      mapStyle="mapbox://styles/jojoleto/ck6oid21g29it1ir3gbypurj9"
      mapboxApiAccessToken= {siteMetadata.mapboxToken}
      {...viewport}
      onViewportChange={setViewport}
      onClick= {() =>setShowPopup({})}
   >
         { edges.map(document => (
      <React.Fragment key={document.node.id}>
         <Marker
          latitude={document.node.geolocation.lat}
          longitude= {document.node.geolocation.lng}
         >
        <div
          role="button"
          tabIndex={0}      
          onClick={()=>setShowPopup({
          //...showPopup
          [document.node.id]:true
        })}
          onKeyDown={()=>{}}
        >
            <Avatar src={checkSrc(document.node.author.avatar.childImageSharp.fixed.src)}/>  
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
                <CardComponent data={document} width={{width:300}} height={{}} showDescription={false} />
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
          cover {
            localFile{
              childImageSharp {
                fixed(width: 300, height: 200) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
          content
          created_at
          travelDate
          author{
            avatar{
              childImageSharp {
                fixed {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        }
      }
    }
  }
`