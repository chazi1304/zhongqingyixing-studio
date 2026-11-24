/* =========================================================
   知情意行青春实践师生工作室 · 对外平台
   Shared interactions
   ========================================================= */

(function () {
  "use strict";

  const body = document.body;
  const page = body.dataset.page || "";
  const header = document.querySelector(".site-header");
  const menuButton = document.querySelector("[data-menu-open]");
  const mobilePanel = document.querySelector("[data-mobile-panel]");
  const mobileClose = document.querySelector("[data-menu-close]");
  const searchModal = document.querySelector("[data-search-modal]");
  const searchInput = document.querySelector("[data-search-input]");
  const searchResults = document.querySelector("[data-search-results]");
  const searchOpeners = document.querySelectorAll("[data-search-open]");
  const searchClosers = document.querySelectorAll("[data-search-close]");

  /* ---------- active navigation ---------- */

  document.querySelectorAll("[data-nav]").forEach(function (link) {
    if (link.dataset.nav === page) {
      link.setAttribute("aria-current", "page");
    }
  });

  /* ---------- header scroll state ---------- */

  function updateHeader() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 16);
  }

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  /* ---------- mobile menu ---------- */

  let lastFocused = null;

  function openMenu() {
    if (!mobilePanel) return;
    lastFocused = document.activeElement;
    mobilePanel.classList.add("is-open");
    mobilePanel.removeAttribute("aria-hidden");
    body.classList.add("nav-open");
    if (menuButton) menuButton.setAttribute("aria-expanded", "true");
    const first = mobilePanel.querySelector("a, button");
    if (first) first.focus();
  }

  function closeMenu() {
    if (!mobilePanel) return;
    mobilePanel.classList.remove("is-open");
    mobilePanel.setAttribute("aria-hidden", "true");
    body.classList.remove("nav-open");
    if (menuButton) menuButton.setAttribute("aria-expanded", "false");
    if (lastFocused) lastFocused.focus();
  }

  if (menuButton) {
    menuButton.addEventListener("click", function () {
      if (mobilePanel && mobilePanel.classList.contains("is-open")) closeMenu();
      else openMenu();
    });
  }

  if (mobileClose) mobileClose.addEventListener("click", closeMenu);

  if (mobilePanel) {
    mobilePanel.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });
  }

  /* ---------- search ---------- */

  const searchIndex = [
    { href: "index.html", label: "首页", group: "页面", title: "在真实世界里做研究，让实践留下作品" },
    { href: "index.html#featured", label: "首发案例", group: "首页", title: "三个代表案例，横向自动轮播" },
    { href: "index.html#news", label: "知情意行动态", group: "首页", title: "竖向滚动的工作室日志" },
    { href: "practice.html", label: "实践项目", group: "页面", title: "实践地图与项目档案" },
    { href: "practice.html#projects", label: "项目列表", group: "实践项目", title: "按年份、实践地与主题浏览" },
    { href: "practice.html#archive", label: "实践地档案", group: "实践项目", title: "把多次记录聚在一起" },
    { href: "practice.html#stories", label: "实践故事", group: "实践项目", title: "支教日记、人物与实践点滴" },
    { href: "outcomes.html", label: "成果专题", group: "页面", title: "旗舰专题与专题列表" },
    { href: "outcomes.html#poetry", label: "乡土诗集", group: "成果专题", title: "旗舰专题位" },
    { href: "outcomes.html#specials", label: "专题列表", group: "成果专题", title: "诗集、影像、3D、知芽 IP 与展览" },
    { href: "about.html", label: "关于知情意行", group: "页面", title: "谁在做，为什么做" },
    { href: "about.html#story", label: "工作室介绍", group: "关于知情意行", title: "我们相信的事与工作方式" },
    { href: "about.html#departments", label: "部门介绍", group: "关于知情意行", title: "知芽工作部、心焰融媒部、意炬先锋部、萤光知行部、青蓝研创中心" },
    { href: "about.html#people", label: "团队与任务", group: "关于知情意行", title: "指导老师、核心团队、部门负责人、成员与校友" },
    { href: "about.html#honors", label: "过往荣誉", group: "关于知情意行", title: "按年份整理的荣誉索引" },
    { href: "about.html#notes", label: "工作室日志", group: "关于知情意行", title: "培训、试讲、团队日常与公告" },
    { href: "join.html", label: "加入我们", group: "页面", title: "一起做一件能留下来的事" },
    { href: "join.html#opportunities", label: "当前机会", group: "加入我们", title: "招新、志愿、活动与讲座" },
    { href: "join.html#roles", label: "角色", group: "加入我们", title: "内容、设计、技术、运营、影像、研究" },
    { href: "join.html#submit", label: "投稿与推荐", group: "加入我们", title: "学部投稿、内容自荐与线索推荐" },
    { href: "join.html#cooperation", label: "校企合作", group: "加入我们", title: "项目合作、实习基地、共建课程" },
    { href: "project-detail.html", label: "项目详情模板", group: "模板", title: "背景、行动、留下、故事、成果、参与" },
    { href: "special-detail.html", label: "专题详情模板", group: "模板", title: "策展前言、章节、来源实践与分享" },
    { href: "article-detail.html", label: "文章详情模板", group: "模板", title: "技术博客、支教日记与实践记录" }
  ];

  function renderSearch(query) {
    if (!searchResults) return;
    const q = query.trim().toLowerCase();
    const items = q
      ? searchIndex.filter(function (item) {
          return (item.label + " " + item.group + " " + item.title).toLowerCase().includes(q);
        })
      : searchIndex.slice(0, 8);

    if (!items.length) {
      searchResults.innerHTML = '<p class="search-empty">没有找到匹配的栏目。试试“实践”“部门”“加入”或“专题”。</p>';
      return;
    }

    searchResults.innerHTML = items
      .map(function (item) {
        return (
          '<a class="search-result" href="' + item.href + '">' +
          "<span>" + item.group + "</span>" +
          "<strong>" + item.label + "</strong>" +
          "<small>" + item.title + "</small>" +
          "</a>"
        );
      })
      .join("");
  }

  function openSearch() {
    if (!searchModal) return;
    lastFocused = document.activeElement;
    searchModal.hidden = false;
    body.classList.add("search-open");
    renderSearch("");
    window.setTimeout(function () {
      if (searchInput) searchInput.focus();
    }, 30);
  }

  function closeSearch() {
    if (!searchModal) return;
    searchModal.hidden = true;
    body.classList.remove("search-open");
    if (lastFocused) lastFocused.focus();
  }

  searchOpeners.forEach(function (button) {
    button.addEventListener("click", openSearch);
  });

  searchClosers.forEach(function (button) {
    button.addEventListener("click", closeSearch);
  });

  if (searchModal) {
    searchModal.addEventListener("click", function (event) {
      if (event.target === searchModal) closeSearch();
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", function () {
      renderSearch(searchInput.value);
    });
  }

  /* ---------- keyboard ---------- */

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      if (searchModal && !searchModal.hidden) closeSearch();
      if (mobilePanel && mobilePanel.classList.contains("is-open")) closeMenu();
    }

    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      openSearch();
    }
  });

  /* ---------- filters ---------- */

  document.querySelectorAll("[data-filter-group]").forEach(function (group) {
    const buttons = group.querySelectorAll("[data-filter]");
    const targetSelector = group.dataset.filterGroup;
    const target = document.querySelector(targetSelector);
    if (!target) return;
    const cards = Array.from(target.querySelectorAll("[data-category]"));
    const empty = target.parentElement.querySelector("[data-filter-empty]");

    function applyFilter(filter) {
      let visible = 0;
      cards.forEach(function (card) {
        const show = filter === "all" || card.dataset.category === filter;
        card.hidden = !show;
        if (show) visible += 1;
      });
      buttons.forEach(function (button) {
        const active = button.dataset.filter === filter;
        button.classList.toggle("is-active", active);
        button.setAttribute("aria-pressed", active ? "true" : "false");
      });
      if (empty) empty.classList.toggle("is-visible", visible === 0);
    }

    buttons.forEach(function (button) {
      button.addEventListener("click", function () {
        applyFilter(button.dataset.filter || "all");
      });
    });

    applyFilter(group.dataset.defaultFilter || "all");
  });

  /* ---------- accordion ---------- */

  document.querySelectorAll(".accordion__trigger").forEach(function (trigger) {
    trigger.addEventListener("click", function () {
      const item = trigger.closest(".accordion__item");
      if (!item) return;
      const open = item.classList.toggle("is-open");
      trigger.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });

  /* ---------- demo forms ---------- */

  document.querySelectorAll("[data-demo-form]").forEach(function (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const result = form.querySelector("[data-form-result]");
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      if (result) {
        result.textContent =
          "演示模式：表单校验通过，但当前未连接后端。正式上线前，请把 form 的 action 指向你的表单服务，或接入学校/工作室的收集系统。";
        result.classList.add("is-visible");
      }
      form.reset();
    });
  });

  /* ---------- case carousel ---------- */

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.querySelectorAll("[data-carousel]").forEach(function (root) {
    const track = root.querySelector("[data-carousel-track]");
    const slides = track ? Array.from(track.children) : [];
    const prev = root.querySelector("[data-carousel-prev]");
    const next = root.querySelector("[data-carousel-next]");
    const count = root.querySelector("[data-carousel-count]");
    const dots = Array.from(root.querySelectorAll("[data-carousel-dot]"));
    if (!track || slides.length < 2) return;

    let index = 0;
    let timer = null;

    function pad(n) {
      return String(n).padStart(2, "0");
    }

    function go(nextIndex) {
      index = (nextIndex + slides.length) % slides.length;
      track.style.transform = "translateX(-" + index * 100 + "%)";
      if (count) count.textContent = pad(index + 1) + " / " + pad(slides.length);
      dots.forEach(function (dot, dotIndex) {
        dot.classList.toggle("is-active", dotIndex === index);
        dot.setAttribute("aria-current", dotIndex === index ? "true" : "false");
      });
    }

    function stop() {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    }

    function start() {
      stop();
      if (reduceMotion) return;
      timer = window.setInterval(function () {
        go(index + 1);
      }, 5500);
    }

    if (prev) prev.addEventListener("click", function () { go(index - 1); start(); });
    if (next) next.addEventListener("click", function () { go(index + 1); start(); });
    dots.forEach(function (dot, dotIndex) {
      dot.addEventListener("click", function () { go(dotIndex); start(); });
    });

    root.addEventListener("mouseenter", stop);
    root.addEventListener("mouseleave", start);
    root.addEventListener("focusin", stop);
    root.addEventListener("focusout", function (event) {
      if (!root.contains(event.relatedTarget)) start();
    });
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) stop();
      else start();
    });

    go(0);
    start();
  });

  /* ---------- vertical news ticker ---------- */

  document.querySelectorAll("[data-ticker]").forEach(function (root) {
    const track = root.querySelector("[data-ticker-track]");
    const items = track ? Array.from(track.children) : [];
    const visible = Number(root.dataset.visible || 4);
    if (!track || items.length <= visible) return;

    let index = 0;
    let timer = null;

    function rowHeight() {
      return items[0] ? items[0].getBoundingClientRect().height : 54;
    }

    function go(nextIndex) {
      index = nextIndex;
      track.style.transform = "translateY(-" + index * rowHeight() + "px)";
    }

    function stop() {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    }

    function start() {
      stop();
      if (reduceMotion) return;
      timer = window.setInterval(function () {
        const maxIndex = Math.max(0, items.length - visible);
        if (index >= maxIndex) {
          track.style.transition = "none";
          go(0);
          // Restore the transition after the jump.
          window.requestAnimationFrame(function () {
            track.style.transition = "";
          });
        } else {
          go(index + 1);
        }
      }, 3800);
    }

    root.addEventListener("mouseenter", stop);
    root.addEventListener("mouseleave", start);
    root.addEventListener("focusin", stop);
    root.addEventListener("focusout", function (event) {
      if (!root.contains(event.relatedTarget)) start();
    });
    window.addEventListener("resize", function () {
      go(index);
    });

    go(0);
    start();
  });

  /* ---------- current year ---------- */

  document.querySelectorAll("[data-year]").forEach(function (node) {
    node.textContent = new Date().getFullYear();
  });
})();
