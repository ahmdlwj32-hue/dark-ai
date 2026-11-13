// =====================================
// DARK AI - Supabase Configuration
// =====================================

const SUPABASE_URL = "https://beumygquyxotdvthitcq.supabase.co/rest/v1/";
const SUPABASE_KEY = "sb_publishable_kDtG8O1WMK_6CYaddWOeOQ_cmQ6Gs3D";

const client = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

// =====================================
// Login Interface
// =====================================

const originalElements = [...document.body.children];

originalElements.forEach(element => {
  element.style.display = "none";
});

const loginStyle = document.createElement("style");

loginStyle.textContent = `
  #darkLogin {
    position: fixed;
    inset: 0;
    background: #101a2b;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    z-index: 99999;
    font-family: Arial, sans-serif;
  }

  .login-card {
    background: white;
    width: 100%;
    max-width: 380px;
    padding: 30px 22px;
    border-radius: 20px;
    text-align: center;
    box-sizing: border-box;
  }

  .login-logo {
    color: #d6b370;
    font-size: 35px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .login-card h2 {
    color: #101a2b;
    margin-bottom: 8px;
  }

  .login-card p {
    color: #777;
    font-size: 13px;
  }

  .login-card input {
    width: 100%;
    padding: 13px;
    margin: 9px 0;
    border: 1px solid #ddd;
    border-radius: 9px;
    box-sizing: border-box;
    font-size: 15px;
    direction: ltr;
  }

  .login-card button {
    width: 100%;
    padding: 13px;
    background: #101a2b;
    color: white;
    border: 0;
    border-radius: 9px;
    margin-top: 12px;
    font-size: 15px;
    cursor: pointer;
  }

  #loginMessage {
    color: #b33;
    font-size: 13px;
    margin-top: 12px;
  }
`;

document.head.appendChild(loginStyle);

const loginBox = document.createElement("div");

loginBox.id = "darkLogin";

loginBox.innerHTML = `
  <div class="login-card">

    <div class="login-logo">DARK AI</div>

    <h2>مرحباً بعودتك</h2>

    <p>سجل الدخول للوصول إلى لوحة إدارة دارك</p>

    <form id="loginForm">

      <input
        type="email"
        id="loginEmail"
        placeholder="البريد الإلكتروني"
        required
        autocomplete="username"
      >

      <input
        type="password"
        id="loginPassword"
        placeholder="كلمة المرور"
        required
        autocomplete="current-password"
      >

      <button type="submit" id="loginButton">
        تسجيل الدخول
      </button>

    </form>

    <div id="loginMessage"></div>

  </div>
`;

document.body.appendChild(loginBox);

// =====================================
// Login Process
// =====================================

const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");
const loginButton = document.getElementById("loginButton");

loginForm.addEventListener("submit", async function(event) {

  event.preventDefault();

  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;

  loginButton.disabled = true;
  loginButton.textContent = "جارٍ التحقق...";

  loginMessage.textContent = "";

  const { data, error } = await client.auth.signInWithPassword({
    email: email,
    password: password
  });

  loginButton.disabled = false;
  loginButton.textContent = "تسجيل الدخول";

  if (error) {
    loginMessage.textContent = "تعذر تسجيل الدخول. تحقق من البيانات وحاول مجدداً.";
    return;
  }

  showDashboard();

});

// =====================================
// Show Dashboard
// =====================================

function showDashboard() {

  loginBox.style.display = "none";

  originalElements.forEach(element => {
    element.style.display = "";
  });

}

// =====================================
// Logout Button
// =====================================

async function logoutDARKAI() {

  const confirmed = confirm("هل تريد تسجيل الخروج؟");

  if (!confirmed) return;

  await client.auth.signOut();

  loginBox.style.display = "flex";

  originalElements.forEach(element => {
    element.style.display = "none";
  });

}

// =====================================
// Dashboard Functions
// =====================================

const panel = document.getElementById("panel");
const title = document.getElementById("panelTitle");
const body = document.getElementById("panelBody");

function show(t, html) {
  title.textContent = t;
  body.innerHTML = html;
  panel.showModal();
}

document.getElementById("closePanel").onclick = () => panel.close();

document.querySelectorAll(".agent").forEach(btn => {

  btn.onclick = () => {

    const n = btn.dataset.agent;

    show(n, `
      <p>أنا ${n} في فريق DARK AI.</p>

      <p>
        في النسخة القادمة سأتمكن من تنفيذ المهام التسويقية
        المتخصصة بعد ربط المنصة بخدمة الذكاء الاصطناعي.
      </p>

      <textarea placeholder="اكتب طلبك هنا..." rows="3"></textarea>

      <button class="save"
      onclick="alert('سيتم تفعيل المحادثة الذكية في المرحلة التالية')">
      إرسال الطلب
      </button>
    `);

  };

});

document.getElementById("productsBtn").onclick = () => {
  show("إدارة المنتجات", `
    <p>ستتمكن هنا من إضافة اسم المنتج وصورته وسعره ومميزاته ومخزونه.</p>
    <p><b>حالة القسم:</b> قيد التطوير.</p>
  `);
};

document.getElementById("contentBtn").onclick = () => {
  show("صناعة المحتوى", `
    <p>إنشاء منشورات وإعلانات وأوصاف منتجات وسيناريوهات فيديو.</p>
    <p><b>حالة القسم:</b> قيد التطوير.</p>
  `);
};

document.getElementById("calendarBtn").onclick = () => {
  show("خطة النشر", `
    <p>تقويم لتنظيم المنشورات والقصص ومقاطع Reels.</p>
    <p><b>حالة القسم:</b> قيد التطوير.</p>
  `);
};

document.getElementById("settingsBtn").onclick = () => {

  show("إعدادات دارك", `
    <p><b>النشاط:</b> متجر إلكتروني للمواد المنزلية</p>
    <p><b>النطاق:</b> حضرموت – التوصيل إلى جميع المحافظات</p>
    <p><b>العملة:</b> الريال اليمني</p>

    <button onclick="logoutDARKAI()">
      تسجيل الخروج
    </button>
  `);

};

// =====================================
// Check Existing Session
// =====================================

async function checkSession() {

  const { data, error } = await client.auth.getSession();

  if (error) {
    loginMessage.textContent = "تعذر الاتصال بخدمة تسجيل الدخول.";
    return;
  }

  if (data.session) {
    showDashboard();
  }

}

checkSession();

// =====================================
// Service Worker
// =====================================

if ("serviceWorker" in navigator) {

  window.addEventListener("load", () => {

    navigator.serviceWorker
      .register("./sw.js")
      .catch(() => {});

  });

}
