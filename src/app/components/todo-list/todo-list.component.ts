import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';

import { ToDo } from '../../models/todo';

import { TodoListService } from '../../services/todo-list.service';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  toDos: ToDo[];
  private newToDoTitle: string = '';
  private ascendingNumberOrder: boolean = true;
  private ascendingNameOrder: boolean = true;
  private sortedBy: string;

  constructor(private todoService: TodoListService) {
  }

  ngOnInit() {
    this.todoService.tdObs.subscribe((res) => { this.toDos = res });
    this.todoService.initStoredData();
  }

  addToDo() {
    if (this.newToDoTitle.trim().length) {
      this.todoService.addToDo(this.newToDoTitle);
      this.newToDoTitle = '';
    }
    this.sortedBy = null;
  }
  editToDo(toDo: ToDo) {
    toDo.isEditing = !toDo.isEditing;
    console.log(this.toDos)
  }
  cancelEditing(toDo: ToDo) {
    toDo.isEditing = false;
  }
  updateToDo(toDo, editedTitle) {
    editedTitle = editedTitle.trim();
    if (!editedTitle.length) {
      this.removeToDo(toDo);
    } else {
      toDo.title = editedTitle;
      console.log(this.toDos)
    }
    toDo.isEditing = false;
    this.sortedBy = null;
  }
  removeToDo(toDo: ToDo) {
    this.todoService.removeToDo(toDo);
    this.sortedBy = null;
  }
  toggleIsDone(toDo: ToDo) {
    this.todoService.toggleIsDone(toDo);
  }
  sortByNumber() {
    this.todoService.sortByNumber(this.ascendingNumberOrder);
    this.ascendingNumberOrder = !this.ascendingNumberOrder;
    this.sortedBy = 'number';
  }
  sortByName() {
    this.todoService.sortByName(this.ascendingNameOrder);
    this.ascendingNameOrder = !this.ascendingNameOrder;
    this.sortedBy = 'name';
  }
}
