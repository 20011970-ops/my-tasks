import { Hono } from 'hono'
import { CSS } from './css'
import { JS } from './js'

const app = new Hono()

// CSS 라우트
app.get('/static/style.css', (c) => {
  return new Response(CSS, {
    headers: { 'Content-Type': 'text/css; charset=UTF-8', 'Cache-Control': 'public, max-age=3600' }
  })
})

// JS 라우트
app.get('/static/app.js', (c) => {
  return new Response(JS, {
    headers: { 'Content-Type': 'application/javascript; charset=UTF-8', 'Cache-Control': 'public, max-age=3600' }
  })
})

// favicon (빈 응답으로 404 방지)
app.get('/favicon.ico', (c) => c.body('', 204))

// Main page
app.get('/', (c) => {
  return c.html(`<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>My Tasks</title>
  <link rel="stylesheet" href="/static/style.css" />
</head>
<body>
  <div class="app-container">

    <!-- 헤더 -->
    <header class="app-header">
      <h1 class="app-title">
        <span class="title-icon">✅</span>
        My Tasks
      </h1>
      <button class="theme-toggle" id="themeToggle" title="다크모드 전환" aria-label="다크모드 전환">
        <span id="themeIcon">🌙</span>
      </button>
    </header>

    <!-- 진행률 요약 -->
    <section class="summary-section" aria-label="진행률 요약">
      <div class="summary-top">
        <div class="summary-progress">
          <div class="summary-label">전체 진행률</div>
          <div class="summary-value" id="totalProgress">0/0 완료 (0%)</div>
          <div class="progress-bar-wrap">
            <div class="progress-bar" id="progressBar" style="width:0%"></div>
          </div>
        </div>
        <div class="summary-today">
          <div class="summary-label">오늘 추가</div>
          <div class="summary-today-count" id="todayCount">0개</div>
        </div>
      </div>

      <div class="category-cards">
        <div class="category-card card-work">
          <div class="category-card-name">💼 업무</div>
          <div class="category-card-count" id="workCount">0/0</div>
        </div>
        <div class="category-card card-personal">
          <div class="category-card-name">🏠 개인</div>
          <div class="category-card-count" id="personalCount">0/0</div>
        </div>
        <div class="category-card card-study">
          <div class="category-card-name">📚 공부</div>
          <div class="category-card-count" id="studyCount">0/0</div>
        </div>
      </div>

      <div class="motivation-message" id="motivationMsg">
        💜 노력하는 모든 순간이 소중해요
      </div>
    </section>

    <!-- 검색 + 정렬 -->
    <section class="search-sort-section" aria-label="검색 및 정렬">
      <div class="search-wrap">
        <span class="search-icon">🔍</span>
        <input
          type="text"
          id="searchInput"
          class="search-input"
          placeholder="할 일 검색..."
          aria-label="할 일 검색"
        />
        <button class="search-clear" id="searchClear" title="검색 초기화" style="display:none">✕</button>
      </div>
      <div class="sort-wrap">
        <label for="sortSelect" class="sort-label">정렬:</label>
        <select id="sortSelect" class="sort-select" aria-label="정렬 기준">
          <option value="newest">최신순</option>
          <option value="oldest">오래된순</option>
          <option value="name">이름순</option>
          <option value="category">카테고리순</option>
        </select>
      </div>
    </section>

    <!-- 내보내기 / 가져오기 -->
    <section class="data-actions" aria-label="데이터 관리">
      <button class="btn-data" id="exportBtn">
        <span>📤</span> 내보내기
      </button>
      <button class="btn-data" id="importBtn">
        <span>📥</span> 가져오기
      </button>
      <input type="file" id="importFile" accept=".json" style="display:none" aria-label="JSON 파일 가져오기" />
    </section>

    <!-- 필터 탭 + 완료 삭제 -->
    <section class="filter-section" aria-label="카테고리 필터">
      <div class="filter-tabs" role="tablist" aria-label="카테고리 탭">
        <button class="filter-tab active" data-filter="all" role="tab" aria-selected="true">
          전체 <span class="tab-badge" id="badge-all">0</span>
        </button>
        <button class="filter-tab" data-filter="업무" role="tab" aria-selected="false">
          업무 <span class="tab-badge" id="badge-work">0</span>
        </button>
        <button class="filter-tab" data-filter="개인" role="tab" aria-selected="false">
          개인 <span class="tab-badge" id="badge-personal">0</span>
        </button>
        <button class="filter-tab" data-filter="공부" role="tab" aria-selected="false">
          공부 <span class="tab-badge" id="badge-study">0</span>
        </button>
      </div>
      <button class="btn-delete-completed" id="deleteCompletedBtn">
        🗑 완료된 항목 삭제
      </button>
    </section>

    <!-- 할 일 입력 폼 -->
    <section class="input-section" aria-label="할 일 추가">
      <select id="categorySelect" class="category-select" aria-label="카테고리 선택">
        <option value="업무">💼 업무</option>
        <option value="개인">🏠 개인</option>
        <option value="공부">📚 공부</option>
      </select>
      <input
        type="text"
        id="taskInput"
        class="task-input"
        placeholder="새로운 할 일을 입력하세요... (Alt+N)"
        maxlength="100"
        aria-label="할 일 입력"
      />
      <button class="btn-add" id="addBtn">추가</button>
    </section>

    <!-- 할 일 목록 -->
    <main class="task-list-section" aria-label="할 일 목록">
      <ul class="task-list" id="taskList" role="list" aria-live="polite"></ul>
      <div class="empty-state" id="emptyState" style="display:none">
        <div class="empty-icon">📋</div>
        <div class="empty-text">할 일이 없습니다</div>
        <div class="empty-sub">위에서 새 할 일을 추가해보세요!</div>
      </div>
    </main>

  </div>

  <!-- 수정 모달 -->
  <div class="modal-overlay" id="editModal" style="display:none" role="dialog" aria-modal="true" aria-label="할 일 수정">
    <div class="modal-box">
      <h2 class="modal-title">✏️ 할 일 수정</h2>
      <select id="editCategory" class="modal-select" aria-label="카테고리 수정">
        <option value="업무">💼 업무</option>
        <option value="개인">🏠 개인</option>
        <option value="공부">📚 공부</option>
      </select>
      <input type="text" id="editInput" class="modal-input" maxlength="100" aria-label="할 일 내용 수정" />
      <div class="modal-actions">
        <button class="btn-modal-cancel" id="editCancelBtn">취소</button>
        <button class="btn-modal-save" id="editSaveBtn">저장</button>
      </div>
    </div>
  </div>

  <!-- 토스트 알림 -->
  <div class="toast" id="toast" role="alert" aria-live="assertive"></div>

  <script src="/static/app.js"></script>
</body>
</html>`)
})

export default app
