import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { select } from '@angular-redux/store';
import { ToDoActions } from '../api/actions';
import { featureId } from '../index';

@Component({
  selector: 'app-todo-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class PlaylistCollectionComponent implements OnInit {
  constructor(private toDoActions: ToDoActions) { }

  @select([featureId, 'collection']) collection$;

  @Output() collectionItemClicked: EventEmitter<any> = new EventEmitter();

  onLoadMore(e) {
    console.log('loadMore event catched!', e);
  }

  ngOnInit() {
    console.log('on init todo component');
    this.toDoActions.overviewActivated();
  }

}
