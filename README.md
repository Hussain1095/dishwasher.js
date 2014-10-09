dishwasher.js
=============

Chooses victims randomly on a preset interval (default is 1 week) to wash the dishes and clean the kitchen


## Dependancies

    nodejs
    
## Installation

  After cloning the git repository cd into the directory and type the following
  ```bash
    $ npm install
    $ sudo npm install forever -g
  ```
  
## Configuring

    Modify the options.js file to reflect desired email/password
    Modify the emails.txt file by inserting victim's email addresses one at a time seperated by a newline
    
## Quick Start

 Start the app:
 ```bash
    $ forever -m 5 app.js
 ```
