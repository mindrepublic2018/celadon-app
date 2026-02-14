import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";

const TABS = { DASHBOARD: "dashboard", MEMBERS: "members", DONATIONS: "donations", REWARDS: "rewards" };

const adminBg = "#0f1117";
const cardBg = "rgba(255,255,255,0.03)";
const cardBorder = "1px solid rgba(255,255,255,0.06)";
const accent = "#ACE1AF";
const adminInputStyle = { width:"100%", padding:"10px 12px", borderRadius:8, border:"1px solid rgba(255,255,255,0.1)", background:"rgba(255,255,255,0.05)", color:"#fff", fontSize:13, outline:"none", fontFamily:"'Noto Sans KR', sans-serif" };

function AdminLogin({ onLogin }) {
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);
  const handleLogin = () => { if(pw==="celadon2026") onLogin(); else { setError(true); setTimeout(()=>setError(false),2000); } };
  return (
    <div style={{ height:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:`linear-gradient(180deg, ${adminBg} 0%, #0a1210 100%)` }}>
      <div style={{ width:"100%", maxWidth:380, padding:"0 24px", textAlign:"center" }}>
        <div style={{ fontSize:11, color:"rgba(172,225,175,0.4)", fontFamily:"'Space Mono', monospace", letterSpacing:4 }}>ADMIN</div>
        <div style={{ fontSize:28, fontFamily:"'Cormorant Garamond', serif", fontWeight:600, color:accent, marginTop:8, letterSpacing:3 }}>CELADON</div>
        <div style={{ fontSize:12, color:"rgba(255,255,255,0.3)", marginTop:8, marginBottom:32 }}>관리자 로그인</div>
        <input type="password" placeholder="관리자 비밀번호" value={pw} onChange={e=>setPw(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleLogin()} style={{ ...adminInputStyle, textAlign:"center", marginBottom:16, borderColor:error?"rgba(255,100,100,0.5)":"rgba(255,255,255,0.1)" }}/>
        {error && <div style={{ fontSize:11, color:"rgba(255,100,100,0.7)", marginBottom:12 }}>비밀번호가 올바르지 않습니다</div>}
        <button onClick={handleLogin} style={{ width:"100%", padding:"14px", borderRadius:10, border:"none", cursor:"pointer", background:`linear-gradient(135deg, ${accent}, #8FBC8F)`, fontSize:14, fontWeight:700, color:"#0a0a0a" }}>로그인</button>
        <div style={{ fontSize:10, color:"rgba(255,255,255,0.15)", marginTop:20, fontFamily:"'Space Mono', monospace" }}>초기 비밀번호: celadon2026</div>
      </div>
    </div>
  );
}

function StatCard({ label, value, sub, color=accent, icon }) {
  return (<div style={{ padding:"20px 16px", borderRadius:16, background:cardBg, border:cardBorder, flex:1, minWidth:0 }}><div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}><div><div style={{ fontSize:10, color:"rgba(255,255,255,0.3)", fontFamily:"'Space Mono', monospace", letterSpacing:1 }}>{label}</div><div style={{ fontSize:24, fontFamily:"'Cormorant Garamond', serif", fontWeight:700, color, marginTop:8 }}>{value}</div>{sub && <div style={{ fontSize:10, color:"rgba(255,255,255,0.2)", marginTop:4 }}>{sub}</div>}</div>{icon && <span style={{ fontSize:24, opacity:0.5 }}>{icon}</span>}</div></div>);
}

function DashboardTab({ members, records }) {
  const now = new Date();
  const thisMonth = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}`;
  const thisMonthRecords = records.filter(r => r.record_month === thisMonth);
  const totalKm = thisMonthRecords.reduce((a,r) => a + Number(r.km), 0);
  const totalDonation = totalKm * 500;
  const paidCount = thisMonthRecords.filter(r => r.payment_status === "완료").length;
  const pendingCount = thisMonthRecords.filter(r => r.payment_status === "대기").length;
  const unpaidCount = thisMonthRecords.filter(r => r.payment_status === "미납").length;
  const goalKm = members.reduce((a,m) => { const userRecs = records.filter(r=>r.user_id===m.id); return a + userRecs.reduce((s,r)=>s+Number(r.km),0); }, 0);
  const goalProgress = ((goalKm/100000)*100).toFixed(1);

  // 월별 데이터 계산
  const monthlyData = [];
  for(let i=3; i>=0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth()-i, 1);
    const m = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
    const mRecs = records.filter(r => r.record_month === m);
    const km = Math.round(mRecs.reduce((a,r) => a + Number(r.km), 0));
    monthlyData.push({ month: `${d.getMonth()+1}월`, km, donation: km*500 });
  }
  const maxKm = Math.max(...monthlyData.map(d=>d.km), 1);

  // TOP 5
  const userKmMap = {};
  thisMonthRecords.forEach(r => { userKmMap[r.user_id] = (userKmMap[r.user_id]||0) + Number(r.km); });
  const top5 = Object.entries(userKmMap).sort((a,b)=>b[1]-a[1]).slice(0,5).map(([uid, km]) => {
    const member = members.find(m=>m.id===uid);
    return { name: member?.name || "?", km: Math.round(km), donation: Math.round(km*500) };
  });

  return (
    <div>
      <div style={{ fontSize:18, fontFamily:"'Cormorant Garamond', serif", fontWeight:600, color:"#fff", marginBottom:20 }}>대시보드</div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:20 }}>
        <StatCard label="총 멤버" value={`${members.length}명`} icon="👥" />
        <StatCard label="이번 달 총 거리" value={`${Math.round(totalKm).toLocaleString()}km`} icon="🏃" />
        <StatCard label="이번 달 기부금" value={`${totalDonation.toLocaleString()}원`} icon="💚" />
        <StatCard label="10만km 달성률" value={`${goalProgress}%`} sub={`${goalKm.toLocaleString()} / 100,000 km`} icon="🎯" />
      </div>
      <div style={{ padding:"20px", borderRadius:16, background:cardBg, border:cardBorder, marginBottom:20 }}>
        <div style={{ fontSize:12, color:"rgba(255,255,255,0.4)", fontFamily:"'Space Mono', monospace", letterSpacing:1, marginBottom:16 }}>이번 달 입금 현황</div>
        <div style={{ display:"flex", gap:12 }}>
          {[{label:"완료",count:paidCount,color:"#ACE1AF",bg:"rgba(172,225,175,0.1)"},{label:"대기",count:pendingCount,color:"#FFD700",bg:"rgba(255,215,0,0.1)"},{label:"미납",count:unpaidCount,color:"#FF6B6B",bg:"rgba(255,107,107,0.1)"}].map(s=>(<div key={s.label} style={{flex:1,padding:"14px",borderRadius:12,background:s.bg,textAlign:"center"}}><div style={{fontSize:22,fontFamily:"'Cormorant Garamond', serif",fontWeight:700,color:s.color}}>{s.count}</div><div style={{fontSize:10,color:s.color,marginTop:4,opacity:0.7}}>{s.label}</div></div>))}
        </div>
      </div>
      <div style={{ padding:"20px", borderRadius:16, background:cardBg, border:cardBorder, marginBottom:20 }}>
        <div style={{ fontSize:12, color:"rgba(255,255,255,0.4)", fontFamily:"'Space Mono', monospace", letterSpacing:1, marginBottom:16 }}>월별 러닝 현황</div>
        <div style={{ display:"flex", alignItems:"flex-end", gap:16, height:120 }}>
          {monthlyData.map((d,i)=>(<div key={i} style={{flex:1,textAlign:"center"}}><div style={{fontSize:10,color:accent,marginBottom:4,fontFamily:"'Space Mono', monospace"}}>{d.km}km</div><div style={{height:`${(d.km/maxKm)*80}px`,borderRadius:"6px 6px 0 0",background:i===monthlyData.length-1?`linear-gradient(180deg, ${accent}, #8FBC8F)`:"rgba(172,225,175,0.15)",transition:"height 0.5s ease",minHeight:2}}/><div style={{fontSize:10,color:"rgba(255,255,255,0.3)",marginTop:6}}>{d.month}</div></div>))}
        </div>
      </div>
      <div style={{ padding:"20px", borderRadius:16, background:cardBg, border:cardBorder }}>
        <div style={{ fontSize:12, color:"rgba(255,255,255,0.4)", fontFamily:"'Space Mono', monospace", letterSpacing:1, marginBottom:16 }}>이번 달 TOP 5</div>
        {top5.length===0 && <div style={{fontSize:12,color:"rgba(255,255,255,0.2)",padding:"12px 0"}}>아직 데이터가 없습니다</div>}
        {top5.map((m,i)=>(<div key={i} style={{display:"flex",alignItems:"center",padding:"10px 0",borderBottom:i<top5.length-1?"1px solid rgba(255,255,255,0.04)":"none"}}><span style={{width:24,fontSize:12,color:i<3?accent:"rgba(255,255,255,0.3)",fontWeight:600}}>{i+1}</span><span style={{flex:1,fontSize:13,color:"#fff",fontWeight:500}}>{m.name}</span><span style={{fontSize:13,color:accent,fontFamily:"'Cormorant Garamond', serif",fontWeight:600}}>{m.km}km</span><span style={{fontSize:10,color:"rgba(255,255,255,0.25)",marginLeft:12,width:60,textAlign:"right"}}>{m.donation.toLocaleString()}원</span></div>))}
      </div>
    </div>
  );
}

function MembersTab({ members, records, onRefresh }) {
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({});

  const filtered = members.filter(m => (m.name||"").includes(search) || (m.full_name||"").includes(search) || (m.email||"").includes(search) || (m.instagram||"").includes(search));
  const statusColor = (s) => s==="완료"?"#ACE1AF":s==="대기"?"#FFD700":"#FF6B6B";

  const getMemberStats = (m) => {
    const userRecs = records.filter(r=>r.user_id===m.id);
    const now = new Date();
    const thisMonth = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}`;
    const thisMonthRecs = userRecs.filter(r=>r.record_month===thisMonth);
    const thisKm = Math.round(thisMonthRecs.reduce((a,r)=>a+Number(r.km),0));
    const totalKm = Math.round(userRecs.reduce((a,r)=>a+Number(r.km),0));
    const latestStatus = thisMonthRecs.length > 0 ? thisMonthRecs[thisMonthRecs.length-1].payment_status : "대기";
    return { thisKm, thisDonation:thisKm*500, totalKm, totalDonation:totalKm*500, status:latestStatus, records:userRecs };
  };

  const handleSaveEdit = async () => {
    const { error } = await supabase.from('profiles').update({ name:editData.name, full_name:editData.full_name, phone:editData.phone, affiliation:editData.affiliation, instagram:editData.instagram, birthday:editData.birthday }).eq('id', editData.id);
    if(!error) { onRefresh(); setEditMode(false); }
  };

  const handleStatusChange = async (memberId, recordMonth, newStatus) => {
    await supabase.from('running_records').update({ payment_status: newStatus }).eq('user_id', memberId).eq('record_month', recordMonth);
    onRefresh();
  };

  const selected = members.find(m=>m.id===selectedId);

  if(selected) {
    const stats = getMemberStats(selected);
    const m = editMode ? editData : selected;
    const now = new Date();
    const thisMonth = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}`;
    return (
      <div>
        <button onClick={()=>{setSelectedId(null);setEditMode(false);}} style={{background:"none",border:"none",cursor:"pointer",color:"rgba(255,255,255,0.4)",fontSize:13,marginBottom:16,display:"flex",alignItems:"center",gap:6}}>← 멤버 목록</button>
        <div style={{padding:"24px",borderRadius:16,background:cardBg,border:cardBorder,marginBottom:16}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:20}}>
            <div><div style={{fontSize:20,color:"#fff",fontWeight:700}}>{m.full_name||m.name}</div><div style={{fontSize:12,color:"rgba(255,255,255,0.3)",marginTop:4}}>@{m.instagram}</div></div>
            {!editMode ? (<button onClick={()=>{setEditMode(true);setEditData({...selected});}} style={{padding:"8px 16px",borderRadius:8,border:`1px solid rgba(172,225,175,0.2)`,background:"transparent",color:accent,fontSize:12,cursor:"pointer"}}>수정</button>) : (<div style={{display:"flex",gap:8}}><button onClick={()=>setEditMode(false)} style={{padding:"8px 12px",borderRadius:8,border:"1px solid rgba(255,255,255,0.1)",background:"transparent",color:"rgba(255,255,255,0.4)",fontSize:12,cursor:"pointer"}}>취소</button><button onClick={handleSaveEdit} style={{padding:"8px 16px",borderRadius:8,border:"none",background:accent,color:"#0a0a0a",fontSize:12,fontWeight:600,cursor:"pointer"}}>저장</button></div>)}
          </div>
          {editMode ? (
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
              {[["이름(닉네임)","name"],["성함(실명)","full_name"],["이메일","email"],["연락처","phone"],["소속","affiliation"],["인스타그램","instagram"],["생년월일","birthday"]].map(([label,key])=>(<div key={key}><div style={{fontSize:10,color:"rgba(255,255,255,0.3)",marginBottom:4}}>{label}</div><input value={editData[key]||""} onChange={e=>setEditData(p=>({...p,[key]:e.target.value}))} style={adminInputStyle} disabled={key==="email"}/></div>))}
            </div>
          ) : (
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
              {[["이름",m.name],["성함",m.full_name],["이메일",m.email],["연락처",m.phone],["소속",m.affiliation],["인스타",`@${m.instagram||""}`],["생년월일",m.birthday],["가입일",m.created_at?.split("T")[0]]].map(([label,val])=>(<div key={label}><div style={{fontSize:10,color:"rgba(255,255,255,0.3)",fontFamily:"'Space Mono', monospace"}}>{label}</div><div style={{fontSize:13,color:"#fff",marginTop:4}}>{val||"-"}</div></div>))}
            </div>
          )}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:16}}>
          <div style={{padding:"16px",borderRadius:12,background:cardBg,border:cardBorder,textAlign:"center"}}><div style={{fontSize:10,color:"rgba(255,255,255,0.3)"}}>이번 달</div><div style={{fontSize:18,color:accent,fontFamily:"'Cormorant Garamond', serif",fontWeight:700,marginTop:4}}>{stats.thisKm}km</div></div>
          <div style={{padding:"16px",borderRadius:12,background:cardBg,border:cardBorder,textAlign:"center"}}><div style={{fontSize:10,color:"rgba(255,255,255,0.3)"}}>기부금</div><div style={{fontSize:18,color:accent,fontFamily:"'Cormorant Garamond', serif",fontWeight:700,marginTop:4}}>{stats.thisDonation.toLocaleString()}원</div></div>
          <div style={{padding:"16px",borderRadius:12,background:cardBg,border:cardBorder,textAlign:"center"}}><div style={{fontSize:10,color:"rgba(255,255,255,0.3)"}}>누적</div><div style={{fontSize:18,color:"#fff",fontFamily:"'Cormorant Garamond', serif",fontWeight:700,marginTop:4}}>{stats.totalDonation.toLocaleString()}원</div></div>
        </div>
        <div style={{padding:"20px",borderRadius:16,background:cardBg,border:cardBorder}}>
          <div style={{fontSize:12,color:"rgba(255,255,255,0.4)",marginBottom:12}}>입금 상태 변경</div>
          <div style={{display:"flex",gap:8}}>
            {["완료","대기","미납"].map(s=>(<button key={s} onClick={()=>handleStatusChange(selected.id,thisMonth,s)} style={{flex:1,padding:"12px",borderRadius:10,cursor:"pointer",background:stats.status===s?statusColor(s):"transparent",border:`1.5px solid ${statusColor(s)}`,color:stats.status===s?"#0a0a0a":statusColor(s),fontSize:13,fontWeight:600,transition:"all 0.2s ease"}}>{s}</button>))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
        <div style={{fontSize:18,fontFamily:"'Cormorant Garamond', serif",fontWeight:600,color:"#fff"}}>멤버 관리</div>
        <span style={{fontSize:12,color:"rgba(255,255,255,0.3)"}}>총 {members.length}명</span>
      </div>
      <input placeholder="🔍 이름, 이메일, 인스타 검색..." value={search} onChange={e=>setSearch(e.target.value)} style={{...adminInputStyle,marginBottom:16}}/>
      {filtered.map(m => {
        const stats = getMemberStats(m);
        return (
          <button key={m.id} onClick={()=>setSelectedId(m.id)} style={{width:"100%",display:"flex",alignItems:"center",padding:"14px 16px",borderRadius:12,marginBottom:8,cursor:"pointer",textAlign:"left",background:cardBg,border:cardBorder}}>
            <div style={{width:36,height:36,borderRadius:"50%",background:"rgba(172,225,175,0.08)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,marginRight:12,color:accent,fontWeight:700}}>{(m.full_name||m.name||"?")[0]}</div>
            <div style={{flex:1,minWidth:0}}><div style={{display:"flex",alignItems:"center",gap:6}}><span style={{fontSize:13,fontWeight:600,color:"#fff"}}>{m.name}</span><span style={{fontSize:10,color:"rgba(255,255,255,0.25)"}}>({m.full_name})</span></div><div style={{fontSize:10,color:"rgba(255,255,255,0.25)",marginTop:2}}>@{m.instagram} · {m.affiliation||"-"}</div></div>
            <div style={{textAlign:"right"}}><div style={{fontSize:13,color:accent,fontFamily:"'Cormorant Garamond', serif",fontWeight:600}}>{stats.thisKm}km</div><div style={{fontSize:9,marginTop:3,padding:"2px 8px",borderRadius:10,background:`${statusColor(stats.status)}15`,color:statusColor(stats.status),display:"inline-block"}}>{stats.status}</div></div>
          </button>
        );
      })}
      {filtered.length===0 && <div style={{textAlign:"center",padding:"32px 0",color:"rgba(255,255,255,0.2)",fontSize:13}}>멤버가 없습니다</div>}
    </div>
  );
}

function DonationsTab({ members, records, onRefresh }) {
  const [filterStatus, setFilterStatus] = useState("전체");
  const now = new Date();
  const thisMonth = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}`;
  const thisMonthRecords = records.filter(r=>r.record_month===thisMonth);

  const enriched = thisMonthRecords.map(r => {
    const member = members.find(m=>m.id===r.user_id);
    return { ...r, name: member?.name||"?", full_name: member?.full_name||"?", km: Number(r.km), donation: Number(r.km)*500 };
  });

  const filtered = filterStatus==="전체" ? enriched : enriched.filter(r=>r.payment_status===filterStatus);
  const totalThis = enriched.reduce((a,r)=>a+r.donation,0);
  const paidAmount = enriched.filter(r=>r.payment_status==="완료").reduce((a,r)=>a+r.donation,0);
  const totalAll = records.reduce((a,r)=>a+Number(r.km)*500,0);

  const handleStatus = async (recordId, newStatus) => {
    await supabase.from('running_records').update({ payment_status: newStatus }).eq('id', recordId);
    onRefresh();
  };

  const statusColor = (s) => s==="완료"?"#ACE1AF":s==="대기"?"#FFD700":"#FF6B6B";

  return (
    <div>
      <div style={{fontSize:18,fontFamily:"'Cormorant Garamond', serif",fontWeight:600,color:"#fff",marginBottom:20}}>기부금 현황</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:20}}>
        <div style={{padding:"16px",borderRadius:14,background:cardBg,border:cardBorder,textAlign:"center"}}><div style={{fontSize:9,color:"rgba(255,255,255,0.3)",fontFamily:"'Space Mono', monospace"}}>이번 달 총액</div><div style={{fontSize:16,color:accent,fontFamily:"'Cormorant Garamond', serif",fontWeight:700,marginTop:6}}>{totalThis.toLocaleString()}원</div></div>
        <div style={{padding:"16px",borderRadius:14,background:cardBg,border:cardBorder,textAlign:"center"}}><div style={{fontSize:9,color:"rgba(255,255,255,0.3)",fontFamily:"'Space Mono', monospace"}}>입금 완료</div><div style={{fontSize:16,color:"#ACE1AF",fontFamily:"'Cormorant Garamond', serif",fontWeight:700,marginTop:6}}>{paidAmount.toLocaleString()}원</div></div>
        <div style={{padding:"16px",borderRadius:14,background:cardBg,border:cardBorder,textAlign:"center"}}><div style={{fontSize:9,color:"rgba(255,255,255,0.3)",fontFamily:"'Space Mono', monospace"}}>누적 총액</div><div style={{fontSize:16,color:"#fff",fontFamily:"'Cormorant Garamond', serif",fontWeight:700,marginTop:6}}>{totalAll.toLocaleString()}원</div></div>
      </div>
      <div style={{display:"flex",gap:8,marginBottom:16}}>
        {["전체","완료","대기","미납"].map(s=>(<button key={s} onClick={()=>setFilterStatus(s)} style={{padding:"8px 16px",borderRadius:20,cursor:"pointer",fontSize:12,fontWeight:500,background:filterStatus===s?(s==="전체"?accent:statusColor(s)):"transparent",border:`1px solid ${s==="전체"?(filterStatus===s?accent:"rgba(255,255,255,0.1)"):statusColor(s)}`,color:filterStatus===s?"#0a0a0a":(s==="전체"?"rgba(255,255,255,0.5)":statusColor(s)),transition:"all 0.2s"}}>{s}</button>))}
      </div>
      <div style={{padding:"4px 0"}}>
        <div style={{display:"flex",padding:"8px 12px",marginBottom:4}}><span style={{flex:2,fontSize:10,color:"rgba(255,255,255,0.25)",fontFamily:"'Space Mono', monospace"}}>이름</span><span style={{flex:1,fontSize:10,color:"rgba(255,255,255,0.25)",fontFamily:"'Space Mono', monospace",textAlign:"center"}}>거리</span><span style={{flex:1,fontSize:10,color:"rgba(255,255,255,0.25)",fontFamily:"'Space Mono', monospace",textAlign:"right"}}>금액</span><span style={{width:70,fontSize:10,color:"rgba(255,255,255,0.25)",fontFamily:"'Space Mono', monospace",textAlign:"center"}}>상태</span></div>
        {filtered.map(r=>(<div key={r.id} style={{display:"flex",alignItems:"center",padding:"12px",borderRadius:10,marginBottom:4,background:cardBg,border:cardBorder}}><div style={{flex:2}}><div style={{fontSize:13,color:"#fff",fontWeight:500}}>{r.name}</div><div style={{fontSize:10,color:"rgba(255,255,255,0.2)"}}>{r.full_name}</div></div><div style={{flex:1,textAlign:"center",fontSize:13,color:accent,fontFamily:"'Cormorant Garamond', serif",fontWeight:600}}>{Math.round(r.km)}km</div><div style={{flex:1,textAlign:"right",fontSize:13,color:"#fff"}}>{r.donation.toLocaleString()}원</div><div style={{width:70,display:"flex",justifyContent:"center"}}><select value={r.payment_status} onChange={e=>handleStatus(r.id,e.target.value)} style={{padding:"4px 8px",borderRadius:8,fontSize:10,fontWeight:600,cursor:"pointer",background:`${statusColor(r.payment_status)}20`,color:statusColor(r.payment_status),border:`1px solid ${statusColor(r.payment_status)}40`,outline:"none"}}><option value="완료">완료</option><option value="대기">대기</option><option value="미납">미납</option></select></div></div>))}
        {filtered.length===0 && <div style={{textAlign:"center",padding:"32px 0",color:"rgba(255,255,255,0.2)",fontSize:13}}>데이터가 없습니다</div>}
      </div>
    </div>
  );
}

function RewardsTab({ onRefresh }) {
  const [rewards, setRewards] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadRewards(); }, []);
  const loadRewards = async () => { const {data} = await supabase.from('rewards').select('*').order('id'); if(data) setRewards(data); setLoading(false); };

  const handleEdit = (r) => { setEditId(r.id); setEditData({...r}); };
  const handleSave = async () => {
    await supabase.from('rewards').update({ tier:editData.tier, condition:editData.condition, prize:editData.prize, icon:editData.icon }).eq('id', editId);
    setEditId(null); loadRewards();
  };
  const handleToggle = async (r) => {
    await supabase.from('rewards').update({ active: !r.active }).eq('id', r.id);
    loadRewards();
  };
  const handleAdd = async () => {
    const { data } = await supabase.from('rewards').insert({ tier:"새 리워드", condition:"조건 입력", prize:"리워드 입력", icon:"🎁", active:true }).select().single();
    if(data) { loadRewards(); handleEdit(data); }
  };

  if(loading) return <div style={{textAlign:"center",padding:"40px",color:"rgba(255,255,255,0.3)"}}>로딩 중...</div>;

  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <div style={{fontSize:18,fontFamily:"'Cormorant Garamond', serif",fontWeight:600,color:"#fff"}}>리워드 설정</div>
        <button onClick={handleAdd} style={{padding:"8px 16px",borderRadius:10,border:"none",cursor:"pointer",background:accent,color:"#0a0a0a",fontSize:12,fontWeight:600}}>+ 추가</button>
      </div>
      <div style={{padding:"14px 18px",borderRadius:12,background:"rgba(172,225,175,0.04)",border:"1px solid rgba(172,225,175,0.08)",marginBottom:20}}>
        <div style={{fontSize:11,color:accent}}>💡 리워드는 매달 변경할 수 있으며, 유저 앱에 실시간 반영됩니다.</div>
      </div>
      {rewards.map(r=>(<div key={r.id} style={{padding:"20px",borderRadius:16,marginBottom:12,background:cardBg,border:cardBorder,opacity:r.active?1:0.5,transition:"opacity 0.3s"}}>
        {editId===r.id ? (<div>
          <div style={{display:"grid",gridTemplateColumns:"auto 1fr",gap:10,marginBottom:12}}>
            {[["아이콘","icon"],["등급명","tier"],["조건","condition"],["리워드","prize"]].map(([label,key])=>(<div key={key} style={{display:"contents"}}><div style={{fontSize:11,color:"rgba(255,255,255,0.3)",paddingTop:8,minWidth:50}}>{label}</div><input value={editData[key]} onChange={e=>setEditData(p=>({...p,[key]:e.target.value}))} style={adminInputStyle}/></div>))}
          </div>
          <div style={{display:"flex",gap:8,justifyContent:"flex-end"}}>
            <button onClick={()=>setEditId(null)} style={{padding:"8px 16px",borderRadius:8,border:"1px solid rgba(255,255,255,0.1)",background:"transparent",color:"rgba(255,255,255,0.4)",fontSize:12,cursor:"pointer"}}>취소</button>
            <button onClick={handleSave} style={{padding:"8px 20px",borderRadius:8,border:"none",background:accent,color:"#0a0a0a",fontSize:12,fontWeight:600,cursor:"pointer"}}>저장</button>
          </div>
        </div>) : (<div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}><span style={{fontSize:28}}>{r.icon}</span><div><div style={{fontSize:14,color:"#fff",fontWeight:600}}>{r.tier}</div><div style={{fontSize:10,color:"rgba(255,255,255,0.3)",marginTop:2}}>{r.condition}</div></div></div>
            <div style={{display:"flex",gap:8,alignItems:"center"}}>
              <button onClick={()=>handleToggle(r)} style={{padding:"4px 10px",borderRadius:12,fontSize:10,cursor:"pointer",background:r.active?"rgba(172,225,175,0.15)":"rgba(255,100,100,0.15)",border:"none",color:r.active?accent:"#FF6B6B"}}>{r.active?"활성":"비활성"}</button>
              <button onClick={()=>handleEdit(r)} style={{padding:"4px 10px",borderRadius:12,fontSize:10,cursor:"pointer",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",color:"rgba(255,255,255,0.5)"}}>수정</button>
            </div>
          </div>
          <div style={{marginTop:12,padding:"10px 14px",borderRadius:10,background:"rgba(255,255,255,0.02)",fontSize:12,color:"rgba(255,255,255,0.5)"}}>🎁 {r.prize}</div>
        </div>)}
      </div>))}
    </div>
  );
}

export default function AdminApp() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [tab, setTab] = useState(TABS.DASHBOARD);
  const [members, setMembers] = useState([]);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { if(loggedIn) loadData(); }, [loggedIn]);

  const loadData = async () => {
    setLoading(true);
    const [{ data: profilesData }, { data: recordsData }] = await Promise.all([
      supabase.from('profiles').select('*').order('created_at'),
      supabase.from('running_records').select('*').order('created_at')
    ]);
    if(profilesData) setMembers(profilesData);
    if(recordsData) setRecords(recordsData);
    setLoading(false);
  };

  if(!loggedIn) return <AdminLogin onLogin={()=>setLoggedIn(true)} />;

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
      <div style={{ minHeight:"100vh", background:adminBg, fontFamily:"'Noto Sans KR', sans-serif", color:"#fff" }}>
        <div style={{ padding:"16px 24px", borderBottom:"1px solid rgba(255,255,255,0.04)", display:"flex", justifyContent:"space-between", alignItems:"center", background:"rgba(15,17,23,0.95)", backdropFilter:"blur(10px)", position:"sticky", top:0, zIndex:100 }}>
          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
            <div style={{ fontSize:20, fontFamily:"'Cormorant Garamond', serif", fontWeight:600, color:accent, letterSpacing:2 }}>CELADON</div>
            <span style={{ fontSize:9, padding:"2px 8px", borderRadius:10, background:"rgba(172,225,175,0.1)", color:accent }}>ADMIN</span>
          </div>
          <div style={{ display:"flex", gap:8, alignItems:"center" }}>
            <button onClick={loadData} style={{ padding:"6px 12px", borderRadius:8, border:"1px solid rgba(172,225,175,0.2)", background:"transparent", color:accent, fontSize:11, cursor:"pointer" }}>🔄 새로고침</button>
            <button onClick={()=>setLoggedIn(false)} style={{ padding:"6px 14px", borderRadius:8, border:"1px solid rgba(255,255,255,0.08)", background:"transparent", color:"rgba(255,255,255,0.3)", fontSize:11, cursor:"pointer" }}>로그아웃</button>
          </div>
        </div>
        <div style={{ display:"flex", gap:0, padding:"0 24px", borderBottom:"1px solid rgba(255,255,255,0.04)", background:"rgba(15,17,23,0.8)", position:"sticky", top:53, zIndex:99 }}>
          {[[TABS.DASHBOARD,"📊 대시보드"],[TABS.MEMBERS,"👥 멤버"],[TABS.DONATIONS,"💰 기부금"],[TABS.REWARDS,"🎁 리워드"]].map(([id,label])=>(<button key={id} onClick={()=>setTab(id)} style={{padding:"14px 18px",border:"none",cursor:"pointer",background:"transparent",fontSize:13,fontWeight:500,color:tab===id?accent:"rgba(255,255,255,0.3)",borderBottom:tab===id?`2px solid ${accent}`:"2px solid transparent",transition:"all 0.2s ease"}}>{label}</button>))}
        </div>
        <div style={{ padding:"24px", maxWidth:900, margin:"0 auto" }}>
          {loading ? <div style={{textAlign:"center",padding:"60px",color:"rgba(255,255,255,0.3)"}}>데이터 로딩 중...</div> : <>
            {tab===TABS.DASHBOARD && <DashboardTab members={members} records={records} />}
            {tab===TABS.MEMBERS && <MembersTab members={members} records={records} onRefresh={loadData} />}
            {tab===TABS.DONATIONS && <DonationsTab members={members} records={records} onRefresh={loadData} />}
            {tab===TABS.REWARDS && <RewardsTab onRefresh={loadData} />}
          </>}
        </div>
      </div>
    </>
  );
}
