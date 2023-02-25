const jwt = require('jsonwebtoken');
const { User } = require("../models/User");
const { FontData } = require("../models/FontData");
const { TableData } = require("../models/TableData");
const { DrawData } = require("../models/DrawData");
const { PostIts } = require("../models/PostIts");
const mongoose = require("mongoose")

const { ObjectId } = mongoose.Types;


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
        // 토큰 데이터 검증
        const data = jwt.verify(req.cookies.accessToken, process.env.ACCESS_SECRET);
        // 검증 성공 시 데이터 전달
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
        // 엑세스쿠키 초기화
        res.cookie('accessToken', '')
        res.status(200).json({success:"Logout Success"})
    } catch (error) {
        res.status(500).json(error)
    }
};


const signUp = async (req, res) => {

    // 유저 데이터 생성
    const user = await new User(req.body);
    await user.save((err, userInfo)=>{
        if(err) return res.json({success: false, err})
        return res.status(200).json({success: true})
    })

}


const userIdCheck = (req, res) => {

    // 쿼리스트링에서 usrId 데이터 확인
    const { userId } = req.query;
    
    // 아이디 중복 확인
    User.findOne({ userId: userId })
    .then((userInfo)=>{
        res.status(200).json(userInfo)
    })
    .catch((err)=>{
        res.status(403).json(err)
    })

}

const saveDB = async (req, res) => {

    // 바디에서 테이블, 폰트, 드로우, 포스트잇 데이터 확인
    const tableData = req.body.tableData;
    const fontData = req.body.fontData;
    const drawData = req.body.drawData;

    try {

        // 테이블 데이터 저장
        for(let i=0; i<tableData.length; i++) {

            // 삭제
            if(tableData[i].isDelete) {
                await TableData.deleteOne({ _id: new ObjectId(tableData[i].id) })
            // 업데이트
            } else if(ObjectId.isValid(tableData[i]._id)) {
                await TableData.updateOne({_id: new ObjectId(tableData[i].id)}, {$set : tableData[i]})
            // 신규생성
            } else {
                const NewTableData = await new TableData(tableData[i]);
                await NewTableData.save()
            }  

        }

        // 폰트 데이터 저장
        for(let i=0; i<fontData.length; i++) {

            // 삭제
            if(fontData[i].isDelete) {
                await FontData.deleteOne({ _id: new ObjectId(fontData[i].id) })
            // 업데이트
            } else if(ObjectId.isValid(tableData[i]._id)) {
                await FontData.updateOne({_id: new ObjectId(fontData[i].id)}, {$set : fontData[i]})
            // 신규생성
            } else {
                const NewFontData = await new FontData(fontData[i]);
                await NewFontData.save()
            }  

        }

        // 드로우 데이터 저장
        for(let i=0; i<drawData.length; i++) {
            // 업데이트
            if(ObjectId.isValid(drawData[i]._id)) {
                await DrawData.updateOne({_id: new ObjectId(drawData[i]._id)}, {$set : drawData[i]})
            // 신규생성
            } else {
                const NewDrawData = await new DrawData(drawData[i]);
                await NewDrawData.save()
            }

        }

        res.status(200).json({success: true, message: 'update success'})
       
    } catch (error) {

        res.status(403).json({success: false, error})

    }
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