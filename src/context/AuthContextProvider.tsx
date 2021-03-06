import React from 'react';
import { useHistory } from 'react-router-dom';
import Loading from '../components/Screens/Loading';
import useTheme from '../hooks/useTheme';
import { getPlayGame, getUser, getUserGame } from '../lib/db';
import firebase from '../lib/firebase';
import { decideTheme } from '../themes/themes';

const auth = firebase.auth();

interface User {
    uid: string;
    nname: string;
    email: string;
    photo: string;
    theme: string;
}
interface ContextProps {
   user: User,
   setUser: React.Dispatch<React.SetStateAction<User>>
}
export const AuthContext = React.createContext<ContextProps | null | undefined>(null);
export const AuthContextProvider = ({children}:{children:React.ReactNode}) => {
    const history = useHistory(); 
    const [user, setUser] = React.useState<User | null| undefined>(null);
    const [loading, setLoading] = React.useState(true);
    const {setTheme} = useTheme();
    React.useEffect(()=>{
        let timeout: NodeJS.Timeout;
      auth.onAuthStateChanged(async (user)=>{
          clearTimeout(timeout);
          if(user){
              let savedUser;
              try{
                  savedUser = await getUser(user.uid);
              }
              catch(e){
                  console.log(e.message)
              }
              setTheme(decideTheme(savedUser?.theme));
              //@ts-ignore
              setUser(savedUser);
              let checkgame = await getUserGame(user.uid);
              let checkgame2 = await getPlayGame(user.uid);
            
              if(checkgame && checkgame2){
                  history.push('/hvhgame');
              }
              else if(checkgame2){
                  history.push('/hvhgame');
              }
              else if(checkgame){
                 history.push('/create') 
              }
              else{
                  history.push('/');
              }
              setLoading(false);
              return;
          }
          else{
              setUser(undefined);
              setTimeout(()=>{
                 setLoading(false);
              },3000);
          }
      },(error) => {
          setUser(undefined)
              setTimeout(()=>{
                 setLoading(false);
              },3000);
        }); 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    
    if(loading) return <Loading/>
   
    return (
    //@ts-ignore
        <AuthContext.Provider value={{user, setUser}}>
            {
                children
            }
        </AuthContext.Provider>

    )
}
