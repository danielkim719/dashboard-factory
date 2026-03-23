# /add-widget — 위젯 추가

기존 클라이언트 대시보드에 새 위젯을 추가합니다.

## 실행 방법
`/add-widget [클라이언트slug] [페이지] [위젯타입]`

예: `/add-widget brandboost marketing line-chart`

## 위젯 타입
- `kpi-card` — 단일 숫자 + 증감률 카드
- `line-chart` — 시계열 라인 차트
- `bar-chart` — 막대 차트
- `pie-chart` — 파이/도넛 차트
- `area-chart` — 영역 차트
- `data-table` — 정렬/필터 가능한 데이터 테이블
- `funnel` — 퍼널 차트

## 수행할 작업

1. 해당 클라이언트의 config와 기존 데이터 파일 확인
2. `src/data/[slug]/[page].ts` 에 목업 데이터 추가
3. `src/components/charts/` 에 차트 래퍼가 없으면 생성
4. 해당 페이지 (`src/app/[slug]/[page]/page.tsx`) 에 위젯 추가
5. 색상은 반드시 config에서 참조

## 규칙
- CLAUDE.md 컨벤션 엄수
- 기존 레이아웃 스타일과 일관성 유지
- 반응형 그리드 유지 (모바일 고려)