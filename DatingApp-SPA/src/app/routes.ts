import { MemberListResolver } from './_resolvers/member-list.resolver';
import { MessagesComponent } from './messages/messages.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { ListsComponent } from './lists/lists.component';
import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';
import { AuthGuard } from './_guard/auth.guard';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';

export const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            {path: 'lists', component: ListsComponent},
            {path: 'members', component: MemberListComponent, resolve: {users: MemberListResolver}},
            {path: 'members/:id', component: MemberDetailComponent, resolve: {user: MemberDetailResolver}},
            {path: 'messages', component: MessagesComponent}
        ]
    },
    {path: '**', redirectTo: '', pathMatch: 'full'}
];
