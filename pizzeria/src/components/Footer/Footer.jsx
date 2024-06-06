import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className='footer-content'>
        <div className='footer-content-left'>
          <img className='logo' src={assets.logo} alt='' />
          <p>
            “The core location, introduced in Five Nights at Freddy's, is Freddy Fazbear's Pizza, famed for its singing animatronic mascots. Well, we say "famed" but "notorious" might be a better word.”</p>
          <div className='footer-social-icons'>
            <img src={assets.facebook_icon} alt='' />
            <img src={assets.twitter_icon} alt='' />
            <img src={assets.linkedin_icon} alt='' />
          </div>
        </div>
        <div className='footer-content-center'>
          <h2> COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div className='footer-content-right'>
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+7-702-111-07-75</li>
            <li>bsaulebay@gmail.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className='footer-copyright'>
        Copyright 2024 @ FreddyFastBearsPizza - All Rights Reserved.
      </p>
    </div>
  )
}

export default Footer