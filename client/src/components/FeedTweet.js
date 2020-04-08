import React from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import { useHistory } from 'react-router-dom';
import ButtonPanel from './ButtonPanel';
import { Icon } from 'react-icons-kit';
import { edit2 } from 'react-icons-kit/feather/edit2';

// attempting use of customized reusable styled components:
import Avatar from './Avatar';
import { COLORS } from '../constants';
import { CurrentUserContext } from './CurrentUserContext';

function FeedTweet({id, status, media, handle, avatar, name, timestamp, numRetweets, isLiked, numLikes}) {

    // Let's put things into context:
    const { currentUser, setCurrentUser } = React.useContext(CurrentUserContext);

    // Handler functions for liking/retweeting:
    const handleLike = (event) => {
        event.preventDefault();
        // Prevent you from liking your own tweets:
        if (handle != currentUser.handle) {
            const liking = !isLiked;
            fetch(`/api/tweet/${id}/like`, {
                method: "PUT",
                body: JSON.stringify({"like": liking}),
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            })
            .then(res => {
                return res.json();
            })
            .then(report => {
                // Error status adjustment needed:
                setCurrentUser({...currentUser, numLikes: (currentUser.numLikes + 1)})
            });
        } else {
            alert("You can't like your own tweets, you twit!")
        };
    };
    // WARNING: CURRENTLY DEFECTIVE... MOVE ON FOR NOW AND FIX LATER!
    const handleRetweet = (event) => {
        // console.log(isRetweeted);
        // event.preventDefault();
        // let retweeting = !isRetweeted;
        // fetch(`/api/tweet/${id}/retweet`, {
        //     method: "PUT",
        //     body: JSON.stringify({"retweet": retweeting}),
        //     headers: {
        //         "Accept": "application/json",
        //         "Content-Type": "application/json"
        //     }
        // })
        // .then(res => {
        //     // Error status needed eventually..
        //     return res.json();
        // })
        // .then(report => {
        //     setNewTweets(newTweets => [...newTweets, id]);
        //     setCurrentUser({...currentUser, posts: newTweets.length})
        // })
    };

    // Navigating to Big Tweets and keyboard sensation:

    let history = useHistory();

    const handleKeyUpTweet = (event) => {
        if (event.keyCode == 13) {
            history.push(`/tweet/${id}`);
        }
    };

    const handleClickTweet = () => {
        history.push(`/tweet/${id}`);
    };

    // Visiting a user's profile page by clicking their display name:

    const handleClickUser = () => {
        history.push(`/${handle}`);
    }

    // Check if media prop contains anything:
    let renderImage = false;
    if ((media.length > 0) && (Object.keys(media[0]).length > 0)) {
        renderImage = true;
    };
    // format date string:
    let formattedDate = format(
        new Date(Number(timestamp.slice(0, 4)), Number(timestamp.slice(5, 7)), Number(timestamp.slice(8, 10))),
        "MMM do",
    );
    return (
        <MainTwit>
            <TopComponent tabIndex="0" aria-label="View Tweet Details">
                <Avatar src={avatar} alt={handle} size={72}/>
                <TextContainer onMouseUp={handleClickUser}>
                    <div>
                        <span style={{fontWeight: 'bold'}}>{`${name} `}</span>
                        <span> @{handle}</span>
                        <Icon icon={edit2} style={{marginLeft: 8, marginTop: -2}}/>
                        <span>{formattedDate}</span>
                    </div>
                    <span>{status}</span>
                </TextContainer>
            </TopComponent>
            {(renderImage) ? 
                    <CroppedImg 
                    tabIndex="0" 
                    aria-label="View Tweet Details" 
                    onKeyUp={handleKeyUpTweet} 
                    onMouseUp={handleClickTweet}
                    src={media[0].url}
                    /> 
                    : ""}
            <ButtonPanel numLikes={numLikes} numRetweets={numRetweets} handleLike={handleLike} handleRetweet={handleRetweet}/>
        </MainTwit>
    );
};

const MainTwit = styled.div`
    border: 2px solid ${COLORS.border};
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    align-content: center;
    text-align: center;
    margin: 16px;
    padding: 12px;
`

const TopComponent = styled.div`
    display: flex;
`

const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 78%;
    padding-left: 32px;
    padding-bottom: 16px;
    text-align: left;
`

const CroppedImg = styled.img`
    max-height: 256px;
    max-width: 512px;
    border: 1px solid ${COLORS.border};
    margin-left: auto;
    margin-right: auto;
    border-radius: 8px;
`;

export default FeedTweet;