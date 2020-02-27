import React from 'react'
import { Card, Icon, Avatar} from 'antd'
import Img from 'gatsby-image'
import Moment from 'react-moment'
import "moment-timezone"
import ReactMarkdown from "react-markdown"
import { Link } from 'gatsby'

const { Meta } = Card

const CardComponent = (data) => {
    const checkSrc = (string) =>{
        return string.startsWith('http') ? string : `${process.env.IMAGE_BASE_URL}${string}`
      }
   return(
        <Card
            style={data.width}
            cover={
                <Img fixed={data.data.node.image.childImageSharp.fixed}/>
            }
            actions={[
                <p>Travel : <Moment format="MM/DD/YYYY">{data.data.node.travelDate}</Moment> </p>,
                <p>Publish : <Moment fromNow>{data.data.node.created_at}</Moment> </p>,
            ]}
            >
            <Link to={`/${data.data.node.id}`}>
                <Meta
                avatar={<Avatar src={checkSrc(data.data.node.author.avatar.url)}/>  }
                title={data.data.node.title}
                style={data.height}
                description={ data.showDescription ? 
                    <ReactMarkdown
                    source={data.data.node.content.substring(0,200).concat(` ... ... ... Read More`)}
                    transformImageUri={uri => uri.startsWith('http') ? uri: `${process.env.IMAGE_BASE_URL}${uri}`}
                    className ="indexArticle"
                    />: null
                }
                />
            </Link>
        </Card>
)}
export default CardComponent
