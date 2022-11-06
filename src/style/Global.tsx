import { createGlobalStyle } from 'styled-components'
// eslint-disable-next-line import/no-unresolved
import { PancakeTheme } from '@pancakeswap-libs/uikit'

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends PancakeTheme {}
}

const GlobalStyle = createGlobalStyle`
  
  * {
    font-family: 'Kanit', sans-serif;
  }
  
  body {
    background-color: ${({ theme }) => theme.colors.background};
    img {
      height: auto;
      max-width: 100%;
    }
  }

  a {
    text-decoration: none;
  }
  
  .txt {
    position: relative;
    font-size: 14px;
    font-family: 'Montserrat', sans-serif;
  }
  
  .audit-container.visible {
    opacity: 1;
    pointer-events: auto; }
  
  .audit-container {
    position: fixed;
    display: flex;
    height: 50px;
    bottom: 25px;
    right: 40px;
    background-color: #fff;
    border-radius: 20px;
    align-items: center;
    padding: 13px 25px;
    z-index: 10;
    opacity: 0;
    transition: opacity .3s ease;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
    pointer-events: none;
  }
    
  .audit-container.large>.txt {
    margin-right: 10px;
    color: #5c6d78;
    font-size: 14px;
    white-space: nowrap;
  }
  
  .audit-container.large>.logo {
    width: 100px;
    margin-right: 10px;
  }
  
  .audit-container.large>.check {
    height: 8px;
  }
  
  .audit-container.large>.pending {
    position: absolute;
    left: -15px;
    top: -15px;
  }
  .slick-slide {
    padding: 5px 8px !important;
    box-sizing: border-box;
   }
   .slick-next:before, .slick-prev:before {color: #10ac68 !important;}
   @media screen and (max-width: 767px) {
    .slick-prev {left: 0 !important;z-index: 9;}
    .slick-next {right: 0 !important;z-index: 9;}
   }
  .mini-tag {
    font-family: 'Montserrat', sans-serif;
    position: relative;
    display: block;
    font-size: 11px;
    font-weight: 800;
    background-color: #10ac68;
    border-radius: 8px ;
    border: #10ac68 2px solid;
    padding: 2px 4px;
    color: #fff;
    box-shadow: 0 0 15px #10ac68;
  }

  .token-tag {
    font-family: 'Montserrat', sans-serif;
    position: absolute;
    right: 20px;
    display: block;
    font-size: 11px;
    font-weight: 800;
    background-color: #10ac68;
    border-radius: 8px ;
    border: #10ac68 2px solid;
    padding: 2px 4px;
    color: #fff;
  }

  .deactivation-tag  {
    font-family: 'Montserrat', sans-serif;
    position: relative;
    display: block;
    font-size: 11px;
    font-weight: 800;
    background-color: #10ac68;
    border-radius: 8px ;
    border: #10ac68 2px solid;
    padding: 2px 4px;
    color: #fff;
  }

  .update-tag {
    font-family: 'Montserrat', sans-serif;
    position: absolute;
    left: 20px;
    display: block;
    font-size: 11px;
    font-weight: 800;
    background-color: #10ac68;
    border-radius: 8px ;
    border: #10ac68 2px solid;
    padding: 2px 4px;
    color: #fff;
    box-shadow: 0 0 15px #10ac68;
  }

  .ribbon-wrapper {
    width: 85px;
    height: 88px;
    overflow: hidden;
    position: absolute;
    top: -3px;
    left: -3px;
    .ribbon {
      font: bold 15px sans-serif;
      color: #fff !important;
      text-align: center;
      -webkit-transform: rotate(-45deg);
      -moz-transform:    rotate(-45deg);
      -ms-transform:     rotate(-45deg);
      -o-transform:      rotate(-45deg);
      position: relative;
      padding: 7px 0;
      top: 15px;
      left: -30px;
      width: 120px;
      background-color: rgb(59, 183, 143);
      .ribbontext {
        font-size:13px;
      }
    }
  }

  .preloader {
    margin: auto;
    display: block;
    height: 100%;
    vertical-align: middle;
    animation: pulse 1s linear infinite;
  }

  @-webkit-keyframes "pulse" {
    0% {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }
    50% {
       -webkit-transform: scale(0.8);
       transform: scale(0.8);
    }
    100% {
        -webkit-transform: scale(1);
       transform: scale(1);
    }
    }

  .video-responsive {
    overflow: hidden;
    padding-bottom: 56.25%;
    position: unset;
    height: 0;
  }
  
  .video-responsive iframe {
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    position: absolute;
  }

  .logopartner {
    width: 180px;
    }

  .radius {
    border-radius: 30px;
    }

  .soonimg {
    width: 100%;
    margin-top: 20px;
    margin: auto;
    display: block;
    }

  .css-1eb1278-Circle.using-icon {
    background: transparent !important;
    }

  .css-ci1l8p-TimelineMain {
  left: 4% !important; 
  }
  
  .card-title {
    padding-left: 0px !important;
  }

  .timeline-card-content header {
      padding-left: 30px !important;
  }

  .card-description {
    padding-left: 30px !important;
    margin-left: 0px !important;
  }

  #react-chrono-timeline {
    justify-content: left !important;
  }

  .timeline-card-content  {
    margin: 0px !important;
  }

  .card-sub-title {
    padding-left: 0px !important;
  }

    .timeline-circle.active {
      .dot {
        border-radius: 50%;
        height: 12px;
        width: 12px;
         
        > span {
          animation: pulse-2-5 1s linear infinite;
          border-radius: 50%;
          display: block;
          height: 12px;
          width: 12px;
          > span {
            animation: pulse-2-5 1s linear infinite;
            border-radius: 50%;
            display: block;
            height: 12px;
            width: 12px;
            &:after {
              animation: pulse-2-5 1s linear infinite;
              border-radius: 50%;
              content: '';
              display: block;
              height: 12px;
              width: 12px;    
            }
          }
        }
        
        &.blue {
          background-color: #66a6f0;
          span {
            background-color: rgba(113, 102, 240, 0.8);
            &:after {
              background-color: rgba(113, 102, 240, 0.8);
            }
          }
        }
        &.green {
          background-color: #11ac69;
          span {
            background-color: rgba(17, 172, 105, .8);
            &:after {
              background-color: rgba(17, 172, 105, .8);
            }
          }
        }
        &.red {
          background-color: #8ec761;
          span {
            background-color: rgba(141, 199, 96, 0.8);
            &:after {
              background-color: rgba(141, 199, 96, 0.8);
            }
          }
        }
        &.orange {
          background-color: #E87337;
          span {
            background-color: rgba(255,183,90,.8);
            &:after {
              background-color: rgba(255,183,90,.8);
            }
          }
        }
        &.yellow {
          background-color: #FFF200;
          span {
            background-color: rgba(255,183,90,.8);
            &:after {
              background-color: rgba(255,183,90,.8);
            }
          }
        }
      }
    }

    .timeline-circle.in-active {
      .dot {
        border-radius: 50%;
        height: 12px;
        width: 12px;
         
        > span {
          
          border-radius: 50%;
          display: block;
          height: 12px;
          width: 12px;
          > span {
           
            border-radius: 50%;
            display: block;
            height: 12px;
            width: 12px;
            &:after {
              
              border-radius: 50%;
              content: '';
              display: block;
              height: 12px;
              width: 12px;    
            }
          }
        }
        
        &.blue {
          background-color: #66a6f0;
          span {
            background-color: rgba(113, 102, 240, 0.8);
            &:after {
              background-color: rgba(113, 102, 240, 0.8);
            }
          }
        }
        &.green {
          background-color: #11ac69;
          span {
            background-color: rgba(17, 172, 105, 0.8);
            &:after {
              background-color: rgba(17, 172, 105, 0.8);
            }
          }
        }
        &.red {
          background-color: #8ec761;
          span {
            background-color: rgba(141, 199, 96, 0.8);
            &:after {
              background-color: rgba(141, 199, 96, 0.8);
            }
          }
        }
        &.orange {
          background-color: #E87337;
          span {
            background-color: rgba(255,183,90,.8);
            &:after {
              background-color: rgba(255,183,90,.8);
            }
          }
        }
        &.yellow {
          background-color: #FFF200;
          span {
            background-color: rgba(255,183,90,.8);
            &:after {
              background-color: rgba(255,183,90,.8);
            }
          }
        }
      }
  
      @keyframes pulse-2-5 {
        0% { 
          opacity: .75;
          transform: scale(0.5);
        }
        25% {
          opacity: 0.75;
          transform: scale(1);
        }
        100% { 
          opacity: 0; 
          transform: scale(1.5);
        }
      }
    }
    .timeline-horz-card-wrapper.horizontal {
      min-width : 0px !important
    }

    .e1gmwefz1{
      @media (min-width: 768px) {
        display: none !important;
        margin-top : 10px
      }
    }

    .battledot {
      bottom: 150px;
      position: absolute;
      right: 64px;
      height: 80px;
      width: 80px;
      
       
      > span {
        animation: pulse-3-5 1s linear infinite;
        border-radius: 50%;
        display: block;
        height: 12px;
        width: 12px;
        > span {
          animation: pulse-3-5 1s linear infinite;
          border-radius: 50%;
          display: block;
          height: 12px;
          width: 12px;
          &:after {
            animation: pulse-3-5 1s linear infinite;
            border-radius: 50%;
            content: '';
            display: block;
            height: 12px;
            width: 12px;    
          }
        }
      }
      &.blue {
        background: transparent;
        span {
          background-color: rgba(85,216,232,.4);;
          &:after {
            background-color: rgba(85,216,232,.4);;
          }
        }
      }
      &.green {
        background: transparent;
        span {
          background-color: rgba(59,183,143,.4);;
          &:after {
            background-color: rgba(59,183,143,.4);;
          }
        }
      }
      &.blurblack {
        background: transparent;
        span {
          background-color: rgba(192,192,192,.4);
          &:after {
            background-color: rgba(192,192,192,.4);
          }
        }
      }
    }
    
    @keyframes pulse-3-5 {
      0% { 
        opacity: .75;
        transform: scale(1);
      }
      25% {
        opacity: 0.75;
        transform: scale(1.5);
      }
      50% {
        opacity: 0.75;
        transform: scale(2);
      }
      100% { 
        opacity: 0; 
        transform: scale(2.5);
      }
    }
  }
    
`

export default GlobalStyle
