export default function authHeader() {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(">>>>>Auth Header", user);
    if (user && user.accessToken) {
        // return { Authorization: 'Bearer ' + user.accessToken } //for springboot
        return {'x-access-token' : user.accessToken} //for ExpressJS - NodeJS
    }
    else {
        return false;
    }
}