import React, {useState, useEffect} from 'react'
import {graphql } from 'gatsby'

import Layout from '../components/layout' 
import Card from '../components/Card'
import Select from '../components/radio'
import {Col, List, Row } from 'antd'


const IndexPage = ({ data }) => {
  const DATA = ['All', 'Food', 'Travel', 'Tech']
  const {allStrapiArticle} = data
  const {edges} = allStrapiArticle
  const [value, setValue] = useState('All')
  const [articles, setArticles] = useState(edges)
  // console.log('edges categorie', articles)

  const onChange = e => {
    setValue(e.target.value)
  }

  useEffect(() =>{
    const target = value.toLowerCase()
    let result = target === 'all' ? edges : edges.filter(article => article.node.category === target)
    setArticles(result)
  },[value, edges])

return(
    <Layout content={'blog'}>
    <Row>
    <Col span ={4}>
      <Select value={value} onChange={onChange} data={DATA} title='Category' />
    </Col>
    <Col span ={20}>
    <List
      grid= {{ gutter: 14, xs:1, sm: 1, md:2, lg: 3, xl:3, xxl: 3,}}
      dataSource={articles}
      renderItem= {item =>(
        <List.Item>
          <Card data={item} styles={{width:"300px", height:"225px"}} showDescription={true} />
        </List.Item>
      )}
      />
    </Col>
    </Row>
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
            category
            author{
              avatar {
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