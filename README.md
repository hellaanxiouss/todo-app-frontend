# Todo App

This repository contains the frontend code for the Todo App. The backend is also available and provides necessary API endpoints to manage tasks.

## Features

- **Task Management**: Create, update, delete, and view tasks.
- **User Authentication**: Sign up, log in, and log out functionalities.
- **Task Filtering**: Filter tasks by status (completed, pending).
- **Search**: Search tasks by keyword.
- **Responsive Design**: Mobile and desktop views.
- **Calendar**: (Under Development) Integration with a calendar to view tasks by date.
- **Settings**: (Under Development) User settings and preferences.

## Development Status

- **Calendar**: Currently under development and not functional yet.
- **Settings**: Currently under development and not functional yet.

## File Structure

```
todo-app-frontend/
│
├── public/
│ ├── index.html
│ └── logo1.png
├── src/
│ ├── assets/
│ │ └── banner.png
│ ├── components/
│ │ ├── calendar.jsx (Under Development)
│ │ ├── home-page.jsx
│ │ ├── landing-page.jsx
│ │ ├── login.jsx
│ │ ├── menu.jsx
│ │ ├── pop-up.jsx
│ │ ├── sign-up.jsx
│ │ ├── sticky-wall.jsx
│ │ ├── task-list.jsx
│ │ └── task.jsx
│ ├── context/
│ │ └── app-context.jsx
│ ├── data/
│ │ ├── lists.json
│ │ ├── sticky-wall-data.json
│ │ ├── tags.json
│ │ ├── tasks.json
│ │ └── user-data.json
│ ├── services/
│ │ ├── list-api.jsx
│ │ ├── tag-api.jsx
│ │ ├── task-api.jsx
│ │ └── user-api.jsx
│ ├── utils/
│ │ └── private-route.jsx
│ ├── main.jsx
│ ├── .env
│ ├── .eslintrc.cjs
│ ├── .gitignore
│ ├── index.html
│ ├── package-lock.json
│ ├── package.json
│ ├── postcss.config.js
│ ├── README.md
│ ├── tailwind.config.js
│ ├── vite.config.js
```

## Backend Repository

The backend code for this project is available at [GitHub Repository Link](https://github.com/hellaanxiouss/todo-app-backend).

## Getting Started

To get started with the project, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/hellaanxiouss/todo-app-frontend.git
   cd todo-app-frontend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Run the app**:
   ```bash
   npm run dev
   ```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
