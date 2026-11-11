/* ==========================================================================
   陶思涵 · 个人主页脚本
   顺序：主题 → 页头与导航 → 滚动入场 → 实验一（DOM）→ 实验二（盒模型）→ 实验三（留言板）
   全部使用原生 JavaScript，没有引入任何框架。
   ========================================================================== */
(function () {
  'use strict';

  var root = document.documentElement;
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ---------- 通用：安全读写本地存储 ---------- */
  var storage = {
    get: function (key) {
      try {
        return window.localStorage.getItem(key);
      } catch (error) {
        return null;
      }
    },
    set: function (key, value) {
      try {
        window.localStorage.setItem(key, value);
      } catch (error) {
        /* 隐私模式或存储已满时静默失败，不影响页面其他功能 */
      }
    }
  };

  /* ---------- 1. 深浅色主题 ---------- */
  function initTheme() {
    var toggle = document.getElementById('theme-toggle');
    if (!toggle) return;

    var meta = document.querySelector('meta[name="theme-color"]');
    var stored = storage.get('tsh-theme');
    var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = stored === 'dark' || stored === 'light' ? stored : (systemDark ? 'dark' : 'light');

    function apply(next) {
      theme = next;
      root.setAttribute('data-theme', theme);
      var isDark = theme === 'dark';
      toggle.setAttribute('aria-pressed', String(isDark));
      toggle.setAttribute('aria-label', isDark ? '切换到浅色模式' : '切换到深色模式');
      toggle.querySelector('.theme-toggle__icon').textContent = isDark ? '☀' : '◐';
      if (meta) meta.setAttribute('content', isDark ? '#0a0f1a' : '#f6f7fb');
    }

    apply(theme);

    toggle.addEventListener('click', function () {
      apply(theme === 'dark' ? 'light' : 'dark');
      storage.set('tsh-theme', theme);
    });

    // 用户没有手动选择过时，跟随系统设置变化
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (event) {
      if (!storage.get('tsh-theme')) apply(event.matches ? 'dark' : 'light');
    });
  }

  /* ---------- 2. 页头状态与移动端导航 ---------- */
  function initHeader() {
    var header = document.querySelector('.site-header');
    var toggle = document.getElementById('nav-toggle');
    var nav = document.getElementById('primary-nav');
    if (!header || !toggle || !nav) return;

    function closeNav() {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', '打开导航菜单');
    }

    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? '关闭导航菜单' : '打开导航菜单');
    });

    nav.addEventListener('click', function (event) {
      if (event.target.closest('a')) closeNav();
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closeNav();
    });

    document.addEventListener('click', function (event) {
      if (!nav.classList.contains('is-open')) return;
      if (!nav.contains(event.target) && !toggle.contains(event.target)) closeNav();
    });

    var headerScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    headerScroll();
    window.addEventListener('scroll', headerScroll, { passive: true });
  }

  /* ---------- 3. 滚动入场与当前栏目高亮 ---------- */
  function initReveal() {
    var items = document.querySelectorAll('.reveal');
    if (!items.length) return;

    if (prefersReducedMotion.matches || !('IntersectionObserver' in window)) {
      items.forEach(function (item) { item.classList.add('is-visible'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var siblings = Array.prototype.slice.call(entry.target.parentElement.children);
        var index = siblings.indexOf(entry.target);
        entry.target.style.transitionDelay = Math.min(index, 4) * 70 + 'ms';
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.16, rootMargin: '0px 0px -40px 0px' });

    items.forEach(function (item) { observer.observe(item); });
  }

  function initScrollSpy() {
    var links = Array.prototype.slice.call(document.querySelectorAll('.site-nav a[href^="#"]'));
    if (!links.length || !('IntersectionObserver' in window)) return;

    var map = {};
    links.forEach(function (link) {
      var id = link.getAttribute('href').slice(1);
      var section = document.getElementById(id);
      if (section) map[id] = link;
    });

    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (link) { link.classList.remove('is-active'); });
        var link = map[entry.target.id];
        if (link) link.classList.add('is-active');
      });
    }, { threshold: 0.2, rootMargin: '-35% 0px -55% 0px' });

    Object.keys(map).forEach(function (id) {
      spy.observe(document.getElementById(id));
    });
  }

  /* ---------- 4. 实验一：点击按钮，修改 DOM ---------- */
  function initGreeting() {
    var button = document.getElementById('hello-btn');
    var reset = document.getElementById('reset-hello');
    var message = document.getElementById('message');
    var counter = document.getElementById('click-count');
    if (!button || !message || !counter) return;

    var greetings = ['你好，大学！', '很高兴认识你！', '球场见！', '一起组个局？', '谢谢你来看我。'];
    var clicks = 0;

    function render() {
      message.textContent = clicks === 0 ? '等待点击' : greetings[(clicks - 1) % greetings.length];
      counter.textContent = String(clicks);
      message.title = clicks === 0 ? '' : '已更新 ' + clicks + ' 次';
      message.classList.toggle('highlight', clicks > 0);
      button.disabled = clicks >= greetings.length * 2;
      if (button.disabled) button.textContent = '先歇一会儿';
    }

    button.addEventListener('click', function () {
      clicks += 1;
      render();
    });

    if (reset) {
      reset.addEventListener('click', function () {
        clicks = 0;
        render();
      });
    }

    render();
  }

  /* ---------- 5. 实验二：盒模型换算 ---------- */
  function initBoxModel() {
    var box = document.getElementById('box-demo');
    var toggle = document.getElementById('box-toggle');
    var output = document.getElementById('box-width');
    if (!box || !toggle || !output) return;

    var borderBox = false;

    function measure() {
      var rect = box.getBoundingClientRect();
      var style = window.getComputedStyle(box);
      output.textContent = rect.width.toFixed(1) + ' px（内容宽 ' + style.width + '）';
      output.dataset.raw = rect.width.toFixed(1);
    }

    function render() {
      box.classList.toggle('is-border-box', borderBox);
      toggle.setAttribute('aria-pressed', String(borderBox));
      toggle.textContent = borderBox ? '切换为 content-box' : '切换为 border-box';
      measure();
    }

    toggle.addEventListener('click', function () {
      borderBox = !borderBox;
      render();
    });

    window.addEventListener('resize', measure);
    render();
  }

  /* ---------- 6. 实验三：留言板（校验 + 渲染 + 本地存储） ---------- */
  function initGuestbook() {
    var form = document.getElementById('guest-form');
    var nameInput = document.getElementById('guest-name');
    var messageInput = document.getElementById('guest-message');
    var list = document.getElementById('guest-list');
    var errorBox = document.getElementById('form-error');
    var empty = document.getElementById('guest-empty');
    if (!form || !nameInput || !messageInput || !list || !errorBox || !empty) return;

    var KEY = 'tsh-guestbook';
    var MAX = 8;
    var entries = [];

    try {
      var saved = JSON.parse(storage.get(KEY) || '[]');
      if (Array.isArray(saved)) entries = saved.slice(0, MAX);
    } catch (error) {
      entries = [];
    }

    function formatTime(iso) {
      var date = new Date(iso);
      if (isNaN(date.getTime())) return '';
      var pad = function (n) { return n < 10 ? '0' + n : String(n); };
      return (date.getMonth() + 1) + '月' + date.getDate() + '日 ' + pad(date.getHours()) + ':' + pad(date.getMinutes());
    }

    function render() {
      list.innerHTML = '';
      entries.forEach(function (entry) {
        var item = document.createElement('li');

        var name = document.createElement('strong');
        name.textContent = entry.name;

        var text = document.createElement('span');
        text.textContent = entry.message;

        var time = document.createElement('time');
        time.dateTime = entry.time;
        time.textContent = formatTime(entry.time);

        item.append(name, text, time);
        list.append(item);
      });

      empty.hidden = entries.length > 0;
      empty.textContent = entries.length ? '' : '还没有留言，来写第一条吧。';
    }

    function showError(text, input) {
      errorBox.textContent = text;
      errorBox.hidden = false;
      if (input) {
        input.setAttribute('aria-invalid', 'true');
        input.focus();
      }
    }

    function clearError() {
      errorBox.hidden = true;
      errorBox.textContent = '';
      nameInput.removeAttribute('aria-invalid');
      messageInput.removeAttribute('aria-invalid');
    }

    [nameInput, messageInput].forEach(function (input) {
      input.addEventListener('input', clearError);
    });

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var name = nameInput.value.trim();
      var text = messageInput.value.trim();

      if (!name) {
        showError('请先写一个称呼，1 到 12 个字。', nameInput);
        return;
      }
      if (name.length > 12) {
        showError('称呼最多 12 个字。', nameInput);
        return;
      }
      if (!text) {
        showError('留言内容不能为空。', messageInput);
        return;
      }
      if (text.length > 60) {
        showError('留言最多 60 个字，说重点就够啦。', messageInput);
        return;
      }

      clearError();
      entries.unshift({ name: name, message: text, time: new Date().toISOString() });
      entries = entries.slice(0, MAX);
      storage.set(KEY, JSON.stringify(entries));
      render();

      form.reset();
      nameInput.focus();
    });

    render();
  }

  /* ---------- 7. 页脚年份 ---------- */
  function initYear() {
    var year = document.getElementById('year');
    if (year) year.textContent = String(new Date().getFullYear());
  }

  /* ---------- 启动 ---------- */
  function start() {
    initTheme();
    initHeader();
    initReveal();
    initScrollSpy();
    initGreeting();
    initBoxModel();
    initGuestbook();
    initYear();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
