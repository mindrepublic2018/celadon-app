import { useState, useEffect } from "react";

// ─── MOCK DATA ───
const initialMembers = [
  { id: 1, name: "김러너", fullName: "김지훈", email: "kim@email.com", phone: "010-1234-5678", affiliation: "나이키런클럽", instagram: "kim_runner", birthday: "1992.03.15", km: 157, donation: 78500, totalDonation: 468000, status: "완료", joinDate: "2025.07", months: 8 },
  { id: 2, name: "박마라톤", fullName: "박서연", email: "park@email.com", phone: "010-2345-6789", affiliation: "한강러닝크루", instagram: "park_marathon", birthday: "1988.11.22", km: 132, donation: 66000, totalDonation: 396000, status: "완료", joinDate: "2025.09", months: 6 },
  { id: 3, name: "이스프린트", fullName: "이준호", email: "lee@email.com", phone: "010-3456-7890", affiliation: "스프린트서울", instagram: "lee_sprint", birthday: "1995.06.08", km: 98, donation: 49000, totalDonation: 245000, status: "대기", joinDate: "2025.10", months: 5 },
  { id: 4, name: "최달리기", fullName: "최민지", email: "choi@email.com", phone: "010-4567-8901", affiliation: "러닝맨즈", instagram: "choi_run", birthday: "1990.01.30", km: 87, donation: 43500, totalDonation: 304500, status: "완료", joinDate: "2025.08", months: 7 },
  { id: 5, name: "이도권", fullName: "이도권", email: "dokwon@email.com", phone: "010-5678-9012", affiliation: "셀라돈", instagram: "dokwon_lee", birthday: "1993.09.14", km: 157, donation: 78500, totalDonation: 471000, status: "완료", joinDate: "2025.09", months: 6 },
  { id: 6, name: "신민규", fullName: "신민규", email: "shin@email.com", phone: "010-6789-0123", affiliation: "마인드리퍼블릭", instagram: "shin_mk", birthday: "1991.05.20", km: 72, donation: 36000, totalDonation: 216000, status: "완료", joinDate: "2025.09", months: 6 },
  { id: 7, name: "한조깅", fullName: "한소희", email: "han@email.com", phone: "010-7890-1234", affiliation: "조깅클럽", instagram: "han_jog", birthday: "1997.12.01", km: 65, donation: 32500, totalDonation: 97500, status: "대기", joinDate: "2025.12", months: 3 },
  { id: 8, name: "오마일", fullName: "오영석", email: "oh@email.com", phone: "010-8901-2345", affiliation: "마일러너스", instagram: "oh_mile", birthday: "1989.04.17", km: 54, donation: 27000, totalDonation: 135000, status: "완료", joinDate: "2025.10", months: 5 },
  { id: 9, name: "유트랙", fullName: "유나연", email: "yoo@email.com", phone: "010-9012-3456", affiliation: "트랙앤필드", instagram: "yoo_track", birthday: "1994.08.25", km: 48, donation: 24000, totalDonation: 96000, status: "미납", joinDate: "2025.11", months: 4 },
  { id: 10, name: "강페이스", fullName: "강동현", email: "kang@email.com", phone: "010-0123-4567", affiliation: "페이스메이커", instagram: "kang_pace", birthday: "1996.02.10", km: 41, donation: 20500, totalDonation: 61500, status: "미납", joinDate: "2025.12", months: 3 },
];

const initialRewards = [
  { id: 1, tier: "1등 · 기부왕", condition: "월간 최다 러닝", prize: "안다르 의류 + 볼트 클래스 4주 수강권", icon: "🏆", active: true },
  { id: 2, tier: "200K 달성", condition: "누적 기부금 200,000원", prize: "안다르 의류", icon: "🥈", active: true },
  { id: 3, tier: "100K 달성", condition: "누적 기부금 100,000원", prize: "초당약품 멀티비타민 & 건강기능식품", icon: "🥉", active: true },
  { id: 4, tier: "베스트 인증상", condition: "가장 창의적인 인증샷", prize: "추후 공개", icon: "⚡", active: true },
];

const TABS = { DASHBOARD: "dashboard", MEMBERS: "members", DONATIONS: "donations", REWARDS: "rewards" };

// ─── STYLES ───
const adminBg = "#0f1117";
const cardBg = "rgba(255,255,255,0.03)";
const cardBorder = "1px solid rgba(255,255,255,0.06)";
const accent = "#ACE1AF";

const adminInputStyle = {
  width: "100%", padding: "10px 12px", borderRadius: 8,
  border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)",
  color: "#fff", fontSize: 13, outline: "none", fontFamily: "'Noto Sans KR', sans-serif"
};

// ─── ADMIN LOGIN ───
function AdminLogin({ onLogin }) {
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);

  const handleLogin = () => {
    if (pw === "celadon2026") {
      onLogin();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div style={{
      height: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: `linear-gradient(180deg, ${adminBg} 0%, #0a1210 100%)`
    }}>
      <div style={{ width: "100%", maxWidth: 380, padding: "0 24px", textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "rgba(172,225,175,0.4)", fontFamily: "'Space Mono', monospace", letterSpacing: 4 }}>ADMIN</div>
        <div style={{ fontSize: 28, fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, color: accent, marginTop: 8, letterSpacing: 3 }}>CELADON</div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", marginTop: 8, marginBottom: 32 }}>관리자 로그인</div>
        <input
          type="password" placeholder="관리자 비밀번호"
          value={pw} onChange={e => setPw(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleLogin()}
          style={{ ...adminInputStyle, textAlign: "center", marginBottom: 16, borderColor: error ? "rgba(255,100,100,0.5)" : "rgba(255,255,255,0.1)" }}
        />
        {error && <div style={{ fontSize: 11, color: "rgba(255,100,100,0.7)", marginBottom: 12 }}>비밀번호가 올바르지 않습니다</div>}
        <button onClick={handleLogin} style={{
          width: "100%", padding: "14px", borderRadius: 10, border: "none", cursor: "pointer",
          background: `linear-gradient(135deg, ${accent}, #8FBC8F)`,
          fontSize: 14, fontWeight: 700, color: "#0a0a0a"
        }}>로그인</button>
        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.15)", marginTop: 20, fontFamily: "'Space Mono', monospace" }}>
          초기 비밀번호: celadon2026
        </div>
      </div>
    </div>
  );
}

// ─── STAT CARD ───
function StatCard({ label, value, sub, color = accent, icon }) {
  return (
    <div style={{
      padding: "20px 16px", borderRadius: 16, background: cardBg, border: cardBorder,
      flex: 1, minWidth: 0
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", fontFamily: "'Space Mono', monospace", letterSpacing: 1 }}>{label}</div>
          <div style={{ fontSize: 24, fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color, marginTop: 8 }}>{value}</div>
          {sub && <div style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", marginTop: 4 }}>{sub}</div>}
        </div>
        {icon && <span style={{ fontSize: 24, opacity: 0.5 }}>{icon}</span>}
      </div>
    </div>
  );
}

// ─── DASHBOARD TAB ───
function DashboardTab({ members }) {
  const totalKm = members.reduce((a, m) => a + m.km, 0);
  const totalDonation = members.reduce((a, m) => a + m.donation, 0);
  const paidCount = members.filter(m => m.status === "완료").length;
  const pendingCount = members.filter(m => m.status === "대기").length;
  const unpaidCount = members.filter(m => m.status === "미납").length;
  const goalProgress = ((totalKm / 100000) * 100).toFixed(1);

  const monthlyData = [
    { month: "10월", km: 680, donation: 340000 },
    { month: "11월", km: 820, donation: 410000 },
    { month: "12월", km: 750, donation: 375000 },
    { month: "1월", km: totalKm, donation: totalDonation },
  ];
  const maxKm = Math.max(...monthlyData.map(d => d.km));

  return (
    <div>
      <div style={{ fontSize: 18, fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, color: "#fff", marginBottom: 20 }}>대시보드</div>

      {/* Stats Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
        <StatCard label="총 멤버" value={`${members.length}명`} icon="👥" />
        <StatCard label="이번 달 총 거리" value={`${totalKm.toLocaleString()}km`} icon="🏃" />
        <StatCard label="이번 달 기부금" value={`${totalDonation.toLocaleString()}원`} icon="💚" />
        <StatCard label="10만km 달성률" value={`${goalProgress}%`} sub={`${totalKm.toLocaleString()} / 100,000 km`} icon="🎯" />
      </div>

      {/* Payment Status */}
      <div style={{ padding: "20px", borderRadius: 16, background: cardBg, border: cardBorder, marginBottom: 20 }}>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", fontFamily: "'Space Mono', monospace", letterSpacing: 1, marginBottom: 16 }}>이번 달 입금 현황</div>
        <div style={{ display: "flex", gap: 12 }}>
          {[
            { label: "완료", count: paidCount, color: "#ACE1AF", bg: "rgba(172,225,175,0.1)" },
            { label: "대기", count: pendingCount, color: "#FFD700", bg: "rgba(255,215,0,0.1)" },
            { label: "미납", count: unpaidCount, color: "#FF6B6B", bg: "rgba(255,107,107,0.1)" },
          ].map(s => (
            <div key={s.label} style={{ flex: 1, padding: "14px", borderRadius: 12, background: s.bg, textAlign: "center" }}>
              <div style={{ fontSize: 22, fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: s.color }}>{s.count}</div>
              <div style={{ fontSize: 10, color: s.color, marginTop: 4, opacity: 0.7 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Monthly Chart */}
      <div style={{ padding: "20px", borderRadius: 16, background: cardBg, border: cardBorder, marginBottom: 20 }}>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", fontFamily: "'Space Mono', monospace", letterSpacing: 1, marginBottom: 16 }}>월별 러닝 현황</div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 16, height: 120 }}>
          {monthlyData.map((d, i) => (
            <div key={i} style={{ flex: 1, textAlign: "center" }}>
              <div style={{ fontSize: 10, color: accent, marginBottom: 4, fontFamily: "'Space Mono', monospace" }}>{d.km}km</div>
              <div style={{
                height: `${(d.km / maxKm) * 80}px`, borderRadius: "6px 6px 0 0",
                background: i === monthlyData.length - 1 ? `linear-gradient(180deg, ${accent}, #8FBC8F)` : "rgba(172,225,175,0.15)",
                transition: "height 0.5s ease"
              }} />
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginTop: 6 }}>{d.month}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Runners */}
      <div style={{ padding: "20px", borderRadius: 16, background: cardBg, border: cardBorder }}>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", fontFamily: "'Space Mono', monospace", letterSpacing: 1, marginBottom: 16 }}>이번 달 TOP 5</div>
        {[...members].sort((a, b) => b.km - a.km).slice(0, 5).map((m, i) => (
          <div key={m.id} style={{ display: "flex", alignItems: "center", padding: "10px 0", borderBottom: i < 4 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
            <span style={{ width: 24, fontSize: 12, color: i < 3 ? accent : "rgba(255,255,255,0.3)", fontWeight: 600 }}>{i + 1}</span>
            <span style={{ flex: 1, fontSize: 13, color: "#fff", fontWeight: 500 }}>{m.name}</span>
            <span style={{ fontSize: 13, color: accent, fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 }}>{m.km}km</span>
            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", marginLeft: 12, width: 60, textAlign: "right" }}>{m.donation.toLocaleString()}원</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── MEMBERS TAB ───
function MembersTab({ members, setMembers }) {
  const [search, setSearch] = useState("");
  const [selectedMember, setSelectedMember] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({});

  const filtered = members.filter(m =>
    m.name.includes(search) || m.fullName.includes(search) || m.email.includes(search) || m.instagram.includes(search)
  );

  const handleStatusChange = (id, newStatus) => {
    setMembers(prev => prev.map(m => m.id === id ? { ...m, status: newStatus } : m));
    if (selectedMember?.id === id) setSelectedMember(prev => ({ ...prev, status: newStatus }));
  };

  const handleSaveEdit = () => {
    setMembers(prev => prev.map(m => m.id === editData.id ? { ...m, ...editData } : m));
    setSelectedMember(editData);
    setEditMode(false);
  };

  const statusColor = (s) => s === "완료" ? "#ACE1AF" : s === "대기" ? "#FFD700" : "#FF6B6B";

  if (selectedMember) {
    const m = editMode ? editData : selectedMember;
    return (
      <div>
        <button onClick={() => { setSelectedMember(null); setEditMode(false); }} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.4)", fontSize: 13, marginBottom: 16, display: "flex", alignItems: "center", gap: 6 }}>← 멤버 목록</button>

        <div style={{ padding: "24px", borderRadius: 16, background: cardBg, border: cardBorder, marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
            <div>
              <div style={{ fontSize: 20, color: "#fff", fontWeight: 700 }}>{m.fullName}</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", marginTop: 4 }}>@{m.instagram}</div>
            </div>
            {!editMode ? (
              <button onClick={() => { setEditMode(true); setEditData({ ...selectedMember }); }} style={{ padding: "8px 16px", borderRadius: 8, border: `1px solid rgba(172,225,175,0.2)`, background: "transparent", color: accent, fontSize: 12, cursor: "pointer" }}>수정</button>
            ) : (
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => setEditMode(false)} style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.1)", background: "transparent", color: "rgba(255,255,255,0.4)", fontSize: 12, cursor: "pointer" }}>취소</button>
                <button onClick={handleSaveEdit} style={{ padding: "8px 16px", borderRadius: 8, border: "none", background: accent, color: "#0a0a0a", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>저장</button>
              </div>
            )}
          </div>

          {editMode ? (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[
                ["이름(닉네임)", "name"], ["성함(실명)", "fullName"], ["이메일", "email"],
                ["연락처", "phone"], ["소속", "affiliation"], ["인스타그램", "instagram"],
                ["생년월일", "birthday"], ["이번 달 km", "km"],
              ].map(([label, key]) => (
                <div key={key}>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginBottom: 4 }}>{label}</div>
                  <input value={editData[key] || ""} onChange={e => setEditData(prev => ({ ...prev, [key]: key === "km" ? Number(e.target.value) || 0 : e.target.value }))} style={adminInputStyle} />
                </div>
              ))}
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {[
                ["이름", m.name], ["성함", m.fullName], ["이메일", m.email],
                ["연락처", m.phone], ["소속", m.affiliation], ["인스타", `@${m.instagram}`],
                ["생년월일", m.birthday], ["가입일", m.joinDate],
              ].map(([label, val]) => (
                <div key={label}>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", fontFamily: "'Space Mono', monospace" }}>{label}</div>
                  <div style={{ fontSize: 13, color: "#fff", marginTop: 4 }}>{val}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 16 }}>
          <div style={{ padding: "16px", borderRadius: 12, background: cardBg, border: cardBorder, textAlign: "center" }}>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)" }}>이번 달</div>
            <div style={{ fontSize: 18, color: accent, fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, marginTop: 4 }}>{selectedMember.km}km</div>
          </div>
          <div style={{ padding: "16px", borderRadius: 12, background: cardBg, border: cardBorder, textAlign: "center" }}>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)" }}>기부금</div>
            <div style={{ fontSize: 18, color: accent, fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, marginTop: 4 }}>{selectedMember.donation.toLocaleString()}원</div>
          </div>
          <div style={{ padding: "16px", borderRadius: 12, background: cardBg, border: cardBorder, textAlign: "center" }}>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)" }}>누적</div>
            <div style={{ fontSize: 18, color: "#fff", fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, marginTop: 4 }}>{selectedMember.totalDonation.toLocaleString()}원</div>
          </div>
        </div>

        {/* Status Change */}
        <div style={{ padding: "20px", borderRadius: 16, background: cardBg, border: cardBorder }}>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginBottom: 12 }}>입금 상태 변경</div>
          <div style={{ display: "flex", gap: 8 }}>
            {["완료", "대기", "미납"].map(s => (
              <button key={s} onClick={() => handleStatusChange(selectedMember.id, s)} style={{
                flex: 1, padding: "12px", borderRadius: 10, cursor: "pointer",
                background: selectedMember.status === s ? statusColor(s) : "transparent",
                border: `1.5px solid ${statusColor(s)}`,
                color: selectedMember.status === s ? "#0a0a0a" : statusColor(s),
                fontSize: 13, fontWeight: 600, transition: "all 0.2s ease"
              }}>{s}</button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div style={{ fontSize: 18, fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, color: "#fff" }}>멤버 관리</div>
        <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>총 {members.length}명</span>
      </div>

      {/* Search */}
      <input
        placeholder="🔍 이름, 이메일, 인스타 검색..."
        value={search} onChange={e => setSearch(e.target.value)}
        style={{ ...adminInputStyle, marginBottom: 16 }}
      />

      {/* Member List */}
      {filtered.map(m => (
        <button key={m.id} onClick={() => setSelectedMember(m)} style={{
          width: "100%", display: "flex", alignItems: "center", padding: "14px 16px",
          borderRadius: 12, marginBottom: 8, cursor: "pointer", textAlign: "left",
          background: cardBg, border: cardBorder
        }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(172,225,175,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, marginRight: 12, color: accent, fontWeight: 700 }}>
            {m.fullName[0]}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>{m.name}</span>
              <span style={{ fontSize: 10, color: "rgba(255,255,255,0.25)" }}>({m.fullName})</span>
            </div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", marginTop: 2 }}>@{m.instagram} · {m.affiliation}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 13, color: accent, fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 }}>{m.km}km</div>
            <div style={{
              fontSize: 9, marginTop: 3, padding: "2px 8px", borderRadius: 10,
              background: `${statusColor(m.status)}15`, color: statusColor(m.status), display: "inline-block"
            }}>{m.status}</div>
          </div>
        </button>
      ))}
    </div>
  );
}

// ─── DONATIONS TAB ───
function DonationsTab({ members, setMembers }) {
  const [filterStatus, setFilterStatus] = useState("전체");
  const filtered = filterStatus === "전체" ? members : members.filter(m => m.status === filterStatus);
  const totalThis = members.reduce((a, m) => a + m.donation, 0);
  const totalAll = members.reduce((a, m) => a + m.totalDonation, 0);
  const paidAmount = members.filter(m => m.status === "완료").reduce((a, m) => a + m.donation, 0);

  const handleStatus = (id, s) => setMembers(prev => prev.map(m => m.id === id ? { ...m, status: s } : m));
  const statusColor = (s) => s === "완료" ? "#ACE1AF" : s === "대기" ? "#FFD700" : "#FF6B6B";

  return (
    <div>
      <div style={{ fontSize: 18, fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, color: "#fff", marginBottom: 20 }}>기부금 현황</div>

      {/* Summary */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 20 }}>
        <div style={{ padding: "16px", borderRadius: 14, background: cardBg, border: cardBorder, textAlign: "center" }}>
          <div style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", fontFamily: "'Space Mono', monospace" }}>이번 달 총액</div>
          <div style={{ fontSize: 16, color: accent, fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, marginTop: 6 }}>{totalThis.toLocaleString()}원</div>
        </div>
        <div style={{ padding: "16px", borderRadius: 14, background: cardBg, border: cardBorder, textAlign: "center" }}>
          <div style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", fontFamily: "'Space Mono', monospace" }}>입금 완료</div>
          <div style={{ fontSize: 16, color: "#ACE1AF", fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, marginTop: 6 }}>{paidAmount.toLocaleString()}원</div>
        </div>
        <div style={{ padding: "16px", borderRadius: 14, background: cardBg, border: cardBorder, textAlign: "center" }}>
          <div style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", fontFamily: "'Space Mono', monospace" }}>누적 총액</div>
          <div style={{ fontSize: 16, color: "#fff", fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, marginTop: 6 }}>{totalAll.toLocaleString()}원</div>
        </div>
      </div>

      {/* Filter */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {["전체", "완료", "대기", "미납"].map(s => (
          <button key={s} onClick={() => setFilterStatus(s)} style={{
            padding: "8px 16px", borderRadius: 20, cursor: "pointer", fontSize: 12, fontWeight: 500,
            background: filterStatus === s ? (s === "전체" ? accent : statusColor(s)) : "transparent",
            border: `1px solid ${s === "전체" ? (filterStatus === s ? accent : "rgba(255,255,255,0.1)") : statusColor(s)}`,
            color: filterStatus === s ? "#0a0a0a" : (s === "전체" ? "rgba(255,255,255,0.5)" : statusColor(s)),
            transition: "all 0.2s"
          }}>{s}</button>
        ))}
      </div>

      {/* Donation List */}
      <div style={{ padding: "4px 0" }}>
        {/* Header */}
        <div style={{ display: "flex", padding: "8px 12px", marginBottom: 4 }}>
          <span style={{ flex: 2, fontSize: 10, color: "rgba(255,255,255,0.25)", fontFamily: "'Space Mono', monospace" }}>이름</span>
          <span style={{ flex: 1, fontSize: 10, color: "rgba(255,255,255,0.25)", fontFamily: "'Space Mono', monospace", textAlign: "center" }}>거리</span>
          <span style={{ flex: 1, fontSize: 10, color: "rgba(255,255,255,0.25)", fontFamily: "'Space Mono', monospace", textAlign: "right" }}>금액</span>
          <span style={{ width: 70, fontSize: 10, color: "rgba(255,255,255,0.25)", fontFamily: "'Space Mono', monospace", textAlign: "center" }}>상태</span>
        </div>
        {filtered.map(m => (
          <div key={m.id} style={{ display: "flex", alignItems: "center", padding: "12px", borderRadius: 10, marginBottom: 4, background: cardBg, border: cardBorder }}>
            <div style={{ flex: 2 }}>
              <div style={{ fontSize: 13, color: "#fff", fontWeight: 500 }}>{m.name}</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.2)" }}>{m.fullName}</div>
            </div>
            <div style={{ flex: 1, textAlign: "center", fontSize: 13, color: accent, fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 }}>{m.km}km</div>
            <div style={{ flex: 1, textAlign: "right", fontSize: 13, color: "#fff" }}>{m.donation.toLocaleString()}원</div>
            <div style={{ width: 70, display: "flex", justifyContent: "center" }}>
              <select value={m.status} onChange={e => handleStatus(m.id, e.target.value)} style={{
                padding: "4px 8px", borderRadius: 8, fontSize: 10, fontWeight: 600, cursor: "pointer",
                background: `${statusColor(m.status)}20`, color: statusColor(m.status),
                border: `1px solid ${statusColor(m.status)}40`, outline: "none"
              }}>
                <option value="완료">완료</option>
                <option value="대기">대기</option>
                <option value="미납">미납</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── REWARDS TAB ───
function RewardsTab() {
  const [rewards, setRewards] = useState(initialRewards);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});

  const handleEdit = (r) => { setEditId(r.id); setEditData({ ...r }); };
  const handleSave = () => {
    setRewards(prev => prev.map(r => r.id === editId ? { ...editData } : r));
    setEditId(null);
  };
  const handleToggle = (id) => {
    setRewards(prev => prev.map(r => r.id === id ? { ...r, active: !r.active } : r));
  };
  const handleAdd = () => {
    const newId = Math.max(...rewards.map(r => r.id)) + 1;
    const newReward = { id: newId, tier: "새 리워드", condition: "조건 입력", prize: "리워드 입력", icon: "🎁", active: true };
    setRewards(prev => [...prev, newReward]);
    handleEdit(newReward);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 18, fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, color: "#fff" }}>리워드 설정</div>
        <button onClick={handleAdd} style={{
          padding: "8px 16px", borderRadius: 10, border: "none", cursor: "pointer",
          background: accent, color: "#0a0a0a", fontSize: 12, fontWeight: 600
        }}>+ 추가</button>
      </div>

      <div style={{ padding: "14px 18px", borderRadius: 12, background: "rgba(172,225,175,0.04)", border: "1px solid rgba(172,225,175,0.08)", marginBottom: 20 }}>
        <div style={{ fontSize: 11, color: accent }}>💡 리워드는 매달 변경할 수 있으며, 유저 앱에 실시간 반영됩니다.</div>
      </div>

      {rewards.map(r => (
        <div key={r.id} style={{
          padding: "20px", borderRadius: 16, marginBottom: 12,
          background: cardBg, border: cardBorder,
          opacity: r.active ? 1 : 0.5, transition: "opacity 0.3s"
        }}>
          {editId === r.id ? (
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 10, marginBottom: 12 }}>
                {[
                  ["아이콘", "icon"], ["등급명", "tier"], ["조건", "condition"], ["리워드", "prize"]
                ].map(([label, key]) => (
                  <React.Fragment key={key}>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", paddingTop: 8, minWidth: 50 }}>{label}</div>
                    <input value={editData[key]} onChange={e => setEditData(prev => ({ ...prev, [key]: e.target.value }))} style={adminInputStyle} />
                  </React.Fragment>
                ))}
              </div>
              <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                <button onClick={() => setEditId(null)} style={{ padding: "8px 16px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.1)", background: "transparent", color: "rgba(255,255,255,0.4)", fontSize: 12, cursor: "pointer" }}>취소</button>
                <button onClick={handleSave} style={{ padding: "8px 20px", borderRadius: 8, border: "none", background: accent, color: "#0a0a0a", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>저장</button>
              </div>
            </div>
          ) : (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 28 }}>{r.icon}</span>
                  <div>
                    <div style={{ fontSize: 14, color: "#fff", fontWeight: 600 }}>{r.tier}</div>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginTop: 2 }}>{r.condition}</div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <button onClick={() => handleToggle(r.id)} style={{
                    padding: "4px 10px", borderRadius: 12, fontSize: 10, cursor: "pointer",
                    background: r.active ? "rgba(172,225,175,0.15)" : "rgba(255,100,100,0.15)",
                    border: "none", color: r.active ? accent : "#FF6B6B"
                  }}>{r.active ? "활성" : "비활성"}</button>
                  <button onClick={() => handleEdit(r)} style={{
                    padding: "4px 10px", borderRadius: 12, fontSize: 10, cursor: "pointer",
                    background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)"
                  }}>수정</button>
                </div>
              </div>
              <div style={{ marginTop: 12, padding: "10px 14px", borderRadius: 10, background: "rgba(255,255,255,0.02)", fontSize: 12, color: "rgba(255,255,255,0.5)" }}>
                🎁 {r.prize}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── MAIN ADMIN APP ───
export default function AdminApp() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [tab, setTab] = useState(TABS.DASHBOARD);
  const [members, setMembers] = useState(initialMembers);

  if (!loggedIn) return <AdminLogin onLogin={() => setLoggedIn(true)} />;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Space+Mono:wght@400;700&family=Noto+Sans+KR:wght@300;400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: rgba(172,225,175,0.15); border-radius: 4px; }
        button, input, select { font-family: 'Noto Sans KR', sans-serif; }
        input::placeholder { color: rgba(255,255,255,0.15); }
        select option { background: #1a1a2e; color: #fff; }
      `}</style>
      <div style={{
        minHeight: "100vh", background: adminBg,
        fontFamily: "'Noto Sans KR', sans-serif", color: "#fff"
      }}>
        {/* Top Header */}
        <div style={{
          padding: "16px 24px", borderBottom: "1px solid rgba(255,255,255,0.04)",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          background: "rgba(15,17,23,0.95)", backdropFilter: "blur(10px)",
          position: "sticky", top: 0, zIndex: 100
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ fontSize: 20, fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, color: accent, letterSpacing: 2 }}>CELADON</div>
            <span style={{ fontSize: 9, padding: "2px 8px", borderRadius: 10, background: "rgba(172,225,175,0.1)", color: accent }}>ADMIN</span>
          </div>
          <button onClick={() => setLoggedIn(false)} style={{
            padding: "6px 14px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.08)",
            background: "transparent", color: "rgba(255,255,255,0.3)", fontSize: 11, cursor: "pointer"
          }}>로그아웃</button>
        </div>

        {/* Tab Nav */}
        <div style={{
          display: "flex", gap: 0, padding: "0 24px",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
          background: "rgba(15,17,23,0.8)", position: "sticky", top: 53, zIndex: 99
        }}>
          {[
            [TABS.DASHBOARD, "📊 대시보드"],
            [TABS.MEMBERS, "👥 멤버"],
            [TABS.DONATIONS, "💰 기부금"],
            [TABS.REWARDS, "🎁 리워드"],
          ].map(([id, label]) => (
            <button key={id} onClick={() => setTab(id)} style={{
              padding: "14px 18px", border: "none", cursor: "pointer",
              background: "transparent", fontSize: 13, fontWeight: 500,
              color: tab === id ? accent : "rgba(255,255,255,0.3)",
              borderBottom: tab === id ? `2px solid ${accent}` : "2px solid transparent",
              transition: "all 0.2s ease"
            }}>{label}</button>
          ))}
        </div>

        {/* Content */}
        <div style={{ padding: "24px", maxWidth: 900, margin: "0 auto" }}>
          {tab === TABS.DASHBOARD && <DashboardTab members={members} />}
          {tab === TABS.MEMBERS && <MembersTab members={members} setMembers={setMembers} />}
          {tab === TABS.DONATIONS && <DonationsTab members={members} setMembers={setMembers} />}
          {tab === TABS.REWARDS && <RewardsTab />}
        </div>
      </div>
    </>
  );
}
