export const seaGreen = {
    darkSquare: "#018a6c",
    lightSquare: "#bdeaf5",
    navColor: "#018a6c",
    subNavColor: "#018a6c3f",
    background: "#002019",
    text:"white",
    homenav: "#018a6c",
}

export const redPink = {
    darkSquare: "#e57373",
    lightSquare: "#ffebee",
    navColor: "red",
    subNavColor: "#e5737360",
    background: "#250000",
    text:"white",
    homenav: "red",
}

export const blackandwhite = {
    darkSquare: "#a0a0a0",
    lightSquare: "white",
    navColor: "white",
    subNavColor: "#black",
    background: "white",
    text:"black",
    homenav: "white",
}

export const skyBlue = {
    darkSquare: "#42a5f5",
    lightSquare: "#bbdefb",
    navColor: "#1976d2",
    subNavColor: "#1976d254",
    background: "#003663",
    text:"white",
    homenav: "#42a5f5",
    
}

export const natural = {
    darkSquare: "#0767a7",
    lightSquare: "white",
    navColor: "#0767a7",
    subNavColor: "#0767a7b7",
    background: "#12223a",
    text:"white",
    homenav: "#0767a7",
}

export const violet = {
    darkSquare: "#673ab7",
    lightSquare: "#d1c4e9",
    navColor: "#5e35b1",
    subNavColor: "#5e35b186",
    background: "#210750",
    text:"white",
    homenav: "#673ab7",
}

export const decideTheme = (theme: string) => {
   switch(theme){
    case 'natural': return natural;
    case 'seagreen': return seaGreen;
    case 'redpink' : return redPink;
    case 'blackandwhite': return blackandwhite;
    case 'skyblue': return skyBlue;
    case 'violet' : return violet;      
    default: return natural;
   } 
}

export const allTheme = {
   natural,
   seaGreen,
   redPink,
   blackandwhite,
   skyBlue,
   violet 
}


