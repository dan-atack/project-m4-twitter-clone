import React from 'react';
import styled from 'styled-components';

function Bookmarks() {
    return (
        <StyledBookmarks>
            <h1>Bookmarx</h1>
            <p>You have no bookmarx :(</p>
        </StyledBookmarks>
    );
};

const StyledBookmarks = styled.div`
    grid-area: main;
    display: flex;
    flex-direction: column;
    width: 840px;
    height: 512px;
    border: 2px solid #8b728d;;
    border-radius: 8px;
    padding: 18px;
`

export default Bookmarks;