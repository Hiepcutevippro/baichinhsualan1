// ============================================================
//  script.js — THPT Gia Lộc — Khảo Sát Tâm Lý
//  PHIÊN BẢN MỚI: Lịch sử, Lưu mật khẩu, Thẻ rút gọn, UI mới
// ============================================================

const SUPABASE_URL = 'https://iwncqexhxnflcmrovfga.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_vdDbdvfTImKTM_WHhM8POw_-WrvjCZj';
let db = null;
let supabaseReady = false;
try {
    if (window.supabase && window.supabase.createClient) {
        db = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        supabaseReady = true;
    }
} catch (err) { console.warn('Supabase:', err.message); }

const THEME = { primary: '#4F8EC9', mint: '#42C8A8', dark: '#0D3348' };

const MBI_SCALE = [
    { value: 0, label: 'Không bao giờ' }, { value: 1, label: 'Vài lần/năm' },
    { value: 2, label: '1 lần/tháng' }, { value: 3, label: 'Thỉnh thoảng/tháng' },
    { value: 4, label: '1 lần/tuần' }, { value: 5, label: 'Vài lần/tuần' }, { value: 6, label: 'Mỗi ngày' }
];
const DASS_SCALE = [
    { value: 0, label: 'Không đúng với tôi chút nào' }, { value: 1, label: 'Đúng phần nào/thỉnh thoảng' },
    { value: 2, label: 'Đúng phần nhiều/thường đúng' }, { value: 3, label: 'Hoàn toàn đúng/hầu như lúc nào' }
];

const DASS_QUESTIONS = [
    { id: 'dass-1', text: 'Bạn thấy khó mà thoải mái được', scale: DASS_SCALE, sectionTitle: 'Phần 1 — DASS-21', section: 'DASS-21' },
    { id: 'dass-2', text: 'Bạn bị khô miệng', scale: DASS_SCALE, sectionTitle: 'Phần 1 — DASS-21', section: 'DASS-21' },
    { id: 'dass-3', text: 'Bạn dường như chẳng có chút cảm xúc tích cực nào', scale: DASS_SCALE, sectionTitle: 'Phần 1 — DASS-21', section: 'DASS-21' },
    { id: 'dass-4', text: 'Bạn bị rối loạn nhịp thở (thở gấp, khó thở dù chẳng làm việc gì nặng)', scale: DASS_SCALE, sectionTitle: 'Phần 1 — DASS-21', section: 'DASS-21' },
    { id: 'dass-5', text: 'Bạn thấy khó bắt tay vào công việc', scale: DASS_SCALE, sectionTitle: 'Phần 1 — DASS-21', section: 'DASS-21' },
    { id: 'dass-6', text: 'Bạn có xu hướng phản ứng thái quá với mọi tình huống', scale: DASS_SCALE, sectionTitle: 'Phần 1 — DASS-21', section: 'DASS-21' },
    { id: 'dass-7', text: 'Bạn bị ra mồ hôi (chẳng hạn như mồ hôi tay...)', scale: DASS_SCALE, sectionTitle: 'Phần 1 — DASS-21', section: 'DASS-21' },
    { id: 'dass-8', text: 'Bạn thấy mình đang suy nghĩ quá nhiều', scale: DASS_SCALE, sectionTitle: 'Phần 1 — DASS-21', section: 'DASS-21' },
    { id: 'dass-9', text: 'Bạn lo lắng về những tình huống có thể làm bạn hoảng sợ hoặc biến bạn thành trò cười', scale: DASS_SCALE, sectionTitle: 'Phần 1 — DASS-21', section: 'DASS-21' },
    { id: 'dass-10', text: 'Bạn thấy mình chẳng có gì để mong đợi cả', scale: DASS_SCALE, sectionTitle: 'Phần 1 — DASS-21', section: 'DASS-21' },
    { id: 'dass-11', text: 'Bạn thấy bản thân dễ bị kích động', scale: DASS_SCALE, sectionTitle: 'Phần 1 — DASS-21', section: 'DASS-21' },
    { id: 'dass-12', text: 'Bạn thấy khó thư giãn được', scale: DASS_SCALE, sectionTitle: 'Phần 1 — DASS-21', section: 'DASS-21' },
    { id: 'dass-13', text: 'Bạn cảm thấy chán nản, thất vọng', scale: DASS_SCALE, sectionTitle: 'Phần 1 — DASS-21', section: 'DASS-21' },
    { id: 'dass-14', text: 'Bạn không chấp nhận được việc có cái gì đó xen vào cản trở việc bạn đang làm', scale: DASS_SCALE, sectionTitle: 'Phần 1 — DASS-21', section: 'DASS-21' },
    { id: 'dass-15', text: 'Bạn thấy mình gần như hoảng loạn', scale: DASS_SCALE, sectionTitle: 'Phần 1 — DASS-21', section: 'DASS-21' },
    { id: 'dass-16', text: 'Bạn không thấy hăng hái với bất kỳ việc gì nữa', scale: DASS_SCALE, sectionTitle: 'Phần 1 — DASS-21', section: 'DASS-21' },
    { id: 'dass-17', text: 'Bạn cảm thấy mình chẳng đáng làm người', scale: DASS_SCALE, sectionTitle: 'Phần 1 — DASS-21', section: 'DASS-21' },
    { id: 'dass-18', text: 'Bạn thấy mình khá dễ phật ý, tự ái', scale: DASS_SCALE, sectionTitle: 'Phần 1 — DASS-21', section: 'DASS-21' },
    { id: 'dass-19', text: 'Bạn nghe thấy rõ tiếng nhịp tim dù chẳng làm việc gì cả', scale: DASS_SCALE, sectionTitle: 'Phần 1 — DASS-21', section: 'DASS-21' },
    { id: 'dass-20', text: 'Bạn hay sợ vô cớ', scale: DASS_SCALE, sectionTitle: 'Phần 1 — DASS-21', section: 'DASS-21' },
    { id: 'dass-21', text: 'Bạn thấy cuộc sống vô nghĩa', scale: DASS_SCALE, sectionTitle: 'Phần 1 — DASS-21', section: 'DASS-21' }
];
const MBI_QUESTIONS = [
    { id: 'mbi-1', text: 'Bạn cảm thấy kiệt quệ về mặt cảm xúc do việc học của mình.', scale: MBI_SCALE, sectionTitle: 'Phần 2 — MBI-SS', section: 'MBI-SS' },
    { id: 'mbi-2', text: 'Bạn hoài nghi về ý nghĩa và tầm quan trọng của việc học.', scale: MBI_SCALE, sectionTitle: 'Phần 2 — MBI-SS', section: 'MBI-SS' },
    { id: 'mbi-3', text: 'Bạn đã học được nhiều điều thú vị trong suốt quá trình học tập của mình.', scale: MBI_SCALE, sectionTitle: 'Phần 2 — MBI-SS', section: 'MBI-SS' },
    { id: 'mbi-4', text: 'Bạn cảm thấy kiệt sức vào cuối một ngày có tiết học.', scale: MBI_SCALE, sectionTitle: 'Phần 2 — MBI-SS', section: 'MBI-SS' },
    { id: 'mbi-5', text: 'Trong các tiết học, bạn cảm thấy tự tin: bạn hoàn thành các nhiệm vụ một cách hiệu quả.', scale: MBI_SCALE, sectionTitle: 'Phần 2 — MBI-SS', section: 'MBI-SS' },
    { id: 'mbi-6', text: 'Bạn cảm thấy mệt mỏi khi thức dậy để đối mặt với một ngày đi học khác.', scale: MBI_SCALE, sectionTitle: 'Phần 2 — MBI-SS', section: 'MBI-SS' },
    { id: 'mbi-7', text: 'Bạn cảm thấy hào hứng khi hoàn thành xuất sắc mục tiêu học tập của mình.', scale: MBI_SCALE, sectionTitle: 'Phần 2 — MBI-SS', section: 'MBI-SS' },
    { id: 'mbi-8', text: 'Đối với bạn, việc học và lên lớp là một nỗ lực cực kỳ lớn.', scale: MBI_SCALE, sectionTitle: 'Phần 2 — MBI-SS', section: 'MBI-SS' },
    { id: 'mbi-9', text: 'Bạn trở nên ít hứng thú với việc học hơn kể từ khi vào ngôi trường này.', scale: MBI_SCALE, sectionTitle: 'Phần 2 — MBI-SS', section: 'MBI-SS' },
    { id: 'mbi-10', text: 'Bạn cảm thấy ít thiết tha/hứng thú hơn với việc học của mình.', scale: MBI_SCALE, sectionTitle: 'Phần 2 — MBI-SS', section: 'MBI-SS' },
    { id: 'mbi-11', text: 'Bạn tự đánh giá bản thân là một học sinh/sinh viên giỏi.', scale: MBI_SCALE, sectionTitle: 'Phần 2 — MBI-SS', section: 'MBI-SS' },
    { id: 'mbi-12', text: 'Bạn ngày càng hoài nghi hơn về tiềm năng của bản thân và tính hữu ích của việc học.', scale: MBI_SCALE, sectionTitle: 'Phần 2 — MBI-SS', section: 'MBI-SS' },
    { id: 'mbi-13', text: 'Bạn cảm thấy việc học đang bào mòn/hút cạn năng lượng của bản thân.', scale: MBI_SCALE, sectionTitle: 'Phần 2 — MBI-SS', section: 'MBI-SS' },
    { id: 'mbi-14', text: 'Bạn đã hoàn thành được nhiều việc có giá trị trong quá trình học tập.', scale: MBI_SCALE, sectionTitle: 'Phần 2 — MBI-SS', section: 'MBI-SS' },
    { id: 'mbi-15', text: 'Bạn tin rằng mình đóng góp một cách hiệu quả vào các lớp học mà mình tham gia.', scale: MBI_SCALE, sectionTitle: 'Phần 2 — MBI-SS', section: 'MBI-SS' }
];

const DASS_NOISE_QUESTIONS = [
    { id: 'dass-noise-1', text: 'Bạn chưa bao giờ để những thất bại hay rắc rối cá nhân làm ảnh hưởng đến tinh thần hoặc giấc ngủ của mình quá một ngày', scale: DASS_SCALE, sectionTitle: 'Phần 1 — DASS-21', section: 'DASS-21', isNoise: true },
    { id: 'dass-noise-2', text: 'Bạn vẫn tìm thấy những nguồn năng lượng tích cực và sự bình yên trong các hoạt động hằng ngày', scale: DASS_SCALE, sectionTitle: 'Phần 1 — DASS-21', section: 'DASS-21', isNoise: true },
    { id: 'dass-noise-4', text: 'Đôi khi bạn cảm thấy hụt hẫng hoặc có chút thất vọng khi những nỗ lực của bản thân không đem lại kết quả như kỳ vọng', scale: DASS_SCALE, sectionTitle: 'Phần 1 — DASS-21', section: 'DASS-21', isNoise: true }
];
const MBI_NOISE_QUESTIONS = [
    { id: 'mbi-noise-1', text: 'Bạn hiếm khi phải thức khuya hay hy sinh thời gian ngủ của mình để cố làm cho xong các bài tập được giao', scale: MBI_SCALE, sectionTitle: 'Phần 2 — MBI-SS', section: 'MBI-SS', isNoise: true },
    { id: 'mbi-noise-2', text: 'Bạn chưa bao giờ cảm thấy chạnh lòng hay áp lực khi thấy các bạn xung quanh đạt điểm số cao hơn mình.', scale: MBI_SCALE, sectionTitle: 'Phần 2 — MBI-SS', section: 'MBI-SS', isNoise: true },
    { id: 'mbi-noise-3', text: 'Chỉ cần một khoảng nghỉ ngắn giữa giờ cũng đủ để bạn lấy lại tinh thần thoải mái cho các tiết học tiếp theo.', scale: MBI_SCALE, sectionTitle: 'Phần 2 — MBI-SS', section: 'MBI-SS', isNoise: true }
];

const DASS_ORDER_IDS = ['dass-1', 'dass-2', 'dass-3', 'dass-4', 'dass-noise-1', 'dass-5', 'dass-6', 'dass-7', 'dass-8', 'dass-9', 'dass-noise-2', 'dass-10', 'dass-11', 'dass-12', 'dass-13', 'dass-14', 'dass-15', 'dass-16', 'dass-17', 'dass-18', 'dass-noise-4', 'dass-19', 'dass-20', 'dass-21'];
const MBI_ORDER_IDS = ['mbi-1', 'mbi-2', 'mbi-3', 'mbi-noise-1', 'mbi-4', 'mbi-5', 'mbi-6', 'mbi-7', 'mbi-noise-2', 'mbi-8', 'mbi-9', 'mbi-10', 'mbi-11', 'mbi-12', 'mbi-noise-3', 'mbi-13', 'mbi-14', 'mbi-15'];

const ALL_QUESTIONS_BY_ID = {};
[...DASS_QUESTIONS, ...DASS_NOISE_QUESTIONS, ...MBI_QUESTIONS, ...MBI_NOISE_QUESTIONS].forEach(q => { ALL_QUESTIONS_BY_ID[q.id] = q; });
let QUESTIONS = [...DASS_ORDER_IDS, ...MBI_ORDER_IDS].map((id, idx) => ({ ...ALL_QUESTIONS_BY_ID[id], order: idx + 1 }));

const DASS_STRESS = ['dass-1', 'dass-6', 'dass-8', 'dass-11', 'dass-12', 'dass-14', 'dass-18'];
const DASS_ANXIETY = ['dass-2', 'dass-4', 'dass-7', 'dass-9', 'dass-15', 'dass-19', 'dass-20'];
const DASS_DEPRESSION = ['dass-3', 'dass-5', 'dass-10', 'dass-13', 'dass-16', 'dass-17', 'dass-21'];
const MBI_EMOTIONAL_EXHAUSTION = ['mbi-1', 'mbi-4', 'mbi-6', 'mbi-8', 'mbi-13'];
const MBI_CYNICISM = ['mbi-2', 'mbi-9', 'mbi-10', 'mbi-12'];
const MBI_ACADEMIC_EFFICACY = ['mbi-3', 'mbi-5', 'mbi-7', 'mbi-11', 'mbi-14', 'mbi-15'];
const MBI_ALL_REAL_IDS = [...MBI_EMOTIONAL_EXHAUSTION, ...MBI_CYNICISM, ...MBI_ACADEMIC_EFFICACY];
// Phát hiện "trả lời một màu": chọn CÙNG 1 mức cho cả 15 câu MBI-SS thật (không tính 3 câu
// kiểm định). Các câu MBI được quy đổi cùng chiều theo mức độ dấu hiệu được chọn,
// vì vậy bất kỳ giá trị đồng nhất nào đều cần được kiểm tra riêng thay vì tự động kết luận
// một tiểu mục có rủi ro cao.
// (test/qua loa) chứ không phải phản hồi cân nhắc thật. Chỉ tính khi có đủ cả 15 câu trả lời
// (an toàn khi answers rỗng/thiếu — vd. lúc renderResult chạy cho ngữ cảnh khác).
function isMbiAnswerFlat(ansObj) {
    if (!ansObj) return false;
    const vals = MBI_ALL_REAL_IDS.map(id => ansObj[id]);
    if (vals.some(v => v === undefined)) return false;
    return new Set(vals).size === 1;
}

// ===== STATE =====
let step = 'auth';
let authMode = 'login';
let currentIndex = 0;
let answers = {};
let currentScores = {};
let communityStats = { count: 0, emotionalExhaustion: 0, cynicism: 0, academicEfficacy: 0, stress: 0, anxiety: 0, depression: 0 };
let dassBarChartInstance = null;
let donutChartInstance = null;
let communityMbiChartInstance = null;
let communityDassChartInstance = null;
let currentUser = null;
let authLoading = false;
let authError = '';
let authSuccess = '';
let collapseState = { mbi: false, dass: false, community: false, history: true };
let lastSaveOk = true; // false nếu lần lưu kết quả gần nhất lên Cloud bị lỗi
let isSubmitting = false; // true trong lúc đang gửi bài — chặn bấm "Nộp bài" 2 lần gây lưu trùng

// ===== SAVED CREDENTIALS (Remember Me) =====
function getSavedCredentials() {
    try { return JSON.parse(localStorage.getItem('mh_saved_creds') || 'null'); } catch { return null; }
}
function saveCredentials(email) {
    localStorage.setItem('mh_saved_creds', JSON.stringify({ email }));
}
function clearSavedCredentials() {
    localStorage.removeItem('mh_saved_creds');
}

// ===== SURVEY HISTORY (per user) =====
function getHistoryKey(email) { return 'mh_history_' + btoa(email || 'incognito'); }

function getUserHistory(email) {
    try { return JSON.parse(localStorage.getItem(getHistoryKey(email)) || '[]'); } catch { return []; }
}

function saveToHistory(email, scores) {
    if (!email) return;
    const key = getHistoryKey(email);
    const history = getUserHistory(email);
    history.unshift({
        date: new Date().toISOString(),
        scores: { ...scores }
    });
    // Keep last 20 records
    const trimmed = history.slice(0, 20);
    localStorage.setItem(key, JSON.stringify(trimmed));
}

// ===== LOCAL USERS DB =====
let localUsersDb = JSON.parse(localStorage.getItem('mental_health_users') || '[]');

// ===== COMMUNITY STATS =====
try {
    const saved = localStorage.getItem('mental_health_survey_v2');
    if (saved) communityStats = JSON.parse(saved);
} catch (e) { }

// ===== AUTH UTILS =====
async function hashPassword(password) {
    const data = new TextEncoder().encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
}
async function verifyLocalPassword(user, password) {
    if (user.passwordHash) return user.passwordHash === await hashPassword(password);
    return user.password === password;
}
async function setLocalPassword(user, password) {
    user.passwordHash = await hashPassword(password);
    delete user.password;
}

// ===== AUTH =====
async function handleAuthSubmit(e) {
    e.preventDefault();
    authLoading = true; authError = ''; authSuccess = '';
    renderApp();
    const fd = new FormData(e.target);
    const email = fd.get('email').trim();
    const password = fd.get('password');
    const displayName = fd.get('name') ? fd.get('name').trim() : '';
    const rememberMe = fd.get('rememberMe') === 'on';

    try {
        if (supabaseReady) {
            if (authMode === 'register') {
                const { data, error } = await db.auth.signUp({
                    email, password,
                    options: { data: { display_name: displayName || email.split('@')[0] } }
                });
                if (error) throw error;
                currentUser = { id: data.user.id, name: displayName || email.split('@')[0], email, isIncognito: false };
            } else {
                const { data, error } = await db.auth.signInWithPassword({ email, password });
                if (error) throw error;
                currentUser = { id: data.user.id, name: data.user.user_metadata?.display_name || email.split('@')[0], email, isIncognito: false };
            }
        } else {
            if (authMode === 'register') {
                const exists = localUsersDb.find(u => u.email === email);
                if (exists) throw new Error('Email này đã được đăng ký!');
                const newUser = { email, name: displayName || email.split('@')[0] };
                await setLocalPassword(newUser, password);
                localUsersDb.push(newUser);
                localStorage.setItem('mental_health_users', JSON.stringify(localUsersDb));
                currentUser = { id: null, name: newUser.name, email, isIncognito: false };
            } else {
                const user = localUsersDb.find(u => u.email === email);
                if (!user) throw new Error('Sai email hoặc mật khẩu!');
                const ok = await verifyLocalPassword(user, password);
                if (!ok) throw new Error('Sai email hoặc mật khẩu!');
                currentUser = { id: null, name: user.name, email, isIncognito: false };
            }
        }

        if (rememberMe) { saveCredentials(email); }
        else { clearSavedCredentials(); }

        step = 'start';
    } catch (err) {
        const rawMsg = (err && typeof err.message === 'string') ? err.message : '';
        const lower = rawMsg.toLowerCase();
        if (rawMsg === 'Invalid login credentials') {
            authError = 'Sai email hoặc mật khẩu!';
        } else if (lower.includes('already registered') || lower.includes('already exists') || err?.code === 'user_already_exists') {
            authError = 'Email này đã được đăng ký!';
        } else if (lower.includes('email not confirmed') || err?.code === 'email_not_confirmed') {
            authError = 'Tài khoản này chưa được xác nhận nên chưa đăng nhập được. Nếu bạn vừa tạo tài khoản, hãy thử tạo lại tài khoản khác hoặc liên hệ quản trị viên để được kích hoạt.';
        } else if (lower.includes('password should contain') || lower.includes('password is too weak') || err?.code === 'weak_password') {
            authError = 'Mật khẩu chưa đủ mạnh: cần có ít nhất 1 chữ thường, 1 chữ hoa và 1 chữ số.';
        } else if (!rawMsg || rawMsg === '{}' || rawMsg === '[object Object]') {
            authError = 'Có lỗi xảy ra, vui lòng thử lại. Nếu vẫn gặp lỗi, thử tắt trình chặn quảng cáo (AdBlock) hoặc dùng cửa sổ ẩn danh.';
        } else {
            authError = rawMsg;
        }
    }
    authLoading = false;
    renderApp();
}

function handleIncognitoLogin() {
    const randomId = Math.floor(Math.random() * 9000) + 1000;
    currentUser = { id: null, name: 'Học sinh #' + randomId, isIncognito: true };
    step = 'start';
    renderApp();
}

function showChangePasswordModal() {
    if (!currentUser || currentUser.isIncognito) return;
    // Remove existing modal if any
    const existing = document.getElementById('changePwModal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.id = 'changePwModal';
    modal.style.cssText = 'position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;padding:1rem;';
    modal.innerHTML = `
        <div style="position:absolute;inset:0;background:rgba(13,51,72,0.45);backdrop-filter:blur(6px);" onclick="closeChangePasswordModal()"></div>
        <div style="position:relative;z-index:1;width:100%;max-width:420px;background:#fff;border-radius:24px;padding:2rem;box-shadow:0 24px 64px rgba(13,51,72,0.22);border:1px solid rgba(79,142,201,0.12);">
            <div class="flex items-center gap-3 mb-5">
                <div style="width:40px;height:40px;border-radius:12px;background:linear-gradient(135deg,#4F8EC9,#42C8A8);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                    <i data-lucide="key-round" style="width:18px;height:18px;color:#fff;"></i>
                </div>
                <div>
                    <h3 style="font-size:1.1rem;font-weight:900;color:#0D3348;margin:0;line-height:1.2;">Đổi mật khẩu</h3>
                    <p style="font-size:11px;color:#94a3b8;font-weight:600;margin:0;">${currentUser.email || ''}</p>
                </div>
                <button onclick="closeChangePasswordModal()" style="margin-left:auto;width:32px;height:32px;border-radius:8px;background:#f1f5f9;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;color:#64748b;">
                    <i data-lucide="x" style="width:16px;height:16px;"></i>
                </button>
            </div>
            <div id="cpwError" style="display:none;margin-bottom:1rem;padding:0.75rem;border-radius:12px;background:#FFF1F2;border:1px solid #FECDD3;color:#BE123C;font-size:13px;font-weight:700;"></div>
            <div id="cpwSuccess" style="display:none;margin-bottom:1rem;padding:0.75rem;border-radius:12px;background:#F0FDF4;border:1px solid #BBF7D0;color:#15803D;font-size:13px;font-weight:700;"></div>
            <div style="margin-bottom:1rem;">
                <label style="display:block;font-size:10px;font-weight:900;color:#94a3b8;text-transform:uppercase;letter-spacing:0.12em;margin-bottom:6px;">Mật khẩu mới</label>
                <div class="password-wrapper">
                    <input type="password" id="cpwNew" placeholder="Tối thiểu 6 ký tự" minlength="6"
                        style="width:100%;background:#F8FAFC;border:1.5px solid #E2E8F0;border-radius:12px;padding:0.75rem 3rem 0.75rem 1rem;font-size:14px;color:#1e293b;outline:none;font-family:inherit;"
                        oninput="this.style.borderColor='#4F8EC9'">
                    <button type="button" class="password-toggle-btn" onclick="toggleCpwVisibility('cpwNew','cpwNewIcon')" style="right:0.75rem;">
                        <i data-lucide="eye-off" id="cpwNewIcon" style="width:18px;height:18px;"></i>
                    </button>
                </div>
            </div>
            <div style="margin-bottom:1.5rem;">
                <label style="display:block;font-size:10px;font-weight:900;color:#94a3b8;text-transform:uppercase;letter-spacing:0.12em;margin-bottom:6px;">Xác nhận mật khẩu mới</label>
                <div class="password-wrapper">
                    <input type="password" id="cpwConfirm" placeholder="Nhập lại mật khẩu mới"
                        style="width:100%;background:#F8FAFC;border:1.5px solid #E2E8F0;border-radius:12px;padding:0.75rem 3rem 0.75rem 1rem;font-size:14px;color:#1e293b;outline:none;font-family:inherit;"
                        oninput="this.style.borderColor='#4F8EC9'">
                    <button type="button" class="password-toggle-btn" onclick="toggleCpwVisibility('cpwConfirm','cpwConfirmIcon')" style="right:0.75rem;">
                        <i data-lucide="eye-off" id="cpwConfirmIcon" style="width:18px;height:18px;"></i>
                    </button>
                </div>
            </div>
            <button onclick="submitChangePassword()" id="cpwSubmitBtn" class="btn-primary w-full" style="border-radius:14px;padding:0.9rem 1.5rem;font-size:1rem;">
                Cập nhật mật khẩu <i data-lucide="check-circle" style="width:18px;height:18px;"></i>
            </button>
        </div>`;
    document.body.appendChild(modal);
    lucide.createIcons();
    setTimeout(() => { const el = document.getElementById('cpwNew'); if (el) el.focus(); }, 50);
}

function toggleCpwVisibility(inputId, iconId) {
    const input = document.getElementById(inputId);
    const btn = input ? input.nextElementSibling : null;
    if (!input || !btn) return;
    const hidden = input.type === 'password';
    input.type = hidden ? 'text' : 'password';
    btn.innerHTML = `<i data-lucide="${hidden ? 'eye' : 'eye-off'}" id="${iconId}" style="width:18px;height:18px;"></i>`;
    lucide.createIcons();
}

function closeChangePasswordModal() {
    const modal = document.getElementById('changePwModal');
    if (modal) modal.remove();
}

async function submitChangePassword() {
    const newPassword = document.getElementById('cpwNew')?.value || '';
    const confirmPassword = document.getElementById('cpwConfirm')?.value || '';
    const errEl = document.getElementById('cpwError');
    const sucEl = document.getElementById('cpwSuccess');
    const btn = document.getElementById('cpwSubmitBtn');
    const showErr = (msg) => { if (errEl) { errEl.textContent = msg; errEl.style.display = 'block'; } if (sucEl) sucEl.style.display = 'none'; };
    const showSuc = (msg) => { if (sucEl) { sucEl.textContent = msg; sucEl.style.display = 'block'; } if (errEl) errEl.style.display = 'none'; };
    if (!newPassword) { showErr('Vui lòng nhập mật khẩu mới.'); return; }
    if (newPassword.length < 6) { showErr('Mật khẩu mới phải có ít nhất 6 ký tự.'); return; }
    if (newPassword !== confirmPassword) { showErr('Xác nhận mật khẩu không khớp.'); return; }
    if (btn) { btn.disabled = true; btn.textContent = 'Đang cập nhật...'; }
    try {
        if (supabaseReady) {
            const { error } = await db.auth.updateUser({ password: newPassword });
            if (error) throw error;
        } else {
            const userIndex = localUsersDb.findIndex(u => u.email === currentUser.email);
            if (userIndex === -1) throw new Error('Không tìm thấy tài khoản.');
            await setLocalPassword(localUsersDb[userIndex], newPassword);
            localStorage.setItem('mental_health_users', JSON.stringify(localUsersDb));
        }
        const saved = getSavedCredentials();
        if (saved && saved.email === currentUser.email) saveCredentials(currentUser.email);
        showSuc('Đổi mật khẩu thành công!');
        if (btn) { btn.disabled = false; btn.innerHTML = 'Cập nhật mật khẩu <i data-lucide="check-circle" style="width:18px;height:18px;"></i>'; lucide.createIcons(); }
        setTimeout(() => closeChangePasswordModal(), 1800);
    } catch (err) {
        showErr(err.message || 'Không thể đổi mật khẩu lúc này.');
        if (btn) { btn.disabled = false; btn.innerHTML = 'Cập nhật mật khẩu <i data-lucide="check-circle" style="width:18px;height:18px;"></i>'; lucide.createIcons(); }
    }
}

async function handleChangePassword() {
    if (!currentUser || currentUser.isIncognito) {
        window.alert('Bạn đang ở chế độ ẩn danh nên không thể đổi mật khẩu.');
        return;
    }
    showChangePasswordModal();
}

async function handleLogout() {
    if (supabaseReady) { try { await db.auth.signOut(); } catch (e) { } }
    currentUser = null; step = 'auth'; authMode = 'login'; authError = ''; authSuccess = '';
    renderApp();
}

// ===== SAVE RESULT =====
async function saveResult(scores) {
    const record = {
        user_name: currentUser?.isIncognito ? currentUser.name : (currentUser?.name || 'Ẩn danh'),
        is_incognito: currentUser?.isIncognito || false,
        stress: scores.stress, anxiety: scores.anxiety, depression: scores.depression,
        emotional_exhaustion: scores.emotionalExhaustion,
        cynicism: scores.cynicism, academic_efficacy: scores.academicEfficacy
    };
    lastSaveOk = true;
    if (supabaseReady) {
        if (currentUser?.id) record.user_id = currentUser.id;
        try {
            const { error } = await db.from('survey_results').insert([record]);
            if (error) { console.error('Lỗi lưu Supabase:', error.message); lastSaveOk = false; }
        } catch (err) {
            console.error('Lỗi lưu Supabase:', err.message);
            lastSaveOk = false;
        }
    }
    // Always save to localStorage history
    if (currentUser && !currentUser.isIncognito && currentUser.email) {
        saveToHistory(currentUser.email, scores);
    }
    // Community stats
    communityStats.count += 1;
    communityStats.emotionalExhaustion += scores.emotionalExhaustion;
    communityStats.cynicism += scores.cynicism;
    communityStats.academicEfficacy += scores.academicEfficacy;
    communityStats.stress += scores.stress;
    communityStats.anxiety += scores.anxiety;
    communityStats.depression += scores.depression;
    localStorage.setItem('mental_health_survey_v2', JSON.stringify(communityStats));
}

async function loadCommunityStats() {
    if (!supabaseReady) return;
    try {
        const { data, error } = await db.from('survey_results').select('*');
        if (error || !data || data.length === 0) return;
        let totalEE = 0, totalCY = 0, totalAE = 0, totalST = 0, totalAX = 0, totalDE = 0;
        data.forEach(row => {
            totalEE += row.emotional_exhaustion || 0; totalCY += row.cynicism || 0;
            totalAE += row.academic_efficacy || 0; totalST += row.stress || 0;
            totalAX += row.anxiety || 0; totalDE += row.depression || 0;
        });
        communityStats = { count: data.length, emotionalExhaustion: totalEE, cynicism: totalCY, academicEfficacy: totalAE, stress: totalST, anxiety: totalAX, depression: totalDE };
    } catch (err) { console.error('Lỗi tải thống kê:', err.message); }
}

// ===== SCORING =====
const getSum = (ansObj, ids) => ids.reduce((total, id) => total + (ansObj[id] || 0), 0);

function getLevelConfig(scale, rawScore) {
    const score = rawScore * 2;
    let label = 'Tốt';
    if (scale === 'stress') {
        if (score >= 34) label = 'Rất nặng'; else if (score >= 26) label = 'Nặng';
        else if (score >= 19) label = 'Vừa'; else if (score >= 15) label = 'Nhẹ';
    } else if (scale === 'depression') {
        if (score >= 28) label = 'Rất nặng'; else if (score >= 21) label = 'Nặng';
        else if (score >= 14) label = 'Vừa'; else if (score >= 10) label = 'Nhẹ';
    } else if (scale === 'anxiety') {
        if (score >= 20) label = 'Rất nặng'; else if (score >= 15) label = 'Nặng';
        else if (score >= 10) label = 'Vừa'; else if (score >= 8) label = 'Nhẹ';
    }
    if (label === 'Tốt') return { label, className: 'border-emerald-200 bg-emerald-50 text-emerald-800', dot: 'bg-emerald-500', hex: '#10B981', icon: 'smile' };
    if (label === 'Nhẹ') return { label, className: 'border-sky-200 bg-sky-50 text-sky-800', dot: 'bg-sky-500', hex: '#0ea8f0', icon: 'meh' };
    if (label === 'Vừa') return { label, className: 'border-amber-200 bg-amber-50 text-amber-900', dot: 'bg-amber-500', hex: '#F59E0B', icon: 'meh' };
    return { label, className: 'border-rose-200 bg-rose-50 text-rose-900', dot: 'bg-rose-500', hex: '#F43F5E', icon: 'alert-triangle' };
}

// Lời khuyên riêng cho từng thang đo (Stress / Lo âu / Trầm cảm / Burnout) ở từng mức độ.
// Trước đây dùng chung 1 hàm getAdvice(label) cho cả 3 thẻ DASS -> thẻ "Trầm cảm" và "Lo âu"
// bị hiển thị nhầm câu văn viết riêng cho "Stress" (vd. "dấu hiệu căng thẳng nhẹ") ở mức Nhẹ.
const ADVICE_TEXT = {
    stress: {
        'Tốt': 'Bạn đang duy trì trạng thái tâm lý khá ổn định. Hãy tiếp tục ngủ đủ giấc, vận động nhẹ và giữ kết nối với bạn bè.',
        'Nhẹ': 'Có vài dấu hiệu căng thẳng nhẹ. Thử dành 10–15 phút mỗi ngày để nghỉ ngơi, hít thở sâu hoặc đi dạo.',
        'Vừa': 'Mức độ căng thẳng đang ở ngưỡng vừa. Bạn nên sắp xếp lại lịch học hợp lý hơn, thử các kỹ thuật thư giãn và chia sẻ cảm xúc với người thân.',
        'Nặng': 'Chỉ số căng thẳng đang ở mức nặng. Bạn nên tìm đến phòng tư vấn tâm lý học đường hoặc chuyên gia để được hỗ trợ sớm.',
        'Rất nặng': 'Chỉ số căng thẳng đang ở mức rất cao. Khuyến khích bạn liên hệ ngay với chuyên gia tâm lý hoặc đường dây hỗ trợ sức khỏe tâm thần.'
    },
    anxiety: {
        'Tốt': 'Bạn đang duy trì trạng thái tâm lý khá ổn định. Hãy tiếp tục ngủ đủ giấc, vận động nhẹ và giữ kết nối với bạn bè.',
        'Nhẹ': 'Có vài dấu hiệu lo âu nhẹ. Thử các bài tập hít thở sâu, thư giãn cơ hoặc dành thời gian cho hoạt động yêu thích để trấn tĩnh tinh thần.',
        'Vừa': 'Mức độ lo âu đang ở ngưỡng vừa. Hãy thử ghi lại điều khiến bạn lo lắng, tập trung vào những gì có thể kiểm soát và chia sẻ với người bạn tin tưởng.',
        'Nặng': 'Chỉ số lo âu đang ở mức nặng. Bạn nên tìm đến phòng tư vấn tâm lý học đường hoặc chuyên gia để được hỗ trợ sớm.',
        'Rất nặng': 'Chỉ số lo âu đang ở mức rất cao. Khuyến khích bạn liên hệ ngay với chuyên gia tâm lý hoặc đường dây hỗ trợ sức khỏe tâm thần.'
    },
    depression: {
        'Tốt': 'Bạn đang duy trì trạng thái tâm lý khá ổn định. Hãy tiếp tục ngủ đủ giấc, vận động nhẹ và giữ kết nối với bạn bè.',
        'Nhẹ': 'Có vài dấu hiệu trầm buồn nhẹ. Thử duy trì thói quen sinh hoạt đều đặn, vận động nhẹ và giữ kết nối với bạn bè, người thân.',
        'Vừa': 'Mức độ trầm cảm đang ở ngưỡng vừa. Đừng ngần ngại chia sẻ cảm xúc với người bạn tin tưởng, và cân nhắc trò chuyện cùng thầy cô tư vấn tâm lý.',
        'Nặng': 'Chỉ số trầm cảm đang ở mức nặng. Bạn nên tìm đến phòng tư vấn tâm lý học đường hoặc chuyên gia để được hỗ trợ sớm.',
        'Rất nặng': 'Chỉ số trầm cảm đang ở mức rất cao. Khuyến khích bạn liên hệ ngay với chuyên gia tâm lý hoặc đường dây hỗ trợ sức khỏe tâm thần.'
    },
    burnout: {
        'Tốt': 'Bạn đang duy trì nhịp độ học tập khá cân bằng. Hãy tiếp tục giữ thói quen học - nghỉ hợp lý và ngủ đủ giấc.',
        'Nhẹ': 'Có vài dấu hiệu quá tải học tập nhẹ. Thử sắp xếp lại thời gian biểu, xen kẽ giờ học với giờ nghỉ ngơi hợp lý.',
        'Vừa': 'Mức độ kiệt sức học tập đang ở ngưỡng vừa. Hãy thử chia nhỏ mục tiêu học tập và dành thời gian cho sở thích cá nhân để lấy lại động lực.',
        'Nặng': 'Chỉ số kiệt sức học tập đang ở mức nặng. Bạn nên tìm đến phòng tư vấn tâm lý học đường hoặc thầy cô để được hỗ trợ sớm.',
        'Rất nặng': 'Chỉ số kiệt sức học tập đang ở mức rất cao. Khuyến khích bạn liên hệ ngay với chuyên gia tâm lý hoặc đường dây hỗ trợ sức khỏe tâm thần.'
    }
};
function getAdvice(scaleId, label) {
    const table = ADVICE_TEXT[scaleId] || ADVICE_TEXT.stress;
    return table[label] || table['Rất nặng'];
}

const SEVERITY_LEVELS = ['Tốt', 'Nhẹ', 'Vừa', 'Nặng', 'Rất nặng'];
const severityRank = (label) => SEVERITY_LEVELS.indexOf(label);
// Dùng chung cho toàn bộ trang Admin: chỉ tính "Cần chú ý" từ mức "Nặng" trở lên
// (Nhẹ và Vừa được xem là bình thường, không đưa vào cảnh báo)
const isAttentionLevel = (label) => severityRank(label) >= severityRank('Nặng');

function getOverallMentalState(scores) {
    const rows = [{ id: 'stress' }, { id: 'anxiety' }, { id: 'depression' }];
    const configs = rows.map(r => ({ id: r.id, config: getLevelConfig(r.id, scores[r.id]) }));
    return configs.reduce((worst, cur) => severityRank(cur.config.label) > severityRank(worst.config.label) ? cur : worst);
}
function getMbiRiskPct(scores) {
    // Kiệt quệ và hoài nghi là nhóm rủi ro: điểm càng cao thì nguy cơ càng cao.
    // Hiệu quả học tập là nhóm tích cực: điểm càng cao thì nguy cơ càng thấp.
    // Dùng trung bình chuẩn hóa để một tiểu mục không tự biến toàn bộ kết quả thành 100%.
    const exhPct = (scores.emotionalExhaustion / 30) * 100;
    const cynPct = (scores.cynicism / 24) * 100;
    const lowEfficacyPct = (Math.max(0, 36 - scores.academicEfficacy) / 36) * 100;
    return Math.round((exhPct + cynPct + lowEfficacyPct) / 3);
}
function getMbiLevelConfig(riskPct) {
    let label = 'Tốt';
    if (riskPct >= 85) label = 'Rất nặng'; else if (riskPct >= 65) label = 'Nặng';
    else if (riskPct >= 45) label = 'Vừa'; else if (riskPct >= 25) label = 'Nhẹ';
    if (label === 'Tốt') return { label, hex: '#10B981' };
    if (label === 'Nhẹ') return { label, hex: THEME.primary };
    if (label === 'Vừa') return { label, hex: '#F59E0B' };
    return { label, hex: '#F43F5E' };
}
function getGaugeBandColor(label) {
    if (label === 'Tốt') return '#10B981';
    if (label === 'Nặng' || label === 'Rất nặng') return '#F43F5E';
    return '#F59E0B';
}
// Icon dùng chung theo mức độ (khớp đúng bộ icon đã dùng trong getLevelConfig()),
// tách riêng để renderResult() có thể dùng cho mức độ TỔNG HỢP (DASS-21 lẫn MBI-SS)
// thay vì chỉ icon riêng của getLevelConfig (vốn chỉ nhận rawScore của MỘT thang DASS).
function getIconForLabel(label) {
    if (label === 'Tốt') return 'smile';
    if (label === 'Nặng' || label === 'Rất nặng') return 'alert-triangle';
    return 'meh';
}
const GAUGE_MARKER_POSITION = { 'Tốt': 16, 'Nhẹ': 41, 'Vừa': 58, 'Nặng': 75, 'Rất nặng': 92 };
function getClosingLine(label) {
    switch (label) {
        case 'Tốt': return 'Hãy tiếp tục duy trì nhé!';
        case 'Nhẹ': return 'Đừng quên dành thời gian nghỉ ngơi cho bản thân nhé!';
        case 'Vừa': return 'Hãy quan tâm đến bản thân nhiều hơn trong thời gian tới nhé!';
        default: return 'Đừng ngần ngại tìm kiếm sự hỗ trợ nhé, bạn không đơn độc đâu!';
    }
}

// ===== TREND HELPERS =====
function getTrend(curr, prev) {
    if (prev === undefined || prev === null) return null;
    const diff = curr - prev;
    if (diff === 0) return { dir: 'same', icon: '→', label: 'Không đổi', cls: 'trend-same' };
    if (diff > 0) return { dir: 'up', icon: '↑', label: '+' + diff, cls: 'trend-up' };
    return { dir: 'down', icon: '↓', label: String(diff), cls: 'trend-down' };
}

// For DASS, higher = worse. For efficacy, higher = better.
function renderTrendBadge(curr, prev, lowerIsBetter = true) {
    const t = getTrend(curr, prev);
    if (!t) return '';
    let isBetter = lowerIsBetter ? t.dir === 'down' : t.dir === 'up';
    let color = t.dir === 'same' ? '#94A3B8' : (isBetter ? '#10B981' : '#F43F5E');
    let emoji = t.dir === 'same' ? '→' : (isBetter ? '↑ tốt hơn' : '↓ tệ hơn');
    return `<span class="score-badge" style="background:${color}15; color:${color};">${emoji} ${Math.abs(curr - prev)}</span>`;
}

// ===== SPARKLINE SVG =====
function renderSparkline(values, color = '#4F8EC9', width = 80, height = 30) {
    if (values.length < 2) return '';
    const max = Math.max(...values, 1);
    const min = Math.min(...values, 0);
    const range = max - min || 1;
    const pts = values.map((v, i) => {
        const x = (i / (values.length - 1)) * width;
        const y = height - ((v - min) / range) * (height - 4) - 2;
        return `${x},${y}`;
    }).join(' ');
    return `<svg class="sparkline" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none"><polyline points="${pts}" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>`;
}

// ===== GAUGE BAR =====
function renderGaugeBar(title, label) {
    const bandColor = getGaugeBandColor(label);
    const pos = GAUGE_MARKER_POSITION[label];
    return `<div class="rounded-2xl border border-slate-100 bg-white p-4">
        <div class="flex items-center justify-between mb-3 gap-2">
            <span class="text-xs font-black uppercase tracking-wider text-slate-400">${title}</span>
            <span class="score-badge" style="background:${bandColor}18; color:${bandColor};">${label}</span>
        </div>
        <div class="gauge-track relative">
            <div class="absolute" style="left:${pos}%; top:50%; transform:translate(-50%,-50%); width:18px; height:18px; border-radius:50%; background:#fff; box-shadow:0 0 0 3px ${bandColor}, 0 2px 8px rgba(0,0,0,0.15);"></div>
        </div>
        <div class="flex justify-between mt-2 text-[9px] font-bold uppercase tracking-wider text-slate-400">
            <span>Tốt</span><span>Nhẹ · Vừa</span><span>Nặng · Rất nặng</span>
        </div>
    </div>`;
}

function getFirstName(fullName) {
    if (!fullName) return '';
    const parts = fullName.trim().split(' ');
    return parts[parts.length - 1];
}

// ===== COLLAPSE TOGGLE =====
function toggleCollapse(key) {
    collapseState[key] = !collapseState[key];
    const body = document.getElementById('collapse-' + key);
    const icon = document.getElementById('icon-' + key);
    if (body) body.classList.toggle('open', collapseState[key]);
    if (icon) icon.classList.toggle('open', collapseState[key]);
}

// ===== RENDER AUTH =====
function renderAuth() {
    const isLogin = authMode === 'login';
    const saved = getSavedCredentials();
    const cloudBadge = supabaseReady
        ? '<span class="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-[10px] font-bold text-emerald-700 uppercase tracking-widest"><i data-lucide="cloud" class="w-3 h-3"></i> Trực tuyến</span>'
        : '';

    return `
        <div class="flex-1 flex items-center justify-center px-4 py-10 auth-bg min-h-screen">
            <div class="w-full max-w-md">
                <!-- Logo card -->
                <div class="text-center mb-8">
                    <div class="brand-mark brand-mark-large inline-flex items-center justify-center rounded-[22px] shadow-xl mb-4" aria-label="Logo THPT Gia Lộc">
                        <img class="school-logo school-logo-large" src="476607564_1118966020245066_3011246608916633901_n.jpg" alt="Logo THPT Gia Lộc">
                    </div>
                    <h1 class="text-3xl font-black text-slate-800 tracking-tight">THPT Gia Lộc</h1>
                    <p class="text-sm text-slate-500 font-semibold mt-1">Khảo sát sức khỏe tâm lý học đường</p>
                </div>

                <div class="card-lg p-8">
                    ${cloudBadge ? `<div class="flex justify-center mb-5">${cloudBadge}</div>` : ''}

                    <!-- Tabs -->
                    <div class="flex border-b border-slate-100 mb-6 gap-6">
                        <span onclick="authMode='login'; authError=''; authSuccess=''; renderApp();" 
                            class="auth-tab pb-3 text-sm font-black uppercase tracking-wider cursor-pointer ${isLogin ? 'active text-blue-500' : 'text-slate-400 hover:text-slate-600'}">
                            Đăng nhập
                        </span>
                        <span onclick="authMode='register'; authError=''; authSuccess=''; renderApp();" 
                            class="auth-tab pb-3 text-sm font-black uppercase tracking-wider cursor-pointer ${!isLogin ? 'active text-blue-500' : 'text-slate-400 hover:text-slate-600'}">
                            Tạo tài khoản
                        </span>
                    </div>

                    ${authError ? `<div class="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm font-semibold flex items-center gap-2"><i data-lucide="alert-circle" class="w-4 h-4 shrink-0"></i><span>${authError}</span></div>` : ''}
                    ${authSuccess ? `<div class="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-semibold flex items-center gap-2"><i data-lucide="check-circle" class="w-4 h-4 shrink-0"></i><span>${authSuccess}</span></div>` : ''}

                    <form onsubmit="handleAuthSubmit(event)" class="space-y-4">
                        ${!isLogin ? `<div>
                            <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-0.5">Tên hiển thị</label>
                            <input type="text" name="name" required placeholder="Ví dụ: Bhiep dz" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 placeholder:text-slate-400 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100">
                        </div>` : ''}
                        <div>
                            <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-0.5">Email</label>
                            <input type="email" name="email" required placeholder="your@email.com" 
                                value="${isLogin && saved ? saved.email : ''}"
                                class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 placeholder:text-slate-400 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100">
                        </div>
                        <div>
                            <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-0.5">Mật khẩu</label>
                            <div class="password-wrapper">
                                <input type="password" id="passwordInput" name="password" required minlength="6" 
                                    placeholder="Tối thiểu 6 ký tự"
                                    value=""
                                    class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 placeholder:text-slate-400 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100">
                                <button type="button" class="password-toggle-btn" onclick="togglePasswordVisibility()" id="pwToggleBtn" aria-label="Hiển thị hoặc ẩn mật khẩu">
                                    <i data-lucide="eye-off" class="w-5 h-5" id="pwToggleIcon"></i>
                                </button>
                            </div>
                        </div>
                        ${isLogin ? `
                        <div class="flex items-center justify-between -mt-2">
                            <label class="flex items-center gap-3 cursor-pointer select-none">
                                <input type="checkbox" name="rememberMe" class="checkbox-custom" ${saved ? 'checked' : ''}>
                                <span class="text-sm text-slate-600 font-semibold">Ghi nhớ đăng nhập</span>
                                ${saved ? '<span class="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-full px-2 py-0.5">Đã lưu</span>' : ''}
                            </label>
                        </div>` : ''}
                        <button type="submit" ${authLoading ? 'disabled' : ''} class="btn-primary w-full mt-1 disabled:opacity-60" style="border-radius:14px; padding:0.9rem 1.5rem; font-size:1rem;">
                            ${authLoading ? '<i data-lucide="loader" class="w-4 h-4 animate-spin"></i> Đang xử lý...' : (isLogin ? 'Đăng nhập' : 'Tạo tài khoản')}
                        </button>
                    </form>

                    <div class="mt-5 relative flex items-center justify-center">
                        <div class="border-t border-slate-100 w-full absolute"></div>
                        <span class="bg-white px-3 text-[10px] font-black text-slate-400 relative z-10 uppercase tracking-widest">Hoặc</span>
                    </div>
                    <button onclick="handleIncognitoLogin()" class="w-full mt-4 bg-slate-50 border border-slate-200 text-slate-600 font-bold rounded-2xl px-4 py-3 hover:bg-slate-100 flex items-center justify-center gap-2 group text-sm">
                        <i data-lucide="eye-off" class="w-4 h-4 text-slate-400 group-hover:text-blue-500"></i>
                        Tiếp tục ẩn danh
                    </button>
                </div>

                <p class="text-center text-[10px] text-slate-400 mt-5 font-semibold">
                    Dữ liệu được mã hóa và bảo mật · THPT Gia Lộc
                </p>
                <p class="text-center mt-2">
                    <a href="#admin" onclick="renderAdminPage(); return false;" class="text-[10px] text-slate-300 hover:text-slate-400 font-semibold">Quản trị viên</a>
                </p>
            </div>
        </div>`;
}

// ===== RENDER HEADER =====
function renderHeader() {
    let userHtml = '';
    if (currentUser) {
        const displayName = getFirstName(currentUser.name);
        const avatarUrl = currentUser.isIncognito
            ? 'https://api.dicebear.com/10.x/big-ears/svg?seed=empn5xvz' + currentUser.name + '&backgroundColor=4F8EC9'
            : 'https://api.dicebear.com/10.x/avataaars/svg?seed=8j8c4vl3' + currentUser.name + '&backgroundColor=4F8EC9';
        userHtml = `
            <div class="flex items-center gap-2 bg-white rounded-full pr-3 pl-1.5 py-1.5 border border-slate-100 shadow-sm">
                <img src="${avatarUrl}" alt="Avatar" class="w-8 h-8 rounded-full border border-slate-100 bg-slate-50">
                <div class="text-left mr-1 min-w-0">
                    <p class="text-[9px] font-bold text-slate-400 leading-none uppercase tracking-wider mb-0.5">${currentUser.isIncognito ? 'Ẩn danh' : 'Xin chào,'}</p>
                    <p class="text-sm font-black text-slate-800 leading-none max-w-[130px] truncate">${currentUser.isIncognito ? currentUser.name : displayName + '!'}</p>
                </div>
                ${!currentUser.isIncognito ? `
                <div class="flex items-center gap-1 border-l border-slate-100 pl-2 ml-1">
                    <button onclick="handleChangePassword()" class="flex items-center justify-center h-7 w-7 rounded-full bg-slate-50 hover:bg-blue-500 hover:text-white text-slate-400" title="Đổi mật khẩu">
                        <i data-lucide="key-round" class="h-3.5 w-3.5"></i>
                    </button>
                    <button onclick="handleLogout()" class="flex items-center justify-center h-7 w-7 rounded-full bg-slate-50 hover:bg-rose-500 hover:text-white text-slate-400" title="Đăng xuất">
                        <i data-lucide="log-out" class="h-3.5 w-3.5"></i>
                    </button>
                </div>` : ''}
            </div>`;
    }

    const progressBar = step === 'quiz' ? `
        <div class="w-full bg-white border-t border-slate-100 px-4 py-2.5">
            <div class="mx-auto w-full max-w-5xl flex items-center gap-4">
                <span class="text-xs font-black uppercase tracking-widest text-slate-400 whitespace-nowrap shrink-0">${currentIndex + 1} / ${QUESTIONS.length}</span>
                <div class="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div class="h-full rounded-full" style="width:${((currentIndex + 1) / QUESTIONS.length) * 100}%; background:linear-gradient(90deg,#4F8EC9,#42C8A8);"></div>
                </div>
                <span class="text-xs font-black text-slate-400 shrink-0">${Math.round(((currentIndex + 1) / QUESTIONS.length) * 100)}%</span>
            </div>
        </div>` : '';

    return `
        <header class="site-header sticky top-0 z-40">
            <div class="mx-auto w-full max-w-6xl px-4 md:px-6 py-3 flex items-center justify-between gap-4">
                <div class="flex items-center gap-3">
                    <div class="brand-mark flex items-center justify-center rounded-xl shadow-md shrink-0" aria-label="Logo THPT Gia Lộc">
                        <img class="school-logo school-logo-small" src="476607564_1118966020245066_3011246608916633901_n.jpg" alt="Logo THPT Gia Lộc">
                    </div>
                    <div>
                        <h1 class="text-base md:text-xl font-black tracking-tight text-slate-800">THPT Gia Lộc</h1>
                        <p class="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 hidden sm:block">Khảo Sát Tâm Lý Học Đường</p>
                    </div>
                </div>
                <div>${userHtml}</div>
            </div>
            ${progressBar}
        </header>`;
}

// ===== RENDER START =====
function renderStart() {
    const history = currentUser && !currentUser.isIncognito ? getUserHistory(currentUser.email) : [];
    const historyHtml = history.length > 0 ? `
        <div class="w-full max-w-2xl mt-6">
            <div class="card p-5">
                <div class="flex items-center gap-2 mb-4">
                    <i data-lucide="history" class="w-4 h-4 text-blue-500"></i>
                    <span class="text-sm font-black text-slate-700 uppercase tracking-wider">Lần khảo sát gần nhất</span>
                </div>
                ${renderMiniHistory(history[0], history[1])}
            </div>
        </div>` : '';

    return `
        <div class="start-page w-full flex-1 flex items-center justify-center min-h-[calc(100vh-80px)] bg-brand-surface px-4 py-10">
            <section class="mx-auto flex flex-col items-center text-center w-full max-w-4xl">
                <div class="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-5 py-2 text-sm font-bold text-blue-600 shadow-sm mb-6">
                    <i data-lucide="shield-check" class="h-4 w-4 text-emerald-500"></i>
                    <span>DASS-21 · MBI-SS · Sàng lọc</span>
                </div>
                <h2 class="text-4xl md:text-5xl font-black leading-tight tracking-tight text-slate-800 mb-3">
                    Khảo Sát <span class="brand-gradient-text">Tâm Lý Học Đường</span>
                </h2>
                <p class="text-slate-500 font-medium max-w-lg text-base mx-auto text-left">
                    Hệ thống đánh giá giúp bạn theo dõi Căng thẳng, Lo âu, Trầm cảm và mức độ quá tải học tập. DASS-21 sử dụng trải nghiệm trong 7 ngày gần nhất; MBI-SS dựa trên cảm nhận học tập gần đây. Kết quả chỉ có giá trị sàng lọc và không thay thế tư vấn hoặc chẩn đoán chuyên môn.
                </p>
            

                <div class="mt-8 grid gap-4 sm:grid-cols-2 w-full max-w-lg">
                    <div class="rounded-2xl border-[3px] border-blue-200 bg-white p-6 text-center shadow-md" style="box-shadow:0 4px 20px rgba(79,142,201,0.18);">
                        <p class="text-[13px] font-black uppercase tracking-[0.2em] mb-1.5" style="color:#4F8EC9; letter-spacing:0.18em;">DASS-21</p>
                        <p class="text-5xl font-black brand-gradient-text">21 câu</p>
                        <p class="mt-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider" title="3 câu phụ dùng để kiểm tra độ tin cậy của phản hồi, không tính vào điểm số DASS-21">+ 3 câu kiểm định</p>
                    </div>
                    <div class="rounded-2xl border-[3px] border-teal-200 bg-white p-6 text-center shadow-md" style="box-shadow:0 4px 20px rgba(66,200,168,0.18);">
                        <p class="text-[13px] font-black uppercase tracking-[0.2em] mb-1.5" style="color:#42C8A8; letter-spacing:0.18em;">MBI-SS</p>
                        <p class="text-5xl font-black brand-gradient-text">15 câu</p>
                        <p class="mt-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider" title="3 câu phụ dùng để kiểm tra độ tin cậy của phản hồi, không tính vào điểm số MBI-SS">+ 3 câu kiểm định</p>
                    </div>
                </div>
                <p class="mt-4 text-sm font-bold text-slate-500">Thời gian hoàn thành dự kiến: <span class="font-black text-slate-700">4 – 5 phút</span></p>
                <p class="mt-3 max-w-lg text-left text-xs leading-5 text-amber-700 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
                    Đây là công cụ sàng lọc giáo dục, không phải chẩn đoán y khoa. Nếu kết quả ở mức cao hoặc bạn cảm thấy không an toàn, hãy nói với người lớn đáng tin cậy và liên hệ chuyên viên tâm lý.
                </p>

                ${historyHtml}

                <div class="mt-8">
                    <button type="button" onclick="handleStart()" class="btn-primary text-lg px-12 py-4">
                        <span>Bắt đầu</span>
                        <i data-lucide="arrow-right" class="h-5 w-5"></i>
                    </button>
                </div>
            </section>
        </div>`;
}

function renderMiniHistory(latest, prev) {
    if (!latest) return '';
    const d = new Date(latest.date);
    const dateStr = d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const stressLabel = getLevelConfig('stress', latest.scores.stress).label;
    const anxLabel = getLevelConfig('anxiety', latest.scores.anxiety).label;
    const depLabel = getLevelConfig('depression', latest.scores.depression).label;
    const mbiPct = getMbiRiskPct(latest.scores);
    const mbiLvl = getMbiLevelConfig(mbiPct);

    const badge = (label) => {
        const c = getGaugeBandColor(label);
        return `<span class="score-badge" style="background:${c}18;color:${c};">${label}</span>`;
    };

    return `
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div class="rounded-xl bg-slate-50 border border-slate-100 p-3">
                <p class="text-[9px] font-black uppercase tracking-wider text-slate-400 mb-1">Stress</p>
                ${badge(stressLabel)}
                ${prev ? renderTrendBadge(latest.scores.stress * 2, prev.scores.stress * 2, true) : ''}
            </div>
            <div class="rounded-xl bg-slate-50 border border-slate-100 p-3">
                <p class="text-[9px] font-black uppercase tracking-wider text-slate-400 mb-1">Lo âu</p>
                ${badge(anxLabel)}
                ${prev ? renderTrendBadge(latest.scores.anxiety * 2, prev.scores.anxiety * 2, true) : ''}
            </div>
            <div class="rounded-xl bg-slate-50 border border-slate-100 p-3">
                <p class="text-[9px] font-black uppercase tracking-wider text-slate-400 mb-1">Trầm cảm</p>
                ${badge(depLabel)}
                ${prev ? renderTrendBadge(latest.scores.depression * 2, prev.scores.depression * 2, true) : ''}
            </div>
            <div class="rounded-xl bg-slate-50 border border-slate-100 p-3">
                <p class="text-[9px] font-black uppercase tracking-wider text-slate-400 mb-1">Chỉ số MBI-SS tham khảo</p>
                <span class="score-badge" style="background:${mbiLvl.hex}18;color:${mbiLvl.hex};">${mbiPct}%</span>
            </div>
        </div>
        <p class="text-[10px] text-slate-400 font-semibold mt-3 text-right">Lần khảo sát: ${dateStr}</p>`;
}

// ===== RENDER QUIZ =====
function renderQuiz() {
    const q = QUESTIONS[currentIndex];
    const answeredCount = Object.keys(answers).length;
    const allAnswered = answeredCount === QUESTIONS.length;
    const isLast = currentIndex === QUESTIONS.length - 1;

    const navButtons = QUESTIONS.map((item, idx) => {
        let cls = 'nav-btn-default';
        if (currentIndex === idx) cls = 'nav-btn-active';
        else if (answers[item.id] !== undefined) cls = 'nav-btn-answered';
        // Không lộ câu nào là "câu kiểm định" (isNoise) ra giao diện học sinh nữa — nếu học sinh
        // biết trước câu nào không tính điểm thì các câu này sẽ mất tác dụng kiểm tra độ tin cậy
        // phản hồi (dễ bị trả lời qua loa). Dữ liệu isNoise vẫn giữ nguyên trong QUESTIONS để
        // dùng nội bộ (Admin), chỉ bỏ chấm tím + tooltip tiết lộ trên nav-grid.
        return `<button type="button" onclick="handleJump(${idx})" class="nav-btn w-full ${cls}" title="Câu ${idx + 1}"><span>${idx + 1}</span></button>`;
    }).join('');

    const optionsHTML = q.scale.map(opt => {
        const isSelected = answers[q.id] === opt.value;
        const bgC = isSelected ? 'border-blue-400 bg-blue-50 shadow-md shadow-blue-100' : 'border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50';
        const bgN = isSelected ? 'text-white' : 'bg-slate-100 text-slate-500';
        const numStyle = isSelected ? 'background:linear-gradient(135deg,#4F8EC9,#42C8A8);' : '';
        return `<div onclick="handleAnswer('${q.id}', ${opt.value})" class="group flex cursor-pointer flex-col gap-3 rounded-2xl border p-4 ${bgC}">
            <span class="flex h-10 w-10 items-center justify-center rounded-xl text-sm font-black ${bgN}" style="${numStyle}">${opt.value}</span>
            <span class="text-sm font-bold leading-5 text-slate-700">${opt.label}</span>
        </div>`;
    }).join('');

    return `
        <section class="mx-auto flex w-full max-w-4xl flex-col gap-4 px-4 md:px-8 py-6 quiz-page">
            <nav class="card p-4">
                <div class="nav-box"><div class="nav-grid">${navButtons}</div></div>
            </nav>
            <article class="card-lg overflow-hidden">
                <div class="p-5 md:p-10">
                    <div class="mb-5 flex flex-wrap items-center gap-2">
                        <span class="rounded-full px-3 py-1.5 text-xs font-black uppercase tracking-widest text-white" style="background:linear-gradient(135deg,#4F8EC9,#42C8A8);">${q.sectionTitle}</span>
                        <span class="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-slate-500">Câu ${currentIndex + 1}</span>
                    </div>
                    <h2 class="max-w-4xl text-xl md:text-3xl font-black leading-tight text-slate-800">${q.text}</h2>
                    <div class="mt-8 grid gap-3 ${q.section === 'MBI-SS' ? 'grid-cols-2 md:grid-cols-7' : 'grid-cols-1 md:grid-cols-4'}">${optionsHTML}</div>
                </div>
                <footer class="flex items-center justify-between gap-3 border-t border-slate-100 bg-slate-50 p-4 md:p-6">
                    <button type="button" onclick="handlePrev()" ${currentIndex === 0 ? 'disabled' : ''} class="btn-ghost disabled:opacity-40">
                        <i data-lucide="chevron-left" class="h-5 w-5"></i><span class="hidden md:inline">Câu trước</span>
                    </button>
                    <span class="text-xs font-bold text-slate-400">${answeredCount}/${QUESTIONS.length} đã trả lời</span>
                    ${isLast
            ? `<button type="button" onclick="handleSubmit()" ${(!allAnswered || isSubmitting) ? 'disabled' : ''} class="btn-primary disabled:opacity-50" style="border-radius:12px;padding:0.65rem 1.5rem;">
                            <span>${isSubmitting ? 'Đang nộp...' : 'Nộp bài'}</span><i data-lucide="check-circle" class="h-5 w-5"></i>
                           </button>`
            : `<button type="button" onclick="handleNext()" class="btn-primary" style="border-radius:12px;padding:0.65rem 1.5rem;">
                            <span>Tiếp theo</span><i data-lucide="chevron-right" class="h-5 w-5"></i>
                           </button>`}
                </footer>
            </article>
        </section>`;
}

// ===== RENDER RESULT =====
function renderResult() {
    const MBI_ROWS = [
        { id: 'emotionalExhaustion', title: 'Kiệt quệ cảm xúc', max: 30 },
        { id: 'cynicism', title: 'Hoài nghi', max: 24 },
        { id: 'academicEfficacy', title: 'Hiệu quả học tập', max: 36, higherBetter: true }
    ];
    const DASS_ROWS = [
        { id: 'stress', title: 'Stress', max: 42 },
        { id: 'anxiety', title: 'Lo âu', max: 42 },
        { id: 'depression', title: 'Trầm cảm', max: 42 }
    ];

    const overallState = getOverallMentalState(currentScores);
    const mbiRiskPct = getMbiRiskPct(currentScores);
    const mbiLevel = getMbiLevelConfig(mbiRiskPct);
    // true khi cả 15 câu MBI-SS thật được trả lời CÙNG 1 mức (vd. toàn "Không bao giờ") —
    // xem isMbiAnswerFlat() để biết vì sao trường hợp này luôn kéo 1 tiểu mục lên mức cao nhất.
    const mbiFlatAnswer = isMbiAnswerFlat(answers);
    // MBI-SS không có tổng điểm chuẩn hoặc ngưỡng chẩn đoán chung. Chỉ dùng
    // DASS-21 cho trạng thái tổng quan; ba tiểu mục MBI-SS được trình bày riêng.
    const mbiCountsForBanner = false;
    const adviceLabel = mbiCountsForBanner ? mbiLevel.label : overallState.config.label;
    // Thẻ nào (burnout hay đúng thang DASS đang tệ nhất: stress/anxiety/depression) quyết định adviceLabel
    // thì dùng đúng văn bản lời khuyên của thẻ đó, tránh lặp lại lỗi copy-paste như trên.
    const adviceScale = mbiCountsForBanner ? 'burnout' : overallState.id;
    const adviceColor = getGaugeBandColor(adviceLabel);
    const adviceIcon = getIconForLabel(adviceLabel);
    // === FIX SAI LOGIC (banner "Tốt" nhưng vẫn cảnh báo) ===
    // TRƯỚC ĐÂY: banner to ở đầu trang ("Trạng thái tinh thần tổng quát") chỉ lấy overallState
    // -> tức CHỈ tính DASS-21 (Stress/Lo âu/Trầm cảm), không tính tổng điểm MBI-SS.
    // Trong khi đó khung "Lời khuyên" ngay bên dưới lại lấy adviceLabel = mức NẶNG NHẤT giữa
    // DASS-21 và MBI-SS. Hậu quả: học sinh có DASS-21 = "Tốt" nhưng tổng điểm MBI-SS = "Nặng" vẫn thấy
    // banner to màu XANH ghi "Tốt", nhưng ngay dưới lại là khung màu ĐỎ/CAM với nội dung cảnh báo
    // burnout -> hiển thị MÂU THUẪN ngay trên cùng 1 màn hình, đúng như lỗi "đạt mức tốt nhưng
    // web vẫn cảnh báo". Nay banner tổng quan dùng CHUNG đúng 1 biến (adviceLabel/adviceColor/
    // adviceIcon) với khung lời khuyên, để 2 khu vực không bao giờ "nói ngược nhau" nữa. Hai
    // thanh gauge chi tiết bên dưới (DASS-21 và MBI-SS) vẫn giữ nguyên số liệu riêng của từng
    // thang để học sinh biết chính xác điều gì đang kéo mức tổng quan xuống.

    // MBI cards
    const mbiHTML = MBI_ROWS.map(row => {
        const val = currentScores[row.id];
        const pct = Math.round((val / row.max) * 100);
        const riskPct = row.higherBetter ? 100 - pct : pct;
        const barPct = row.higherBetter ? pct : riskPct;
        const color = row.higherBetter
            ? (pct >= 60 ? '#10B981' : pct >= 30 ? '#F59E0B' : '#F43F5E')
            : (riskPct >= 60 ? '#F43F5E' : riskPct >= 30 ? '#F59E0B' : '#10B981');
        return `<div class="rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <div class="flex items-center justify-between mb-2">
                <div>
                    <span class="text-xs font-black text-slate-600">${row.title}</span>
                    ${row.higherBetter ? `<div class="mt-1"><span class="score-badge" style="background:#FFF7ED;color:#B45309;"><i data-lucide="info" class="w-3 h-3"></i>Điểm càng thấp rủi ro càng cao</span></div>` : ''}
                </div>
                <span class="font-mono text-base font-black" style="color:${color};">${val}<span class="text-xs text-slate-400 font-semibold">/${row.max}</span></span>
            </div>
            <div class="h-2 rounded-full bg-slate-200 overflow-hidden">
                <div class="h-full rounded-full" style="width:${barPct}%; background:${color};"></div>
            </div>
        </div>`;
    }).join('');

    // Tiểu mục nào đang "kéo" mức nguy cơ MBI-SS tổng lên cao nhất (khớp đúng công thức
    // trung bình chuẩn hóa trong getMbiRiskPct — xem giải thích ở đó). Khi CHỈ 1 tiểu mục
    // ở mức cao còn 2 tiểu mục
    // kia vẫn tốt, hiển thị thêm dòng giải thích lý do, tránh cảm giác "kết quả vô lý/sai điểm"
    // (vd. Kiệt quệ 0/30 và Hoài nghi 0/24 rất tốt, nhưng tổng thể vẫn "Rất nặng" chỉ vì
    // Hiệu quả học tập 0/36 — tiểu mục này tính điểm NGƯỢC CHIỀU nên điểm thô thấp = rủi ro cao).
    // dòng 983–994
    const mbiSubRisks = MBI_ROWS.map(row => {
        const p = Math.round((currentScores[row.id] / row.max) * 100);
        return { title: row.title, riskPct: row.higherBetter ? 100 - p : p };
    });
    const mbiTopDriver = mbiSubRisks.reduce((a, b) => (b.riskPct > a.riskPct ? b : a));
    const mbiOthersOk = mbiSubRisks.every(r => r === mbiTopDriver || r.riskPct < 45);
    const mbiDriverNote = (mbiRiskPct >= 45 && mbiOthersOk)
        ? `<div class="rounded-2xl border border-amber-200 bg-amber-50 p-3.5 flex gap-2.5 mb-3">
                <i data-lucide="lightbulb" class="h-4 w-4 shrink-0 mt-0.5 text-amber-600"></i>
                            <p class="text-[11px] leading-5 text-amber-900"><strong>Vì sao chỉ số tổng hợp cao?</strong> Nhóm <strong>${mbiTopDriver.title}</strong> đang đóng góp nhiều nhất vào mức nguy cơ MBI-SS. Hãy xem điểm từng nhóm bên dưới để biết phần nào cần được quan tâm.</p>
            </div>`
        : '';

    // Cảnh báo riêng khi answers cho thấy học sinh bấm CÙNG 1 đáp án cho mọi câu MBI-SS thật.
    // Không thay đổi/ẩn số đã tính (vẫn tôn trọng câu trả lời thật nếu đúng là cảm nhận của các em)
    // — chỉ thêm ngữ cảnh mời xem lại vì kiểu trả lời này có thể chưa phản ánh đầy đủ cảm nhận.
    const mbiFlatNote = mbiFlatAnswer
        ? `<div class="rounded-2xl border border-amber-200 bg-amber-50 p-3.5 flex gap-2.5 mb-3">
                <i data-lucide="alert-triangle" class="h-4 w-4 shrink-0 mt-0.5 text-amber-600"></i>
                <p class="text-[11px] leading-5 text-amber-900"><strong>Lưu ý:</strong> Bạn đã chọn cùng một mức trả lời cho cả 15 câu ở phần này, nên mức tổng quan phía trên đang tạm <strong>không tính</strong> chỉ số MBI-SS tham khảo này (chỉ theo DASS-21). Số liệu ba tiểu mục bên dưới vẫn được tính đầy đủ để tham khảo, nhưng có thể chưa phản ánh đầy đủ cảm nhận thật. Nếu muốn, hãy <button type="button" onclick="handleReset()" class="underline font-black">làm lại khảo sát</button> và đọc kỹ từng câu nhé.</p>
            </div>`
        : '';

    // DASS cards (compact)
    const dassHTML = DASS_ROWS.map(row => {
        const rawVal = currentScores[row.id];
        const config = getLevelConfig(row.id, rawVal);
        const score = rawVal * 2;
        const pct = Math.round((score / 42) * 100);
        return `<div class="rounded-2xl border p-4 ${config.className}">
            <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-2">
                    <i data-lucide="${config.icon}" class="w-4 h-4"></i>
                    <span class="font-black text-sm">${row.title}</span>
                </div>
                <span class="score-badge" style="background:${config.hex}20; color:${config.hex};">${config.label}</span>
            </div>
            <div class="flex items-end gap-3">
                <span class="font-mono text-2xl font-black">${score}</span>
                <span class="text-xs text-current opacity-60 mb-1">/ ${row.max}</span>
                <div class="flex-1 h-1.5 rounded-full bg-current/20 overflow-hidden">
                    <div class="h-full rounded-full" style="width:${pct}%; background:${config.hex};"></div>
                </div>
            </div>
            <p class="mt-3 text-xs leading-5 opacity-80">${getAdvice(row.id, config.label)}</p>
        </div>`;
    }).join('');

    const cloudMsg = !supabaseReady
        ? '<span class="inline-flex items-center gap-2 rounded-full bg-slate-50 border border-slate-200 px-4 py-1.5 text-xs font-bold text-slate-500"><i data-lucide="save" class="w-3.5 h-3.5"></i> Đã lưu trên máy này</span>'
        : lastSaveOk
            ? '<span class="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200 px-4 py-1.5 text-xs font-bold text-emerald-700"><i data-lucide="cloud" class="w-3.5 h-3.5"></i> Đã lưu lên Cloud</span>'
            : '<span class="inline-flex items-center gap-2 rounded-full bg-amber-50 border border-amber-200 px-4 py-1.5 text-xs font-bold text-amber-700"><i data-lucide="cloud-off" class="w-3.5 h-3.5"></i> Lưu Cloud thất bại — kết quả chỉ lưu tạm trên máy này</span>';

    const div = communityStats.count > 0 ? communityStats.count : 1;

    // History section
    const history = currentUser && !currentUser.isIncognito ? getUserHistory(currentUser.email) : [];
    const historyHTML = renderHistorySection(history);

    return `
        <section class="result-page mx-auto flex flex-col w-full max-w-4xl gap-5 px-4 pt-8 pb-16">
            <div class="flex flex-col items-center justify-center gap-2">
                ${cloudMsg}
                <p class="text-center text-[10px] leading-4 text-slate-400">Kết quả mang tính sàng lọc, không thay thế chẩn đoán y khoa.</p>
            </div>

            <!-- Overview Card -->
            <div class="card-lg p-6 md:p-8">
                <div class="text-center mb-6">
                    <div class="inline-flex h-14 w-14 items-center justify-center rounded-2xl mb-3" style="background:${adviceColor}1A;">
                        <i data-lucide="${adviceIcon}" class="h-7 w-7" style="color:${adviceColor};"></i>
                    </div>
                    <p class="text-slate-500 font-semibold text-sm">Trạng thái tinh thần tổng quát</p>
                    <p class="inline-flex items-center justify-center mt-2 px-5 py-1.5 rounded-full text-3xl md:text-4xl font-black" style="background:${adviceColor}1A;color:${adviceColor};">${adviceLabel}</p>
                    <p class="mt-3 text-sm font-semibold text-slate-500">${getClosingLine(adviceLabel)}</p>
                    ${mbiFlatAnswer ? `<p class="mt-2 inline-flex items-center gap-1.5 rounded-full bg-amber-50 border border-amber-200 px-3 py-1 text-[11px] font-bold text-amber-700"><i data-lucide="alert-circle" class="w-3 h-3"></i>Chỉ số MBI-SS tham khảo chưa được tính vào mức này vì bạn chọn cùng 1 đáp án cho cả phần đó — xem ba tiểu mục riêng bên dưới</p>` : ''}
                </div>
                <div class="overview-dass mb-5">
                    ${renderGaugeBar('DASS-21 · Tâm lý chung', overallState.config.label)}
                </div>
                <div class="rounded-2xl border p-4 flex gap-3" style="border-color:${adviceColor}30; background:${adviceColor}0A;">
                    <i data-lucide="lightbulb" class="h-4 w-4 shrink-0 mt-0.5" style="color:${adviceColor};"></i>
                    <div>
                        <p class="text-xs font-black mb-1" style="color:${adviceColor};">Lời khuyên</p>
                        <p class="text-xs leading-5 text-slate-600">${getAdvice(adviceScale, adviceLabel)}</p>
                    </div>
                </div>
            </div>

            <!-- MBI Collapsible Card -->
            <div class="card-lg overflow-hidden">
                <div class="collapse-header" onclick="toggleCollapse('mbi')">
                    <div class="flex items-center gap-3">
                        <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50">
                            <i data-lucide="battery-warning" class="h-5 w-5 text-teal-600"></i>
                        </div>
                        <div>
                            <p class="text-[9px] font-black uppercase tracking-widest text-slate-400">Kiệt quệ học đường</p>
                            <h3 class="text-base font-black text-slate-800">Chỉ số tổng hợp MBI-SS</h3>
                        </div>
                    </div>
                    <div class="flex items-center gap-3">
                        <span class="score-badge hidden sm:inline-flex" style="background:${mbiLevel.hex}18; color:${mbiLevel.hex};">${mbiRiskPct}% tham khảo</span>
                        <div class="collapse-icon ${collapseState.mbi ? 'open' : ''}" id="icon-mbi">
                            <i data-lucide="chevron-down" class="w-4 h-4"></i>
                        </div>
                    </div>
                </div>
                <div class="collapse-body ${collapseState.mbi ? 'open' : ''}" id="collapse-mbi">
                    <div class="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-5 pb-2">
                        <div class="rounded-2xl border border-slate-100 bg-slate-50 p-4 flex flex-col items-center gap-3">
                            <p class="text-[9px] font-black uppercase tracking-widest text-slate-400">Chỉ số tổng hợp tham khảo</p>
                            <p class="text-[10px] leading-4 text-center text-slate-400">MBI-SS được diễn giải chính theo 3 tiểu mục bên phải.</p>
                            <div class="relative" style="width:160px;height:160px;">
                                <canvas id="donutChart" width="160" height="160" style="position:absolute;top:0;left:0;"></canvas>
                                <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center;">
                                    <strong id="donutCenterValue" class="font-mono text-3xl font-black block" style="line-height:1; color:${mbiLevel.hex};">0%</strong>
                                    <span id="donutCenterLabel" class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mt-0.5">${mbiLevel.label}</span>
                                </div>
                            </div>
                            <div id="donutLegend" class="flex flex-col gap-1 w-full text-xs font-semibold text-slate-600"></div>
                        </div>
                        <div class="space-y-3">${mbiFlatNote}${mbiDriverNote}${mbiHTML}</div>
                    </div>
                </div>
            </div>

            <!-- DASS Collapsible Card -->
            <div class="card-lg overflow-hidden">
                <div class="collapse-header" onclick="toggleCollapse('dass')">
                    <div class="flex items-center gap-3">
                        <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50">
                            <i data-lucide="brain" class="h-5 w-5 text-sky-600"></i>
                        </div>
                        <div>
                            <p class="text-[9px] font-black uppercase tracking-widest text-slate-400">Tâm lý lâm sàng</p>
                            <h3 class="text-base font-black text-slate-800">Chỉ số DASS-21</h3>
                        </div>
                    </div>
                    <div class="flex items-center gap-3">
                        <div class="hidden sm:flex gap-1.5">
                            ${DASS_ROWS.map(r => {
        const c = getLevelConfig(r.id, currentScores[r.id]);
        return `<span class="score-badge" style="background:${c.hex}18; color:${c.hex};">${r.title.slice(0, 2)} ${c.label}</span>`;
    }).join('')}
                        </div>
                        <div class="collapse-icon ${collapseState.dass ? 'open' : ''}" id="icon-dass">
                            <i data-lucide="chevron-down" class="w-4 h-4"></i>
                        </div>
                    </div>
                </div>
                <div class="collapse-body ${collapseState.dass ? 'open' : ''}" id="collapse-dass">
                    <div class="chart-wrap h-48 mb-3 mt-1"><canvas id="dassBarChart"></canvas></div>
                    <!-- Chú thích thang màu: phải khớp đúng 4 mức hex trong getLevelConfig() -->
                    <div class="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 mb-5">
                        <span class="inline-flex items-center gap-1.5 text-[10px] font-bold text-slate-500"><span class="w-2.5 h-2.5 rounded-full shrink-0" style="background:#10B981;"></span>Tốt</span>
                        <span class="inline-flex items-center gap-1.5 text-[10px] font-bold text-slate-500"><span class="w-2.5 h-2.5 rounded-full shrink-0" style="background:#0ea8f0;"></span>Nhẹ</span>
                        <span class="inline-flex items-center gap-1.5 text-[10px] font-bold text-slate-500"><span class="w-2.5 h-2.5 rounded-full shrink-0" style="background:#F59E0B;"></span>Vừa</span>
                        <span class="inline-flex items-center gap-1.5 text-[10px] font-bold text-slate-500"><span class="w-2.5 h-2.5 rounded-full shrink-0" style="background:#F43F5E;"></span>Nặng / Rất nặng</span>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-3 pb-2">${dassHTML}</div>
                </div>
            </div>

            <!-- History Collapsible -->
            ${historyHTML}

            <!-- Community Collapsible -->
            <div class="card-lg overflow-hidden">
                <div class="collapse-header" onclick="toggleCollapse('community')">
                    <div class="flex items-center gap-3">
                        <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50">
                            <i data-lucide="users" class="h-5 w-5 text-violet-600"></i>
                        </div>
                        <div>
                            <p class="text-[9px] font-black uppercase tracking-widest text-slate-400">So sánh tương quan</p>
                            <h3 class="text-base font-black text-slate-800">Thống kê cộng đồng</h3>
                        </div>
                    </div>
                    <div class="flex items-center gap-3">
                        <span class="score-badge hidden sm:inline-flex" style="background:#7C3AED18; color:#7C3AED;">${communityStats.count} lượt</span>
                        <div class="collapse-icon ${collapseState.community ? 'open' : ''}" id="icon-community">
                            <i data-lucide="chevron-down" class="w-4 h-4"></i>
                        </div>
                    </div>
                </div>
                <div class="collapse-body ${collapseState.community ? 'open' : ''}" id="collapse-community">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-5 pb-2">
                        <div class="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                            <h4 class="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-3">MBI-SS Trung bình</h4>
                            <div class="chart-wrap h-40"><canvas id="communityMbiChart"></canvas></div>
                        </div>
                        <div class="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                            <h4 class="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-3">DASS-21 Trung bình</h4>
                            <div class="chart-wrap h-40"><canvas id="communityDassChart"></canvas></div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Reset Button -->
            <div class="flex justify-center pt-3 pb-10">
                <button type="button" onclick="handleReset()" class="btn-primary">
                    <i data-lucide="rotate-ccw" class="h-5 w-5"></i><span>Làm lại khảo sát</span>
                </button>
            </div>
        </section>`;
}

// ===== HISTORY SECTION =====
function renderHistorySection(history) {
    if (!history || history.length === 0) return '';

    const items = history.slice(0, 10).map((entry, idx) => {
        const prev = history[idx + 1];
        const d = new Date(entry.date);
        const dateStr = d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
        const timeStr = d.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
        const mbiPct = getMbiRiskPct(entry.scores);
        const mbiLvl = getMbiLevelConfig(mbiPct);
        const isLatest = idx === 0;

        const miniRows = [
            { id: 'stress', label: 'Stress', v: entry.scores.stress, lowerBetter: true },
            { id: 'anxiety', label: 'Lo âu', v: entry.scores.anxiety, lowerBetter: true },
            { id: 'depression', label: 'Trầm cảm', v: entry.scores.depression, lowerBetter: true },
        ];

        const cellsHTML = miniRows.map(row => {
            const cfg = getLevelConfig(row.id, row.v);
            const prevV = prev ? prev.scores[row.id] : null;
            // Nhân đôi (DASS-21 -> DASS-42) để mức chênh lệch hiển thị đúng đơn vị với
            // điểm x/42 đang hiển thị ở các thẻ khác trong trang (tránh vênh đơn vị điểm thô vs điểm quy đổi).
            const trend = getTrend(row.v * 2, prevV !== null ? prevV * 2 : null);
            let trendHtml = '';
            if (trend && trend.dir !== 'same') {
                const isBetter = row.lowerBetter ? trend.dir === 'down' : trend.dir === 'up';
                const tColor = isBetter ? '#10B981' : '#F43F5E';
                trendHtml = `<span style="color:${tColor}; font-size:9px; font-weight:900;">${trend.dir === 'up' ? '↑' : '↓'}${Math.abs((row.v - prevV) * 2)}</span>`;
            }
            return `<div class="text-center">
                <p class="text-[9px] font-black uppercase tracking-wider text-slate-400 mb-1">${row.label}</p>
                <span class="score-badge" style="background:${cfg.hex}18; color:${cfg.hex}; font-size:9px;">${cfg.label}</span>
                <div class="mt-0.5">${trendHtml}</div>
            </div>`;
        }).join('');

        return `
            <div class="history-item">
                <div class="history-dot" style="background:${isLatest ? '#4F8EC9' : '#CBD5E1'};"></div>
                <div class="history-card">
                    <div class="flex items-start justify-between gap-3 mb-3">
                        <div>
                            <span class="text-xs font-black text-slate-700">${dateStr}</span>
                            <span class="text-[10px] text-slate-400 ml-2">${timeStr}</span>
                            ${isLatest ? '<span class="ml-2 score-badge" style="background:#4F8EC918;color:#4F8EC9;">Mới nhất</span>' : ''}
                        </div>
                        <span class="score-badge" style="background:${mbiLvl.hex}18; color:${mbiLvl.hex}; white-space:nowrap;">Chỉ số tham khảo ${mbiPct}%</span>
                    </div>
                    <div class="grid grid-cols-3 gap-2">${cellsHTML}</div>
                </div>
            </div>`;
    }).join('');

    // Sparklines for trends
    const stressValues = history.slice().reverse().map(e => e.scores.stress * 2);
    const anxValues = history.slice().reverse().map(e => e.scores.anxiety * 2);
    const depValues = history.slice().reverse().map(e => e.scores.depression * 2);

    const sparkHTML = history.length >= 2 ? `
        <div class="grid grid-cols-3 gap-3 mb-5 px-4">
            <div class="rounded-xl border border-slate-100 bg-white p-3 text-center">
                <p class="text-[9px] font-black uppercase tracking-wider text-slate-400 mb-2">Xu hướng Stress</p>
                ${renderSparkline(stressValues, '#F43F5E')}
            </div>
            <div class="rounded-xl border border-slate-100 bg-white p-3 text-center">
                <p class="text-[9px] font-black uppercase tracking-wider text-slate-400 mb-2">Xu hướng Lo âu</p>
                ${renderSparkline(anxValues, '#8B5CF6')}
            </div>
            <div class="rounded-xl border border-slate-100 bg-white p-3 text-center">
                <p class="text-[9px] font-black uppercase tracking-wider text-slate-400 mb-2">Xu hướng Trầm cảm</p>
                ${renderSparkline(depValues, '#4F8EC9')}
            </div>
        </div>` : '';

    return `
        <div class="card-lg overflow-hidden">
            <div class="collapse-header" onclick="toggleCollapse('history')">
                <div class="flex items-center gap-3">
                    <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                        <i data-lucide="trending-up" class="h-5 w-5 text-blue-500"></i>
                    </div>
                    <div>
                        <p class="text-[9px] font-black uppercase tracking-widest text-slate-400">Theo dõi tiến độ</p>
                        <h3 class="text-base font-black text-slate-800">Lịch sử khảo sát</h3>
                    </div>
                </div>
                <div class="flex items-center gap-3">
                    <span class="score-badge hidden sm:inline-flex" style="background:#4F8EC918; color:#4F8EC9;">${history.length} lần</span>
                    <div class="collapse-icon ${collapseState.history ? 'open' : ''}" id="icon-history">
                        <i data-lucide="chevron-down" class="w-4 h-4"></i>
                    </div>
                </div>
            </div>
            <div class="collapse-body ${collapseState.history ? 'open' : ''}" id="collapse-history">
                ${sparkHTML}
                <div class="history-timeline px-2 pb-2">${items}</div>
            </div>
        </div>`;
}

// ===== RENDER APP =====
function renderApp() {
    const root = document.getElementById('root');
    let content = '';
    if (step !== 'auth') content += renderHeader();
    content += '<main class="flex-1 flex flex-col w-full">';
    if (step === 'auth') content += renderAuth();
    else if (step === 'start') content += renderStart();
    else if (step === 'quiz') content += renderQuiz();
    else if (step === 'result') content += renderResult();
    content += '</main>';
    root.innerHTML = content;
    lucide.createIcons();
    if (step === 'result') { initDonutChart(); initDassBarChart(); initCommunityCharts(); }
}

// ===== NAVIGATION =====
function handleStart() { step = 'quiz'; collapseState = { mbi: false, dass: false, community: false, history: true }; renderApp(); window.scrollTo({ top: 0 }); }
function handlePrev() { if (currentIndex > 0) { currentIndex--; renderApp(); } }
function handleNext() { if (currentIndex < QUESTIONS.length - 1) { currentIndex++; renderApp(); } }
function handleJump(idx) { currentIndex = idx; renderApp(); }
function handleAnswer(qId, val) { answers[qId] = val; renderApp(); }

async function handleSubmit() {
    if (isSubmitting) return; // đang gửi rồi — bỏ qua các lần bấm/gọi thêm
    if (Object.keys(answers).length !== QUESTIONS.length) return;
    isSubmitting = true;
    renderApp(); // render lại ngay để vô hiệu hóa nút "Nộp bài" trước khi chờ mạng
    currentScores = {
        emotionalExhaustion: getSum(answers, MBI_EMOTIONAL_EXHAUSTION),
        cynicism: getSum(answers, MBI_CYNICISM),
        academicEfficacy: getSum(answers, MBI_ACADEMIC_EFFICACY),
        stress: getSum(answers, DASS_STRESS),
        anxiety: getSum(answers, DASS_ANXIETY),
        depression: getSum(answers, DASS_DEPRESSION)
    };
    try {
        await saveResult(currentScores);
        await loadCommunityStats();
        step = 'result';
    } finally {
        isSubmitting = false;
    }
    renderApp();
    window.scrollTo({ top: 0 });
}

function handleReset() {
    answers = {}; currentIndex = 0; step = 'start';
    collapseState = { mbi: false, dass: false, community: false, history: true };
    renderApp(); window.scrollTo({ top: 0 });
}

// ===== CHARTS =====
function initDonutChart() {
    const canvas = document.getElementById('donutChart');
    if (!canvas) return;
    const exhaustion = currentScores.emotionalExhaustion;
    const cynicism = currentScores.cynicism;
    const rawEfficacy = currentScores.academicEfficacy;
    const lowEfficacy = Math.max(0, 36 - rawEfficacy);
    // Dùng chung getMbiRiskPct() (cùng công thức với bảng Admin, lịch sử khảo sát...)
    // thay vì tính lại % ở đây, để biểu đồ donut luôn khớp 100% với các nơi khác.
    const riskPct = getMbiRiskPct(currentScores);
    // "An toàn" chỉ khi nguy cơ tổng = 0%, tức cả 3 tiểu mục đều ở mức tốt nhất
    // (trước đây chỉ xét Kiệt quệ=0 và Hoài nghi=0, bỏ sót trường hợp Hiệu quả học tập thấp).
    const isSafe = riskPct === 0;
    const safeColor = '#CBD5E1';

    const el = document.getElementById('donutCenterValue');
    if (el) el.textContent = riskPct + '%';
    const mbiLvl = getMbiLevelConfig(riskPct);
    if (el) el.style.color = isSafe ? safeColor : mbiLvl.hex;
    const labelEl = document.getElementById('donutCenterLabel');
    if (labelEl) { labelEl.textContent = isSafe ? 'An toàn' : mbiLvl.label; labelEl.style.color = isSafe ? safeColor : mbiLvl.hex; }

    // Phân mảnh donut: mỗi tiểu mục chiếm đúng % rủi ro của chính nó (không chia 3).
    // Trước đây chia /3 (công thức trung bình) khiến khi chỉ 1 tiểu mục max thì donut
    // chỉ tô 33% nguy cơ dù riskPct tổng = 100% — không khớp với số to ở giữa.
    // Giờ dùng: mỗi tiểu mục = % riêng của nó, "Chưa ảnh hưởng" = phần còn lại tới 100%.
    const exhRaw = Math.round((exhaustion / 30) * 100);
    const cynRaw = Math.round((cynicism / 24) * 100);
    const lowRaw = Math.round((lowEfficacy / 36) * 100);
    // Lấy tiểu mục có % cao nhất làm "chỉ huy" — khớp đúng với getMbiRiskPct() dùng MAX
    const maxRaw = Math.max(exhRaw, cynRaw, lowRaw);
    // Phân bổ mảnh theo tỷ lệ của từng tiểu mục trong tổng nguy cơ
    // (nếu maxRaw=0 tức isSafe — đã xử lý riêng ở trên, không vào đây)
    const totalRaw = exhRaw + cynRaw + lowRaw;
    const exhPct = isSafe ? 0 : Math.round((exhRaw / (totalRaw || 1)) * riskPct);
    const cynPct = isSafe ? 0 : Math.round((cynRaw / (totalRaw || 1)) * riskPct);
    // Trước đây lowPct = riskPct - exhPct - cynPct (phần dư), nên khi lowRaw thực tế = 0
    // nhưng exhPct/cynPct bị làm tròn hụt, phần dư đó bị gán nhầm hết cho "Mất hiệu quả HT"
    // dù tiểu mục này không hề đóng góp vào rủi ro. Giờ tính lowPct theo đúng tỉ lệ lowRaw
    // của chính nó, giống hệt cách tính exhPct/cynPct ở trên.
    const lowPct = isSafe ? 0 : Math.round((lowRaw / (totalRaw || 1)) * riskPct);
    const safePct = Math.max(0, 100 - exhPct - cynPct - lowPct);

    const legendEl = document.getElementById('donutLegend');
    if (legendEl) {
        if (isSafe) {
            legendEl.innerHTML = `<div style="display:flex;align-items:center;gap:6px;">
                <span style="display:inline-block;width:8px;height:8px;border-radius:3px;background:${safeColor};flex-shrink:0;"></span>
                <span style="flex:1;font-size:10px;">Không có dấu hiệu kiệt quệ</span>
                <span style="font-size:10px;font-weight:800;color:#64748b;">100%</span>
            </div>`;
        } else {
            const items = [
                { color: '#4F8EC9', label: 'Kiệt quệ cảm xúc', pct: exhPct },
                { color: '#F59E0B', label: 'Hoài nghi', pct: cynPct },
                { color: '#F43F5E', label: 'Mất hiệu quả HT', pct: lowPct },
                { color: '#E2E8F0', label: 'Chưa ảnh hưởng', pct: safePct }
            ];
            legendEl.innerHTML = items.map(i =>
                `<div style="display:flex;align-items:center;gap:6px;">
                    <span style="display:inline-block;width:8px;height:8px;border-radius:3px;background:${i.color};flex-shrink:0;"></span>
                    <span style="flex:1;font-size:10px;">${i.label}</span>
                    <span style="font-size:10px;font-weight:800;color:#64748b;">${i.pct}%</span>
                </div>`
            ).join('');
        }
    }

    if (donutChartInstance) donutChartInstance.destroy();
    const chartData = isSafe
        ? { labels: ['An toàn'], datasets: [{ data: [1], backgroundColor: [safeColor], borderColor: '#fff', borderWidth: 3, cutout: '70%' }] }
        : { labels: ['Kiệt quệ cảm xúc', 'Hoài nghi', 'Mất hiệu quả HT', 'Chưa ảnh hưởng'], datasets: [{ data: [exhPct, cynPct, lowPct, safePct], backgroundColor: ['#4F8EC9', '#F59E0B', '#F43F5E', '#E2E8F0'], borderColor: '#fff', borderWidth: 3, cutout: '70%' }] };
    donutChartInstance = new Chart(canvas.getContext('2d'), {
        type: 'doughnut',
        data: chartData,
        options: { responsive: false, maintainAspectRatio: false, animation: { duration: 800 }, plugins: { legend: { display: false } } }
    });
}

function initDassBarChart() {
    const canvas = document.getElementById('dassBarChart');
    if (!canvas) return;
    const rows = [{ key: 'stress', label: 'Stress' }, { key: 'anxiety', label: 'Lo âu' }, { key: 'depression', label: 'Trầm cảm' }];
    const values = rows.map(r => currentScores[r.key] * 2);
    const grayColor = '#CBD5E1';
    // Color bar if score > 0, gray if 0 (no issues detected)
    const colors = rows.map(r => {
        const rawScore = currentScores[r.key];
        if (rawScore === 0) return grayColor;
        return getLevelConfig(r.key, rawScore).hex;
    });
    if (dassBarChartInstance) dassBarChartInstance.destroy();
    dassBarChartInstance = new Chart(canvas.getContext('2d'), {
        type: 'bar',
        data: { labels: rows.map(r => r.label), datasets: [{ data: values, backgroundColor: colors, borderRadius: 8, barThickness: 44 }] },
        options: { responsive: true, maintainAspectRatio: false, scales: { y: { min: 0, max: 42, grid: { borderDash: [4, 4] } }, x: { grid: { display: false }, ticks: { font: { weight: 'bold', family: 'Plus Jakarta Sans' } } } }, plugins: { legend: { display: false } } }
    });
}

function initCommunityCharts() {
    const canvasMbi = document.getElementById('communityMbiChart');
    const canvasDass = document.getElementById('communityDassChart');
    if (!canvasMbi || !canvasDass) return;
    const div = communityStats.count > 0 ? communityStats.count : 1;
    if (communityMbiChartInstance) communityMbiChartInstance.destroy();
    communityMbiChartInstance = new Chart(canvasMbi.getContext('2d'), {
        type: 'bar',
        data: { labels: ['Kiệt quệ', 'Hoài nghi', 'Hiệu quả HT'], datasets: [{ data: [(communityStats.emotionalExhaustion / div).toFixed(1), (communityStats.cynicism / div).toFixed(1), (communityStats.academicEfficacy / div).toFixed(1)], backgroundColor: ['#4F8EC9', '#F59E0B', '#10B981'], borderRadius: 6, barThickness: 24 }] },
        options: { responsive: true, maintainAspectRatio: false, scales: { y: { min: 0, max: 36, grid: { borderDash: [4, 4] } }, x: { grid: { display: false }, ticks: { font: { size: 10, weight: 'bold', family: 'Plus Jakarta Sans' } } } }, plugins: { legend: { display: false } } }
    });
    if (communityDassChartInstance) communityDassChartInstance.destroy();
    communityDassChartInstance = new Chart(canvasDass.getContext('2d'), {
        type: 'bar',
        data: { labels: ['Stress', 'Lo âu', 'Trầm cảm'], datasets: [{ data: [(communityStats.stress / div * 2).toFixed(1), (communityStats.anxiety / div * 2).toFixed(1), (communityStats.depression / div * 2).toFixed(1)], backgroundColor: ['#F43F5E', '#8B5CF6', '#4F8EC9'], borderRadius: 6, barThickness: 24 }] },
        options: { responsive: true, maintainAspectRatio: false, scales: { y: { min: 0, max: 42, grid: { borderDash: [4, 4] } }, x: { grid: { display: false }, ticks: { font: { size: 11, weight: 'bold', family: 'Plus Jakarta Sans' } } } }, plugins: { legend: { display: false } } }
    });
}

// ===== PASSWORD TOGGLE =====
function togglePasswordVisibility() {
    const input = document.getElementById('passwordInput');
    const btn = document.getElementById('pwToggleBtn');
    if (!input || !btn) return;
    const isHidden = input.type === 'password';
    input.type = isHidden ? 'text' : 'password';
    // Dựng lại toàn bộ nội dung nút từ đầu, đảm bảo luôn chỉ có đúng 1 icon
    btn.innerHTML = `<i data-lucide="${isHidden ? 'eye' : 'eye-off'}" class="w-5 h-5" id="pwToggleIcon"></i>`;
    lucide.createIcons();
    btn.setAttribute('aria-label', isHidden ? 'Ẩn mật khẩu' : 'Hiển thị mật khẩu');
    const len = input.value.length;
    input.setSelectionRange(len, len);
    input.focus();
}

// ===== ADMIN CONFIG =====
const ADMIN_CREDENTIALS = {
    email: 'admin@gialoc.edu.vn',
    passwordHash: '6cf838679df353a19558bbb0a4ea6db2b3cda4858a850976e408fa5bc70a244d'
};
let adminMode = false;
let adminData = [];
let adminLoading = false;
let adminSearch = '';
let adminFilter = 'all';
let adminSort = 'date_desc';

async function handleAdminLogin(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const email = fd.get('adminEmail').trim();
    const password = fd.get('adminPassword');
    const passwordHash = await hashPassword(password);
    if (email === ADMIN_CREDENTIALS.email && passwordHash === ADMIN_CREDENTIALS.passwordHash) {
        adminMode = true;
        loadAdminData();
    } else {
        const errEl = document.getElementById('adminLoginError');
        if (errEl) { errEl.textContent = 'Sai thông tin đăng nhập!'; errEl.style.display = 'block'; }
    }
}

async function loadAdminData() {
    adminLoading = true;
    renderAdminPage();
    if (supabaseReady) {
        try {
            const { data, error } = await db.from('survey_results').select('*').order('created_at', { ascending: false });
            if (!error && data) adminData = data;
        } catch (err) { console.error('Admin load error:', err); }
    } else {
        adminData = [];
        const users = JSON.parse(localStorage.getItem('mental_health_users') || '[]');
        users.forEach(u => {
            const hist = getUserHistory(u.email);
            hist.forEach(h => {
                adminData.push({
                    user_name: u.name || u.email,
                    created_at: h.date,
                    stress: h.scores.stress, anxiety: h.scores.anxiety, depression: h.scores.depression,
                    emotional_exhaustion: h.scores.emotionalExhaustion,
                    cynicism: h.scores.cynicism, academic_efficacy: h.scores.academicEfficacy
                });
            });
        });
        adminData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }
    adminLoading = false;
    renderAdminPage();
}

function getAdminFilteredData() {
    let data = [...adminData];
    if (adminSearch) {
        const q = adminSearch.toLowerCase();
        data = data.filter(r => (r.user_name || '').toLowerCase().includes(q));
    }
    if (adminFilter !== 'all') {
        data = data.filter(r => {
            if (adminFilter === 'stress') return isAttentionLevel(getLevelConfig('stress', r.stress || 0).label);
            if (adminFilter === 'anxiety') return isAttentionLevel(getLevelConfig('anxiety', r.anxiety || 0).label);
            if (adminFilter === 'depression') return isAttentionLevel(getLevelConfig('depression', r.depression || 0).label);
            if (adminFilter === 'burnout') return isAttentionLevel(getMbiLevelConfig(getMbiRiskPct({ emotionalExhaustion: r.emotional_exhaustion || 0, cynicism: r.cynicism || 0, academicEfficacy: r.academic_efficacy || 0 })).label);
            return true;
        });
    }
    if (adminSort === 'date_desc') data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    else if (adminSort === 'date_asc') data.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    else if (adminSort === 'stress') data.sort((a, b) => (b.stress || 0) - (a.stress || 0));
    else if (adminSort === 'burnout') data.sort((a, b) =>
        getMbiRiskPct({ emotionalExhaustion: b.emotional_exhaustion || 0, cynicism: b.cynicism || 0, academicEfficacy: b.academic_efficacy || 0 }) -
        getMbiRiskPct({ emotionalExhaustion: a.emotional_exhaustion || 0, cynicism: a.cynicism || 0, academicEfficacy: a.academic_efficacy || 0 })
    );
    return data;
}

function exportAdminCSV() {
    const data = getAdminFilteredData();
    const headers = ['Tên', 'Ngày', 'Stress', 'Lo âu', 'Trầm cảm', 'Mức Stress', 'Mức Lo âu', 'Mức Trầm cảm', 'Kiệt quệ CX', 'Hoài nghi', 'Hiệu quả HT', 'Mức chỉ số MBI-SS', 'Chỉ số MBI-SS%'];
    const rows = data.map(r => {
        const mbi = getMbiRiskPct({ emotionalExhaustion: r.emotional_exhaustion || 0, cynicism: r.cynicism || 0, academicEfficacy: r.academic_efficacy || 0 });
        return [
            '"' + (r.user_name || 'Ẩn danh').replace(/"/g, '') + '"',
            r.created_at ? new Date(r.created_at).toLocaleString('vi-VN') : '',
            (r.stress || 0) * 2, (r.anxiety || 0) * 2, (r.depression || 0) * 2,
            getLevelConfig('stress', r.stress || 0).label,
            getLevelConfig('anxiety', r.anxiety || 0).label,
            getLevelConfig('depression', r.depression || 0).label,
            r.emotional_exhaustion || 0, r.cynicism || 0, r.academic_efficacy || 0,
            getMbiLevelConfig(mbi).label, mbi + '%'
        ].join(',');
    });
    const csv = [headers.join(','), ...rows].join('\n');
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'ket_qua_khao_sat_gia_loc.csv'; a.click();
    URL.revokeObjectURL(url);
}

function renderAdminPage() {
    const root = document.getElementById('root');
    if (!adminMode) {
        root.innerHTML = `
        <div class="min-h-screen flex items-center justify-center px-4 py-10 auth-bg">
            <div class="w-full max-w-sm">
                <div class="text-center mb-8">
                    <div class="brand-mark inline-flex items-center justify-center rounded-2xl shadow-lg mb-4" aria-label="Logo THPT Gia Lộc">
                        <img class="school-logo school-logo-small" src="476607564_1118966020245066_3011246608916633901_n.jpg" alt="Logo THPT Gia Lộc">
                    </div>
                    <h1 class="text-2xl font-black text-slate-800">Trang Quản Trị</h1>
                    <p class="text-sm text-slate-500 font-semibold mt-1">THPT Gia Lộc - Cổng Quản Trị</p>
                </div>
                <div class="card-lg p-7">
                    <div id="adminLoginError" style="display:none;margin-bottom:1rem;padding:0.75rem;border-radius:12px;background:#FFF1F2;border:1px solid #FECDD3;color:#BE123C;font-size:13px;font-weight:700;"></div>
                    <form onsubmit="handleAdminLogin(event)" class="space-y-4">
                        <div>
                            <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Email Quản Trị</label>
                            <input type="email" name="adminEmail" required placeholder="Nhập email quản trị"
                                class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100">
                        </div>
                        <div>
                            <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Mật khẩu</label>
                            <input type="password" name="adminPassword" required placeholder="Nhập mật khẩu"
                                class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100">
                        </div>
                        <button type="submit" class="btn-primary w-full" style="border-radius:14px;padding:0.9rem;">
                            Đăng nhập Quản Trị
                        </button>
                    </form>
                    <button onclick="window.location.hash='';step='auth';renderApp();" class="w-full mt-3 text-xs font-bold text-slate-400 hover:text-slate-600 py-2">
                        Quay về trang học sinh
                    </button>
                </div>
            </div>
        </div>`;
        lucide.createIcons(); return;
    }

    // Ghi nhớ ô đang được gõ (và vị trí con trỏ) trước khi vẽ lại toàn trang,
    // vì root.innerHTML sẽ tạo lại toàn bộ DOM và làm mất focus hiện tại.
    // Đây là nguyên nhân khiến ô tìm kiếm trước đây chỉ gõ được 1 ký tự rồi bị mất focus.
    const prevActive = document.activeElement;
    const focusedId = prevActive && prevActive.id ? prevActive.id : null;
    const caretStart = focusedId && typeof prevActive.selectionStart === 'number' ? prevActive.selectionStart : null;
    const caretEnd = focusedId && typeof prevActive.selectionEnd === 'number' ? prevActive.selectionEnd : null;

    const filtered = getAdminFilteredData();
    const total = adminData.length;
    const needsAttention = adminData.filter(r => {
        const sBad = isAttentionLevel(getLevelConfig('stress', r.stress || 0).label);
        const aBad = isAttentionLevel(getLevelConfig('anxiety', r.anxiety || 0).label);
        const dBad = isAttentionLevel(getLevelConfig('depression', r.depression || 0).label);
        const rBurnout = getMbiRiskPct({ emotionalExhaustion: r.emotional_exhaustion || 0, cynicism: r.cynicism || 0, academicEfficacy: r.academic_efficacy || 0 });
        const bBad = isAttentionLevel(getMbiLevelConfig(rBurnout).label);
        return sBad || aBad || dBad || bBad;
    }).length;
    const avgStress = total > 0 ? (adminData.reduce((s, r) => s + (r.stress || 0) * 2, 0) / total).toFixed(1) : '--';
    const avgAnxiety = total > 0 ? (adminData.reduce((s, r) => s + (r.anxiety || 0) * 2, 0) / total).toFixed(1) : '--';

    const mkBadge = (label, hex) => `<span style="display:inline-flex;align-items:center;padding:2px 8px;border-radius:999px;font-size:10px;font-weight:800;background:${hex}18;color:${hex};">${label}</span>`;

    const tableRows = filtered.map(r => {
        const d = r.created_at ? new Date(r.created_at) : null;
        const dateStr = d ? d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }) : '--';
        const timeStr = d ? d.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) : '';
        const sL = getLevelConfig('stress', r.stress || 0);
        const aL = getLevelConfig('anxiety', r.anxiety || 0);
        const dL = getLevelConfig('depression', r.depression || 0);
        const mbiPct = getMbiRiskPct({ emotionalExhaustion: r.emotional_exhaustion || 0, cynicism: r.cynicism || 0, academicEfficacy: r.academic_efficacy || 0 });
        const mbiLvl = getMbiLevelConfig(mbiPct);
        const isAlert = isAttentionLevel(sL.label) || isAttentionLevel(aL.label) || isAttentionLevel(dL.label) || isAttentionLevel(mbiLvl.label);
        return `<tr style="border-bottom:1px solid #F1F5F9;background:${isAlert ? '#FFFBEB' : '#fff'};">
            <td style="padding:10px 16px;font-size:12px;font-weight:700;color:#1e293b;white-space:nowrap;">
                <span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:${isAlert ? '#F43F5E' : '#10B981'};margin-right:7px;vertical-align:middle;flex-shrink:0;"></span>${r.user_name || 'Ẩn danh'}
            </td>
            <td style="padding:10px 16px;font-size:11px;color:#64748b;white-space:nowrap;">${dateStr}<br><span style="font-size:10px;color:#94a3b8;">${timeStr}</span></td>
            <td style="padding:10px 16px;text-align:center;">${mkBadge(sL.label, sL.hex)}<br><span style="font-size:10px;color:#94a3b8;font-weight:600;">${(r.stress || 0) * 2}/42</span></td>
            <td style="padding:10px 16px;text-align:center;">${mkBadge(aL.label, aL.hex)}<br><span style="font-size:10px;color:#94a3b8;font-weight:600;">${(r.anxiety || 0) * 2}/42</span></td>
            <td style="padding:10px 16px;text-align:center;">${mkBadge(dL.label, dL.hex)}<br><span style="font-size:10px;color:#94a3b8;font-weight:600;">${(r.depression || 0) * 2}/42</span></td>
            <td style="padding:10px 16px;text-align:center;">${mkBadge(mbiLvl.label, mbiLvl.hex)}<br><span style="font-size:10px;color:#94a3b8;font-weight:600;">${mbiPct}% nguy cơ</span><br><span style="font-size:9px;color:#cbd5e1;font-weight:700;" title="3 tiểu mục MBI-SS — độc lập với điểm DASS-21 (Stress/Lo âu/Trầm cảm)">KQ ${r.emotional_exhaustion || 0}/30 · HN ${r.cynicism || 0}/24 · HQ ${r.academic_efficacy || 0}/36</span></td>
        </tr>`;
    }).join('');

    const statsCards = [
        { label: 'Tổng lượt khảo sát', value: total, icon: 'users', color: '#4F8EC9' },
        { label: 'Cần chú ý', value: needsAttention, icon: 'alert-triangle', color: '#F43F5E' },
        { label: 'TB Stress (DASS)', value: avgStress, icon: 'brain', color: '#F59E0B' },
        { label: 'TB Lo âu (DASS)', value: avgAnxiety, icon: 'heart', color: '#8B5CF6' }
    ].map(s => `<div style="background:#fff;border-radius:20px;border:1px solid rgba(79,142,201,0.1);box-shadow:0 4px 24px rgba(79,142,201,0.08);padding:1.25rem;">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:0.5rem;">
            <span style="font-size:10px;font-weight:900;text-transform:uppercase;letter-spacing:0.08em;color:#94a3b8;">${s.label}</span>
            <div style="width:32px;height:32px;border-radius:10px;background:${s.color}18;display:flex;align-items:center;justify-content:center;">
                <i data-lucide="${s.icon}" style="width:16px;height:16px;color:${s.color};"></i>
            </div>
        </div>
        <p style="font-size:2rem;font-weight:900;color:${s.color};line-height:1;">${s.value}</p>
    </div>`).join('');

    const filterBtns = [['all', 'Tất cả'], ['stress', 'Stress'], ['anxiety', 'Lo âu'], ['depression', 'Trầm cảm'], ['burnout', 'Chỉ số MBI-SS']].map(([v, l]) =>
        `<button onclick="adminFilter='${v}';renderAdminPage();" style="padding:0.4rem 0.85rem;border-radius:99px;font-size:11px;font-weight:800;border:1.5px solid ${adminFilter === v ? '#4F8EC9' : '#E2E8F0'};background:${adminFilter === v ? '#EFF6FF' : 'transparent'};color:${adminFilter === v ? '#1D4ED8' : '#64748b'};cursor:pointer;font-family:inherit;">${l}</button>`
    ).join('');

    root.innerHTML = `
    <div class="admin-page min-h-screen" style="background:#F0F7FF;">
        <header style="background:rgba(255,255,255,0.97);backdrop-filter:blur(12px);border-bottom:1px solid rgba(79,142,201,0.12);box-shadow:0 2px 16px rgba(79,142,201,0.07);position:sticky;top:0;z-index:40;">
            <div style="max-width:1280px;margin:0 auto;padding:0.75rem 1rem;display:flex;align-items:center;justify-content:space-between;gap:0.75rem;flex-wrap:wrap;">
                <div style="display:flex;align-items:center;gap:0.75rem;">
                    <div style="width:42px;height:42px;border-radius:12px;background:linear-gradient(135deg,#0D3348,#1e5a7a);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                        <img src="476607564_1118966020245066_3011246608916633901_n.jpg" alt="logo" style="width:34px;height:34px;object-fit:cover;border-radius:8px;">
                    </div>
                    <div>
                        <h1 style="font-size:1rem;font-weight:900;color:#1e293b;margin:0;line-height:1.2;">Admin</h1>
                        <p style="font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:0.15em;color:#94a3b8;margin:0;">THPT Gia Lộc - Quản Trị</p>
                    </div>
                </div>
                <div style="display:flex;align-items:center;gap:0.5rem;flex-wrap:wrap;">
                    <button onclick="loadAdminData()" class="btn-ghost" style="font-size:11px;padding:0.45rem 0.85rem;gap:5px;"><i data-lucide="refresh-cw" style="width:13px;height:13px;"></i> Làm mới</button>
                    <button onclick="exportAdminCSV()" class="btn-ghost" style="font-size:11px;padding:0.45rem 0.85rem;gap:5px;color:#10B981;border-color:#BBF7D0;background:#F0FDF4;"><i data-lucide="download" style="width:13px;height:13px;"></i> Xuất CSV</button>
                    <button onclick="adminMode=false;renderAdminPage();" class="btn-ghost" style="font-size:11px;padding:0.45rem 0.85rem;gap:5px;color:#F43F5E;border-color:#FECDD3;background:#FFF1F2;"><i data-lucide="log-out" style="width:13px;height:13px;"></i> Đăng xuất</button>
                    <button onclick="window.location.hash='';step='auth';renderApp();" class="btn-ghost" style="font-size:11px;padding:0.45rem 0.85rem;gap:5px;"><i data-lucide="arrow-left" style="width:13px;height:13px;"></i> Trang HS</button>
                </div>
            </div>
        </header>
        <main style="max-width:1280px;margin:0 auto;padding:1.5rem 1rem;display:flex;flex-direction:column;gap:1.25rem;">
            <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:1rem;">
                ${statsCards}
            </div>
            <div style="background:#fff;border-radius:20px;border:1px solid rgba(79,142,201,0.1);box-shadow:0 4px 24px rgba(79,142,201,0.08);padding:1.25rem;">
                <div style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center;">
                    <div style="position:relative;flex:1;min-width:160px;">
                        <input type="text" id="adminSearchInput" placeholder="Tìm theo tên học sinh..." value="${adminSearch}"
                            oninput="adminSearch=this.value;renderAdminPage();"
                            style="width:100%;padding:0.6rem 0.75rem;border:1.5px solid #E2E8F0;border-radius:12px;font-size:13px;font-family:inherit;outline:none;background:#F8FAFC;color:#1e293b;box-sizing:border-box;">
                    </div>
                    <div style="display:flex;gap:5px;flex-wrap:wrap;">${filterBtns}</div>
                    <select onchange="adminSort=this.value;renderAdminPage();"
                        style="padding:0.5rem 0.75rem;border:1.5px solid #E2E8F0;border-radius:12px;font-size:12px;font-weight:700;font-family:inherit;background:#F8FAFC;color:#475569;outline:none;cursor:pointer;">
                        <option value="date_desc" ${adminSort === 'date_desc' ? 'selected' : ''}>Mới nhất trước</option>
                        <option value="date_asc" ${adminSort === 'date_asc' ? 'selected' : ''}>Cũ nhất trước</option>
                        <option value="stress" ${adminSort === 'stress' ? 'selected' : ''}>Stress cao nhất</option>
                        <option value="burnout" ${adminSort === 'burnout' ? 'selected' : ''}>Chỉ số MBI-SS cao nhất</option>
                    </select>
                </div>
                <p style="margin-top:0.6rem;font-size:11px;font-weight:700;color:#94a3b8;">Hiển thị ${filtered.length} / ${total} kết quả ${adminFilter !== 'all' ? '(đã lọc)' : ''}</p>
            </div>
            <div style="background:#fff;border-radius:20px;border:1px solid rgba(79,142,201,0.1);box-shadow:0 4px 24px rgba(79,142,201,0.08);overflow:hidden;">
                ${adminLoading
            ? `<div style="padding:4rem;text-align:center;"><p style="color:#94a3b8;font-weight:700;font-size:13px;">Đang tải dữ liệu...</p></div>`
            : filtered.length === 0
                ? `<div style="padding:4rem;text-align:center;color:#94a3b8;font-weight:700;font-size:14px;">Không có dữ liệu phù hợp.</div>`
                : `<div style="overflow-x:auto;"><table style="width:100%;border-collapse:collapse;">
                        <thead><tr style="background:#F8FAFC;border-bottom:2px solid #E2E8F0;">
                            <th style="padding:12px 16px;text-align:left;font-size:10px;font-weight:900;text-transform:uppercase;letter-spacing:0.1em;color:#64748b;white-space:nowrap;">Học sinh</th>
                            <th style="padding:12px 16px;text-align:left;font-size:10px;font-weight:900;text-transform:uppercase;letter-spacing:0.1em;color:#64748b;white-space:nowrap;">Thời gian</th>
                            <th style="padding:12px 16px;text-align:center;font-size:10px;font-weight:900;text-transform:uppercase;letter-spacing:0.1em;color:#64748b;">Stress</th>
                            <th style="padding:12px 16px;text-align:center;font-size:10px;font-weight:900;text-transform:uppercase;letter-spacing:0.1em;color:#64748b;">Lo âu</th>
                            <th style="padding:12px 16px;text-align:center;font-size:10px;font-weight:900;text-transform:uppercase;letter-spacing:0.1em;color:#64748b;">Trầm cảm</th>
                            <th style="padding:12px 16px;text-align:center;font-size:10px;font-weight:900;text-transform:uppercase;letter-spacing:0.1em;color:#64748b;">Chỉ số MBI-SS</th>
                        </tr></thead>
                        <tbody>${tableRows}</tbody>
                    </table></div>`}
            </div>
            <div style="background:#fff;border-radius:16px;border:1px solid rgba(79,142,201,0.1);padding:0.875rem 1.25rem;display:flex;align-items:center;flex-wrap:wrap;gap:0.5rem;">
                <span style="font-size:10px;font-weight:900;text-transform:uppercase;letter-spacing:0.1em;color:#94a3b8;margin-right:4px;">Mức độ:</span>
                ${[['Tốt', '#10B981'], ['Nhẹ', '#4F8EC9'], ['Vừa', '#F59E0B'], ['Nặng', '#F43F5E'], ['Rất nặng', '#9F1239']].map(([l, c]) =>
                    `<span style="display:inline-flex;align-items:center;gap:5px;padding:3px 10px;border-radius:999px;font-size:10px;font-weight:800;background:${c}18;color:${c};">${l}</span>`
                ).join('')}
                <span style="font-size:10px;color:#94a3b8;font-weight:600;margin-left:4px;">Vàng = cần chú ý | Xanh = tốt</span>
            </div>
        </main>
    </div>`;
    lucide.createIcons();

    // Khôi phục focus + vị trí con trỏ cho ô đang gõ (vd. ô tìm kiếm) sau khi vẽ lại DOM
    if (focusedId) {
        const toFocus = document.getElementById(focusedId);
        if (toFocus) {
            toFocus.focus();
            if (caretStart !== null && typeof toFocus.setSelectionRange === 'function') {
                toFocus.setSelectionRange(caretStart, caretEnd);
            }
        }
    }
}

// ===== KHỞI CHẠY ỨNG DỤNG =====
// Truy cập index.html#admin để vào Trang Quản Trị (vẫn cần đăng nhập riêng bằng ADMIN_CREDENTIALS).
if (window.location.hash === '#admin') {
    renderAdminPage();
} else {
    renderApp();
}
