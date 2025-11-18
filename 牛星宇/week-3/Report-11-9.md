
### 一、本周学习目标
1. 理解Java反射的核心概念与设计初衷
2<doubaocanvas>获取方式及常用API
3. 学会通过反射操作构造方法、成员变量、成员方法
4. 结合实际场景应用反射实现灵活编程
5. 了解反射的优缺点及使用注意事项

### 二、核心知识梳理
#### （一）反射基础概念
- **定义**：Java反射机制是指程序在运行时能够获取自身的信息，并能操作类或对象的属性、方法、构造器等成分的能力（即“动态获取信息+动态操作对象”）。
- **核心原理**：通过JVM加载的`Class`对象（类的字节码文件在内存中的映射），反向解析类的结构信息。
- **核心类**：位于`java.lang.reflect`包下，包括`Class`、`Constructor`、`Field`、`Method`、`Modifier`等。

#### （二）Class对象的获取方式
| 获取方式 | 代码示例 | 适用场景 |
|----------|----------|----------|
| 类名.class | `Class<?> clazz = String.class;` | 已知具体类，编译期确定 |
| 对象.getClass() | `String str = "test"; Class<?> clazz = str.getClass();` | 已知对象实例 |
| Class.forName(全类名) | `Class<?> clazz = Class.forName("java.lang.String");` | 动态加载类，编译期未知类名（最常用） |
| 类加载器.loadClass(全类名) | `ClassLoader loader = Thread.currentThread().getContextClassLoader(); Class<?> clazz = loader.loadClass("java.lang.String");` | 自定义类加载场景 |

#### （三）反射核心操作
##### 1. 操作构造方法（Constructor）
- 获取构造器：
  - `getConstructor(Class<?>... parameterTypes)`：获取public修饰的指定参数构造器
  - `getDeclaredConstructor(Class<?>... parameterTypes)`：获取任意访问权限的指定参数构造器
  - `getConstructors()`：获取所有public构造器
  - `getDeclaredConstructors()`：获取所有构造器
- 创建对象：
  ```java
  Class<?> clazz = User.class;
  // 无参构造（需public）
  User user1 = (User) clazz.newInstance();
  // 有参构造（需先设置可访问，突破private限制）
  Constructor<?> constructor = clazz.getDeclaredConstructor(String.class, int.class);
  constructor.setAccessible(true); // 关键：取消访问检查
  User user2 = (User) constructor.newInstance("张三", 20);
  ```

##### 2. 操作成员变量（Field）
- 获取字段：
  - `getField(String name)`：获取public修饰的指定字段
  - `getDeclaredField(String name)`：获取任意访问权限的指定字段
  - `getFields()`：获取所有public字段
  - `getDeclaredFields()`：获取所有字段
- 读写字段值：
  ```java
  Class<?> clazz = User.class;
  User user = (User) clazz.newInstance();
  Field ageField = clazz.getDeclaredField("age");
  ageField.setAccessible(true); // 突破private限制
  ageField.set(user, 25); // 赋值：user.setAge(25)
  int age = (int) ageField.get(user); // 取值：user.getAge()
  ```

##### 3. 操作成员方法（Method）
- 获取方法：
  - `getMethod(String name, Class<?>... parameterTypes)`：获取public修饰的指定方法
  - `getDeclaredMethod(String name, Class<?>... parameterTypes)`：获取任意访问权限的指定方法
  - `getMethods()`：获取所有public方法（包括父类继承的）
  - `getDeclaredMethods()`：获取当前类的所有方法（不包括父类）
- 调用方法：
  ```java
  Class<?> clazz = User.class;
  User user = (User) clazz.newInstance();
  // 调用无参方法
  Method showMethod = clazz.getDeclaredMethod("show");
  showMethod.setAccessible(true);
  showMethod.invoke(user); // 等价于 user.show()
  // 调用有参方法
  Method setNameMethod = clazz.getDeclaredMethod("setName", String.class);
  setNameMethod.invoke(user, "李四"); // 等价于 user.setName("李四")
  ```

#### （四）反射的优缺点
| 优点 | 缺点 |
|------|------|
| 灵活性高：动态加载类、操作私有成员，适配不确定场景（如框架开发） | 性能开销：比直接调用慢（需解析字节码、取消访问检查） |
| 解耦：减少类之间的依赖，提高代码扩展性 | 安全性降低：突破访问权限限制，可能破坏封装性 |
| 可扩展性强：支持动态代理、注解解析等高级特性 | 可读性差：代码相对繁琐，调试难度大 |

### 三、实践案例：基于反射的对象属性复制工具
```java
/**
 * 利用反射实现不同对象间同名属性复制（忽略访问权限）
 */
public class BeanCopyUtil {
    public static <T, S> T copyProperties(S source, Class<T> targetClass) throws Exception {
        // 1. 创建目标对象实例
        T target = targetClass.newInstance();
        // 2. 获取源对象和目标对象的所有字段
        Field[] sourceFields = source.getClass().getDeclaredFields();
        Field[] targetFields = targetClass.getDeclaredFields();
        // 3. 遍历字段，复制同名属性值
        for (Field sourceField : sourceFields) {
            sourceField.setAccessible(true);
            for (Field targetField : targetFields) {
                targetField.setAccessible(true);
                // 字段名相同且类型一致时复制
                if (sourceField.getName().equals(targetField.getName()) 
                        && sourceField.getType().equals(targetField.getType())) {
                    targetField.set(target, sourceField.get(source));
                    break;
                }
            }
        }
        return target;
    }

    // 测试
    public static void main(String[] args) throws Exception {
        User source = new User("张三", 20);
        UserDTO target = copyProperties(source, UserDTO.class);
        System.out.println(target.getName() + ":" + target.getAge()); // 输出：张三:20
    }
}
```

### 四、遇到的问题及解决方案
| 问题描述 | 解决方案 |
|----------|----------|
| 调用private构造器/方法时抛出IllegalAccessException | 调用`setAccessible(true)`取消访问权限检查 |
| Class.forName()抛出ClassNotFoundException | 检查全类名是否正确（包名+类名），确保类在类路径下 |
| 反射创建对象时提示“无默认构造器” | 要么给目标类添加无参构造，要么通过getDeclaredConstructor获取有参构造 |
| 字段/方法名拼写错误导致NoSuchFieldException/NoSuchMethodException | 严格核对类中字段/方法名，注意参数类型匹配（如int和Integer不同） |

### 五、总结与下周规划
#### 本周总结
- 已掌握反射的核心流程：获取Class对象 → 操作构造器/字段/方法 → 动态执行。
- 理解反射的核心价值：通过“打破封装”实现动态编程，是Spring、MyBatis等框架的底层基础。
- 注意事项：反射性能较差，非必要场景不建议使用；使用时需谨慎，避免破坏类的封装性。

#### 下周规划
1. 深入学习反射与注解的结合应用（如自定义注解+反射解析）。
2. 研究反射在动态代理中的应用（JDK动态代理原理）。
3. 分析Spring框架中反射的具体使用场景（如IOC容器创建Bean）。
4. 做反射相关的编程练习题，巩固知识点。
</doubaocanvas>

这份周报涵盖了反射的核心知识点和实践场景，如果你有具体的学习侧重点（比如想深入框架中的反射应用、解决某个反射相关的报错），或者需要补充更多案例、扩展某个知识点，欢迎告诉我，我可以进一步优化内容或添加专项讲解~