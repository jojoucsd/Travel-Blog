import React , {useState} from 'react'
import Layout from '../components/layout'
import CardComponent from '../components/cardComponent'
import ReactMapGL , { Marker, Popup }from 'react-map-gl'
import { siteMetadata } from '../../gatsby-config'
import { Avatar } from 'antd'
import fakeData from 'fakeData'
import 'mapbox-gl/dist/mapbox-gl.css'
import '../styles/global.css'
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
            <Avatar src={checkSrc(document.node.author.avatar.url)}/>  
        </div>
         </Marker>
         {
           showPopup[document.node.id]? (
             <Popup
             latitude={document.node.geolocation.lat}
             longitude= {document.node.geolocation.lng}
             closeButton={true}
             closeOnClick={true}
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
          image {
            childImageSharp {
              fixed(width: 300, height: 200) {
                ...GatsbyImageSharpFixed
              }
            }
          }
          content
          created_at(difference: "", formatString: "", fromNow: false, locale: "")
          travelDate(difference: "", formatString: "", fromNow: false, locale: "")
          author{
            avatar{
              url
            }
          }
        }
      }
    }
  }
`