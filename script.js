  /* ============================================================
     KONFIGURASI
  ============================================================ */
  const ADMIN_PASSWORD = 'Prasastha123';   // Ganti password di sini
  const STORAGE_PROFILE = 'portfolio_profile';
  const STORAGE_PROJECTS = 'portfolio_projects';

  /* ============================================================
     DATA DEFAULT
  ============================================================ */
  const defaultProfile = {
    name:   'Alex Pratama',
    role:   'Full-Stack Developer',
    desc:   'Full-Stack Developer yang bersemangat membangun solusi digital modern, dari desain UI yang elegan hingga arsitektur backend yang andal.',
    avatar: ''
  };

  const defaultProjects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      desc:  'Platform belanja online full-featured dengan fitur keranjang belanja, payment gateway, dan dashboard admin yang komprehensif.',
      img:   '',
      link:  '#',
      tag:   'Web App'
    },
    {
      id: 2,
      title: 'Task Management App',
      desc:  'Aplikasi manajemen tugas berbasis React dengan fitur drag-and-drop, prioritas, notifikasi real-time, dan kolaborasi tim.',
      img:   '',
      link:  '#',
      tag:   'Produktivitas'
    },
    {
      id: 3,
      title: 'REST API Service',
      desc:  'Backend API yang skalabel menggunakan Node.js & Express dengan autentikasi JWT, dokumentasi Swagger, dan rate limiting.',
      img:   '',
      link:  '#',
      tag:   'Backend'
    }
  ];

  /* ============================================================
     LOCAL STORAGE HELPERS
  ============================================================ */

  // Ambil data profil dari localStorage (atau gunakan default jika kosong)
  function getProfile() {
    const saved = localStorage.getItem(STORAGE_PROFILE);
    return saved ? JSON.parse(saved) : { ...defaultProfile };
  }

  // Simpan data profil ke localStorage
  function saveToStorage(profile) {
    localStorage.setItem(STORAGE_PROFILE, JSON.stringify(profile));
  }

  // Ambil daftar project dari localStorage (atau gunakan default jika kosong)
  function getProjects() {
    const saved = localStorage.getItem(STORAGE_PROJECTS);
    return saved ? JSON.parse(saved) : [...defaultProjects];
  }

  // Simpan daftar project ke localStorage
  function saveProjects(projects) {
    localStorage.setItem(STORAGE_PROJECTS, JSON.stringify(projects));
  }

  /* ============================================================
     RENDER PROFIL (menampilkan data profil ke halaman publik)
  ============================================================ */
  function renderProfile() {
    const p = getProfile();

    // Update nama di berbagai tempat
    document.getElementById('hero-name-display').textContent = p.name;
    document.getElementById('nav-logo-text').textContent = p.name.split(' ')[0] + ' Dev';
    document.getElementById('footer-name').textContent = p.name;

    // Update deskripsi hero
    document.getElementById('hero-desc-display').textContent = p.desc;

    // Update avatar
    const avatarContainer = document.getElementById('avatar-container');
    if (p.avatar) {
      avatarContainer.innerHTML = `<img src="${p.avatar}" alt="${p.name}" onerror="this.parentElement.innerHTML='<div class=\\'avatar-placeholder-svg\\'><svg viewBox=\\'0 0 100 100\\'><circle cx=\\'50\\' cy=\\'38\\' r=\\'22\\' fill=\\'#06b6d4\\'/><ellipse cx=\\'50\\' cy=\\'90\\' rx=\\'36\\' ry=\\'22\\' fill=\\'#06b6d4\\'/></svg></div>'" />`;
    } else {
      avatarContainer.innerHTML = `
        <div class="avatar-placeholder-svg">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="38" r="22" fill="#06b6d4"/>
            <ellipse cx="50" cy="90" rx="36" ry="22" fill="#06b6d4"/>
          </svg>
        </div>`;
    }

    // Isi form admin dengan data terkini
    document.getElementById('input-name').value   = p.name;
    document.getElementById('input-role').value   = p.role;
    document.getElementById('input-desc').value   = p.desc;
    document.getElementById('input-avatar').value = p.avatar || '';
  }

  /* ============================================================
     TYPING EFFECT (animasi teks berputar di hero section)
  ============================================================ */
  function startTypingEffect() {
    const profile = getProfile();
    // Daftar teks yang akan ditampilkan bergantian
    const roles = [
      profile.role,
      'UI/UX Enthusiast',
      'Problem Solver',
      'Open Source Contributor'
    ];
    const el = document.getElementById('hero-role-display');
    let roleIndex = 0;
    let charIndex  = 0;
    let isDeleting = false;

    function type() {
      const current = roles[roleIndex];
      if (isDeleting) {
        el.textContent = current.substring(0, charIndex - 1);
        charIndex--;
      } else {
        el.textContent = current.substring(0, charIndex + 1);
        charIndex++;
      }

      // Selesai mengetik → tunggu lalu hapus
      if (!isDeleting && charIndex === current.length) {
        setTimeout(() => { isDeleting = true; type(); }, 1800);
        return;
      }
      // Selesai menghapus → ganti teks
      if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex  = (roleIndex + 1) % roles.length;
      }

      setTimeout(type, isDeleting ? 45 : 90);
    }

    type();
  }

  /* ============================================================
     RENDER PROJECTS (menampilkan kartu project ke halaman publik)
  ============================================================ */
  function renderProjects() {
    const projects = getProjects();
    const grid = document.getElementById('projects-grid');
    const countEl = document.getElementById('projects-count');
    countEl.textContent = projects.length;

    if (projects.length === 0) {
      grid.innerHTML = `
        <div class="projects-empty">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
            <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
          </svg>
          <p>Belum ada project. Tambahkan lewat Admin Panel!</p>
        </div>`;
      return;
    }

    // Buat HTML kartu project untuk setiap item
    grid.innerHTML = projects.map(p => `
      <div class="project-card" id="card-${p.id}">
        <div class="project-img">
          ${p.tag ? `<span class="project-tag">${p.tag}</span>` : ''}
          ${p.img
            ? `<img src="${p.img}" alt="${p.title}" onerror="this.parentElement.innerHTML='<div class=\\'project-img-placeholder\\'><svg width=\\'48\\' height=\\'48\\' viewBox=\\'0 0 24 24\\' fill=\\'none\\' stroke=\\'%2306b6d4\\' stroke-width=\\'1\\'><rect x=\\'2\\' y=\\'3\\' width=\\'20\\' height=\\'14\\' rx=\\'2\\'/><path d=\\'M8 21h8M12 17v4\\'/></svg><span>${p.title}</span></div>'" />`
            : `<div class="project-img-placeholder">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" stroke-width="1">
                  <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
                </svg>
                <span>${p.title}</span>
               </div>`
          }
        </div>
        <div class="project-body">
          <h3 class="project-title">${p.title}</h3>
          <p class="project-desc">${p.desc}</p>
          <div class="project-footer">
            <a href="${p.link || '#'}" target="_blank" class="btn-link">
              Lihat Project
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </a>
            <button class="btn-delete" onclick="deleteProject(${p.id})">
              🗑 Hapus
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }

  /* ============================================================
     ADMIN: SIMPAN PROFIL
  ============================================================ */
  function saveProfile() {
    const newProfile = {
      name:   document.getElementById('input-name').value.trim() || defaultProfile.name,
      role:   document.getElementById('input-role').value.trim() || defaultProfile.role,
      desc:   document.getElementById('input-desc').value.trim() || defaultProfile.desc,
      avatar: document.getElementById('input-avatar').value.trim()
    };

    // Simpan ke localStorage
    saveToStorage(newProfile);

    // Langsung update tampilan halaman publik
    renderProfile();

    showToast('✅ Profil berhasil disimpan!');
  }

  /* ============================================================
     ADMIN: TAMBAH PROJECT BARU
  ============================================================ */
  function addProject() {
    const title = document.getElementById('proj-title').value.trim();
    const desc  = document.getElementById('proj-desc').value.trim();

    // Validasi: judul dan deskripsi wajib diisi
    if (!title || !desc) {
      showToast('⚠️ Judul dan deskripsi wajib diisi!');
      return;
    }

    const projects = getProjects();

    // Buat project baru dengan ID unik (pakai timestamp)
    const newProject = {
      id:   Date.now(),
      title,
      desc,
      img:  document.getElementById('proj-img').value.trim(),
      link: document.getElementById('proj-link').value.trim() || '#',
      tag:  document.getElementById('proj-tag').value.trim() || 'Project'
    };

    // Tambahkan ke array dan simpan
    projects.push(newProject);
    saveProjects(projects);

    // Refresh tampilan grid
    renderProjects();
    renderManageList();

    // Kosongkan form
    ['proj-title', 'proj-desc', 'proj-img', 'proj-link', 'proj-tag']
      .forEach(id => document.getElementById(id).value = '');

    showToast('🚀 Project baru berhasil ditambahkan!');
  }

  /* ============================================================
     ADMIN: HAPUS PROJECT
  ============================================================ */
  function deleteProject(id) {
    const projects = getProjects();
    // Filter out project dengan id yang cocok
    const filtered = projects.filter(p => p.id !== id);
    saveProjects(filtered);
    renderProjects();
    renderManageList();
    showToast('🗑 Project berhasil dihapus.');
  }

  /* ============================================================
     ADMIN: RENDER DAFTAR KELOLA PROJECT
  ============================================================ */
  function renderManageList() {
    const projects = getProjects();
    const list = document.getElementById('manage-list');

    if (projects.length === 0) {
      list.innerHTML = '<p style="color:var(--text-muted);font-size:14px;">Belum ada project.</p>';
      return;
    }

    list.innerHTML = projects.map(p => `
      <div style="display:flex;align-items:center;justify-content:space-between;padding:14px 16px;background:var(--bg-deep);border:1px solid var(--border);border-radius:var(--radius);margin-bottom:10px;">
        <div>
          <div style="font-weight:600;font-size:14px;">${p.title}</div>
          <div style="font-size:12px;color:var(--text-muted);margin-top:2px;">${p.tag || ''}</div>
        </div>
        <button class="btn-delete" style="display:inline-flex;" onclick="deleteProject(${p.id})">🗑 Hapus</button>
      </div>
    `).join('');
  }

  /* ============================================================
     MODAL: LOGIN
  ============================================================ */
  function openLoginModal() {
    document.getElementById('login-overlay').classList.add('open');
    document.getElementById('admin-password-input').value = '';
    document.getElementById('login-error').style.display = 'none';
    setTimeout(() => document.getElementById('admin-password-input').focus(), 100);
  }

  function closeLoginModal() {
    document.getElementById('login-overlay').classList.remove('open');
  }

  function handleAdminLogin() {
    const val = document.getElementById('admin-password-input').value;
    if (val === ADMIN_PASSWORD) {
      closeLoginModal();
      openAdminModal();
    } else {
      document.getElementById('login-error').style.display = 'block';
      document.getElementById('admin-password-input').value = '';
      document.getElementById('admin-password-input').focus();
    }
  }

  /* ============================================================
     MODAL: ADMIN DASHBOARD
  ============================================================ */
  function openAdminModal() {
    renderProfile();         // Isi form dengan data terkini
    renderManageList();      // Isi daftar kelola project
    document.getElementById('admin-overlay').classList.add('open');
    document.body.style.overflow = 'hidden'; // Cegah scroll background
  }

  function closeAdminModal() {
    document.getElementById('admin-overlay').classList.remove('open');
    document.body.style.overflow = '';
  }

  /* ============================================================
     TABS DI ADMIN DASHBOARD
  ============================================================ */
  function switchTab(tabName, clickedBtn) {
    // Sembunyikan semua panel
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    // Nonaktifkan semua tombol tab
    document.querySelectorAll('.admin-tab').forEach(b => b.classList.remove('active'));

    // Tampilkan panel yang dipilih
    document.getElementById('tab-' + tabName).classList.add('active');
    clickedBtn.classList.add('active');
  }

  /* ============================================================
     CONTACT FORM HANDLER
  ============================================================ */
  function handleContactSubmit(event) {
    event.preventDefault();
    showToast('✉️ Pesan terkirim! Terima kasih, saya akan segera merespons.');
    event.target.reset();
  }

  /* ============================================================
     TOAST NOTIFICATION
  ============================================================ */
  let toastTimeout;
  function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => toast.classList.remove('show'), 3000);
  }

  /* ============================================================
     HAMBURGER MENU (MOBILE)
  ============================================================ */
  document.getElementById('hamburger').addEventListener('click', () => {
    document.getElementById('nav-links').classList.toggle('open');
  });

  // Tutup menu saat link diklik
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      document.getElementById('nav-links').classList.remove('open');
    });
  });

  /* ============================================================
     TOMBOL ADMIN DI NAVBAR
  ============================================================ */
  document.getElementById('btn-open-admin').addEventListener('click', openLoginModal);

  /* ============================================================
     TUTUP MODAL SAAT KLIK DI LUAR AREA
  ============================================================ */
  document.getElementById('login-overlay').addEventListener('click', function(e) {
    if (e.target === this) closeLoginModal();
  });
  document.getElementById('admin-overlay').addEventListener('click', function(e) {
    if (e.target === this) closeAdminModal();
  });

  /* ============================================================
     KEYBOARD: ENTER di password field → login, ESC → tutup modal
  ============================================================ */
  document.getElementById('admin-password-input').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') handleAdminLogin();
    if (e.key === 'Escape') closeLoginModal();
  });
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeLoginModal();
      closeAdminModal();
    }
  });

  /* ============================================================
     STAR CANVAS (animasi bintang di background)
  ============================================================ */
  function initStars() {
    const canvas = document.getElementById('star-canvas');
    const ctx    = canvas.getContext('2d');
    let stars    = [];
    const COUNT  = 160;

    function resize() {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function createStars() {
      stars = Array.from({ length: COUNT }, () => ({
        x:    Math.random() * canvas.width,
        y:    Math.random() * canvas.height,
        r:    Math.random() * 1.2 + 0.2,
        a:    Math.random(),
        speed: Math.random() * 0.004 + 0.001,
        dir:   Math.random() < 0.5 ? 1 : -1
      }));
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(s => {
        s.a += s.speed * s.dir;
        if (s.a > 1 || s.a < 0) s.dir *= -1;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(148, 163, 184, ${s.a * 0.7})`;
        ctx.fill();
      });
      requestAnimationFrame(draw);
    }

    resize();
    createStars();
    draw();
    window.addEventListener('resize', () => { resize(); createStars(); });
  }

  /* ============================================================
     NAVBAR: ubah style saat scroll
  ============================================================ */
  window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
      navbar.style.padding = '12px 48px';
    } else {
      navbar.style.padding = '18px 48px';
    }
  });

  /* ============================================================
     INISIALISASI: jalankan semua fungsi saat halaman dimuat
  ============================================================ */
  document.addEventListener('DOMContentLoaded', function() {
    initStars();       // Mulai animasi bintang
    renderProfile();   // Tampilkan data profil
    renderProjects();  // Tampilkan daftar project
    startTypingEffect(); // Mulai efek mengetik di hero
  });
