# docu-app

React-based documentation browser integrated with Sprotty for EMF Ecore

## Getting started 

```
npm i
lerna bootstrap
lerna run build
cd packages/docu-react
npm run start
```

## Deployment
Whenever you consider your work on the app to be finished and hence would like to deploy it, follow these steps: 

1. Run `npm run build`
2. Copy the `packages/docu-react/build` folder to `../../com.eclipsesource.icat.dynamicdocu`, overwrite any existing files
3. Commit the changes

 