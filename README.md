# Autoban

View the deployed application <a href= "https://autobanprod.herokuapp.com/"> here!</a>

## Value Add Proposal

An app that:

- Allows users to create kanban boards for projects
- Allows users to create teams and create projects assigned to those teams
- View all projects and teams in their unique home page

## Team Members:

- <a href="https://github.com/andrewvenson">Andrew Venson</a>
- <a href="https://github.com/kwilks3">Kim Wilks</a>
- <a href="https://github.com/mmomin11">Mubin Momin</a>
- <a href="https://github.com/tan-x">Tanner Griffin</a>

## Tech Stack

- React
- Sequelize
- MySQL
- Socket.io
- Semantic UI
- Express
- MongoDB
- Electron

## Sprint 1

- Conceptualization and Planning of UI and Database structure
- Built out Project view with corresponding components (Columns, Tasks, Drawer, Header, Labels, etc.)
- Built out Home view to create Teams and Projects
- Built back-end models and controllers using Express and MySQL
- Implented Socket.io for real-time updates from server
- User sign in authentication with Firebase

## Sprint 2

- Implementing "drag and drop" option for tasks, columns, and labels using ReactDnD
- Moving some data to NoSQL database (MongoDB)
- Use Test-Driven Development (TDD) for new features
- React routes for homepage and specific projects
- Wrap App in Electron build for use on desktop
- Allow deletion for team, projects, and tasks (cascading)
- Add user to team functionality

## Documentation

Components:
![image info](./documentation/autoban-compLayout.jpg)

Database:
![image info](./documentation/schema.png)

Home Page:
![home page](./documentation/homeScreen.png)

Project Board:
![project board](./documentation/projectBoard.png)

## License

MIT License
