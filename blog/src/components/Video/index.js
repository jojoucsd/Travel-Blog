import React from "react"

const Video = ({videoSrcURL, videoTitle, ...props}) => (
    <div className="video"
    style={{height: '380px'}}
    >
        <iframe
        src={videoSrcURL}
        title={videoTitle}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        frameBorder="0"
        webkitallowfullscreen="true"
        mozallowfullscreen="true"
        style={{display:'block', width: '100%', height: '100%'}}
        allowFullScreen
    />
    </div>
)

export default Video