import React from 'react';

import AsarLogo from '../../Assets/asar-logo-lg-wt.png';

import { FooterContainer } from './Footer.styles.js';

const Footer = () => {
  return (
    <FooterContainer>
      <img src={AsarLogo} alt='Asar Web Development' width='100px'/>
    </FooterContainer>
  )
}

export default Footer;