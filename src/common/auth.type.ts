export interface LoginCredentials {
    email: string;
    password: string;
}

export interface User {
    id: number,
    name: string,
    email: string,
    email_verified_at: string,
    created_at: string,
    updated_at: string
}

export interface LoginResponse {
    data: {
        user: User
        token: string;
    };
    success: boolean;
    message: string;
}

export interface UserResponse {
    data: {
        user: User
    };
    success: boolean;
}

export interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    login: (credentials: LoginCredentials) => Promise<AuthResult<User>>;
    logout: () => void;
    updateUser: (userData: Partial<User>) => void;
    refreshToken: () => Promise<string | null>;
}

export interface AuthResult<T> {
    success: boolean;
    data?: T;
    message?: string;
}

export interface EncryptedTokenData {
    token: string;
    timestamp: number;
    expiresIn: number;
}

export interface TokenPayload {
    sub: string;
    email: string;
    iat: number;
    exp: number;
}
