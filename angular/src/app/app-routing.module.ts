import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: 'popup',
		pathMatch: 'full',
		loadChildren: () =>
			import('./modules/popup/popup.module').then(m => m.PopupModule),
	},
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, {
			useHash: true,
			relativeLinkResolution: 'legacy',
		}),
	],
	exports: [RouterModule],
})
export class AppRoutingModule {}
