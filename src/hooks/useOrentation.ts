interface User {
    username: string;
    avatar: string;
    computer: boolean;
    color: string;
}
const useOrentation = (orentation: string, blackUser: User, whiteUser: User) => {

    return orentation === "white" ? 
    [blackUser, whiteUser]:
    [whiteUser, blackUser]
    
}

export default useOrentation;