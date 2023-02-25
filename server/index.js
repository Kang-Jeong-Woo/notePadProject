const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const {
    login,
    accessToken,
    refreshToken,
    loginSuccess,
    logout,
    signUp,
    userIdCheck,
    saveDB
} = require('./controller/index')

const app = express();
dotenv.config();

// DB연결
mongoose.connect(process.env.MONGODB_URI).then(()=>console.log('MongoDB Connected...'))
.catch(err => console.log(err))


// 기본설정
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin : "http://localhost:3000",
    methods : ['GET', 'POST'],
    credentials : true
}))

// 로그인 라우터
app.post('/api/login', login);
app.get('/api/accesstoken', accessToken);
app.get('/api/refreshtoken', refreshToken);
app.get('/api/login/success', loginSuccess);
app.post('/api/logout', logout);

// 회원가입 라우터
app.post('/api/signup', signUp);
app.get('/api/signup/useridcheck', userIdCheck);

// DB저장 라우터
app.post('/api/savedb', saveDB)

app.listen(process.env.PORT, ()=>{
    console.log(`server is on ${process.env.PORT}`);
})