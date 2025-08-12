# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


# Shift Scheduler Dashboard

This is an application that allows users to view and manage work shifts. The application supports two user roles: managers and non-managers, each with different levels of access and functionality. Manager users can create an account, create, update and delete positions and employees, and view all shifts within the company, create new shifts, update all shift details, and delete shifts. Meanwhile, other users can view only their own assigned shifts, view shift details, and update the status of their assigned shifts.



## Dependencies

- React
- Axios
- FullCalendar:
  - `@fullcalendar/react`
  - `@fullcalendar/daygrid`
  - `@fullcalendar/timegrid`
  - `@fullcalendar/interaction`
  - `@fullcalendar/list`
- Material UI:
  - `@mui/material`
  - `@mui/icons-material`


## Setup Instructions

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd <project-directory>

2. **Install dependencies**

    ```bash
    npm install

3. **Start the development server**
    ```bash
    npm start