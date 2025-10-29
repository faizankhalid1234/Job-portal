import jwt from "jsonwebtoken";


const isAuthenticated =async (req, res, next) => {
try {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "user not authanticated", success: false })
    };
    const decoded = await jwt.verify(token, process.env.SECRET_KEY);
    if (!decoded) {
        return res.status(401).json({ message: "invalid token", success: false })
    };
    req.id=decode.userid
    next();
    
    


} catch (error) {
    console.log(error);

}
};
export default isAuthenticated;