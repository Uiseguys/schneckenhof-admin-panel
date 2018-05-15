// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  siteUrl: '',
  apiUrl: 'http://localhost:3800/api',
  pdfUrl: 'http://localhost:4000',
  devNetlifyWebHookUrl:
    'https://api.netlify.com/build_hooks/5afae34bb13fb15f1f2c611b',
  liveNetlifyWebHookUrl:
    'https://api.netlify.com/build_hooks/5ad6d48ac965925822f5aae2'
};
