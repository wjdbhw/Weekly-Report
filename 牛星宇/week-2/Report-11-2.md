# Java网络编程学习笔记周报

**核心目标**：掌握Java网络编程基础模型（BIO、NIO）、Socket通信原理及HTTP协议实践应用


## 一、每日学习内容梳理

### 1. 周一：Java网络编程基础与TCP/IP协议栈
#### 核心知识点
- **网络编程本质**：实现不同设备间的数据传输，Java通过`java.net`包提供统一API，屏蔽底层操作系统差异。
- **TCP/IP四层模型**：
  1. 应用层（HTTP、FTP）：定义数据交互规则；
  2. 传输层（TCP/UDP）：负责端到端数据传输（TCP可靠、UDP不可靠）；
  3. 网络层（IP）：处理路由与地址转发；
  4. 数据链路层（以太网）：物理设备间的数据帧传输。
- **关键类初识**：`InetAddress`（封装IP地址）、`Socket`（客户端通信端点）、`ServerSocket`（服务端监听端口）。

#### 代码实践（InetAddress使用）
```java
import java.net.InetAddress;
import java.net.UnknownHostException;

public class InetAddressDemo {
    public static void main(String[] args) throws UnknownHostException {
        // 获取本地主机IP与主机名
        InetAddress localHost = InetAddress.getLocalHost();
        System.out.println("本地主机名：" + localHost.getHostName());
        System.out.println("本地IP地址：" + localHost.getHostAddress());
        
        // 通过域名获取百度IP
        InetAddress baidu = InetAddress.getByName("www.baidu.com");
        System.out.println("百度IP：" + baidu.getHostAddress());
    }
}
```

#### 问题与解决
- 问题：`getLocalHost()`偶尔返回`127.0.0.1`而非实际网卡IP。  
- 解决：通过遍历网络接口获取非回环地址，代码如下：
```java
Enumeration<NetworkInterface> interfaces = NetworkInterface.getNetworkInterfaces();
while (interfaces.hasMoreElements()) {
    NetworkInterface iface = interfaces.nextElement();
    if (iface.isLoopback() || !iface.isUp()) continue; // 跳过回环和未启用接口
    for (InterfaceAddress addr : iface.getInterfaceAddresses()) {
        InetAddress ip = addr.getAddress();
        if (ip instanceof Inet4Address) { // 只取IPv4
            System.out.println("实际网卡IP：" + ip.getHostAddress());
        }
    }
}
```


### 2. 周二：BIO模型与TCP Socket通信
#### 核心知识点
- **BIO（阻塞IO）**：线程发起IO请求后，需等待IO完成才能继续执行，适用于连接数少的场景。
- **TCP Socket通信流程**：
  1. 服务端：创建`ServerSocket` → 绑定端口 → `accept()`阻塞等待客户端连接 → 获取`Socket` → 读写数据；
  2. 客户端：创建`Socket` → 连接服务端IP和端口 → 读写数据 → 关闭连接。

#### 代码实践（BIO TCP通信）
**服务端（单线程，仅支持一个客户端）**：
```java
import java.io.*;
import java.net.ServerSocket;
import java.net.Socket;

public class BioTcpServer {
    public static void main(String[] args) throws IOException {
        ServerSocket serverSocket = new ServerSocket(8888);
        System.out.println("服务端启动，等待客户端连接...");
        
        // 阻塞等待客户端连接
        Socket clientSocket = serverSocket.accept();
        System.out.println("客户端连接成功：" + clientSocket.getInetAddress());
        
        // 读取客户端数据
        BufferedReader in = new BufferedReader(
            new InputStreamReader(clientSocket.getInputStream())
        );
        String clientMsg = in.readLine();
        System.out.println("收到客户端消息：" + clientMsg);
        
        // 向客户端发送响应
        PrintWriter out = new PrintWriter(
            new OutputStreamWriter(clientSocket.getOutputStream()), true
        );
        out.println("服务端已收到：" + clientMsg);
        
        // 关闭资源
        in.close();
        out.close();
        clientSocket.close();
        serverSocket.close();
    }
}
```

**客户端**：
```java
import java.io.*;
import java.net.Socket;

public class BioTcpClient {
    public static void main(String[] args) throws IOException {
        // 连接服务端（IP为服务端地址，端口与服务端一致）
        Socket socket = new Socket("127.0.0.1", 8888);
        
        // 向服务端发送数据
        PrintWriter out = new PrintWriter(
            new OutputStreamWriter(socket.getOutputStream()), true
        );
        out.println("Hello, BIO TCP Server!");
        
        // 读取服务端响应
        BufferedReader in = new BufferedReader(
            new InputStreamReader(socket.getInputStream())
        );
        String serverMsg = in.readLine();
        System.out.println("收到服务端响应：" + serverMsg);
        
        // 关闭资源
        out.close();
        in.close();
        socket.close();
    }
}
```

#### 问题与解决
- 问题：单线程服务端无法同时处理多个客户端连接。  
- 解决：引入“线程池”优化，每个客户端连接分配一个线程（伪异步IO），避免频繁创建线程开销。


### 3. 周三：UDP通信与BIO优化（线程池）
#### 核心知识点
- **UDP特点**：无连接、不可靠、速度快，适用于视频通话、广播等场景，Java通过`DatagramSocket`和`DatagramPacket`实现。
- **BIO线程池优化**：通过`Executors.newFixedThreadPool()`创建线程池，服务端`accept()`后将客户端连接交给线程池处理，支持多客户端并发。

#### 代码实践（UDP通信）
```java
// UDP服务端
public class UdpServer {
    public static void main(String[] args) throws IOException {
        DatagramSocket socket = new DatagramSocket(9999);
        byte[] buffer = new byte[1024];
        DatagramPacket packet = new DatagramPacket(buffer, buffer.length);
        
        System.out.println("UDP服务端启动，等待数据...");
        socket.receive(packet); // 阻塞接收数据
        
        // 解析客户端数据
        String clientData = new String(packet.getData(), 0, packet.getLength());
        System.out.println("收到客户端[" + packet.getAddress() + "]数据：" + clientData);
        
        // 向客户端发送响应
        String response = "UDP服务端已收到：" + clientData;
        DatagramPacket responsePacket = new DatagramPacket(
            response.getBytes(), response.length(),
            packet.getAddress(), packet.getPort()
        );
        socket.send(responsePacket);
        
        socket.close();
    }
}
```


### 4. 周四：NIO模型核心组件（Buffer、Channel、Selector）
#### 核心知识点
- **NIO（非阻塞IO）**：基于“事件驱动”，线程可同时监控多个IO通道，无需阻塞等待，适用于高并发场景。
- **三大核心组件**：
  1. **Buffer**：数据缓冲区（如`ByteBuffer`），所有IO操作都通过Buffer进行；
  2. **Channel**：双向数据通道（如`SocketChannel`、`ServerSocketChannel`），可读写数据；
  3. **Selector**：多路复用器，监听Channel的IO事件（如连接、读、写），实现单线程管理多Channel。

#### 代码实践（NIO Buffer基础操作）
```java
import java.nio.ByteBuffer;

public class NioBufferDemo {
    public static void main(String[] args) {
        // 1. 创建ByteBuffer（容量为10）
        ByteBuffer buffer = ByteBuffer.allocate(10);
        System.out.println("初始状态 - 容量：" + buffer.capacity() + "，位置：" + buffer.position() + "，限制：" + buffer.limit());
        
        // 2. 写入数据（put()后position后移）
        String data = "Hello";
        buffer.put(data.getBytes());
        System.out.println("写入后 - 位置：" + buffer.position() + "，限制：" + buffer.limit());
        
        // 3. 切换为读模式（flip()：limit=position，position=0）
        buffer.flip();
        System.out.println("读模式 - 位置：" + buffer.position() + "，限制：" + buffer.limit());
        
        // 4. 读取数据（get()后position后移）
        byte[] readBuffer = new byte[buffer.limit()];
        buffer.get(readBuffer);
        System.out.println("读取数据：" + new String(readBuffer));
        System.out.println("读取后 - 位置：" + buffer.position() + "，限制：" + buffer.limit());
        
        // 5. 清空缓冲区（clear()：position=0，limit=capacity，数据未删除）
        buffer.clear();
        System.out.println("清空后 - 位置：" + buffer.position() + "，限制：" + buffer.limit());
    }
}
```




