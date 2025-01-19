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

export interface MessageProps {
    sender: string,
    text: string
}