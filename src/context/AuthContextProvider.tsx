import React from 'react';
import { useHistory } from 'react-router-dom';
import Loading from '../components/Screens/Loading';
import { getPlayGame, getUser, getUserGame } from '../lib/db';
import firebase from '../lib/firebase';

const auth = firebase.auth();

interface User {
    uid: string;
    nname: string;
    email: string;
    photo: string;
}
interface ContextProps {
   user: User,
   setUser: React.Dispatch<React.SetStateAction<User>>
}
export const AuthContext = React.createContext<ContextProps | null>(null);
export const AuthContextProvider = ({children}:{children:React.ReactNode}) => {
    const history = useHistory(); 
    const [user, setUser] = React.useState<User | null>(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(()=>{
      auth.onAuthStateChanged(async (user)=>{
          if(user){
              //@ts-ignore
              setUser(await getUser(user.uid));
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
              setLoading(false);
              setUser(user);
      },(error) => console.log(error))  
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
