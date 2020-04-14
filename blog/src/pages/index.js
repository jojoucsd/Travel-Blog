import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout' 
import Card from '../components/Card'
import { List } from 'antd'

const IndexPage = ({ data }) => {
  const {allStrapiArticle} = data
  const {edges} = allStrapiArticle

return(
    <Layout content={'blog'}>
    <List
      grid= {{ gutter: 16, xs:1, sm: 1, md:2, lg: 3, xl:4, xxl: 4,}}
      dataSource={edges}
      renderItem= {item =>(
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