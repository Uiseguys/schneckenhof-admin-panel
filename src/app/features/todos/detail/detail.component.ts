import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';

import { select } from '@angular-redux/store';
import { ToDoActions } from '../api/actions';
import { featureId } from '../index';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class PlaylistDetailComponent implements OnDestroy, OnChanges, OnInit {
  constructor(private todoActions: ToDoActions) {}

  @Input() itemId;

  @select([featureId, 'currentToDo'])
  todo$;

  ngOnInit() {
    console.log('on init this.itemId:');
    console.log(this.itemId);
  }

  ngOnDestroy() {
    this.todoActions.detailViewDeactivated();
  }

  ngOnChanges(changes) {
    console.log('changes:');
    console.log(changes);
    this.todoActions.detailViewActivated(this.itemId);
  }

  handleSubmit(values) {
    this.todoActions.updateToDo(this.itemId, values);
  }
}
