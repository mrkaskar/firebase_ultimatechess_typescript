import React from 'react';
import {AuthContext} from '../context/AuthContextProvider';

const useAuth = () => {
    return React.useContext(AuthContext);
}

export default useAuth;