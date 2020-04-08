import React from 'react';

export const CurrentUserContext = React.createContext(null);

export const CurrentUserProvider = ({children}) => {

    // STATES FOR STAGE A: Acquire User Data
    // retrieve current user data:
    const [currentUser, setCurrentUser] = React.useState(null);
    // Use loading status to control waiting sequences:
    const [status, setStatus] = React.useState('loading');
    // unsure about this now... will keep for the moment.
    const [error, setError] = React.useState('no-error');

    // STATES FOR STAGE B - Get the ID's of all the tweets in the main feed and profile page (separately):
    // User-specific feed:
    const [userTweets, setUserTweets] = React.useState([]);
    // We will use the tweetStatus state like we did with the user's data in context, to avoid jumping the gun:
    const [tweetStatus, setTweetStatus] = React.useState('loading');
    // We'll need a user tweet status to avoid confusion between the two download batches:
    const [userTweetStatus, setUserTweetStatus] = React.useState('loading');
    // Error reports - not used very elegantly right now but good to have around (used by individual tweet fetch as well):
    const [twitError, setTwitError] = React.useState('no-error');

    // STATES FOR STAGE C - Fetch actual tweets to be rendered:
    // General Feed:
    let [tweetData, setTweetData] = React.useState([]);

    // STATES FOR STAGE D - Newly posted tweets have a different syntax:
    const [newTweets, setNewTweets] = React.useState([]);

    // STATES FOR STAGE E - Liking and disliking have localized effects:
    
    // FETCH EFFECT STAGE A: get the current user's data at the outset, then stop trying.
    // if there is a server error, we'll need to come up with a better way to reattempt this....
    React.useEffect(() => {
        fetch('/api/me/profile')
        .then(res => {
                return res.json();
        })
        .then(output => {
            setCurrentUser(output.profile);
            setStatus("idle");
        })
        .catch((error) => {
            setError(error);
            // throw new Error("Server failed to respond. Retrying.");
        })
    }, [error]);
    // FETCH EFFECT STAGE B: Get tweets for the home page:
    React.useEffect(() => {
        //setTweetData(newTweets);
        fetch('/api/me/home-feed')
        .then(res => {
            return(res.json());
        })
        .then(twits => {
            setTweetData(twits.tweetsById);
            setTweetStatus('idle');
        })
        .catch((error) =>{
            setTwitError(error);
            // throw new Error("Server failed to respond. Retrying.");
        })}, [status, currentUser, newTweets, twitError]);
    // FETCH EFFECT STAGE C: Get tweets for the current user's profile page:
    React.useEffect(() => {
        if (currentUser) {
            console.log(currentUser.handle);
            fetch(`/api/${currentUser.handle}/feed`)
            .then(res => {
                return(res.json());
            })
            .then(twits => {
                setUserTweets(twits.tweetsById);
                setUserTweetStatus('idle');
            })
            .catch((error) =>{
                setTwitError(error);
                // throw new Error("Server failed to respond with user tweets. Retrying.");

            })
        }
    }, [currentUser, twitError]);

    return (
        <CurrentUserContext.Provider 
        value={{
            currentUser,
            setCurrentUser,
            status,
            setTweetStatus,
            tweetStatus,
            tweetData,
            userTweets,
            userTweetStatus,
            newTweets,
            setNewTweets,
            error,
            twitError,
        }}>
            {children}
        </CurrentUserContext.Provider>
    )
}