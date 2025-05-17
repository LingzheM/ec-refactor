// auth.models.ts

export interface CustomerAccount {
    id: string;
    email: string;
    status: string;
    createdAt: string;
}

export interface AuthState {
    user: CustomerAccount | null;
    token: string | null;
    loading: boolean;
    error: string | null;
}

export const initialAuthState: AuthState = {
    user: null,
    token: null,
    loading: false,
    error: null
};