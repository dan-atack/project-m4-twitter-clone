import React from 'react';
import styled from 'styled-components';
import Logo from '../assets/Logo';
import { COLORS } from '../constants';

function Header() {
    return (
        <StyledHeader>
            <StyledLogo>
                <Logo color={"#121d15"}/>
            </StyledLogo>
            Critter: The Twitter Clone That's In The Zone!
            <Logo color={"#121d15"}/>
        </StyledHeader>
    );
};

const StyledHeader = styled.div`
    display: flex;
    grid-area: head;
    height: 64px;
    padding: 32px;
    background: ${COLORS.primary};
    font-size: 36px;
    font-family: sans-serif;
    font-weight: bold;
    border-radius: 8px;
    border: 2px solid #550c4b;
`;

const StyledLogo = styled.div`
    position: relative;
    transform: rotateY(180deg);
`

export default Header;