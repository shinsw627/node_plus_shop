const jwt = require("jsonwebtoken");
const User = require("../models/user")


module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    const [toKenType, tokenValue] = authorization.split(' ');
    console.log(tokenValue)

    if (toKenType !== 'Bearer'){
        res.status(401).send({
            errorMessage: '로그인 후 사용하세요',
        })
        return;
    }

    try {
        const { userId } = jwt.verify(tokenValue, "my-secret-key");

        User.findById(userId).then((user)=> {
            res.locals.user = user;
            next();
        });
        
    } catch (error) {
        res.status(401).send({
            errorMessage: "로그인 후 사용하세요",
        })
        return
    }

}