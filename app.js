// =====================================
// DARK AI - Supabase Configuration
// =====================================

const SUPABASE_URL = "https://beumygquyxotdvthitcq.supabase.co";

// ضع Publishable Key الحالي هنا، ولا تستخدم service_role
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
.product-form textarea,
.product-form select {
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

.product-preview {
  width: 100%;
  max-height: 200px;
  object-fit: contain;
  border: 1px solid #eee;
  border-radius: 10px;
  padding: 5px;
  display: none;
}

.image-label {
  font-weight: bold;
  color: #101a2b;
  margin-top: 8px;
}

#productFormMessage {
  font-size: 13px;
  line-height: 1.7;
  overflow-wrap: anywhere;
}

.product-search,
.product-filter {
  width: 100%;
  padding: 12px;
  margin-top: 10px;
  border: 1px solid #ddd;
  border-radius: 9px;
  box-sizing: border-box;
  font-size: 14px;
  background: white;
}

.product-summary {
  color: #777;
  font-size: 12px;
  margin-top: 8px;
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

  try {

    const { error } = await client.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      loginMessage.textContent =
        "تعذر تسجيل الدخول: " + error.message;
    }

  } catch (error) {

    loginMessage.textContent =
      "حدث خطأ: " + error.message;

  } finally {

    loginButton.disabled = false;
    loginButton.textContent = "تسجيل الدخول";

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

  try {

    const { error } =
      await client.auth.resetPasswordForEmail(email, {

        redirectTo:
          window.location.origin + window.location.pathname

      });

    if (error) throw error;

    loginMessage.style.color = "green";

    loginMessage.textContent =
      "تم إرسال رابط الاستعادة إلى بريدك الإلكتروني.";

  } catch (error) {

    loginMessage.style.color = "#b33";

    loginMessage.textContent =
      "سبب الخطأ: " + error.message;

  }

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

  try {

    const { error } = await client.auth.updateUser({
      password
    });

    if (error) throw error;

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

  } catch (error) {

    loginMessage.style.color = "#b33";

    loginMessage.textContent =
      "تعذر تغيير كلمة المرور: " + error.message;

  } finally {

    button.disabled = false;
    button.textContent = "حفظ كلمة المرور الجديدة";

  }

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
// أدوات مساعدة
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

      <input
        type="search"
        id="productSearch"
        class="product-search"
        placeholder="ابحث عن منتج باسمه..."
      >

      <select
        id="productCategoryFilter"
        class="product-filter"
      >
        <option value="">جميع التصنيفات</option>
      </select>

      <div id="productSummary" class="product-summary"></div>

      <div id="productList" class="product-list"></div>

    </div>

  `);

  loadProducts();

};

// =====================================
// تخزين المنتجات المحملة
// =====================================

let allProducts = [];

// =====================================
// تحميل المنتجات والتصنيفات
// =====================================

async function loadProducts() {

  const list = document.getElementById("productList");

  if (!list) return;

  list.innerHTML = "<p>جارٍ تحميل المنتجات...</p>";

  try {

    allProducts = await ProductsManager.getAll();

    if (!document.getElementById("productList")) return;

    loadProductCategories();

    const searchInput =
      document.getElementById("productSearch");

    const categoryFilter =
      document.getElementById("productCategoryFilter");

    searchInput.oninput = filterProducts;

    categoryFilter.onchange = filterProducts;

    filterProducts();

    loadProductCount();

  } catch (error) {

    list.innerHTML =
      "<p>تعذر تحميل المنتجات: " +
      escapeHTML(error.message) +
      "</p>";

    showProductMessage(
      "حدث خطأ أثناء تحميل المنتجات.",
      true
    );

  }

}

// =====================================
// استخراج التصنيفات تلقائياً
// =====================================

function loadProductCategories() {

  const filter =
    document.getElementById("productCategoryFilter");

  if (!filter) return;

  const categories = [
    ...new Set(
      allProducts
        .map(product => String(product.category || "").trim())
        .filter(Boolean)
    )
  ];

  categories.sort((a, b) => a.localeCompare(b, "ar"));

  filter.innerHTML =
    '<option value="">جميع التصنيفات</option>';

  categories.forEach(category => {

    const option = document.createElement("option");

    option.value = category;
    option.textContent = category;

    filter.appendChild(option);

  });

}

// =====================================
// البحث والتصفية
// =====================================

function filterProducts() {

  const searchInput =
    document.getElementById("productSearch");

  const categoryFilter =
    document.getElementById("productCategoryFilter");

  if (!searchInput || !categoryFilter) return;

  const search =
    searchInput.value.trim().toLowerCase();

  const category =
    categoryFilter.value;

  const filtered = allProducts.filter(product => {

    const name =
      String(product.name || "").toLowerCase();

    const description =
      String(product.description || "").toLowerCase();

    const matchesSearch =
      name.includes(search) ||
      description.includes(search);

    const matchesCategory =
      !category ||
      String(product.category || "").trim() === category;

    return matchesSearch && matchesCategory;

  });

  renderProducts(filtered);

}

// =====================================
// عرض المنتجات
// =====================================

function renderProducts(products) {

  const list = document.getElementById("productList");

  const summary =
    document.getElementById("productSummary");

  if (!list) return;

  if (summary) {

    summary.textContent =
      "عدد المنتجات المعروضة: " +
      products.length +
      " من أصل " +
      allProducts.length;

  }

  if (products.length === 0) {

    list.innerHTML = `
      <p style="text-align:center;color:#888;padding:20px">
        لا توجد منتجات مطابقة لبحثك.
      </p>
    `;

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
    "تم عرض المنتجات بنجاح."
  );

}

// =====================================
// معاينة الصورة
// =====================================

function setupImagePreview() {

  const input =
    document.getElementById("productImageFile");

  const preview =
    document.getElementById("productImagePreview");

  if (!input || !preview) return;

  input.addEventListener("change", () => {

    const file = input.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {

      alert("يرجى اختيار ملف صورة.");

      input.value = "";

      return;
    }

    if (file.size > 5 * 1024 * 1024) {

      alert("حجم الصورة يجب ألا يتجاوز 5 ميجابايت.");

      input.value = "";

      return;
    }

    const reader = new FileReader();

    reader.onload = event => {

      preview.src = event.target.result;
      preview.style.display = "block";

    };

    reader.readAsDataURL(file);

  });

}

// =====================================
// نموذج إضافة وتعديل منتج
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
          placeholder="التصنيف، مثل: المطبخ"
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

        <label class="image-label">
          اختر صورة المنتج من هاتفك
        </label>

        <input
          type="file"
          id="productImageFile"
          accept="image/*"
        >

        <small>
          الحد الأقصى لحجم الصورة 5 ميجابايت.
        </small>

        <img
          id="productImagePreview"
          class="product-preview"
          alt="معاينة صورة المنتج"
          src="${escapeHTML(product?.image_url || "")}"
          style="${product?.image_url ? "display:block" : "display:none"}"
        >

        <input
          type="url"
          id="productImage"
          placeholder="أو ضع رابط صورة اختياري"
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

  setupImagePreview();

  document.getElementById("cancelProductBtn").onclick = () => {

    openProductsAgain();

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

    const imageFile =
      document.getElementById("productImageFile").files[0];

    let image_url =
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

    if (imageFile) {

      if (!imageFile.type.startsWith("image/")) {

        message.textContent = "الملف المختار ليس صورة.";

        return;
      }

      if (imageFile.size > 5 * 1024 * 1024) {

        message.textContent =
          "حجم الصورة يجب ألا يتجاوز 5 ميجابايت.";

        return;
      }

    }

    button.disabled = true;

    try {

      if (imageFile) {

        button.textContent = "جارٍ رفع الصورة...";

        message.style.color = "#92733d";

        message.textContent =
          "يرجى الانتظار حتى اكتمال رفع الصورة.";

        image_url =
          await ProductsManager.uploadImage(imageFile);

      }

      const data = {
        name,
        description,
        price,
        category,
        stock,
        image_url
      };

      button.textContent = "جارٍ حفظ المنتج...";

      if (editing) {

        await ProductsManager.update(product.id, data);

      } else {

        await ProductsManager.add(data);

      }

      message.style.color = "green";

      message.textContent =
        "تم حفظ المنتج بنجاح.";

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

  const addButton =
    event.target.closest("#addProductBtn");

  if (addButton) {

    showProductForm();

    return;
  }

  const editButton =
    event.target.closest("[data-edit]");

  if (editButton) {

    const id = editButton.dataset.edit;

    try {

      const products = await ProductsManager.getAll();

      const product = products.find(item =>
        String(item.id) === String(id)
      );

      if (product) {

        showProductForm(product);

      }

    } catch (error) {

      alert("تعذر تحميل المنتج: " + error.message);

    }

    return;
  }

  const deleteButton =
    event.target.closest("[data-delete]");

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
// مراقبة حالة تسجيل الدخول
// =====================================

client.auth.onAuthStateChange((event, session) => {

  if (event === "PASSWORD_RECOVERY") {

    recoveryMode = true;

    showRecovery();

    return;
  }

  if (session) {

    if (!recoveryMode) {

      showDashboard();

    }

  } else {

    showLogin();

  }

});

// =====================================
// فحص الجلسة عند فتح الموقع
// =====================================

async function initializeDARKAI() {

  const { data, error } = await client.auth.getSession();

  if (error) {

    console.error("Session error:", error.message);

    showLogin();

    return;
  }

  if (recoveryMode) {

    showRecovery();

    return;
  }

  if (data.session) {

    showDashboard();

  } else {

    showLogin();

  }

}

initializeDARKAI();

// =====================================
// DARK AI - END
// =====================================
