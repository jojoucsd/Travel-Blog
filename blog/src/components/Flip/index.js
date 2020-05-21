import React from 'react'
import Img from 'gatsby'
import {Card} from 'antd'
import './flip.css'
import placeholder from  '../../images/ooops.png'

// Styles
  const cardContainerStyles = {
    width: "300px",
    height: "500px",
    background: "#fff",
    borderRadius: 35,
    boxShadow: "1px 1px 35px #444"
  };
  const imgContainerStyles = {
    backgroundColor:"#fff",
    height: "35%",
    margin: 0,
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,
    background: "#444",
    backgroundSize: "cover"
  }
  const avatarContainerStyles = {
    width: "150px",
    height: "150px",
    zIndex: "9",
    position: "relative",
    top: "-85px",
    left: "65px",
    right: "0",
    margin: "0 auto",
    border: "10px solid #fff",
    background: "#000",
    backgroundSize: "cover",
    display: "inline-block",
    textAlign: "center",
    borderRadius: "50%"
  };
  const titleStyles = {
    color:"#555",
    fontWeight: "100",
    outline: "none",
    margin: "0px",
    display: "inline-block",
    width: "100%",
    textAlign: "center",
    position: "relative",
    top: "-75px"
  };
  const subTitleStyles = {
    position: "relative",
    top: "-95px",
    textAlign: "center",
    fontWeight: "100",
    color: "#888"
  };
  const bioContainerStyles = {
    position: "relative",
    top: "-95px"
  };
  const bioStyles = {
    color: "#444",
    padding: "0 30px",
    textAlign: "center"
  };
  const iconsContainerStyles = {
    position: "relative",
    top: "-85px",
    textAlign: "center"
  }
  const iconStyles = {
    margin: "0 10px",
    color: "#5C6BC0",
    fontSize: "24px"
  }
  const cardBackStyles = {
    height: 500,
    width: 300,
    position: "absolute",
    top: "0",
    bottom: "0",
    left: "0",
    right: "0",
    margin: "auto",
    borderRadius: "35px",
    boxShadow: "1px 1px 35px #444",
    background: "')",
    backgroundSize: "cover",
    backgroundPosition: "right"
  }
  const madeByStyles = {
    color: "#fff",
    opacity: ".5",
    textAlign: "center",
    padding: "0px"
  }
  
  const imgStyles = {
    width: 300,
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35
  }
  
  const avatarImgStyles = {
    width: "100%",
    position: "absolute",
    top: "0",
    bottom: "0",
    left: "0",
    right: "0",
    margin: "auto",
    borderRadius: "50%"
  }
  
  const cardBackImgStyles = {
    height: "100%",
    width: "100%",
    borderRadius: 35,
    position: "absolute"
    
  }

const FlipCard =({data}) =>{

    const CardImg = (imgSrc) =>(
        <div style={imgContainerStyles} className="imgContainer">
            <img src={imgSrc} className="img" style={imgStyles} />
        </div>
    )
    const CardAvatar = () =>(
            <div style={avatarContainerStyles} className="infoContainer">
                <img src={data.frontImg.fixed.src || placeholder} style={avatarImgStyles}/>
            </div>
        )
    const CardTitle = () =>(
        <div className="titleDiv">
            <h1 style={titleStyles} className="title">{data.userName}</h1>
        <h4 style={subTitleStyles} className="subTitle">{data.email}</h4>
      </div>
    )
    const CardBio = ({bio}) => {
        return(
        <div style={bioContainerStyles} className="bioContainer">
        <p style={bioStyles} className="bio">{bio}</p>
      </div>
    )}

    return (
        <div className="flipperContainer">
            <div className="flipper">
                <div style={cardContainerStyles} className="cardFront cardContainer">
                    <CardImg imgSrc={"http://1.bp.blogspot.com/-tso_pF4jEdU/UPC4zDXEY6I/AAAAAAAAAhE/Vb2Cd8nRZEo/s1600/a.jpg"}/>
                    <CardAvatar avatarSrc={data.frontImg.fixed.src}/>
                    <CardTitle title={data.userName} subTitle={data.email}/>
                    <CardBio bio={'something about ling'}/>
                </div> 
                <div style={cardBackStyles} className="cardBack">
                    <img className="cardBackImg" style={cardBackImgStyles} src={data.backImg.fixed.src}/>
                </div>
            </div>
        </div>
    )   
}
export default FlipCard