# CSS 学习周报

## 本周重点
- CSS选择器与优先级
- 盒模型与布局
- 常用样式属性
- 响应式设计基础

## 核心知识

### 选择器类型
标签选择器：p { }
类选择器：.class { }
ID选择器：#id { }
伪类选择器：:hover { }
群组选择器：h1, h2, h3 { }


### 盒模型
width/height # 宽高
padding # 内边距
margin # 外边距
border # 边框
box-sizing # 盒模型计算方式


### 常用布局
Flex布局：
display: flex;
justify-content: center;
align-items: center;

居中方法：
text-align: center; # 文字居中
margin: 0 auto; # 块级元素居中


### 常用样式
文字样式：
font-size: 16px;
color: #333;
text-align: center;
line-height: 1.5;

背景与边框：
background: #f0f0f0;
border: 1px solid #ccc;
border-radius: 5px;

显示属性：
display: block | inline | inline-block | none;
visibility: visible | hidden;

定位：
position: static | relative | absolute | fixed;



### 动画效果
过渡：
transition: all 0.3s ease;

变换：
transform: scale(1.1) rotate(10deg);

悬停效果：
:hover { color: red; }
:active { transform: scale(0.95); }


## 实用技巧
1. 外部样式表最常用，便于维护
2. Flex布局是现代布局首选
3. 伪类选择器实现交互效果
4. 盒模型是CSS布局基础

## 学习心得
掌握了CSS基础语法和常用布局方式，能够实现简单的页面样式和交互效果。需要继续练习响应式设计和复杂布局。