# Profile Viewer

A profile application for viewing, editing, and adding profiles.

## Up and Running

- `npm install` to install dependencies
- create a `.env` file in the root directory and add the following:
  ```
  REACT_APP_API_TOKEN=someApiKey
  ```
- `npm start` to start the development server

## Implementation

Most of the UI is implemented in the `ProfileList` and `ProfileDrawer` components. Clicking on a profile in the list will open the drawer with the profile details. In the drawer a user can edit the profile. Clicking the edit button will open the profile in edit mode.

There's also a search bar that will search by name, email, or phone number.

## Tech Stack

- [Typescript](https://www.typescriptlang.org/)
- [Material-UI](https://mui.com/material-ui/getting-started/) for UI components
- [Redux Toolkit](https://redux-toolkit.js.org/introduction/getting-started) for state management
- [RTK Query](https://redux-toolkit.js.org/tutorials/rtk-query) for requests
- [Zod](https://zod.dev/) for validation


## Note

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).