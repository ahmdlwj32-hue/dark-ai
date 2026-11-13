const panel=document.getElementById('panel'), title=document.getElementById('panelTitle'), body=document.getElementById('panelBody');
function show(t,html){title.textContent=t;body.innerHTML=html;panel.showModal()}
document.getElementById('closePanel').onclick=()=>panel.close();
document.querySelectorAll('.agent').forEach(btn=>btn.onclick=()=>{const n=btn.dataset.agent;show(n,`<p>أنا ${n} في فريق DARK AI.</p><p>في النسخة القادمة سأتمكن من تنفيذ المهام التسويقية المتخصصة بعد ربط المنصة بخدمة الذكاء الاصطناعي.</p><textarea placeholder="اكتب طلبك هنا..." rows="3"></textarea><button class="save" onclick="alert('سيتم تفعيل المحادثة الذكية في المرحلة التالية')">إرسال الطلب</button>`)});
document.getElementById('productsBtn').onclick=()=>show('إدارة المنتجات','<p>ستتمكن هنا من إضافة اسم المنتج وصورته وسعره ومميزاته ومخزونه.</p><p><b>حالة القسم:</b> قيد التطوير.</p>');
document.getElementById('contentBtn').onclick=()=>show('صناعة المحتوى','<p>إنشاء منشورات وإعلانات وأوصاف منتجات وسيناريوهات فيديو.</p><p><b>حالة القسم:</b> قيد التطوير.</p>');
document.getElementById('calendarBtn').onclick=()=>show('خطة النشر','<p>تقويم لتنظيم المنشورات والقصص ومقاطع Reels.</p><p><b>حالة القسم:</b> قيد التطوير.</p>');
document.getElementById('settingsBtn').onclick=()=>show('إعدادات دارك','<p><b>النشاط:</b> متجر إلكتروني للمواد المنزلية</p><p><b>النطاق:</b> حضرموت – التوصيل إلى جميع المحافظات</p><p><b>العملة:</b> الريال اليمني</p>');
if('serviceWorker' in navigator){window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));}