/*
let moonIcon = document.querySelector("#moon");
let listItems = document.querySelectorAll('.nav ul a')


const skillsOffset = $("#skills").offset().top
$(window).on("scroll" , function(){
    if($(window).scrollTop() > skillsOffset){
        $("#navbar").addClass("fixed")
        $(".scroll-to-top").fadeIn(1000)

    }else{
        $("#navbar").removeClass("fixed")
        $(".scroll-to-top").fadeOut(500)
    }
})


$(".scroll-to-top").on("click" , function(){
    $("html , body").animate({scrollTop : 0} , 500);
})

$("#navbar ul li a").on("click" , function(){
    const currentSection = $(this).attr("href")
    const currentSectionOffsetTop = currentSection.offset().top
    $("html , body").animate({screenTop : currentSectionOffsetTop} ,2000 )
})

   

// dropdown menun

const menuButton = document.querySelector('.fa-bars'); // The bars icon
const dropdownMenu = document.getElementById('dropdownmenun'); // The dropdown menu
const menuLinks = dropdownMenu.querySelectorAll('a'); // Links inside the dropdown menu

// Initially hide the dropdown menu
dropdownMenu.classList.add("hidden");

// Toggle the dropdown menu on bars icon click
menuButton.addEventListener('click', () => {
  dropdownMenu.classList.toggle("hidden");
});

// Close the dropdown menu when any link is clicked
menuLinks.forEach((link) => {
  link.addEventListener('click', () => {
    dropdownMenu.classList.add("hidden");
  });
});



// dark mode



let theme = localStorage.getItem("theme");
document.documentElement.classList.add(theme);



moonIcon.addEventListener("click", function () {
  if (theme === "light") {
    theme = "dark";
    localStorage.setItem("theme", theme);
    document.documentElement.classList.add("dark");
  } else {
    theme = "light";
    localStorage.setItem("theme", theme);
    document.documentElement.classList.remove("dark");
  }
});




//listItems

listItems.forEach((item)=>
{
  item.addEventListener('click' , ()=>{
    listItems.forEach( (a)=>{
      a.classList.remove('font-extrabold')
    })
    item.classList.remove('font-semibold')
    item.classList.add('font-extrabold')

  })

})

 

// Show projects related to clicked button
// Get all filter buttons and project cards
const filterButtons = document.querySelectorAll("#projects button[data-filter]");
const projectCards = document.querySelectorAll("#projects #projectCards > div");

// Add event listeners to filter buttons
filterButtons.forEach(button => {
  button.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent default button behavior (form submission or page reload)

    filterButtons.forEach(btn => btn.classList.remove("active"))
    button.classList.add("active")

    // Get the filter value from the button's data-filter attribute
    const filterValue = button.getAttribute("data-filter");

    // Loop through all project cards
    projectCards.forEach(card => {
      const cardCategory = card.getAttribute("data-name");

      // Show or hide cards based on the filter
      if (filterValue === "all" || cardCategory === filterValue) {
        card.classList.remove("hidden"); // Show the card
      } else {
        card.classList.add("hidden"); // Hide the card
      }
    });


    
    });
});



*/

document.addEventListener("DOMContentLoaded", () => {
  // =========================================================
  // 1. خلفية الجسيمات والشبكة التفاعلية (Canvas Interactive Particles)
  // =========================================================
  const canvas = document.getElementById("particlesCanvas");
  const ctx = canvas.getContext("2d");

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const mouse = { x: null, y: null, radius: 150 };

  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;

    // تحريك هالة الماوس المضيئة
    const cursorGlow = document.getElementById("cursorGlow");
    if (cursorGlow) {
      cursorGlow.style.left = `${e.clientX}px`;
      cursorGlow.style.top = `${e.clientY}px`;
    }
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 3 + 1;
      this.speedX = Math.random() * 1.5 - 0.75;
      this.speedY = Math.random() * 1.5 - 0.75;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x > width || this.x < 0) this.speedX *= -1;
      if (this.y > height || this.y < 0) this.speedY *= -1;

      // تفاعل مع الماوس عند الاقتراب
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < mouse.radius) {
        const angle = Math.atan2(dy, dx);
        const force = (mouse.radius - distance) / mouse.radius;
        this.x -= Math.cos(angle) * force * 3;
        this.y -= Math.sin(angle) * force * 3;
      }
    }

    draw() {
      ctx.fillStyle = "#59B2F4";
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const particles = [];
  const particleCount = Math.min(width / 15, 80);

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animateParticles() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      // رسم خطوط اتصال بين النظير القريب
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          ctx.strokeStyle = `rgba(89, 178, 244, ${1 - dist / 120})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animateParticles);
  }

  animateParticles();

  // =========================================================
  // 2. تأثير المايل ثلاثي الأبعاد للكروت (3D Tilt Effect)
  // =========================================================
  const tiltCards = document.querySelectorAll(".tilt-card");

  tiltCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    });
  });

  // =========================================================
  // 3. كتابة النص التلقائي (Typewriter) والتبديل
  // =========================================================
  const typedTextElement = document.getElementById("typedText");
  const roles = {
    en: ["Frontend Developer", "Angular Specialist", "UI/UX Developer"],
    ar: ["مطورة واجهات أصلية", "متخصصة أنجولار", "مطورة UI/UX"],
  };

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let currentLang = localStorage.getItem("lang") || "en";

  function typeEffect() {
    const currentRoles = roles[currentLang] || roles.en;
    const currentRole = currentRoles[roleIndex % currentRoles.length];

    if (isDeleting) {
      typedTextElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedTextElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 40 : 90;

    if (!isDeleting && charIndex === currentRole.length) {
      typeSpeed = 1800;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex++;
      typeSpeed = 400;
    }

    setTimeout(typeEffect, typeSpeed);
  }

  typeEffect();

  const moonIcon = document.getElementById("moon");
  if (moonIcon) {
    moonIcon.addEventListener("click", () => {
      document.documentElement.classList.toggle("dark");
    });
  }
});
// --- 1. Language Toggle (Arabic / English - i18n) ---
const translations = {
  en: {
    nav_home: "Home",
    nav_services: "Services",
    nav_about: "About Me",
    nav_skills: "Skills",
    nav_projects: "Projects",
    nav_testimonials: "Testimonials",
    nav_contact: "Contact",
    hero_greeting: "Hi, it's me",
    hero_name: "Rabab Refaat",
    hero_role_prefix: "And I'm a",
    hero_dynamic_role: "Angular Frontend Developer",
    hero_desc:
      "I'm an energetic front-end developer skilled at writing well-designed, efficient code using Angular , Html5 , CSS3 and TailwindCSS or Bootstrap. I specialize in creating responsive websites with a mobile-first approach, ensuring seamless, engaging experiences across all devices.",
    download_cv: "Download CV",
    services_title: "Services",
    service_1_title: "Custom Front-End Development",
    service_1_desc:
      "Build high-quality, performant, and interactive user interfaces using Angular 17 & JS and Tailwind CSS.",
    service_2_title: "Responsive Web Design",
    service_2_desc:
      "Create websites that look and function perfectly on all devices using Tailwind CSS & Bootstrap.",
    service_3_title: "Angular Libraries",
    service_3_desc:
      "Develop reusable, modular Angular components with Sass, TailwindCSS, or Bootstrap.",
    service_4_title: "API Integration",
    service_4_desc:
      "Integrate front-end applications with APIs for dynamic, real-time data-driven experiences.",
    about_title: "About Me",
    tab_info: "Personal Info",
    tab_experience: "Experience",
    tab_education: "Education",
    info_name_label: "Name:",
    info_job_label: "Role:",
    info_phone_label: "Phone:",
    info_email_label: "Email:",
    skills_title: "Skills",
    projects_title: "Projects",
    projects_subtitle:
      "Explore my latest projects built with modern technologies and highest quality standards.",
    filter_all: "All",
    filter_htmlcss: "HTML & CSS",
    filter_bootstrap: "Bootstrap",
    filter_js: "JavaScript",
    filter_tailwind: "Tailwind",
    live_demo: "Live Demo",
    details_btn: "Full Details",
    modal_idea_title: "Project Idea & Implementation:",
    modal_features_title: "Features & Technical Details:",
    modal_tech_title: "Technologies Used:",
    modal_live_demo: "Live Preview",
    modal_close: "Close",

    // Previous Projects
    p1_title: "Tammenny App",
    p1_desc:
      "A comprehensive medical application for managing consultations and booking appointments efficiently.",
    p1_f1: "Online appointment booking & management",
    p1_f2: "Comprehensive Admin Panel",
    p2_title: "E-Commerce Store",
    p2_desc:
      "An integrated e-commerce platform for managing products, cart, and seamless checkout.",
    p2_f1: "Dynamic product catalog & shopping system",
    p2_f2: "Cart management & user authentication",
    p3_title: "Medilab App",
    p3_desc:
      "A showcase website for healthcare and medical laboratory services with modern design.",
    p3_f1: "Fully responsive design across all screens",
    p3_f2: "Advanced sections for medical services",
    p4_title: "Yummy Recipe App",
    p4_desc:
      "A global food recipes application fetching data dynamically through APIs.",
    p4_f1: "Advanced search & filtering for meals",
    p4_f2: "Integration with external APIs",
    p5_title: "Geek App",
    p5_desc:
      "A tech platform specially designed to showcase modern tech products and news.",
    p5_f1: "Cohesive structural design via Bootstrap",
    p5_f2: "Fast & smooth browsing for articles",
    p6_title: "Scholar App",
    p6_desc:
      "An educational platform to display courses and academic programs interactively.",
    p6_f1: "Dedicated sections for courses & curriculums",
    p6_f2: "Modern & user-friendly interface",

    // New Projects EN
    p_rest_title: "Ruby Restaurant",
    p_rest_desc:
      "A responsive restaurant website showcasing delicious meals and menus.",
    p_mealify_title: "Mealify App",
    p_mealify_desc:
      "A modern food and recipes platform layout designed with pure HTML & CSS.",
    p_cafe_title: "Cafe App",
    p_cafe_desc:
      "A stylish coffee shop web application built using Bootstrap framework.",
    p_login_title: "Login System",
    p_login_desc:
      "A secure user authentication system with sign-up and validation logic.",
    p_game_title: "Game App",
    p_game_desc:
      "An interactive gaming application web portal powered by JavaScript.",
    p_portfolio_title: "Personal Portfolio",
    p_portfolio_desc:
      "A modern professional developer portfolio styled with Tailwind CSS.",

    testimonials_title: "Client Testimonials",
    show_more_btn: "Show More Projects (+)",
    show_less_btn: "Show Less (-)",
    contact_title: "Contact Me",
    contact_name: "Name",
    contact_email: "Email",
    contact_message: "Message",
    contact_submit: "Send Message",
  },
  ar: {
    nav_home: "الرئيسية",
    nav_services: "الخدمات",
    nav_about: "عني",
    nav_skills: "المهارات",
    nav_projects: "المشاريع",
    nav_testimonials: "آراء العملاء",
    nav_contact: "تواصل معي",
    hero_greeting: "مرحباً، أنا",
    hero_name: "رباب رفعت",
    hero_role_prefix: "وأنا",
    hero_dynamic_role: "مُطوّرة واجهات Angular",
    hero_desc:
      "مكودة ومطورة واجهات أمامية (Front-End) متخصصة في بناء تطبيقات ومواقع تفاعلية عالية الأداء باستخدام Angular, Html5, CSS3 وTailwindCSS أو Bootstrap. أركز على تقديم أفضل تجربة مستخدم وتصاميم متجاوبة بالكامل.",
    download_cv: "تحميل السيرة الذاتية",
    services_title: "الخدمات",
    service_1_title: "تطوير الواجهات الأمامية",
    service_1_desc:
      "بناء واجهات مستخدم مخصصة وسريعة الاستجابة باستعمال Angular, Html5, CSS3 و Tailwind CSS.",
    service_2_title: "تصميم متجاوب بالكامل",
    service_2_desc:
      "تطوير مواقع تعمل بشكل ممتاز على مختلف الشاشات والأجهزة الحديثة.",
    service_3_title: "مكتبات مكونات Angular",
    service_3_desc:
      "إنشاء Reusable Components قابلة لإعادة الاستخدام لتسريع البرمجة والتطوير.",
    service_4_title: "ربط الـ APIs التطبيقية",
    service_4_desc:
      "ربط الواجهات البرمجية بالـ Back-End لجلب البيانات وتحديثها بشكل ديناميكي.",
    about_title: "عني",
    tab_info: "بيانات شخصية",
    tab_experience: "الخبرة",
    tab_education: "التعليم",
    info_name_label: "الاسم:",
    info_job_label: "الوظيفة:",
    info_phone_label: "الهاتف:",
    info_email_label: "البريد الإلكتروني:",
    skills_title: "المهارات",
    projects_title: "معرض أعمالي",
    projects_subtitle:
      "إطلع على أحدث مشاريعي المنفذة بأحدث التقنيات البرمجية وأعلى معايير الجودة.",
    filter_all: "الكل",
    filter_htmlcss: "HTML & CSS",
    filter_bootstrap: "Bootstrap",
    filter_js: "JavaScript",
    filter_tailwind: "Tailwind",
    live_demo: "معاينة حية",
    details_btn: "التفاصيل الكاملة",
    modal_idea_title: "فكرة المشروع وطريقة تنفيذه:",
    modal_features_title: "المميزات والخصائص التقنية:",
    modal_tech_title: "التقنيات وأدوات التطوير المستخدمة:",
    modal_live_demo: "معاينة حية",
    modal_close: "إغلاق",

    // Previous Projects
    p1_title: "تطبيق طمَنِّي الطبي",
    p1_desc:
      "تطبيق طبي متكامل لإدارة الاستشارات وحجز المواعيد الطبية بكفاءة عالية.",
    p1_f1: "طلب معاينة وإدارة مواعيد أونلاين",
    p1_f2: "لوحة تحكم متكاملة (Admin Panel)",
    p2_title: "متجر إلكتروني متكامل",
    p2_desc:
      "متجر إلكتروني متكامل لإدارة المنتجات، السلة، وعمليات الشراء بسلاسة.",
    p2_f1: "نظام عرض وتسوق ديناميكي للمنتجات",
    p2_f2: "إدارة سلة المشتريات وحسابات العملاء",
    p3_title: "موقع Medilab الطبي",
    p3_desc: "موقع تعريفي لخدمات الرعاية الصحية والتحاليل الطبية بتصميم عصري.",
    p3_f1: "تصميم متجاوب وسلس لجميع الشاشات",
    p3_f2: "أقسام متقدمة للخدمات والأطباء",
    p4_title: "تطبيق وصفات Yummy",
    p4_desc: "تطبيق وصفات طعام عالمية يعتمد على جلب البيانات عبر الـ APIs.",
    p4_f1: "بحث وفلترة متقدمة للوجبات",
    p4_f2: "ربط مع واجهات برمجية خارجية (APIs)",
    p5_title: "تطبيق Geek التقني",
    p5_desc: "منصة تقنية مصممة خصيصاً لعرض المنتجات والأخبار التقنية الحديثة.",
    p5_f1: "تصميم هيكلي متناسق عبر Bootstrap",
    p5_f2: "تصفح سهل وسريع للمقالات والمنتجات",
    p6_title: "منصة Scholar التعليمية",
    p6_desc:
      "منصة تعليمية لعرض الدورات والبرامج الدراسية بطريقة تفاعلية مبسطة.",
    p6_f1: "أقسام مخصصة للدورات والمناهج",
    p6_f2: "واجهة مستخدم عصرية وسهلة الاستخدام",

    // New Projects AR
    p_rest_title: "موقع مطعم روبي",
    p_rest_desc: "موقع مطعم متجاوب يعرض أشهى الوجبات وقوائم الطعام المختلفة.",
    p_mealify_title: "تطبيق Mealify",
    p_mealify_desc: "تصميم منصة طعام ووصفات عصرية مصممة باستخدام HTML و CSS.",
    p_cafe_title: "تطبيق الكافيه",
    p_cafe_desc: "تطبيق ويب أنيق لمقهى تم بناؤه باستخدام إطار عمل Bootstrap.",
    p_login_title: "نظام تسجيل الدخول",
    p_login_desc:
      "نظام مصادقة آمن للمستخدمين مع شاشات تسجيل ودخول وتحقق من البيانات.",
    p_game_title: "تطبيق الألعاب",
    p_game_desc: "بوابة تطبيق ألعاب تفاعلية وممتعة مدعومة بلغة JavaScript.",
    p_portfolio_title: "المعرض الشخصي",
    p_portfolio_desc:
      "بورتفوليو احترافي ومودرن لمطورة واجهات باستخدام Tailwind CSS.",

    testimonials_title: "آراء العملاء",
    show_more_btn: "عرض المزيد من المشاريع (+)",
    show_less_btn: "عرض أقل (-)",
    contact_title: "تواصل معي",
    contact_name: "الاسم",
    contact_email: "البريد الإلكتروني",
    contact_message: "الرسالة",
    contact_submit: "إرسال الرسالة",
  },
};

let currentLang = localStorage.getItem("lang") || "en";
const langToggleBtn = document.getElementById("langToggle");

function applyLanguage(lang) {
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  langToggleBtn.textContent = lang === "ar" ? "EN" : "AR";

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    if (translations[lang] && translations[lang][key]) {
      element.textContent = translations[lang][key];
    }
  });
  localStorage.setItem("lang", lang);
}

applyLanguage(currentLang);

langToggleBtn.addEventListener("click", () => {
  currentLang = currentLang === "en" ? "ar" : "en";
  applyLanguage(currentLang);
});

// --- 2. Dark / Light Theme Switching ---
const moonIcon = document.getElementById("moon");
let theme = localStorage.getItem("theme") || "dark";

if (theme === "dark") {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}

moonIcon.addEventListener("click", () => {
  if (document.documentElement.classList.contains("dark")) {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  } else {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  }
});

// --- 3. Mobile Navigation Menu Toggle ---
const menuBtn = document.getElementById("menuBtn");
const dropdownMenu = document.getElementById("dropdownMenu");

menuBtn.addEventListener("click", () => {
  dropdownMenu.classList.toggle("hidden");
  dropdownMenu.classList.toggle("flex");
});

dropdownMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    dropdownMenu.classList.add("hidden");
    dropdownMenu.classList.remove("flex");
  });
});

// --- 4. Scroll To Top Button & Navbar Shadow ---
const scrollToTopBtn = document.querySelector(".scroll-to-top");
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollToTopBtn.classList.remove("hidden");
  } else {
    scrollToTopBtn.classList.add("hidden");
  }
});

scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// --- 5. Projects Filtering ---
const filterButtons = document.querySelectorAll(
  "#projects button[data-filter]",
);

const projectCards = document.querySelectorAll("#projectCards > div");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => {
      btn.classList.remove("bg-mainColor", "text-bgColor");
      btn.classList.add("text-slate-700", "dark:text-gray-200");
    });

    button.classList.add("bg-mainColor", "text-bgColor");
    button.classList.remove("text-slate-700", "dark:text-gray-200");

    const filterValue = button.getAttribute("data-filter");

    projectCards.forEach((card) => {
      const category = card.getAttribute("data-name");
      if (filterValue === "all" || category === filterValue) {
        card.classList.remove("hidden");
      } else {
        card.classList.add("hidden");
      }
    });
  });
});

// --- Project Details Modal ---
window.openModal = function (title, desc, features, techStack, link, imgsrc) {
  document.getElementById("modalTitle").textContent = title;
  document.getElementById("modalDesc").textContent = desc;
  document.getElementById("modalImg").src = imgsrc;
  document.getElementById("modalLink").href = link;

  // تعبئة المميزات
  const featuresList = document.getElementById("modalFeaturesList");
  featuresList.innerHTML = "";
  features.forEach((feature) => {
    const li = document.createElement("li");
    li.className =
      "text-sm sm:text-base text-slate-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/40 px-4 py-2.5 rounded-xl border border-gray-100 dark:border-gray-700/40 flex items-center gap-2";
    li.innerHTML = `<i class="fa-solid fa-check text-mainColor text-xs"></i> ${feature}`;
    featuresList.appendChild(li);
  });

  // تعبئة التقنيات
  const techList = document.getElementById("modalTechList");
  techList.innerHTML = "";
  techStack.forEach((tech) => {
    const span = document.createElement("span");
    span.className =
      "px-3.5 py-1.5 bg-mainColor/10 text-mainColor font-bold text-xs sm:text-sm rounded-xl border border-mainColor/20";
    span.textContent = tech;
    techList.appendChild(span);
  });

  document.getElementById("projectModal").classList.remove("hidden");
};

window.closeModal = function () {
  document.getElementById("projectModal").classList.add("hidden");
};

// إغلاق المودال عند النقر خارج الصندوق
window.addEventListener("click", (e) => {
  const modal = document.getElementById("projectModal");
  if (e.target === modal) {
    closeModal();
  }
});

// show more / less projects btn functionality
let showAllProjects = false;

window.toggleProjects = function () {
  showAllProjects = !showAllProjects;
  const projectCards = document.querySelectorAll("#projectCards > div");
  const btnTextSpan = document.querySelector("#toggleProjectsBtn span");
  const currentLang = localStorage.getItem("lang") || "en";

  projectCards.forEach((card, index) => {
    if (index >= 6) {
      if (showAllProjects) {
        card.classList.remove("hidden-project", "hidden");
      } else {
        card.classList.add("hidden-project", "hidden");
      }
    }
  });

  // تحديث نص الزر بناءً على الحالة واللغة الحالية
  if (showAllProjects) {
    btnTextSpan.setAttribute("data-i18n", "show_less_btn");
    btnTextSpan.textContent =
      currentLang === "ar" ? "عرض أقل (-)" : "Show Less (-)";
  } else {
    btnTextSpan.setAttribute("data-i18n", "show_more_btn");
    btnTextSpan.textContent =
      currentLang === "ar"
        ? "عرض المزيد من المشاريع (+)"
        : "Show More Projects (+)";

    // العودة بسلاسة إلى بداية سكشن المشاريع فوراً عند الضغط على "عرض أقل"
    document.getElementById("projects").scrollIntoView({ behavior: "smooth" });
  }
};

// إخفاء المشاريع الزائدة تلقائياً عند تحميل الصفحة لأول مرة
document.addEventListener("DOMContentLoaded", () => {
  const projectCards = document.querySelectorAll("#projectCards > div");
  projectCards.forEach((card, index) => {
    if (index >= 6) {
      card.classList.add("hidden-project", "hidden");
    }
  });
});

// --- 6. About Me Tabs Toggle ---
const tabBtns = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const targetTab = btn.getAttribute("data-tab");

    tabBtns.forEach((b) => {
      b.classList.remove("text-mainColor", "bg-mainColor/10");
      b.classList.add("text-slate-600", "dark:text-gray-300");
    });

    btn.classList.add("text-mainColor", "bg-mainColor/10");
    btn.classList.remove("text-slate-600", "dark:text-gray-300");

    tabContents.forEach((content) => {
      if (content.id === targetTab) {
        content.classList.remove("hidden");
        content.classList.add("block");
      } else {
        content.classList.add("hidden");
        content.classList.remove("block");
      }
    });
  });
});
