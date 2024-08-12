import React from 'react';
import styled from 'styled-components';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const FooterContainer = styled.footer`
  background-color: #051305;
  color: #ded3a6;
  padding: 13px 28px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'NanumBarunpen', sans-serif;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
`;

const NavLinks = styled.nav`
  display: flex;
  gap: 20px;
`;

const NavLink = styled.a`
  color: #d3d3c7;
  opacity: 0.8;
  text-decoration: none;
  font-size: 14px;
  &:hover {
    color: #aaa;
  }
`;

const ExternalLink = styled.a`
  color: #d3d3c7;
  opacity: 0.8;
  text-decoration: none;
  font-size: 14px;
  &:hover {
    color: #aaa;
  }
`;

const Copyright = styled.div`
  font-size: 12px;
  color: #d3d3c7;
  opacity: 0.8;
  margin-left: auto;
  margin-right: 20px; /* Adjust this to control spacing */
`;

const ScrollToTopContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ScrollToTop = styled.button`
  background-color: #222;
  color: #888;
  border: none;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: #333;
  }
`;

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <FooterContainer>
      <LeftSection>
        <NavLinks>
          <NavLink href="/serviceIntroduction">소개</NavLink>
          <NavLink href="/curriculum">커리큘럼</NavLink>
          <ExternalLink href="https://www.ssafy.com/ksp/servlet/swp.board.controller.SwpBoardServlet" target="_blank" rel="ssafy life">공지사항</ExternalLink>
          <ExternalLink href="https://www.ssafy.com/ksp/jsp/swp/swpMain.jsp" target="_blank" rel="ssafy page">고객센터</ExternalLink>
        </NavLinks>
      </LeftSection>
      <Copyright>
        Copyright © 새잎. All rights reserved.
      </Copyright>
      <ScrollToTopContainer>
        <ScrollToTop onClick={scrollToTop}>
          <ArrowUpwardIcon />
        </ScrollToTop>
      </ScrollToTopContainer>
    </FooterContainer>
  );
};

export default Footer;
