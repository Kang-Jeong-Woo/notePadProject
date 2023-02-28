const express = require('express');
const expressSanitizer = require("express-sanitizer");
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const mongoose = require('mongoose');
const https = require("https");

const options = {
    key: fs.readFileSync("./config/cert.key"),
    cert: fs.readFileSync("./config/cert.crt"),
};

const {
    login,
    accessToken,
    refreshToken,
    loginSuccess,
    logout,
    signUp,
    userIdCheck,
    saveDB,
    saveImg,
    deleteImg
} = require('./controller/index');
const app = express();
dotenv.config();

// DB연결
mongoose.connect(process.env.MONGODB_URI).then(()=>console.log('MongoDB Connected...'))
    .catch(err => console.log(err))

// 기본설정
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use("/", express.static("public"));
app.use(cors({
    origin : "https://da-g-gu.vercel.app",
    methods : ['GET', 'POST'],
    credentials : true
}))

// multer 기본설정
const upload = multer({
    storage: multer.diskStorage({ // 저장한공간 정보 : 하드디스크에 저장
        destination(req, file, cb) { // 저장 위치

            const userId = file.originalname.split('-')[0]

            // 유저 이미지폴더 확인
            if(!fs.existsSync(`../client/public/${userId}`)) {
                console.log(`${userId} 폴더가 없습니다. 폴더를 생성합니다.`);
                fs.mkdirSync(`../client/public/${userId}`); // 폴더 생성
            }

            cb(null, `../client/public/${userId}`); // public/[userId] 폴더 안에 저장
        },
        filename(req, file, cb) { // 파일명을 어떤 이름으로 올릴지
            cb(null, file.originalname);
        }
    }),
    limits: { fileSize: 5 * 1024 * 1024 } // 5메가로 용량 제한
});

// 로그인 라우터
app.post('/api/login', login);
app.get('/api/accesstoken', accessToken);
app.get('/api/refreshtoken', refreshToken);
app.get('/api/login/success', loginSuccess);
app.post('/api/logout', logout);

// 회원가입 라우터
app.post('/api/signup', signUp);
app.get('/api/signup/useridcheck', userIdCheck);

// DB 라우터
app.post('/api/savedb', saveDB);
app.post('/api/saveImg', upload.single('image'), saveImg);
app.post('/api/deleteimg', deleteImg)

// 호스트 번호 설정
const host = '127.0.0.1'
// https 서버 실행
https.createServer(options, app).listen(8123, host, () => {
    console.log(`HTTPS server started on port 8123`);
  });