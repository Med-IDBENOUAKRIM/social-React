export const checkLogin = () => {
    const access = localStorage.getItem('jwt_info');
    if(access) {
        return JSON.parse(access);
    }
    return false;
}