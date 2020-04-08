import React from 'react';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';
import { CurrentUserContext } from './CurrentUserContext';
import Feed from './Feed';

function Homefeed() {

    // import context:
    const { currentUser, status, tweetStatus, tweetData, error, twitError, newTweets } = React.useContext(CurrentUserContext);

    // show prog spinner while data loads: (copy this into indiv tweet comps? most likely!)
    while (status != 'idle') {
        return (
            <CenteredDiv>
                <CircularProgress></CircularProgress>
            </CenteredDiv>
        );
    };
    while (tweetStatus != 'idle') {
        return (
            <CircularProgress></CircularProgress>
        );
    };
    // while ((error == 'Internal Server Error') || (twitError == 'Internal Server Error')) {
    //     console.log(error);
    //     return (
    //         <ErrorScreen></ErrorScreen>
    //     );
    // };

    // deconstruct user data object for convenience down below:
    let { handle, displayName, avatarSrc, bannerSrc, location, joined, bio, numFollowing, numFollowers, numLikes, isFollowingYou, isBeingFollowedByYou } = currentUser;

    // convert userTweets object into a mappable array:
    let tweetKeys = Object.keys(tweetData);
    let tweetArray = [];
    for (let i = 0; i < tweetKeys.length; i++) {
        tweetArray.push(tweetData[tweetKeys[i]]);
    }
    return (
        <StyledHome>
            <h1>
                {displayName}'s feed
            </h1>
            <h2>
                @{handle}
            </h2>
            <Feed tweets={tweetArray} />
        </StyledHome>
    );
};

const StyledHome = styled.div`
    grid-area: main;
    text-align: center;
    width: 840px;
`;

const CenteredDiv = styled.div`
    grid-area: main;
    margin-top: 128px;
`;

export default Homefeed;