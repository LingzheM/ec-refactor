// auth.actions.ts
import { createAction, props } from '@ngrx/store';
import { CustomerAccount } from './auth.models';

// ログイン
export const login    = createAction('[Auth] Login',    props<{ email: string; password: string }>());
export const loginSuccess = createAction('[Auth] Login Success', props<{ user: CustomerAccount; token: string }>());
export const loginFailure = createAction('[Auth] Login Failure', props<{ error: string }>());

// ログアウト
export const logout = createAction('[Auth] Logout');

// プロフィール取得
export const loadProfile        = createAction('[Auth] Load Profile');
export const loadProfileSuccess = createAction('[Auth] Load Profile Success', props<{ user: CustomerAccount }>());
export const loadProfileFailure = createAction('[Auth] Load Profile Failure', props<{ error: string }>());
