import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../constants';

// will take a prop representing the percent towards being full, and switch colors accordingly:
function CharacterColor({characterCount, textLimit}) {
    return (
        <StyledCharBox style={{background: (characterCount <= (textLimit-55)) ? '#4bd13f' : (characterCount <= textLimit) ? '#cfdb27': '#db2727'}}>
            <span>{textLimit - characterCount}</span>
        </StyledCharBox>
    );
};

const StyledCharBox = styled.div`
    border: 1px solid ${COLORS.border};
    border-radius: 8px;
    margin-top: 8px;
    margin-bottom: 0px;
    margin-left: 16px;
    font-weight: bold;
`;

export default CharacterColor;