# Exhibition

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.2.


# Overview

Site for exhibition. You can play one of two games to receive invitation. After generating invitation code it will be send to organizer email box and saved in firebase database.

# Prerequisities

Application is integrated with:
- Emailjs (http://www.emailjs.com/) - it allow sending emails directly from frontend JavaScript code
- firebase (https://firebase.google.com/) - used to host application and save some informations in database
- reCAPTCHA (https://www.google.com/recaptcha) - used to form validation (prevent spam and automated form submission)

How to integrate reCAPTCHA with your email template: http://www.emailjs.com/docs/user-guide/adding-captcha-verification/

Before running application you need to create and configure `emailjs`, `firebase` and `recaptcha` accounts according to your needs and provide required parameters gathered in `assets/config.json` file.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Deploy

To deploy application build it first and use firebase cli as described in documentation: https://firebase.google.com/docs/hosting/deploying

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
