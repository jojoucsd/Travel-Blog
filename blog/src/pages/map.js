import React , {useState, useEffect} from 'react'
import { graphql } from 'gatsby'
import 'mapbox-gl/dist/mapbox-gl.css'
import ReactMapGL , { Marker, Popup }from 'react-map-gl'

import Layout from '../components/layout'
import Card from '../components/Card'
import { Avatar } from 'antd'
import { siteMetadata } from '../../gatsby-config'
import fetchData from '../APIs/fetchData'

import '../styles/global.css'

//this should do it as cluster map


const MapPage = ({ data }) => {
  const {allStrapiArticle} = data
  const {edges} = allStrapiArticle
  const [showPopup, setShowPopup] = useState({})
  const [articles, setArticles] = useState(edges)
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 37.2294,
    longitude: -119.5094,
    zoom: 6.5, 
  });
  
  useEffect (() => {
      fetchData('articles').then(result => setArticles(result))
  }, [])

    edges.map(data=>{
      let dataId = data.node.id.split('_')[1]
      articles.map(article=>{
        if (dataId === article.id) {
          data.node.geolocation = article.geolocation
        }
        return article
      })
      return data
    })

  return(
  <Layout content={'map'}>
   <ReactMapGL
      clasName="mapCanvas"
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
            <Avatar src={document.node.author.avatar.localFile.childImageSharp.fixed.src}/>  
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
                <Card data={document} styles= {{width: '300px', height:'auto'}} showDescription={false} />
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
              localFile{
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
  }
`