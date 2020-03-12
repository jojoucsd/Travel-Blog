import React, {useState, createRef} from 'react'
import Img from 'gatsby-image'
import { Row, Col, Button } from 'antd'
import { Carousel, Icon } from 'antd'
import "../styles/global.css"


const Slider = (data) =>{
    const covers = data.data
    const length = covers.length -1 
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const carousel = createRef(null)
    const handleNext = () => {
        if(animating) return
        setActiveIndex(activeIndex === length ? 0 : activeIndex + 1)
        carousel.current.next()
    }
    const handlePrev = () => {
        if(animating) return
        setActiveIndex(activeIndex === 0 ? length : activeIndex - 1)
        carousel.current.prev()
    }
    const handleGoTo = (event) => {
        let target = event.currentTarget.id
        setActiveIndex(parseInt(target))
        carousel.current.goTo(target, true)

    }

    const indicators = covers.map((cover, i) =>{
        return (
            <li
            id={i}
            onClick={handleGoTo}
            className={i === activeIndex ? 'active' : ''}
            key={i}
            >
            <Img fluid={cover.localFile.childImageSharp.fluid}/>
            </li>
        )
    })
    return(
        <React.Fragment>
            <Row>
             <Col span={19}>
             <Carousel
                effect="fade" 
                dots = {false}
                ref = {carousel}
                afterChange = {()=>setAnimating(false)} 
                beforeChange = {() => setAnimating(true)}
            >
            {covers.map((cover, i) => (
            <div key ={i}>
                <Img fluid={cover.localFile.childImageSharp.fluid}/>
            </div>   
            ))}
            </Carousel>
            <Button className="sliderButton" type="primary"  value ="large"  onClick={handlePrev}><Icon type="left"/></Button>
            <Button className="sliderButton" type="primary" value="large" onClick={handleNext}><Icon type="right"/></Button>
             </Col>
             <Col span={5}>
                <ol className="indicators">{indicators}</ol>
             </Col>
            </Row>
        </React.Fragment>
    )
}

export default Slider