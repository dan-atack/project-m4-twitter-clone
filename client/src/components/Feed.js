import React from 'react';
import styled from 'styled-components';
import FeedTweet from './FeedTweet';
import { COLORS } from '../constants';
import { CurrentUserContext, CurrentUserProvider } from './CurrentUserContext';

function Feed({tweets}) {

    const { currentUser } = React.useContext(CurrentUserContext);
    // Reverse the order of the tweet list so new ones come first:
    let orderedTweets = tweets.reverse();
    let retweets = orderedTweets.filter(tweet => {return tweet.retweetFrom});
    // Break up the tweets list so you don't necessarily see every single one all at once:
    const [currentTen, setCurrentTen] = React.useState([0,10])
    let indexLimit = (orderedTweets.length - 1) + retweets.length;

    // Grey out buttons when there are no more tweets to scroll:
    var prevVis = (currentTen[0] == 0) ? 'none' : 'initial';
    var nextVis = (currentTen[1] >= indexLimit) ? 'none' : 'initial';
    
    const handleNext = (event) => {
        event.preventDefault();
        // First, check that there are any more tweets to see:
        if (currentTen[1] >= indexLimit) return;
        // to show older tweets, check how many more there are, then update the index from the previous cycle:
        ((currentTen[1] + 10) <= indexLimit) ? 
        // if there are at least ten more tweets, then show the next ten:
        setCurrentTen([currentTen[1] + retweets.length, currentTen[1] + 10 + retweets.length]) :
        // Otherwise show as many as the list length allows:
        setCurrentTen([currentTen[1] + retweets.length, indexLimit])
    };

    const handlePrev = (event) => {
        event.preventDefault();
        // first check that you're not already at the start of the list:
        if (currentTen[0] == 0) return;
        // If there are at least ten tweets prior to the ones currently being displayed, set the current ten back by ten,
        // otherwise go back to the initial ten.
        (currentTen[0] - (10 + retweets.length) >= 0) ?
        setCurrentTen([currentTen[0] - (10 + retweets.length), (currentTen[0] - retweets.length)]) :
        setCurrentTen([0, (10 + retweets.length)])
    };

    const NextButton = styled.button`
    background: ${COLORS.logoBlue};
    border-radius: 8px;
    border: 1px solid ${COLORS.border};
    color: whitesmoke;
    width: 128px;
    height: 48px;
    display: ${nextVis};
    margin-top: 8px;
`;

const PrevButton = styled.button`
    background: ${COLORS.logoBlue};
    border-radius: 8px;
    border: 1px solid ${COLORS.border};
    color: whitesmoke;
    width: 128px;
    height: 48px;
    display: ${prevVis};
    margin-top: 8px;
`;

    return (
        <FeedStyle>
            <span>Currently showing tweets {((currentTen[0] + 1))} to {(indexLimit >= currentTen[1]) ? currentTen[1] + retweets.length : indexLimit + retweets.length}</span>
            <div style={{display: 'flex', justifyContent: 'space-around'}}>
                <PrevButton onMouseUp={handlePrev}>I CAN HAZ PREVEEUS??</PrevButton>
                <NextButton onMouseUp={handleNext}>I CAN HAZ MOAR??</NextButton>
            </div>
            {(orderedTweets.slice(currentTen[0] + 1, currentTen[1]).map(tweet => {
                console.log(retweets);
                return (
                    <FeedTweet
                    key={tweet.id}
                    id={tweet.id}
                    status={tweet.status}
                    media={tweet.media}
                    retweetFrom={(tweet.retweetFrom) ? tweet.retweetFrom : ""}
                    handle={tweet.author.handle}
                    avatar={tweet.author.avatarSrc}
                    name={tweet.author.displayName}
                    timestamp={tweet.timestamp}
                    isRetweeted={tweet.isRetweeted}
                    isLiked={tweet.isLiked}
                    numLikes={tweet.numLikes}
                    numRetweets={tweet.numRetweets}
                    >
                    </FeedTweet>
                )
            }))}
            {(retweets.map(tweet => {
                console.log(retweets);
                return (
                    <FeedTweet
                    key={tweet.id}
                    id={tweet.id}
                    status={tweet.status}
                    media={tweet.media}
                    retweetFrom={(tweet.retweetFrom) ? tweet.retweetFrom : ""}
                    handle={tweet.author.handle}
                    avatar={tweet.author.avatarSrc}
                    name={tweet.author.displayName}
                    timestamp={tweet.timestamp}
                    isRetweeted={tweet.isRetweeted}
                    isLiked={tweet.isLiked}
                    numLikes={tweet.numLikes}
                    numRetweets={tweet.numRetweets}
                    >
                    </FeedTweet>
                )
            }))}
            <span>Currently showing tweets {((currentTen[0] + 1))} to {(indexLimit >= currentTen[1]) ? currentTen[1] + retweets.length : indexLimit + retweets.length}</span>
            <div style={{display: 'flex', justifyContent: 'space-around'}}>
                <PrevButton onMouseUp={handlePrev}>I CAN HAZ PREVEEUS??</PrevButton>
                <NextButton onMouseUp={handleNext}>I CAN HAZ MOAR??</NextButton>
            </div>
        </FeedStyle>
    );
};

const FeedStyle = styled.div`
    grid-area: main;
    position: relative;
    display: flex;
    flex-direction: column;
    width: 812px;
    border: 2px solid #8b728d;;
    border-radius: 8px;
    padding: 18px;
`;

export default Feed;