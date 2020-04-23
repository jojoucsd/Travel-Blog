import React from "react"
import { Typography, Radio } from 'antd'
const { Title } = Typography

const Select = ({onChange, value, data, title}) =>{
    const radioStyle = {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
      };

      return (
      <React.Fragment>
      <Title>{title}</Title>
        <Radio.Group onChange={onChange} value={value}>
            {
                data.map((categorie, i)=>{
                    return (
                        <Radio key ={i} style={radioStyle} value={categorie}>
                        {categorie}
                      </Radio>
                    )
                })
            }
        </Radio.Group>
      </React.Fragment>
      )
}

export default Select
