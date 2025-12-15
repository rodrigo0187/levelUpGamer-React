export function useLogout(){
    const logout = () =>{
        localStorage.removeItem("token");
    };
    return {logout};
}