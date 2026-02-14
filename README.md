# 🕊️ 셀라돈 (Celadon) - 기부런 앱

중동 난민을 위한 스포츠 학교 건립을 목표로 한 기부 러닝 앱입니다.

## 📱 주요 기능

### 유저 앱 (/)
- 회원가입/로그인
- 나이키 런클럽 캡쳐 업로드 → 기부금 자동 계산
- 기부왕 랭킹 & 리워드
- 멤버별 기부증서 발급
- 마이페이지 (기부 히스토리)

### 어드민 페이지 (/admin)
- 대시보드 (통계, 차트, TOP5)
- 멤버 관리 (검색, 수정, 상세정보)
- 기부금 현황 (필터, 입금상태 변경)
- 리워드 설정 (추가, 수정, 활성/비활성)
- 초기 비밀번호: `celadon2026`

---

## 🚀 배포 가이드 (완전 초보용)

### 준비물
1. GitHub 계정 (없으면 github.com 에서 가입)
2. Vercel 계정 (없으면 vercel.com 에서 GitHub으로 가입)

### Step 1: GitHub에 코드 올리기

1. github.com 로그인
2. 오른쪽 상단 `+` → `New repository` 클릭
3. Repository name: `celadon-app` 입력
4. `Create repository` 클릭
5. 이 프로젝트 폴더 전체를 업로드:
   - `uploading an existing file` 링크 클릭
   - 이 폴더의 모든 파일/폴더를 드래그앤드롭
   - `Commit changes` 클릭

### Step 2: Vercel에서 배포

1. vercel.com 로그인 (GitHub 계정으로)
2. `Add New...` → `Project` 클릭
3. `celadon-app` 레포지토리 찾아서 `Import` 클릭
4. Framework Preset: `Vite` 선택 (자동 감지됨)
5. `Deploy` 클릭
6. 2-3분 기다리면 끝! 🎉

### Step 3: 접속하기

- 유저 앱: `https://celadon-app.vercel.app`
- 어드민: `https://celadon-app.vercel.app/admin`

### 커스텀 도메인 연결 (선택)

Vercel 대시보드 → Settings → Domains 에서
`celadon.kr` 같은 도메인을 연결할 수 있습니다.

---

## 🛠 로컬에서 실행하기 (개발자용)

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:5173` 접속

---

## 📁 프로젝트 구조

```
celadon-app/
├── public/
│   ├── favicon.svg
│   └── manifest.json
├── src/
│   ├── main.jsx          ← 진입점 (라우터)
│   ├── CeladonApp.jsx    ← 유저 앱 전체
│   └── AdminApp.jsx      ← 어드민 페이지 전체
├── index.html
├── package.json
├── vite.config.js
├── vercel.json
└── README.md
```

---

## ⚠️ 참고사항

현재는 프론트엔드 프로토타입 상태입니다. 실제 서비스를 위해서는:
- 백엔드 서버 & 데이터베이스 연동
- 실제 이미지 OCR (거리 자동 인식)
- 카카오/구글 소셜 로그인 연동
- 결제/송금 시스템 연동

이 기능들은 추후 개발 단계에서 추가할 수 있습니다.
