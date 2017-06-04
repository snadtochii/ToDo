import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { ToDo } from '../models/todo';
import { DataStoreService } from './data-store.service';

@Injectable()
export class TodoListService {

  toDos: ToDo[];
  private counter: number;
  private td = new Subject<ToDo[]>();
  tdObs = this.td.asObservable();

  constructor(private dataStoreService: DataStoreService) { }

  initStoredData() {
    let todosData = JSON.parse(this.dataStoreService.getToDos())
    this.toDos = todosData ? todosData.toDos : [];
    this.counter = todosData ? todosData.counter : 0;
    this.updateSharedData(this.toDos);
    console.log(this.toDos);
  }
  addToDo(toDoTitle: string) {
    this.toDos.push(new ToDo(toDoTitle, ++this.counter));
    this.updateSharedData(this.toDos);
    this.updateStorage();
    console.log(this.toDos);
  }
  removeToDo(toDo: ToDo) {
    this.toDos.splice(this.toDos.indexOf(toDo), 1);
    this.updateSharedData(this.toDos);
    this.updateStorage();
    console.log(this.toDos);
  }
  toggleIsDone(toDo: ToDo) {
    toDo.isDone = !toDo.isDone;
    this.updateStorage();
    console.log(this.toDos);
  }
  sortByNumber(order: boolean) {
    let ordNum = order ? 1 : -1;
    this.updateSharedData(this.toDos.sort((a, b) => { return ordNum * (a.id - b.id) }));
    console.log(this.toDos);
  }
  sortByName(order: boolean) {
    let ordNum = order ? 1 : -1;
    this.updateSharedData(this.toDos.sort((a, b) => {
      let nameA = a.title.toLowerCase();
      let nameB = b.title.toLowerCase();
      if (nameA > nameB) {
        return ordNum * 1;
      } else {
        return ordNum * (-1);
      }
    }));
    console.log(this.toDos);
  }
  private updateSharedData(toDos: ToDo[]) {
    this.td.next(this.toDos);
  }
  private updateStorage() {
    this.dataStoreService.updateStorage({ toDos: this.toDos, counter: this.counter });
  }
}
