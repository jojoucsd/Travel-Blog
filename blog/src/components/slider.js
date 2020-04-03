import React, {useState, createRef} from 'react'
import Img from 'gatsby-image'
import { Button } from 'antd'
import { Row,Carousel, Icon } from 'antd'
import { css } from "@emotion/core"
import StyledSlider from './styledComponents/styledSlider'
//add proptype

const indicatorImg = css`
    width:100%;
    height:100%;
    object-fit: fill;
`
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
            onKeyDown={()=>{}}
            onClick={handleGoTo}
            className={i === activeIndex ? 'active' : ''}
            key={i}
            role='presentation'
            >
            <Img css={indicatorImg} fluid={cover.localFile.childImageSharp.fluid}/>
            </li>
        )
    })
    return(
        <React.Fragment>
            <StyledSlider/>
            <div className="slider-wrapper">
             <Carousel
                effect="fade" 
                dots = {false}
                ref = {carousel}
                afterChange = {()=>setAnimating(false)} 
                beforeChange = {() => setAnimating(true)}
            >
            {covers.map((cover, i) => (
            <div key ={i}>
                <Img style={{height:'712px'}} fluid={cover.localFile.childImageSharp.fluid}/>
            </div>   
            ))}
            </Carousel>
            <div className="carousel-controls">
                <Button className="sliderButton" type="primary"  value ="large"  onClick={handlePrev}><Icon type="left"/></Button>
                <Button className="sliderButton" type="primary" value="large" onClick={handleNext}><Icon type="right"/></Button>
            </div>
            <ol className="indicators">{indicators}</ol>
            </div>
        </React.Fragment>
    )
}

export default Slider