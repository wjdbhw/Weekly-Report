
// 1. 作用域和作用域链
// 作用域：变量和函数的可访问范围
// 作用域链：在当前作用域找不到变量时，会向父级作用域查找，形成链式结构

function outer() {
    const outerVar = '我在外部';
    
    function inner() {
        const innerVar = '我在内部';
        console.log(outerVar); // 可以访问外部变量 - 作用域链
        console.log(innerVar); // 可以访问内部变量
    }
    
    inner();

    // console.log(innerVar); // 报错：innerVar未定义 - 外部无法访问内部
}

outer();

// 2. 垃圾回收机制
// JS自动管理内存，主要使用标记清除算法
// 引用计数（已较少使用）- 循环引用问题

function garbageCollectionDemo() {
    let obj1 = { name: 'obj1' };
    let obj2 = { name: 'obj2' };
    
    obj1.ref = obj2; // 相互引用
    obj2.ref = obj1;
    
    obj1 = null; // 断开引用，但obj1和obj2仍在相互引用
    obj2 = null; // 现在都可以被回收了
}

// 3. 闭包 - 重难点
// 函数嵌套函数，内部函数可以访问外部函数的变量
// 即使外部函数执行完毕，内部函数仍能访问外部函数的变量

function createCounter() {
    let count = 0; // 私有变量
    
    return {
        increment: function() {
            count++;
            return count;
        },
        decrement: function() {
            count--;
            return count;
        },
        getValue: function() {
            return count;
        }
    };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.getValue()); // 2

// 4. 变量提升和函数提升
console.log(hoistedVar); // undefined - 变量提升
var hoistedVar = '我被提升了';

sayHello(); //  函数提升
function sayHello() {
    console.log('Hello!');
}

// let/const 也有提升，但存在暂时性死区
// console.log(letVar); // 报错
let letVar = '使用let';

// 5. 剩余参数和展开运算符
// 剩余参数：将多个参数收集到数组中
function sum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}
console.log(sum(1, 2, 3, 4)); // 10

// 展开运算符：将数组展开为单个元素
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2];
console.log(combined); // [1, 2, 3, 4, 5, 6]

// 6. 箭头函数
// 简洁语法，没有自己的this，arguments，super
const numbers = [1, 2, 3, 4, 5];

// 普通函数
const doubled1 = numbers.map(function(num) {
    return num * 2;
});

// 箭头函数
const doubled2 = numbers.map(num => num * 2);

// this绑定差异
const obj = {
    name: '对象',
    regularFunc: function() {
        console.log(this.name); // '对象'
    },
    arrowFunc: () => {
        console.log(this.name); // undefined - 指向外层this
    }
};

// 7. 数组解构
const colors = ['red', 'green', 'blue', 'yellow'];

// 基本解构
const [first, second] = colors;
console.log(first, second); // red green

// 跳过元素
const [,, third] = colors;
console.log(third); // blue

// 默认值
const [primary = 'red', secondary = 'green'] = ['purple'];
console.log(primary, secondary); // purple green

// 交换变量
let a = 1, b = 2;
[a, b] = [b, a];
console.log(a, b); // 2 1

// 解构函数返回值
function getCoordinates() {
    return [10, 20, 30];
}
const [x, y, z] = getCoordinates();


/*

*/

