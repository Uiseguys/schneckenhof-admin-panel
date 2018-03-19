import { Component, Input, OnInit } from '@angular/core';
import { dispatch } from '@angular-redux/store';

import { ToDoActions } from '../api/actions';
import { featureId } from '../index';

@Component({
  selector: 'app-todo-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class TodoCreateComponent implements OnInit {
  constructor(private todoActions: ToDoActions) {}
  ngOnInit() {}

  handleSubmit(values) {
    this.todoActions.createToDo(values);
  }
}
