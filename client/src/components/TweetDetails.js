import React from 'react';
import { CurrentUserContext } from './CurrentUserContext';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import Avatar from './Avatar';
import { COLORS } from '../constants';
import ButtonPanel from './ButtonPanel';
import { format } from 'date-fns';

// AKA BIG TWEET:
function TweetDetails() {

    // Use params to see WHICH tweet we're using:
    let { id } = useParams();

    let { tweetData, tweetStatus, currentUser, setCurrentUser } = React.useContext(CurrentUserContext);

    while (tweetStatus != "idle") {
        return (
            <CircularProgress/>
        );
    };

    let { status, media, author, timestamp, retweetedBy, isRetweeted, numRetweets, isLiked, numLikes } = tweetData[id];

    // Check if media prop contains anything:
    let renderImage = false;
    if ((media.length > 0) && (Object.keys(media[0]).length > 0)) {
        renderImage = true;
    };

    // format date string:
    let formattedDate = format(
        new Date(Number(timestamp.slice(0, 4)), Number(timestamp.slice(5, 7)), Number(timestamp.slice(8, 10)), Number(timestamp.slice(11,13)), Number(timestamp.slice(14, 16))),
        "p MMM do yyy",
    );

    // Likenator:
    const handleLike = (event) => {
        event.preventDefault();
        // Prevent you from liking your own tweets:
        if (author.handle != currentUser.handle) {
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

    return (
        <BigTwit>
            <div style={{display: "flex", flexDirection: "row"}}>
                <Avatar src={author.avatarSrc} alt={author.handle} size={96} margin={12}/>
                <div style={{display: "flex", flexDirection: "column", textAlign: "left", marginLeft: 16, marginTop: 32}}>
                    <span style={{fontWeight: "bold"}}>{author.displayName}</span>
                    <span>@{author.handle}</span>
                </div>
            </div>
                
                <div style={{fontSize: 18}}> {status} </div>
                {(renderImage) ? 
                    <CroppedImg 
                    src={media[0].url}
                    /> 
                    : ""}
                <span style={{textAlign: "left"}}>Posted on: {formattedDate}</span>
                <ButtonPanel numLikes={numLikes} numRetweets={numRetweets} handleLike={handleLike}/>
        </BigTwit>
    );
};

const BigTwit = styled.div`
    border: 2px solid ${COLORS.border};
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    align-content: center;
    text-align: center;
    margin: 16px;
    padding: 16px;
`;

const CroppedImg = styled.img`
    max-height: 1024px;
    max-width: 1024px;
    border: 1px solid ${COLORS.border};
    margin-left: auto;
    margin-right: auto;
    border-radius: 8px;
    margin-top: 16px;
    margin-bottom: 16px;
`;

export default TweetDetails;