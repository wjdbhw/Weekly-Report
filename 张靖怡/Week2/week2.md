#  AJAX 

---

## 学习笔记
（写在前面一点的非操作相关问题：  
AJAX本质：  
用浏览器提供的异步 API（早期 XMLHttpRequest，现代 fetch）在不刷新整页的前提下，与服务器交换数据并更新局部界面。  
全称：异步 JS + XML 技术，实现**不刷新整页**与服务器交换数据。  
早期 XML，现在主流 JSON（熟悉）  
前后端分离，拿取接口数据  
面试相关问题：跨域、CORS、JSONP、拦截器、axios 二次封装、请求取消、错误重试等。  

1. Axios 通用实例  
   - 通过 `axios.create({baseURL, timeout, headers})` 统一管理接口地址与超时。  
   - 请求/响应拦截器：  
     ```js
     axios.interceptors.request.use(cfg=&gt;{...}, err=&gt;Promise.reject(err));
     axios.interceptors.response.use(res=&gt;res.data, err=&gt;{...});
     ```
2. fetch 进阶  
   - 默认不带 Cookie，需手动 `credentials: 'include'`。  
   - 流式读取大文件：  
     ```js
     const reader = res.body.getReader();
     ```
3. 同源策略 & 跨域方案  
   | 方案 | 原理 | 适用场景 |
   |---|---|---|
   | CORS | 后端加响应头 `Access-Control-Allow-Origin` | 标准 REST 接口 |
   | JSONP | 利用 `&lt;script&gt;` 标签无跨域限制，前端定义回调 | 仅 GET，老旧浏览器 |
   | jQuery-jsonp | `$.ajax({dataType:'jsonp'})` 自动拼装 callback | 快速兼容 |
4.  JSONP 工具函数（支持自定义 callback 名、超时处理）：
   ```js
   function jsonp({url,params,timeout=5000}){
     return new Promise((resolve,reject)=&gt;{
       const cb = 'cb'+Date.now();
       const script = document.createElement('script');
       script.src = `${url}?${new URLSearchParams({...params,callback:cb})}`;
       window[cb]=resolve;
       script.onerror=()=&gt;reject('jsonp error');
       setTimeout(()=&gt;{reject('timeout');delete window[cb];},timeout);
       document.body.appendChild(script);
     });
   }
```

## 遇到难题 & 解决方法

| 困难 / 问题 | 解决方法 |
|-------------|----------|
| Axios 拦截器循环引用 | 在拦截器里忘记 `return config` 导致死循环 → 保证请求拦截器最后 `return config` |
| fetch 大文件内存暴涨 | 改用 `res.body.getReader()` 流式读取，分段处理 |
| JSONP 回调名冲突 | 使用时间戳+随机字符串生成唯一 callback，请求完成后 `delete window[callback]}` |
| CORS 预检 404 | 后端路由未处理 OPTIONS 方法 → 加一条 `app.options('*', cors())` |
