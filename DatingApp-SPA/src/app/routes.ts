import { MessagesComponent } from './messages/messages.component';
import { MemberListComponent } from './member-list/member-list.component';
import { ListsComponent } from './lists/lists.component';
import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';
import { AuthGuard } from './_guard/auth.guard';

export const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            {path: 'lists', component: ListsComponent},
            {path: 'members', component: MemberListComponent, canActivate: [AuthGuard]},
            {path: 'messages', component: MessagesComponent}
        ]
    },
    {path: '**', redirectTo: '', pathMatch: 'full'}
]