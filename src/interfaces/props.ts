export interface LoginAuthProps {
    username: string,
    password: string
}

export interface LoginErrorProps {
    isError: boolean,
    error: string
}

export interface RegisterAuthProps {
    devicename: string,
    username: string,
    password: string
}

export interface AuthPageProps {
    action: string
}

interface TimeStampProps {
    seconds: number,
    nanoseconds: number
}
export interface MessageProps {
    sender_username: string,
    text: string,
    timestamp: TimeStampProps
}

export interface BubbleProps {
    sender_username: string,
    text: string,
    timestamp: string
}