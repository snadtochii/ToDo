import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';

import { TodoListService } from './services/todo-list.service';
import { DataStoreService } from './services/data-store.service';


@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [TodoListService, DataStoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
