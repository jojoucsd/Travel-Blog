import React, {useEffect} from 'react'
import "moment-timezone"
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout' 
import { List } from 'antd'
import CardComponent from '../components/cardComponent'
import Geolocation from '../util/geoLocation'

const IndexPage = ({ data }) => {
  const {allStrapiArticle} = data
  const {edges} = allStrapiArticle
  const addGeoData = edges.filter(article => article.node.isGeo !== true)
  useEffect (() => {
    if (addGeoData.length > 0) addGeoData.map(article => Geolocation(article.node))
  })
return(
    <Layout content={'blog'}>
    <List
      grid= {{ gutter: 16, xs:1, sm: 1, md:2, lg: 3, xl:4, xxl: 4,}}
      dataSource={data.allStrapiArticle.edges}
      renderItem= {item =>(
        <List.Item>
          <CardComponent data={item} width={{width:300}} height={{height:225}} showDescription={true} />
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
            image {
              childImageSharp {
                fixed(width: 300, height: 200) {
                  ...GatsbyImageSharpFixed
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
                url
              }
            }
          }
        }
      }
  }
`