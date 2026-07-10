const SUPABASE_URL = 'https://iwncqexhxnflcmrovfga.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_vdDbdvfTImKTM_WHhM8POw_-WrvjCZj';
let db = null; // Supabase client
let supabaseReady = false;
try {
    if (window.supabase && window.supabase.createClient) {
        db = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        supabaseReady = true;
        console.log('✅ Supabase đã kết nối thành công!');
    } else {
        console.warn('⚠️ Supabase SDK chưa load. Dùng chế độ offline (localStorage).');
    }
} catch (err) {
    console.error('❌ Lỗi khởi tạo Supabase:', err.message);
    console.warn('⚠️ Chuyển sang chế độ offline (localStorage).');
}

// Theme constants (shifted greener)
const THEME = {
    primary: '#2FBF9A',
    accent: '#7EE3C6',
    dark: '#0F4D40'
};

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

// Câu hỏi nhiễu (kiểm định nhất quán câu trả lời) - CHỈ dùng để đối chiếu độ tin cậy,
// KHÔNG được cộng vào bất kỳ nhóm điểm nào bên dưới (DASS_STRESS/ANXIETY/DEPRESSION, MBI_...).
// Nhờ vậy hàm getSum() tự động bỏ qua các câu này khi tính điểm.
const DASS_NOISE_QUESTIONS = [
    { id: 'dass-noise-1', text: 'Bạn chưa bao giờ để những thất bại hay rắc rối cá nhân làm ảnh hưởng đến tinh thần hoặc giấc ngủ của mình quá một ngày', scale: DASS_SCALE, sectionTitle: 'Phần 1 — DASS-21', section: 'DASS-21', isNoise: true },
    { id: 'dass-noise-2', text: 'Bạn vẫn tìm thấy những nguồn năng lượng tích cực và sự bình yên trong các hoạt động hằng ngày', scale: DASS_SCALE, sectionTitle: 'Phần 1 — DASS-21', section: 'DASS-21', isNoise: true },
    { id: 'dass-noise-3', text: 'Đôi khi bạn cảm thấy bực mình hoặc khó chịu vì những chuyện nhỏ nhặt.', scale: DASS_SCALE, sectionTitle: 'Phần 1 — DASS-21', section: 'DASS-21', isNoise: true },
    { id: 'dass-noise-4', text: 'Đôi khi bạn cảm thấy hụt hẫng hoặc có chút thất vọng khi những nỗ lực của bản thân không đem lại kết quả như kỳ vọng', scale: DASS_SCALE, sectionTitle: 'Phần 1 — DASS-21', section: 'DASS-21', isNoise: true }
];
const MBI_NOISE_QUESTIONS = [
    { id: 'mbi-noise-1', text: 'Bạn hiếm khi phải thức khuya hay hy sinh thời gian ngủ của mình để cố làm cho xong các bài tập được giao', scale: MBI_SCALE, sectionTitle: 'Phần 2 — MBI-SS', section: 'MBI-SS', isNoise: true },
    { id: 'mbi-noise-2', text: 'Bạn chưa bao giờ cảm thấy chạnh lòng hay áp lực khi thấy các bạn xung quanh đạt điểm số cao hơn mình.', scale: MBI_SCALE, sectionTitle: 'Phần 2 — MBI-SS', section: 'MBI-SS', isNoise: true },
    { id: 'mbi-noise-3', text: 'Chỉ cần một khoảng nghỉ ngắn giữa giờ cũng đủ để bạn lấy lại tinh thần thoải mái cho các tiết học tiếp theo.', scale: MBI_SCALE, sectionTitle: 'Phần 2 — MBI-SS', section: 'MBI-SS', isNoise: true }
];

// Thứ tự hiển thị cuối cùng: DASS-21 gốc + 4 câu nhiễu xen vào đúng vị trí 5, 11, 16, 22 (=> 25 câu)
// và MBI-SS gốc + 3 câu nhiễu xen vào đúng vị trí 4, 9, 15 (=> 18 câu).
const DASS_ORDER_IDS = ['dass-1', 'dass-2', 'dass-3', 'dass-4', 'dass-noise-1', 'dass-5', 'dass-6', 'dass-7', 'dass-8', 'dass-9', 'dass-noise-2', 'dass-10', 'dass-11', 'dass-12', 'dass-13', 'dass-noise-3', 'dass-14', 'dass-15', 'dass-16', 'dass-17', 'dass-18', 'dass-noise-4', 'dass-19', 'dass-20', 'dass-21'];
const MBI_ORDER_IDS = ['mbi-1', 'mbi-2', 'mbi-3', 'mbi-noise-1', 'mbi-4', 'mbi-5', 'mbi-6', 'mbi-7', 'mbi-noise-2', 'mbi-8', 'mbi-9', 'mbi-10', 'mbi-11', 'mbi-12', 'mbi-noise-3', 'mbi-13', 'mbi-14', 'mbi-15'];
const ALL_QUESTIONS_BY_ID = {};
[...DASS_QUESTIONS, ...DASS_NOISE_QUESTIONS, ...MBI_QUESTIONS, ...MBI_NOISE_QUESTIONS].forEach(q => { ALL_QUESTIONS_BY_ID[q.id] = q; });

let QUESTIONS = [...DASS_ORDER_IDS, ...MBI_ORDER_IDS].map((id, idx) => ({ ...ALL_QUESTIONS_BY_ID[id], order: idx + 1 }));

// Logic nhóm điểm
const DASS_STRESS = ['dass-1', 'dass-6', 'dass-8', 'dass-11', 'dass-12', 'dass-14', 'dass-18'];
const DASS_ANXIETY = ['dass-2', 'dass-4', 'dass-7', 'dass-9', 'dass-15', 'dass-19', 'dass-20'];
const DASS_DEPRESSION = ['dass-3', 'dass-5', 'dass-10', 'dass-13', 'dass-16', 'dass-17', 'dass-21'];
const MBI_EMOTIONAL_EXHAUSTION = ['mbi-1', 'mbi-4', 'mbi-6', 'mbi-8', 'mbi-13'];
const MBI_CYNICISM = ['mbi-2', 'mbi-9', 'mbi-10', 'mbi-12'];
const MBI_ACADEMIC_EFFICACY = ['mbi-3', 'mbi-5', 'mbi-7', 'mbi-11', 'mbi-14', 'mbi-15'];

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

// Load stats cũ từ localStorage (fallback)
try {
    const saved = localStorage.getItem('mental_health_survey_v2');
    if (saved) communityStats = JSON.parse(saved);
} catch (e) { }

let localUsersDb = JSON.parse(localStorage.getItem('mental_health_users') || '[]');
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

async function handleAuthSubmit(e) {
    e.preventDefault();
    authLoading = true;
    authError = '';
    authSuccess = '';
    renderApp();
    const fd = new FormData(e.target);
    const email = fd.get('email').trim();
    const password = fd.get('password');
    const displayName = fd.get('name') ? fd.get('name').trim() : '';
    try {
        if (supabaseReady) {
            // ===== SUPABASE AUTH =====
            if (authMode === 'register') {
                const { data, error } = await db.auth.signUp({
                    email: email,
                    password: password,
                    options: { data: { display_name: displayName || email.split('@')[0] } }
                });
                if (error) throw error;
                currentUser = {
                    id: data.user.id,
                    name: displayName || email.split('@')[0],
                    email: email,
                    isIncognito: false
                };
            } else {
                const { data, error } = await db.auth.signInWithPassword({
                    email: email,
                    password: password
                });
                if (error) throw error;
                currentUser = {
                    id: data.user.id,
                    name: data.user.user_metadata?.display_name || email.split('@')[0],
                    email: email,
                    isIncognito: false
                };
            }
        } else {
            // ===== FALLBACK: localStorage AUTH =====
            if (authMode === 'register') {
                const exists = localUsersDb.find(u => u.email === email);
                if (exists) throw new Error('Email này đã được đăng ký!');
                const newUser = { email, name: displayName || email.split('@')[0] };
                await setLocalPassword(newUser, password);
                localUsersDb.push(newUser);
                localStorage.setItem('mental_health_users', JSON.stringify(localUsersDb));
                currentUser = { id: null, name: newUser.name, email: email, isIncognito: false };
            } else {
                const user = localUsersDb.find(u => u.email === email);
                if (!user) throw new Error('Sai email hoặc mật khẩu!');
                const passwordMatches = await verifyLocalPassword(user, password);
                if (!passwordMatches) throw new Error('Sai email hoặc mật khẩu!');
                currentUser = { id: null, name: user.name, email: email, isIncognito: false };
            }
        }
        step = 'start';
    } catch (err) {
        authError = err.message === 'Invalid login credentials'
            ? 'Sai email hoặc mật khẩu!'
            : err.message === 'User already registered'
                ? 'Email này đã được đăng ký!'
                : err.message;
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

async function handleChangePassword() {
    if (!currentUser || currentUser.isIncognito) {
        window.alert('Bạn đang ở chế độ ẩn danh nên không thể đổi mật khẩu.');
        return;
    }
    const newPassword = window.prompt('Nhập mật khẩu mới (tối thiểu 6 ký tự):');
    if (!newPassword) return;
    if (newPassword.length < 6) {
        window.alert('Mật khẩu mới phải có ít nhất 6 ký tự.');
        return;
    }
    const confirmPassword = window.prompt('Xác nhận mật khẩu mới:');
    if (newPassword !== confirmPassword) {
        window.alert('Xác nhận mật khẩu không khớp.');
        return;
    }
    try {
        if (supabaseReady) {
            const { error } = await db.auth.updateUser({ password: newPassword });
            if (error) throw error;
        } else {
            const userIndex = localUsersDb.findIndex(u => u.email === currentUser.email);
            if (userIndex === -1) throw new Error('Không tìm thấy tài khoản trong hệ thống.');
            await setLocalPassword(localUsersDb[userIndex], newPassword);
            localStorage.setItem('mental_health_users', JSON.stringify(localUsersDb));
        }
        window.alert('Đổi mật khẩu thành công.');
    } catch (err) {
        window.alert(err.message || 'Không thể đổi mật khẩu lúc này.');
    }
}

async function handleLogout() {
    if (supabaseReady) {
        try { await db.auth.signOut(); } catch (e) { }
    }
    currentUser = null;
    step = 'auth';
    authMode = 'login';
    authError = '';
    authSuccess = '';
    renderApp();
}

async function saveResult(scores) {
    const record = {
        user_name: currentUser?.isIncognito ? currentUser.name : (currentUser?.name || 'Ẩn danh'),
        is_incognito: currentUser?.isIncognito || false,
        stress: scores.stress * 2,
        anxiety: scores.anxiety * 2,
        depression: scores.depression * 2,
        emotional_exhaustion: scores.emotionalExhaustion,
        cynicism: scores.cynicism,
        academic_efficacy: scores.academicEfficacy
    };
    if (supabaseReady) {
        if (currentUser?.id) record.user_id = currentUser.id;
        const { error } = await db.from('survey_results').insert([record]);
        if (error) console.error('Lỗi lưu Supabase:', error.message);
        else console.log('✅ Đã lưu kết quả lên máy chủ!');
    }
    // Luôn lưu localStorage để có fallback
    communityStats.count += 1;
    communityStats.emotionalExhaustion += scores.emotionalExhaustion;
    communityStats.cynicism += scores.cynicism;
    communityStats.academicEfficacy += scores.academicEfficacy;
    communityStats.stress += (scores.stress * 2);
    communityStats.anxiety += (scores.anxiety * 2);
    communityStats.depression += (scores.depression * 2);
    localStorage.setItem('mental_health_survey_v2', JSON.stringify(communityStats));
}

async function loadCommunityStats() {
    if (!supabaseReady) return; // Dùng localStorage stats đã load ở đầu
    try {
        const { data, error } = await db.from('survey_results').select('*');
        if (error || !data || data.length === 0) return;
        const count = data.length;
        let totalEE = 0, totalCY = 0, totalAE = 0, totalST = 0, totalAX = 0, totalDE = 0;
        data.forEach(row => {
            totalEE += row.emotional_exhaustion || 0;
            totalCY += row.cynicism || 0;
            totalAE += row.academic_efficacy || 0;
            totalST += row.stress || 0;
            totalAX += row.anxiety || 0;
            totalDE += row.depression || 0;
        });
        communityStats = { count, emotionalExhaustion: totalEE, cynicism: totalCY, academicEfficacy: totalAE, stress: totalST, anxiety: totalAX, depression: totalDE };
    } catch (err) {
        console.error('Lỗi tải thống kê:', err.message);
    }
}

const getSum = (ansObj, ids) => ids.reduce((total, id) => total + (ansObj[id] || 0), 0);
function getLevelConfig(scale, rawScore) {
    const score = rawScore * 2;
    let label = 'Bình thường';
    if (scale === 'stress') {
        if (score >= 34) label = 'Rất nặng'; else if (score >= 26) label = 'Nặng';
        else if (score >= 20) label = 'Vừa'; else if (score >= 16) label = 'Nhẹ';
    } else if (scale === 'depression') {
        if (score >= 28) label = 'Rất nặng'; else if (score >= 22) label = 'Nặng';
        else if (score >= 14) label = 'Vừa'; else if (score >= 10) label = 'Nhẹ';
    } else if (scale === 'anxiety') {
        if (score >= 20) label = 'Rất nặng'; else if (score >= 16) label = 'Nặng';
        else if (score >= 12) label = 'Vừa'; else if (score >= 8) label = 'Nhẹ';
    }
    if (label === 'Bình thường') return { label, className: 'border-emerald-200 bg-emerald-50 text-emerald-800', dot: 'bg-emerald-500', hex: '#10B981', icon: 'smile' };
    if (label === 'Nhẹ') return { label, className: 'border-sky-200 bg-sky-50 text-sky-800', dot: 'bg-sky-500', hex: THEME.primary, icon: 'meh' };
    if (label === 'Vừa') return { label, className: 'border-amber-200 bg-amber-50 text-amber-900', dot: 'bg-amber-500', hex: '#F59E0B', icon: 'frown' };
    return { label, className: 'border-rose-200 bg-rose-50 text-rose-900', dot: 'bg-rose-500', hex: '#F43F5E', icon: 'alert-triangle' };
}

function getAdvice(label) {
    switch (label) {
        case 'Bình thường': return 'Bạn đang duy trì trạng thái tâm lý khá ổn định. Hãy tiếp tục ngủ đủ giấc, vận động nhẹ và giữ kết nối với bạn bè.';
        case 'Nhẹ': return 'Có vài dấu hiệu căng thẳng nhẹ. Thử dành 10-15 phút mỗi ngày để nghỉ ngơi, hít thở sâu hoặc đi dạo.';
        case 'Vừa': return 'Mức độ đang ở ngưỡng vừa. Bạn nên sắp xếp lại lịch học hợp lý hơn, thử các kỹ thuật thư giãn và chia sẻ cảm xúc.';
        case 'Nặng': return 'Chỉ số đang ở mức nặng. Bạn nên tìm đến phòng tư vấn tâm lý học đường hoặc chuyên gia để được hỗ trợ sớm.';
        default: return 'Chỉ số đang ở mức rất cao. Khuyến khích bạn liên hệ ngay với chuyên gia tâm lý hoặc đường dây hỗ trợ sức khỏe tâm thần.';
    }
}

// ===== BỔ SUNG: Trạng thái tinh thần tổng quát + thước đo ngang (không thay đổi logic tính điểm gốc) =====
const SEVERITY_LEVELS = ['Bình thường', 'Nhẹ', 'Vừa', 'Nặng', 'Rất nặng'];
const severityRank = (label) => SEVERITY_LEVELS.indexOf(label);

// Lấy mức độ nặng nhất trong 3 chỉ số Stress/Lo âu/Trầm cảm => đại diện cho "Trạng thái tinh thần tổng quát"
function getOverallMentalState(scores) {
    const rows = [{ id: 'stress' }, { id: 'anxiety' }, { id: 'depression' }];
    const configs = rows.map(r => ({ id: r.id, config: getLevelConfig(r.id, scores[r.id]) }));
    return configs.reduce((worst, cur) => severityRank(cur.config.label) > severityRank(worst.config.label) ? cur : worst);
}

// % nguy cơ kiệt sức học đường MBI-SS (cùng công thức với biểu đồ donut, tách riêng để không đụng vào initDonutChart gốc)
function getMbiRiskPct(scores) {
    const exhaustion = scores.emotionalExhaustion;
    const cynicism = scores.cynicism;
    const lowEfficacy = 36 - scores.academicEfficacy;
    const maxTotal = 30 + 24 + 36;
    return Math.round(((exhaustion + cynicism + lowEfficacy) / maxTotal) * 100);
}

function getMbiLevelConfig(riskPct) {
    let label = 'Bình thường';
    if (riskPct >= 85) label = 'Rất nặng'; else if (riskPct >= 65) label = 'Nặng';
    else if (riskPct >= 45) label = 'Vừa'; else if (riskPct >= 25) label = 'Nhẹ';
    if (label === 'Bình thường') return { label, hex: '#10B981' };
    if (label === 'Nhẹ') return { label, hex: THEME.primary };
    if (label === 'Vừa') return { label, hex: '#F59E0B' };
    return { label, hex: '#F43F5E' };
}

// Gộp 5 mức thành đúng 3 dải màu trực quan theo yêu cầu: Xanh lá / Vàng / Đỏ
function getGaugeBandColor(label) {
    if (label === 'Bình thường') return '#10B981';
    if (label === 'Nặng' || label === 'Rất nặng') return '#F43F5E';
    return '#F59E0B'; // Nhẹ, Vừa
}

// Vị trí con trỏ trên thước đo (đảm bảo luôn rơi đúng vào dải màu tương ứng với nhãn)
const GAUGE_MARKER_POSITION = { 'Bình thường': 16, 'Nhẹ': 41, 'Vừa': 58, 'Nặng': 75, 'Rất nặng': 92 };

function getClosingLine(label) {
    switch (label) {
        case 'Bình thường': return 'Hãy tiếp tục duy trì nhé!';
        case 'Nhẹ': return 'Đừng quên dành thời gian nghỉ ngơi cho bản thân nhé!';
        case 'Vừa': return 'Hãy quan tâm đến bản thân nhiều hơn trong thời gian tới nhé!';
        default: return 'Đừng ngần ngại tìm kiếm sự hỗ trợ nhé, bạn không đơn độc đâu!';
    }
}

function renderGaugeBar(title, label) {
    const bandColor = getGaugeBandColor(label);
    const pos = GAUGE_MARKER_POSITION[label];
    return `<div class="rounded-2xl border border-slate-100 bg-white p-4">
        <div class="flex items-center justify-between mb-3 gap-2">
            <span class="text-xs font-black uppercase tracking-wider text-slate-500">${title}</span>
            <span class="text-sm font-black" style="color:${bandColor}">${label}</span>
        </div>
        <div class="relative h-3 w-full rounded-full overflow-hidden" style="background: linear-gradient(90deg, #10B981 0%, #10B981 33%, #F59E0B 33%, #F59E0B 66%, #F43F5E 66%, #F43F5E 100%);">
            <div class="absolute top-1/2 h-5 w-5 rounded-full bg-white shadow-md border-[3px]" style="left: ${pos}%; top: 50%; transform: translate(-50%, -50%); border-color: ${bandColor};"></div>
        </div>
        <div class="flex justify-between mt-1.5 text-[9px] font-bold uppercase tracking-wider text-slate-400">
            <span>Bình thường</span><span>Nhẹ · Vừa</span><span>Nặng · Rất nặng</span>
        </div>
    </div>`;
}

function getFirstName(fullName) {
    if (!fullName) return '';
    const parts = fullName.trim().split(' ');
    return parts[parts.length - 1];
}

function renderAuth() {
    const isLogin = authMode === 'login';
    const isRegister = authMode === 'register';
    const cloudBadge = supabaseReady
        ? '<span class="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-[10px] font-bold text-emerald-700 uppercase tracking-widest"><i data-lucide="cloud" class="w-3 h-3"></i> Supabase Cloud</span>'
        : '';
    return `
            <div class="flex-1 flex items-center justify-center px-4 py-12 animate-fade-in bg-brand-surface">
                <div class="w-full max-w-md bg-white rounded-[2rem] p-8 shadow-xl shadow-teal-100/50 border border-teal-50">
                    <div class="flex justify-center mb-6">
                        <div class="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-mint to-brand-blue shadow-lg" style="width:72px;height:72px;">
                            <img src="476607564_1118966020245066_3011246608916633901_n.jpg" alt="logo" style="width:60px;height:60px;object-fit:cover;border-radius:8px;">
                        </div>
                    </div>
                    <h2 class="text-3xl font-black text-brand-dark text-center mb-2 tracking-tight">THPT GIA LỘC</h2>
                    <p class="text-slate-500 text-center text-sm font-semibold mb-2">Khảo sát tâm lý học đường</p>
                    <div class="flex items-center justify-center gap-2 mb-6">${cloudBadge}</div>
                    <div class="flex border-b border-slate-100 mb-6 pb-2 gap-6 justify-center">
                        <span onclick="authMode='login'; authError=''; authSuccess=''; renderApp();" class="auth-tab text-sm font-bold uppercase tracking-wider cursor-pointer ${isLogin ? 'active text-brand-blue' : 'text-slate-400 hover:text-slate-600'}">Đăng nhập</span>
                        <span onclick="authMode='register'; authError=''; authSuccess=''; renderApp();" class="auth-tab text-sm font-bold uppercase tracking-wider cursor-pointer ${isRegister ? 'active text-brand-blue' : 'text-slate-400 hover:text-slate-600'}">Đăng ký</span>
                    </div>
                    ${authError ? '<div class="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm font-semibold flex items-center gap-2"><i data-lucide="alert-circle" class="w-4 h-4 shrink-0"></i><span>' + authError + '</span></div>' : ''}
                    ${authSuccess ? '<div class="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-semibold flex items-center gap-2"><i data-lucide="check-circle" class="w-4 h-4 shrink-0"></i><span>' + authSuccess + '</span></div>' : ''}
                    
                    <form onsubmit="handleAuthSubmit(event)" class="space-y-4">
                        ${!isLogin ? '<div><label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 ml-1">Tên hiển thị</label><input type="text" name="name" required placeholder="Ví dụ: Hiệp Bùi đz" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition"></div>' : ''}
                        <div>
                            <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 ml-1">Email</label>
                            <input type="email" name="email" required placeholder="your@email.com" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition">
                        </div>
                        <div>
                            <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 ml-1">Mật khẩu</label>
                            <input type="password" name="password" required minlength="6" placeholder="Tối thiểu 6 ký tự" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition">
                        </div>
                        <button type="submit" ${authLoading ? 'disabled' : ''} class="w-full bg-gradient-to-r from-brand-blue to-brand-mint text-white font-black rounded-xl px-4 py-3.5 mt-2 shadow-lg disabled:opacity-60">
                            ${authLoading ? 'Đang xử lý...' : (isLogin ? 'Đăng nhập' : 'Tạo tài khoản')}
                        </button>
                    </form>

                    <div class="mt-6 relative flex items-center justify-center">
                        <div class="border-t border-slate-200 w-full absolute"></div>
                        <span class="bg-white px-3 text-xs font-bold text-slate-400 relative z-10 uppercase tracking-widest">Hoặc</span>
                    </div>
                    <button onclick="handleIncognitoLogin()" class="w-full mt-6 bg-slate-50 border border-slate-200 text-slate-600 font-bold rounded-xl px-4 py-3 hover:bg-slate-100 transition-colors flex items-center justify-center gap-2 group">
                        <i data-lucide="eye-off" class="w-5 h-5 text-slate-400 group-hover:text-brand-blue transition-colors"></i>
                        <span>Tiếp tục ẩn danh</span>
                    </button>
                </div>
            </div>`;
}

function renderHeader() {
    const answeredCount = Object.keys(answers).length;
    const progress = (answeredCount / QUESTIONS.length) * 100;
    let userHtml = '';
    if (currentUser) {
        const displayName = getFirstName(currentUser.name);
        const avatarUrl = currentUser.isIncognito
            ? 'https://api.dicebear.com/10.x/big-ears/svg?seed=empn5xvz' + currentUser.name + '&backgroundColor=6BA4CC'
            : 'https://api.dicebear.com/10.x/avataaars/svg?seed=8j8c4vl3' + currentUser.name + '&backgroundColor=6BA4CC';
        const isIncognito = currentUser.isIncognito;
        userHtml = `
                <div class="flex items-center gap-2 md:gap-3 bg-white rounded-full pr-3 pl-1.5 py-1.5 border border-sky-100 shadow-sm">
                    <img src="${avatarUrl}" alt="Avatar" class="w-8 h-8 rounded-full border border-sky-100 bg-slate-50">
                    <div class="text-left mr-1 min-w-0">
                        <p class="text-[9px] font-bold text-slate-400 leading-none uppercase tracking-wider mb-0.5">${isIncognito ? 'Trạng thái' : 'Xin chào,'}</p>
                        <p class="text-sm font-black text-brand-dark leading-none max-w-[140px] truncate">${isIncognito ? currentUser.name : displayName + '!'}</p>
                    </div>
                    ${!isIncognito ? `
                    <div class="flex items-center gap-1 border-l border-slate-200 pl-2 ml-1">
                        <button onclick="handleChangePassword()" class="flex items-center justify-center h-7 w-7 rounded-full bg-slate-100 hover:bg-brand-blue hover:text-white transition-colors text-slate-500" title="Đổi mật khẩu">
                            <i data-lucide="key-round" class="h-3.5 w-3.5"></i>
                        </button>
                        <button onclick="handleLogout()" class="flex items-center justify-center h-7 w-7 rounded-full bg-slate-100 hover:bg-rose-500 hover:text-white transition-colors text-slate-500" title="Đăng xuất">
                            <i data-lucide="log-out" class="h-3.5 w-3.5"></i>
                        </button>
                    </div>` : ''}
                </div>`;
    }
    return `
                <header class="sticky top-0 z-40 bg-white border-b border-sky-100 shadow-sm">
                    <div class="mx-auto w-full max-w-6xl px-4 md:px-6 py-3 flex items-center justify-between gap-4">
                        <div class="flex items-center gap-4">
                            <div class="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-mint to-brand-blue shadow-md" style="width:72px;height:72px;">
                                <img src="476607564_1118966020245066_3011246608916633901_n.jpg" alt="logo" style="width:60px;height:60px;object-fit:cover;border-radius:6px;">
                            </div>
                            <div>
                                <h1 class="text-lg md:text-2xl font-black tracking-tight text-brand-dark">THPT GIA LỘC</h1>
                                <p class="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">Khảo sát tâm lý học đường</p>
                            </div>
                        </div>
                        <div>${userHtml}</div>
                    </div>
                    ${step === 'quiz' ? '<div class="w-full bg-brand-surface border-t border-teal-100 px-4 py-2"><div class="mx-auto w-full max-w-5xl flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6"><span class="text-xs font-bold uppercase tracking-[0.18em] text-brand-mint text-center whitespace-nowrap">Tiến độ (Câu ' + (currentIndex + 1) + '/' + QUESTIONS.length + ')</span><div class="w-full max-w-[32rem] sm:max-w-[40rem] md:max-w-[48rem] h-3 overflow-hidden rounded-full bg-slate-100"><div class="h-full rounded-full bg-gradient-to-r from-brand-mint to-brand-blue transition-all duration-300" style="width: ' + (((currentIndex + 1) / QUESTIONS.length) * 100) + '%"></div></div></div></div>' : ''}
                </header>`;
}

function renderStart() {
    return `
            <div class="w-full flex-1 flex items-center justify-center min-h-[calc(100vh-80px)] animate-fade-in bg-brand-surface">
                <section class="mx-auto flex flex-col items-center text-center w-full max-w-4xl px-6 py-12">
                    <div class="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-200 bg-white px-5 py-2 text-sm font-bold text-teal-700 shadow-sm">
                        <i data-lucide="shield-check" class="h-4 w-4 text-emerald-500"></i><span>Bảo mật & Chuẩn y tế DASS-21, MBI-SS</span>
                    </div>
                    <h2 class="text-4xl md:text-6xl font-black leading-tight tracking-tight text-brand-dark mb-6">
                        Khảo Sát <span class="text-brand-blue">Tâm Lý Học Đường</span>
                    </h2>
                    <div class="w-full max-w-2xl text-left">
                        <p class="mt-2 text-lg leading-8 text-slate-600 font-medium">
                            Hệ thống đánh giá chuyên sâu giúp bạn hiểu rõ mức độ Căng thẳng, Lo âu, Trầm cảm và Kiệt quệ.
                            Một khảo sát tâm lý học đường mạch lạc, ẩn danh, sử dụng nền tảng thang đo chuẩn hoá quốc tế DASS-21 và MBI-SS, kết hợp cùng các chỉ số kiểm định dữ liệu độc lập để đảm bảo tính khách quan.
                        </p>
                        ${currentUser?.isIncognito ? `
                        <p class="mt-4 text-sm leading-6 text-slate-500">
                            Dữ liệu được mã hóa ẩn danh.
                        </p>` : ''}
                    </div>
                    <div class="mt-6 grid gap-4 sm:grid-cols-2 w-full max-w-2xl">
                        <div class="rounded-3xl border border-brand-blue/20 bg-brand-blue/10 p-5 text-center shadow-sm">
                            <p class="text-sm font-semibold uppercase tracking-[0.22em] text-brand-dark">DASS-21</p>
                            <p class="mt-3 text-3xl font-black text-brand-blue">25 câu</p>
                            <p class="mt-1 text-[11px] font-semibold text-brand-dark/60">Đã gồm 4 câu kiểm định nhất quán</p>
                        </div>
                        <div class="rounded-3xl border border-brand-mint/20 bg-brand-mint/10 p-5 text-center shadow-sm">
                            <p class="text-sm font-semibold uppercase tracking-[0.22em] text-brand-dark">MBI-SS</p>
                            <p class="mt-3 text-3xl font-black text-brand-blue">18 câu</p>
                            <p class="mt-1 text-[11px] font-semibold text-brand-dark/60">Đã gồm 3 câu kiểm định nhất quán</p>
                        </div>
                    </div>
                    <p class="mt-6 text-lg leading-8 text-slate-600 max-w-2xl font-medium">
                        Thời gian hoàn thành dự kiến: 4 - 5 phút
                    </p>
                    <div class="mt-10">
                        <button type="button" onclick="handleStart()" class="inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-brand-blue to-brand-mint px-10 py-5 text-xl font-black text-white shadow-xl shadow-teal-200/80">
                            <span>Bắt đầu kiểm tra</span><i data-lucide="arrow-right" class="h-6 w-6"></i>
                        </button>
                    </div>
                </section>
            </div>`;
}

function renderQuiz() {
    const q = QUESTIONS[currentIndex];
    const answeredCount = Object.keys(answers).length;
    const allAnswered = answeredCount === QUESTIONS.length;
    const isLast = currentIndex === QUESTIONS.length - 1;
    const navButtons = QUESTIONS.map((item, idx) => {
        let cls = 'nav-btn-default';
        if (currentIndex === idx) cls = 'nav-btn-active';
        else if (answers[item.id] !== undefined) cls = 'nav-btn-answered';
        return '<button type="button" onclick="handleJump(' + idx + ')" class="nav-btn w-full text-xs transition ' + cls + '"><span>' + (idx + 1) + '</span></button>';
    }).join('');
    const optionsHTML = q.scale.map(opt => {
        const isSelected = answers[q.id] === opt.value;
        const bgC = isSelected ? 'border-brand-blue bg-sky-50 shadow-md shadow-sky-100' : 'border-slate-200 bg-white hover:border-sky-300 hover:bg-slate-50';
        const bgN = isSelected ? 'bg-brand-blue text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-sky-100 group-hover:text-sky-700';
        return '<div onclick="handleAnswer(\'' + q.id + '\', ' + opt.value + ')" class="group flex cursor-pointer flex-col gap-3 rounded-2xl border p-4 transition-all duration-200 ' + bgC + '"><span class="flex h-10 w-10 items-center justify-center rounded-xl text-sm font-black transition ' + bgN + '">' + opt.value + '</span><span class="text-sm font-bold leading-5 text-slate-700">' + opt.label + '</span></div>';
    }).join('');
    return `
                <section class="mx-auto flex w-full max-w-4xl flex-col gap-5 px-4 md:px-8 py-6 md:py-8 animate-fade-in">
                    <nav class="rounded-[1.75rem] border border-sky-100 bg-white p-4 shadow-sm">
                        <div class="nav-box">
                            <div class="nav-grid">${navButtons}</div>
                        </div>
                    </nav>
                    <article class="overflow-hidden rounded-[2rem] border border-sky-100 bg-white shadow-xl shadow-sky-100/60">
                        <div class="p-5 md:p-10">
                            <div class="mb-6 flex flex-wrap items-center gap-2">
                                <span class="rounded-full bg-brand-dark text-white px-3 py-1.5 text-xs font-black uppercase tracking-[0.16em]">${q.sectionTitle}</span>
                                <span class="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-slate-600">Câu ${currentIndex + 1}</span>
                            </div>
                            <h2 class="max-w-4xl text-xl md:text-4xl font-black leading-tight tracking-[-0.03em] text-brand-dark">${q.text}</h2>
                            <div class="mt-8 grid gap-3 ${q.section === 'MBI-SS' ? 'grid-cols-2 md:grid-cols-7' : 'grid-cols-1 md:grid-cols-4'}">${optionsHTML}</div>
                        </div>
                        <footer class="flex items-center justify-between gap-3 border-t border-slate-100 bg-brand-surface p-4 md:p-6">
                            <button type="button" onclick="handlePrev()" ${currentIndex === 0 ? 'disabled' : ''} class="inline-flex items-center gap-2 rounded-2xl px-4 py-3 font-black text-slate-600 transition hover:bg-white disabled:opacity-35">
                                <i data-lucide="chevron-left" class="h-5 w-5"></i><span class="hidden md:inline">Câu trước</span>
                            </button>
                            ${isLast ? '<button type="button" onclick="handleSubmit()" ' + (!allAnswered ? 'disabled' : '') + ' class="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-brand-blue to-brand-mint px-6 py-3 font-black text-white shadow-lg disabled:opacity-45"><span>Nộp bài</span><i data-lucide="check-circle" class="h-5 w-5"></i></button>' : '<button type="button" onclick="handleNext()" class="inline-flex items-center gap-2 rounded-2xl bg-brand-dark px-6 py-3 font-black text-white shadow-lg"><span>Tiếp theo</span><i data-lucide="chevron-right" class="h-5 w-5"></i></button>'}
                        </footer>
                    </article>
                </section>`;
}

function renderResult() {
    const MBI_ROWS = [
        { id: 'emotionalExhaustion', title: 'Kiệt quệ cảm xúc', max: 30 },
        { id: 'cynicism', title: 'Hoài nghi', max: 24 },
        { id: 'academicEfficacy', title: 'Ảnh hưởng học tập', max: 36 }
    ];
    const DASS_ROWS = [
        { id: 'stress', title: 'Stress', max: 42 },
        { id: 'anxiety', title: 'Lo âu', max: 42 },
        { id: 'depression', title: 'Trầm cảm', max: 42 }
    ];
    const mbiHTML = MBI_ROWS.map(row => {
        const val = currentScores[row.id];
        const pct = Math.round((val / row.max) * 100);
        return '<article class="rounded-2xl border border-sky-100 bg-white p-4 shadow-sm"><div class="flex items-end justify-between gap-4"><h3 class="text-sm font-black text-brand-dark">' + row.title + '</h3><strong class="font-mono text-xl text-brand-dark">' + val + '<span class="text-xs text-slate-400">/' + row.max + '</span></strong></div><div class="mt-3 h-2 overflow-hidden rounded-full bg-slate-100"><div class="h-full rounded-full bg-gradient-to-r from-brand-blue to-brand-mint" style="width: ' + pct + '%"></div></div></article>';
    }).join('');
    const dassHTML = DASS_ROWS.map(row => {
        const rawVal = currentScores[row.id];
        const config = getLevelConfig(row.id, rawVal);
        return '<article class="rounded-2xl border p-5 shadow-sm ' + config.className + '"><div class="flex items-center justify-between gap-3"><div class="flex items-center gap-2"><i data-lucide="' + config.icon + '" class="w-5 h-5"></i><h3 class="font-black">' + row.title + '</h3></div><span class="h-3 w-3 rounded-full ' + config.dot + '"></span></div><p class="mt-3 font-mono text-3xl font-black">' + (rawVal * 2) + '<span class="text-sm opacity-60">/' + row.max + '</span></p><p class="mt-1 text-sm font-black">' + config.label + '</p><div class="mt-3 p-3 rounded-xl bg-white/60 border border-current/10"><p class="text-xs leading-5"><i data-lucide="lightbulb" class="w-3 h-3 inline mr-1"></i>' + getAdvice(config.label) + '</p></div></article>';
    }).join('');
    const cloudMsg = supabaseReady
        ? '<span class="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200 px-4 py-2 text-xs font-bold text-emerald-700"><i data-lucide="cloud" class="w-4 h-4"></i> Kết quả đã lưu lên Supabase Cloud</span>'
        : '<span class="inline-flex items-center gap-2 rounded-full bg-amber-50 border border-amber-200 px-4 py-2 text-xs font-bold text-amber-700"><i data-lucide="hard-drive" class="w-4 h-4"></i> Kết quả lưu trên máy chủ</span>';
    const div = communityStats.count > 0 ? communityStats.count : 1;

    // ==== BỔ SUNG: Trạng thái tổng quát (không thay đổi cách tính currentScores gốc) ====
    const overallState = getOverallMentalState(currentScores); // mức nặng nhất trong Stress/Lo âu/Trầm cảm
    const mbiRiskPct = getMbiRiskPct(currentScores);
    const mbiLevel = getMbiLevelConfig(mbiRiskPct); // phân loại Năng lượng học tập từ MBI-SS
    const adviceLabel = severityRank(mbiLevel.label) > severityRank(overallState.config.label) ? mbiLevel.label : overallState.config.label;
    const adviceColor = getGaugeBandColor(adviceLabel);
    const overviewHTML = `
                    <div class="rounded-[2rem] border border-sky-100 bg-white p-6 md:p-8 shadow-xl shadow-sky-100/50">
                        <div class="text-center mb-7">
                            <div class="inline-flex h-14 w-14 items-center justify-center rounded-2xl mb-4" style="background:${overallState.config.hex}1A; color:${overallState.config.hex}">
                                <i data-lucide="${overallState.config.icon}" class="h-7 w-7"></i>
                            </div>
                            <p class="text-base md:text-xl font-bold text-slate-500">Cảm ơn bạn! Trạng thái tinh thần tổng quát của bạn đang ở mức</p>
                            <p class="text-4xl md:text-5xl font-black mt-1 tracking-tight" style="color:${overallState.config.hex}">${overallState.config.label}</p>
                            <p class="mt-3 text-base md:text-lg font-semibold text-slate-500">${getClosingLine(overallState.config.label)}</p>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            ${renderGaugeBar('Trạng thái Tinh thần Tổng quát', overallState.config.label)}
                            ${renderGaugeBar('Năng lượng Học tập', mbiLevel.label)}
                        </div>
                        <div class="rounded-2xl border p-5 flex gap-3 items-start" style="border-color:${adviceColor}40; background:${adviceColor}0D;">
                            <i data-lucide="lightbulb" class="h-5 w-5 shrink-0 mt-0.5" style="color:${adviceColor}"></i>
                            <div>
                                <p class="text-sm font-black mb-1" style="color:${adviceColor}">Lời khuyên dành cho bạn</p>
                                <p class="text-sm leading-6 text-slate-600">${getAdvice(adviceLabel)}</p>
                            </div>
                        </div>
                    </div>`;

    return `
                <section class="mx-auto flex flex-col w-full max-w-4xl gap-6 px-4 py-8 animate-fade-in">
                    <div class="flex items-center justify-center">${cloudMsg}</div>
                    ${overviewHTML}
                    <!-- MBI-SS -->
                    <div class="rounded-[2rem] border border-sky-100 bg-white p-6 shadow-xl shadow-sky-100/50">
                        <div class="mb-6 flex items-center justify-between">
                            <div><p class="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Đánh giá kiệt quệ học đường</p><h2 class="text-2xl font-black tracking-tight text-brand-dark">Chỉ số Burnout (MBI-SS)</h2></div>
                            <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-600"><i data-lucide="battery-warning" class="h-6 w-6"></i></div>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-6">
                            <div class="rounded-3xl border border-slate-100 bg-slate-50 p-4 flex flex-col items-center justify-center">
                                <p class="text-xs font-black uppercase tracking-[0.18em] text-slate-500 mb-2">Mức độ nguy cơ</p>
                                <div class="chart-wrap h-40 w-40"><canvas id="donutChart"></canvas><div class="donut-center"><strong id="donutCenterValue" class="font-mono text-3xl font-black text-brand-dark">0%</strong></div></div>
                            </div>
                            <div class="space-y-3 flex flex-col justify-center">${mbiHTML}</div>
                        </div>
                    </div>
                    <!-- DASS-21 -->
                    <div class="rounded-[2rem] border border-sky-100 bg-white p-6 shadow-xl shadow-sky-100/50">
                        <div class="mb-6 flex items-center justify-between">
                            <div><p class="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Đánh giá tâm lý lâm sàng</p><h2 class="text-2xl font-black tracking-tight text-brand-dark">Chỉ số DASS-21</h2></div>
                            <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-sky-600"><i data-lucide="brain" class="h-6 w-6"></i></div>
                        </div>
                        <div class="chart-wrap h-64 mb-6"><canvas id="dassBarChart"></canvas></div>
                        <div class="grid grid-cols-1 gap-4">${dassHTML}</div>
                    </div>
                    <!-- Thống kê cộng đồng -->
                    <div class="rounded-[2rem] border border-sky-100 bg-white p-6 shadow-xl shadow-sky-100/50">
                        <div class="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div><p class="text-xs font-black uppercase tracking-[0.18em] text-slate-400">So sánh tương quan</p><h2 class="text-2xl font-black tracking-tight text-brand-dark">Thống kê cộng đồng</h2></div>
                            <div class="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-xs font-bold text-slate-600"><i data-lucide="users" class="h-4 w-4"></i><span>${communityStats.count} lượt</span></div>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div class="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                <h3 class="text-xs font-black uppercase tracking-widest text-brand-dark mb-4">MBI-SS (Trung bình)</h3>
                                <div class="chart-wrap h-48"><canvas id="communityMbiChart"></canvas></div>
                            </div>
                            <div class="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                <h3 class="text-xs font-black uppercase tracking-widest text-brand-dark mb-4">DASS-21 (Trung bình)</h3>
                                <div class="chart-wrap h-48"><canvas id="communityDassChart"></canvas></div>
                            </div>
                        </div>
                        <div class="mt-8 flex justify-center">
                            <button type="button" onclick="handleReset()" class="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-blue to-brand-mint px-8 py-4 font-black text-white shadow-lg">
                                <i data-lucide="rotate-ccw" class="h-5 w-5"></i><span>Làm lại khảo sát</span>
                            </button>
                        </div>
                    </div>
                </section>`;
}

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

function handleStart() { step = 'quiz'; renderApp(); window.scrollTo({ top: 0, behavior: 'smooth' }); }
function handlePrev() { if (currentIndex > 0) { currentIndex--; renderApp(); } }
function handleNext() { if (currentIndex < QUESTIONS.length - 1) { currentIndex++; renderApp(); } }
function handleJump(idx) { currentIndex = idx; renderApp(); }
function handleAnswer(qId, val) { answers[qId] = val; renderApp(); }
async function handleSubmit() {
    if (Object.keys(answers).length !== QUESTIONS.length) return;
    currentScores = {
        emotionalExhaustion: getSum(answers, MBI_EMOTIONAL_EXHAUSTION),
        cynicism: getSum(answers, MBI_CYNICISM),
        academicEfficacy: getSum(answers, MBI_ACADEMIC_EFFICACY),
        stress: getSum(answers, DASS_STRESS),
        anxiety: getSum(answers, DASS_ANXIETY),
        depression: getSum(answers, DASS_DEPRESSION)
    };
    await saveResult(currentScores);
    await loadCommunityStats();
    step = 'result';
    renderApp();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
function handleReset() {
    answers = {}; currentIndex = 0; step = 'start';
    renderApp(); window.scrollTo({ top: 0, behavior: 'smooth' });
}

function initDonutChart() {
    const canvas = document.getElementById('donutChart');
    if (!canvas) return;
    const exhaustion = currentScores.emotionalExhaustion;
    const cynicism = currentScores.cynicism;
    const lowEfficacy = 36 - currentScores.academicEfficacy;
    const total = exhaustion + cynicism + lowEfficacy;
    const maxTotal = 30 + 24 + 36;
    const riskPct = Math.round((total / maxTotal) * 100);
    const el = document.getElementById('donutCenterValue');
    if (el) el.textContent = riskPct + '%';
    if (donutChartInstance) donutChartInstance.destroy();
    donutChartInstance = new Chart(canvas.getContext('2d'), {
        type: 'doughnut',
        data: { labels: ['Kiệt quệ', 'Hoài nghi', 'Ảnh hưởng'], datasets: [{ data: [exhaustion, cynicism, lowEfficacy], backgroundColor: [THEME.primary, '#F59E0B', '#F43F5E'], borderColor: '#fff', borderWidth: 3, cutout: '72%' }] },
        options: { responsive: true, maintainAspectRatio: false, animation: { duration: 1200 }, plugins: { legend: { position: 'bottom', labels: { font: { size: 10, family: 'Plus Jakarta Sans' }, boxWidth: 10 } } } }
    });
}

function initDassBarChart() {
    const canvas = document.getElementById('dassBarChart');
    if (!canvas) return;
    const rows = [{ key: 'stress', label: 'Stress' }, { key: 'anxiety', label: 'Lo âu' }, { key: 'depression', label: 'Trầm cảm' }];
    const values = rows.map(r => currentScores[r.key] * 2);
    const colors = rows.map(r => getLevelConfig(r.key, currentScores[r.key]).hex);
    if (dassBarChartInstance) dassBarChartInstance.destroy();
    dassBarChartInstance = new Chart(canvas.getContext('2d'), {
        type: 'bar',
        data: { labels: rows.map(r => r.label), datasets: [{ data: values, backgroundColor: colors, borderRadius: 8, barThickness: 40 }] },
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
        data: { labels: ['Kiệt quệ', 'Hoài nghi', 'Ảnh hưởng HT'], datasets: [{ data: [(communityStats.emotionalExhaustion / div).toFixed(1), (communityStats.cynicism / div).toFixed(1), (communityStats.academicEfficacy / div).toFixed(1)], backgroundColor: [THEME.primary, '#F59E0B', '#10B981'], borderRadius: 6, barThickness: 24 }] },
        options: { responsive: true, maintainAspectRatio: false, scales: { y: { min: 0, max: 40, grid: { borderDash: [4, 4] } }, x: { grid: { display: false }, ticks: { font: { size: 10, weight: 'bold', family: 'Plus Jakarta Sans' } } } }, plugins: { legend: { display: false } } }
    });
    if (communityDassChartInstance) communityDassChartInstance.destroy();
    communityDassChartInstance = new Chart(canvasDass.getContext('2d'), {
        type: 'bar',
        data: { labels: ['Stress', 'Lo âu', 'Trầm cảm'], datasets: [{ data: [(communityStats.stress / div).toFixed(1), (communityStats.anxiety / div).toFixed(1), (communityStats.depression / div).toFixed(1)], backgroundColor: ['#F43F5E', '#8B5CF6', THEME.primary], borderRadius: 6, barThickness: 24 }] },
        options: { responsive: true, maintainAspectRatio: false, scales: { y: { min: 0, max: 42, grid: { borderDash: [4, 4] } }, x: { grid: { display: false }, ticks: { font: { size: 11, weight: 'bold', family: 'Plus Jakarta Sans' } } } }, plugins: { legend: { display: false } } }
    });
}

renderApp();
