import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'wineForm',
  templateUrl: './wineForm.html'
})
export class WineForm implements OnInit, OnChanges {
  form: FormGroup;
  error = '';
  image = '';

  @Input('isCreate') isCreate: boolean = true;
  @Input('initialValue') initialValue: any = {};

  @Output() onSubmit: EventEmitter<any> = new EventEmitter();

  constructor(private fb: FormBuilder) {
    this.form = fb.group({
      name: ['', Validators.compose([Validators.required])],
      vintage: ['', Validators.compose([Validators.required])],
      price: ['', Validators.compose([Validators.required])],
      awardText: [''],
      awardLevel: [''],
      availability: [''],
      content: [''],
      varietal: [''],
      premium: [''],
      priority: ['']
    });

    this.form.controls.awardLevel.setValue('gold');
    this.form.controls.availability.setValue(1);
    this.form.controls.premium.setValue(1);
    this.form.controls.priority.setValue(0);
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.initialValue &&
      changes.initialValue.previousValue &&
      changes.initialValue.previousValue.id !== this.initialValue.id
    ) {
      Object.keys(this.form.controls).forEach(key => {
        if (this.initialValue[key] === true) {
          this.form.controls[key].setValue(1);
        } else if (this.initialValue[key] === false) {
          this.form.controls[key].setValue(0);
        } else {
          this.form.controls[key].setValue(this.initialValue[key]);
        }
      });
      this.image = this.initialValue.image;
    }
  }

  handleSubmit($event) {
    $event.preventDefault();

    for (let c in this.form.controls) {
      this.form.controls[c].markAsTouched();
    }

    if (!this.form.valid) return;

    this.onSubmit.emit({
      ...this.form.value,
      image: this.image
    });
  }

  setImage(file) {
    this.image = file.weblinkUrl;
  }
}
