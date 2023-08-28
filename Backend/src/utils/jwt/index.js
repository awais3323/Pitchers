import jwt from "jsonwebtoken"

function getJWT(id, username) {

    return jwt.sign({ id: id, username: username }, "thisisjustrf", {
        expiresIn: "5d",
    });
}
// };
export const sendToken = (res, user,statusCode)=>{
    const token = getJWT(user.id, user.username)

    const options ={
        expires:new Date(
            Date.now() + 5 + 24 *60 *60*1000
        ),
        httpOnly:true
    }
    res.status(statusCode).cookie('token',token,options)
}
