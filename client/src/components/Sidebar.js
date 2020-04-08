import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
// importing icons:
import { Icon } from 'react-icons-kit';
import { home } from 'react-icons-kit/feather/home';
import { user } from 'react-icons-kit/feather/user';
import { bell } from 'react-icons-kit/feather/bell';
import { bookmark } from 'react-icons-kit/feather/bookmark';

import { COLORS } from '../constants';

import Logo from '../assets/Logo';

function Sidebar() {
    return(
        <StyledSidebar>
            <Logo></Logo>
            <StyledNav exact to='/'>
                <Icon icon={home} style={{paddingRight: 16, paddingBottom: 2}}/>
                Home
            </StyledNav>
            <StyledNav to='/notifications'>
                <Icon icon={bell} style={{paddingRight: 16, paddingBottom: 2}}/>
                Notifications
            </StyledNav>
            <StyledNav to='/bookmarks'>
                <Icon icon={bookmark} style={{paddingRight: 16, paddingBottom: 2}}/>
                Bookmarks
            </StyledNav>
            <StyledNav to='/userProfile'>
                <Icon icon={user} style={{paddingRight: 16, paddingBottom: 2}}/>
                Profile
            </StyledNav>
        </StyledSidebar>
    );
};

const StyledSidebar = styled.div`
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    grid-area: side;
    border: 2px solid #a24ec4;
    border-radius: 8px;
    min-width: 256px;
    height: 80vh;
`

const StyledNav = styled(NavLink)`
    display: flex;
    margin: 8px;
    padding: 2px;
    width: 128px;
    text-decoration: none;
    border-radius: 8px;
    font-family: sans-serif;
    font-size: 16px;
    &:hover {
        background: ${COLORS.primary};
        transition: 400ms ease-in-out;
    }
    &.active {
        background-color: ${COLORS.primary};
    }
`;

export default Sidebar;