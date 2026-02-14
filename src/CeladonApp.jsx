import { useState, useEffect } from "react";

const SCREENS = {
  SPLASH: "splash",
  LOGIN: "login",
  SIGNUP: "signup",
  HOME: "home",
  UPLOAD: "upload",
  RESULT: "result",
  LEADERBOARD: "leaderboard",
  MYPAGE: "mypage",
  EVENT: "event",
  CERTIFICATE: "certificate",
  MEMBERS: "members",
};

function useCountUp(target, duration = 1500, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      setValue(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return value;
}

const MEMBERS_DATA = [
  { id: 1, name: "김러너", km: 157, avatar: "🏃", months: 8, totalDonation: 468000, period: "2026.01.01 ~ 2026.01.31" },
  { id: 2, name: "박마라톤", km: 132, avatar: "🏃‍♀️", months: 6, totalDonation: 396000, period: "2026.01.01 ~ 2026.01.31" },
  { id: 3, name: "이스프린트", km: 98, avatar: "🏃", months: 5, totalDonation: 245000, period: "2026.01.01 ~ 2026.01.31" },
  { id: 4, name: "최달리기", km: 87, avatar: "🏃‍♀️", months: 7, totalDonation: 304500, period: "2026.01.01 ~ 2026.01.31" },
  { id: 5, name: "이도권", km: 157, avatar: "🏃", months: 6, totalDonation: 471000, period: "2026.01.01 ~ 2026.01.31" },
  { id: 6, name: "신민규", km: 72, avatar: "🏃", months: 6, totalDonation: 216000, isMe: true, period: "2026.01.01 ~ 2026.01.31" },
  { id: 7, name: "한조깅", km: 65, avatar: "🏃‍♀️", months: 3, totalDonation: 97500, period: "2026.01.01 ~ 2026.01.31" },
  { id: 8, name: "오마일", km: 54, avatar: "🏃", months: 5, totalDonation: 135000, period: "2026.01.01 ~ 2026.01.31" },
  { id: 9, name: "유트랙", km: 48, avatar: "🏃‍♀️", months: 4, totalDonation: 96000, period: "2026.01.01 ~ 2026.01.31" },
  { id: 10, name: "강페이스", km: 41, avatar: "🏃", months: 3, totalDonation: 61500, period: "2026.01.01 ~ 2026.01.31" },
];

const inputStyle = {
  width: "100%", padding: "14px 16px", borderRadius: 12,
  border: "1px solid rgba(172,225,175,0.12)", background: "rgba(255,255,255,0.03)",
  color: "#fff", fontSize: 13, fontFamily: "'Noto Sans KR', sans-serif",
  outline: "none", transition: "border-color 0.2s ease",
};
const inputFocusColor = "rgba(172,225,175,0.3)";
const labelStyle = {
  fontSize: 11, color: "rgba(172,225,175,0.5)", fontFamily: "'Space Mono', monospace",
  letterSpacing: 1, marginBottom: 6, display: "block"
};

// ─── SPLASH ───
function SplashScreen({ onFinish }) {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    setTimeout(() => setPhase(1), 300);
    setTimeout(() => setPhase(2), 1000);
    setTimeout(() => setPhase(3), 1800);
    setTimeout(() => onFinish(), 2800);
  }, []);

  return (
    <div style={{
      height: "100%", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      background: "linear-gradient(160deg, #0a0a0a 0%, #0a1f15 40%, #122a1e 100%)",
      position: "relative", overflow: "hidden"
    }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.03 }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} style={{
            position: "absolute", width: 200 + i * 60, height: 200 + i * 60,
            borderRadius: "50%", border: "1px solid #ACE1AF",
            top: "50%", left: "50%", transform: "translate(-50%,-50%)",
            animation: `pulseRing ${2 + i * 0.3}s ease-out ${i * 0.2}s infinite`
          }} />
        ))}
      </div>
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 3,
        background: "linear-gradient(90deg, transparent, #ACE1AF, transparent)",
        opacity: phase >= 1 ? 1 : 0, transition: "opacity 1s ease"
      }} />
      <div style={{
        opacity: phase >= 1 ? 1 : 0, transform: phase >= 1 ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)",
        transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)", textAlign: "center"
      }}>
        <div style={{ fontSize: 13, fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: "rgba(172,225,175,0.5)", letterSpacing: 8, textTransform: "uppercase", marginBottom: 8 }}>
          RUN FOR HOPE
        </div>
        <div style={{ fontSize: 52, fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, color: "#ACE1AF", letterSpacing: 4, textShadow: "0 0 60px rgba(172,225,175,0.15)" }}>
          CELADON
        </div>
        <div style={{ fontSize: 12, fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: "rgba(172,225,175,0.4)", letterSpacing: 6, marginTop: 2 }}>셀라돈</div>
      </div>
      <div style={{ opacity: phase >= 2 ? 1 : 0, transition: "opacity 0.8s ease", marginTop: 32, textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", letterSpacing: 1, lineHeight: 1.8 }}>중동 난민을 위한 기부런</div>
        <div style={{ fontSize: 10, color: "rgba(172,225,175,0.3)", fontFamily: "'Space Mono', monospace", letterSpacing: 3, marginTop: 8 }}>1KM = 500원의 희망</div>
      </div>
      <div style={{
        position: "absolute", bottom: 80, width: 120, height: 1.5,
        background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden",
        opacity: phase >= 3 ? 0 : phase >= 2 ? 1 : 0, transition: "opacity 0.5s ease"
      }}>
        <div style={{ height: "100%", background: "#ACE1AF", borderRadius: 2, width: phase >= 2 ? "100%" : "0%", transition: "width 1s ease" }} />
      </div>
    </div>
  );
}

// ─── LOGIN SCREEN ───
function LoginScreen({ setScreen }) {
  const [animate, setAnimate] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [focusedField, setFocusedField] = useState(null);

  useEffect(() => { setTimeout(() => setAnimate(true), 100); }, []);

  const handleLogin = () => {
    if (email && password) setScreen(SCREENS.HOME);
  };

  return (
    <div style={{
      height: "100%", overflowY: "auto",
      background: "linear-gradient(180deg, #0a0a0a 0%, #0d1a12 100%)",
      display: "flex", flexDirection: "column"
    }}>
      {/* Header */}
      <div style={{
        padding: "60px 24px 32px", textAlign: "center",
        opacity: animate ? 1 : 0, transform: animate ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)"
      }}>
        <div style={{ fontSize: 13, fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", color: "rgba(172,225,175,0.4)", letterSpacing: 4, marginBottom: 4 }}>
          Celadon Donation Running
        </div>
        <div style={{ fontSize: 36, fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, color: "#ACE1AF", letterSpacing: 3 }}>
          CELADON
        </div>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", marginTop: 12, lineHeight: 1.6 }}>
          이유 있는 러닝, 셀라돈에 오신 것을 환영합니다
        </div>
      </div>

      {/* Login Form */}
      <div style={{
        flex: 1, padding: "0 24px",
        opacity: animate ? 1 : 0, transform: animate ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.15s"
      }}>
        <div style={{ marginBottom: 16 }}>
          <label style={labelStyle}>이메일</label>
          <input
            type="email" placeholder="email@example.com"
            value={email} onChange={e => setEmail(e.target.value)}
            onFocus={() => setFocusedField("email")} onBlur={() => setFocusedField(null)}
            style={{ ...inputStyle, borderColor: focusedField === "email" ? inputFocusColor : "rgba(172,225,175,0.12)" }}
          />
        </div>

        <div style={{ marginBottom: 24 }}>
          <label style={labelStyle}>비밀번호</label>
          <input
            type="password" placeholder="비밀번호 입력"
            value={password} onChange={e => setPassword(e.target.value)}
            onFocus={() => setFocusedField("pw")} onBlur={() => setFocusedField(null)}
            style={{ ...inputStyle, borderColor: focusedField === "pw" ? inputFocusColor : "rgba(172,225,175,0.12)" }}
          />
        </div>

        {/* Login Button */}
        <button onClick={handleLogin} style={{
          width: "100%", padding: "16px", borderRadius: 14, border: "none", cursor: "pointer",
          background: (email && password) ? "linear-gradient(135deg, #ACE1AF, #8FBC8F)" : "rgba(172,225,175,0.1)",
          fontSize: 15, fontWeight: 700,
          color: (email && password) ? "#0a0a0a" : "rgba(172,225,175,0.3)",
          transition: "all 0.3s ease"
        }}>
          로그인
        </button>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", margin: "28px 0", gap: 16 }}>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
          <span style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", fontFamily: "'Space Mono', monospace" }}>OR</span>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
        </div>

        {/* Social Login */}
        <div style={{ display: "flex", gap: 10 }}>
          <button style={{
            flex: 1, padding: "14px", borderRadius: 12, cursor: "pointer",
            background: "#FEE500", border: "none",
            fontSize: 13, fontWeight: 600, color: "#3C1E1E",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8
          }}>
            <span style={{ fontSize: 18 }}>💬</span> 카카오
          </button>
          <button style={{
            flex: 1, padding: "14px", borderRadius: 12, cursor: "pointer",
            background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)",
            fontSize: 13, fontWeight: 600, color: "#fff",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8
          }}>
            <span style={{ fontSize: 16 }}>G</span> Google
          </button>
        </div>

        {/* Forgot / Signup */}
        <div style={{ textAlign: "center", marginTop: 28 }}>
          <button style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.25)", fontSize: 12, marginBottom: 12, display: "block", width: "100%" }}>
            비밀번호를 잊으셨나요?
          </button>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>
            아직 회원이 아니신가요?{" "}
            <button onClick={() => setScreen(SCREENS.SIGNUP)} style={{
              background: "none", border: "none", cursor: "pointer",
              color: "#ACE1AF", fontSize: 12, fontWeight: 600, textDecoration: "underline",
              textUnderlineOffset: 3
            }}>
              회원가입
            </button>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div style={{ padding: "20px 24px 32px", textAlign: "center" }}>
        <div style={{ fontSize: 9, color: "rgba(255,255,255,0.15)", fontFamily: "'Space Mono', monospace", letterSpacing: 2 }}>
          🕊️ RUN FOR HOPE · 1KM = 500원
        </div>
      </div>
    </div>
  );
}

// ─── SIGNUP SCREEN ───
function SignupScreen({ setScreen }) {
  const [animate, setAnimate] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [step, setStep] = useState(1); // 1: basic info, 2: additional info
  const [form, setForm] = useState({
    email: "", password: "", passwordConfirm: "",
    name: "", fullName: "", birthday: "", phone: "", affiliation: "", instagram: ""
  });
  const [errors, setErrors] = useState({});
  const [agreed, setAgreed] = useState(false);

  useEffect(() => { setTimeout(() => setAnimate(true), 100); }, []);

  const updateForm = (key, val) => {
    setForm(prev => ({ ...prev, [key]: val }));
    if (errors[key]) setErrors(prev => ({ ...prev, [key]: null }));
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!form.email) newErrors.email = "이메일을 입력해주세요";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "올바른 이메일 형식이 아닙니다";
    if (!form.password) newErrors.password = "비밀번호를 입력해주세요";
    else if (form.password.length < 8) newErrors.password = "8자 이상 입력해주세요";
    if (form.password !== form.passwordConfirm) newErrors.passwordConfirm = "비밀번호가 일치하지 않습니다";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = "이름을 입력해주세요";
    if (!form.fullName) newErrors.fullName = "성함을 입력해주세요";
    if (!form.birthday) newErrors.birthday = "생년월일을 입력해주세요";
    if (!form.phone) newErrors.phone = "연락처를 입력해주세요";
    if (!form.affiliation) newErrors.affiliation = "소속을 입력해주세요";
    if (!form.instagram) newErrors.instagram = "인스타 아이디를 입력해주세요";
    if (!agreed) newErrors.agreed = "약관에 동의해주세요";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep1()) {
      setStep(2);
      setAnimate(false);
      setTimeout(() => setAnimate(true), 50);
    }
  };

  const handleSignup = () => {
    if (validateStep2()) {
      setScreen(SCREENS.HOME);
    }
  };

  const renderInput = (key, label, placeholder, type = "text", extra = {}) => (
    <div style={{ marginBottom: 14 }}>
      <label style={labelStyle}>
        {label} <span style={{ color: "rgba(255,100,100,0.5)" }}>*</span>
      </label>
      <input
        type={type} placeholder={placeholder}
        value={form[key]} onChange={e => updateForm(key, e.target.value)}
        onFocus={() => setFocusedField(key)} onBlur={() => setFocusedField(null)}
        style={{
          ...inputStyle,
          borderColor: errors[key] ? "rgba(255,100,100,0.4)" : focusedField === key ? inputFocusColor : "rgba(172,225,175,0.12)",
          ...extra
        }}
      />
      {errors[key] && <div style={{ fontSize: 10, color: "rgba(255,100,100,0.6)", marginTop: 4, paddingLeft: 4 }}>{errors[key]}</div>}
    </div>
  );

  return (
    <div style={{
      height: "100%", overflowY: "auto",
      background: "linear-gradient(180deg, #0a0a0a 0%, #0d1a12 100%)",
      display: "flex", flexDirection: "column"
    }}>
      {/* Header */}
      <div style={{ padding: "50px 24px 8px", display: "flex", alignItems: "center", gap: 12 }}>
        <button onClick={() => step === 1 ? setScreen(SCREENS.LOGIN) : setStep(1)} style={{
          background: "none", border: "none", cursor: "pointer",
          color: "rgba(255,255,255,0.4)", fontSize: 20, padding: "4px 8px"
        }}>←</button>
        <div>
          <div style={{ color: "rgba(172,225,175,0.4)", fontSize: 10, fontFamily: "'Space Mono', monospace", letterSpacing: 3 }}>SIGN UP</div>
          <div style={{ color: "#fff", fontSize: 18, fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, marginTop: 2, letterSpacing: 1 }}>회원가입</div>
        </div>
      </div>

      {/* Step indicator */}
      <div style={{ padding: "12px 24px 20px", display: "flex", gap: 8 }}>
        <div style={{ flex: 1, height: 3, borderRadius: 2, background: "#ACE1AF", transition: "background 0.3s" }} />
        <div style={{ flex: 1, height: 3, borderRadius: 2, background: step >= 2 ? "#ACE1AF" : "rgba(255,255,255,0.06)", transition: "background 0.3s" }} />
      </div>

      {/* Form */}
      <div style={{
        flex: 1, padding: "0 24px", paddingBottom: 100,
        opacity: animate ? 1 : 0, transform: animate ? "translateY(0)" : "translateY(16px)",
        transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)"
      }}>
        {step === 1 ? (
          <>
            <div style={{ fontSize: 14, color: "#ACE1AF", fontWeight: 600, marginBottom: 4 }}>계정 정보</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", marginBottom: 20 }}>로그인에 사용할 이메일과 비밀번호를 설정해주세요</div>

            {renderInput("email", "이메일", "email@example.com", "email")}
            {renderInput("password", "비밀번호", "8자 이상 입력", "password")}
            {renderInput("passwordConfirm", "비밀번호 확인", "비밀번호를 다시 입력해주세요", "password")}

            <button onClick={handleNext} style={{
              width: "100%", padding: "16px", borderRadius: 14, border: "none", cursor: "pointer",
              background: "linear-gradient(135deg, #ACE1AF, #8FBC8F)",
              fontSize: 15, fontWeight: 700, color: "#0a0a0a", marginTop: 8
            }}>
              다음 단계 →
            </button>
          </>
        ) : (
          <>
            <div style={{ fontSize: 14, color: "#ACE1AF", fontWeight: 600, marginBottom: 4 }}>러너 정보</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", marginBottom: 20 }}>셀라돈 기부런에 필요한 정보를 입력해주세요</div>

            {renderInput("name", "이름 (닉네임)", "러닝 시 사용할 이름")}
            {renderInput("fullName", "성함 (실명)", "기부증서에 표기될 이름")}

            <div style={{ display: "flex", gap: 10 }}>
              <div style={{ flex: 1 }}>
                {renderInput("birthday", "생년월일", "YYYY.MM.DD")}
              </div>
              <div style={{ flex: 1 }}>
                {renderInput("phone", "연락처", "010-0000-0000", "tel")}
              </div>
            </div>

            {renderInput("affiliation", "소속", "러닝크루, 회사, 단체 등")}

            <div style={{ marginBottom: 14 }}>
              <label style={labelStyle}>
                인스타그램 <span style={{ color: "rgba(255,100,100,0.5)" }}>*</span>
              </label>
              <div style={{ position: "relative" }}>
                <span style={{
                  position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)",
                  color: "rgba(172,225,175,0.3)", fontSize: 13, fontFamily: "'Space Mono', monospace"
                }}>@</span>
                <input
                  type="text" placeholder="instagram_id"
                  value={form.instagram} onChange={e => updateForm("instagram", e.target.value)}
                  onFocus={() => setFocusedField("instagram")} onBlur={() => setFocusedField(null)}
                  style={{
                    ...inputStyle, paddingLeft: 32,
                    borderColor: errors.instagram ? "rgba(255,100,100,0.4)" : focusedField === "instagram" ? inputFocusColor : "rgba(172,225,175,0.12)"
                  }}
                />
              </div>
              {errors.instagram && <div style={{ fontSize: 10, color: "rgba(255,100,100,0.6)", marginTop: 4, paddingLeft: 4 }}>{errors.instagram}</div>}
            </div>

            {/* Terms */}
            <div style={{
              padding: "14px 16px", borderRadius: 12, marginBottom: 20,
              background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)"
            }}>
              <button onClick={() => { setAgreed(!agreed); if (errors.agreed) setErrors(prev => ({ ...prev, agreed: null })); }}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  display: "flex", alignItems: "flex-start", gap: 10, width: "100%", textAlign: "left"
                }}>
                <div style={{
                  width: 20, height: 20, borderRadius: 6, flexShrink: 0, marginTop: 1,
                  border: agreed ? "none" : errors.agreed ? "1.5px solid rgba(255,100,100,0.4)" : "1.5px solid rgba(255,255,255,0.12)",
                  background: agreed ? "#ACE1AF" : "transparent",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all 0.2s ease"
                }}>
                  {agreed && <span style={{ color: "#0a0a0a", fontSize: 12, fontWeight: 700 }}>✓</span>}
                </div>
                <div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
                    <span style={{ color: "#ACE1AF" }}>[필수]</span> 개인정보 수집 및 이용에 동의합니다
                  </div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", marginTop: 4, lineHeight: 1.5 }}>
                    기부증서 발급, 러닝 인증, 리워드 지급을 위해 개인정보를 수집합니다.
                  </div>
                </div>
              </button>
              {errors.agreed && <div style={{ fontSize: 10, color: "rgba(255,100,100,0.6)", marginTop: 6, paddingLeft: 30 }}>{errors.agreed}</div>}
            </div>

            <button onClick={handleSignup} style={{
              width: "100%", padding: "16px", borderRadius: 14, border: "none", cursor: "pointer",
              background: "linear-gradient(135deg, #ACE1AF, #8FBC8F)",
              fontSize: 15, fontWeight: 700, color: "#0a0a0a"
            }}>
              가입 완료 🕊️
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ─── NAV BAR ───
function NavBar({ screen, setScreen }) {
  const items = [
    { id: SCREENS.HOME, icon: "⌂", label: "홈" },
    { id: SCREENS.UPLOAD, icon: "◎", label: "인증" },
    { id: SCREENS.LEADERBOARD, icon: "◆", label: "랭킹" },
    { id: SCREENS.EVENT, icon: "★", label: "리워드" },
    { id: SCREENS.MYPAGE, icon: "●", label: "MY" },
  ];
  return (
    <div style={{
      display: "flex", justifyContent: "space-around", alignItems: "center",
      padding: "12px 0 22px", borderTop: "1px solid rgba(172,225,175,0.06)",
      background: "rgba(10,10,10,0.97)", backdropFilter: "blur(20px)",
      position: "absolute", bottom: 0, left: 0, right: 0
    }}>
      {items.map(item => (
        <button key={item.id} onClick={() => setScreen(item.id)} style={{
          background: "none", border: "none", cursor: "pointer",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
          color: screen === item.id ? "#ACE1AF" : "rgba(255,255,255,0.25)",
          transition: "color 0.2s ease", minWidth: 48
        }}>
          <span style={{ fontSize: 18, fontFamily: "serif" }}>{item.icon}</span>
          <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: 0.5 }}>{item.label}</span>
        </button>
      ))}
    </div>
  );
}

function ScreenHeader({ label, title }) {
  return (
    <div style={{ padding: "50px 24px 16px" }}>
      <div style={{ color: "rgba(172,225,175,0.4)", fontSize: 10, fontFamily: "'Space Mono', monospace", letterSpacing: 3, textTransform: "uppercase" }}>{label}</div>
      <div style={{ color: "#fff", fontSize: 20, fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, marginTop: 4, letterSpacing: 1 }}>{title}</div>
    </div>
  );
}

// ─── HOME ───
function HomeScreen({ setScreen, userData }) {
  const [animate, setAnimate] = useState(false);
  useEffect(() => { setTimeout(() => setAnimate(true), 100); }, []);
  const kmCount = useCountUp(userData.totalKm, 2000, animate);
  const donationCount = useCountUp(userData.totalKm * 500, 2000, animate);

  return (
    <div style={{ height: "100%", overflowY: "auto", paddingBottom: 90, background: "linear-gradient(180deg, #0a0a0a 0%, #0d1a12 100%)" }}>
      <div style={{ padding: "50px 24px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ color: "rgba(172,225,175,0.4)", fontSize: 10, fontFamily: "'Space Mono', monospace", letterSpacing: 2 }}>2026.02</div>
          <div style={{ color: "#ACE1AF", fontSize: 22, fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, marginTop: 2, letterSpacing: 2 }}>CELADON</div>
        </div>
        <button onClick={() => setScreen(SCREENS.MYPAGE)} style={{
          width: 38, height: 38, borderRadius: "50%", border: "1.5px solid rgba(172,225,175,0.2)",
          background: "rgba(172,225,175,0.06)", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 14, fontWeight: 600, color: "#ACE1AF"
        }}>신</button>
      </div>

      <div style={{
        margin: "0 20px 16px", padding: "14px 20px", borderRadius: 14,
        background: "linear-gradient(135deg, rgba(172,225,175,0.08), rgba(172,225,175,0.02))",
        border: "1px solid rgba(172,225,175,0.08)", display: "flex", alignItems: "center", gap: 12,
        opacity: animate ? 1 : 0, transition: "opacity 0.5s ease"
      }}>
        <span style={{ fontSize: 20 }}>🕊️</span>
        <div>
          <div style={{ fontSize: 12, color: "#ACE1AF", fontWeight: 600 }}>중동 난민을 위한 스포츠 학교 건립</div>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginTop: 2 }}>10만 km 달리기 "이유 있는 러닝"</div>
        </div>
      </div>

      <div style={{
        margin: "0 20px", borderRadius: 24, padding: 28,
        background: "linear-gradient(145deg, rgba(172,225,175,0.07), rgba(172,225,175,0.01))",
        border: "1px solid rgba(172,225,175,0.1)",
        opacity: animate ? 1 : 0, transform: animate ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s"
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ color: "rgba(172,225,175,0.4)", fontSize: 10, letterSpacing: 3, fontFamily: "'Space Mono', monospace" }}>이번 달 러닝 거리</div>
          <div style={{ fontSize: 68, fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: "#ACE1AF", lineHeight: 1, marginTop: 10, textShadow: "0 0 60px rgba(172,225,175,0.12)" }}>
            {kmCount}<span style={{ fontSize: 24, color: "rgba(172,225,175,0.5)", marginLeft: 4, fontWeight: 400 }}>KM</span>
          </div>
        </div>
        <div style={{ height: 1, background: "rgba(172,225,175,0.08)", margin: "20px 0" }} />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ textAlign: "center", flex: 1 }}>
            <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 9, letterSpacing: 1, fontFamily: "'Space Mono', monospace" }}>기부 금액</div>
            <div style={{ color: "#fff", fontSize: 20, fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, marginTop: 6 }}>
              {donationCount.toLocaleString()}<span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", fontWeight: 400 }}>원</span>
            </div>
          </div>
          <div style={{ width: 1, background: "rgba(255,255,255,0.05)" }} />
          <div style={{ textAlign: "center", flex: 1 }}>
            <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 9, letterSpacing: 1, fontFamily: "'Space Mono', monospace" }}>러닝 횟수</div>
            <div style={{ color: "#fff", fontSize: 20, fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, marginTop: 6 }}>
              {userData.runCount}<span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", fontWeight: 400 }}>회</span>
            </div>
          </div>
        </div>
      </div>

      <button onClick={() => setScreen(SCREENS.UPLOAD)} style={{
        margin: "16px 20px 0", width: "calc(100% - 40px)", padding: "16px 24px",
        borderRadius: 16, border: "none", cursor: "pointer",
        background: "linear-gradient(135deg, #ACE1AF, #8FBC8F)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        opacity: animate ? 1 : 0, transform: animate ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s"
      }}>
        <div style={{ textAlign: "left" }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#0a0a0a" }}>러닝 인증하기</div>
          <div style={{ fontSize: 10, color: "rgba(0,0,0,0.45)", marginTop: 2, fontFamily: "'Space Mono', monospace" }}>나이키 런클럽 캡쳐 업로드</div>
        </div>
        <span style={{ fontSize: 22, color: "#0a0a0a" }}>→</span>
      </button>

      <div style={{ display: "flex", gap: 10, margin: "16px 20px 0", opacity: animate ? 1 : 0, transition: "opacity 0.6s ease 0.3s" }}>
        <div style={{ flex: 1, padding: "18px 14px", borderRadius: 16, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
          <div style={{ fontSize: 10, color: "rgba(172,225,175,0.4)", fontFamily: "'Space Mono', monospace", letterSpacing: 1 }}>정기 러닝</div>
          <div style={{ fontSize: 14, color: "#fff", fontWeight: 600, marginTop: 8 }}>2월 22일 (토)</div>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", marginTop: 4 }}>여의도 한강공원</div>
        </div>
        <div style={{ flex: 1, padding: "18px 14px", borderRadius: 16, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
          <div style={{ fontSize: 10, color: "rgba(172,225,175,0.4)", fontFamily: "'Space Mono', monospace", letterSpacing: 1 }}>기부 마감</div>
          <div style={{ fontSize: 14, color: "#fff", fontWeight: 600, marginTop: 8 }}>2월 28일 (금)</div>
          <div style={{ fontSize: 10, color: "#ACE1AF", marginTop: 4 }}>D-14</div>
        </div>
      </div>

      <div style={{
        margin: "16px 20px 0", padding: "18px", borderRadius: 16,
        background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)",
        opacity: animate ? 1 : 0, transition: "opacity 0.6s ease 0.4s"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", fontFamily: "'Space Mono', monospace" }}>🕊️ 10만km 목표 달성률</span>
          <span style={{ fontSize: 11, color: "#ACE1AF", fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 }}>72%</span>
        </div>
        <div style={{ height: 5, borderRadius: 3, background: "rgba(255,255,255,0.05)", overflow: "hidden" }}>
          <div style={{
            height: "100%", borderRadius: 3, width: animate ? "72%" : "0%",
            background: "linear-gradient(90deg, #ACE1AF, #8FBC8F)",
            transition: "width 1.5s cubic-bezier(0.16, 1, 0.3, 1) 0.5s",
            boxShadow: "0 0 12px rgba(172,225,175,0.3)"
          }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
          <span style={{ fontSize: 10, color: "rgba(255,255,255,0.25)" }}>32명 참여</span>
          <span style={{ fontSize: 10, color: "rgba(255,255,255,0.25)" }}>72,000 / 100,000 km</span>
        </div>
      </div>

      <button onClick={() => setScreen(SCREENS.MEMBERS)} style={{
        margin: "16px 20px 0", width: "calc(100% - 40px)", padding: "14px 20px",
        borderRadius: 14, cursor: "pointer",
        background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        opacity: animate ? 1 : 0, transition: "opacity 0.6s ease 0.5s"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 14 }}>📋</span>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", fontWeight: 500 }}>멤버별 기부증서 보기</span>
        </div>
        <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 14 }}>→</span>
      </button>
    </div>
  );
}

// ─── UPLOAD ───
function UploadScreen({ setScreen, setUserData }) {
  const [step, setStep] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  const [km, setKm] = useState(null);
  const handleUpload = () => { setStep(1); setTimeout(() => { setKm(42); setStep(2); }, 2500); };
  const handleConfirm = () => { setUserData(prev => ({ ...prev, totalKm: prev.totalKm + km })); setScreen(SCREENS.RESULT); };

  return (
    <div style={{ height: "100%", overflowY: "auto", paddingBottom: 90, background: "linear-gradient(180deg, #0a0a0a 0%, #0d1a12 100%)" }}>
      <ScreenHeader label="UPLOAD" title="러닝 인증" />
      {step === 0 && (
        <div style={{ padding: "0 20px" }}>
          <div style={{ padding: "14px 18px", borderRadius: 12, marginBottom: 20, background: "rgba(172,225,175,0.05)", border: "1px solid rgba(172,225,175,0.08)" }}>
            <div style={{ fontSize: 11, color: "#ACE1AF", fontWeight: 600, marginBottom: 6 }}>📱 인증 방법</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", lineHeight: 1.9 }}>1. 나이키 런클럽 앱 → 활동 탭<br />2. 월간 러닝 기록 캡쳐<br />3. 아래에 이미지 업로드</div>
          </div>
          <div onClick={handleUpload} onDragOver={e => { e.preventDefault(); setDragOver(true); }} onDragLeave={() => setDragOver(false)}
            style={{ border: `2px dashed ${dragOver ? "#ACE1AF" : "rgba(172,225,175,0.12)"}`, borderRadius: 20, padding: "56px 20px", textAlign: "center", cursor: "pointer", transition: "all 0.3s ease", background: dragOver ? "rgba(172,225,175,0.04)" : "transparent" }}>
            <div style={{ fontSize: 44, marginBottom: 16, opacity: 0.5 }}>📷</div>
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, fontWeight: 500 }}>나이키 런클럽 캡쳐 업로드</div>
            <div style={{ color: "rgba(255,255,255,0.2)", fontSize: 10, marginTop: 8, fontFamily: "'Space Mono', monospace" }}>탭하여 이미지 선택</div>
          </div>
        </div>
      )}
      {step === 1 && (
        <div style={{ padding: "80px 20px", textAlign: "center" }}>
          <div style={{ width: 72, height: 72, margin: "0 auto 24px", borderRadius: "50%", border: "2.5px solid rgba(172,225,175,0.15)", borderTopColor: "#ACE1AF", animation: "spin 1s linear infinite" }} />
          <div style={{ color: "#ACE1AF", fontSize: 13, fontWeight: 600 }}>러닝 기록 분석 중...</div>
        </div>
      )}
      {step === 2 && km && (
        <div style={{ padding: "32px 20px", textAlign: "center" }}>
          <div style={{ borderRadius: 24, padding: "36px 24px", background: "linear-gradient(145deg, rgba(172,225,175,0.08), rgba(172,225,175,0.02))", border: "1px solid rgba(172,225,175,0.12)" }}>
            <div style={{ width: 56, height: 56, margin: "0 auto 18px", borderRadius: "50%", background: "rgba(172,225,175,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, color: "#ACE1AF" }}>✓</div>
            <div style={{ color: "rgba(172,225,175,0.4)", fontSize: 10, letterSpacing: 3, fontFamily: "'Space Mono', monospace" }}>분석 완료</div>
            <div style={{ fontSize: 60, fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: "#ACE1AF", lineHeight: 1, margin: "14px 0 8px" }}>
              {km}<span style={{ fontSize: 22, color: "rgba(172,225,175,0.4)", fontWeight: 400 }}>KM</span>
            </div>
            <div style={{ height: 1, background: "rgba(172,225,175,0.08)", margin: "20px 0" }} />
            <div style={{ display: "flex", justifyContent: "center", gap: 36 }}>
              <div><div style={{ color: "rgba(255,255,255,0.3)", fontSize: 9, fontFamily: "'Space Mono', monospace" }}>1KM 당</div><div style={{ color: "#fff", fontSize: 17, fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, marginTop: 4 }}>500원</div></div>
              <div><div style={{ color: "rgba(255,255,255,0.3)", fontSize: 9, fontFamily: "'Space Mono', monospace" }}>기부 금액</div><div style={{ color: "#ACE1AF", fontSize: 17, fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, marginTop: 4 }}>{(km * 500).toLocaleString()}원</div></div>
            </div>
          </div>
          <div style={{ margin: "16px 0", padding: "18px", borderRadius: 16, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", textAlign: "left" }}>
            <div style={{ fontSize: 11, color: "rgba(172,225,175,0.5)", fontFamily: "'Space Mono', monospace", marginBottom: 12 }}>🕊️ 기부 계좌 (중동난민 후원)</div>
            {[["은행", "카카오뱅크"], ["계좌번호", "3333-12-3456789"], ["예금주", "셀라돈 기부런"]].map(([l, v], i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: i < 2 ? 8 : 0 }}>
                <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 11 }}>{l}</span>
                <span style={{ color: "#fff", fontSize: 11, fontWeight: 600, fontFamily: l === "계좌번호" ? "'Space Mono', monospace" : "inherit" }}>{v}</span>
              </div>
            ))}
            <div style={{ height: 1, background: "rgba(255,255,255,0.04)", margin: "12px 0" }} />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 11 }}>입금액</span>
              <span style={{ color: "#ACE1AF", fontSize: 14, fontWeight: 700 }}>{(km * 500).toLocaleString()}원</span>
            </div>
          </div>
          <button onClick={handleConfirm} style={{ width: "100%", padding: "16px", borderRadius: 16, border: "none", cursor: "pointer", background: "linear-gradient(135deg, #ACE1AF, #8FBC8F)", fontSize: 14, fontWeight: 700, color: "#0a0a0a" }}>입금 완료 확인</button>
        </div>
      )}
    </div>
  );
}

// ─── RESULT ───
function ResultScreen({ setScreen, userData }) {
  const [show, setShow] = useState(false);
  useEffect(() => { setTimeout(() => setShow(true), 100); }, []);
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 24px", paddingBottom: 90, background: "linear-gradient(180deg, #0a0a0a 0%, #0d2818 100%)", textAlign: "center" }}>
      <div style={{ width: 90, height: 90, borderRadius: "50%", background: "linear-gradient(135deg, rgba(172,225,175,0.15), rgba(172,225,175,0.03))", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 28, opacity: show ? 1 : 0, transform: show ? "scale(1)" : "scale(0.5)", transition: "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)" }}>
        <span style={{ fontSize: 42 }}>🕊️</span>
      </div>
      <div style={{ opacity: show ? 1 : 0, transform: show ? "translateY(0)" : "translateY(20px)", transition: "all 0.6s ease 0.2s" }}>
        <div style={{ fontSize: 12, color: "rgba(172,225,175,0.4)", fontFamily: "'Space Mono', monospace", letterSpacing: 3 }}>THANK YOU</div>
        <div style={{ fontSize: 28, fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, color: "#ACE1AF", marginTop: 8 }}>기부 완료!</div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginTop: 12, lineHeight: 1.8 }}>당신의 이유 있는 러닝이<br />세상을 더 따뜻하게 만들었습니다</div>
      </div>
      <div style={{ marginTop: 36, padding: "18px 36px", borderRadius: 16, background: "rgba(172,225,175,0.05)", border: "1px solid rgba(172,225,175,0.08)", opacity: show ? 1 : 0, transition: "opacity 0.6s ease 0.4s" }}>
        <div style={{ fontSize: 32, fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: "#fff" }}>{(userData.totalKm * 500).toLocaleString()}<span style={{ fontSize: 14, color: "rgba(255,255,255,0.3)", fontWeight: 400 }}>원</span></div>
        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", fontFamily: "'Space Mono', monospace", marginTop: 4 }}>누적 기부 금액</div>
      </div>
      <div style={{ display: "flex", gap: 12, marginTop: 28, opacity: show ? 1 : 0, transition: "opacity 0.6s ease 0.5s" }}>
        <button onClick={() => setScreen(SCREENS.CERTIFICATE)} style={{ padding: "14px 28px", borderRadius: 14, cursor: "pointer", background: "transparent", border: "1.5px solid rgba(172,225,175,0.2)", fontSize: 13, fontWeight: 600, color: "#ACE1AF" }}>기부증서 보기</button>
        <button onClick={() => setScreen(SCREENS.HOME)} style={{ padding: "14px 28px", borderRadius: 14, border: "none", cursor: "pointer", background: "linear-gradient(135deg, #ACE1AF, #8FBC8F)", fontSize: 13, fontWeight: 700, color: "#0a0a0a" }}>홈으로</button>
      </div>
    </div>
  );
}

// ─── CERTIFICATE ───
function CertificateScreen({ setScreen, member }) {
  const [show, setShow] = useState(false);
  useEffect(() => { setTimeout(() => setShow(true), 150); }, []);
  const data = member || { name: "신민규", km: 72, totalDonation: 216000, months: 6, period: "2026.01.01 ~ 2026.01.31" };
  const donationAmount = (data.km * 500).toLocaleString();

  return (
    <div style={{ height: "100%", overflowY: "auto", paddingBottom: 30, background: "linear-gradient(180deg, #0a0a0a 0%, #0d1a12 100%)", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ width: "100%", padding: "50px 24px 10px" }}>
        <button onClick={() => setScreen(member ? SCREENS.MEMBERS : SCREENS.MYPAGE)} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.4)", fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}>← 돌아가기</button>
      </div>
      <div style={{
        margin: "10px 20px", width: "calc(100% - 40px)",
        opacity: show ? 1 : 0, transform: show ? "scale(1)" : "scale(0.95)",
        transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        background: "linear-gradient(170deg, #f8f7f4 0%, #f2f1ee 50%, #f8f7f4 100%)",
        borderRadius: 8, position: "relative", boxShadow: "0 8px 40px rgba(0,0,0,0.4)"
      }}>
        <div style={{ position: "absolute", top: 12, left: 12, right: 12, bottom: 12, border: "1.5px solid #c8c6c0", borderRadius: 4, pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: 18, left: 18, width: 20, height: 20, borderTop: "2px solid #a0a09a", borderLeft: "2px solid #a0a09a" }} />
        <div style={{ position: "absolute", top: 18, right: 18, width: 20, height: 20, borderTop: "2px solid #a0a09a", borderRight: "2px solid #a0a09a" }} />
        <div style={{ position: "absolute", bottom: 18, left: 18, width: 20, height: 20, borderBottom: "2px solid #a0a09a", borderLeft: "2px solid #a0a09a" }} />
        <div style={{ position: "absolute", bottom: 18, right: 18, width: 20, height: 20, borderBottom: "2px solid #a0a09a", borderRight: "2px solid #a0a09a" }} />

        <div style={{ padding: "48px 32px 40px", textAlign: "center" }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontWeight: 400, fontSize: 22, color: "#b0aea8", letterSpacing: 1, marginBottom: 6 }}>Celadon Donation Running</div>
          <div style={{ fontSize: 32, fontWeight: 800, color: "#2a2a28", letterSpacing: 8, marginBottom: 36 }}>기부증서</div>
          <div style={{ textAlign: "right", paddingRight: 8, fontSize: 18, fontWeight: 700, color: "#2a2a28", marginBottom: 32 }}>{data.name}님</div>
          <div style={{ fontSize: 13, color: "#4a4a48", lineHeight: 2.2, textAlign: "center", padding: "0 8px", wordBreak: "keep-all" }}>
            중동 난민들을 위한 스포츠 학교 건립을 목표로 한<br />10만 km 달리기 "이유 있는 러닝"에 참여해 주셔서<br />진심으로 감사드립니다. 당신의 이유 있는 러닝은<br />세상을 더 따뜻하게 만들었습니다.
          </div>
          <div style={{ marginTop: 36, marginBottom: 36 }}>
            <div style={{ fontSize: 12, color: "#5a5a58", letterSpacing: 0.5 }}>참여 기간 ({data.period})</div>
            <div style={{ fontSize: 12, color: "#5a5a58", marginTop: 6, letterSpacing: 0.5 }}>기부금액 {donationAmount}원</div>
          </div>
          <div style={{ fontSize: 17, fontWeight: 700, color: "#2a2a28", letterSpacing: 2, marginBottom: 36 }}>2026년 1월 31일</div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            <span style={{ fontSize: 12, color: "#6a6a68", letterSpacing: 1 }}>셀라돈 대표</span>
            <span style={{ fontSize: 22, fontWeight: 700, color: "#2a2a28", letterSpacing: 8 }}>정 영 민</span>
            <div style={{ width: 44, height: 44, borderRadius: 6, border: "2.5px solid #c53030", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", marginLeft: 4, transform: "rotate(-3deg)" }}>
              <span style={{ fontSize: 8, fontWeight: 800, color: "#c53030", lineHeight: 1.1, letterSpacing: 1 }}>셀라</span>
              <span style={{ fontSize: 8, fontWeight: 800, color: "#c53030", lineHeight: 1.1, letterSpacing: 1 }}>돈</span>
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
        <button style={{ padding: "12px 24px", borderRadius: 14, cursor: "pointer", background: "transparent", border: "1.5px solid rgba(172,225,175,0.2)", fontSize: 12, fontWeight: 600, color: "#ACE1AF" }}>이미지 저장</button>
        <button style={{ padding: "12px 24px", borderRadius: 14, border: "none", cursor: "pointer", background: "linear-gradient(135deg, #ACE1AF, #8FBC8F)", fontSize: 12, fontWeight: 700, color: "#0a0a0a" }}>증서 공유하기</button>
      </div>
    </div>
  );
}

// ─── MEMBERS ───
function MembersScreen({ setScreen, setSelectedMember }) {
  const [animate, setAnimate] = useState(false);
  useEffect(() => { setTimeout(() => setAnimate(true), 100); }, []);
  return (
    <div style={{ height: "100%", overflowY: "auto", paddingBottom: 90, background: "linear-gradient(180deg, #0a0a0a 0%, #0d1a12 100%)" }}>
      <div style={{ padding: "50px 24px 10px" }}><button onClick={() => setScreen(SCREENS.HOME)} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.4)", fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}>← 홈으로</button></div>
      <div style={{ padding: "8px 24px 20px" }}>
        <div style={{ color: "rgba(172,225,175,0.4)", fontSize: 10, fontFamily: "'Space Mono', monospace", letterSpacing: 3 }}>MEMBERS</div>
        <div style={{ color: "#fff", fontSize: 20, fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, marginTop: 4 }}>멤버별 기부증서</div>
        <div style={{ color: "rgba(255,255,255,0.25)", fontSize: 11, marginTop: 6 }}>멤버를 탭하면 기부증서를 확인할 수 있습니다</div>
      </div>
      <div style={{ padding: "0 20px" }}>
        {MEMBERS_DATA.map((member, i) => (
          <button key={member.id} onClick={() => { setSelectedMember(member); setScreen(SCREENS.CERTIFICATE); }} style={{
            width: "100%", display: "flex", alignItems: "center", padding: "16px",
            borderRadius: 14, marginBottom: 8, cursor: "pointer", textAlign: "left",
            background: member.isMe ? "rgba(172,225,175,0.05)" : "rgba(255,255,255,0.02)",
            border: member.isMe ? "1px solid rgba(172,225,175,0.1)" : "1px solid rgba(255,255,255,0.04)",
            opacity: animate ? 1 : 0, transform: animate ? "translateY(0)" : "translateY(12px)",
            transition: `all 0.4s ease ${0.05 * i}s`
          }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: member.isMe ? "rgba(172,225,175,0.12)" : "rgba(255,255,255,0.04)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, marginRight: 14 }}>{member.avatar}</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: member.isMe ? "#ACE1AF" : "#fff" }}>{member.name}</span>
                {member.isMe && <span style={{ fontSize: 8, padding: "1px 6px", borderRadius: 10, background: "rgba(172,225,175,0.12)", color: "#ACE1AF" }}>ME</span>}
              </div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", marginTop: 3 }}>{member.months}개월 참여 · 누적 {member.totalDonation.toLocaleString()}원</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 14, color: "#ACE1AF", fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 }}>{member.km}km</div>
              <div style={{ fontSize: 9, color: "rgba(255,255,255,0.2)", marginTop: 2 }}>{(member.km * 500).toLocaleString()}원</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── LEADERBOARD ───
function LeaderboardScreen() {
  const [animate, setAnimate] = useState(false);
  useEffect(() => { setTimeout(() => setAnimate(true), 100); }, []);
  const leaders = [...MEMBERS_DATA].sort((a, b) => b.km - a.km);
  return (
    <div style={{ height: "100%", overflowY: "auto", paddingBottom: 90, background: "linear-gradient(180deg, #0a0a0a 0%, #0d1a12 100%)" }}>
      <ScreenHeader label="LEADERBOARD" title="기부왕 랭킹" />
      <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-end", gap: 10, padding: "16px 20px 28px", opacity: animate ? 1 : 0, transition: "opacity 0.6s ease" }}>
        {[leaders[1], leaders[0], leaders[2]].map((l, idx) => {
          const pos = idx === 1 ? 0 : idx === 0 ? 1 : 2;
          const colors = [["#ACE1AF", "rgba(172,225,175,0.1)", "rgba(172,225,175,0.12)"], ["#C0C0C0", "rgba(192,192,192,0.06)", "rgba(192,192,192,0.08)"], ["#CD7F32", "rgba(205,127,50,0.05)", "rgba(205,127,50,0.07)"]];
          const heights = [28, 20, 14]; const medals = ["🥇", "🥈", "🥉"];
          return (<div key={pos} style={{ textAlign: "center", flex: 1 }}><div style={{ fontSize: idx === 1 ? 32 : 24, marginBottom: 6 }}>{medals[pos]}</div><div style={{ padding: `${heights[pos]}px 0`, borderRadius: "14px 14px 0 0", background: colors[pos][1], border: `1px solid ${colors[pos][2]}`, borderBottom: "none" }}><div style={{ fontSize: 12, color: colors[pos][0], fontWeight: 600 }}>{l.name}</div><div style={{ fontSize: idx === 1 ? 22 : 17, color: colors[pos][0], fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, marginTop: 4 }}>{l.km}km</div><div style={{ fontSize: 9, color: "rgba(255,255,255,0.25)", marginTop: 2 }}>{(l.km * 500).toLocaleString()}원</div></div></div>);
        })}
      </div>
      <div style={{ padding: "0 20px" }}>
        {leaders.slice(3).map((leader, i) => (
          <div key={leader.id} style={{ display: "flex", alignItems: "center", padding: "14px 16px", borderRadius: 12, marginBottom: 6, background: leader.isMe ? "rgba(172,225,175,0.05)" : "rgba(255,255,255,0.02)", border: leader.isMe ? "1px solid rgba(172,225,175,0.08)" : "1px solid rgba(255,255,255,0.03)", opacity: animate ? 1 : 0, transform: animate ? "translateX(0)" : "translateX(-16px)", transition: `all 0.4s ease ${0.08 * i}s` }}>
            <div style={{ width: 24, fontSize: 12, color: "rgba(255,255,255,0.25)", fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 }}>{i + 4}</div>
            <div style={{ flex: 1 }}><span style={{ fontSize: 13, fontWeight: 600, color: leader.isMe ? "#ACE1AF" : "#fff" }}>{leader.name}</span>{leader.isMe && <span style={{ marginLeft: 6, fontSize: 8, padding: "1px 6px", borderRadius: 10, background: "rgba(172,225,175,0.12)", color: "#ACE1AF" }}>ME</span>}</div>
            <div style={{ textAlign: "right" }}><div style={{ fontSize: 14, color: "#fff", fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 }}>{leader.km}km</div><div style={{ fontSize: 9, color: "rgba(255,255,255,0.25)" }}>{(leader.km * 500).toLocaleString()}원</div></div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── EVENT ───
function EventScreen() {
  const [animate, setAnimate] = useState(false);
  useEffect(() => { setTimeout(() => setAnimate(true), 100); }, []);
  const rewards = [
    { icon: "🏆", tier: "1등 · 기부왕", prize: "안다르 의류 + 볼트 클래스 4주 수강권", color: "#FFD700", condition: "월간 최다 러닝" },
    { icon: "🥈", tier: "200K 달성", prize: "안다르 의류", color: "#C0C0C0", condition: "누적 기부금 200,000원" },
    { icon: "🥉", tier: "100K 달성", prize: "초당약품 멀티비타민 & 건강기능식품", color: "#CD7F32", condition: "누적 기부금 100,000원" },
    { icon: "⚡", tier: "베스트 인증상", prize: "🤫 추후 공개!", color: "#ACE1AF", condition: "가장 창의적인 인증샷" },
  ];
  return (
    <div style={{ height: "100%", overflowY: "auto", paddingBottom: 90, background: "linear-gradient(180deg, #0a0a0a 0%, #0d1a12 100%)" }}>
      <ScreenHeader label="REWARDS" title="기부왕 리워드" />
      <div style={{ padding: "0 24px 8px" }}><div style={{ color: "rgba(255,255,255,0.25)", fontSize: 11 }}>매달 리워드가 변경됩니다</div></div>
      <div style={{ margin: "8px 20px 16px", padding: "12px 18px", borderRadius: 12, background: "rgba(172,225,175,0.04)", border: "1px solid rgba(172,225,175,0.08)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 12, color: "#ACE1AF", fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, letterSpacing: 2 }}>2026년 2월 리워드</span>
        <span style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", fontFamily: "'Space Mono', monospace" }}>D-14</span>
      </div>
      <div style={{ padding: "0 20px" }}>
        {rewards.map((r, i) => (
          <div key={i} style={{ padding: "22px 18px", borderRadius: 18, marginBottom: 10, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", opacity: animate ? 1 : 0, transform: animate ? "translateY(0)" : "translateY(16px)", transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 * i}s` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <span style={{ fontSize: 26 }}>{r.icon}</span>
              <div><div style={{ fontSize: 13, color: r.color, fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 }}>{r.tier}</div><div style={{ fontSize: 9, color: "rgba(255,255,255,0.25)", marginTop: 2, fontFamily: "'Space Mono', monospace" }}>{r.condition}</div></div>
            </div>
            <div style={{ padding: "10px 14px", borderRadius: 10, background: "rgba(255,255,255,0.02)", fontSize: 12, color: "rgba(255,255,255,0.6)", fontWeight: 500 }}>{r.prize}</div>
          </div>
        ))}
      </div>
      <div style={{ margin: "8px 20px", padding: "14px 18px", borderRadius: 12, background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.03)" }}>
        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", lineHeight: 1.8 }}>※ 리워드는 월말 랭킹 확정 후 지급됩니다<br />※ 기부 인증 미완료 시 리워드 대상에서 제외됩니다<br />※ 리워드 내용은 매달 변동될 수 있습니다</div>
      </div>
    </div>
  );
}

// ─── MY PAGE ───
function MyPageScreen({ userData, setScreen }) {
  const [animate, setAnimate] = useState(false);
  useEffect(() => { setTimeout(() => setAnimate(true), 100); }, []);
  const history = [
    { month: "2026.01", km: 38, amount: 19000, status: "완료" },
    { month: "2025.12", km: 45, amount: 22500, status: "완료" },
    { month: "2025.11", km: 52, amount: 26000, status: "완료" },
    { month: "2025.10", km: 29, amount: 14500, status: "완료" },
  ];
  const totalKmAll = userData.totalKm + 164;
  return (
    <div style={{ height: "100%", overflowY: "auto", paddingBottom: 90, background: "linear-gradient(180deg, #0a0a0a 0%, #0d1a12 100%)" }}>
      <ScreenHeader label="MY PAGE" title="마이페이지" />
      <div style={{ margin: "0 20px", padding: "22px", borderRadius: 20, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center", gap: 16, opacity: animate ? 1 : 0, transition: "opacity 0.5s ease" }}>
        <div style={{ width: 52, height: 52, borderRadius: "50%", background: "linear-gradient(135deg, #ACE1AF, #8FBC8F)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 700, color: "#0a0a0a" }}>신</div>
        <div><div style={{ fontSize: 17, color: "#fff", fontWeight: 700 }}>신민규</div><div style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", fontFamily: "'Space Mono', monospace", marginTop: 3 }}>셀라돈 러너 · 6개월째</div></div>
      </div>
      <div style={{ display: "flex", gap: 10, margin: "14px 20px 0" }}>
        {[{ label: "총 러닝", value: `${totalKmAll}km` }, { label: "총 기부", value: `${(totalKmAll * 500).toLocaleString()}원` }, { label: "랭킹", value: "6위" }].map((s, i) => (
          <div key={i} style={{ flex: 1, padding: "14px 10px", borderRadius: 14, textAlign: "center", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)", opacity: animate ? 1 : 0, transition: `opacity 0.5s ease ${0.1 * i}s` }}>
            <div style={{ fontSize: 9, color: "rgba(255,255,255,0.25)", fontFamily: "'Space Mono', monospace", letterSpacing: 1 }}>{s.label}</div>
            <div style={{ fontSize: 15, color: "#ACE1AF", fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, marginTop: 6 }}>{s.value}</div>
          </div>
        ))}
      </div>
      <button onClick={() => setScreen(SCREENS.CERTIFICATE)} style={{
        margin: "14px 20px 0", width: "calc(100% - 40px)", padding: "16px 20px",
        borderRadius: 16, cursor: "pointer",
        background: "linear-gradient(135deg, rgba(172,225,175,0.08), rgba(172,225,175,0.02))",
        border: "1px solid rgba(172,225,175,0.1)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        opacity: animate ? 1 : 0, transition: "opacity 0.5s ease 0.2s"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 18 }}>🕊️</span>
          <div style={{ textAlign: "left" }}><div style={{ fontSize: 13, color: "#ACE1AF", fontWeight: 600 }}>내 기부증서 보기</div><div style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", marginTop: 2 }}>이번 달 기부 내역 증서</div></div>
        </div>
        <span style={{ color: "rgba(172,225,175,0.4)", fontSize: 14 }}>→</span>
      </button>
      <div style={{ padding: "20px 20px 0" }}>
        <div style={{ fontSize: 11, color: "rgba(172,225,175,0.4)", fontFamily: "'Space Mono', monospace", letterSpacing: 2, marginBottom: 14 }}>기부 히스토리</div>
        {history.map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", borderRadius: 12, marginBottom: 6, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.03)", opacity: animate ? 1 : 0, transition: `opacity 0.4s ease ${0.15 * i}s` }}>
            <div><div style={{ fontSize: 12, color: "#fff", fontWeight: 600 }}>{item.month}</div><div style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", marginTop: 2 }}>{item.km}km 러닝</div></div>
            <div style={{ textAlign: "right" }}><div style={{ fontSize: 13, color: "#ACE1AF", fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 }}>{item.amount.toLocaleString()}원</div><div style={{ fontSize: 8, color: "rgba(172,225,175,0.5)", marginTop: 2, padding: "1px 6px", borderRadius: 8, background: "rgba(172,225,175,0.06)", display: "inline-block" }}>{item.status}</div></div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── MAIN APP ───
export default function CeladonApp() {
  const [screen, setScreen] = useState(SCREENS.SPLASH);
  const [userData, setUserData] = useState({ totalKm: 72, runCount: 12 });
  const [selectedMember, setSelectedMember] = useState(null);

  const handleSetScreen = (s) => {
    if (s !== SCREENS.CERTIFICATE) setSelectedMember(null);
    setScreen(s);
  };

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
      <div style={{
        width: "100%", maxWidth: 390, height: "100vh", maxHeight: 844,
        margin: "0 auto", position: "relative", overflow: "hidden",
        background: "#0a0a0a", fontFamily: "'Noto Sans KR', sans-serif",
        borderRadius: typeof window !== 'undefined' && window.innerWidth > 500 ? 40 : 0,
        boxShadow: "0 0 100px rgba(172,225,175,0.03)"
      }}>
        {screen === SCREENS.SPLASH && <SplashScreen onFinish={() => setScreen(SCREENS.LOGIN)} />}
        {screen === SCREENS.LOGIN && <LoginScreen setScreen={handleSetScreen} />}
        {screen === SCREENS.SIGNUP && <SignupScreen setScreen={handleSetScreen} />}
        {screen === SCREENS.HOME && <HomeScreen setScreen={handleSetScreen} userData={userData} />}
        {screen === SCREENS.UPLOAD && <UploadScreen setScreen={handleSetScreen} setUserData={setUserData} />}
        {screen === SCREENS.RESULT && <ResultScreen setScreen={handleSetScreen} userData={userData} />}
        {screen === SCREENS.LEADERBOARD && <LeaderboardScreen />}
        {screen === SCREENS.EVENT && <EventScreen />}
        {screen === SCREENS.MYPAGE && <MyPageScreen userData={userData} setScreen={handleSetScreen} />}
        {screen === SCREENS.CERTIFICATE && <CertificateScreen setScreen={handleSetScreen} member={selectedMember} />}
        {screen === SCREENS.MEMBERS && <MembersScreen setScreen={handleSetScreen} setSelectedMember={setSelectedMember} />}
        {![SCREENS.SPLASH, SCREENS.LOGIN, SCREENS.SIGNUP, SCREENS.RESULT, SCREENS.CERTIFICATE, SCREENS.MEMBERS].includes(screen) && <NavBar screen={screen} setScreen={handleSetScreen} />}
      </div>
    </>
  );
}
