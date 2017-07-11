# IONIC 1.3.3 MOBILE ARCHETYPE

## REQUIRED
### INSTALL
### NODEJS 6.x.x
### ANDROID STUDIO
### XCODE AND ACCEPT THE LICENCE 

## After finish the node installation and download IDES run this command in mac os.

```javascript
$ npm run build
```

# For windows i am sorry, check the build.sh file and run each command manually.

```bash
#!/usr/bin/env bash

###REQUIRED
## INSTALL
## NODEJS 6.x.x
## ANDROID STUDIO
## XCODE AND ACCEPT THE LICENCE

#INSTAL PACKAGES
npm install ionic  -g
npm install ionic-cli -g
npm install cordova@6.5.0 -g
npm install gulp-cli -g
npm install gulp -g
npm install bower -g
npm install -g ios-sim

##INSTALL PLATFORMS AND REMOVE PLATFORMS
cordova platform remove android
cordova platform add android
cordova platform remove ios
cordova platform add ios

##INSTALL NPM DEPENDENCIES
npm i

##INSTALL BOWER COMPONENTS
bower install

##REBUILD NODE SASS
npm rebuild node-sass

##GULP BUILD ALL PROJECT
gulp build

##RUN PROJECT ON NAVIGATOR
ionic serve
```
