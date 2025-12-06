# JavaScript学习笔记周报（2025.12.01-2025.12.06）

**学习周期**：2025年12月1日 - 2025年12月6日
**学习目标**：掌握JavaScript基础语法进阶、理解函数核心特性、初识DOM操作

## 一、本周学习核心内容

### 1. 基础语法进阶

- **变量作用域与提升**：明确全局作用域、函数作用域、块级作用域（let/const）的区别。var存在变量提升且作用域穿透问题，let/const通过块级作用域解决该问题，其中const声明的常量不可修改引用（复杂数据类型内部属性可改）。
示例：
        `console.log(varVar); // undefined（变量提升）
console.log(letVar); // 报错（块级作用域无提升）
var varVar = "var变量";
let letVar = "let变量";

if (true) {
  var globalVar = "全局作用域";
  let blockVar = "块级作用域";
}
console.log(globalVar); // "全局作用域"
console.log(blockVar); // 报错（未定义）`

- **数据类型深度理解**：复习基本数据类型（string/number/boolean/undefined/null/symbol/bigint）与引用数据类型（object/array/function），重点掌握引用类型的赋值与比较逻辑——赋值传递的是引用地址，比较的是地址是否相同而非内容。

- **运算符拓展**：掌握逻辑运算符短路求值特性（&&遇假返回，||遇真返回）、三元运算符嵌套使用场景，理解typeof与instanceof的区别（typeof判断基本类型，instanceof判断原型链关系）。

### 2. 函数核心特性

- **函数声明与表达式**：函数声明（function fn(){}）存在函数提升，可在声明前调用；函数表达式（const fn = function(){}）无提升，需先定义再使用。箭头函数是函数表达式的简化形式，不绑定this、arguments。
示例：
        `// 函数声明提升
fn1(); // "函数声明"
function fn1() {
  console.log("函数声明");
}

// 函数表达式无提升
fn2(); // 报错
const fn2 = function() {
  console.log("函数表达式");
};

// 箭头函数
const add = (a, b) => a + b;
console.log(add(2, 3)); // 5`

- **闭包原理与应用**：闭包是函数嵌套中，内层函数引用外层函数变量，导致外层函数作用域不被释放的现象。核心作用是实现变量私有化、保存函数执行状态。
示例（变量私有化）：
        `function createCounter() {
  let count = 0; // 私有变量，外部无法直接访问
  return {
    increment: () => count++,
    getCount: () => count
  };
}

const counter = createCounter();
counter.increment();
console.log(counter.getCount()); // 1
console.log(counter.count); // undefined`

- **this指向规则**：this指向调用者，不同场景指向不同——普通函数调用指向window（严格模式下为undefined）、对象方法调用指向对象、构造函数调用指向实例、apply/call/bind可手动改变this指向。

### 3. 初识DOM操作

- **DOM概念**：文档对象模型，将HTML文档解析为树形结构，每个节点都是对象，通过JavaScript可操作这些节点实现页面交互。

- **基础节点操作**：掌握通过id（getElementById）、类名（getElementsByClassName）、标签名（getElementsByTagName）获取元素，学习innerHTML（获取/设置元素内容，包含标签）与innerText（仅获取文本内容）的区别，实现元素样式修改（style属性）。
示例：
        `// 获取元素
const title = document.getElementById("main-title");
const items = document.getElementsByClassName("list-item");

// 修改内容与样式
title.innerText = "DOM操作示例";
title.style.color = "#3366ff";
title.style.fontSize = "24px";

// 遍历元素集合
for (let i = 0; i < items.length; i++) {
  items[i].style.margin = "10px 0";
}`

## 二、实战案例总结

### 1. 简易计数器（闭包应用）

**功能**：实现计数累加、累减、重置功能，变量count私有化，外部无法篡改。
**核心亮点**：利用闭包封装私有变量，通过暴露方法控制计数逻辑，符合模块化思想。

### 2. 动态列表（DOM操作）

**功能**：输入内容后点击按钮添加到列表，点击列表项可删除该条目。
**核心知识点**：获取输入框值、创建新节点（createElement）、添加节点（appendChild）、删除节点（removeChild）、事件绑定（onclick）。
关键代码片段：
      `// 添加列表项
const addBtn = document.getElementById("add-btn");
const input = document.getElementById("item-input");
const list = document.getElementById("item-list");

addBtn.onclick = function() {
  const value = input.value.trim();
  if (!value) return;
  // 创建新节点
  const li = document.createElement("li");
  li.innerText = value;
  // 绑定删除事件
  li.onclick = function() {
    list.removeChild(this);
  };
  // 添加到列表
  list.appendChild(li);
  // 清空输入框
  input.value = "";
};`

## 三、问题与解决方案

|问题描述|原因分析|解决方案|
|---|---|---|
|箭头函数中使用this指向错误|箭头函数不绑定自身this，继承外层作用域的this|1. 普通对象方法不使用箭头函数；2. 若需固定this，在外部保存this（const _this = this）或使用bind|
|getElementsByClassName获取的集合无法使用forEach遍历|该方法返回的是HTMLCollection，不是数组，无forEach方法|1. 转换为数组：Array.from(collection)；2. 使用for循环遍历；3. 扩展运算符：[...collection]|
|闭包导致变量未释放，出现内存泄漏隐患|内层函数长期引用外层函数变量，导致外层作用域无法被垃圾回收|1. 不需要时手动解除引用（如将内层函数设为null）；2. 避免不必要的闭包嵌套|
