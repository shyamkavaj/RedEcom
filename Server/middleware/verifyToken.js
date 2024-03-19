const { verify } = require("jsonwebtoken");

const checkToken = (req, res, next) => {
    const token = req.get("authorization");
    if (token) {
        
        // remove the bearer from the token
        const slicedToken = token.slice(7);
        // this verify the slicedToken which is generated at login time using secret key 
        // if it's okay than flow will move into the router. 
        verify(slicedToken, "Random String", (error, decoded) => {
            if (error) {
                console.log(error);   
                res.json({
                    success: 0,
                    msg: "Invalid Token"
                });          
            } else {
                // If verification is successful, you can attach the decoded payload to the request
                req.decoded = decoded;
                next();
            }
        });
    } else {
        res.json({
            success: 0,
            msg: "Access denied! Unauthorized user"
        });
    }
};

module.exports = checkToken;