import React, {useEffect} from 'react'
import "moment-timezone"
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout' 
import { List } from 'antd'
import Card from '../components/Card'
import Geolocation from '../APIs/geoLocation'

const IndexPage = ({ data }) => {
  const {allStrapiArticle} = data
  const {edges} = allStrapiArticle

  const addGeoData = edges.filter(article => article.node.isGeo !== true)

  useEffect (() => {
    if (addGeoData.length > 0) {
      addGeoData.map(article => Geolocation(article.node).then(result=> console.log(result)
      //   {
      //   edges.map(data => {
      //     if(parseInt(data.node.id.split('_')[1]) === result.id){
      //       data.node.geolocation = result.geolocation
      //     }
      //     return data
      //   })
      // }
      ))
    }
  })

return(
    <Layout content={'blog'}>
    <List
      grid= {{ gutter: 16, xs:1, sm: 1, md:2, lg: 3, xl:4, xxl: 4,}}
      dataSource={edges}
      renderItem= {item => (
        <List.Item>
          <Card data={item} styles={{width:"300px", height:"225px"}} showDescription={true} />
        </List.Item>
      )}
      />
    <Link to="/about/">Go to About Me</Link>
  </Layout>
  )}
  
  export default IndexPage
  
export const query = graphql`  
  query IndexQuery {
      allStrapiArticle {
        edges {
          node {
            id
            cover {
              localFile{
                childImageSharp {
                  fixed(width: 300, height: 200) {
                    ...GatsbyImageSharpFixed
                  }
                }
              }
            }
            title
            content
            location
            isGeo
            created_at
            travelDate
            author{
              avatar {
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