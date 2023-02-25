const jwt = require('jsonwebtoken');
const { User } = require("../models/User");
const { FontData } = require("../models/FontData");
const { TableData } = require("../models/TableData");
const { DrawData } = require("../models/DrawData");
const { PostIts } = require("../models/PostIts");

const login = async (req, res) => {
    const {userId, password} = await req.body;
    const userInfo = await User.findOne({userId:userId, password:password})
    if(!userInfo) {
        res.status(403).json("Not Authorized");
    } else {
        try {
            // accessToken 발급
            const accessToken = jwt.sign({
                userId : userInfo.userId,
                nick: userInfo.nick
            }, process.env.ACCESS_SECRET, {
                expiresIn : "2h",
                issuer: "SM"
            });

            // refreshToken 발급
            const refreshToken = jwt.sign({
                userId : userInfo.userId,
                nick: userInfo.nick
            }, process.env.REFRESH_SECRET, {
                expiresIn : "24h",
                issuer: "SM"
            });

            // token 전송
            res.cookie("accessToken", accessToken, {
                secure : false,
                httpOnly : true
            })
            res.cookie("refreshToken", refreshToken, {
                secure : false,
                httpOnly : true
            })

            res.status(200).json({success: "Login Success"});

        } catch (error) {
            res.status(500).json(error);
        }
    }
}

const accessToken = async (req, res) => {
    
    try {

        const data = jwt.verify(req.cookies.acessToken, process.env.ACCESS_SECRET);
        const userData = await User.findOne({ userId:data.userId }).select('userId nick email roll')

        res.status(200).json(userData);

    } catch (error) {
        res.status(500).json(error);
    }

}

const refreshToken = async (req, res) => {
    // 용도 : accessToken을 갱신.
    try {

        const data = jwt.verify(req.cookies.refreshToken, process.env.REFRESH_SECRET);
        const userData = await User.findOne({ userId:data.userId })

    // accessToken 발급
        const accessToken = jwt.sign({
            userId : userData.userId,
            nick: userData.nick
        }, process.env.ACCESS_SECRET, {
            expiresIn : "2h",
            issuer: "SM"
        });

        // token 전송
        res.cookie("accessToken", accessToken, {
            secure : false,
            httpOnly : true
        })

        res.status(200).json({success: "Aceess Token Recreated"});


    } catch (error) {
        res.status(500).json(error);
    }
}


const loginSuccess = async (req, res) => {
    try {
        const data = jwt.verify(req.cookies.accessToken, process.env.ACCESS_SECRET);
        const userData = await User.findOne({ userId:data.userId }).select('userId nick roll')
        const tableData = await TableData.find({ userId:userData.userId })
        const fontData = await FontData.find({ userId:userData.userId })
        const drawData = await DrawData.find({ userId:userData.userId })
        const postIts = await PostIts.find({ userId:userData.userId })
        res.status(200).json({userData: userData, tableData: tableData, fontData: fontData, drawData: drawData, postIts: postIts});
        
    } catch (error) {
        res.status(500).json(error);
    }
}

const logout = (req, res) => {
    try {
        res.cookie('accessToken', '')
        res.status(200).json({success:"Logout Success"})
    } catch (error) {
        res.status(500).json(error)
    }
};


const signUp = async (req, res) => {

    const user = await new User(req.body);
    await user.save((err, userInfo)=>{
        if(err) return res.json({success: false, err})
        return res.status(200).json({success: true})
    })

}


const userIdCheck = (req, res) => {

    const { userId } = req.query;
    
    User.findOne({ userId: userId })
    .then((userInfo)=>{
        res.status(200).json(userInfo)
    })
    .catch((err)=>{
        res.status(403).json(err)
    })


}

const saveDB = (req, res) => {




}



module.exports = {
    login,
    accessToken,
    refreshToken,
    loginSuccess,
    logout,
    signUp,
    userIdCheck,
    saveDB
}