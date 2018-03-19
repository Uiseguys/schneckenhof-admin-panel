import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  OnDestroy,
  OnInit
} from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import { CustomValidators } from "ng2-validation";

import { select } from "@angular-redux/store";
import { ToDoActions } from "../api/actions";
import { featureId } from "../index";

@Component({
  selector: "app-todo-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.scss"]
})
export class TodoFormComponent implements OnDestroy, OnChanges, OnInit {
  @Input("isCreate") isCreate: boolean = false;
  @Input("initialValue") initialValue: any = {};

  @Output() onSubmit: EventEmitter<any> = new EventEmitter();

  availableTags = [
    {
      id: "books",
      text: "books"
    },
    {
      id: "movies",
      text: "movies"
    },
    {
      id: "personal",
      text: "personal"
    },
    {
      id: "family",
      text: "family"
    },
    {
      id: "sports",
      text: "sports"
    },
    {
      id: "travel",
      text: "travel"
    },
    {
      id: "recipe",
      text: "recipe"
    },
    {
      id: "restaurant",
      text: "restaurant"
    }
  ];
  tagOptions = {
    width: "100%",
    multiple: true
  };
  tags: any = [];

  constructor(fb: FormBuilder, private todoActions: ToDoActions) {
    this.form = fb.group({
      title: ["", Validators.required],
      description: [""],
      tags: [""],
      dateCreated: ["", Validators.required],
      dueDate: ["", Validators.required],
      priority: [
        "",
        Validators.compose([Validators.required, CustomValidators.number])
      ]
    });
  }

  form: FormGroup;
  @Input() itemId;

  ngOnInit() {
    this.loadValues();
  }

  ngOnDestroy() {
    this.todoActions.detailViewDeactivated();
  }

  ngOnChanges(changes) {
    if (
      changes.initialValue &&
      changes.initialValue.previousValue &&
      changes.initialValue.previousValue.id !== this.initialValue.id
    ) {
      this.loadValues();
    }
  }

  loadValues() {
    this.form.controls["title"].setValue(this.initialValue.title);
    this.form.controls["description"].setValue(this.initialValue.description);

    this.form.controls["tags"].setValue(this.initialValue.tags);
    this.tags = this.initialValue.tags ? this.initialValue.tags.split(",") : [];

    this.form.controls["dateCreated"].setValue(
      this.initialValue.dateCreated
        ? new Date(this.initialValue.dateCreated).toISOString().substring(0, 10)
        : null
    );
    this.form.controls["dueDate"].setValue(
      this.initialValue.dueDate
        ? new Date(this.initialValue.dueDate).toISOString().substring(0, 10)
        : null
    );
    this.form.controls["priority"].setValue(this.initialValue.priority || 3);
  }

  handleSubmit($event) {
    $event.preventDefault();

    for (const c in this.form.controls) {
      this.form.controls[c].markAsTouched();
    }

    if (!this.form.valid) {
      return;
    }

    this.onSubmit.emit(this.form.value);
  }

  handleTagSelect({ data }) {
    this.form.controls.tags.setValue(data.map(item => item.id).join(","));
    this.form.controls.tags.markAsTouched();
  }
}
