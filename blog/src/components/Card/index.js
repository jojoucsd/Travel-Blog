import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import Moment from 'react-moment'
import ReactMarkdown from "react-markdown"
import placeholder from '../../images/ooops.png'

import { Avatar, Card} from 'antd'

const { Meta } = Card

const CardComponent = ({data, styles, showDescription}) => {
    const {node} = data
    const coverImage = node.cover[0].localFile.childImageSharp.fixed || placeholder
   return(
        <Card
            style={{width: styles.width}}
            cover={
                <Img fixed={coverImage}/>
            }
            actions={[
                <p>Travel : <Moment format="MM/DD/YYYY">{node.travelDate}</Moment></p>,
                <p>Publish : <Moment fromNow>{node.created_at}</Moment></p>,
            ]}
            >
            <Link to={`/${node.id}`}>
                <Meta
                avatar={
                <Avatar src={node.author.avatar.localFile.childImageSharp.fixed.src}/>
                }
                title={node.title}
                style={{height: styles.height }}
                description={ showDescription ? 
                    <ReactMarkdown
                    source={node.content.substring(0,200).concat(` ... ... ... Read More`)}
                    transformImageUri={uri => uri.startsWith('http') ? uri: `${process.env.IMAGE_BASE_URL}${uri}`}
                    className ="indexArticle"
                    />: null
                }
                />
            </Link>
        </Card>
)
}
export default CardComponent
