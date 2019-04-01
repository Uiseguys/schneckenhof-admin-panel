# schneckenhof-admin-panel

This project is built on Angular 5 for [schneckenhof-api](https://github.com/Uiseguys/schneckenhof-api).
schneckenhof-admin-panel provides following features:

* manage wines
* manage templates of pdf and generate pdf
* deploy data to netlify develop or live sites.

## How to start

**Note** that this seed project requires node v4.x.x or higher, npm 2.14.7 and Angular 5.x

In order to start the seed use:

    $ git clone https://github.com/Uiseguys/schneckenhof-admin-panel.git
    $ cd schneckenhof-admin-panel
    # install angular-cli
    $ npm install -g @angular/cli
    # install the project's dependencies
    $ npm install
    $ ng serve --open

## Configuration

### api, pdf and notlify webhooks

There are 2 files(environment.prod.ts, environment.ts) if you look inside src/environments.
environment.ts is for develop and environment.prod.ts is for product version.
You can run app in product version `ng serve --prod`

    export const environment = {
      production: true,
      siteUrl: '',
      apiUrl: 'https://dev-schneckenhof-api.herokuapp.com/api',
      pdfUrl: 'https://www.pdf-aas.io',
    };

* apiUrl
  The site url of **[schneckenhof-api](https://github.com/Uiseguys/schneckenhof-api)**.
* pdfUrl
  We use [carbone](https://carbone.io/) to generate PDF.

## Build

Please run `ng build --prod`
