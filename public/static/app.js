/* =====================================================
   My Tasks - 할 일 관리 앱
   순수 Vanilla JavaScript (ES6+)
   데이터 영속성: localStorage
   ===================================================== */

'use strict';

// ===== 상수 =====
const STORAGE_KEY = 'myTasks_v1';
const THEME_KEY   = 'myTasks_theme';

const CATEGORY_MAP = {
  '업무': { label: '💼 업무', badgeClass: 'badge-work' },
  '개인': { label: '🏠 개인', badgeClass: 'badge-personal' },
  '공부': { label: '📚 공부', badgeClass: 'badge-study' },
};

const MOTIVATIONS = [
  '💜 노력하는 모든 순간이 소중해요',
  '🌟 오늘도 한 걸음씩 나아가고 있어요',
  '🔥 작은 습관이 큰 변화를 만들어요',
  '✨ 집중력이 성공의 열쇠예요',
  '🎯 목표를 향해 꾸준히 달려가요',
  '💪 할 수 있어요, 충분히!',
  '🌈 오늘 완료한 일이 내일의 자신감이 됩니다',
];

// ===== 앱 상태 =====
let state = {
  tasks: [],
  filter: 'all',
  sort: 'newest',
  search: '',
  editingId: null,
};

// ===== 유틸리티 =====
const $ = (id) => document.getElementById(id);
const uuid = () => crypto.randomUUID
  ? crypto.randomUUID()
  : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

function formatRelativeTime(isoString) {
  const diff = Date.now() - new Date(isoString).getTime();
  const seconds = Math.floor(diff / 1000);
  if (seconds < 60)  return '방금 전';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60)  return `${minutes}분 전`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24)    return `${hours}시간 전`;
  const days = Math.floor(hours / 24);
  if (days === 1)    return '어제';
  if (days < 7)      return `${days}일 전`;
  const weeks = Math.floor(days / 7);
  if (weeks < 5)     return `${weeks}주 전`;
  return new Date(isoString).toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' });
}

function isToday(isoString) {
  const d = new Date(isoString);
  const n = new Date();
  return d.getFullYear() === n.getFullYear()
    && d.getMonth() === n.getMonth()
    && d.getDate() === n.getDate();
}

// ===== localStorage =====
function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveTasks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.tasks));
  } catch (e) {
    showToast('저장 공간이 부족합니다', 'error');
  }
}

// ===== 테마 =====
function initTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = saved ? saved === 'dark' : prefersDark;
  applyTheme(isDark);
}

function applyTheme(isDark) {
  document.body.classList.toggle('dark', isDark);
  $('themeIcon').textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
}

function toggleTheme() {
  applyTheme(!document.body.classList.contains('dark'));
}

// ===== 데이터 필터링 & 정렬 =====
function getFilteredTasks() {
  let list = [...state.tasks];

  // 카테고리 필터
  if (state.filter !== 'all') {
    list = list.filter(t => t.category === state.filter);
  }

  // 검색어 필터
  if (state.search.trim()) {
    const q = state.search.trim().toLowerCase();
    list = list.filter(t => t.text.toLowerCase().includes(q));
  }

  // 정렬
  list.sort((a, b) => {
    switch (state.sort) {
      case 'newest':   return new Date(b.createdAt) - new Date(a.createdAt);
      case 'oldest':   return new Date(a.createdAt) - new Date(b.createdAt);
      case 'name':     return a.text.localeCompare(b.text, 'ko');
      case 'category': return a.category.localeCompare(b.category, 'ko');
      default:         return 0;
    }
  });

  return list;
}

// ===== 통계 계산 =====
function calcStats() {
  const all     = state.tasks;
  const total   = all.length;
  const done    = all.filter(t => t.completed).length;
  const pct     = total > 0 ? Math.round((done / total) * 100) : 0;
  const todayN  = all.filter(t => isToday(t.createdAt)).length;

  const byCat = (cat) => ({
    total: all.filter(t => t.category === cat).length,
    done:  all.filter(t => t.category === cat && t.completed).length,
  });

  return { total, done, pct, todayN, work: byCat('업무'), personal: byCat('개인'), study: byCat('공부') };
}

// ===== UI 업데이트 =====
function updateSummary() {
  const s = calcStats();

  $('totalProgress').textContent = `${s.done}/${s.total} 완료 (${s.pct}%)`;
  $('progressBar').style.width   = `${s.pct}%`;
  $('todayCount').textContent    = `${s.todayN}개`;

  $('workCount').textContent     = `${s.work.done}/${s.work.total}`;
  $('personalCount').textContent = `${s.personal.done}/${s.personal.total}`;
  $('studyCount').textContent    = `${s.study.done}/${s.study.total}`;

  // 탭 배지
  const filtered = getFilteredCountsByCategory();
  $('badge-all').textContent      = state.tasks.length;
  $('badge-work').textContent     = s.work.total;
  $('badge-personal').textContent = s.personal.total;
  $('badge-study').textContent    = s.study.total;

  // 동기부여 메시지 (완료율에 따라 변경)
  const idx = Math.min(Math.floor(s.pct / 15), MOTIVATIONS.length - 1);
  $('motivationMsg').textContent = MOTIVATIONS[idx];
}

function getFilteredCountsByCategory() {
  return {
    all:      state.tasks.length,
    work:     state.tasks.filter(t => t.category === '업무').length,
    personal: state.tasks.filter(t => t.category === '개인').length,
    study:    state.tasks.filter(t => t.category === '공부').length,
  };
}

function renderTasks() {
  const list = getFilteredTasks();
  const ul   = $('taskList');
  const empty = $('emptyState');

  ul.innerHTML = '';

  if (list.length === 0) {
    empty.style.display = 'block';
    return;
  }

  empty.style.display = 'none';

  const fragment = document.createDocumentFragment();
  list.forEach(task => {
    const li = createTaskElement(task);
    fragment.appendChild(li);
  });
  ul.appendChild(fragment);
}

function createTaskElement(task) {
  const li = document.createElement('li');
  li.className  = `task-item${task.completed ? ' completed' : ''}`;
  li.dataset.id = task.id;
  li.dataset.category = task.category;

  const badgeInfo = CATEGORY_MAP[task.category] || CATEGORY_MAP['업무'];
  const timeStr   = formatRelativeTime(task.createdAt);

  li.innerHTML = `
    <input
      type="checkbox"
      class="task-checkbox"
      ${task.completed ? 'checked' : ''}
      aria-label="${task.text} 완료 체크"
      title="완료 체크"
    />
    <div class="task-content" title="더블클릭으로 수정">
      <span class="task-text">${escapeHtml(task.text)}</span>
    </div>
    <div class="task-meta">
      <span class="category-badge ${badgeInfo.badgeClass}">${task.category}</span>
      <span class="task-time" title="${new Date(task.createdAt).toLocaleString('ko-KR')}">${timeStr}</span>
      <button class="btn-edit" data-id="${task.id}" title="수정" aria-label="${task.text} 수정">✏️</button>
      <button class="btn-delete" data-id="${task.id}" title="삭제" aria-label="${task.text} 삭제">✕</button>
    </div>
  `;

  // 체크박스
  li.querySelector('.task-checkbox').addEventListener('change', (e) => {
    toggleComplete(task.id, e.target.checked);
  });

  // 더블클릭 수정
  li.querySelector('.task-content').addEventListener('dblclick', () => {
    openEditModal(task.id);
  });

  // 수정 버튼
  li.querySelector('.btn-edit').addEventListener('click', (e) => {
    e.stopPropagation();
    openEditModal(task.id);
  });

  // 삭제 버튼
  li.querySelector('.btn-delete').addEventListener('click', (e) => {
    e.stopPropagation();
    deleteTask(task.id);
  });

  return li;
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ===== CRUD =====
function addTask(text, category) {
  text = text.trim();
  if (!text) {
    showToast('할 일 내용을 입력해주세요', 'warning');
    $('taskInput').focus();
    return;
  }
  if (text.length > 100) {
    showToast('100자 이내로 입력해주세요', 'warning');
    return;
  }

  const task = {
    id:        uuid(),
    text,
    category,
    completed: false,
    createdAt: new Date().toISOString(),
  };

  state.tasks.unshift(task);
  saveTasks();
  updateSummary();
  renderTasks();

  $('taskInput').value = '';
  $('taskInput').focus();
  showToast('할 일이 추가되었습니다 ✅', 'success');
}

function toggleComplete(id, completed) {
  const task = state.tasks.find(t => t.id === id);
  if (!task) return;

  task.completed = completed;
  saveTasks();
  updateSummary();
  renderTasks();

  if (completed) {
    showToast('완료! 수고하셨습니다 🎉', 'success');
  }
}

function deleteTask(id) {
  const task = state.tasks.find(t => t.id === id);
  if (!task) return;

  if (!confirm(`"${task.text}" 을(를) 삭제하시겠습니까?`)) return;

  state.tasks = state.tasks.filter(t => t.id !== id);
  saveTasks();
  updateSummary();
  renderTasks();
  showToast('삭제되었습니다', 'info');
}

function deleteCompletedTasks() {
  const count = state.tasks.filter(t => t.completed).length;
  if (count === 0) {
    showToast('완료된 항목이 없습니다', 'warning');
    return;
  }
  if (!confirm(`완료된 항목 ${count}개를 모두 삭제하시겠습니까?`)) return;

  state.tasks = state.tasks.filter(t => !t.completed);
  saveTasks();
  updateSummary();
  renderTasks();
  showToast(`${count}개 항목이 삭제되었습니다`, 'info');
}

function saveEditedTask(id, text, category) {
  text = text.trim();
  if (!text) {
    showToast('할 일 내용을 입력해주세요', 'warning');
    return false;
  }
  if (text.length > 100) {
    showToast('100자 이내로 입력해주세요', 'warning');
    return false;
  }

  const task = state.tasks.find(t => t.id === id);
  if (!task) return false;

  task.text     = text;
  task.category = category;
  saveTasks();
  updateSummary();
  renderTasks();
  showToast('수정되었습니다 ✏️', 'info');
  return true;
}

// ===== 수정 모달 =====
function openEditModal(id) {
  const task = state.tasks.find(t => t.id === id);
  if (!task) return;

  state.editingId = id;
  $('editInput').value    = task.text;
  $('editCategory').value = task.category;
  $('editModal').style.display = 'flex';
  setTimeout(() => $('editInput').focus(), 50);
}

function closeEditModal() {
  $('editModal').style.display = 'none';
  state.editingId = null;
}

// ===== 내보내기 / 가져오기 =====
function exportTasks() {
  if (state.tasks.length === 0) {
    showToast('내보낼 할 일이 없습니다', 'warning');
    return;
  }

  const data = {
    exportedAt: new Date().toISOString(),
    version:    1,
    tasks:      state.tasks,
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  const date = new Date().toISOString().slice(0, 10);

  a.href     = url;
  a.download = `my-tasks-${date}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToast(`${state.tasks.length}개 항목을 내보냈습니다 📤`, 'success');
}

function importTasks(file) {
  if (!file) return;
  if (!file.name.endsWith('.json')) {
    showToast('JSON 파일만 가져올 수 있습니다', 'error');
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const raw = JSON.parse(e.target.result);

      // 데이터 구조 검증
      let imported = [];
      if (Array.isArray(raw)) {
        imported = raw;
      } else if (raw.tasks && Array.isArray(raw.tasks)) {
        imported = raw.tasks;
      } else {
        throw new Error('올바르지 않은 형식입니다');
      }

      // 각 항목 유효성 검사
      const valid = imported.filter(t =>
        t && typeof t.id === 'string'
          && typeof t.text === 'string'
          && ['업무', '개인', '공부'].includes(t.category)
          && typeof t.completed === 'boolean'
          && typeof t.createdAt === 'string'
      );

      if (valid.length === 0) {
        showToast('가져올 수 있는 항목이 없습니다', 'error');
        return;
      }

      const existingIds = new Set(state.tasks.map(t => t.id));
      const newTasks    = valid.filter(t => !existingIds.has(t.id));

      state.tasks = [...newTasks, ...state.tasks];
      saveTasks();
      updateSummary();
      renderTasks();
      showToast(`${newTasks.length}개 항목을 가져왔습니다 📥`, 'success');
    } catch (err) {
      showToast('파일을 읽을 수 없습니다: ' + err.message, 'error');
    }
  };
  reader.readAsText(file);
}

// ===== 토스트 =====
let toastTimer = null;
function showToast(msg, type = 'info') {
  const el = $('toast');
  el.textContent = msg;
  el.className   = `toast ${type} show`;

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    el.classList.remove('show');
  }, 2800);
}

// ===== 이벤트 등록 =====
function bindEvents() {
  // 테마 토글
  $('themeToggle').addEventListener('click', toggleTheme);

  // 할 일 추가
  $('addBtn').addEventListener('click', () => {
    addTask($('taskInput').value, $('categorySelect').value);
  });

  $('taskInput').addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.isComposing) {
      addTask($('taskInput').value, $('categorySelect').value);
    }
  });

  // 키보드 단축키
  document.addEventListener('keydown', (e) => {
    // Alt + N: 입력창 포커스
    if (e.altKey && e.key === 'n') {
      e.preventDefault();
      $('taskInput').focus();
      $('taskInput').scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    // ESC: 모달 닫기
    if (e.key === 'Escape') {
      closeEditModal();
    }
  });

  // 검색
  $('searchInput').addEventListener('input', (e) => {
    state.search = e.target.value;
    $('searchClear').style.display = state.search ? 'block' : 'none';
    renderTasks();
    updateSummary();
  });

  $('searchClear').addEventListener('click', () => {
    $('searchInput').value = '';
    state.search = '';
    $('searchClear').style.display = 'none';
    $('searchInput').focus();
    renderTasks();
    updateSummary();
  });

  // 정렬
  $('sortSelect').addEventListener('change', (e) => {
    state.sort = e.target.value;
    renderTasks();
  });

  // 필터 탭
  document.querySelectorAll('.filter-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-tab').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      state.filter = btn.dataset.filter;
      renderTasks();
    });
  });

  // 완료된 항목 삭제
  $('deleteCompletedBtn').addEventListener('click', deleteCompletedTasks);

  // 내보내기
  $('exportBtn').addEventListener('click', exportTasks);

  // 가져오기
  $('importBtn').addEventListener('click', () => $('importFile').click());

  $('importFile').addEventListener('change', (e) => {
    importTasks(e.target.files[0]);
    e.target.value = ''; // 같은 파일 재선택 허용
  });

  // 수정 모달 저장
  $('editSaveBtn').addEventListener('click', () => {
    if (saveEditedTask(state.editingId, $('editInput').value, $('editCategory').value)) {
      closeEditModal();
    }
  });

  $('editInput').addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.isComposing) {
      if (saveEditedTask(state.editingId, $('editInput').value, $('editCategory').value)) {
        closeEditModal();
      }
    }
  });

  // 수정 모달 취소
  $('editCancelBtn').addEventListener('click', closeEditModal);

  // 모달 외부 클릭 닫기
  $('editModal').addEventListener('click', (e) => {
    if (e.target === $('editModal')) closeEditModal();
  });

  // 드래그 앤 드롭 가져오기 (보너스 기능)
  document.addEventListener('dragover', (e) => e.preventDefault());
  document.addEventListener('drop', (e) => {
    e.preventDefault();
    const file = e.dataTransfer?.files?.[0];
    if (file && file.name.endsWith('.json')) {
      importTasks(file);
    }
  });
}

// ===== 초기화 =====
function init() {
  // 테마 초기화
  initTheme();

  // 데이터 로드
  state.tasks = loadTasks();

  // 이벤트 바인딩
  bindEvents();

  // 첫 렌더링
  updateSummary();
  renderTasks();

  // 1분마다 상대 시간 업데이트
  setInterval(() => {
    renderTasks();
  }, 60 * 1000);

  console.info('✅ My Tasks 앱이 시작되었습니다. 단축키: Alt+N (새 할 일 추가)');
}

// DOM 준비 후 실행
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
