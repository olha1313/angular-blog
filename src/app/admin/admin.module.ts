import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { DashboadPageComponent } from './dashboad-page/dashboad-page.component';
import { CreatePageComponent } from './create-page/create-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';

@NgModule({
	declarations: [ AdminLayoutComponent, LoginPageComponent, DashboadPageComponent, CreatePageComponent, EditPageComponent ],
	imports: [
		CommonModule,
		RouterModule.forChild([
			{
				path: '', component: AdminLayoutComponent, children: [
					{ path: '', redirectTo: '/admin/login', pathMatch: 'full' },
					{ path: 'login', component: LoginPageComponent },
					{ path: 'dashboard', component: DashboadPageComponent },
					{ path: 'create', component: CreatePageComponent },
					{ path: 'post/:id/edit', component: EditPageComponent },
				]
			}
		])
	],
	exports: [
		RouterModule
	],

})
export class AdminModule {

}
