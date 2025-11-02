```html

<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8" />
  <title>一点AJAX</title>
  <style>
    body{font-family:Arial,Helvetica,sans-serif;margin:30px;background:#fafafa}
    section{border:1px solid #ddd;padding:15px;margin-bottom:20px;border-radius:6px;background:#fff}
    h3{margin-top:0;color:#39c5bb}
    pre{background:#f6f8fa;padding:10px;font-size:13px;white-space:pre-wrap;word-break:break-all}
    button{margin-right:8px;padding:6px 12px;cursor:pointer}
    input{padding:6px 8px;width:180px}
  </style>
</head>
<body>


  <!-- 1. Axios 实例 + 拦截器 + 重试 + 取消
  面试高频：「如何对 axios 二次封装」「取消请求有哪些方案」 -->

  <section>
    <h3>1. Axios 实例（带重试 + 取消）</h3>
    <button id="axiosBtn">获取 Todo（自动重试 3 次）</button>
    <button id="cancelBtn">取消请求</button>
    <pre id="axiosRes"></pre>
  </section>


  <!-- 2. Fetch 流式读取大文件
  知识点：res.body 是 ReadableStream，只能在浏览器环境使用；
  Node 18+ 有兼容实现，但 API 略有差异。 -->

  <section>
    <h3>2. Fetch 流式读取（模拟大文件）</h3>
    <button id="streamBtn">下载并分段显示</button>
    <pre id="streamRes">↓ 片段会逐行出现 ↓</pre>
  </section>


  <!-- 3. JSONP 跨域请求（百度联想接口）
  注意：1. 只支持 GET；2. 需要后端配合约定 callback 参数；     
  3. 必须清理全局回调，否则多次调用会内存泄漏。 -->

  <section>
    <h3>3. JSONP 获取百度联想词</h3>
    <input id="jsonpInp" placeholder="输入关键字" />
    <button id="jsonpBtn">JSONP 请求</button>
    <pre id="jsonpRes"></pre>
  </section>


  <!-- 4. CORS 预检 & 凭证（带 Cookie）
  常见问题：「Credentials 为 include 时，
  Access-Control-Allow-Origin 不能为 *」 -->

  <section>
    <h3>4. CORS 测试（需后端，代码已给出）</h3>
    <button id="corsBtn">发 POST 给后端</button>
    <pre id="corsRes"></pre>
  </section>

  <!-- 引入 axios -->
  <script src="https://cdn.jsdelivr.net/npm/axios@1.7.0/dist/axios.min.js"></script>

  <script>

    // //   ① 创建 axios 实例：统一 baseURL、超时、headers
    // //   好处：后续换环境（dev / prod）只需改一处

    // const http = axios.create({
    //   baseURL: 'https://jsonplaceholder.typicode.com',
    //   timeout: 3000   // 单位 ms，超过直接走拦截器错误分支（什么
    // });


    // //   请求拦截器：一般用来
    // //   - 追加公共头（如 token）
    // //   - 显示全屏 loading
    // //   - 打日志（灰度 & 排查）

    // http.interceptors.request.use(
    //   cfg => {
    //     console.log('[axios] 请求配置：', cfg.method?.toUpperCase(), cfg.url);
    //     // 例：cfg.headers['Authorization'] = getToken();
    //     return cfg;   // *** 必须返回，否则下游拿不到配置
    //   },
    //   err => Promise.reject(err)
    // );


    // //   响应拦截器：统一取 data & 错误重试
    // //    WeakMap 用法：用配置对象当 key，记录已重试次数
    // //   优点：不污染全局，且同一请求实例可复用

    // const retryMap = new WeakMap();   // 弱引用，自动 GC
    // http.interceptors.response.use(
    //   res => res.data,                // 直接返回业务数据
    //   async err => {
    //     const cfg = err.config;
    //     if (!cfg) return Promise.reject(err);   // 非网络错误
    //     const count = retryMap.get(cfg) ?? 0;
    //     if (count < 3) {
    //       retryMap.set(cfg, count + 1);
    //       console.warn(`[axios] 第 ${count + 1} 次重试`);
    //       return http(cfg);             // *** 重新发请求
    //     }
    //     return Promise.reject(err);
    //   }
    // );


    //   取消请求：两种主流方案
    //   1. 旧 cancelToken（已废弃，但仍在用）
    //   2. AbortController（推荐，fetch 和 axios 均支持）
    //   下方演示 cancelToken，方便你维护老代码

    let cancel = null;                  // 保存取消函数
    document.getElementById('axiosBtn').onclick = async () => {
      if (cancel) cancel();             // 如果上一次还没完，先取消
      http.get('/todos/1', {
        cancelToken: new axios.CancelToken(c => cancel = c)
      })
        .then(data => {
          document.getElementById('axiosRes').textContent = JSON.stringify(data, null, 2);
        })
        .catch(e => {
          if (axios.isCancel(e))
            document.getElementById('axiosRes').textContent = '[已取消] ' + e.message;
          else
            document.getElementById('axiosRes').textContent = '[最终失败] ' + e.message;
        });
    };
    document.getElementById('cancelBtn').onclick = () => cancel && cancel();


    //   ② Fetch 流式读取大文件
    //   场景：日志下载、视频边下边播、大 CSV 解析
    //   注意：reader.read() 每次返回 Uint8Array，需要 TextDecoder 逐块解码

    document.getElementById('streamBtn').onclick = async () => {
      const pre = document.getElementById('streamRes');
      pre.textContent = '';                // 清空旧数据
      const res = await fetch('https://jsonplaceholder.typicode.com/todos');
      const reader = res.body.getReader(); // ***拿到流读取器
      const decoder = new TextDecoder();   // 二进制 → 字符串
      let buf = '';                        // 残留不完整行
      while (true) {
        const {done, value} = await reader.read();
        if (done) break;
        buf += decoder.decode(value, {stream: true});
        const lines = buf.split('\n');
        buf = lines.pop();                 // 最后一行可能不完整，先缓存
        for (const l of lines) {
          try {
            const todo = JSON.parse(l);
            pre.textContent += todo.title + '\n';
          } catch (e) {
            // 非 JSON 行（如开头 "["）直接跳过
          }
        }
      }
    };

    // 果咩发烧了不想看了下周再说（


```
