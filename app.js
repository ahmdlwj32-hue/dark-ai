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
// تهيئة مدير المنتجات
// =====================================

ProductsManager.init(client);

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

.product-form {
  display: grid;
  gap: 10px;
  margin-top: 15px;
}

.product-form input,
.product-form textarea {
  width: 100%;
  box-sizing: border-box;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 9px;
  font-family: Arial;
  font-size: 14px;
}

.product-form textarea {
  resize: vertical;
  min-height: 75px;
}

.product-primary {
  background: #101a2b;
  color: white;
  border: 0;
  padding: 13px;
  border-radius: 9px;
  cursor: pointer;
}

.product-secondary {
  background: #eee;
  color: #333;
  border: 0;
  padding: 11px;
  border-radius: 9px;
  cursor: pointer;
}

.product-list {
  display: grid;
  gap: 12px;
  margin-top: 20px;
}

.product-card {
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  padding: 13px;
  background: #fff;
}

.product-card h3 {
  margin: 0 0 8px;
  color: #101a2b;
}

.product-card p {
  font-size: 13px;
  color: #666;
  line-height: 1.7;
}

.product-price {
  color: #92733d;
  font-weight: bold;
  margin: 8px 0;
}

.product-actions {
  display: flex;
  gap: 8px;
  margin-top: 12px;
}

.product-actions button {
  flex: 1;
  padding: 9px;
  border: 0;
  border-radius: 7px;
  cursor: pointer;
}

.edit-product {
  background: #eee2c9;
  color: #604b25;
}

.delete-product {
  background: #f8e1e1;
  color: #a22;
}

.product-message {
  padding: 10px;
  border-radius: 8px;
  margin: 10px 0;
  font-size: 13px;
  line-height: 1.6;
  background: #f5f5f5;
}

.product-image {
  width: 100%;
  max-height: 160px;
  object-fit: contain;
  border-radius: 8px;
  margin-bottom: 10px;
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
// وضع استعادة كلمة المرور
// =====================================

let recoveryMode =
  location.hash.includes("type=recovery") ||
  location.search.includes("type=recovery");

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
// شاشة استعادة كلمة المرور
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
// استعادة كلمة المرور
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
    password
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

  loadProductCount();

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
// عناصر النوافذ
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

// =====================================
// أدوات مساعدة آمنة
// =====================================

function escapeHTML(value) {

  return String(value ?? "").replace(/[&<>"']/g, char => {

    const chars = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    };

    return chars[char];

  });

}

function showProductMessage(message, isError = false) {

  const box = document.getElementById("productMessage");

  if (!box) return;

  box.style.color = isError ? "#a22" : "#287a43";
  box.textContent = message;

}

// =====================================
// عدد المنتجات
// =====================================

async function loadProductCount() {

  const counter = document.getElementById("productCount");

  if (!counter) return;

  const { count, error } = await client
    .from("products")
    .select("*", { count: "exact", head: true });

  if (error) {

    console.error("Product count error:", error.message);

    return;
  }

  counter.textContent = count ?? 0;

}

// =====================================
// واجهة إدارة المنتجات
// =====================================

document.getElementById("productsBtn").onclick = () => {

  show("إدارة المنتجات", `

    <div>

      <p>
        إدارة منتجات متجر دارك.
      </p>

      <button
        class="product-primary"
        id="addProductBtn"
        style="width:100%"
      >
        + إضافة منتج جديد
      </button>

      <div id="productMessage" class="product-message">
        جارٍ تحميل المنتجات...
      </div>

      <div id="productList" class="product-list"></div>

    </div>

  `);

  loadProducts();

};

// =====================================
// عرض المنتجات
// =====================================

async function loadProducts() {

  const list = document.getElementById("productList");

  if (!list) return;

  list.innerHTML = "<p>جارٍ تحميل المنتجات...</p>";

  const products = await ProductsManager.getAll();

  if (!document.getElementById("productList")) return;

  if (!products) {

    list.innerHTML =
      "<p>تعذر تحميل المنتجات.</p>";

    return;
  }

  if (products.length === 0) {

    list.innerHTML =
      "<p>لا توجد منتجات حتى الآن. أضف منتجك الأول.</p>";

    showProductMessage("قاعدة البيانات جاهزة لاستقبال المنتجات.");

    return;
  }

  list.innerHTML = products.map(product => {

    const image = product.image_url
      ? `
        <img
          class="product-image"
          src="${escapeHTML(product.image_url)}"
          alt="${escapeHTML(product.name)}"
          onerror="this.style.display='none'"
        >
      `
      : "";

    return `

      <article class="product-card">

        ${image}

        <h3>${escapeHTML(product.name)}</h3>

        <p>
          ${escapeHTML(product.description || "لا يوجد وصف")}
        </p>

        <div class="product-price">
          السعر: ${escapeHTML(product.price ?? 0)} ريال
        </div>

        <p>
          التصنيف: ${escapeHTML(product.category || "غير محدد")}
        </p>

        <p>
          المخزون: ${escapeHTML(product.stock ?? 0)}
        </p>

        <div class="product-actions">

          <button
            class="edit-product"
            data-edit="${escapeHTML(product.id)}"
          >
            تعديل
          </button>

          <button
            class="delete-product"
            data-delete="${escapeHTML(product.id)}"
          >
            حذف
          </button>

        </div>

      </article>

    `;

  }).join("");

  showProductMessage(
    "تم تحميل " + products.length + " منتج بنجاح."
  );

  loadProductCount();

}

// =====================================
// نموذج إضافة منتج
// =====================================

function showProductForm(product = null) {

  const editing = product !== null;

  show(
    editing ? "تعديل المنتج" : "إضافة منتج جديد",

    `

      <form id="productForm" class="product-form">

        <input
          type="text"
          id="productName"
          placeholder="اسم المنتج"
          required
          maxlength="150"
          value="${escapeHTML(product?.name || "")}"
        >

        <textarea
          id="productDescription"
          placeholder="وصف المنتج"
        >${escapeHTML(product?.description || "")}</textarea>

        <input
          type="number"
          id="productPrice"
          placeholder="السعر بالريال اليمني"
          min="0"
          step="0.01"
          required
          value="${escapeHTML(product?.price ?? "")}"
        >

        <input
          type="text"
          id="productCategory"
          placeholder="التصنيف"
          value="${escapeHTML(product?.category || "")}"
        >

        <input
          type="number"
          id="productStock"
          placeholder="الكمية في المخزون"
          min="0"
          step="1"
          value="${escapeHTML(product?.stock ?? 0)}"
        >

        <input
          type="url"
          id="productImage"
          placeholder="رابط صورة المنتج (اختياري)"
          value="${escapeHTML(product?.image_url || "")}"
        >

        <button
          type="submit"
          class="product-primary"
          id="saveProductBtn"
        >
          ${editing ? "حفظ التعديلات" : "حفظ المنتج"}
        </button>

        <button
          type="button"
          class="product-secondary"
          id="cancelProductBtn"
        >
          إلغاء
        </button>

        <div id="productFormMessage"></div>

      </form>

    `

  );

  document.getElementById("cancelProductBtn").onclick = () => {

    show("إدارة المنتجات", `
      <button class="product-primary" id="addProductBtn">
        + إضافة منتج جديد
      </button>
      <div id="productMessage" class="product-message"></div>
      <div id="productList" class="product-list"></div>
    `);

    loadProducts();

  };

  document.getElementById("productForm").onsubmit =
  async event => {

    event.preventDefault();

    const button =
      document.getElementById("saveProductBtn");

    const message =
      document.getElementById("productFormMessage");

    const name =
      document.getElementById("productName").value.trim();

    const description =
      document.getElementById("productDescription").value.trim();

    const price =
      Number(document.getElementById("productPrice").value);

    const category =
      document.getElementById("productCategory").value.trim();

    const stock =
      Number(document.getElementById("productStock").value);

    const image_url =
      document.getElementById("productImage").value.trim();

    if (!name) {

      message.textContent = "أدخل اسم المنتج.";

      return;
    }

    if (!Number.isFinite(price) || price < 0) {

      message.textContent = "أدخل سعرًا صحيحًا.";

      return;
    }

    if (!Number.isInteger(stock) || stock < 0) {

      message.textContent = "أدخل كمية صحيحة للمخزون.";

      return;
    }

    const data = {
      name,
      description,
      price,
      category,
      stock,
      image_url
    };

    button.disabled = true;
    button.textContent = "جارٍ الحفظ...";

    try {

      if (editing) {

        await ProductsManager.update(product.id, data);

      } else {

        await ProductsManager.add(data);

      }

      panel.close();

      openProductsAgain();

      loadProductCount();

    } catch (error) {

      message.style.color = "#a22";

      message.textContent =
        "حدث خطأ أثناء الحفظ: " + error.message;

      button.disabled = false;

      button.textContent =
        editing ? "حفظ التعديلات" : "حفظ المنتج";

    }

  };

}

// =====================================
// العودة إلى قائمة المنتجات
// =====================================

function openProductsAgain() {

  document.getElementById("productsBtn").click();

}

// =====================================
// أزرار إدارة المنتجات
// =====================================

document.addEventListener("click", async event => {

  const addButton = event.target.closest("#addProductBtn");

  if (addButton) {

    showProductForm();

    return;
  }

  const editButton = event.target.closest("[data-edit]");

  if (editButton) {

    const id = editButton.dataset.edit;

    const products = await ProductsManager.getAll();

    const product = products.find(item =>
      String(item.id) === String(id)
    );

    if (product) {

      showProductForm(product);

    }

    return;
  }

  const deleteButton = event.target.closest("[data-delete]");

  if (deleteButton) {

    const id = deleteButton.dataset.delete;

    const confirmed =
      confirm("هل أنت متأكد من حذف هذا المنتج؟");

    if (!confirmed) return;

    deleteButton.disabled = true;

    try {

      await ProductsManager.delete(id);

      openProductsAgain();

      loadProductCount();

    } catch (error) {

      alert("تعذر حذف المنتج: " + error.message);

      deleteButton.disabled = false;

    }

  }

});

// =====================================
// المساعدون
// =====================================

document.querySelectorAll(".agent").forEach(btn => {

  btn.onclick = () => {

    const n = btn.dataset.agent;

    show(n, `

      <p>أنا ${escapeHTML(n)} في فريق DARK AI.</p>

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

// =====================================
// صناعة المحتوى
// =====================================

document.getElementById("contentBtn").onclick = () => {

  show("صناعة المحتوى", `

    <p>
      إنشاء المنشورات والإعلانات وأوصاف المنتجات.
    </p>

    <p>
      <b>حالة القسم:</b> قيد التطوير.
    </p>

  `);

};

// =====================================
// خطة النشر
// =====================================

document.getElementById("calendarBtn").onclick = () => {

  show("خطة النشر", `

    <p>
      تنظيم المنشورات والقصص ومقاطع Reels.
    </p>

    <p>
      <b>حالة القسم:</b> قيد التطوير.
    </p>

  `);

};

// =====================================
// الإعدادات
// =====================================

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

    <button
      class="product-primary"
      onclick="logoutDARKAI()"
    >
      تسجيل الخروج
    </button>

  `);

};

// =====================================
// مراقبة جلسة Supabase
// =====================================

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
