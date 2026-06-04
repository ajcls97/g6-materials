// G6 Teaching Materials Website - Main JS

const UNIT_COLORS = {
  U0: '#7f8c8d',
  U1: '#2980b9',
  U2: '#148f77',
  U3: '#d35400',
  U4: '#c0392b',
  U5: '#1a5276',
  U6: '#27ae60',
  U7: '#8e44ad',
  U8: '#e67e22',
};

const TYPE_ICONS = {
  lesson: '📊',
  worksheet: '📝',
  quiz: '✅',
  review: '🔄',
  audio: '🎧',
  data: '📈',
  other: '📄',
};

const TYPE_LABELS = {
  lesson: 'Lesson Plan',
  worksheet: 'Worksheet',
  quiz: 'Quiz / Test',
  review: 'Review',
  audio: 'Audio / Video',
  data: 'Data',
  other: 'File',
};

function formatSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(0) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

function getFileExt(filename) {
  return filename.split('.').pop().toLowerCase();
}

// Load materials data using synchronous XHR (works with local files)
function loadMaterialsSync() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'materials_index.json', false); // synchronous
  xhr.send();
  if (xhr.status === 200) {
    return JSON.parse(xhr.responseText);
  }
  console.error('Failed to load materials_index.json');
  return { units: {}, materials: {} };
}

// Render home page unit grid
function loadHomePage() {
  const grid = document.getElementById('unitGrid');
  if (!grid) return;

  const data = loadMaterialsSync();
  const units = data.units || {};
  const materials = data.materials || {};

  grid.innerHTML = '';

  for (const [unitId, info] of Object.entries(units)) {
    const files = materials[unitId] || [];
    const color = UNIT_COLORS[unitId] || '#2980b9';

    const byType = {};
    files.forEach(f => { byType[f.type] = (byType[f.type] || 0) + 1; });

    const countParts = [];
    if (byType.lesson) countParts.push(`${byType.lesson} lessons`);
    if (byType.worksheet) countParts.push(`${byType.worksheet} worksheets`);
    if (byType.quiz) countParts.push(`${byType.quiz} quizzes`);
    if (byType.review) countParts.push(`${byType.review} reviews`);

    const card = document.createElement('a');
    card.href = `unit.html?unit=${unitId}`;
    card.className = 'unit-card';
    card.style.setProperty('--card-color', color);
    card.innerHTML = `
      <div class="unit-number" style="color:${color}">${unitId}</div>
      <div class="unit-topic">${info.topic}</div>
      <div class="unit-language">${info.language}</div>
      <div class="file-count">
        <span>📁 ${files.length} files</span>
        ${countParts.length ? `<span>• ${countParts.join(', ')}</span>` : ''}
      </div>
    `;
    grid.appendChild(card);
  }
}

// Render unit page
function loadUnitPage(unitId) {
  const data = loadMaterialsSync();
  const units = data.units || {};
  const materials = data.materials || {};

  const info = units[unitId];
  const files = materials[unitId] || [];
  const color = UNIT_COLORS[unitId] || '#2980b9';

  if (!info) {
    document.getElementById('unitHeader').innerHTML = '<p>Unit not found.</p>';
    return;
  }

  document.getElementById('breadcrumbUnit').textContent = `${unitId} — ${info.topic}`;

  document.getElementById('unitHeader').innerHTML = `
    <h2 style="color:${color}">${unitId} — ${info.topic}</h2>
    <div class="topic">${info.language}</div>
    <div class="language"><strong>Key Language:</strong> ${info.language}</div>
  `;
  document.getElementById('unitHeader').style.setProperty('--unit-color', color);

  const byType = {};
  files.forEach(f => {
    if (!byType[f.type]) byType[f.type] = [];
    byType[f.type].push(f);
  });

  const typeOrder = ['lesson', 'worksheet', 'quiz', 'review', 'audio', 'data', 'other'];
  const sections = document.getElementById('materialsSections');
  sections.innerHTML = '';

  for (const type of typeOrder) {
    const typeFiles = byType[type];
    if (!typeFiles || typeFiles.length === 0) continue;

    const section = document.createElement('div');
    section.className = 'materials-section';

    const icon = TYPE_ICONS[type] || '📄';
    const label = TYPE_LABELS[type] || type;

    let fileListHtml = '';
    for (const file of typeFiles) {
      const ext = getFileExt(file.filename);
      const size = formatSize(file.size);
      fileListHtml += `
        <a class="file-item" href="${file.path}" download>
          <div class="file-icon ${ext}">${ext.toUpperCase()}</div>
          <div class="file-info">
            <div class="file-name">${file.filename}</div>
            <div class="file-meta">${size}</div>
          </div>
        </a>
      `;
    }

    section.innerHTML = `
      <h3>${icon} ${label} <span style="color:var(--text-light);font-weight:400;font-size:0.9rem">(${typeFiles.length})</span></h3>
      <div class="file-list">${fileListHtml}</div>
    `;
    sections.appendChild(section);
  }

  if (files.length === 0) {
    sections.innerHTML = '<p style="color:var(--text-light)">No materials indexed for this unit yet.</p>';
  }
}

// Auto-detect page and load
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('unitGrid')) {
    loadHomePage();
  }
});
