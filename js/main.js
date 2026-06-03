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

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        // نحسب ارتفاع الهيدر الحالي بعد ما ثبت (بما إنه fixed)
        const headerHeight = header.offsetHeight;
        const targetPosition = section.offsetTop - headerHeight;
        window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
        });
    }
}
const navLinks = document.querySelectorAll("#header nav li a");
const toggleMenu = document.querySelector("#header .toggle-menu");
const navUl = document.querySelector("#header nav ul");

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
    searchBtn.onclick = function () {
      searchBox.classList.remove("active");
    };
});
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
// transition between the landing texts (make all landing text arrays, then add on class to the current one, and remove from the others)
// shuffle the images in the gallary

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