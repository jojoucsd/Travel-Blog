import React from 'react'
import { Timeline, Avatar, Typography } from 'antd'
import { NodeIndexOutlined } from '@ant-design/icons';
import placeholder from '../../images/ooops.png'
const { Title } = Typography

const colors = ["red", "volcano", "orange", "gold", "lime", "green", "cyan", "blue", "geekblue", "purple"]

const TimelineComponent = ({data, title}) =>{
    const sortData = data.sort((a,b) => {return new Date(a.travelDate) - new Date(b.travelDate)})
    const randomColor = () =>{
        return colors[Math.floor(Math.random() * (colors.length - 1))]
    }
    return(

        <>
        <Title level={2} style={{textAlign:'center'}}>{title}</Title>
        <Timeline mode='alternate'>
         {
        sortData.map((article, i) => 
        <Timeline.Item 
            key= {i} color={randomColor()} 
            dot={<NodeIndexOutlined style={{frontSize: '18px'}}/>} 
            label={article.travelDate}
        >
        <Avatar
         style={{marginRight:15}}
         src={article.cover[0].localFile.childImageSharp.fixed.src || placeholder}
        ></Avatar>
        {article.title}
        </Timeline.Item>)
         }
        </Timeline>
      </>
    )
}

export default TimelineComponent