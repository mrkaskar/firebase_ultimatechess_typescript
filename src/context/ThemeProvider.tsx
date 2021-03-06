import React from 'react';
import { natural } from '../themes/themes';


export const ThemeContext = React.createContext<any>(null);

export const ThemeContextProvider = ({children}:{children:React.ReactNode}) => {
    const [theme, setTheme] = React.useState(natural)

    return <ThemeContext.Provider value={{theme, setTheme}}>
        {children}
    </ThemeContext.Provider>

}

export default ThemeContextProvider;