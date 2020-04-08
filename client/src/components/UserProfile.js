import React from 'react';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';
import { format } from 'date-fns';
import { CurrentUserContext } from './CurrentUserContext';
import Feed from './Feed';
import Avatar from './Avatar';
import { COLORS } from '../constants';
// icon symbols:
import { Icon } from 'react-icons-kit';
import { umbrella } from 'react-icons-kit/feather/umbrella';
import { calendar } from 'react-icons-kit/feather/calendar';


function UserProfile() {

    // import some context:
    const { currentUser, status, userTweetStatus, userTweets, newTweets } = React.useContext(CurrentUserContext);

    // Load wait spinner:
    while (status != 'idle') {
        return (
            <CircularProgress></CircularProgress>
        );
    };
    while (userTweetStatus != 'idle') {
        return (
            <CircularProgress></CircularProgress>
        );
    };

    // deconstruct user data object for convenience down below:
    let { handle, displayName, avatarSrc, bannerSrc, location, joined, bio, numFollowing, numFollowers, numLikes, isFollowingYou, isBeingFollowedByYou } = currentUser;
    // dates are a b$%^&:
    let formattedDate = format(
        new Date(Number(joined.slice(0, 4)), Number(joined.slice(5, 7)), Number(joined.slice(8, 10))),
        "MMMM yyy",
    );

    // convert userTweets object into a mappable array:
    let userKeys = Object.keys(userTweets);
    let userTweetArray = [];
    for (let i = 0; i < userKeys.length; i++) {
        userTweetArray.push(userTweets[userKeys[i]]);
    }
    console.log(userTweetArray);
    return (
        <StyledProfile>
            <h1>{displayName}'s Profile</h1>
            <StyledBanner src={bannerSrc} alt={location}/>
            <Avatar src={avatarSrc} alt={displayName} size={108} margin={-54}/>
            <div style={{textAlign: "right", paddingRight: 32}}>
                <FollowingButton>Following</FollowingButton>
            </div>
            <div style={{display: "flex", flexDirection: "column", textAlign: "left"}}>
                <span style={{fontWeight: "bold"}}>{displayName}</span>
                <span>@ {handle}</span>
                <p>{bio}</p>
                <div>
                    <Icon icon={umbrella} style={{position: "relative", top: -2, marginLeft: 4, marginRight: 4}} />
                    <span style={{marginRight: 24}}>{location}</span>
                    <Icon icon={calendar} style={{position: "relative", top: -2}} />
                    <span> Joined {formattedDate}</span>
                </div>
                <div style={{marginTop: 12}}>
                    <span style={{marginRight: 4, fontWeight: "bold"}}>{numFollowing}</span><span>Following</span>
                    <span style={{marginLeft: 16, marginRight: 4, fontWeight: "bold"}}>{numFollowers}</span><span>Followers</span>
                </div>
            </div>
            <div style={{marginLeft: -18, marginTop: 16}}>
                <Feed tweets={userTweetArray} />
            </div>
        </StyledProfile>
    );
};

const StyledProfile = styled.div`
    grid-area: main;
    display: flex;
    flex-direction: column;
    width: 840px;
    border: 2px solid #8b728d;;
    border-radius: 8px;
    padding: 18px;
`

const StyledBanner = styled.img`
    max-width: 800px;
    max-height: 256px;
    border: 2px solid lightgray;
`
const FollowingButton = styled.button`
    background-color: ${COLORS.logoBlue};
    color: white;
    border-radius: 16px;
    height: 32px;
    width: 92px;
`

export default UserProfile;