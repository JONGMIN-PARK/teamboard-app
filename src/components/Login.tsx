import { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  const handleAuth = async () => {
    try {
      if (isSignUp)
        await createUserWithEmailAndPassword(auth, email, pw);
      else
        await signInWithEmailAndPassword(auth, email, pw);
      alert("✅ 로그인 성공");
    } catch (e: any) {
      alert("❌ 오류: " + e.message);
    }
  };

  return (
    <div>
      <h2>{isSignUp ? "회원가입" : "로그인"}</h2>
      <input placeholder="이메일" onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="비밀번호" type="password" onChange={(e) => setPw(e.target.value)} />
      <button onClick={handleAuth}>{isSignUp ? "가입하기" : "로그인"}</button>
      <p style={{ cursor: "pointer", color: "blue" }} onClick={() => setIsSignUp(!isSignUp)}>
        {isSignUp ? "이미 계정이 있나요?" : "계정이 없나요? 가입하기"}
      </p>
    </div>
  );
}
