import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import { List } from 'antd'
import placeholder from '../../images/ooops.png'

const ListComponent = ({data}) =>{
    return (
        <List
        itemLayout="vertical"
        size="large"
        dataSource={data}
        pagination={{
            onChange: page => {
              console.log(page);
            },
            pageSize: 5,
          }}
        renderItem={item =>(
            <Link to={`/Article_${item.id}`}>
            <List.Item
            key={item.title}
            extra={
              <Img style={{width:150, height:100}} fixed= {item.cover[0].localFile.childImageSharp.fixed || placeholder}
            />
            }
            >
            <List.Item.Meta
                title={item.title}
            />
            {item.content.substring(0, 100).concat("...")}
            </List.Item>
            </Link>
        )}
        />
    )
}

export default ListComponent