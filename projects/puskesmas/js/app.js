const defaultPasien = [
  { id: 1, no_rm: 'RM-001', nama: 'Siti Rahayu', tanggal_lahir: '1985-03-15', jenis_kelamin: 'P', alamat: 'Jl. Melati No. 12, Bandung', no_hp: '08123456001', keluhan: 'Demam tinggi dan sakit kepala', status: 'aktif', tanggal_daftar: '2026-01-10', poli: 'Umum' },
  { id: 2, no_rm: 'RM-002', nama: 'Budi Santoso', tanggal_lahir: '1990-07-22', jenis_kelamin: 'L', alamat: 'Jl. Mangga No. 5, Bandung', no_hp: '08123456002', keluhan: 'Batuk dan pilek berkepanjangan', status: 'rawat', tanggal_daftar: '2026-01-11', poli: 'Umum' },
  { id: 3, no_rm: 'RM-003', nama: 'Dewi Lestari', tanggal_lahir: '1995-11-08', jenis_kelamin: 'P', alamat: 'Jl. Kenanga No. 3, Cimahi', no_hp: '08123456003', keluhan: 'Kontrol kehamilan trimester 2', status: 'aktif', tanggal_daftar: '2026-01-12', poli: 'KIA' },
  { id: 4, no_rm: 'RM-004', nama: 'Ahmad Fauzi', tanggal_lahir: '1978-05-30', jenis_kelamin: 'L', alamat: 'Jl. Dahlia No. 8, Bandung', no_hp: '08123456004', keluhan: 'Nyeri sendi lutut', status: 'selesai', tanggal_daftar: '2026-01-13', poli: 'Umum' },
  { id: 5, no_rm: 'RM-005', nama: 'Rina Marlina', tanggal_lahir: '2001-02-14', jenis_kelamin: 'P', alamat: 'Jl. Anggrek No. 20, Bandung', no_hp: '08123456005', keluhan: 'Diare dan mual', status: 'baru', tanggal_daftar: '2026-01-14', poli: 'Umum' },
  { id: 6, no_rm: 'RM-006', nama: 'Joko Prabowo', tanggal_lahir: '1970-09-19', jenis_kelamin: 'L', alamat: 'Jl. Mawar No. 1, Cimahi', no_hp: '08123456006', keluhan: 'Tekanan darah tinggi', status: 'aktif', tanggal_daftar: '2026-01-15', poli: 'Umum' },
  { id: 7, no_rm: 'RM-007', nama: 'Sri Wahyuni', tanggal_lahir: '1988-12-25', jenis_kelamin: 'P', alamat: 'Jl. Tulip No. 7, Bandung', no_hp: '08123456007', keluhan: 'Imunisasi anak', status: 'selesai', tanggal_daftar: '2026-01-16', poli: 'Anak' },
  { id: 8, no_rm: 'RM-008', nama: 'Hendra Gunawan', tanggal_lahir: '1982-06-11', jenis_kelamin: 'L', alamat: 'Jl. Flamboyan No. 15, Bandung', no_hp: '08123456008', keluhan: 'Gigi berlubang dan nyeri', status: 'baru', tanggal_daftar: '2026-01-17', poli: 'Gigi' },
];

function getPasienData() {
  const stored = localStorage.getItem('puskesmas_pasien');
  if (!stored) {
    localStorage.setItem('puskesmas_pasien', JSON.stringify(defaultPasien));
    return defaultPasien;
  }
  return JSON.parse(stored);
}

function savePasienData(data) {
  localStorage.setItem('puskesmas_pasien', JSON.stringify(data));
}

function getNextId() {
  const data = getPasienData();
  return data.length > 0 ? Math.max(...data.map(p => p.id)) + 1 : 1;
}

function getNextRM() {
  const data = getPasienData();
  const num = data.length + 1;
  return 'RM-' + String(num).padStart(3, '0');
}

function isLoginPage() {
  const path = window.location.pathname;
  return path.endsWith('index.html') || path.endsWith('/') || path === '';
}

function checkAuth() {
  const user = localStorage.getItem('puskesmas_user');
  if (!user) {
    if (!isLoginPage()) {
      window.location.href = getRootPath() + 'index.html';
    }
    return null;
  }
  return JSON.parse(user);
}

function logout() {
  if (confirm('Apakah Anda yakin ingin keluar?')) {
    localStorage.removeItem('puskesmas_user');
    window.location.href = getRootPath() + 'index.html';
  }
}

function getRootPath() {
  const path = window.location.pathname;
  if (path.includes('/pages/')) return '../';
  return '';
}

function renderUserInfo() {
  if (isLoginPage()) return;
  const user = checkAuth();
  if (!user) return;
  const nameEl = document.getElementById('user-name');
  const roleEl = document.getElementById('user-role');
  if (nameEl) nameEl.textContent = user.name;
  if (roleEl) roleEl.textContent = user.role;
}

function setActiveLink() {
  const path = window.location.pathname;
  document.querySelectorAll('.sidebar-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') && path.includes(link.getAttribute('href').replace('../', ''))) {
      link.classList.add('active');
    }
  });
}

function formatDate(dateStr) {
  if (!dateStr) return '-';
  const d = new Date(dateStr);
  return d.toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' });
}

function calcAge(dateStr) {
  if (!dateStr) return '-';
  const today = new Date();
  const birth = new Date(dateStr);
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age + ' tahun';
}

function statusBadge(status) {
  const map = {
    aktif: ['aktif', 'Aktif'],
    baru: ['baru', 'Baru'],
    rawat: ['rawat', 'Rawat Jalan'],
    selesai: ['selesai', 'Selesai'],
  };
  const [cls, label] = map[status] || ['selesai', status];
  return `<span class="badge-status ${cls}">${label}</span>`;
}

function showToast(msg, type = 'success') {
  const existing = document.getElementById('toast-container');
  if (existing) existing.remove();

  const colors = { success: '#1B7A4B', danger: '#C0392B', info: '#1A6FA6' };
  const icons = { success: 'bi-check-circle-fill', danger: 'bi-x-circle-fill', info: 'bi-info-circle-fill' };

  const toast = document.createElement('div');
  toast.id = 'toast-container';
  toast.style.cssText = `
    position: fixed; bottom: 24px; right: 24px; z-index: 9999;
    background: white; border-radius: 12px; padding: 16px 20px;
    box-shadow: 0 8px 30px rgba(0,0,0,0.15); display: flex; align-items: center;
    gap: 12px; min-width: 280px; border-left: 4px solid ${colors[type] || colors.info};
    animation: slideIn .3s ease;
  `;
  toast.innerHTML = `
    <i class="bi ${icons[type] || icons.info}" style="color:${colors[type]};font-size:20px;"></i>
    <span style="font-size:14px;font-weight:500;color:#1A2C2C;">${msg}</span>
  `;

  const style = document.createElement('style');
  style.textContent = '@keyframes slideIn{from{transform:translateX(100%);opacity:0}to{transform:translateX(0);opacity:1}}';
  document.head.appendChild(style);
  document.body.appendChild(toast);

  setTimeout(() => { toast.style.opacity = '0'; toast.style.transition = 'opacity .3s'; setTimeout(() => toast.remove(), 300); }, 3000);
}

function updateSidebarBadge() {
  const data = getPasienData();
  const el = document.getElementById('pasien-count');
  if (el) el.textContent = data.length;
}

document.addEventListener('DOMContentLoaded', () => {
  if (!isLoginPage()) {
    renderUserInfo();
    setActiveLink();
    updateSidebarBadge();
  }
});
