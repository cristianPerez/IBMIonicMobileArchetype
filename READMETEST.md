# Testing Angular JS

## Install Karma:
```bash
$ npm install karma --save-dev
```
## Install plugins that your project needs:
```bash
$ npm install karma-jasmine karma-chrome-launcher jasmine-core --save-dev
```

## Only for windows install

```bash
$ npm install -g karma-cli
```

## Run karma and Hello world

```bash
$ node_modules/karma/bin/karma start
```

## Create init de karma

```bash
$ node_modules/karma/bin/karma init
```

## we are going to Jasmine Site.

https://jasmine.github.io/2.4/introduction.html

## install espec reporter live a developer dependency.

```bash
$ npm i karma-spec-reporter -D
```

## Install angular mocks.

```bash
$ npm install angular-mocks
```

or

```bash
$ bower install angular-mocks
```

## Documentation angular mocks.

# Test a controller
# Mock a service
# Create a filter
# Test a filter
# Update Gulp inject Task
# Install chai and karma-chai for assertions

```bash
$ npm i -D chai karma-chai
```

# Include chai in karma-conf.
```js
frameworks: ['jasmine', 'chai'],
```

# Require chai in test spec file.
```js
var expectChai = chai.expect;
```

# Test filter with chai.

# Using assert with chai

# Install karma-coverage
```bash
$ npm i karma-coverage -D
```

# Upsate into karma conf
```js
preprocessors: {
  // source files, that you wanna generate coverage for
  // do not include tests or libraries
  // (these files will be instrumented by Istanbul)
  'www/app/**/*.js': ['coverage']
},
```

# Upsate into karma conf
```js
reporters: ['spec', 'coverage'],
```

# You can use a big reporter

```js
 coverageReporter: {
  // specify a common output directory
  dir: 'build/reports/coverage',
  reporters: [
    // reporters not supporting the `file` property
    { type: 'html', subdir: 'report-html' },
    { type: 'lcov', subdir: 'report-lcov' },
    // reporters supporting the `file` property, use `subdir` to directly
    // output them in the `dir` directory
    { type: 'cobertura', subdir: '.', file: 'cobertura.txt' },
    { type: 'lcovonly', subdir: '.', file: 'report-lcovonly.txt' },
    { type: 'teamcity', subdir: '.', file: 'teamcity.txt' },
    { type: 'text', subdir: '.', file: 'text.txt' },
    { type: 'text-summary', subdir: '.', file: 'text-summary.txt' },
  ]
}
```

# Install standard

```bash
npm i -D standard
```

# command for standard

```bash
standard "www/app/**/*.js"
```


# Install precommit
```bash
npm i -D pre-commit
```

#Implement precommit
```js
"pre-commit": {
    "run": [ "check-estandard", "exit"]
}
```





