import React from 'react'
import { Timeline, Avatar } from 'antd'
import { NodeIndexOutlined } from '@ant-design/icons';
import placeholder from '../../images/ooops.png'

const colors = ["red", "volcano", "orange", "gold", "lime", "green", "cyan", "blue", "geekblue", "purple"]

const TimelineComponent = ({data}) =>{
    const sortData = data.sort((a,b) => {return new Date(a.travelDate) - new Date(b.travelDate)})
    const randomColor = () =>{
        return colors[Math.floor(Math.random() * (colors.length - 1))]
    }
    return(

        <>
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