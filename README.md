# SecondHandBookshopApp

A simple web application where users can sell secondhand books.
This proyect is mostly used for practicing DevOps workflows in Azure, including CI/CD pipelines and automated testing integration.

## Proyect Overview

- Backend: ASP.NET Core Web API (BookshopApi)

- Frontend: Angular (BookshopAngular)

- Testing: xUnit for API, Jasmine/Karma for Angular

- DevOps: Azure Pipelines

## Getting started

### Backend
```
cd BookshopApp/BookshopApi/BookshopApi
dotnet run --urls "http://localhost:7150"
```

Then go to http://localhost:7150/swagger/index.html to explore and test the available API endpoints using Swagger UI.

### Frontend
```
cd BookshopApp/BookshopAngular

rm -rf node_modules dist package-lock.json

npm install

ng serve
```

## Running Unit Tests

### Backend Tests (xUnit)

```
cd BookshopApp/BookshopApi.Tests

dotnet build

dotnet test
```

### Frontend Tests (Jasmine + Karma)

```
cd BookshopApp/BookshopAngular

ng test
```
or to run tests and generate report

```
npm install karma-junit-reporter --save-dev

ng test --karma-config=karma.conf.js --watch=false --browsers ChromeHeadless
```

## Integration Tests (Cypress)

Interactive mode (opens the Cypress Test Runner GUI):

```
cd BookshopApp/BookshopAngular
npx cypress open
```

Headless mode (executes tests in the terminal and generates results):
```
cd BookshopApp/BookshopAngular
npx cypress run
```