import React from 'react'

import reactPic from "../pics/icons8-react-50.png"
import reduxPic from "../pics/icons8-redux-48.png"
import cssPic from "../pics/icons8-css3-48.png"
import nodePic from "../pics/icons8-nodejs-48.png"
import postPic from "../pics/icons8-postgresql-48.png"
import icon8 from "../pics/icons8-icons8-48.png"



const Footer = ()=>{
    return(
        <div className="footerBar">
            <div className="footerFlex">
                <img src = {reactPic} alt="React symbol"/>
                <img src = {reduxPic} alt="Redux symbol"/>
                <img src = {cssPic} alt="CSS symbol"/>
                <img src = {nodePic} alt="Node symbol"/>
                <img src = {postPic} alt="PostGresQL symbol"/>
                <a href = "https://icons8.com/" target="_blank" rel="noopener noreferrer">
                    <img src={icon8} alt="icon8"/>
                </a>
            </div>
        </div>
    )
}

export default Footer;