export const CSS = `/* ===== CSS 변수 (라이트 모드) ===== */
:root {
  --bg-main: #f3f4f8;
  --bg-card: #ffffff;
  --bg-input: #f9fafb;
  --bg-header: #ffffff;
  --text-primary: #1f2937;
  --text-secondary: #6b7280;
  --text-muted: #9ca3af;
  --border: #e5e7eb;
  --border-focus: #7c3aed;
  --shadow: 0 2px 8px rgba(0,0,0,0.08);
  --shadow-lg: 0 4px 20px rgba(0,0,0,0.12);

  /* 브랜드 컬러 */
  --primary: #7c3aed;
  --primary-light: #ede9fe;
  --primary-hover: #6d28d9;

  /* 카테고리 */
  --work-color: #3b82f6;
  --work-bg: #eff6ff;
  --work-border: #bfdbfe;
  --personal-color: #10b981;
  --personal-bg: #ecfdf5;
  --personal-border: #a7f3d0;
  --study-color: #8b5cf6;
  --study-bg: #f5f3ff;
  --study-border: #ddd6fe;

  /* 위험 */
  --danger: #ef4444;
  --danger-bg: #fef2f2;
  --danger-hover: #dc2626;
  --pink: #f472b6;
  --pink-bg: #fdf2f8;
  --pink-hover: #ec4899;

  /* 기타 */
  --completed-opacity: 0.45;
  --radius: 12px;
  --radius-sm: 8px;
  --transition: 0.2s ease;
}

/* ===== 다크 모드 ===== */
body.dark {
  --bg-main: #0f0f1a;
  --bg-card: #1a1a2e;
  --bg-input: #16213e;
  --bg-header: #1a1a2e;
  --text-primary: #f1f5f9;
  --text-secondary: #94a3b8;
  --text-muted: #64748b;
  --border: #2d2d4a;
  --border-focus: #a78bfa;
  --shadow: 0 2px 8px rgba(0,0,0,0.4);
  --shadow-lg: 0 4px 20px rgba(0,0,0,0.5);

  --primary: #a78bfa;
  --primary-light: #2d1f5e;
  --primary-hover: #8b5cf6;

  --work-color: #60a5fa;
  --work-bg: #1e3a5f;
  --work-border: #2563eb;
  --personal-color: #34d399;
  --personal-bg: #064e3b;
  --personal-border: #059669;
  --study-color: #a78bfa;
  --study-bg: #2d1b69;
  --study-border: #7c3aed;

  --danger: #f87171;
  --danger-bg: #450a0a;
  --danger-hover: #ef4444;
  --pink: #f9a8d4;
  --pink-bg: #4a0d2e;
  --pink-hover: #f472b6;
}

/* ===== 리셋 & 기본 ===== */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html { scroll-behavior: smooth; }

body {
  font-family: 'Pretendard', 'Noto Sans KR', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background: var(--bg-main);
  color: var(--text-primary);
  min-height: 100vh;
  transition: background var(--transition), color var(--transition);
  line-height: 1.6;
}

/* ===== 앱 컨테이너 ===== */
.app-container {
  max-width: 720px;
  margin: 0 auto;
  padding: 24px 16px 80px;
}

/* ===== 헤더 ===== */
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--bg-card);
  border-radius: var(--radius);
  padding: 20px 24px;
  margin-bottom: 16px;
  box-shadow: var(--shadow);
  border: 1px solid var(--border);
}

.app-title {
  font-size: 1.75rem;
  font-weight: 800;
  color: var(--primary);
  display: flex;
  align-items: center;
  gap: 10px;
  letter-spacing: -0.5px;
}

.title-icon {
  font-size: 1.5rem;
  filter: drop-shadow(0 1px 2px rgba(124,58,237,0.3));
}

.theme-toggle {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 2px solid var(--border);
  background: var(--bg-input);
  cursor: pointer;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition);
  flex-shrink: 0;
}

.theme-toggle:hover {
  border-color: var(--primary);
  background: var(--primary-light);
  transform: rotate(20deg) scale(1.1);
}

/* ===== 진행률 요약 섹션 ===== */
.summary-section {
  background: var(--bg-card);
  border-radius: var(--radius);
  padding: 20px 24px;
  margin-bottom: 16px;
  box-shadow: var(--shadow);
  border: 1px solid var(--border);
}

.summary-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
}

.summary-progress { flex: 1; }

.summary-label {
  font-size: 0.78rem;
  color: var(--text-muted);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
}

.summary-value {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.progress-bar-wrap {
  background: var(--border);
  border-radius: 999px;
  height: 8px;
  overflow: hidden;
  width: 100%;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, var(--primary), #a78bfa);
  border-radius: 999px;
  transition: width 0.5s cubic-bezier(.4,0,.2,1);
}

.summary-today {
  text-align: right;
  flex-shrink: 0;
}

.summary-today-count {
  font-size: 1.8rem;
  font-weight: 800;
  color: var(--primary);
  line-height: 1;
  margin-top: 4px;
}

/* 카테고리 카드 */
.category-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 14px;
}

.category-card {
  border-radius: var(--radius-sm);
  padding: 12px 14px;
  border-left: 4px solid;
  transition: transform var(--transition), box-shadow var(--transition);
}

.category-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow);
}

.card-work {
  background: var(--work-bg);
  border-color: var(--work-color);
}

.card-personal {
  background: var(--personal-bg);
  border-color: var(--personal-color);
}

.card-study {
  background: var(--study-bg);
  border-color: var(--study-color);
}

.category-card-name {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--text-secondary);
  margin-bottom: 4px;
}

.category-card-count {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-primary);
}

.motivation-message {
  text-align: center;
  font-size: 0.85rem;
  color: var(--text-secondary);
  padding: 8px;
  background: var(--primary-light);
  border-radius: var(--radius-sm);
  border: 1px dashed var(--primary);
  opacity: 0.85;
}

/* ===== 검색 + 정렬 ===== */
.search-sort-section {
  display: flex;
  gap: 10px;
  margin-bottom: 12px;
  align-items: center;
  flex-wrap: wrap;
}

.search-wrap {
  flex: 1;
  min-width: 200px;
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 12px;
  font-size: 0.95rem;
  pointer-events: none;
  color: var(--text-muted);
}

.search-input {
  width: 100%;
  padding: 10px 36px 10px 36px;
  border: 1.5px solid var(--border);
  border-radius: var(--radius-sm);
  background: var(--bg-card);
  color: var(--text-primary);
  font-size: 0.9rem;
  transition: border-color var(--transition), box-shadow var(--transition);
  outline: none;
}

.search-input:focus {
  border-color: var(--border-focus);
  box-shadow: 0 0 0 3px rgba(124,58,237,0.12);
}

.search-clear {
  position: absolute;
  right: 10px;
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  font-size: 0.85rem;
  padding: 2px 6px;
  border-radius: 4px;
  transition: color var(--transition);
}

.search-clear:hover { color: var(--danger); }

.sort-wrap {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
}

.sort-label {
  font-size: 0.82rem;
  color: var(--text-secondary);
  font-weight: 500;
  white-space: nowrap;
}

.sort-select {
  padding: 9px 12px;
  border: 1.5px solid var(--border);
  border-radius: var(--radius-sm);
  background: var(--bg-card);
  color: var(--text-primary);
  font-size: 0.88rem;
  cursor: pointer;
  outline: none;
  transition: border-color var(--transition);
}

.sort-select:focus { border-color: var(--border-focus); }

/* ===== 데이터 관리 버튼 ===== */
.data-actions {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

.btn-data {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: var(--radius-sm);
  border: 1.5px solid var(--border);
  background: var(--bg-card);
  color: var(--text-secondary);
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition);
}

.btn-data:hover {
  border-color: var(--primary);
  color: var(--primary);
  background: var(--primary-light);
}

/* ===== 필터 탭 ===== */
.filter-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 14px;
  flex-wrap: wrap;
}

.filter-tabs {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.filter-tab {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 7px 14px;
  border-radius: 999px;
  border: 1.5px solid var(--border);
  background: var(--bg-card);
  color: var(--text-secondary);
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition);
}

.filter-tab:hover {
  border-color: var(--primary);
  color: var(--primary);
}

.filter-tab.active {
  background: var(--primary);
  border-color: var(--primary);
  color: #ffffff;
  font-weight: 600;
}

.tab-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 5px;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 700;
  background: rgba(255,255,255,0.25);
  color: inherit;
  line-height: 1;
}

.filter-tab:not(.active) .tab-badge {
  background: var(--border);
  color: var(--text-muted);
}

.btn-delete-completed {
  padding: 7px 14px;
  border-radius: 999px;
  border: 1.5px solid var(--pink);
  background: var(--pink-bg);
  color: var(--pink);
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition);
  white-space: nowrap;
}

.btn-delete-completed:hover {
  background: var(--pink);
  color: #ffffff;
}

/* ===== 입력 섹션 ===== */
.input-section {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  background: var(--bg-card);
  border-radius: var(--radius);
  padding: 14px 16px;
  box-shadow: var(--shadow);
  border: 1px solid var(--border);
  flex-wrap: wrap;
}

.category-select {
  padding: 10px 12px;
  border: 1.5px solid var(--border);
  border-radius: var(--radius-sm);
  background: var(--bg-input);
  color: var(--text-primary);
  font-size: 0.88rem;
  cursor: pointer;
  outline: none;
  transition: border-color var(--transition);
  flex-shrink: 0;
}

.category-select:focus { border-color: var(--border-focus); }

.task-input {
  flex: 1;
  min-width: 160px;
  padding: 10px 14px;
  border: 1.5px solid var(--border);
  border-radius: var(--radius-sm);
  background: var(--bg-input);
  color: var(--text-primary);
  font-size: 0.95rem;
  outline: none;
  transition: border-color var(--transition), box-shadow var(--transition);
}

.task-input:focus {
  border-color: var(--border-focus);
  box-shadow: 0 0 0 3px rgba(124,58,237,0.12);
}

.task-input::placeholder { color: var(--text-muted); }

.btn-add {
  padding: 10px 22px;
  background: var(--primary);
  color: #ffffff;
  border: none;
  border-radius: var(--radius-sm);
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  transition: background var(--transition), transform var(--transition);
  white-space: nowrap;
  flex-shrink: 0;
}

.btn-add:hover {
  background: var(--primary-hover);
  transform: translateY(-1px);
}

.btn-add:active { transform: translateY(0); }

/* ===== 할 일 목록 ===== */
.task-list-section {
  background: var(--bg-card);
  border-radius: var(--radius);
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
  overflow: hidden;
}

.task-list {
  list-style: none;
  padding: 0;
}

/* 할 일 아이템 */
.task-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 18px;
  border-bottom: 1px solid var(--border);
  transition: background var(--transition);
  position: relative;
  animation: slideIn 0.25s ease;
}

@keyframes slideIn {
  from { opacity: 0; transform: translateY(-8px); }
  to   { opacity: 1; transform: translateY(0); }
}

.task-item:last-child { border-bottom: none; }

.task-item:hover { background: var(--bg-input); }

/* 카테고리 색상 바 */
.task-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  border-radius: 0;
}

.task-item[data-category="업무"]::before { background: var(--work-color); }
.task-item[data-category="개인"]::before { background: var(--personal-color); }
.task-item[data-category="공부"]::before { background: var(--study-color); }

/* 체크박스 */
.task-checkbox {
  width: 20px;
  height: 20px;
  border-radius: 6px;
  border: 2px solid var(--border);
  appearance: none;
  -webkit-appearance: none;
  cursor: pointer;
  flex-shrink: 0;
  position: relative;
  transition: all var(--transition);
  background: var(--bg-card);
}

.task-checkbox:checked {
  background: var(--primary);
  border-color: var(--primary);
}

.task-checkbox:checked::after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 13px;
  font-weight: 700;
  line-height: 1;
}

.task-checkbox:hover:not(:checked) { border-color: var(--primary); }

/* 할 일 내용 영역 */
.task-content {
  flex: 1;
  min-width: 0;
  cursor: pointer;
}

.task-text {
  font-size: 0.95rem;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: all var(--transition);
  font-weight: 500;
  display: block;
  line-height: 1.5;
}

.task-item.completed .task-text {
  text-decoration: line-through;
  opacity: var(--completed-opacity);
  color: var(--text-muted);
}

/* 인라인 수정 입력 */
.task-edit-input {
  width: 100%;
  padding: 4px 8px;
  border: 1.5px solid var(--border-focus);
  border-radius: 6px;
  background: var(--bg-card);
  color: var(--text-primary);
  font-size: 0.95rem;
  outline: none;
  box-shadow: 0 0 0 3px rgba(124,58,237,0.12);
}

/* 메타 정보 */
.task-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

/* 카테고리 배지 */
.category-badge {
  display: inline-flex;
  align-items: center;
  padding: 3px 10px;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 700;
  white-space: nowrap;
}

.badge-work {
  background: var(--work-bg);
  color: var(--work-color);
  border: 1px solid var(--work-border);
}

.badge-personal {
  background: var(--personal-bg);
  color: var(--personal-color);
  border: 1px solid var(--personal-border);
}

.badge-study {
  background: var(--study-bg);
  color: var(--study-color);
  border: 1px solid var(--study-border);
}

/* 시간 */
.task-time {
  font-size: 0.75rem;
  color: var(--text-muted);
  white-space: nowrap;
}

/* 삭제 버튼 */
.btn-delete {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: none;
  background: var(--danger-bg);
  color: var(--danger);
  cursor: pointer;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition);
  flex-shrink: 0;
  font-weight: 700;
  line-height: 1;
}

.btn-delete:hover {
  background: var(--danger);
  color: #ffffff;
  transform: scale(1.1);
}

/* 수정 버튼 */
.btn-edit {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: none;
  background: var(--primary-light);
  color: var(--primary);
  cursor: pointer;
  font-size: 0.82rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition);
  flex-shrink: 0;
}

.btn-edit:hover {
  background: var(--primary);
  color: #ffffff;
  transform: scale(1.1);
}

/* ===== 빈 상태 ===== */
.empty-state {
  padding: 60px 24px;
  text-align: center;
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 12px;
  opacity: 0.4;
}

.empty-text {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-secondary);
  margin-bottom: 6px;
}

.empty-sub {
  font-size: 0.85rem;
  color: var(--text-muted);
}

/* ===== 수정 모달 ===== */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  backdrop-filter: blur(4px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

.modal-box {
  background: var(--bg-card);
  border-radius: var(--radius);
  padding: 28px 24px;
  width: 100%;
  max-width: 420px;
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--border);
  animation: slideUp 0.25s ease;
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

.modal-title {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 16px;
}

.modal-select {
  width: 100%;
  padding: 10px 12px;
  border: 1.5px solid var(--border);
  border-radius: var(--radius-sm);
  background: var(--bg-input);
  color: var(--text-primary);
  font-size: 0.92rem;
  margin-bottom: 12px;
  outline: none;
  cursor: pointer;
  transition: border-color var(--transition);
}

.modal-select:focus { border-color: var(--border-focus); }

.modal-input {
  width: 100%;
  padding: 10px 14px;
  border: 1.5px solid var(--border);
  border-radius: var(--radius-sm);
  background: var(--bg-input);
  color: var(--text-primary);
  font-size: 0.95rem;
  margin-bottom: 20px;
  outline: none;
  transition: border-color var(--transition), box-shadow var(--transition);
}

.modal-input:focus {
  border-color: var(--border-focus);
  box-shadow: 0 0 0 3px rgba(124,58,237,0.12);
}

.modal-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}

.btn-modal-cancel {
  padding: 9px 20px;
  border-radius: var(--radius-sm);
  border: 1.5px solid var(--border);
  background: var(--bg-input);
  color: var(--text-secondary);
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition);
}

.btn-modal-cancel:hover {
  border-color: var(--text-secondary);
  color: var(--text-primary);
}

.btn-modal-save {
  padding: 9px 24px;
  border-radius: var(--radius-sm);
  border: none;
  background: var(--primary);
  color: #ffffff;
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  transition: background var(--transition), transform var(--transition);
}

.btn-modal-save:hover {
  background: var(--primary-hover);
  transform: translateY(-1px);
}

/* ===== 토스트 알림 ===== */
.toast {
  position: fixed;
  bottom: 28px;
  left: 50%;
  transform: translateX(-50%) translateY(80px);
  background: #1f2937;
  color: #f9fafb;
  padding: 12px 24px;
  border-radius: 999px;
  font-size: 0.9rem;
  font-weight: 600;
  box-shadow: 0 8px 30px rgba(0,0,0,0.2);
  z-index: 2000;
  opacity: 0;
  transition: all 0.3s cubic-bezier(.4,0,.2,1);
  pointer-events: none;
  white-space: nowrap;
}

.toast.show {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

.toast.success { background: #059669; }
.toast.error   { background: #dc2626; }
.toast.warning { background: #d97706; }
.toast.info    { background: var(--primary); }

/* ===== 완료된 항목 스타일 ===== */
.task-item.completed {
  opacity: 0.75;
  background: var(--bg-input);
}

/* ===== 반응형 ===== */
@media (max-width: 540px) {
  .app-container { padding: 12px 10px 60px; }
  .app-title { font-size: 1.4rem; }
  .summary-today-count { font-size: 1.5rem; }
  .category-cards { grid-template-columns: repeat(3, 1fr); gap: 6px; }
  .category-card { padding: 10px; }
  .category-card-name { font-size: 0.72rem; }
  .filter-section { flex-direction: column; align-items: flex-start; }
  .task-meta { gap: 6px; }
  .task-time { display: none; }
  .input-section { flex-direction: column; }
  .task-input, .category-select, .btn-add { width: 100%; }
}

@media (max-width: 380px) {
  .category-cards { grid-template-columns: 1fr; }
  .filter-tabs { gap: 4px; }
  .filter-tab { padding: 6px 10px; font-size: 0.8rem; }
}
`;
