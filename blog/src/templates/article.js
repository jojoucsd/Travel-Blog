import React, {useState} from 'react'
import { Link, graphql } from 'gatsby'
// import Img from 'gatsby-image'
import { Row, Col } from 'antd'
import Slider from '../components/slider'
import { siteMetadata } from '../../gatsby-config'
import Layout from '../components/layout' 
import ReactMarkdown from "react-markdown"
import ReactMapGL from 'react-map-gl'
import styled from "@emotion/styled"

const ArticleTemplate = ({ data }) => {
  const covers = data.strapiArticle.cover
  const geo = data.strapiArticle.geolocation
  const StyledMarkDown = styled.div`
    margin: 2rem;
  `
  const [viewport, setViewport] = useState({
    width: '510px',
    height: '600px',
    latitude: geo.lat,
    longitude: geo.lng,
    zoom: 8, 
  })
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
       <ReactMapGL
          mapStyle="mapbox://styles/jojoleto/ck6oid21g29it1ir3gbypurj9"
          mapboxApiAccessToken= {siteMetadata.mapboxToken}
          {...viewport}
          onViewportChange={setViewport}
          /> 
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