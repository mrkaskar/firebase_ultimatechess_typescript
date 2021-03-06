import React from 'react';
import {ThemeContext} from '../context/ThemeProvider';

const useTheme = () => {
    return React.useContext(ThemeContext);
}

export default useTheme;