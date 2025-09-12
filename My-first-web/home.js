// 轮播图功能
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.carousel-dots .dot');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
let current = 0;
let timer = null;

function showSlide(idx) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === idx);
    dots[i].classList.toggle('active', i === idx);
  });
  current = idx;
}

function nextSlide() {
  showSlide((current + 1) % slides.length);
}

function prevSlide() {
  showSlide((current - 1 + slides.length) % slides.length);
}

dots.forEach((dot, i) => {
  dot.onclick = () => showSlide(i);
});

nextBtn.onclick = nextSlide;
prevBtn.onclick = prevSlide;

function autoPlay() {
  timer = setInterval(nextSlide, 3000);
}
function stopAutoPlay() {
  clearInterval(timer);
}

document.querySelector('.carousel').onmouseenter = stopAutoPlay;
document.querySelector('.carousel').onmouseleave = autoPlay;

autoPlay();

// 当前时间显示
function updateTime() {
  const now = new Date();
  document.getElementById('current-time').textContent = now.toLocaleTimeString();
}
setInterval(updateTime, 1000);
updateTime();

// 问候与时间
function updateTimeAndGreeting() {
  const now = new Date();
  const hour = now.getHours();
  let greeting = "你好";
  if (hour < 6) greeting = "凌晨好";
  else if (hour < 12) greeting = "早上好";
  else if (hour < 18) greeting = "下午好";
  else greeting = "晚上好";
  document.getElementById('greeting').textContent = greeting + "，祝你一天愉快！";
}
setInterval(updateTimeAndGreeting, 1000);
updateTimeAndGreeting();

// 科技小贴士
const quotes = [
  "保持好奇心，是科技进步的源动力。",
  "AI和大数据正在重塑我们的生活。",
  "量子计算将开启全新计算时代。",
  "5G让万物互联成为现实。",
  "持续学习，是科技人的必备素养。"
];
document.getElementById('quote-text').textContent = quotes[Math.floor(Math.random() * quotes.length)];

// 简易待办清单
const todoInput = document.getElementById('todo-input');
const todoItems = document.getElementById('todo-items');
let todos = [];

function renderTodos() {
  todoItems.innerHTML = '';
  todos.forEach((item, idx) => {
    const li = document.createElement('li');
    li.className = item.done ? 'done' : '';
    li.innerHTML = `<span>${item.text}</span>
      <button onclick="toggleTodo(${idx})">${item.done ? '✅' : '✔️'}</button>
      <button onclick="removeTodo(${idx})">🗑️</button>`;
    todoItems.appendChild(li);
  });
}
window.toggleTodo = function(idx) {
  todos[idx].done = !todos[idx].done;
  renderTodos();
};
window.removeTodo = function(idx) {
  todos.splice(idx, 1);
  renderTodos();
};
todoInput.addEventListener('keydown', function(e) {
  if (e.key === 'Enter' && this.value.trim()) {
    todos.push({ text: this.value.trim(), done: false });
    this.value = '';
    renderTodos();
  }
});
renderTodos();

// 弹窗基础
function showModal(title, content) {
  let modal = document.createElement('div');
  modal.className = 'custom-modal';
  modal.innerHTML = `
    <div class="modal-mask"></div>
    <div class="modal-content">
      <h2>${title}</h2>
      <div class="modal-body">${content}</div>
      <button class="modal-close">关闭</button>
    </div>
  `;
  document.body.appendChild(modal);
  modal.querySelector('.modal-close').onclick = () => document.body.removeChild(modal);
  modal.querySelector('.modal-mask').onclick = () => document.body.removeChild(modal);
}

// 智能搜索
document.getElementById('search-btn').onclick = function() {
  showModal('智能搜索', `<input type="text" id="modal-search-input" placeholder="输入内容回车搜索" style="width:90%;padding:8px;border-radius:6px;border:1px solid #ccc;">
    <div style="font-size:0.9rem;color:#aaa;margin-top:0.5rem;">按回车可用 Bing 搜索</div>
  `);
  setTimeout(() => {
    const input = document.getElementById('modal-search-input');
    if(input) {
      input.focus();
      input.onkeydown = function(e){
        if(e.key==='Enter'){
          window.open('https://www.bing.com/search?q='+encodeURIComponent(this.value),'_blank');
        }
      }
    }
  }, 100);
};

// AI蓝牙助手（模拟开关）
let bluetoothOn = false;
document.getElementById('bluetooth-btn').onclick = function() {
  bluetoothOn = !bluetoothOn;
  showModal('AI蓝牙助手', bluetoothOn ? '<span style="color:#4e8cff;">蓝牙已开启</span>' : '<span style="color:#aaa;">蓝牙已关闭</span>');
};

// 刷新对话
document.getElementById('refresh-btn').onclick = function() {
  showModal('刷新对话', '确定要刷新对话区吗？<br><button id="do-refresh" style="margin-top:1rem;padding:0.3rem 1.2rem;border:none;background:#007acc;color:#fff;border-radius:0.4rem;cursor:pointer;">刷新</button>');
  setTimeout(() => {
    const btn = document.getElementById('do-refresh');
    if(btn) btn.onclick = () => {
      const qaList = document.getElementById('qa-list');
      qaList.innerHTML = `<div style="color:#888;font-size:1rem;">👋 你好，我是你的AI助手，有什么可以帮你？</div>`;
      document.body.querySelector('.custom-modal')?.remove();
    };
  }, 100);
};

// 电量监控
document.getElementById('battery-btn').onclick = function() {
  if (navigator.getBattery) {
    navigator.getBattery().then(function(battery) {
      showModal('电量监控', `当前电量：<b>${Math.round(battery.level * 100)}%</b>`);
    });
  } else {
    showModal('电量监控', '无法获取电量信息');
  }
};

// 探索AI世界
document.getElementById('explore-btn').onclick = function() {
  window.open('https://www.bing.com', '_blank');
};

// 我的信息
document.getElementById('user-btn').onclick = function() {
  showModal('我的信息', '用户名：游客<br>欢迎使用AI助手！');
};

// 科技问答模拟（AI回复）
function askQuestion() {
  const input = document.getElementById('question-input');
  const qaList = document.getElementById('qa-list');
  const q = input.value.trim();
  if (!q) return;
  input.value = '';
  // 简单模拟AI回复
  const answers = {
    "什么是人工智能？": "人工智能（AI）是指使计算机系统能够执行通常需要人类智能的任务，如学习、推理、感知和语言理解的技术。",
    "5G和4G有什么区别？": "5G在速度、延迟和连接数量上都大幅超越4G，支持更快的数据传输和更多设备的同时接入。",
    "量子计算的应用有哪些？": "量子计算可应用于密码学、材料科学、药物研发、优化问题等领域。",
    "未来最有前景的科技职业？": "AI工程师、数据科学家、量子计算研究员、芯片设计师等都是未来极具前景的科技职业。"
  };
  let a = answers[q] || "这是一个很好的问题，建议你关注相关科技资讯或使用搜索引擎获取更详细答案。";
  // 展示问答
  qaList.innerHTML = `<div class="qa-q">Q: ${q}</div><div class="qa-a">A: ${a}</div>` + qaList.innerHTML;
}

// 热门问题快捷提问
function quickAsk(q) {
  document.getElementById('question-input').value = q;
  askQuestion();
}

// 弹窗样式（只需插入一次）
if (!document.getElementById('modal-style')) {
  const modalStyle = document.createElement('style');
  modalStyle.id = 'modal-style';
  modalStyle.innerHTML = `
.custom-modal {position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:999;}
.custom-modal .modal-mask {position:absolute;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.25);}
.custom-modal .modal-content {position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);background:#23243a;color:#fff;padding:2rem 2.5rem;border-radius:1rem;box-shadow:0 8px 32px rgba(31,38,135,0.18);}
.custom-modal .modal-content h2 {margin-top:0;}
.custom-modal .modal-close {margin-top:1.5rem;padding:0.5rem 1.5rem;border:none;background:#007acc;color:#fff;border-radius:0.5rem;cursor:pointer;}
.custom-modal input[type="text"] {background:#23243a;color:#fff;border:1px solid #007acc;}
`;
  document.head.appendChild(modalStyle);
}