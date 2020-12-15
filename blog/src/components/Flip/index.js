import React from 'react'
import Img from 'gatsby-image'
import {Button} from 'antd'
import Tag from '../Tag'
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
    top: "-75px",
    left: "75px",
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
    top: "-85px"
  };
  const subTitleStyles = {
    position: "relative",
    top: "-75px",
    textAlign: "center",
    fontWeight: "150",
    color: "6d6d6d"
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
  const buttonStyle= {
    position: "relative",
    top: "425px",
    left: "100px",
    textAlign: "center",
    fontWeight: "150",
    color: "6d6d6d",
    borderRadius: "35px"
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

const FlipCard =({data, isSocial, isSocialTrue}) =>{
    console.log('isSocial', isSocial)
    const CardImg = ({imgSrc}) =>{
      return(
        <div style={imgContainerStyles} className="imgContainer">
            <img src={imgSrc} className="img" alt={""} style={imgStyles} />
        </div>
    )}
    const CardAvatar = () =>(
            <div style={avatarContainerStyles} className="infoContainer">
                <img src={data.frontImg.fixed.src || placeholder} alt={""} style={avatarImgStyles}/>
            </div>
        )
    const CardTitle = () =>(
        <div className="titleDiv">
            <h1 style={titleStyles} className="title">{data.userName}</h1>
        <h4 style={subTitleStyles} className="subTitle">{data.email}</h4>
      </div>
    )
    const CardBio = () => {
        return(
        <div style={bioContainerStyles} className="bioContainer">
        <p style={bioStyles} className="bio">{
          isSocial ? 
          <Tag 
          data={data.social} 
          styles={{
            marginTop:15,
            marginBottom: 15,
            fontSize: 12, 
          }}/>:
          <Tag 
          data={data.skills} 
          styles={{
            marginTop:15,
            marginBottom: 15,
            fontSize: 12, 
          }}/> 
        }
        </p>
      </div>
    )}

    return (
        <div className="flipperContainer">
            <div className="flipper">
                <div style={cardContainerStyles} className="cardFront cardContainer">
                    <CardImg imgSrc="https://media.giphy.com/media/Y6pDMTysYTQ2I/giphy.gif"/>
                    <CardAvatar avatarSrc={data.frontImg.fixed.src}/>
                    <CardTitle title={data.userName} subTitle={data.email}/>
                    <CardBio/>
                </div> 
                <div style={cardBackStyles} className="cardBack">
                    {/* <img className="cardBackImg" style={cardBackImgStyles} src={data.backImg.fixed.src}/> */}
                    <Img className="cardBackImg" style={cardBackImgStyles} fixed={data.backImg.fixed}/> 
                    <Button style={buttonStyle}onClick={isSocialTrue}>{isSocial ? "Academic" : "Social Media"}</Button>
                </div>
            </div>
        </div>
    )   
}
export default FlipCard