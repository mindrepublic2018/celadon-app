import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";

const SCREENS = { SPLASH:"splash", LOGIN:"login", SIGNUP:"signup", RESET_PW:"reset_pw", HOME:"home", UPLOAD:"upload", RESULT:"result", LEADERBOARD:"leaderboard", MYPAGE:"mypage", EVENT:"event", CERTIFICATE:"certificate", MEMBERS:"members" };

function useCountUp(target, duration=1500, start=false) {
  const [value, setValue] = useState(0);
  useEffect(() => { if(!start) return; let st=null; const step=(ts)=>{ if(!st) st=ts; const p=Math.min((ts-st)/duration,1); setValue(Math.floor(p*target)); if(p<1) requestAnimationFrame(step); }; requestAnimationFrame(step); }, [target,duration,start]);
  return value;
}

const inputStyle = { width:"100%", padding:"14px 16px", borderRadius:12, border:"1px solid rgba(172,225,175,0.12)", background:"rgba(255,255,255,0.03)", color:"#fff", fontSize:13, fontFamily:"'Noto Sans KR', sans-serif", outline:"none", transition:"border-color 0.2s ease" };
const inputFocusColor = "rgba(172,225,175,0.3)";
const labelStyle = { fontSize:11, color:"rgba(172,225,175,0.5)", fontFamily:"'Space Mono', monospace", letterSpacing:1, marginBottom:6, display:"block" };

function SplashScreen({ onFinish }) {
  const [phase, setPhase] = useState(0);
  useEffect(() => { setTimeout(()=>setPhase(1),300); setTimeout(()=>setPhase(2),1000); setTimeout(()=>setPhase(3),1800); setTimeout(()=>onFinish(),2800); }, []);
  return (
    <div style={{ height:"100%", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", background:"linear-gradient(160deg, #0a0a0a 0%, #0a1f15 40%, #122a1e 100%)", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", inset:0, opacity:0.03 }}>{Array.from({length:6}).map((_,i)=>(<div key={i} style={{ position:"absolute", width:200+i*60, height:200+i*60, borderRadius:"50%", border:"1px solid #ACE1AF", top:"50%", left:"50%", transform:"translate(-50%,-50%)", animation:`pulseRing ${2+i*0.3}s ease-out ${i*0.2}s infinite` }}/>))}</div>
      <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:"linear-gradient(90deg, transparent, #ACE1AF, transparent)", opacity:phase>=1?1:0, transition:"opacity 1s ease" }}/>
      <div style={{ opacity:phase>=1?1:0, transform:phase>=1?"translateY(0) scale(1)":"translateY(20px) scale(0.95)", transition:"all 0.8s cubic-bezier(0.16,1,0.3,1)", textAlign:"center" }}>
        <div style={{ fontSize:13, fontFamily:"'Cormorant Garamond', serif", fontWeight:300, color:"rgba(172,225,175,0.5)", letterSpacing:8, textTransform:"uppercase", marginBottom:8 }}>RUN FOR HOPE</div>
        <div style={{ fontSize:52, fontFamily:"'Cormorant Garamond', serif", fontWeight:600, color:"#ACE1AF", letterSpacing:4, textShadow:"0 0 60px rgba(172,225,175,0.15)" }}>CELADON</div>
        <div style={{ fontSize:12, fontFamily:"'Cormorant Garamond', serif", fontWeight:300, color:"rgba(172,225,175,0.4)", letterSpacing:6, marginTop:2 }}>셀라돈</div>
      </div>
      <div style={{ opacity:phase>=2?1:0, transition:"opacity 0.8s ease", marginTop:32, textAlign:"center" }}>
        <div style={{ fontSize:11, color:"rgba(255,255,255,0.3)", letterSpacing:1, lineHeight:1.8 }}>중동 난민을 위한 기부런</div>
        <div style={{ fontSize:10, color:"rgba(172,225,175,0.3)", fontFamily:"'Space Mono', monospace", letterSpacing:3, marginTop:8 }}>1KM = 500원의 희망</div>
      </div>
      <div style={{ position:"absolute", bottom:80, width:120, height:1.5, background:"rgba(255,255,255,0.06)", borderRadius:2, overflow:"hidden", opacity:phase>=3?0:phase>=2?1:0, transition:"opacity 0.5s ease" }}>
        <div style={{ height:"100%", background:"#ACE1AF", borderRadius:2, width:phase>=2?"100%":"0%", transition:"width 1s ease" }}/>
      </div>
    </div>
  );
}

function LoginScreen({ setScreen, onLogin }) {
  const [animate, setAnimate] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [focusedField, setFocusedField] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => { setTimeout(()=>setAnimate(true),100); }, []);

  const handleLogin = async () => {
    if(!email||!password) return;
    setLoading(true); setError("");
    const { data, error: ae } = await supabase.auth.signInWithPassword({ email, password });
    if(ae) { setError(ae.message==="Invalid login credentials"?"이메일 또는 비밀번호가 올바르지 않습니다":ae.message); setLoading(false); return; }
    onLogin(data.user);
  };

  return (
    <div style={{ height:"100%", overflowY:"auto", background:"linear-gradient(180deg, #0a0a0a 0%, #0d1a12 100%)", display:"flex", flexDirection:"column" }}>
      <div style={{ padding:"60px 24px 32px", textAlign:"center", opacity:animate?1:0, transform:animate?"translateY(0)":"translateY(20px)", transition:"all 0.6s cubic-bezier(0.16,1,0.3,1)" }}>
        <div style={{ fontSize:13, fontFamily:"'Cormorant Garamond', serif", fontStyle:"italic", color:"rgba(172,225,175,0.4)", letterSpacing:4, marginBottom:4 }}>Celadon Donation Running</div>
        <div style={{ fontSize:36, fontFamily:"'Cormorant Garamond', serif", fontWeight:600, color:"#ACE1AF", letterSpacing:3 }}>CELADON</div>
        <div style={{ fontSize:11, color:"rgba(255,255,255,0.25)", marginTop:12, lineHeight:1.6 }}>이유 있는 러닝, 셀라돈에 오신 것을 환영합니다</div>
      </div>
      <div style={{ flex:1, padding:"0 24px", opacity:animate?1:0, transform:animate?"translateY(0)":"translateY(20px)", transition:"all 0.6s cubic-bezier(0.16,1,0.3,1) 0.15s" }}>
        {error && <div style={{ padding:"10px 14px", borderRadius:10, background:"rgba(255,100,100,0.08)", border:"1px solid rgba(255,100,100,0.15)", marginBottom:16 }}><div style={{ fontSize:12, color:"rgba(255,100,100,0.8)" }}>{error}</div></div>}
        <div style={{ marginBottom:16 }}>
          <label style={labelStyle}>이메일</label>
          <input type="email" placeholder="email@example.com" value={email} onChange={e=>setEmail(e.target.value)} onFocus={()=>setFocusedField("email")} onBlur={()=>setFocusedField(null)} onKeyDown={e=>e.key==="Enter"&&handleLogin()} style={{ ...inputStyle, borderColor:focusedField==="email"?inputFocusColor:"rgba(172,225,175,0.12)" }}/>
        </div>
        <div style={{ marginBottom:24 }}>
          <label style={labelStyle}>비밀번호</label>
          <input type="password" placeholder="비밀번호 입력" value={password} onChange={e=>setPassword(e.target.value)} onFocus={()=>setFocusedField("pw")} onBlur={()=>setFocusedField(null)} onKeyDown={e=>e.key==="Enter"&&handleLogin()} style={{ ...inputStyle, borderColor:focusedField==="pw"?inputFocusColor:"rgba(172,225,175,0.12)" }}/>
        </div>
        <button onClick={handleLogin} disabled={loading} style={{ width:"100%", padding:"16px", borderRadius:14, border:"none", cursor:loading?"wait":"pointer", background:(email&&password)?"linear-gradient(135deg, #ACE1AF, #8FBC8F)":"rgba(172,225,175,0.1)", fontSize:15, fontWeight:700, color:(email&&password)?"#0a0a0a":"rgba(172,225,175,0.3)", transition:"all 0.3s ease", opacity:loading?0.7:1 }}>
          {loading?"로그인 중...":"로그인"}
        </button>
        <div style={{ display:"flex", alignItems:"center", margin:"28px 0", gap:16 }}><div style={{ flex:1, height:1, background:"rgba(255,255,255,0.06)" }}/><span style={{ fontSize:10, color:"rgba(255,255,255,0.2)", fontFamily:"'Space Mono', monospace" }}>OR</span><div style={{ flex:1, height:1, background:"rgba(255,255,255,0.06)" }}/></div>
        <div style={{ display:"flex", gap:10 }}>
          <button style={{ flex:1, padding:"14px", borderRadius:12, cursor:"pointer", background:"#FEE500", border:"none", fontSize:13, fontWeight:600, color:"#3C1E1E", display:"flex", alignItems:"center", justifyContent:"center", gap:8, opacity:0.5 }}><span style={{ fontSize:18 }}>💬</span> 카카오 (준비중)</button>
          <button style={{ flex:1, padding:"14px", borderRadius:12, cursor:"pointer", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.08)", fontSize:13, fontWeight:600, color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", gap:8, opacity:0.5 }}><span style={{ fontSize:16 }}>G</span> Google (준비중)</button>
        </div>
        <div style={{ textAlign:"center", marginTop:28 }}>
          <button onClick={()=>setScreen(SCREENS.RESET_PW)} style={{ background:"none", border:"none", cursor:"pointer", color:"rgba(255,255,255,0.25)", fontSize:12, marginBottom:12, display:"block", width:"100%" }}>비밀번호를 잊으셨나요?</button>
          <div style={{ fontSize:12, color:"rgba(255,255,255,0.3)" }}>아직 회원이 아니신가요?{" "}<button onClick={()=>setScreen(SCREENS.SIGNUP)} style={{ background:"none", border:"none", cursor:"pointer", color:"#ACE1AF", fontSize:12, fontWeight:600, textDecoration:"underline", textUnderlineOffset:3 }}>회원가입</button></div>
        </div>
      </div>
      <div style={{ padding:"20px 24px 32px", textAlign:"center" }}><div style={{ fontSize:9, color:"rgba(255,255,255,0.15)", fontFamily:"'Space Mono', monospace", letterSpacing:2 }}>🕊️ RUN FOR HOPE · 1KM = 500원</div></div>
    </div>
  );
}

function ResetPasswordScreen({ setScreen }) {
  const [animate, setAnimate] = useState(false);
  const [email, setEmail] = useState("");
  const [focusedField, setFocusedField] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => { setTimeout(()=>setAnimate(true),100); }, []);

  const handleReset = async () => {
    if(!email) { setError("이메일을 입력해주세요"); return; }
    if(!/\S+@\S+\.\S+/.test(email)) { setError("올바른 이메일 형식이 아닙니다"); return; }
    setLoading(true); setError("");
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + '/?reset=true',
    });
    if(resetError) { setError(resetError.message); setLoading(false); return; }
    setSent(true); setLoading(false);
  };

  if(sent) {
    return (
      <div style={{ height:"100%", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", background:"linear-gradient(180deg, #0a0a0a 0%, #0d1a12 100%)", padding:"0 24px", textAlign:"center" }}>
        <div style={{ width:80, height:80, borderRadius:"50%", background:"rgba(172,225,175,0.1)", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:24 }}><span style={{ fontSize:36 }}>✉️</span></div>
        <div style={{ fontSize:20, fontFamily:"'Cormorant Garamond', serif", fontWeight:600, color:"#ACE1AF", marginBottom:12 }}>이메일을 확인해주세요</div>
        <div style={{ fontSize:13, color:"rgba(255,255,255,0.4)", lineHeight:1.8, marginBottom:8 }}>{email}</div>
        <div style={{ fontSize:12, color:"rgba(255,255,255,0.3)", lineHeight:1.8, marginBottom:32 }}>비밀번호 재설정 링크를 보냈습니다.<br/>이메일의 링크를 클릭해서 새 비밀번호를 설정하세요.</div>
        <button onClick={()=>setScreen(SCREENS.LOGIN)} style={{ padding:"14px 36px", borderRadius:14, border:"none", cursor:"pointer", background:"linear-gradient(135deg, #ACE1AF, #8FBC8F)", fontSize:14, fontWeight:700, color:"#0a0a0a" }}>로그인으로 돌아가기</button>
        <div style={{ fontSize:10, color:"rgba(255,255,255,0.2)", marginTop:20 }}>이메일이 안 오면 스팸함을 확인해주세요</div>
      </div>
    );
  }

  return (
    <div style={{ height:"100%", overflowY:"auto", background:"linear-gradient(180deg, #0a0a0a 0%, #0d1a12 100%)", display:"flex", flexDirection:"column" }}>
      <div style={{ padding:"50px 24px 8px", display:"flex", alignItems:"center", gap:12 }}>
        <button onClick={()=>setScreen(SCREENS.LOGIN)} style={{ background:"none", border:"none", cursor:"pointer", color:"rgba(255,255,255,0.4)", fontSize:20, padding:"4px 8px" }}>←</button>
        <div><div style={{ color:"rgba(172,225,175,0.4)", fontSize:10, fontFamily:"'Space Mono', monospace", letterSpacing:3 }}>RESET PASSWORD</div><div style={{ color:"#fff", fontSize:18, fontFamily:"'Cormorant Garamond', serif", fontWeight:600, marginTop:2, letterSpacing:1 }}>비밀번호 재설정</div></div>
      </div>
      <div style={{ flex:1, padding:"32px 24px", opacity:animate?1:0, transform:animate?"translateY(0)":"translateY(16px)", transition:"all 0.5s cubic-bezier(0.16,1,0.3,1)" }}>
        <div style={{ fontSize:13, color:"rgba(255,255,255,0.4)", lineHeight:1.8, marginBottom:28 }}>가입할 때 사용한 이메일을 입력하시면<br/>비밀번호 재설정 링크를 보내드립니다.</div>
        {error && <div style={{ padding:"10px 14px", borderRadius:10, background:"rgba(255,100,100,0.08)", border:"1px solid rgba(255,100,100,0.15)", marginBottom:16 }}><div style={{ fontSize:12, color:"rgba(255,100,100,0.8)" }}>{error}</div></div>}
        <div style={{ marginBottom:20 }}>
          <label style={labelStyle}>이메일</label>
          <input type="email" placeholder="email@example.com" value={email} onChange={e=>{setEmail(e.target.value);setError("");}} onFocus={()=>setFocusedField("email")} onBlur={()=>setFocusedField(null)} onKeyDown={e=>e.key==="Enter"&&handleReset()} style={{ ...inputStyle, borderColor:focusedField==="email"?inputFocusColor:"rgba(172,225,175,0.12)" }}/>
        </div>
        <button onClick={handleReset} disabled={loading} style={{ width:"100%", padding:"16px", borderRadius:14, border:"none", cursor:loading?"wait":"pointer", background:email?"linear-gradient(135deg, #ACE1AF, #8FBC8F)":"rgba(172,225,175,0.1)", fontSize:15, fontWeight:700, color:email?"#0a0a0a":"rgba(172,225,175,0.3)", transition:"all 0.3s ease", opacity:loading?0.7:1 }}>
          {loading?"전송 중...":"재설정 링크 보내기"}
        </button>
      </div>
    </div>
  );
}

function SignupScreen({ setScreen, onLogin }) {
  const [animate, setAnimate] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ email:"", password:"", passwordConfirm:"", name:"", fullName:"", birthday:"", phone:"", affiliation:"", instagram:"" });
  const [errors, setErrors] = useState({});
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [globalError, setGlobalError] = useState("");
  useEffect(() => { setTimeout(()=>setAnimate(true),100); }, []);

  const updateForm = (key,val) => { setForm(p=>({...p,[key]:val})); if(errors[key]) setErrors(p=>({...p,[key]:null})); };
  const validateStep1 = () => { const e={}; if(!form.email) e.email="이메일을 입력해주세요"; else if(!/\S+@\S+\.\S+/.test(form.email)) e.email="올바른 이메일 형식이 아닙니다"; if(!form.password) e.password="비밀번호를 입력해주세요"; else if(form.password.length<8) e.password="8자 이상 입력해주세요"; if(form.password!==form.passwordConfirm) e.passwordConfirm="비밀번호가 일치하지 않습니다"; setErrors(e); return Object.keys(e).length===0; };
  const validateStep2 = () => { const e={}; if(!form.name) e.name="이름을 입력해주세요"; if(!form.fullName) e.fullName="성함을 입력해주세요"; if(!form.birthday) e.birthday="생년월일을 입력해주세요"; if(!form.phone) e.phone="연락처를 입력해주세요"; if(!form.affiliation) e.affiliation="소속을 입력해주세요"; if(!form.instagram) e.instagram="인스타 아이디를 입력해주세요"; if(!agreed) e.agreed="약관에 동의해주세요"; setErrors(e); return Object.keys(e).length===0; };
  const handleNext = () => { if(validateStep1()) { setStep(2); setAnimate(false); setTimeout(()=>setAnimate(true),50); } };

  const handleSignup = async () => {
    if(!validateStep2()) return;
    setLoading(true); setGlobalError("");
    const { data, error: ae } = await supabase.auth.signUp({ email:form.email, password:form.password, options:{ data:{ name:form.name, full_name:form.fullName } } });
    if(ae) { setGlobalError(ae.message.includes("already registered")?"이미 가입된 이메일입니다":ae.message); setLoading(false); return; }
    if(data.user) {
      await supabase.from('profiles').update({ name:form.name, full_name:form.fullName, birthday:form.birthday, phone:form.phone, affiliation:form.affiliation, instagram:form.instagram }).eq('id', data.user.id);
      onLogin(data.user);
    }
  };

  const renderInput = (key,label,placeholder,type="text",extra={}) => (
    <div style={{ marginBottom:14 }}>
      <label style={labelStyle}>{label} <span style={{ color:"rgba(255,100,100,0.5)" }}>*</span></label>
      <input type={type} placeholder={placeholder} value={form[key]} onChange={e=>updateForm(key,e.target.value)} onFocus={()=>setFocusedField(key)} onBlur={()=>setFocusedField(null)} style={{ ...inputStyle, borderColor:errors[key]?"rgba(255,100,100,0.4)":focusedField===key?inputFocusColor:"rgba(172,225,175,0.12)", ...extra }}/>
      {errors[key] && <div style={{ fontSize:10, color:"rgba(255,100,100,0.6)", marginTop:4, paddingLeft:4 }}>{errors[key]}</div>}
    </div>
  );

  return (
    <div style={{ height:"100%", overflowY:"auto", background:"linear-gradient(180deg, #0a0a0a 0%, #0d1a12 100%)", display:"flex", flexDirection:"column" }}>
      <div style={{ padding:"50px 24px 8px", display:"flex", alignItems:"center", gap:12 }}>
        <button onClick={()=>step===1?setScreen(SCREENS.LOGIN):setStep(1)} style={{ background:"none", border:"none", cursor:"pointer", color:"rgba(255,255,255,0.4)", fontSize:20, padding:"4px 8px" }}>←</button>
        <div><div style={{ color:"rgba(172,225,175,0.4)", fontSize:10, fontFamily:"'Space Mono', monospace", letterSpacing:3 }}>SIGN UP</div><div style={{ color:"#fff", fontSize:18, fontFamily:"'Cormorant Garamond', serif", fontWeight:600, marginTop:2, letterSpacing:1 }}>회원가입</div></div>
      </div>
      <div style={{ padding:"12px 24px 20px", display:"flex", gap:8 }}>
        <div style={{ flex:1, height:3, borderRadius:2, background:"#ACE1AF", transition:"background 0.3s" }}/>
        <div style={{ flex:1, height:3, borderRadius:2, background:step>=2?"#ACE1AF":"rgba(255,255,255,0.06)", transition:"background 0.3s" }}/>
      </div>
      <div style={{ flex:1, padding:"0 24px", paddingBottom:100, opacity:animate?1:0, transform:animate?"translateY(0)":"translateY(16px)", transition:"all 0.5s cubic-bezier(0.16,1,0.3,1)" }}>
        {globalError && <div style={{ padding:"10px 14px", borderRadius:10, background:"rgba(255,100,100,0.08)", border:"1px solid rgba(255,100,100,0.15)", marginBottom:16 }}><div style={{ fontSize:12, color:"rgba(255,100,100,0.8)" }}>{globalError}</div></div>}
        {step===1 ? (<>
          <div style={{ fontSize:14, color:"#ACE1AF", fontWeight:600, marginBottom:4 }}>계정 정보</div>
          <div style={{ fontSize:11, color:"rgba(255,255,255,0.25)", marginBottom:20 }}>로그인에 사용할 이메일과 비밀번호를 설정해주세요</div>
          {renderInput("email","이메일","email@example.com","email")}
          {renderInput("password","비밀번호","8자 이상 입력","password")}
          {renderInput("passwordConfirm","비밀번호 확인","비밀번호를 다시 입력해주세요","password")}
          <button onClick={handleNext} style={{ width:"100%", padding:"16px", borderRadius:14, border:"none", cursor:"pointer", background:"linear-gradient(135deg, #ACE1AF, #8FBC8F)", fontSize:15, fontWeight:700, color:"#0a0a0a", marginTop:8 }}>다음 단계 →</button>
        </>) : (<>
          <div style={{ fontSize:14, color:"#ACE1AF", fontWeight:600, marginBottom:4 }}>러너 정보</div>
          <div style={{ fontSize:11, color:"rgba(255,255,255,0.25)", marginBottom:20 }}>셀라돈 기부런에 필요한 정보를 입력해주세요</div>
          {renderInput("name","이름 (닉네임)","러닝 시 사용할 이름")}
          {renderInput("fullName","성함 (실명)","기부증서에 표기될 이름")}
          <div style={{ display:"flex", gap:10 }}><div style={{ flex:1 }}>{renderInput("birthday","생년월일","YYYY.MM.DD")}</div><div style={{ flex:1 }}>{renderInput("phone","연락처","010-0000-0000","tel")}</div></div>
          {renderInput("affiliation","소속","러닝크루, 회사, 단체 등")}
          <div style={{ marginBottom:14 }}>
            <label style={labelStyle}>인스타그램 <span style={{ color:"rgba(255,100,100,0.5)" }}>*</span></label>
            <div style={{ position:"relative" }}><span style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", color:"rgba(172,225,175,0.3)", fontSize:13, fontFamily:"'Space Mono', monospace" }}>@</span><input type="text" placeholder="instagram_id" value={form.instagram} onChange={e=>updateForm("instagram",e.target.value)} onFocus={()=>setFocusedField("instagram")} onBlur={()=>setFocusedField(null)} style={{ ...inputStyle, paddingLeft:32, borderColor:errors.instagram?"rgba(255,100,100,0.4)":focusedField==="instagram"?inputFocusColor:"rgba(172,225,175,0.12)" }}/></div>
            {errors.instagram && <div style={{ fontSize:10, color:"rgba(255,100,100,0.6)", marginTop:4, paddingLeft:4 }}>{errors.instagram}</div>}
          </div>
          <div onClick={()=>{setAgreed(!agreed);if(errors.agreed)setErrors(p=>({...p,agreed:null}));}} style={{ display:"flex", alignItems:"center", gap:10, padding:"14px 0", cursor:"pointer", marginBottom:16 }}>
            <div style={{ width:20, height:20, borderRadius:6, border:errors.agreed?"1.5px solid rgba(255,100,100,0.4)":agreed?"1.5px solid #ACE1AF":"1.5px solid rgba(255,255,255,0.1)", background:agreed?"rgba(172,225,175,0.15)":"transparent", display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.2s ease", fontSize:12, color:"#ACE1AF" }}>{agreed&&"✓"}</div>
            <span style={{ fontSize:12, color:"rgba(255,255,255,0.4)" }}>개인정보 수집 및 이용에 동의합니다</span>
          </div>
          {errors.agreed && <div style={{ fontSize:10, color:"rgba(255,100,100,0.6)", marginTop:-12, marginBottom:12, paddingLeft:30 }}>{errors.agreed}</div>}
          <button onClick={handleSignup} disabled={loading} style={{ width:"100%", padding:"16px", borderRadius:14, border:"none", cursor:loading?"wait":"pointer", background:"linear-gradient(135deg, #ACE1AF, #8FBC8F)", fontSize:15, fontWeight:700, color:"#0a0a0a", marginTop:8, opacity:loading?0.7:1 }}>{loading?"가입 중...":"가입 완료 →"}</button>
        </>)}
      </div>
    </div>
  );
}

function NavBar({ screen, setScreen }) {
  const items = [{ id:SCREENS.HOME, icon:"⌂", label:"홈" },{ id:SCREENS.UPLOAD, icon:"◎", label:"인증" },{ id:SCREENS.LEADERBOARD, icon:"◆", label:"랭킹" },{ id:SCREENS.EVENT, icon:"★", label:"리워드" },{ id:SCREENS.MYPAGE, icon:"●", label:"MY" }];
  return (<div style={{ display:"flex", justifyContent:"space-around", alignItems:"center", padding:"12px 0 22px", borderTop:"1px solid rgba(172,225,175,0.06)", background:"rgba(10,10,10,0.97)", backdropFilter:"blur(20px)", position:"absolute", bottom:0, left:0, right:0 }}>{items.map(item=>(<button key={item.id} onClick={()=>setScreen(item.id)} style={{ background:"none", border:"none", cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:4, color:screen===item.id?"#ACE1AF":"rgba(255,255,255,0.25)", transition:"color 0.2s ease", minWidth:48 }}><span style={{ fontSize:18, fontFamily:"serif" }}>{item.icon}</span><span style={{ fontSize:9, fontWeight:600, letterSpacing:0.5 }}>{item.label}</span></button>))}</div>);
}

function ScreenHeader({ label, title }) {
  return (<div style={{ padding:"50px 24px 16px" }}><div style={{ color:"rgba(172,225,175,0.4)", fontSize:10, fontFamily:"'Space Mono', monospace", letterSpacing:3, textTransform:"uppercase" }}>{label}</div><div style={{ color:"#fff", fontSize:20, fontFamily:"'Cormorant Garamond', serif", fontWeight:600, marginTop:4, letterSpacing:1 }}>{title}</div></div>);
}

function HomeScreen({ setScreen, userData, profile }) {
  const [animate, setAnimate] = useState(false);
  useEffect(() => { setTimeout(()=>setAnimate(true),100); }, []);
  const kmCount = useCountUp(userData.totalKm, 2000, animate);
  const donationCount = useCountUp(userData.totalKm*500, 2000, animate);
  return (
    <div style={{ height:"100%", overflowY:"auto", paddingBottom:90, background:"linear-gradient(180deg, #0a0a0a 0%, #0d1a12 100%)" }}>
      <div style={{ padding:"50px 24px 16px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div><div style={{ color:"rgba(172,225,175,0.4)", fontSize:10, fontFamily:"'Space Mono', monospace", letterSpacing:2 }}>2026.02</div><div style={{ color:"#ACE1AF", fontSize:22, fontFamily:"'Cormorant Garamond', serif", fontWeight:600, marginTop:2, letterSpacing:2 }}>CELADON</div></div>
        <button onClick={()=>setScreen(SCREENS.MYPAGE)} style={{ width:38, height:38, borderRadius:"50%", border:"1.5px solid rgba(172,225,175,0.2)", background:"rgba(172,225,175,0.06)", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, fontWeight:600, color:"#ACE1AF" }}>{profile?.name?.charAt(0)||"?"}</button>
      </div>
      <div style={{ margin:"0 20px 16px", padding:"14px 20px", borderRadius:14, background:"linear-gradient(135deg, rgba(172,225,175,0.08), rgba(172,225,175,0.02))", border:"1px solid rgba(172,225,175,0.08)", display:"flex", alignItems:"center", gap:12, opacity:animate?1:0, transition:"opacity 0.5s ease" }}>
        <span style={{ fontSize:20 }}>🕊️</span><div><div style={{ fontSize:12, color:"#ACE1AF", fontWeight:600 }}>중동 난민을 위한 스포츠 학교 건립</div><div style={{ fontSize:10, color:"rgba(255,255,255,0.3)", marginTop:2 }}>10만 km 달리기 "이유 있는 러닝"</div></div>
      </div>
      <div style={{ margin:"0 20px", borderRadius:24, padding:28, background:"linear-gradient(145deg, rgba(172,225,175,0.07), rgba(172,225,175,0.01))", border:"1px solid rgba(172,225,175,0.1)", opacity:animate?1:0, transform:animate?"translateY(0)":"translateY(20px)", transition:"all 0.6s cubic-bezier(0.16,1,0.3,1) 0.1s" }}>
        <div style={{ textAlign:"center" }}><div style={{ color:"rgba(172,225,175,0.4)", fontSize:10, letterSpacing:3, fontFamily:"'Space Mono', monospace" }}>이번 달 러닝 거리</div><div style={{ fontSize:68, fontFamily:"'Cormorant Garamond', serif", fontWeight:700, color:"#ACE1AF", lineHeight:1, marginTop:10, textShadow:"0 0 60px rgba(172,225,175,0.12)" }}>{kmCount}<span style={{ fontSize:24, color:"rgba(172,225,175,0.5)", marginLeft:4, fontWeight:400 }}>KM</span></div></div>
        <div style={{ height:1, background:"rgba(172,225,175,0.08)", margin:"20px 0" }}/>
        <div style={{ display:"flex", justifyContent:"space-between" }}>
          <div style={{ textAlign:"center", flex:1 }}><div style={{ color:"rgba(255,255,255,0.3)", fontSize:9, letterSpacing:1, fontFamily:"'Space Mono', monospace" }}>기부 금액</div><div style={{ color:"#fff", fontSize:20, fontFamily:"'Cormorant Garamond', serif", fontWeight:600, marginTop:6 }}>{donationCount.toLocaleString()}<span style={{ fontSize:12, color:"rgba(255,255,255,0.3)", fontWeight:400 }}>원</span></div></div>
          <div style={{ width:1, background:"rgba(255,255,255,0.05)" }}/>
          <div style={{ textAlign:"center", flex:1 }}><div style={{ color:"rgba(255,255,255,0.3)", fontSize:9, letterSpacing:1, fontFamily:"'Space Mono', monospace" }}>러닝 횟수</div><div style={{ color:"#fff", fontSize:20, fontFamily:"'Cormorant Garamond', serif", fontWeight:600, marginTop:6 }}>{userData.runCount}<span style={{ fontSize:12, color:"rgba(255,255,255,0.3)", fontWeight:400 }}>회</span></div></div>
        </div>
      </div>
      <button onClick={()=>setScreen(SCREENS.UPLOAD)} style={{ margin:"16px 20px 0", width:"calc(100% - 40px)", padding:"16px 24px", borderRadius:16, border:"none", cursor:"pointer", background:"linear-gradient(135deg, #ACE1AF, #8FBC8F)", display:"flex", alignItems:"center", justifyContent:"space-between", opacity:animate?1:0, transform:animate?"translateY(0)":"translateY(20px)", transition:"all 0.6s cubic-bezier(0.16,1,0.3,1) 0.2s" }}>
        <div style={{ textAlign:"left" }}><div style={{ fontSize:14, fontWeight:700, color:"#0a0a0a" }}>러닝 인증하기</div><div style={{ fontSize:10, color:"rgba(0,0,0,0.45)", marginTop:2, fontFamily:"'Space Mono', monospace" }}>나이키 런클럽 캡쳐 업로드</div></div>
        <span style={{ fontSize:22, color:"#0a0a0a" }}>→</span>
      </button>
      <div style={{ margin:"16px 20px 0", padding:"18px", borderRadius:16, background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.05)", opacity:animate?1:0, transition:"opacity 0.6s ease 0.4s" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
          <span style={{ fontSize:11, color:"rgba(255,255,255,0.4)", fontFamily:"'Space Mono', monospace" }}>🕊️ 10만km 목표 달성률</span>
          <span style={{ fontSize:11, color:"#ACE1AF", fontFamily:"'Cormorant Garamond', serif", fontWeight:600 }}>{userData.goalPercent}%</span>
        </div>
        <div style={{ height:5, borderRadius:3, background:"rgba(255,255,255,0.05)", overflow:"hidden" }}><div style={{ height:"100%", borderRadius:3, width:animate?`${userData.goalPercent}%`:"0%", background:"linear-gradient(90deg, #ACE1AF, #8FBC8F)", transition:"width 1.5s cubic-bezier(0.16,1,0.3,1) 0.5s", boxShadow:"0 0 12px rgba(172,225,175,0.3)" }}/></div>
        <div style={{ display:"flex", justifyContent:"space-between", marginTop:8 }}><span style={{ fontSize:10, color:"rgba(255,255,255,0.25)" }}>{userData.totalMembers}명 참여</span><span style={{ fontSize:10, color:"rgba(255,255,255,0.25)" }}>{userData.totalAllKm.toLocaleString()} / 100,000 km</span></div>
      </div>
    </div>
  );
}

function UploadScreen({ setScreen, user, onUploadComplete }) {
  const [step, setStep] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  const [km, setKm] = useState(null);
  const [loading, setLoading] = useState(false);
  const [manualKm, setManualKm] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const handleFileSelect = (file) => { if(file) { setImageFile(file); setStep(1); } };

  const handleUpload = async () => {
    const kmVal = parseFloat(manualKm);
    if(!kmVal || kmVal<=0) return;
    setLoading(true);
    let imageUrl = null;
    if(imageFile) {
      const fileName = `${user.id}/${Date.now()}_${imageFile.name}`;
      const { data: ud, error: ue } = await supabase.storage.from('running-images').upload(fileName, imageFile);
      if(!ue && ud) { const { data: urlD } = supabase.storage.from('running-images').getPublicUrl(ud.path); imageUrl = urlD.publicUrl; }
    }
    const now = new Date();
    const recordMonth = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}`;
    const { error: ie } = await supabase.from('running_records').insert({ user_id:user.id, km:kmVal, image_url:imageUrl, record_month:recordMonth, payment_status: + "대기" + r});
    if(ie) { alert( + "저장에 실패했습니다. 다시 시도해주세요." + r); setLoading(false); return; }
    setKm(kmVal); setStep(2); setLoading(false); onUploadComplete();
  };

  return (
    <div style={{ height:"100%", overflowY:"auto", paddingBottom:90, background:"linear-gradient(180deg, #0a0a0a 0%, #0d1a12 100%)" }}>
      <ScreenHeader label="UPLOAD" title="러닝 인증" />
      {step===0 && (<div style={{ padding:"0 20px" }}>
        <div style={{ padding:"14px 18px", borderRadius:12, marginBottom:20, background:"rgba(172,225,175,0.05)", border:"1px solid rgba(172,225,175,0.08)" }}>
          <div style={{ fontSize:11, color:"#ACE1AF", fontWeight:600, marginBottom:6 }}>📱 인증 방법</div>
          <div style={{ fontSize:11, color:"rgba(255,255,255,0.4)", lineHeight:1.9 }}>1. 나이키 런클럽 앱 → 활동 탭<br/>2. 월간 러닝 기록 캡쳐<br/>3. 아래에 이미지 업로드</div>
        </div>
        <label style={{ display:"block", cursor:"pointer" }}>
          <input type="file" accept="image/*" style={{ display:"none" }} onChange={e=>handleFileSelect(e.target.files[0])}/>
          <div onDragOver={e=>{e.preventDefault();setDragOver(true);}} onDragLeave={()=>setDragOver(false)} onDrop={e=>{e.preventDefault();setDragOver(false);handleFileSelect(e.dataTransfer.files[0]);}} style={{ border:`2px dashed ${dragOver?"#ACE1AF":"rgba(172,225,175,0.12)"}`, borderRadius:20, padding:"56px 20px", textAlign:"center", transition:"all 0.3s ease", background:dragOver?"rgba(172,225,175,0.04)":"transparent" }}>
            <div style={{ fontSize:44, marginBottom:16, opacity:0.5 }}>📷</div>
            <div style={{ color:"rgba(255,255,255,0.5)", fontSize:13, fontWeight:500 }}>나이키 런클럽 캡쳐 업로드</div>
            <div style={{ color:"rgba(255,255,255,0.2)", fontSize:10, marginTop:8, fontFamily:"'Space Mono', monospace" }}>탭하여 이미지 선택</div>
          </div>
        </label>
      </div>)}
      {step===1 && (<div style={{ padding:"0 20px" }}>
        <div style={{ padding:"16px 18px", borderRadius:14, background:"rgba(172,225,175,0.05)", border:"1px solid rgba(172,225,175,0.08)", marginBottom:20 }}>
          <div style={{ fontSize:11, color:"#ACE1AF", fontWeight:600, marginBottom:4 }}>✅ 이미지 선택 완료</div>
          <div style={{ fontSize:10, color:"rgba(255,255,255,0.3)" }}>{imageFile?.name}</div>
        </div>
        <div style={{ marginBottom:20 }}>
          <label style={labelStyle}>이번 달 러닝 거리 (km)</label>
          <input type="number" placeholder="예: 42" value={manualKm} onChange={e=>setManualKm(e.target.value)} style={{ ...inputStyle, fontSize:24, textAlign:"center", padding:"20px 16px" }}/>
          <div style={{ fontSize:10, color:"rgba(255,255,255,0.2)", marginTop:8, textAlign:"center" }}>나이키 런클럽 캡쳐에 표시된 거리를 입력해주세요</div>
        </div>
        {manualKm && parseFloat(manualKm)>0 && (<div style={{ padding:"14px 18px", borderRadius:12, background:"rgba(172,225,175,0.04)", border:"1px solid rgba(172,225,175,0.08)", marginBottom:20, textAlign:"center" }}><span style={{ fontSize:12, color:"rgba(255,255,255,0.4)" }}>예상 기부금: </span><span style={{ fontSize:16, color:"#ACE1AF", fontWeight:700 }}>{(parseFloat(manualKm)*500).toLocaleString()}원</span></div>)}
        <button onClick={handleUpload} disabled={loading||!manualKm} style={{ width:"100%", padding:"16px", borderRadius:16, border:"none", cursor:loading?"wait":"pointer", background:manualKm?"linear-gradient(135deg, #ACE1AF, #8FBC8F)":"rgba(172,225,175,0.1)", fontSize:14, fontWeight:700, color:manualKm?"#0a0a0a":"rgba(172,225,175,0.3)", opacity:loading?0.7:1 }}>{loading?"업로드 중...":"러닝 기록 제출"}</button>
      </div>)}
      {step===2 && km && (<div style={{ padding:"32px 20px", textAlign:"center" }}>
        <div style={{ borderRadius:24, padding:"36px 24px", background:"linear-gradient(145deg, rgba(172,225,175,0.08), rgba(172,225,175,0.02))", border:"1px solid rgba(172,225,175,0.12)" }}>
          <div style={{ width:56, height:56, margin:"0 auto 18px", borderRadius:"50%", background:"rgba(172,225,175,0.1)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, color:"#ACE1AF" }}>✓</div>
          <div style={{ color:"rgba(172,225,175,0.4)", fontSize:10, letterSpacing:3, fontFamily:"'Space Mono', monospace" }}>업로드 완료</div>
          <div style={{ fontSize:60, fontFamily:"'Cormorant Garamond', serif", fontWeight:700, color:"#ACE1AF", lineHeight:1, margin:"14px 0 8px" }}>{km}<span style={{ fontSize:22, color:"rgba(172,225,175,0.4)", fontWeight:400 }}>KM</span></div>
          <div style={{ height:1, background:"rgba(172,225,175,0.08)", margin:"20px 0" }}/>
          <div style={{ display:"flex", justifyContent:"center", gap:36 }}><div><div style={{ color:"rgba(255,255,255,0.3)", fontSize:9, fontFamily:"'Space Mono', monospace" }}>1KM 당</div><div style={{ color:"#fff", fontSize:17, fontFamily:"'Cormorant Garamond', serif", fontWeight:600, marginTop:4 }}>500원</div></div><div><div style={{ color:"rgba(255,255,255,0.3)", fontSize:9, fontFamily:"'Space Mono', monospace" }}>기부 금액</div><div style={{ color:"#ACE1AF", fontSize:17, fontFamily:"'Cormorant Garamond', serif", fontWeight:600, marginTop:4 }}>{(km*500).toLocaleString()}원</div></div></div>
        </div>
        <button onClick={()=>setScreen(SCREENS.RESULT)} style={{ width:"100%", padding:"16px", borderRadius:16, border:"none", cursor:"pointer", background:"linear-gradient(135deg, #ACE1AF, #8FBC8F)", fontSize:14, fontWeight:700, color:"#0a0a0a", marginTop:16 }}>입금 완료 확인</button>
      </div>)}
    </div>
  );
}

function ResultScreen({ setScreen, userData }) {
  const [show, setShow] = useState(false);
  useEffect(() => { setTimeout(()=>setShow(true),100); }, []);
  return (
    <div style={{ height:"100%", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"0 24px", paddingBottom:90, background:"linear-gradient(180deg, #0a0a0a 0%, #0d2818 100%)", textAlign:"center" }}>
      <div style={{ width:90, height:90, borderRadius:"50%", background:"linear-gradient(135deg, rgba(172,225,175,0.15), rgba(172,225,175,0.03))", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:28, opacity:show?1:0, transform:show?"scale(1)":"scale(0.5)", transition:"all 0.6s cubic-bezier(0.34,1.56,0.64,1)" }}><span style={{ fontSize:42 }}>🕊️</span></div>
      <div style={{ opacity:show?1:0, transform:show?"translateY(0)":"translateY(20px)", transition:"all 0.6s ease 0.2s" }}>
        <div style={{ fontSize:12, color:"rgba(172,225,175,0.4)", fontFamily:"'Space Mono', monospace", letterSpacing:3 }}>THANK YOU</div>
        <div style={{ fontSize:28, fontFamily:"'Cormorant Garamond', serif", fontWeight:600, color:"#ACE1AF", marginTop:8 }}>기부 완료!</div>
        <div style={{ fontSize:13, color:"rgba(255,255,255,0.4)", marginTop:12, lineHeight:1.8 }}>당신의 이유 있는 러닝이<br/>세상을 더 따뜻하게 만들었습니다</div>
      </div>
      <div style={{ marginTop:36, padding:"18px 36px", borderRadius:16, background:"rgba(172,225,175,0.05)", border:"1px solid rgba(172,225,175,0.08)", opacity:show?1:0, transition:"opacity 0.6s ease 0.4s" }}>
        <div style={{ fontSize:32, fontFamily:"'Cormorant Garamond', serif", fontWeight:700, color:"#fff" }}>{userData.totalDonation.toLocaleString()}<span style={{ fontSize:14, color:"rgba(255,255,255,0.3)", fontWeight:400 }}>원</span></div>
        <div style={{ fontSize:10, color:"rgba(255,255,255,0.25)", fontFamily:"'Space Mono', monospace", marginTop:4 }}>누적 기부 금액</div>
      </div>
      <div style={{ display:"flex", gap:12, marginTop:28, opacity:show?1:0, transition:"opacity 0.6s ease 0.5s" }}>
        <button onClick={()=>setScreen(SCREENS.HOME)} style={{ padding:"14px 28px", borderRadius:14, border:"none", cursor:"pointer", background:"linear-gradient(135deg, #ACE1AF, #8FBC8F)", fontSize:13, fontWeight:700, color:"#0a0a0a" }}>홈으로</button>
      </div>
    </div>
  );
}

function LeaderboardScreen({ allUsers, userId }) {
  const [animate, setAnimate] = useState(false);
  useEffect(() => { setTimeout(()=>setAnimate(true),100); }, []);
  const leaders = [...allUsers].sort((a,b)=>(b.total_km||0)-(a.total_km||0));
  const top3 = leaders.slice(0,3);
  while(top3.length<3) top3.push({ id:`empty-${top3.length}`, name:"-", total_km:0, total_donation:0 });
  return (
    <div style={{ height:"100%", overflowY:"auto", paddingBottom:90, background:"linear-gradient(180deg, #0a0a0a 0%, #0d1a12 100%)" }}>
      <ScreenHeader label="LEADERBOARD" title="기부왕 랭킹" />
      <div style={{ display:"flex", justifyContent:"center", alignItems:"flex-end", gap:10, padding:"16px 20px 28px", opacity:animate?1:0, transition:"opacity 0.6s ease" }}>
        {[top3[1],top3[0],top3[2]].map((l,idx)=>{const pos=idx===1?0:idx===0?1:2;const colors=[["#ACE1AF","rgba(172,225,175,0.1)","rgba(172,225,175,0.12)"],["#C0C0C0","rgba(192,192,192,0.06)","rgba(192,192,192,0.08)"],["#CD7F32","rgba(205,127,50,0.05)","rgba(205,127,50,0.07)"]];const heights=[28,20,14];const medals=["🥇","🥈","🥉"];return(<div key={l.id||idx} style={{textAlign:"center",flex:1}}><div style={{fontSize:idx===1?32:24,marginBottom:6}}>{medals[pos]}</div><div style={{padding:`${heights[pos]}px 0`,borderRadius:"14px 14px 0 0",background:colors[pos][1],border:`1px solid ${colors[pos][2]}`,borderBottom:"none"}}><div style={{fontSize:12,color:colors[pos][0],fontWeight:600}}>{l.name}</div><div style={{fontSize:idx===1?22:17,color:colors[pos][0],fontFamily:"'Cormorant Garamond', serif",fontWeight:700,marginTop:4}}>{l.total_km||0}km</div><div style={{fontSize:9,color:"rgba(255,255,255,0.25)",marginTop:2}}>{((l.total_km||0)*500).toLocaleString()}원</div></div></div>);})}
      </div>
      <div style={{ padding:"0 20px" }}>{leaders.slice(3).map((leader,i)=>{const isMe=leader.id===userId;return(<div key={leader.id} style={{display:"flex",alignItems:"center",padding:"14px 16px",borderRadius:12,marginBottom:6,background:isMe?"rgba(172,225,175,0.05)":"rgba(255,255,255,0.02)",border:isMe?"1px solid rgba(172,225,175,0.08)":"1px solid rgba(255,255,255,0.03)",opacity:animate?1:0,transform:animate?"translateX(0)":"translateX(-16px)",transition:`all 0.4s ease ${0.08*i}s`}}><div style={{width:24,fontSize:12,color:"rgba(255,255,255,0.25)",fontFamily:"'Cormorant Garamond', serif",fontWeight:600}}>{i+4}</div><div style={{flex:1}}><span style={{fontSize:13,fontWeight:600,color:isMe?"#ACE1AF":"#fff"}}>{leader.name}</span>{isMe&&<span style={{marginLeft:6,fontSize:8,padding:"1px 6px",borderRadius:10,background:"rgba(172,225,175,0.12)",color:"#ACE1AF"}}>ME</span>}</div><div style={{textAlign:"right"}}><div style={{fontSize:14,color:"#fff",fontFamily:"'Cormorant Garamond', serif",fontWeight:600}}>{leader.total_km||0}km</div><div style={{fontSize:9,color:"rgba(255,255,255,0.25)"}}>{((leader.total_km||0)*500).toLocaleString()}원</div></div></div>);})}</div>
    </div>
  );
}

function EventScreen() {
  const [animate, setAnimate] = useState(false);
  const [rewards, setRewards] = useState([]);
  useEffect(() => { setTimeout(()=>setAnimate(true),100); supabase.from('rewards').select('*').eq('active',true).order('id').then(({data})=>{if(data)setRewards(data);}); }, []);
  const dc = ["#FFD700","#C0C0C0","#CD7F32","#ACE1AF"];
  return (
    <div style={{ height:"100%", overflowY:"auto", paddingBottom:90, background:"linear-gradient(180deg, #0a0a0a 0%, #0d1a12 100%)" }}>
      <ScreenHeader label="REWARDS" title="기부왕 리워드" />
      <div style={{ padding:"0 20px" }}>{rewards.map((r,i)=>(<div key={r.id} style={{padding:"22px 18px",borderRadius:18,marginBottom:10,background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.05)",opacity:animate?1:0,transform:animate?"translateY(0)":"translateY(16px)",transition:`all 0.5s cubic-bezier(0.16,1,0.3,1) ${0.1*i}s`}}><div style={{display:"flex",alignItems:"center",gap:12,marginBottom:12}}><span style={{fontSize:26}}>{r.icon}</span><div><div style={{fontSize:13,color:dc[i]||"#ACE1AF",fontFamily:"'Cormorant Garamond', serif",fontWeight:600}}>{r.tier}</div><div style={{fontSize:9,color:"rgba(255,255,255,0.25)",marginTop:2,fontFamily:"'Space Mono', monospace"}}>{r.condition}</div></div></div><div style={{padding:"10px 14px",borderRadius:10,background:"rgba(255,255,255,0.02)",fontSize:12,color:"rgba(255,255,255,0.6)",fontWeight:500}}>{r.prize}</div></div>))}</div>
    </div>
  );
}

function MyPageScreen({ userData, setScreen, profile, onLogout }) {
  const [animate, setAnimate] = useState(false);
  const [records, setRecords] = useState([]);
  useEffect(() => { setTimeout(()=>setAnimate(true),100); if(profile?.id) supabase.from('running_records').select('*').eq('user_id',profile.id).order('created_at',{ascending:false}).then(({data})=>{if(data)setRecords(data);}); }, []);
  return (
    <div style={{ height:"100%", overflowY:"auto", paddingBottom:90, background:"linear-gradient(180deg, #0a0a0a 0%, #0d1a12 100%)" }}>
      <ScreenHeader label="MY PAGE" title="마이페이지" />
      <div style={{ margin:"0 20px", padding:"22px", borderRadius:20, background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.05)", display:"flex", alignItems:"center", gap:16, opacity:animate?1:0, transition:"opacity 0.5s ease" }}>
        <div style={{ width:52, height:52, borderRadius:"50%", background:"linear-gradient(135deg, #ACE1AF, #8FBC8F)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, fontWeight:700, color:"#0a0a0a" }}>{profile?.name?.charAt(0)||"?"}</div>
        <div><div style={{ fontSize:17, color:"#fff", fontWeight:700 }}>{profile?.name||"러너"}</div><div style={{ fontSize:10, color:"rgba(255,255,255,0.25)", fontFamily:"'Space Mono', monospace", marginTop:3 }}>셀라돈 러너 · {Math.round(userData.months||1)}개월째</div></div>
      </div>
      <div style={{ display:"flex", gap:10, margin:"14px 20px 0" }}>
        {[{label:"총 러닝",value:`${userData.totalKm}km`},{label:"총 기부",value:`${userData.totalDonation.toLocaleString()}원`},{label:"랭킹",value:`${userData.rank||"-"}위`}].map((s,i)=>(<div key={i} style={{flex:1,padding:"14px 10px",borderRadius:14,textAlign:"center",background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.04)",opacity:animate?1:0,transition:`opacity 0.5s ease ${0.1*i}s`}}><div style={{fontSize:9,color:"rgba(255,255,255,0.25)",fontFamily:"'Space Mono', monospace",letterSpacing:1}}>{s.label}</div><div style={{fontSize:15,color:"#ACE1AF",fontFamily:"'Cormorant Garamond', serif",fontWeight:700,marginTop:6}}>{s.value}</div></div>))}
      </div>
      <div style={{ padding:"20px 20px 0" }}>
        <div style={{ fontSize:11, color:"rgba(172,225,175,0.4)", fontFamily:"'Space Mono', monospace", letterSpacing:2, marginBottom:14 }}>기부 히스토리</div>
        {records.length===0 && <div style={{textAlign:"center",padding:"20px 0",color:"rgba(255,255,255,0.2)",fontSize:12}}>아직 러닝 기록이 없습니다</div>}
        {records.map((item,i)=>(<div key={item.id} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 16px",borderRadius:12,marginBottom:6,background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.03)",opacity:animate?1:0,transition:`opacity 0.4s ease ${0.15*i}s`}}><div><div style={{fontSize:12,color:"#fff",fontWeight:600}}>{item.record_month}</div><div style={{fontSize:10,color:"rgba(255,255,255,0.25)",marginTop:2}}>{item.km}km 러닝</div></div><div style={{textAlign:"right"}}><div style={{fontSize:13,color:"#ACE1AF",fontFamily:"'Cormorant Garamond', serif",fontWeight:600}}>{(item.km*500).toLocaleString()}원</div><div style={{fontSize:8,color:item.payment_status==="완료"?"rgba(172,225,175,0.5)":"rgba(255,215,0,0.5)",marginTop:2,padding:"1px 6px",borderRadius:8,background:"rgba(172,225,175,0.06)",display:"inline-block"}}>{item.payment_status}</div></div></div>))}
      </div>
      <button onClick={onLogout} style={{ margin:"20px 20px 0", width:"calc(100% - 40px)", padding:"14px", borderRadius:12, cursor:"pointer", background:"transparent", border:"1px solid rgba(255,100,100,0.15)", fontSize:12, color:"rgba(255,100,100,0.5)", fontWeight:500 }}>로그아웃</button>
    </div>
  );
}

export default function CeladonApp() {
  const [screen, setScreen] = useState(SCREENS.SPLASH);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [userData, setUserData] = useState({ totalKm:0, totalDonation:0, runCount:0, months:1, goalPercent:0, totalAllKm:0, totalMembers:0, rank:"-" });
  const [allUsers, setAllUsers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({data:{session}})=>{ if(session?.user) setUser(session.user); });
    const {data:{subscription}} = supabase.auth.onAuthStateChange((_e,session)=>{ if(session?.user) setUser(session.user); else { setUser(null); setProfile(null); } });
    return ()=>subscription.unsubscribe();
  }, []);

  useEffect(() => { if(user) { loadProfile(); loadUserData(); loadAllUsers(); } }, [user]);

  const loadProfile = async () => { const {data} = await supabase.from('profiles').select('*').eq('id',user.id).single(); if(data) setProfile(data); };

  const loadUserData = async () => {
    const {data:myR} = await supabase.from('running_records').select('km').eq('user_id',user.id);
    const totalKm = myR ? myR.reduce((s,r)=>s+Number(r.km),0) : 0;
    const {data:allR} = await supabase.from('running_records').select('km,user_id');
    const totalAllKm = allR ? allR.reduce((s,r)=>s+Number(r.km),0) : 0;
    const {count} = await supabase.from('profiles').select('id',{count:'exact'});
    const ukm = {};
    if(allR) allR.forEach(r=>{ ukm[r.user_id]=(ukm[r.user_id]||0)+Number(r.km); });
    const sorted = Object.entries(ukm).sort((a,b)=>b[1]-a[1]);
    const myRank = sorted.findIndex(([uid])=>uid===user.id)+1;
    const joinDate = profile?.created_at ? new Date(profile.created_at) : new Date();
    const months = Math.max(1, Math.ceil((new Date()-joinDate)/(1000*60*60*24*30)));
    setUserData({ totalKm:Math.round(totalKm), totalDonation:Math.round(totalKm*500), runCount:myR?myR.length:0, months, goalPercent:Math.min(100,((totalAllKm/100000)*100)).toFixed(1), totalAllKm:Math.round(totalAllKm), totalMembers:count||0, rank:myRank||"-" });
  };

  const loadAllUsers = async () => {
    const {data} = await supabase.from('user_stats').select('*');
    if(data) setAllUsers(data.map(u=>({ ...u, total_km:Math.round(Number(u.total_km)), total_donation:Math.round(Number(u.total_donation)), isMe:u.id===user?.id })));
  };

  const handleLogin = (authUser) => { setUser(authUser); setScreen(SCREENS.HOME); };
  const handleLogout = async () => { await supabase.auth.signOut(); setUser(null); setProfile(null); setScreen(SCREENS.LOGIN); };
  const handleSetScreen = (s) => { if(s!==SCREENS.CERTIFICATE) setSelectedMember(null); setScreen(s); };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600&family=Space+Mono:wght@400;700&family=Noto+Sans+KR:wght@300;400;500;600;700;800&display=swap');
        @keyframes pulseRing { 0% { transform: translate(-50%,-50%) scale(0.8); opacity: 1; } 100% { transform: translate(-50%,-50%) scale(1.5); opacity: 0; } }
        @keyframes spin { to { transform: rotate(360deg); } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 0; }
        button { font-family: 'Noto Sans KR', sans-serif; }
        input::placeholder { color: rgba(255,255,255,0.15); }
      `}</style>
      <div style={{ width:"100%", maxWidth:390, height:"100vh", maxHeight:844, margin:"0 auto", position:"relative", overflow:"hidden", background:"#0a0a0a", fontFamily:"'Noto Sans KR', sans-serif", borderRadius:typeof window!=='undefined'&&window.innerWidth>500?40:0, boxShadow:"0 0 100px rgba(172,225,175,0.03)" }}>
        {screen===SCREENS.SPLASH && <SplashScreen onFinish={()=>setScreen(user?SCREENS.HOME:SCREENS.LOGIN)} />}
        {screen===SCREENS.LOGIN && <LoginScreen setScreen={handleSetScreen} onLogin={handleLogin} />}
        {screen===SCREENS.RESET_PW && <ResetPasswordScreen setScreen={handleSetScreen} />}
        {screen===SCREENS.SIGNUP && <SignupScreen setScreen={handleSetScreen} onLogin={handleLogin} />}
        {screen===SCREENS.HOME && <HomeScreen setScreen={handleSetScreen} userData={userData} profile={profile} />}
        {screen===SCREENS.UPLOAD && <UploadScreen setScreen={handleSetScreen} user={user} onUploadComplete={()=>{loadUserData();loadAllUsers();}} />}
        {screen===SCREENS.RESULT && <ResultScreen setScreen={handleSetScreen} userData={userData} />}
        {screen===SCREENS.LEADERBOARD && <LeaderboardScreen allUsers={allUsers} userId={user?.id} />}
        {screen===SCREENS.EVENT && <EventScreen />}
        {screen===SCREENS.MYPAGE && <MyPageScreen userData={userData} setScreen={handleSetScreen} profile={profile} onLogout={handleLogout} />}
        {![SCREENS.SPLASH,SCREENS.LOGIN,SCREENS.SIGNUP,SCREENS.RESET_PW,SCREENS.RESULT,SCREENS.CERTIFICATE,SCREENS.MEMBERS].includes(screen) && <NavBar screen={screen} setScreen={handleSetScreen} />}
      </div>
    </>
  );
}
