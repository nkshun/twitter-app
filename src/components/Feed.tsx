import React from 'react';

import { auth } from '../firebase';
import TweetInput from './TweetInput'

const Feed = () => {
    return (
        <div>
            <TweetInput />
            feed
            <button onClick={() => auth.signOut()}>logout</button>
        </div>
    )
}

export default Feed
