import { Component, OnInit } from '@angular/core';
import { DashboardActions } from './api/actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashbaordComponent implements OnInit {
  thumbnail: any = {
    0: {
      src: 'https://www.w3schools.com/howto/img_fjords.jpg',
      style: {
        left: '-60px',
        width: '600px',
        height: '68px',
        clip: 'rect(0, 120px, 68px, 0)'
      }
    },
    1: {
      style: {
        left: '-180px',
        clip: 'rect(0, 240px, 68px, 120px)'
      }
    },
    2: {
      style: {
        left: '-300px',
        clip: 'rect(0, 360px, 68px, 240px)'
      }
    },
    3: {
      style: {
        left: '-420px',
        clip: 'rect(0, 480px, 68px, 360px)'
      }
    },
    4: {
      style: {
        left: '-540px',
        clip: 'rect(0, 600px, 68px, 480px)'
      }
    }
  };
  progress: any = 10;
  theme: String = 'berlin';
  progressBarText: String = '50';
  progressBarType: String = 'success';
  progressBarStriped: boolean = true;
  progressBarAnimated: boolean = true;
  progressBarStriped1: boolean = false;
  progressBarAnimated1: boolean = false;
  markdownContent: string = '# Header1' +
      ' \n This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.5.' +
      '\n ## Header 2' +
      '\n Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).' +
      '\n ## Running end-to-end tests' +
      '\n Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).' +
      '\n ### Bug Fixes' +
      '\n * **common:** more detailed info about error' +
      '\n `fix(common): more detailed info about error`';
  constructor(private dashboardActions: DashboardActions) {}

  ngOnInit() {
    console.log('on init component');
    this.dashboardActions.dashboardInitialized();
  }
}
