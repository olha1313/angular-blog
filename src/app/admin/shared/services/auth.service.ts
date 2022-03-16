import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { FirebaseAuthResponse, User } from '../../../shared/interfaces';
import { environment } from '../../../../environments/environment';

@Injectable()
export class AuthService {
	constructor(private http: HttpClient) {}

	get token(): string | null {
		const expDate =  new Date(localStorage.getItem('fb-token-exp') ?? '');
		if (new Date() > expDate) {
			this.logout()
			return null;
		}

		return localStorage.getItem('tb-token');
	}

	public login(user: User): Observable<any> {
		user.returnSecureToken = true;
		return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
			.pipe(
				// @ts-ignore
				tap(this.setToken)
			)
	}

	public logout(): void {
		this.setToken(null)
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
