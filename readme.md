# ContentBlocks Authentication System

## Introduction

This project implements an alternative login component for ContentBlocks using a traditional username and password system. It integrates with the UI's existing design and leverages Clerk.com for authentication.

## Table of Contents
1. [Introduction](#introduction)
2. [Features](#features)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Components](#components)
6. [Screenshots](#screenshots)
7. [Challenges Faced](#challenges-faced)
8. [Contributing](#contributing)

## Features

1. **Login Interface:** Implemented a login form accepting username and password with form validation, 'forgot password' link, and an option to revert to the magic link method.
2. **Registration Interface:** Designed a registration form allowing users to sign up with a username, email, and password, including input validation and feedback.
3. **State Management:** Used Jotai for state management of authentication processes, form inputs, and error messages.
4. **Security Features:** Implemented basic security features such as password hashing.
5. **Responsive Design:** Ensured responsiveness and style consistency using Tailwind CSS.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/contentblocks-auth.git
   ```
   
2. Navigate to the project directory:

    ```bash
    cd project-directory
    ```

3. Installing the Dependancies:

   ```bash
   npm install 
   ```
   
## Usage

To run the application locally, use the following command:

```bash
npm start
```

## Components
1. `Header` : The Header component renders a title or placeholder text at the top of a page.
   
<img width="700" alt="header" src="https://github.com/akshayrajeevnambiar/cb-project/assets/144245055/8488eae7-0c2f-4138-8440-8d5cdc6cf67a">
<br/>
<br/>

2. `Footer` : The Footer component renders a footer section at the bottom of a page.

<img width="700" alt="footer" src="https://github.com/akshayrajeevnambiar/cb-project/assets/144245055/f670313c-b950-413b-9233-477c4da1b8ea">
<br/>
<br/>

3. `PasswordComponent` : The PasswordComponent component provides a password input field with toggleable visibility and error handling.
   
<img width="700" alt="PasswordComponent" src="https://github.com/akshayrajeevnambiar/cb-project/assets/144245055/a00068ca-727b-4295-9a8d-38229ed8292e">
<br/>
<br/>

4. `PasswordStrengthMeter` : The PasswordStrengthMeter component displays the strength of a password using a visual indicator.

5. `PasswordWithStrengthComponent` : The PasswordWithStrengthComponent component combines the PasswordComponent and PasswordStrengthMeter components to provide a password input field with strength meter.

<img width="700" alt="PasswordStrengthMeter" src="https://github.com/akshayrajeevnambiar/cb-project/assets/144245055/01bc54e2-021c-4ed0-8fc0-9c11e1026505">
<br/>
<br/>

6. `SigninForm` : The SigninForm component allows users to sign in with their email and password.

<img width="700" alt="SginInComponent" src="https://github.com/akshayrajeevnambiar/cb-project/assets/144245055/88623a64-2952-4d5b-9cdc-4645895a9a41">
<br/>
<br/>

7. `SignupForm` : The SignupForm component enables users to create a new account with a unique username and email.

<img width="700" alt="SginUpComponent" src="https://github.com/akshayrajeevnambiar/cb-project/assets/144245055/1b85acdd-b3de-4376-8d86-a317348ffd24">
<br/>
<br/>

8. `VerifyForm` : The VerifyForm component prompts users to enter a verification code sent to their email for account verification.
9. `OtpComponent` : The OtpComponent component allows users to enter a verification code for email-based authentication.

<img width="700" alt="OtpComponent" src="https://github.com/akshayrajeevnambiar/cb-project/assets/144245055/69d57773-f541-4fec-ace0-b2c03d3658f0">
<br/>
<br/>

## Screenshots

1. `DashBoard` : The Dashboard upon user successfully sigining in

   <img width="700" alt="DashBoard" src="https://github.com/akshayrajeevnambiar/cb-project/assets/144245055/310706d2-d274-41c0-974e-73e2255c195e">
   <br/>
<br/>

2. `LandingPage` : The Landing Page where the user is intially landed on.
   
<img width="700" alt="LandingPage" src="https://github.com/akshayrajeevnambiar/cb-project/assets/144245055/2879258a-b5ec-4346-9c4b-ef6b0b80d17f">
<br/>
<br/>

3. `Input Validation`: Input being validated on user data entry.

<img width="700" alt="InputValidation" src="https://github.com/akshayrajeevnambiar/cb-project/assets/144245055/2393f771-e722-4bdf-9285-32a5b0826750">
<br/>
<br/>

4. `Password Reset`: Users are also provided the option to reset thier password.

<img width="700" alt="ResetPassword" src="https://github.com/akshayrajeevnambiar/cb-project/assets/144245055/a4a30e34-e63a-4116-9a62-1ac7e5f336ad">
<br/>
<br/>

## Challenges Faced

1. **Clerk API Limitations**: Working with the Clerk.com API presented challenges due to the limited number of requests allowed in the free version, affecting the scalability of the application.
2. **Font Restrictions**: The font used in the original application was a paid font, which posed challenges in maintaining visual consistency without access to the original font.
   
## Contributing
Contributions are welcome! Fork the repository, make your changes, and submit a pull request.
