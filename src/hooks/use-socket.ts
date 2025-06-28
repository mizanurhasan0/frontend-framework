import { useEffect, useRef, useState, useCallback } from "react";
import { io, Socket } from "socket.io-client";

interface UseSocketOptions {
    url?: string;
    autoConnect?: boolean;
    onConnect?: () => void;
    onDisconnect?: () => void;
    onError?: (error: Error) => void;
}

interface UseSocketReturn {
    socket: Socket | null;
    isConnected: boolean;
    isConnecting: boolean;
    connect: () => void;
    disconnect: () => void;
    emit: (event: string, data?: any) => void;
    on: (event: string, callback: (data: any) => void) => void;
    off: (event: string) => void;
}

export function useSocket(options: UseSocketOptions = {}): UseSocketReturn {
    const {
        url = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001",
        autoConnect = true,
        onConnect,
        onDisconnect,
        onError,
    } = options;

    const socketRef = useRef<Socket | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false);

    const connect = useCallback(() => {
        if (socketRef.current?.connected) return;

        setIsConnecting(true);

        socketRef.current = io(url, {
            autoConnect: false,
            transports: ["websocket", "polling"],
        });

        socketRef.current.on("connect", () => {
            setIsConnected(true);
            setIsConnecting(false);
            onConnect?.();
        });

        socketRef.current.on("disconnect", () => {
            setIsConnected(false);
            setIsConnecting(false);
            onDisconnect?.();
        });

        socketRef.current.on("connect_error", (error) => {
            setIsConnecting(false);
            onError?.(error);
        });

        socketRef.current.connect();
    }, [url, onConnect, onDisconnect, onError]);

    const disconnect = useCallback(() => {
        if (socketRef.current) {
            socketRef.current.disconnect();
            socketRef.current = null;
        }
        setIsConnected(false);
        setIsConnecting(false);
    }, []);

    const emit = useCallback((event: string, data?: any) => {
        if (socketRef.current?.connected) {
            socketRef.current.emit(event, data);
        }
    }, []);

    const on = useCallback((event: string, callback: (data: any) => void) => {
        if (socketRef.current) {
            socketRef.current.on(event, callback);
        }
    }, []);

    const off = useCallback((event: string) => {
        if (socketRef.current) {
            socketRef.current.off(event);
        }
    }, []);

    useEffect(() => {
        if (autoConnect) {
            connect();
        }

        return () => {
            disconnect();
        };
    }, [autoConnect, connect, disconnect]);

    return {
        socket: socketRef.current,
        isConnected,
        isConnecting,
        connect,
        disconnect,
        emit,
        on,
        off,
    };
} 