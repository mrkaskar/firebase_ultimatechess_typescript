import firebase from "./firebase";

const auth = firebase.auth();
const db = firebase.firestore();

const format = (u: firebase.User | null) => {
  return {
    uid: u?.uid,
    nname: u?.displayName,
    email: u?.email,
    photo: u?.photoURL,
  };
};
export const createUser = async (username:string, email:string, password:string) => {
  try{
    let response = await auth.createUserWithEmailAndPassword(email,password);
    let user = response.user; 
    //@ts-ignore
    await saveUser(user.uid,  username,  email,  'icon-72x72.png');
    await signinWithEmail(email,password);
  }
  catch(e){
    throw e; 
  }
}

export const siginwithGoogle = async () => {
  let response = await auth
    .signInWithPopup(new firebase.auth.GoogleAuthProvider());
  let user = format(response.user);
  //@ts-ignore
  await saveUser(user.uid, user.nname, user.email, user.photo);
  return user;
};

export const signinWithEmail = async (email:string, password:string) => {
    try{
        let response = await auth.signInWithEmailAndPassword(email,password);
        let user = response.user;
        return user;
    }
    catch(e){
        throw e;
    }
}

export const saveUser = async (uid: string, nname: string, email:string, photo: string) => {
    try{
        await db.collection('users').doc(uid).set({
           uid,
           nname,
           email,
           photo
       });
       return "saved";
    }
    catch(e){
        throw e;        
    }
}

export const logOut = () => {
  auth.signOut();
}