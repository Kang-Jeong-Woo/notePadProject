import classes from "./Login.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import DoddleBtn from "@/components/UI/DoddleBtn";

export default function Login() {

    const router = useRouter();
    
    const [mode, setMode] = useState("login");

    // 로그인 아이디, 비밀번호
    const [loginUserId, setLoginUserId] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    // 로그인 에러메시지 저장
    const [loginMessage, setLoginMessage] = useState('');

    // 회원가입 아이디, 비밀번호, 비밀번호 확인, 닉네임
    const [userId, setUserId] = useState();
    const [password, setPassword] = useState();
    const [ConfimPassword, setConfimPassword] = useState();
    const [nick, setNick] = useState();
    // 회원가입 에러메세지 저장
    const [userIdMessage, setUserIdMessage] = useState('')
    const [passwordMessage, setPasswordMessage] = useState('')
    const [nickMessage, setNickMessage] = useState('')
    // 회원가입 유효성 검사 상태저장
    const [isUserId, setIsUserId] = useState()
    const [isPassword, setIsPassword] = useState()
    const [isNick, setIsNick] = useState()

    // 로그인
    const login = () => {

        if(loginUserId === '' || loginPassword === '') {
            setLoginMessage("Please enter user-id or password.")
        } else {
            axios.post(
                "http://localhost:8123/api/login",
                { userId: loginUserId, password: loginPassword },
                { withCredentials: true }
            ).then((result) => {
                if (result.status === 200) {
                    // console.log(result.data)
                    router.push("/" + loginUserId)
                }
              })
            .catch((error)=>{
                // console.log(error)
                setLoginMessage("User-id or password do not match.")
            });
        }
    }
    // 회원가입
    const signUp = () => {
        axios.post(
            "http://localhost:8123/api/signup",
            { userId: userId, password: password, nick: nick },
            { withCredentials: true }
        ).then((result) => {
            if (result.status === 200) {
                // console.log(result.data)
                setMode("login")
            }
          })
        .catch((error)=>{
            // console.log(error)
            setLoginMessage("Server error : registration failed")
        });
    }
    // 회원가입 아이디 유효성검사
    const userIdCheck = () => {

        if(userId === "" || userId === undefined) {
            setIsUserId(false)
            setUserIdMessage("Please enter user-id.")
        } else if(userId.length < 2 || userId.length >= 10) {
            setIsUserId(false)
            setUserIdMessage("Please enter at least 2 and no more than 10.")
        } else {
            axios.get(
                "http://localhost:8123/api/signup/useridcheck",
                { params: { userId: userId } },
                { withCredentials: true }
            ).then((result) => {
                if (result.status === 200) {
                    // console.log(result.data)
                    if(result.data === null) {
                        setIsUserId(true)
                        setUserIdMessage("Not duplicate user-id.")
                    } else {
                        setIsUserId(false)
                        setUserIdMessage("Duplicate user-id.")
                    }
                }
              })
            .catch((error)=>{
                // console.log(error)
            });
        }
    }
    // 회원가입 패스워드 유효성검사
    const passwordCheck = () => {

        if(password === "" || password === undefined) {
            setIsPassword(false)
            setPasswordMessage('Please enter password.')
        } else if(password.length < 5 || password.length >= 20) {
            setIsPassword(false)
            setPasswordMessage("Please enter at least 5 and no more than 20.")
        } else {
            if(password === ConfimPassword) {
                setIsPassword(true)
                setPasswordMessage('password matches.')
            } else {
                setIsPassword(false)
                setPasswordMessage('password does not match.')
            }
        }
    }
    // 회원가입 닉네임 유효성검사
    const nickCheck = () => {
        if(nick === "" || nick === undefined) {
            setIsNick(false)
            setNickMessage('Please enter nick.')
        } else {
            setIsNick(true)
            setNickMessage('Nick available.')
        }
    }

    // 패스워드, 닉이 바뀔 때마다 유효성검사
    useEffect(()=>{
        if(ConfimPassword !== undefined || password !== undefined) {
            passwordCheck()
        }
    }, [password])

    useEffect(()=>{
        if(nick !== undefined) {
            nickCheck()
        }
    }, [nick])

    return(
        <div className={classes.Cntnr}>
            <div className={classes.form}>
                <div className={classes.logo}>
                    <Image src="/logo.jpg" alt="logo" width={120} height={80} style={{borderRadius:"20px"}}/>
                </div>
                { mode === 'login' ?
                    <>
                        <h2 className={classes.title}>Log-in</h2>
                        <div className={classes.label}>
                            <input className={classes.input} defaultValue={loginUserId} placeholder="Login Id" 
                                onChange={(e)=>{setLoginUserId(e.target.value)}}/>
                        </div>
                        <div className={classes.label}>
                            <input className={classes.input} type="password" defaultValue={loginPassword} placeholder="Login Password" 
                                onChange={(e)=>{setLoginPassword(e.target.value)}
                            } />
                            <p style={{color: "red"}}>
                                &nbsp;{ loginMessage }
                            </p> 
                        </div>
                        <div className={classes.label}>
                            <span className={classes.spanMode}>Don't have an account?</span>
                            <a onClick={()=>{
                                setMode('signup')
                                }}>Sign-up</a>
                            <DoddleBtn onClick={login}>Log-in</DoddleBtn>
                        </div>
                    </>
                    :
                    <>
                        <h2 className={classes.title}>Sign-up</h2>
                        <div className={classes.label}>
                            <input className={classes.inputId} defaultValue={userId} placeholder="Id" 
                                onChange={(e)=>{setUserId(e.target.value)}}/>
                            <span className={classes.checkBtn} onClick={userIdCheck}>Check</span>
                            <p style={{color: isUserId === true ? "blue" : "red"}}>
                                &nbsp;{userIdMessage}
                            </p> 
                        </div>
                        <div className={classes.label}>
                            <input className={classes.input} type="password" defaultValue={password} placeholder="Password" 
                                onChange={(e)=>{
                                    setPassword(e.target.value)
                                }} />
                            <p>&nbsp;</p>
                        </div>
                        <div className={classes.label}>
                            <input className={classes.input} type="password" defaultValue={ConfimPassword} placeholder="Confim Password" 
                                minLength={5} onChange={(e)=>{
                                    setConfimPassword(e.target.value)
                                    }} />
                            <p style={{color: isPassword === true ? "blue" : "red"}}>
                                &nbsp;{passwordMessage}
                            </p> 
                        </div>
                        <div className={classes.label}>
                            <input className={classes.input} defaultValue={nick} placeholder="Nick" maxLength={10}
                                onChange={(e)=>{setNick(e.target.value)}} />
                            <p style={{color: isNick === true ? "blue" : "red"}}>
                                &nbsp;{nickMessage}
                            </p>
                        </div>

                        <div className={classes.label}>
                            <span className={classes.spanMode}>Already have an account?</span><a onClick={()=>{setMode('login')}}>Log-in</a>
                            <DoddleBtn onClick={()=>{
                                if(isUserId && isPassword && isNick) {
                                    signUp()
                                } else {
                                    userIdCheck()
                                    passwordCheck()
                                    nickCheck()
                                }
                            }}>Sign-up</DoddleBtn>
                    </div>
                    </>
                    
                }
            </div>
        </div>
    )
}