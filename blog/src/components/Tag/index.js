import React from 'react'
import { Tag } from 'antd'

const colors = ["red", "volcano", "orange", "gold", "lime", "green", "cyan", "blue", "geekblue", "purple"]
const TagComponent = ({data, styles}) =>{
    const randomColor = () =>{
        return colors[Math.floor(Math.random() * (colors.length - 1))]
    }
    return (
        <span className='Skill-Tag'>
            {
            data.split(',').map((tag, i) => 
            <Tag 
            key ={i} 
            color={randomColor()} 
            // style={{marginBottom:60, fontSize:20}}
            style={styles}
            >
            {tag}</Tag>)
            }
        </span>
    )
}

export default TagComponent