import React, {useState, useEffect } from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/layout'
import {List, Timeline, Video, Flip} from '../components'
import {Row, Col, Typography } from 'antd'
const { Title } = Typography
const pdfUrl = "https://drive.google.com/file/d/1GFPnsyn7IqRXDCsWbTIP0WEvc22GWyHI/view?usp=sharing"
const socialMedia = "This is the social side of me. I like to travel, taking picture, gaming and also right now I am exporing the idea of video editing."

const UserTemplate = ({ data }) => {
  const {strapiUser} = data 
  const {articles} = strapiUser
  const [social, setSocial] = useState(articles)
  const [academic, setAcademic] = useState(articles)
  const [isSocial, setIsSocial] = useState(false)
  // const [socialOpacity, setSocialOpacity] = useState(0.3)
  // const [academicOpacity, setAcademicOpacity] = useState(1)

  const flipData = {
    frontImg : data.strapiUser.avatar.localFile.childImageSharp,
    backImg : data.strapiUser.socialMedia.localFile.childImageSharp,
    userName :data.strapiUser.username,
    email :data.strapiUser.email,
    skills:data.strapiUser.skills,
    social:data.strapiUser.social
  }

  useEffect(() => {
    let academicResult = articles.filter(article => article.category ==='tech')
    let socialResult = articles.filter(article => article.category !== 'tech')
    setSocial(socialResult)
    setAcademic(academicResult)
  }, [articles])
  

  const isSocialTrue = () => {
    console.log('clicked')
    setIsSocial(!isSocial)
  }

  return (
    <Layout>
      <Row style={{marginBottom:'35px'}}>
        <Col span={12}>
          <Row>
            <Flip data={flipData} isSocial={isSocial} isSocialTrue={isSocialTrue}/>
          </Row>
        </Col>
        <Col span={12}>
          {!isSocial?
          <div>
          <Title level={1} style={{textAlign:'center'}}>Academic</Title>
          <Title level={3} style={{textAlign:'left'}}>{data.strapiUser.aboutMe}</Title></div>:
          <div><Title level={1} style={{textAlign:'center'}}>Social Media</Title>
          <Title level={3} style={{textAlign:'left'}}>{socialMedia}</Title></div>
          }
        </Col>
      </Row>
      <Row style={{paddingTop:"25px"}}>
        <Col span={12}>
          {!isSocial ?
            <a href={pdfUrl} target=" ">
            <Img fixed={data.strapiUser.resume.localFile.childImageSharp.fixed}/>
            </a> :  <Timeline data={social} title={'Time Line'} />
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
        localFile{
          childImageSharp {
            fixed(width: 250, height: 250) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
      socialMedia {
        localFile{
          childImageSharp {
            fixed(width: 960){
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
      resume {
        localFile{
          childImageSharp{
            fixed(width: 720, height: 960){
              ...GatsbyImageSharpFixed
            }
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