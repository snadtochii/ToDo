import { Injectable } from '@angular/core';

import { ToDo } from '../models/todo';

@Injectable()
export class DataStoreService {

  constructor() { }

  getToDos() {
    return localStorage.getItem('todoData')
  }
  updateStorage(toDosData: any) {
    localStorage.setItem('todoData', JSON.stringify(toDosData));
  }

}
