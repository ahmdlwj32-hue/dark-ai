// =====================================
// DARK AI - Supabase Configuration
// =====================================

const SUPABASE_URL = "https://beumygquyxotdvthitcq.supabase.co";
const SUPABASE_KEY = "sb_publishable_kDtG8O1WMK_6CYaddWOeOQ_cmQ6Gs3D";

const client = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

// =====================================
// إعداد الواجهة
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
}

.login-card button:disabled {
  opacity: 0.6;
}

.login-link {
  display: block;
  margin-top: 15px;
  color: #92733d;
  cursor: pointer;
  font-size: 13px;
}

#loginMessage {
  color: #b33;
  font-size: 13px;
  margin-top: 12px;
  line-height: 1.7;
  overflow-wrap: anywhere;
}
`;

document.head.appendChild(loginStyle);

// =====================================
// إنشاء شاشة الدخول
// =====================================

const loginBox = document.createElement("div");
loginBox.id = "darkLogin";

loginBox.innerHTML = `
  <div class="login-card">
    <div class="login-logo">DARK AI</div>

    <h2 id="formTitle">مرحباً بعودتك</h2>

    <p id="formDescription">
      سجل الدخول للوصول إلى لوحة دارك
    </p>

    <form id="loginForm">

      <input
        type="email"
        id="loginEmail"
        placeholder="البريد الإلكتروني"
        required
      >

      <input
        type="password"
        id="loginPassword"
        placeholder="كلمة المرور"
        required
      >

      <button type="submit" id="loginButton">
        تسجيل الدخول
      </button>

    </form>

    <form id="recoveryForm" style="display:none">

      <input
        type="password"
        id="newPassword"
        placeholder="كلمة المرور الجديدة"
        minlength="8"
        required
      >

      <input
        type="password"
        id="confirmPassword"
        placeholder="تأكيد كلمة المرور"
        minlength="8"
        required
      >

      <button type="submit" id="recoveryButton">
        حفظ كلمة المرور الجديدة
      </button>

    </form>

    <span class="login-link" id="forgotPassword">
      نسيت كلمة المرور؟
    </span>

    <div id="loginMessage"></div>
  </div>
`;

document.body.appendChild(loginBox);

// =====================================
// عناصر الواجهة
// =====================================

const loginForm = document.getElementById("loginForm");
const recoveryForm = document.getElementById("recoveryForm");
const loginMessage = document.getElementById("loginMessage");
const loginButton = document.getElementById("loginButton");

// =====================================
// عرض شاشة الدخول
// =====================================

function showLogin() {

  loginBox.style.display = "flex";

  originalElements.forEach(element => {
    element.style.display = "none";
  });

  loginForm.style.display = "block";
  recoveryForm.style.display = "none";

  document.getElementById("formTitle").textContent =
    "مرحباً بعودتك";

  document.getElementById("formDescription").textContent =
    "سجل الدخول للوصول إلى لوحة دارك";

  document.getElementById("forgotPassword").style.display =
    "block";

  loginMessage.style.color = "#b33";
  loginMessage.textContent = "";
}

// =====================================
// عرض شاشة استعادة كلمة المرور
// =====================================

function showRecovery() {

  loginBox.style.display = "flex";

  originalElements.forEach(element => {
    element.style.display = "none";
  });

  loginForm.style.display = "none";
  recoveryForm.style.display = "block";

  document.getElementById("formTitle").textContent =
    "تعيين كلمة مرور جديدة";

  document.getElementById("formDescription").textContent =
    "أدخل كلمة المرور الجديدة لحسابك";

  document.getElementById("forgotPassword").style.display =
    "none";

  loginMessage.textContent = "";
}

// =====================================
// تسجيل الدخول
// =====================================

loginForm.addEventListener("submit", async event => {

  event.preventDefault();

  loginButton.disabled = true;
  loginButton.textContent = "جارٍ التحقق...";

  const email =
    document.getElementById("loginEmail").value.trim();

  const password =
    document.getElementById("loginPassword").value;

  const { error } = await client.auth.signInWithPassword({
    email,
    password
  });

  loginButton.disabled = false;
  loginButton.textContent = "تسجيل الدخول";

  if (error) {
    loginMessage.textContent =
      "تعذر تسجيل الدخول: " + error.message;
  }

});

// =====================================
// طلب رابط استعادة كلمة المرور
// =====================================

document.getElementById("forgotPassword").onclick =
async () => {

  const email =
    document.getElementById("loginEmail").value.trim();

  if (!email) {
    loginMessage.textContent =
      "أدخل بريدك الإلكتروني أولاً.";

    return;
  }

  loginMessage.style.color = "#777";
  loginMessage.textContent =
    "جارٍ إرسال رابط الاستعادة...";

  const { error } =
    await client.auth.resetPasswordForEmail(email, {

      redirectTo:
        window.location.origin + window.location.pathname

    });

  if (error) {

    loginMessage.style.color = "#b33";

    loginMessage.textContent =
      "سبب الخطأ: " + error.message;

    return;
  }

  loginMessage.style.color = "green";

  loginMessage.textContent =
    "تم إرسال رابط الاستعادة إلى بريدك الإلكتروني.";

};

// =====================================
// حفظ كلمة المرور الجديدة
// =====================================

recoveryForm.addEventListener("submit", async event => {

  event.preventDefault();

  const password =
    document.getElementById("newPassword").value;

  const confirm =
    document.getElementById("confirmPassword").value;

  const button =
    document.getElementById("recoveryButton");

  if (password.length < 8) {

    loginMessage.textContent =
      "يجب أن تتكون كلمة المرور من 8 أحرف على الأقل.";

    return;
  }

  if (password !== confirm) {

    loginMessage.textContent =
      "كلمتا المرور غير متطابقتين.";

    return;
  }

  button.disabled = true;
  button.textContent = "جارٍ الحفظ...";

  const { error } = await client.auth.updateUser({
    password: password
  });

  button.disabled = false;
  button.textContent = "حفظ كلمة المرور الجديدة";

  if (error) {

    loginMessage.textContent =
      "تعذر تغيير كلمة المرور: " + error.message;

    return;
  }

  recoveryMode = false;

  await client.auth.signOut();

  history.replaceState(
    null,
    "",
    window.location.pathname
  );

  showLogin();

  loginMessage.style.color = "green";

  loginMessage.textContent =
    "تم تغيير كلمة المرور بنجاح. يمكنك تسجيل الدخول الآن.";

});

// =====================================
// عرض لوحة التحكم
// =====================================

function showDashboard() {

  loginBox.style.display = "none";

  originalElements.forEach(element => {
    element.style.display = "";
  });

}

// =====================================
// تسجيل الخروج
// =====================================

async function logoutDARKAI() {

  const confirmed = confirm("هل تريد تسجيل الخروج؟");

  if (!confirmed) return;

  await client.auth.signOut();

  showLogin();

}

// =====================================
// وظائف لوحة التحكم
// =====================================

const panel = document.getElementById("panel");
const title = document.getElementById("panelTitle");
const body = document.getElementById("panelBody");

function show(t, html) {

  title.textContent = t;
  body.innerHTML = html;

  panel.showModal();

}

document.getElementById("closePanel").onclick = () => {
  panel.close();
};

// المساعدون

document.querySelectorAll(".agent").forEach(btn => {

  btn.onclick = () => {

    const n = btn.dataset.agent;

    show(n, `
      <p>أنا ${n} في فريق DARK AI.</p>

      <p>
        سيتم تفعيل المهام الذكية في المرحلة القادمة.
      </p>

      <textarea
        placeholder="اكتب طلبك هنا..."
        rows="3"
      ></textarea>
    `);

  };

});

// إدارة المنتجات

document.getElementById("productsBtn").onclick = () => {

  show("إدارة المنتجات", `
    <p>
      إضافة المنتجات وأسعارها وصورها ومخزونها.
    </p>

    <p><b>حالة القسم:</b> قيد التطوير.</p>
  `);

};

// صناعة المحتوى

document.getElementById("contentBtn").onclick = () => {

  show("صناعة المحتوى", `
    <p>
      إنشاء المنشورات والإعلانات وأوصاف المنتجات.
    </p>

    <p><b>حالة القسم:</b> قيد التطوير.</p>
  `);

};

// خطة النشر

document.getElementById("calendarBtn").onclick = () => {

  show("خطة النشر", `
    <p>
      تنظيم المنشورات والقصص ومقاطع Reels.
    </p>

    <p><b>حالة القسم:</b> قيد التطوير.</p>
  `);

};

// الإعدادات

document.getElementById("settingsBtn").onclick = () => {

  show("إعدادات دارك", `
    <p>
      <b>النشاط:</b>
      متجر إلكتروني للمواد المنزلية
    </p>

    <p>
      <b>النطاق:</b>
      حضرموت – التوصيل إلى جميع المحافظات
    </p>

    <p>
      <b>العملة:</b>
      الريال اليمني
    </p>

    <button onclick="logoutDARKAI()">
      تسجيل الخروج
    </button>
  `);

};

// =====================================
// مراقبة جلسة Supabase
// =====================================

let recoveryMode =
  location.hash.includes("type=recovery") ||
  location.search.includes("type=recovery");

client.auth.onAuthStateChange((event, session) => {

  if (event === "PASSWORD_RECOVERY") {

    recoveryMode = true;

    showRecovery();

    return;
  }

  if (event === "SIGNED_IN" && !recoveryMode) {

    showDashboard();

  }

  if (event === "SIGNED_OUT") {

    showLogin();

  }

});

// =====================================
// التحقق من الجلسة
// =====================================

async function checkSession() {

  if (recoveryMode) {

    showRecovery();

    return;
  }

  const { data, error } =
    await client.auth.getSession();

  if (error) {

    showLogin();

    return;
  }

  if (data.session) {

    showDashboard();

  } else {

    showLogin();

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
