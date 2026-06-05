// handle the header background on scroll
const header = document.getElementById("header"); 

window.addEventListener("scroll", function () {
    // لما ننزل أكتر من 50px نضيف كلاس scrolled
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

const headerHeight = header.offsetHeight;
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    // نحسب ارتفاع الهيدر الحالي بعد ما ثبت (بما إنه fixed)
    const targetPosition = section.offsetTop - headerHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth"
        });
      }
    }
    const navLinks = document.querySelectorAll("#header nav li a");
    const toggleMenu = document.querySelector("#header .menu-icon");
    const navUl = document.querySelector("#header nav ul");
    
// handle navLinks  
function setActiveLink(sectionId) {
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + sectionId) {
      link.classList.add('active');
    }
  });
}
const sections = document.querySelectorAll('section');
// On scroll, determine which section is active
window.addEventListener('scroll', () => {
  const scrollPos = window.scrollY + headerHeight;
  let currentSection = null;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionBottom = sectionTop + section.offsetHeight;
    if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
      currentSection = section.getAttribute('id');
    }
  });
  
  if (currentSection) {
    setActiveLink(currentSection);
  }
});

if (toggleMenu && navUl) {
  toggleMenu.addEventListener("click", function (e) {
    e.stopPropagation(); // نمنع انتشار الحدث
    navUl.classList.toggle("show");
  });
  // إغلاق القائمة عند الضغط على أي رابط داخل القائمة
  navUl.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navUl.classList.remove("show");
    });
  });
  // إغلاق القائمة عند الضغط خارجها
  document.addEventListener("click", function (e) {
    if (!toggleMenu.contains(e.target) && !navUl.contains(e.target)) {
      navUl.classList.remove("show");
    }
  });
}
navLinks.forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    // 1. إزالة كلاس active من جميع الروابط
    navLinks.forEach(l => l.classList.remove("active"));
    // 2. إضافة كلاس active للرابط اللي تم الضغط عليه
    this.classList.add("active");
    // 3. استخراج id القسم والتمرير إليه
    const sectionId = this.getAttribute("href").substring(1);
    scrollToSection(sectionId);
  });
});
// handle search box
const searchIcon = document.querySelector("#search-icon");
const searchBox = document.querySelector(".search-box");
const searchInput = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-btn");
searchIcon.addEventListener("click", function () {
    searchBox.classList.toggle("active");
    if (searchBox.classList.contains("active")) {
      searchInput.value = "";
      searchInput.focus();
    }
    searchBtn.addEventListener('click', findInPage);
    searchInput.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        findInPage();
        e.preventDefault();
      }});
      
    });
    function findInPage() {
      const query = searchInput.value.trim();
      searchBox.classList.toggle("active");
      if (!query) return;

    // البحث في الصفحة بدون حساسية لحالة الأحرف
    const found = window.find(query, false, false, true, false, false, false);
    
    if (!found) {
      alert('لم يتم العثور على: ' + query);
    }
  }
// handel volumeIcon
const volumeIcon = document.querySelector(".volume-icon");
const audio = document.querySelector("audio");
const muteSpan = document.querySelector(".volume-icon span");
window.addEventListener("click", function () {
audio.play();
})
volumeIcon.addEventListener("click", function () {
    if (audio) {
        audio.muted = !audio.muted;
        muteSpan.classList.toggle("mute");
      } 
})
// transition between the landing texts (make all landing text arrays, then add on class to the current one, and remove from the others)
var landingTexts = Array.from(document.querySelectorAll(".landing .text"));
var textcounter = landingTexts.length;
var currentText = 1;
var nextbtn = document.querySelector(".controle .next");
var prevbtn = document.querySelector(".controle .prev");
nextbtn.onclick = nextText;
prevbtn.onclick = prevText;
for (let i = 0; i < landingTexts.length; i++) {
    var bullet = document.createElement("span");
    if (i === 0) {
        bullet.classList.add("active");
    }
    var numSpan = i + 1;
    bullet.textContent = numSpan;
    bullet.setAttribute("data-index", numSpan);
    document.querySelector(".bullets").appendChild(bullet);
}
var bullets = Array.from(document.querySelectorAll(".bullets span"));
function nextText() {
  if (nextbtn.classList.contains("disabled")) {
    return false;
  } else {
      currentText++;
    theChecker();
}
}
// prev slide function
function prevText() {
    if (prevbtn.classList.contains("disabled")) {
        return false;
    } else {
        currentText--;
        theChecker();
    }
}
function theChecker() {
    // set the current text number
    document.querySelector(".landing .text.on").classList.remove("on");
    landingTexts[currentText - 1].classList.add("on");
    // remove active class from all bullets    
    bullets.forEach(function (bullet) {
        bullet.classList.remove("active");
    });
    // add active class on current bullet
    // bullets[currentText - 1].classList.add("active");
    bullets.forEach(function (bullet) {
      if (bullet.getAttribute("data-index") == currentText) {
        bullet.classList.add("active");
      }
    });
    // check if current text is the first
    if (currentText === 1) {
        // add disabled class on prev button
        prevbtn.classList.add("disabled");
    } else {
        // remove disabled class from prev button
        prevbtn.classList.remove("disabled");
    }
    // check if current text is the last
    if (currentText === textcounter) {
        // add disabled class on next button
        nextbtn.classList.add("disabled");
    } else {
        // remove disabled class from next button
        nextbtn.classList.remove("disabled");
    }
}
// loop through all bullets items
for (var i = 0; i < bullets.length; i++) {
    bullets[i].onclick = function () {
        console.log(this.getAttribute("data-index"));
        currentText = parseInt(this.getAttribute("data-index"));
        theChecker();
    };
}
// handle moreBTn and render images

let images = [];

// جلب البيانات
fetch("js/images.json")
  .then(response => response.json())
  .then(data => {
    images = data;
    renderImages("all"); 
    initTabs();         
  })
  .catch(error => console.error("Error fetching images:", error));
function renderImages(category = "all") {
  const imagesContainer = document.querySelector(".images-container");
  if (!imagesContainer) return;

  imagesContainer.innerHTML = "";

  const filtered = category === "all"
    ? images
    : images.filter(img => img.category === category);

  filtered.forEach(image => {
    const box = document.createElement("div");
    // 1. نضيف كلاس "box" الأساسي أول حاجة
    box.className = "box";
    // 2. لو هنعرض الكل والـ id أكبر من 2 نضيف كلاس الإخفاء
    if (category === "all" && image.id > 2) {
      box.classList.add("heddin");   // أو "hidden" لو اسم الكلاس عندك كده
    }
    box.setAttribute("data-category", image.category);
    box.innerHTML = `
      <img src="${image.image}" alt="${image.alt}" />
      <div class="caption">
        <h4>${image.title}</h4>
        <p>${image.description}</p>
      </div>
    `;
    imagesContainer.appendChild(box);
  });
}
// دالة ربط الأحداث (تُستدعى مرة واحدة)
function initTabs() {
  const categoryTabs = document.querySelectorAll(".shuffle li");
  if (categoryTabs.length === 0) return;
  categoryTabs.forEach(tab => {
    tab.addEventListener("click", function () {
      // إزالة الكلاس "active" من كل التبويبات
      categoryTabs.forEach(t => t.classList.remove("active"));
      // إضافته للتاب المضغوط
      this.classList.add("active");
    //   const category = .getAttribute("data-category");
      renderImages(this.dataset.category); 
    });
  });
}

const moreBtn = document.querySelector(".more-btn");
if (moreBtn) {
  moreBtn.addEventListener("click", function (e) {
    e.preventDefault();
    const hiddenBoxes = document.querySelectorAll(".images-container .box");
    hiddenBoxes.forEach(box => box.classList.toggle("heddin"));
    
  });
}
// seeMore btn 
const seeMoreBtn = document.querySelector(".see-more");
seeMoreBtn.addEventListener("click", function () {
  const textVideo = document.querySelector(".video .text");
  const VideoOverlay = document.querySelector(".video");
  textVideo.classList.toggle("hidden");
  VideoOverlay.classList.toggle("show");
  this.classList.toggle("on");
})

// handle pricing

// let plans = [];

// fetch("js/plans.json")
//   .then(response => response.json())
//   .then(data => {
//     plans = data;
//     showPlans(plans);
//   })
//   .catch(error => console.error("Error fetching plans:", error));

// function showPlans(plans) {
//   const plansBox = document.querySelector(".plans-box");
//   if (!plansBox) {
//     console.error("Element '.plans-box' not found");
//     return;
//   }

//   plansBox.innerHTML = ""; // امسح الخطط القديمة

//   plans.forEach(plan => {
//     const planty = document.createElement("div");
//     planty.className = "plan";
//     planty.setAttribute("data-id", plan.id);
//     let featuresHTML = "";
//     if (Array.isArray(plan.features)) {
//       featuresHTML = plan.features
//         .map(feature => `<li>${feature}</li>`)
//         .join("");
//     }
//     planty.innerHTML = `
//       <div class="head">
//         <h3>${plan.name}</h3>
//         <span>${plan.price}</span>
//       </div>
//       <ul>${featuresHTML}</ul>
//       <div class="buy">
//         <button class="buy-btn" data-id="${plan.buttonLink}" >${plan.buttonText}</button>
//       </div>
//     `;
//     plansBox.appendChild(planty);
//   });
//      document.querySelectorAll('.buy-btn').forEach(btn => btn.addEventListener('click', () => {
//         const btnId = parent(btn.dataset.data-id);
//         const plan = plans.find(p=>p.id===id);
//         if(plan) openBookingModal(plan);
//         })
//       )
// }

// ---------- منطق الدفع ----------

let plans = [];

fetch("js/plans.json")
  .then(response => response.json())
  .then(data => {
    plans = data;
    showPlans(plans);
  })
  .catch(error => console.error("Error fetching plans:", error));

function showPlans(plans) {
  const plansBox = document.querySelector(".plans-box");
  if (!plansBox) {
    console.error("Element '.plans-box' not found");
    return;
  }
  // plansBox.innerHTML = "";
  plans.forEach(plan => {
    const planty = document.createElement("div");
    planty.className = "plan";
    planty.setAttribute("data-id", plan.id); // تخزين id الخطة

    let featuresHTML = "";
    if (Array.isArray(plan.features)) {
      featuresHTML = plan.features
        .map(feature => `<li>${feature}</li>`)
        .join("");
    }

    planty.innerHTML = `
      <div class="head">
        <h3>${plan.name}</h3>
        <span>${plan.price}</span>
      </div>
      <ul>${featuresHTML}</ul>
      <div class="buy">
        <button class="buy-btn">${plan.buttonText || 'Buy Now'}</button>
      </div>
    `;
    plansBox.appendChild(planty);

    // ربط الحدث مباشرة هنا (طريقة مضمونة)
    const buyBtn = planty.querySelector(".buy-btn");
    buyBtn.addEventListener("click", () => {
      openPlanPaymentModal(plan);
    });
  });
}

// ---------- دوال المودال ----------
const overlay = document.getElementById("paymentOverlay");
const modalTitle = document.getElementById("modalTitle");
const modalBody = document.getElementById("modalBody");
const closeModalBtn = document.getElementById("closeModalBtn");

function openModal(title, htmlContent) {
  if (!overlay) return;
  modalTitle.innerText = title;
  modalBody.innerHTML = htmlContent;
  overlay.classList.add("active");
}

function closeModal() {
  if (!overlay) return;
  overlay.classList.remove("active");
}

closeModalBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) closeModal(); // إغلاق عند الضغط خارج المودال
});

// ---------- دالة فتح نافذة الدفع للخطة ----------
function openPlanPaymentModal(plan) {
  const content = `
    <div style="text-align:center; margin-bottom:20px;">
      <h4>${plan.name}</h4>
      <p style="font-size:1.2rem;"><strong>${plan.price}</strong></p>
      <p>Select your payment method and complete the form.</p>
    </div>
    <div class="payment-form-group">
      <label>Full Name</label>
      <input type="text" id="payerName" placeholder="Your full name" required>
    </div>
    <div class="payment-form-group">
      <label>Email</label>
      <input type="email" id="payerEmail" placeholder="you@example.com" required>
    </div>
    <div class="payment-form-group">
      <label>Payment Method</label>
      <div style="display:flex; gap:10px; margin-top:5px;">
        <button class="payment-method-btn selected" data-method="card" style="flex:1; padding:10px; border-radius:8px; background:var(--main-color); color:white; border:none;">💳 Credit Card</button>
        <button class="payment-method-btn" data-method="cash" style="flex:1; padding:10px; border-radius:8px; background:#eee; color:#333; border:none;">💵 Cash</button>
      </div>
    </div>
    <div id="cardDetails">
      <div class="payment-form-group">
        <label>Card Number</label>
        <input type="text" id="cardNumber" placeholder="1234 5678 9012 3456" maxlength="19">
      </div>
      <div style="display:flex; gap:10px;">
        <div class="payment-form-group" style="flex:1;">
          <label>Expiry (MM/YY)</label>
          <input type="text" id="expiry" placeholder="MM/YY">
        </div>
        <div class="payment-form-group" style="flex:1;">
          <label>CVV</label>
          <input type="text" id="cvv" placeholder="123" maxlength="4">
        </div>
      </div>
    </div>
    <button id="confirmPaymentBtn" class="confirm-booking">Pay & Confirm</button>
    <p style="font-size:0.7rem; text-align:center; margin-top:10px;">🔒 Demo mode – no real transaction</p>
  `;

  openModal(`💳 ${plan.name}`, content);

  // تفعيل أزرار اختيار طريقة الدفع
  setTimeout(() => {
    const methodBtns = document.querySelectorAll(".payment-method-btn");
    const cardDetailsDiv = document.getElementById("cardDetails");
    const confirmBtn = document.getElementById("confirmPaymentBtn");

    methodBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        methodBtns.forEach(b => {
          b.classList.remove("selected");
          b.style.background = "#eee";
          b.style.cursor = "pointer";
          b.style.color = "#333";
        });
        btn.classList.add("selected");
        btn.style.background = "var(--main-color)";
        btn.style.color = "white";
        const method = btn.dataset.method;
        if (method === "cash") {
          cardDetailsDiv.style.display = "none";
        } else {
          cardDetailsDiv.style.display = "block";
        }
      });
    });

    // تأكيد الدفع
    confirmBtn.addEventListener("click", () => {
      const name = document.getElementById("payerName").value.trim();
      const email = document.getElementById("payerEmail").value.trim();
      const selectedMethod = document.querySelector(".payment-method-btn.selected").dataset.method;

      if (!name || !email) {
        alert("Please enter your name and email.");
        return;
      }

      if (selectedMethod === "card") {
        const cardNum = document.getElementById("cardNumber").value.trim();
        const expiry = document.getElementById("expiry").value.trim();
        const cvv = document.getElementById("cvv").value.trim();
        if (!cardNum || !expiry || !cvv) {
          alert("Please fill in all card details.");
          return;
        }
        if (cardNum.replace(/\s/g, '').length < 13) {
          alert("Invalid card number.");
          return;
        }
        alert(`✅ Payment of ${plan.price} successful via card ending in ${cardNum.slice(-4)}.`);
      } else {
        alert(`✅ Cash payment confirmed for ${plan.price}.`);
      }

      // محاكاة إرسال بريد إلكتروني أو معالجة
      const adminEmail = "your-admin@example.com"; // استبدله ببريدك
      const subject = `New Plan Purchase: ${plan.name} - ${name}`;
      const body = `Plan: ${plan.name}\nPrice: ${plan.price}\nCustomer: ${name}\nEmail: ${email}\nPayment Method: ${selectedMethod}\nStatus: Confirmed`;
      window.location.href = `mailto:${adminEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      closeModal();
    });
  }, 50);
}