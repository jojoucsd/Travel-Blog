import React from 'react'
import { Link, graphql } from 'gatsby'
import { Row, Col } from 'antd'
import styled from "@emotion/styled"

import Layout from '../components/layout' 
import Slider from '../components/slider.js'
import Map from "../components/map"
import ReactMarkdown from "react-markdown"



const ArticleTemplate = ({ data }) => {
  const covers = data.strapiArticle.cover
  const geoCenter = data.strapiArticle.geolocation
  const StyledMarkDown = styled.div`
    margin: 2rem;
    `
  return (
  <Layout>
    <Row>
      <h1>{data.strapiArticle.title}</h1>
      <p>by <Link to={`/authors/User_${data.strapiArticle.author.id}`}>{data.strapiArticle.author.username}</Link></p>
    </Row>
    <Row>
      <Slider data={covers}/>
    </Row>
    <Row style={{margin:'2rem'}}>
      <Col span={16}>
        <StyledMarkDown>
        <ReactMarkdown 
          source={data.strapiArticle.content}
          transformImageUri={uri => uri.startsWith('http') ? uri: `${process.env.IMAGE_BASE_URL}${uri}`} 
          className="articleContent"
          escapeHtml={false}
        />
        </StyledMarkDown>
      </Col>
      <Col span= {8}>
        {
          data.strapiArticle.categorie !== 'tech' ?
          <Map geoCenter={geoCenter} style={{width: '510px', height:'600px', zoom:8}}/>
          : <h1>App spec here , new card logic todo</h1>
        }
      </Col>
    </Row>
  </Layout>
)
}

export default ArticleTemplate

export const query = graphql`
  query ArticleTemplate($id: String!) {
    strapiArticle(id: {eq: $id}) {
      title
      content
      cover {
        localFile{
          childImageSharp {
            fluid(maxWidth: 960) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      category
      geolocation {
        lat
        lng
      }
      author {
        id
        username
      }
    }
  }
`