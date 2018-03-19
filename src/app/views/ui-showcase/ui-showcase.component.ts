import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-ui-showcase',
    templateUrl: './ui-showcase.component.html',
    styleUrls: ['./ui-showcase.component.scss']
})
export class UIShowcaseComponent implements OnInit {

    constructor() { }
    breadcrumbItems: any = [
        { active: false, href: '/alerts', target: 'blank', title: 'Alerts' },
        { active: false, href: '/badge', target: 'blank', title: 'Badge' },
        { active: true, href: '/breadcrumb', target: 'blank', title: 'Breadcrumbs' },
    ];
    cards: any[] = [
        {
            cardHeaderId: 'heading#1',
            cardBodyId: 'collapse#1',
            cardHeaderContent: 'Card Item #1',
            cardBodyContent: 'Card Body #1',
            showOnInit: true
        },
        {
            cardHeaderId: 'heading#2',
            cardBodyId: 'collapse#2',
            cardHeaderContent: 'Card Item #2',
            cardBodyContent: 'Card Body #2',
            showOnInit: false
        },
        {
            cardHeaderId: 'heading#3',
            cardBodyId: 'collapse#3',
            cardHeaderContent: 'Card Item #3',
            cardBodyContent: 'Card Body #3',
            showOnInit: false
        }
    ];
    multiSelectData: any = ['Alex', 'Alabama', 'Alaska', 'andreas', 'alexandro'];
    markdownContent: string = '# Header1' +
        ' \n This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.5.' +
        '\n ## Header 2' +
        '\n Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).' +
        '\n ## Running end-to-end tests' +
        '\n Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).' +
        '\n ### Bug Fixes' +
        '\n * **common:** more detailed info about error' +
        '\n `fix(common): more detailed info about error`';
    users2: any[] = [];
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
    exampleTriggerOverflow: boolean = false;
    examplePlacement: string = 'bottom';
    exampleAlignment: string = 'start';

    scheduleResources = [
        { id: 'a', title: 'Auditorium A' },
        { id: 'b', title: 'Auditorium B', eventColor: 'green' },
        { id: 'c', title: 'Auditorium C', eventColor: 'orange' },
        {
            id: 'd', title: 'Auditorium D', children: [
                { id: 'd1', title: 'Room D1' },
                { id: 'd2', title: 'Room D2' }
            ]
        },
        { id: 'e', title: 'Auditorium E' },
        { id: 'f', title: 'Auditorium F', eventColor: 'red' }
    ];
    scheduleEvents = [
        { id: '1', resourceId: 'b', start: '2018-02-07T02:00:00', end: '2018-02-07T07:00:00', title: 'event 1' },
        { id: '2', resourceId: 'c', start: '2018-02-07T05:00:00', end: '2018-02-07T22:00:00', title: 'event 2' },
        { id: '3', resourceId: 'd', start: '2018-02-06', end: '2018-02-08', title: 'event 3' },
        { id: '4', resourceId: 'e', start: '2018-02-07T03:00:00', end: '2018-02-07T08:00:00', title: 'event 4' },
        { id: '5', resourceId: 'f', start: '2018-02-07T00:30:00', end: '2018-02-07T02:30:00', title: 'event 5' }
    ];

    formPlacementString() {
        return this.exampleAlignment ?
            `${this.examplePlacement}-${this.exampleAlignment}` :
            `${this.examplePlacement}`;
    }
    getUser2Template() {
        return `<div class="card card-18">
            <img class="card-img-top" src="<%=user.picture.large%>" alt="Card image cap" />
                <div class="card-body">
                    <h5 class="card-title capitalized"><%=user.name.first%> <%=user.name.last%></h5>
                    <a href="#" class="btn btn-primary">Send message</a>
                </div>
            </div > `;

    }
    getUserTemplate() {
        return `<div class="card col-md-6 col-sm-12">
            <div class="card-body" >
                <div class="media">
                    <img class="d-flex mr-3 rounded" src="<%=user.picture.medium%>" alt="Generic placeholder image" />
                    <div class="media-body">
                        <h5 class="mt-0 capitalized"><%=user.name.first%> <%=user.name.last%></h5>

                        <div>
                            <span class="capitalized">
                                <%=user.location.city%>, <%=user.location.state%>,
                                </span>
                            <span> <%=user.location.street%> </span>
                        </div>
                    </div>
                </div>
                </div>
            </div> `;

    }
    getUsersPage(): number {
        return (this.users2.length) / 10 + 1;
    }
    getUsers(count = 10) {

        return new Promise((resolve) => {

            const request = new XMLHttpRequest();
            request.open('GET', `https://randomuser.me/api/?page=${this.getUsersPage()}&results=${count}&seed=abc`, true);
            request.onload = () => {
                if (request.status >= 200 && request.status < 400) {
                    const data = JSON.parse(request.responseText);
                    const users = data.results;
                    resolve(users);
                } else {
                    resolve(false);
                    console.error('Users endpoint can\'t be reached. Status: ', request.status);

                }
            };

            request.onerror = () => console.error('Users endpoint can\'t be reached.');

            request.send();
        });
    }
    initUsers2Data(count?: number) {
        this.getUsers(count).then(
            users =>
                this.users2 = this.users2.concat(users)

        );
    }



    ngOnInit() {
        console.log('UI Showcase Initialized');
        this.initUsers2Data(20);
    }
}
