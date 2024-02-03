
import {Navigate} from 'react-router-dom';
import { useEffect } from 'react';
import React, {useContext } from 'react';
export default function Protected({children})
{

    const userContext = createContext({
        user: null
      });
    const { user } = useContext(userContext);

    
    if(!user)
        return <Navigate to="/login"></Navigate>

    if(user)
    return children
}
