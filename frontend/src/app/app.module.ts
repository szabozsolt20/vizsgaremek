import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './common/header/header.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { HomeComponent } from './page/home/home.component';
import { ProductComponent } from './page/product/product.component';
import { OrderComponent } from './page/order/order.component';
import { IconModule } from './icon/icon.module';
import { DataTableModule } from './data-table/data-table.module';
import { LoginComponent } from './page/login/login.component';
import { JwtInterceptor } from './service/jwt.interceptor';
import { AuthService } from './service/auth.service';
import { ProductEditorComponent } from './page/product-editor/product-editor.component';
import { FileUploaderComponent } from './common/file-uploader/file-uploader.component';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { BookComponent } from './page/book/book.component';
import { BookEditorComponent } from './page/book-editor/book-editor.component';
import { BorrowComponent } from './page/borrow/borrow.component';
import { BorrowEditorComponent } from './page/borrow-editor/borrow-editor.component';
import { LibrarianComponent } from './page/librarian/librarian.component';
import { LibrarianEditorComponent } from './page/librarian-editor/librarian-editor.component';
import { MemberComponent } from './page/member/member.component';
import { MemberEditorComponent } from './page/member-editor/member-editor.component';
import { UserComponent } from './page/user/user.component';
import { UserEditorComponent } from './page/user-editor/user-editor.component';
import { UnfoldPipe } from './pipe/unfold.pipe';
import { SeedsComponent } from './page/seeds/seeds.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    HomeComponent,
    ProductComponent,
    OrderComponent,
    LoginComponent,
    ProductEditorComponent,
    FileUploaderComponent,
    BookComponent,
    BookEditorComponent,
    BorrowComponent,
    BorrowEditorComponent,
    LibrarianComponent,
    LibrarianEditorComponent,
    MemberComponent,
    MemberEditorComponent,
    UserComponent,
    UserEditorComponent,
    SeedsComponent,
  //  UnfoldPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    IconModule,
    DataTableModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TypeaheadModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      deps: [
        AuthService,
      ],
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
