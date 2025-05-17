// auth.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.models';

const selectAuth = createFeatureSelector<AuthState>('auth');

export const selectUser        = createSelector(selectAuth, s => s.user);
export const selectToken       = createSelector(selectAuth, s => s.token);
export const selectIsLoggedIn  = createSelector(selectToken, t => !!t);
export const selectAuthLoading = createSelector(selectAuth, s => s.loading);
export const selectAuthError   = createSelector(selectAuth, s => s.error);
