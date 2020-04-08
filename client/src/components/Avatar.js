import React from 'react';
import styled from 'styled-components';

function Avatar({size, src, alt, margin = 0, moveRightward = "false"}) {
    return (
        <StyledAvatar src={src} alt={alt} style={{width: size, height: size, marginTop: margin, marginLeft: (moveRightward ? margin/8 : -margin/8)}} />
    );
};

const StyledAvatar = styled.img`
    border-radius: 50%;
    border: 2px solid whitesmoke;
`;

export default Avatar;