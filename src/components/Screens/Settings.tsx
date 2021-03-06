import React from 'react';
import { useHistory } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useTheme from '../../hooks/useTheme';
import { changePhoto, updateName, updateTheme } from '../../lib/db';
import Check from '../../svg/Check';
import Pencil from '../../svg/Pencil';
import { allTheme } from '../../themes/themes';
import HomeNav from './Homenav';
import "./Settings.css";

const Settings = () => {
    const auth = useAuth();
    const history = useHistory();
    const {theme, setTheme} = useTheme();
    const [editname, setEditname] = React.useState(false);
    const [nameval, setNameval] = React.useState(auth?.user.nname);
    const inputRef = React.useRef<HTMLInputElement | null>(null);
    const [chosenTheme, setChosenTheme] = React.useState(auth?.user.theme);
    const [photoUrl, setPhotoUrl] = React.useState<any>(null);
    const [photoError, setPhotoError] = React.useState("");

    const uploadPhoto = (e:any) => {
        setPhotoError("");
        if(e.target.files.length > 0){
            let uploaded = e.target.files[0];
            if(uploaded.size > 100000){
                setPhotoError("Photo must be less than 100 Kb");
                return;
            }
            let blob = URL.createObjectURL(uploaded);
            setPhotoUrl(blob);
            auth?.setUser({...auth?.user, photo:blob })
            //@ts-ignore
            changePhoto(auth?.user.uid, uploaded)
        }
        e.target.files = null;
    }
    const nameChanged = () => {
        if(!nameval){
            return;    
        }
        //@ts-ignore
        updateName(auth?.user.uid, nameval); 
        setNameval(nameval);
        auth?.setUser({...auth?.user, nname:nameval})
        setEditname(false);
    }
    
    const changeTheme = (key: string) => {
        setChosenTheme(key.toLowerCase());
        //@ts-ignore
        updateTheme(auth?.user.uid, key.toLowerCase());
    }
    return (
    <>
        <HomeNav/>
        <div id="setting-panel">
           <div id="avatar-setting">
                <div>
                <img id="avatar" src={photoUrl ? photoUrl : auth?.user.photo} alt="avatar"/> 
                <Check className="photocheck"/> 
                </div>
                <br/>
                <label id="uploadbtn" htmlFor="update"
                >Upload Photo</label>
                   <input id="update" type="file" 
                    onChange={uploadPhoto} 
                    accept="image/x-png,image/gif,image/jpeg"
                   /> 

                {
                    photoError && <p className="error">{photoError}</p>
                }
                <br/>
                <div id="uname">
                    <input spellCheck={false} ref={inputRef} style={{color:theme.text, opacity: editname ? "1" : "0", zIndex: editname ? 1: -1}} id="nameedit" value={nameval} onChange={(e)=>setNameval(e.target.value)}/>
                    {
                       editname ?  <>
                       <Check id="check" onClick={nameChanged}/> 
                      </> 
                       : 
                       <>
                       <p>{nameval}</p>
                       <Pencil id="svg" onClick={
                           ()=>{ setEditname(true); 
                           inputRef.current?.focus();
                           } }/>
                       </>
                    }
                </div>
            </div> 
           <br/> 
           <br/>
            <div id="theme">
                <h3>Choose Theme</h3>
                <div id="themes">
                {
                    Object.keys(allTheme).map((key)=>{
                        //@ts-ignore
                        return <div key={key} onClick={()=>{setTheme(allTheme[key]); changeTheme(key)}} className={`themesquare ${chosenTheme === key.toLowerCase() ? "activeTheme" : ""}`} >
                            <div style={
                            { //@ts-ignore
                            backgroundColor: allTheme[key]["lightSquare"]}} 
                            className="light smallgrid">
                            </div>       
                            <div style={
                            { //@ts-ignore
                            backgroundColor: allTheme[key]["darkSquare"]}} 
                            className="dark smallgrid">
                            </div>       
                            <div style={
                            { //@ts-ignore
                            backgroundColor: allTheme[key]["darkSquare"]}} 
                            className="dark smallgrid">
                            </div>       
                            <div style={
                            { //@ts-ignore
                            backgroundColor: allTheme[key]["lightSquare"]}} 
                            className="light smallgrid">
                            </div>       
                            <div className="themetitle">
                            {
                                chosenTheme === key.toLowerCase() &&
                                <Check className="themecheck"/> 
                            }
                            <p id="themename">{
                                key === "natural" ? "Natural" :
                                key === "seaGreen" ? "Sea Green":
                                key === "redPink" ? "Red Pink" :
                                key === "blackandwhite" ? "Black White":
                                key === "skyBlue" ? "Sky Blue" :
                                "Violet"
                            }</p>
                            </div>
                        </div>
                    })
                }
                </div>
            </div>
            <button className="cbtn cancel" onClick={()=>history.push('/')}>Back</button>
        </div>
    </>
    ) 
}

export default Settings;