import React from 'react';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';
import { COLORS } from '../constants';
import Avatar from './Avatar';
import CharacterColor from './CharacterColor';
import { CurrentUserContext } from './CurrentUserContext';


function TweetInput() {

    // import user context so we can show their avatar and update their feed when a new tweet is posted:
    const { currentUser, setCurrentUser, status, newTweets, setNewTweets } = React.useContext(CurrentUserContext);

    // Controlled Component: Use State to store and update the value of the text field input:
    const [textState, setTextState] = React.useState({value: ''});

    const handleTweetChange = (event) => {
        setTextState({value: event.target.value})
    }

    const textLimit = 280 // Thought it might be nice to make this interactive/alterable...

    // Tweet submission handler function:
    const handleSubmitTweet = (event) => {
        event.preventDefault();
        // don't let them submit if text is too long:
        if (textState.value.length <= textLimit) {
            setTextState({value: ""});
            // POST tweet:
            fetch('/api/tweet', {
                method: "POST",
                // ALWAYS STRINGIFY THAT MOTHER******
                body: JSON.stringify({"status": textState.value}),
                headers: {
                    "Accept" : "application/json",
                    "Content-Type": "application/json"
                }
            })
            .then(res => {
                return res.json();
            })
            .then(tweet => {
                console.log(tweet);
                setNewTweets(newTweets => [...newTweets, tweet]);
                setCurrentUser({...currentUser, posts: newTweets.length})
            });
        } else {
            alert(`Your text is ${textState.value.length - textLimit} characters over the line. Try recasting your sentiment, and recall that brevity is a virtue :)`);
        }
    };

    // Load wait spinner while awaiting user data:
    while (status != 'idle') {
        return (
            <CircularProgress></CircularProgress>
        );
    };
    return(
            <TweetBox>
                <Avatar size={96} src={currentUser.avatarSrc} alt={currentUser.handle} margin={16} moveRightward={true}/>
                <form style={{display: "flex", flexDirection: "row"}} onSubmit={handleSubmitTweet}>
                    <div style={{display: "flex", flexDirection: "column", bottom: -8}}>
                        <h3>Say something... even if you have nothing to say!</h3>
                        <img src={require('../assets/bubble-tick.png')} style={{width: 32, height: 32, zIndex: 2, position: "relative"}} />
                        <Twitput 
                        type="text" 
                        value={textState.value} 
                        onChange={handleTweetChange} 
                        placeholder="You got somethin' to say??"
                        />
                    </div>
                    <div style={{marginTop: 32, display: "flex", flexDirection: "column"}}>
                        <MeowButton type="submit" value="Submit">MEOW</MeowButton>
                        <CharacterColor characterCount={textState.value.length} textLimit={textLimit}/>
                    </div>
                </form>
            </TweetBox>
    );
};



const TweetBox = styled.div`
    border: 2px solid ${COLORS.border};
    border-radius: 8px;
    grid-area: input;
    position: relative;
    height: 144px;
    display: flex;
    flex-direction: row;
    justify-items: center;
    text-align: center;
    align-content: center;
`;

const Twitput = styled.textarea`
    border: 1px solid ${COLORS.border};
    min-height: 60px;
    width: 512px;
    border-radius: 12px;
    margin-Left: 31px;
    margin-top: -32px;
    text-indent: 12px;
`;

const MeowButton = styled.button`
    background-color: ${COLORS.logoBlue};
    color: whitesmoke;
    border-radius: 8px;
    width: 96px;
    height: 32px;
    margin-top: 32px;
    margin-bottom: 0px;
    margin-left: 16px;
`

export default TweetInput;