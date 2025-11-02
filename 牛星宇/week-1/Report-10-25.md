# Java学习笔记周报

**核心学习内容**：Java多线程编程、IO流操作、File类用法  
**学习目标达成度**：掌握多线程基础创建与同步机制、IO流分类及常见操作、File类对文件/目录的管理，完成基础案例实践（达成80%，多线程高级锁机制待深入）


## 一、本周学习内容总览
本周聚焦Java中与“并发处理”和“文件操作”相关的核心技术，三者在实际开发中关联性强（如多线程读写文件需结合IO流与File类）。具体学习脉络如下：
1. **多线程**：从“为什么需要多线程”切入，掌握线程创建、生命周期、同步与通信，解决线程安全问题；
2. **IO流**：按“数据流向”和“数据类型”分类学习，重点突破字节流与字符流的适用场景、缓冲流优化原理；
3. **File类**：作为文件操作的“入口”，学习文件/目录的创建、查询、删除等基础操作，为IO流提供“操作对象”。


## 二、分模块详细笔记
### （一）Java多线程
#### 1. 核心概念回顾
- **线程与进程**：进程是“程序的一次执行”（如打开一个浏览器），线程是“进程内的执行单元”（如浏览器同时加载页面、播放视频），一个进程可包含多个线程，线程共享进程资源。
- **线程生命周期**：分为5个状态，状态切换是多线程编程的核心逻辑：
  - 新建（New）：`new Thread()`后未调用`start()`；
  - 就绪（Runnable）：调用`start()`后，等待CPU调度；
  - 运行（Running）：CPU分配时间片，执行`run()`方法；
  - 阻塞（Blocked）：因锁等待、sleep()、wait()等暂停执行，释放CPU但保留资源；
  - 死亡（Terminated）：`run()`执行完毕或异常终止，资源被回收。

#### 2. 线程创建方式（3种核心方式）
| 创建方式 | 核心步骤 | 优缺点 | 示例代码片段 |
|----------|----------|--------|--------------|
| 继承Thread类 | 1. 自定义类继承Thread；<br>2. 重写`run()`方法（线程执行逻辑）；<br>3. 创建对象并调用`start()` | 优点：代码简单；<br>缺点：无法继承其他类（单继承限制） | ```java
class MyThread extends Thread {
    @Override
    public void run() {
        for (int i = 0; i < 5; i++) {
            System.out.println("Thread: " + i);
        }
    }
}
// 使用
new MyThread().start();
``` |
| 实现Runnable接口 | 1. 自定义类实现Runnable；<br>2. 重写`run()`；<br>3. 传入Thread构造器并调用`start()` | 优点：可继承其他类，适合多线程共享资源；<br>缺点：需多一步传入Thread | ```java
class MyRunnable implements Runnable {
    @Override
    public void run() {
        for (int i = 0; i < 5; i++) {
            System.out.println("Runnable: " + i);
        }
    }
}
// 使用
new Thread(new MyRunnable()).start();
``` |
| 实现Callable接口（带返回值） | 1. 实现Callable<T>，重写`call()`（返回T类型）；<br>2. 用FutureTask包装Callable；<br>3. 传入Thread并启动，通过FutureTask获取结果 | 优点：可获取返回值、抛出异常；<br>缺点：代码较复杂，需处理异常 | ```java
class MyCallable implements Callable<Integer> {
    @Override
    public Integer call() throws Exception {
        int sum = 0;
        for (int i = 1; i <= 10; i++) sum += i;
        return sum; // 返回计算结果
    }
}
// 使用
FutureTask<Integer> task = new FutureTask<>(new MyCallable());
new Thread(task).start();
System.out.println("Sum: " + task.get()); // 获取结果（会阻塞）
``` |

#### 3. 线程安全问题与解决方法
- **问题场景**：多线程共享资源时，因“指令交错执行”导致结果异常（如两个线程同时给一个变量加1，预期结果2，实际可能1）。
- **解决核心**：保证“共享资源操作的原子性”（即操作要么全执行，要么全不执行）。
- **常用方案**：
  1. **synchronized关键字**：修饰方法或代码块，给对象加“锁”，同一时间只有一个线程能进入同步区域。<br>示例（同步代码块）：
     ```java
     private int count = 0;
     private Object lock = new Object(); // 锁对象
     public void increment() {
         synchronized (lock) { // 同步代码块，锁对象为lock
             count++; // 原子操作
         }
     }
     ```
  2. **Lock接口（ReentrantLock）**：比synchronized更灵活，支持手动加锁/解锁、可中断、公平锁等。<br>示例：
     ```java
     private ReentrantLock lock = new ReentrantLock();
     public void increment() {
         lock.lock(); // 加锁
         try {
             count++;
         } finally {
             lock.unlock(); // 解锁（必须在finally中，防止异常导致锁未释放）
         }
     }
     ```

#### 4. 本周实践案例：多线程卖票系统
需求：3个窗口同时卖100张票，保证不超卖、不错卖。  
核心思路：用`Runnable`实现共享票数，通过`synchronized`保证卖票操作原子性。  
关键代码：
```java
class TicketSeller implements Runnable {
    private int tickets = 100; // 共享票数
    @Override
    public void run() {
        while (true) {
            synchronized (this) { // 锁对象为当前Runnable实例（共享）
                if (tickets <= 0) break;
                System.out.println(Thread.currentThread().getName() + "卖票：" + tickets--);
            }
        }
    }
}
// 测试
public class TicketTest {
    public static void main(String[] args) {
        TicketSeller seller = new TicketSeller();
        new Thread(seller, "窗口1").start();
        new Thread(seller, "窗口2").start();
        new Thread(seller, "窗口3").start();
    }
}
```


### （二）Java IO流
#### 1. IO流分类（核心维度）
IO流按“数据流向”和“数据类型”可分为4大类，实际开发中需根据场景选择：
| 分类维度 | 具体类型 | 说明 | 核心类 |
|----------|----------|------|--------|
| 数据流向 | 输入流（InputStream/Reader） | 从外部设备（文件、网络）读入内存 | FileInputStream、FileReader |
|          | 输出流（OutputStream/Writer） | 从内存写入外部设备 | FileOutputStream、FileWriter |
| 数据类型 | 字节流（InputStream/OutputStream） | 操作所有数据（文本、图片、视频等），单位为字节（1byte=8bit） | 上述4个类均为字节流基类 |
|          | 字符流（Reader/Writer） | 仅操作文本数据（如.txt），单位为字符（需考虑编码，如UTF-8） | FileReader、FileWriter |

#### 2. 常用IO流操作（以文件操作为例）
##### （1）字节流：读写任意文件（如图片、视频）
- **文件读取（FileInputStream）**：
  ```java
  public static void readByByte(String filePath) {
      FileInputStream fis = null;
      try {
          fis = new FileInputStream(filePath); // 关联文件
          byte[] buffer = new byte[1024]; // 缓冲数组（减少IO次数，提升效率）
          int len; // 每次读取的字节数
          while ((len = fis.read(buffer)) != -1) { // 读入缓冲数组，返回-1表示读完
              System.out.println(new String(buffer, 0, len)); // 转为字符串（仅文本文件适用）
          }
      } catch (IOException e) {
          e.printStackTrace();
      } finally {
          try {
              if (fis != null) fis.close(); // 关闭流（释放资源，必须做）
          } catch (IOException e) {
              e.printStackTrace();
          }
      }
  }
  ```
- **文件写入（FileOutputStream）**：
  ```java
  public static void writeByByte(String filePath, String content) {
      FileOutputStream fos = null;
      try {
          // 第二个参数true表示“追加写入”，false表示“覆盖写入”
          fos = new FileOutputStream(filePath, true);
          fos.write(content.getBytes()); // 字符串转字节数组写入
          fos.flush(); // 刷新缓冲区（强制写入磁盘，避免数据残留）
      } catch (IOException e) {
          e.printStackTrace();
      } finally {
          try {
              if (fos != null) fos.close();
          } catch (IOException e) {
              e.printStackTrace();
          }
      }
  }
  ```

##### （2）字符流：读写文本文件（更便捷，无需手动转字节）
- **文件读取（FileReader）**：
  ```java
  public static void readByChar(String filePath) {
      FileReader fr = null;
      try {
          fr = new FileReader(filePath);
          char[] buffer = new char[1024]; // 字符缓冲数组
          int len;
          while ((len = fr.read(buffer)) != -1) {
              System.out.println(new String(buffer, 0, len)); // 直接转字符串
          }
      } catch (IOException e) {
          e.printStackTrace();
      } finally {
          try {
              if (fr != null) fr.close();
          } catch (IOException e) {
              e.printStackTrace();
          }
      }
  }
  ```

##### （3）缓冲流：优化IO效率（装饰者模式）
缓冲流（BufferedInputStream/BufferedReader等）通过“内置缓冲区”减少与磁盘的交互次数，比普通流效率提升10倍以上，实际开发中优先使用。  
示例：用BufferedReader读取文本文件（支持按行读取）：
```java
public static void readByBufferedReader(String filePath) {
    BufferedReader br = null;
    try {
        // 装饰者模式：用BufferedReader包装FileReader
        br = new BufferedReader(new FileReader(filePath));
        String line;
        // 按行读取，返回null表示读完（比普通流更便捷）
        while ((line = br.readLine()) != null) {
            System.out.println(line);
        }
    } catch (IOException e) {
        e.printStackTrace();
    } finally {
        try {
            if (br != null) br.close(); // 关闭缓冲流即可（会自动关闭底层流）
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

#### 3. 注意事项
1. **流的关闭顺序**：先开后关（如先开FileReader，再开BufferedReader，则先关BufferedReader）；
2. **编码问题**：字符流默认使用系统编码（如Windows是GBK），若文件是UTF-8，需用`InputStreamReader`指定编码（如`new InputStreamReader(new FileInputStream(file), "UTF-8")`）；
3. **try-with-resources语法**：JDK7+支持自动关闭流，无需手动写finally，代码更简洁：
   ```java
   // try-with-resources：括号内的流会自动关闭
   try (BufferedReader br = new BufferedReader(new FileReader(filePath))) {
       String line;
       while ((line = br.readLine()) != null) {
           System.out.println(line);
       }
   } catch (IOException e) {
       e.printStackTrace();
   }
   ```


### （三）Java File类
#### 1. 核心作用
File类是“文件和目录路径名的抽象表示”，**不直接操作文件内容**（内容操作需IO流），仅负责：
- 管理文件/目录的“元信息”（如名称、大小、修改时间、是否为目录等）；
- 实现文件/目录的创建、删除、重命名等基础操作。

#### 2. 常用方法（按功能分类）
| 功能分类 | 方法名 | 说明 | 示例 |
|----------|--------|------|------|
| 路径与名称 | `String getAbsolutePath()` | 获取绝对路径（如`D:\test\a.txt`） | `new File("a.txt").getAbsolutePath()` |
|          | `String getName()` | 获取文件/目录名 | `new File("D:\test\a.txt").getName()` → "a.txt" |
| 状态判断 | `boolean exists()` | 判断文件/目录是否存在 | `file.exists()` → true/false |
|          | `boolean isFile()` | 判断是否为文件 | `file.isFile()` |
|          | `boolean isDirectory()` | 判断是否为目录 | `file.isDirectory()` |
| 大小与时间 | `long length()` | 获取文件大小（字节数，目录返回0） | `file.length()` → 1024（表示1KB） |
|          | `long lastModified()` | 获取最后修改时间（毫秒数，需转日期） | `new Date(file.lastModified())` |
| 创建与删除 | `boolean createNewFile()` | 创建新文件（目录不存在会抛异常） | `file.createNewFile()` → 成功返回true |
|          | `boolean mkdir()` | 创建单级目录（父目录不存在则失败） | `new File("D:\test\dir").mkdir()` |
|          | `boolean mkdirs()` | 创建多级目录（父目录不存在则自动创建） | `new File("D:\test\a\b").mkdirs()` |
|          | `boolean delete()` | 删除文件/空目录（非空目录无法删除） | `file.delete()` |
| 目录遍历 | `String[] list()` | 返回目录下所有文件/目录名（字符串数组） | `String[] names = dir.list()` |
|          | `File[] listFiles()` | 返回目录下所有文件/目录的File对象（推荐） | `File[] files = dir.listFiles()` |

#### 3. 实践案例：遍历目录下所有文件
需求：递归遍历指定目录下的所有文件（包括子目录），并打印文件路径和大小。  
核心思路：用`isDirectory()`判断是否为目录，若是则递归遍历；若为文件则打印信息。  
代码：
```java
public class FileTraversal {
    // 递归遍历目录
    public static void traverseDir(File dir) {
        if (!dir.exists() || !dir.isDirectory()) {
            System.out.println("目录不存在或不是有效目录");
            return;
        }
        // 获取目录下所有文件/目录
        File[] files = dir.listFiles();
        if (files == null) return; // 某些目录（如系统保护目录）可能返回null
        for (File file : files) {
            if (file.isDirectory()) {
                traverseDir(file); // 递归遍历子目录
            } else {
                // 打印文件路径和大小
                System.out.println("文件路径：" + file.getAbsolutePath() 
                        + "，大小：" + file.length() + "字节");
            }
        }
    }

    public static void main(String[] args) {
        File dir = new File("D:\test"); // 目标目录
        traverseDir(dir);
    }
}
```


## 三、本周学习难点与解决方法
| 难点问题 | 解决方法 |
|----------|----------|
| 多线程“锁竞争”导致的死锁 | 1. 学习死锁产生条件（资源互斥、持有并等待、不可剥夺、循环等待）；<br>2. 实践中避免：按固定顺序获取锁、设置锁超时时间（ReentrantLock的tryLock()）；<br>3. 参考案例：模拟死锁并调试（用jstack命令查看线程栈） |
| IO流分类多，容易混淆使用场景 | 1. 画思维导图梳理“字节流vs字符流”“输入流vs输出流”的适用场景；<br>2. 总结口诀：“读文本用字符流（Reader），读非文本用字节流（InputStream）；写同理”；<br>3. 多做对比实验（如用字节流读UTF-8文本，观察乱码问题，理解字符流的必要性） |
| File类遍历目录时处理null和异常 | 1. 遍历前先判断目录是否存在、是否为有效目录；<br>2. 对listFiles