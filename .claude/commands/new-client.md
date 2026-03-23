# /new-client — 새 클라이언트 대시보드 스캐폴딩

새 클라이언트를 위한 대시보드를 처음부터 스캐폴딩합니다.

## 실행 방법
`/new-client [클라이언트명]` 또는 인수 없이 실행하면 질문합니다.

## 수행할 작업

1. **클라이언트 정보 수집** (인수가 없으면 질문)
   - 회사명 (예: 브랜드부스트)
   - slug (예: brandboost) — 영문 소문자+하이픈
   - 주 색상 (hex, 예: #6366f1)
   - 통화 (KRW / USD)
   - 필요한 대시보드 섹션 (marketing / sales / admin 중 선택)

2. **생성할 파일들**

```
src/config/[slug].config.ts          # 클라이언트 설정
src/data/[slug]/marketing.ts         # 마케팅 목업 데이터
src/data/[slug]/sales.ts             # 세일즈 목업 데이터
src/data/[slug]/admin.ts             # 어드민 목업 데이터
src/app/[slug]/layout.tsx            # 사이드바 + 헤더 레이아웃
src/app/[slug]/page.tsx              # Overview 페이지
src/app/[slug]/marketing/page.tsx    # 마케팅 대시보드
src/app/[slug]/sales/page.tsx        # 세일즈 대시보드
src/app/[slug]/admin/page.tsx        # 어드민 대시보드
```

3. **규칙**
   - CLAUDE.md 의 모든 컨벤션을 엄격히 따를 것
   - 색상은 config에서만 참조
   - 목업 데이터는 현실적이고 풍부하게 (12개월치 시계열 데이터 포함)
   - 모든 차트는 `src/components/charts/` 의 래퍼 사용
   - 모든 KPI 카드는 `src/components/widgets/KpiCard.tsx` 사용

4. **완료 후**
   - `npm run dev` 실행 가능한 상태인지 확인
   - 생성된 파일 목록 출력
   - 접속 URL 안내: `http://localhost:3000/[slug]`
