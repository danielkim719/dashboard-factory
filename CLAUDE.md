# Dashboard Factory — Claude Code Rules

## 프로젝트 개요
여러 클라이언트사의 마케팅/세일즈/어드민 내부운영 퍼널 대시보드를 생산하는 팩토리 레포지토리.
새 클라이언트가 생길 때마다 `/new-client` 커맨드로 스캐폴딩한다.

## 기술 스택
- **Next.js 15** App Router + TypeScript strict
- **Tailwind CSS** — 인라인 유틸리티만 사용, 별도 CSS 파일 금지
- **shadcn/ui** — 컴포넌트는 항상 shadcn에서 가져옴, 직접 만들지 않음
- **Recharts** — 모든 차트는 Recharts 사용
- **Zustand** — 전역 상태만 관리 (UI 로컬 상태는 useState)
- **lucide-react** — 아이콘은 항상 lucide-react

## 디렉토리 규칙

```
src/
├── app/
│   └── [client]/          # 클라이언트별 라우트 (예: brandboost)
│       ├── layout.tsx     # 사이드바 + 헤더 레이아웃
│       ├── page.tsx       # Overview 대시보드
│       ├── marketing/
│       │   └── page.tsx
│       ├── sales/
│       │   └── page.tsx
│       └── admin/
│           └── page.tsx
├── components/
│   ├── ui/                # shadcn 자동생성 — 절대 수정 금지
│   ├── charts/            # Recharts 래퍼 컴포넌트
│   └── widgets/           # KPI 카드, 테이블 등 재사용 위젯
├── data/
│   └── [client]/          # 클라이언트별 목업 데이터 (TypeScript 상수)
└── config/
    └── [client].config.ts # 클라이언트별 브랜드/색상/메뉴 설정
```

## 코딩 컨벤션

### 컴포넌트
- 모든 컴포넌트는 named export (default export 금지)
- Props 타입은 컴포넌트 바로 위에 선언
- 파일명: PascalCase (`KpiCard.tsx`)
- "use client" 는 반드시 필요한 컴포넌트에만 선언

### 데이터
- 목업 데이터는 `src/data/[client]/` 에 TypeScript 상수로 관리
- 타입 정의는 같은 파일 최상단에 선언
- 실제 API 연동 시 상수를 fetch 함수로 교체하면 됨

### 차트
- 모든 Recharts 컴포넌트는 `src/components/charts/` 에 래퍼로 만들어 재사용
- 반드시 `ResponsiveContainer` 로 감쌀 것
- 색상은 항상 client.config.ts 의 `colors` 에서 참조

### 클라이언트 설정 구조
```typescript
export const clientConfig = {
  name: string           // 회사명
  slug: string           // URL slug (예: "brandboost")
  colors: {
    primary: string      // 주색상 (hex)
    secondary: string    // 보조색상
    accent: string       // 강조색상
  }
  currency: "KRW" | "USD"
  nav: { label: string; href: string; icon: string }[]
}
```

## 새 클라이언트 추가
```
/new-client
```
클라이언트명, 색상, 메뉴 구성 입력 → 자동 스캐폴딩

## 위젯 추가
```
/add-widget
```
위젯 타입 선택 → 자동 생성

## 절대 하지 말 것
- `src/components/ui/` 파일 직접 수정 (shadcn 재설치 시 덮어써짐)
- 인라인 스타일 (`style={{}}`) 사용 — Tailwind 클래스만 사용
- `any` 타입 사용 — 항상 명시적 타입 선언
- 차트 라이브러리 혼용 — Recharts 만 사용
- 하드코딩 색상값 — 항상 config에서 참조
- default export 사용
