import firebase from "./firebase";

const db = firebase.firestore();
const rdb = firebase.database();

export const getUser = async (uid: string) => {
    const userRef =  db.collection('users').doc(uid);
    const doc = await userRef.get();
    
    return doc.data();
} 
export const getUserGame = async (uid: string) => {
    let id;
    const res = await db.collection('games').where('uid','==',uid).get();
    if(res.empty){
        return;
    }
    id = res.docs[0].id
    return id;
}

export const getPlayGame = async (uid: string) => {
    let id;
    const res = await db.collection('games').where('u2id','==',uid).get();
    if(res.empty){
        return;
    }
    id = res.docs[0].id
    return id;
}
export const acceptGame = async(uid: string, uname: string, photo:string, color: string, gid: string) => {
   let acceptColor;
   let u1color = color;
   if(color === "random"){
        acceptColor = ["white","black"][Math.floor(Math.random()* 2)];  
        u1color = acceptColor === "white" ? "black": "white";
   }else{
       acceptColor = u1color === "white" ? "black" : "white";
    }
    const res = await db.collection('games').doc(gid).set({
       color: u1color,
       u2id: uid,
       u2name: uname,
       u2photo: photo, 
       waiting: false
    },{
        merge: true
    })
    
    await createAgame(gid);
    
    return res;
}

export const makeGame = async (uid: string,uname: string,photo:string,time:number, color:string) => {
    const res = await db.collection('games').add({
        uid,
        uname,
        photo,
        utime:time,
        color,
        u2id:'',
        u2name:'',
        u2photo:'',
        u2time:time,
        time, 
        moves: [],
        waiting: true
    })
    return res.id;
}

export const deleteGame = async (id: string) => {
   await db.collection('games').doc(id).delete();
   await rdb.ref('/games/'+id).remove();
}
    
export const gameObserver = (uid:string) =>{
    const toObserve = db.collection('games').where("uid", "!=", uid);
    
    return toObserve;
}

export const moveObserver = (gid: string) => {
    const toObserve = db.collection('games').doc(gid);
   return toObserve; 
}

export const getGame = async (gid: string) => {
    const res = db.collection('games').doc(gid).get();
    return (await res).data();
}


export const createAgame = async (gid: string, u1time:number=0, u2time:number=0) => {
    await rdb.ref('/games/'+gid).set({
        fen: '',
        whiteCap:[],
        blackCap:[],
        u1time,
        u2time,
        player:"b",
        drawOffer:'',
        resignConfirm:'', 
        gameEnd:'',
    })
}

export const makeAmove = async (gid: string, fen: string, blackCap: string[], whiteCap: string[], u1time: number, u2time:number, player:string) => {
    await rdb.ref('/games/'+gid).set({
        fen,
        whiteCap,
        blackCap,
        u1time,
        u2time,
        player,
        drawOffer:'',
        resignConfirm:'', 
        gameEnd:'',
    })   
}

export const askDraw = async (gid?: string, color?:string)=>{
    await rdb.ref('/games/'+gid).update({
        drawOffer:color 
    })
}

export const denyDraw = async (gid: string)=>{
    await rdb.ref('/games/'+gid).update({
        drawOffer:"d" 
    })
    setTimeout(async ()=>{
    await rdb.ref('/games/'+gid).update({
        drawOffer:"" 
    })
    },1000);
}

export const resign = async (gid: string, color:string)=>{
    await rdb.ref('/games/'+gid).update({
        resignConfirm:color 
    })
}

export const endGame = async (gid: string, reason: string )=>{
    await rdb.ref('/games/'+gid).update({
        gameEnd:reason 
    })
    setTimeout(async()=>{
//   await deleteGame(gid);
        },1000)
}

export const listenAmove = (gid: string) => {
    let moveRef = rdb.ref('/games/'+gid);
    return moveRef;
}
