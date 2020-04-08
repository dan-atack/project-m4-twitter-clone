import React from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import { Icon } from 'react-icons-kit';
import { messageCircle } from 'react-icons-kit/feather/messageCircle'
import { repeat } from 'react-icons-kit/feather/repeat'
import { heart } from 'react-icons-kit/feather/heart'
import { upload } from 'react-icons-kit/feather/upload';

function ButtonPanel({handleRetweet, handleLike, numLikes, numRetweets}) {
    return (
        <Panel>
            <PanelButton>
                <Icon icon={messageCircle}/>
            </PanelButton>
            <div className="retweets">
                <PanelButton onMouseUp={handleRetweet}>
                    <Icon icon={repeat}/>
                </PanelButton>
                <span style={{marginLeft: 8}}>{numRetweets}</span>
            </div>
            <div className="likes">
                <PanelButton onMouseUp={handleLike}>
                    <Icon icon={heart}/>
                </PanelButton>
                <span style={{marginLeft: 8}}>{numLikes}</span>
            </div>
            <PanelButton>
                <Icon icon={upload}/>
            </PanelButton>
        </Panel>
    );
};

const Panel = styled.div`
    display: flex;
    margin-top: 12px;
    width: 90%;
    justify-content: space-around;
`;

const PanelButton = styled.button`
    border: 0;
    border-radius: 50%;
    background: white;
    box-shadow: 0px 0px 1px 1px #cebcbc;
    position: relative;
    top: -2px;
`;

export default ButtonPanel;