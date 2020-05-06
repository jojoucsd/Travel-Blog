import React, {useState, useEffect } from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/layout'
import {List, Tag, Timeline, Video} from '../components'
import {Row, Col, Avatar} from 'antd'
import { css } from "@emotion/core"
import ReactMarkdown from "react-markdown"
const pdfUrl = "https://drive.google.com/file/d/1GFPnsyn7IqRXDCsWbTIP0WEvc22GWyHI/view?usp=sharing"

const UserTemplate = ({ data }) => {
  const {strapiUser} = data 
  const {articles} = strapiUser
  const [social, setSocial] = useState(articles)
  const [academic, setAcademic] = useState(articles)
  const [isSocial, setIsSocial] = useState(false)
  const [socialOpacity, setSocialOpacity] = useState(0.3)
  const [academicOpacity, setAcademicOpacity] = useState(1)

  useEffect(() => {
    let academicResult = articles.filter(article => article.category ==='tech')
    let socialResult = articles.filter(article => article.category !== 'tech')
    setSocial(socialResult)
    setAcademic(academicResult)
  }, [articles])
  
  let isSocialTrueStyle = css`
  opacity: ${socialOpacity}
`
  let isSocialFalseStyle = css`
  opacity: ${academicOpacity}
  `
  const isSocialFalse = () => {
    setIsSocial(false)
    setSocialOpacity(0.3)
    setAcademicOpacity(1)
  }

  const isSocialTrue = () => {
    setIsSocial(true)
    setSocialOpacity(1)
    setAcademicOpacity(0.3)
  }

  return (
    <Layout>
      <Row>
        <Col span={12}>
          <h2>{data.strapiUser.username}</h2>
          <h2>{data.strapiUser.email}</h2>
          <Row>
            <Col span ={12}>
              <Avatar onClick={isSocialFalse} size={256} css={isSocialFalseStyle} shape="square" src={data.strapiUser.avatar.childImageSharp.fixed.src}/>
            </Col>
            <Col span ={12}>
              <Avatar onClick={isSocialTrue} size={256} css={isSocialTrueStyle} shape="square" src={data.strapiUser.socialMedia.childImageSharp.fixed.src}/>
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          {!isSocial ?
          <Tag data={data.strapiUser.skills}/> : <Tag data={data.strapiUser.social}/>
          }
          <ReactMarkdown 
              source={data.strapiUser.aboutMe}
              transformImageUri={uri => uri.startsWith('http') ? uri: `${process.env.IMAGE_BASE_URL}${uri}`} 
              className="indexArticle"
            />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          {!isSocial ?
            <a href={pdfUrl} target=" ">
            <Img fixed={data.strapiUser.resume.childImageSharp.fixed}/>
            </a> :  <Timeline data={social}/>

          }
        </Col>
        <Col span={12}>
          {!isSocial ?
                <List data ={academic}/>:
                <Video
                videoSrcURL="https://www.youtube.com/embed/onuKgIfZ0zY?autoplay=1&rel=0"
                videoTitle="Official Music Video on YouTube"
              />

          }
        </Col>
      </Row>
    </Layout>
  )}
  
export default UserTemplate

export const query = graphql`
  query UserTemplate($id: String!) {
    strapiUser(id: { eq: $id }) {
      id
      username
      email
      skills
      social
      aboutMe
      avatar {
        childImageSharp {
          fixed(width: 250, height: 250) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      socialMedia {
        childImageSharp {
          fixed(width: 250, height: 250){
            ...GatsbyImageSharpFixed
          }
        }
      }
      resume {
        childImageSharp{
          fixed(width: 720, height: 960){
            ...GatsbyImageSharpFixed
          }
        }
      }
      articles {
        id
        title
        content
        category
        travelDate
        cover {
          localFile{
            childImageSharp {
              fixed(width: 300, height: 200) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }
    }
  }
` 