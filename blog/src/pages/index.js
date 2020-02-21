import React from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/layout' 
import ReactMarkdown from "react-markdown"
import { List , Card, Icon, Avatar } from 'antd'

const { Meta } = Card; 
const IndexPage = ({ data }) => (
    <Layout content={'blog'}>
    <List
      grid= {{ gutter: 16, xs:1, sm: 1, md:2, lg: 3, xl:4, xxl: 4,}}
      dataSource={data.allStrapiArticle.edges}
      renderItem= {item =>(
        <List.Item>
          <Card 
            style ={{width : 300 }}
            cover = {
              <Img fixed={item.node.image.childImageSharp.fixed}/>
            }
            actions={[
              <Icon type="setting" key="setting" />,
              <Icon type="edit" key="edit" />,
              <Icon type="ellipsis" key="ellipsis" />,
            ]}
            >
              <Meta
                avatar={<Avatar style={{ backgroundColor: '#87d068' }} icon="user"/>  }
                title={item.node.title}
                style={{height:225}}
                description={
                  <ReactMarkdown
                  source={item.node.content.substring(0,200).concat(" ...")}
                  transformImageUri={uri => uri.startsWith('http') ? uri: `${process.env.IMAGE_BASE_URL}${uri}`}
                  className ="indexArticle"
                  /> 
                }
              />
              <Link style={{float:'right'}} to={`/${item.node.id}`}>Read more</Link>
          </Card>
        </List.Item>
      )}
      />
    <Link to="/about/">Go to About Me</Link>
  </Layout>
  )
  
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
          }
        }
      }
  }
`