import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookEditorComponent } from './page/book-editor/book-editor.component';
import { BookComponent } from './page/book/book.component';
import { BorrowEditorComponent } from './page/borrow-editor/borrow-editor.component';
import { BorrowComponent } from './page/borrow/borrow.component';
import { HomeComponent } from './page/home/home.component';
import { LibrarianEditorComponent } from './page/librarian-editor/librarian-editor.component';
import { LibrarianComponent } from './page/librarian/librarian.component';
import { LoginComponent } from './page/login/login.component';
import { MemberEditorComponent } from './page/member-editor/member-editor.component';
import { MemberComponent } from './page/member/member.component';
import { OrderComponent } from './page/order/order.component';
import { ProductEditorComponent } from './page/product-editor/product-editor.component';
import { ProductComponent } from './page/product/product.component';
import { UserEditorComponent } from './page/user-editor/user-editor.component';
import { UserComponent } from './page/user/user.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'product',
    component: ProductComponent,
  },
  {
    path: 'product/edit/:id',
    component: ProductEditorComponent,
  },
  {
    path: 'book',
    component: BookComponent,
  },
  {
    path: 'book/edit/:id',
    component: BookEditorComponent,
  },
  {
    path: 'borrow',
    component: BorrowComponent,
  },
  {
    path: 'borrow/edit/:id',
    component: BorrowEditorComponent,
  },
  {
    path: 'librarian',
    component: LibrarianComponent,
  },
  {
    path: 'librarian/edit/:id',
    component: LibrarianEditorComponent,
  },
  {
    path: 'member',
    component: MemberComponent,
  },
  {
    path: 'member/edit/:id',
    component: MemberEditorComponent,
  },
  {
    path: 'user',
    component: UserComponent,
  },
  {
    path: 'user/edit/:id',
    component: UserEditorComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  { // todo: nem kell már
    path: 'order',
    component: OrderComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
