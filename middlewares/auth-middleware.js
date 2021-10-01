const jwt = require("jsonwebtoken");
const { User } = require("../models");


module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    const [toKenType, tokenValue] = authorization.split(' ');
    

    if (toKenType !== 'Bearer'){
        res.status(401).send({
            errorMessage: '로그인 후 사용하세요',
        })
        return;
    }

    try {
        const { userId } = jwt.verify(tokenValue, "my-secret-key");

        User.findByPk(userId)           //findByPk 프라이머리 키로 찾는다.
        .then((user)=> {
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