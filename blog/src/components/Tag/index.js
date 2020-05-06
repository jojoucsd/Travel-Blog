import React from 'react'
import { Tag } from 'antd'

const colors = ["red", "volcano", "orange", "gold", "lime", "green", "cyan", "blue", "geekblue", "purple"]
const TagComponent = ({data}) =>{
    const randomColor = () =>{
        return colors[Math.floor(Math.random() * (colors.length - 1))]
    }
    return (
        <div className='Skill-Tag'>
            {
            data.split(',').map((tag, i) => 
            <Tag key ={i} color={randomColor()} style={{marginBottom:60, fontSize:20}}>{tag}</Tag>)
            }
        </div>
    )
}

export default TagComponent