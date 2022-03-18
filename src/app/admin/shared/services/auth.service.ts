import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, Subject, tap, throwError } from 'rxjs';
import { FirebaseAuthResponse, User } from '../../../shared/interfaces';
import { environment } from '../../../../environments/environment';

@Injectable()
export class AuthService {
	public error$: Subject<string> = new Subject<string>();

	constructor(private http: HttpClient) {}

	get token(): string | null {
		const expDate =  new Date(localStorage.getItem('fb-token-exp') ?? '');
		if (new Date() > expDate) {
			this.logout()
			return null;
		}

		return localStorage.getItem('fb-token');
	}

	public login(user: User): Observable<any> {
		user.returnSecureToken = true;
		return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
			.pipe(
				// @ts-ignore
				tap(this.setToken),
				catchError(this.handleError.bind(this))
			)
	}

	public logout(): void {
		this.setToken(null)
	}

	public handleError(error: HttpErrorResponse) {
		const { message } = error.error.error;

		switch (message) {
			case 'INVALID_EMAIL':
				this.error$.next('Email is invalid');
				break;
			case 'INVALID_PASSWORD':
				this.error$.next('Password is invalid')
				break;
			case 'EMAIL_NOT_FOUND':
				this.error$.next('Email not found');
				break;
		}

		return throwError(error);
	}

	public isAuthenticated(): boolean {
		return !!this.token;
	}

	private setToken(resp: FirebaseAuthResponse | null): void {
		if (resp) {
			const expDate = new Date(new Date().getTime() + +resp.expiresIn * 1000);
			localStorage.setItem('fb-token', resp.idToken);
			localStorage.setItem('fb-token-exp', expDate.toString());
		} else {
			localStorage.clear();
		}
	}
}
