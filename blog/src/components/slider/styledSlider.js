import React from "react"
import { Global, css} from "@emotion/core"

import colors from '../../styles/colors'
import sizes from '../../styles/sizes'

export default ({children}) => (
        <Global
        styles= {css`
            .indicators {
                position: absolute;
                right: 0;
                top: 0;
                width: ${sizes.slider.indicators.size};
                padding: 0;
                margin-bottom: auto;
                li{
                    display: block;
                    width: 100%;
                    margin-bottom: ${sizes.margin * 5}px;
                    cursor: pointer;
                    opacity: 0.3;
                  }
                  .active{
                      opacity:1;
                  }
              }
            .carousel-controls {
              position: absolute;
              left: ${sizes.margin * 3} px;
              bottom: calc(-${sizes.slider.controls.size}/2 + ${sizes.margin * 0.2}px);
              height: ${sizes.slider.controls.size};
              .sliderButton {
                display: inline-block;
                width: ${sizes.slider.controls.size};
                height: ${sizes.slider.controls.size};
                margin-right: 1px;
                background: ${colors.darkGrey};
                background-repeat:no-repeat;
                background-position:center center;
                background-size: 8px;
                opacity: 1;
                position: relative;
              }
            }
            .ant-carousel .slick-slide {
                text-align: center;
                width: 100%;
                height: ${sizes.slider.height.large};
                line-height: 640px;
                background: transparent;
                overflow: hidden;
                h3 {
                    color: #fff;
                }
            }
            .ant-carousel .slick-prev,
            .ant-carousel .slick-next,
            .ant-carousel .slick-prev:hover,
            .ant-carousel .slick-next:hover {
              font-size: inherit;
              color: currentColor;
            }
            @media (min-width: ${sizes.tablet}) {
              .ant-carousel .slick-slide {
                height: ${sizes.slider.height.large};
              }
            }
            @media (min-width: ${sizes.desktop}) {
              padding-right: calc(${sizes.slider.indicators.size} + ${sizes.margin *
          3}px);
              .indicators, .carousel-controls {
                display: block;
              }
            }
            `}
            >
            {children}
            </Global>
)