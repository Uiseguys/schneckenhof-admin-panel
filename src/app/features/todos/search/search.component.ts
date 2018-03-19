import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  CUSTOM_ELEMENTS_SCHEMA
} from '@angular/core';

import { select } from '@angular-redux/store';
import { ToDoActions } from '../api/actions';
import { featureId } from '../index';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  constructor(private toDoActions: ToDoActions) {}

  filterActive: boolean = false;

  @select([featureId, 'tags'])
  tags$;
  @select([featureId, 'selectedTags'])
  selectedTags$;

  handleTagClose(e: CustomEvent) {
    this.toDoActions.removeTag(e.detail.tagText);
  }

  handleTagSelect(e: CustomEvent) {
    this.toDoActions.addTag(e.detail);
  }

  ngOnInit() {}
}
