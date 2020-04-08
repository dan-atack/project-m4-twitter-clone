import React from 'react';
import styled from 'styled-components';

function Notifications() {
    return (
        <NotificationStyle>
            <h1>Notifications</h1>
            <p>You have no notifications at this time.</p>
        </NotificationStyle>
    );
};

const NotificationStyle = styled.div`
    grid-area: main;
    display: flex;
    flex-direction: column;
    width: 840px;
    height: 512px;
    border: 2px solid #8b728d;;
    border-radius: 8px;
    padding: 18px;
`

export default Notifications;