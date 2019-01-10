# SALMON-front
Shairing  and  Learning Material ONline React Js base frontend for SALMON project  

provides annotation experience for PDF documents on web
built on top of PDF.js. Text and rectangular highlights are supported. Highlight
data format is independent of the viewport, making it suitable for saving on the
server.
the front end is written in Javascript/ CSS/ HTML languages the frame works which is use for this project are respectivly according to importance and usage in SALMON are :

* REACT JS
* FLOW 
* REDUX status manager 
* Bootstrap for scalable cards and styles

[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/YOUTUBE_VIDEO_ID_HERE/0.jpg)](https://www.youtube.com/watch?v=YOUTUBE_VIDEO_ID_HERE)

## project requirements :
* React JS
* Bootstrap
* Redux
* Axios


## Table of contents

   * [1. SALMON FRONT REACT ](#Salmon)
   
        * [1.1 REACT](#REACT)
        * [1.2 REDUX: ](#REDUX)
        * [1.3 FLOW](#3.FLOW)
   * [2. Architector](#Architector)
        
   * [3. HowToRunSALMON-FRONT](#HowToRun)
   
       * [2.1Setup And Requirements ForBackend REST-API Connection](#SetupAndRequirementsForBackend)
                
            * [NODE VERSION](#CurrentJDK)
            * [Tools](#Tools) 
            * [Installation](#installation)
            * [Install Apache Tomcat](#InstallApacheTomcat)
            * [Combo](#combo)
            * [Auto insert and update TOC](#auto-insert-and-update-toc)
             
       * [2.2 SALMON-CONTROLLER](#tests)
       * [2.3 SALMON-API](#dependency)
       
   * [4. Tutorials ](#Tutorials)
   
       * [3.1 initial terminal commands for psql](#InitialTerminalCommandsForpPsql)
       
   * [Dependency](#dependency)


## HowToRun

 - Make sure that you put MVC in the proper folder.
 - Run tomcat via your IDE 
 - run PostgreSQL on 5432 port.
 - Install npm and react and follow the requirements [www.fofd.kie](www.google.com).
 
 
`npm install`

for runnig on local host 

`npm start`

## Setup And Requirements ForBackend REST-API Connection

  please make sure about your backend address server part (SALMON CONTROLLER) and change it according to your local address in the utils/Storegekeys.js part and as 
  an static variable: 
  ```
   static BASE_API_URL = '//localhost:YOUR BACKEND TOMCAT PORT/YOUR SUB URL/' 
  ```
  default local host would be ' //localhost:8080 as servlet address for tomcat.
  

### REACT AND REDUX 

the needed list of packeges are in package.json after "npm i" you will have all of them + extra packages that need for running SALMON front.

some used packeges :

  ```
    "axios": "^0.18.0",
    "emoji-picker-react": "^2.1.1",
    "flow": "^0.2.3",
    "jquery": "^3.3.1",
    "lodash": "^4.17.10",
    "material-ui": "^1.0.0-beta.47",
    "pdfjs-dist": "2.0.489",
    "qrcode-react": "^0.1.16",
    "react": "^16.4.2",
    "react-bootstrap": "^0.32.1",
    "react-browser-router": "^2.1.2",
    "react-cookie": "^3.0.8",
    "react-dom": "^16.4.1",
    "react-file-base64": "^1.0.3",
   ```
   
### Bootstrap

npm install bootstrap

Bootstrap is an open source toolkit for developing with HTML, CSS, and JS. 
for quick start please take look at:

http://getbootstrap.com/docs/4.1/getting-started/introduction/   

  ```
    "@babel/runtime": "7.0.0-beta.55",
    "@material-ui/core": "^1.2.3",
    "@material-ui/icons": "^1.1.0",
    "@trendmicro/react-sidenav": "^0.4.5",
  ```    
    
### Annotation

See
[`demo/src/App.js`](https://github.com/agentcooper/react-pdf-highlighter/blob/master/demo/src/App.js)
for React component API example.


While docs are in progress, feel free to check the source annotated with Flow
type signatures.

### Prior art

[`react-pdf`](https://github.com/wojtekmaj/react-pdf) and
[`react-pdfjs`](https://github.com/erikras/react-pdfjs) only provide React
wrappers for PDF.js and do not have built-in annotation functionality.

[`pdfjs-annotate`](https://github.com/instructure/pdf-annotate.js/) does not
provide text highlights out of the box.

See also:

* https://github.com/mozilla/pdf.js
* https://github.com/wojtekmaj/react-pdf
* https://github.com/erikras/react-pdfjs
* https://github.com/instructure/pdf-annotate.js/
* https://blogs.dropbox.com/tech/2016/11/annotations-on-document-previews/
* https://github.com/agentcooper/react-pdf-highlighter.git

### FAQ

##### Can I get a new PDF with the highlights embedded into the document?

No, but [pdf-annotation-service](https://github.com/agentcooper/pdf-annotation-service) might be helpful for you.

### Compatibility

Works in Google Chrome, Safari 10+, Firefox 52+. Not tested in Internet
Explorer.

### Refrence Initial projects from SmartQr and Recat Hilighter
https://github.com/agentcooper/react-pdf-highlighter.git


### External added libraries:
https://material-ui.com/getting-started/installation/




