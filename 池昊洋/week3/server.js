const io = require('socket.io')(3000, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});
console.log('✅ Socket.IO 后端已启动，监听端口：3000');
const ChatRoom="general_chat";
const onlineUsers=new Map();
// 监听客户端连接
io.on('connection', (socket) => {
  console.log('新客户端连接:',socket.id);
  
  // 监听客户端发送的chat消息
  socket.on('chat', (msg) => {
    console.log('收到消息:', msg);
    // 回复客户端
    socket.emit('reply', '已收到你的消息: ' + msg);
  });
  
  

//用户加入聊天室
socket.on('join',(username)=>{
	//存储用户信息
	onlineUsers.set(socket.id,username);
	socket.join(ChatRoom);
	//广播新用户加入
	io.to(ChatRoom).emit('system_message',{
		username:"system",
		content:`${username}加入了聊天室`,
		time:getCurrentTime()
	});
	//发送当前在线用户列表
	updateUserList();
});
//接收客户端消息
socket.on('chat_message',(data)=>{
	const username=onlineUsers.get(socket.id);
	if(!username)return;
	//构造消息对象
	const message={
		username:username,
		content:data.content,
		time:getCurrentTime()
	};
	console.log('已接收用户消息:',message);//验证
	//广播到聊天室
	io.to(ChatRoom).emit('receive_message',message);
});

//处理用户断开连接
socket.on('disconnect',()=>{
	const username=onlineUsers.get(socket.id);
	if(username){
		onlineUsers.delete(socket.id);
		io.to(ChatRoom).emit('system_message',{
			username:'system',
			content:`${username}离开了聊天室`,
			time:getCurrentTime()
		});
	}
	//发送当前在线用户列表
	updateUserList();
	console.log('用户离开：',socket.id);
});

//更新在线用户列表函数
function updateUserList(){
	const users = Array.from(onlineUsers.values());
	io.to(ChatRoom).emit('user_List',users);
}
});


//获取当前时间
function getCurrentTime(){
	const now=new Date();
	return now.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit',second:'2-digit'});
}

