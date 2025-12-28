import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export const useChatSocket = (userId: string) => {
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    socketRef.current = io('http://localhost:3000', {
      path: '/socket.io',
      query: { userId },
      transports: ['polling', 'websocket'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socketRef.current.on('connect', () => setIsConnected(true));
    socketRef.current.on('disconnect', () => setIsConnected(false));
    socketRef.current.on('connect_error', (error) => console.error('WebSocket error:', error));

    return () => {
      socketRef.current?.disconnect();
    };
  }, [userId]);

  const joinChat = (chatId: string) => {
    socketRef.current?.emit('joinChat', { chatId });
  };

  const sendMessage = (chatId: string, content: string) => {
    socketRef.current?.emit('sendMessage', { chatId, content, userId });
  };

  const sendTyping = (chatId: string, username: string) => {
    socketRef.current?.emit('typing', { chatId, userId, username });
  };

  const onNewMessage = (callback: (message: any) => void) => {
    socketRef.current?.on('newMessage', callback);
    
    return () => {
      socketRef.current?.off('newMessage', callback);
    };
  };

  const onUserTyping = (callback: (data: { userId: string; username: string }) => void) => {
    socketRef.current?.on('userTyping', callback);
    
    return () => {
      socketRef.current?.off('userTyping', callback);
    };
  };

  const leaveChat = (chatId: string) => {
    socketRef.current?.emit('leaveChat', { chatId });
  };

  return {
    isConnected,
    joinChat,
    leaveChat,
    sendMessage,
    sendTyping,
    onNewMessage,
    onUserTyping,
    socket: socketRef.current
  };
};