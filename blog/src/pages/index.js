import React , {useState} from 'react'
import Layout from '../components/layout'
import ReactMapGL , { Marker, Popup }from 'react-map-gl'
import { Button } from 'antd'
import { siteMetadata } from '../../gatsby-config'
import 'mapbox-gl/dist/mapbox-gl.css';
// import Map from '../components/map'

const IndexPage = ({ data }) => {
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 37.7577,
    longitude: -95.665,
    zoom: 4
  });

  return(
  <Layout content={'map'}>
   <ReactMapGL
      mapStyle="mapbox://styles/jojoleto/ck6oid21g29it1ir3gbypurj9"
      mapboxApiAccessToken= {siteMetadata.mapboxToken}
      {...viewport}
      onViewportChange={setViewport}
    />
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