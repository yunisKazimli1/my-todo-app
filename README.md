# Todo Dashboard App

A modern, full-featured todo application built with React, TypeScript, and Vite. This interview project demonstrates clean architecture, state management, and UI/UX best practices.

## Project Overview

The Todo Dashboard is a single-page application that allows users to manage their tasks efficiently. It features a responsive interface with pagination, filtering, sorting, and task management capabilities.

## Tech Stack

- **Frontend Framework**: React 19.2.6
- **Language**: TypeScript 6.0.2
- **Build Tool**: Vite 8.0.12
- **Styling**: Tailwind CSS 3.4.19
- **HTTP Client**: Axios 1.16.1
- **Routing**: React Router DOM 7.15.1
- **Code Quality**: ESLint, TypeScript Compiler

## Key Features

### Core Functionality
- **Create Todos**: Add new tasks with validation (minimum 10 characters)
- **View Todos**: Display tasks in a clean, organized table format
- **Mark Complete**: Check off tasks as done
- **Delete Todos**: Remove unwanted tasks
- **Update Due Dates**: Set and modify task deadlines

### Filtering & Sorting
- **Filter Options**:
  - All: Show all tasks
  - Active: Show incomplete tasks only
  - Completed: Show finished tasks only
  - Overdue: Show tasks past their due date

- **Sort Options**:
  - A-Z: Alphabetical order
  - Z-A: Reverse alphabetical order
  - Due ↑: Earliest due date first
  - Due ↓: Latest due date first

### Pagination
- **Page Size Control**: Select between 5, 10, 20, 50, or 100 items per page
- **Navigation**: Previous/Next buttons and clickable page numbers
- **Smart Pagination**: Intelligently handles edge cases and page boundaries

### UI/UX Features
- **Real-time Validation**: Instant feedback on form inputs
- **Error Handling**: User-friendly error messages from the backend
- **Overdue Indicators**: Visual highlighting for tasks past their due date
- **Completed State**: Grayed-out styling for finished tasks
- **Responsive Design**: Works seamlessly on different screen sizes
- **Loading States**: Feedback during async operations
- **Hover Effects**: Interactive buttons that appear on hover

## Project Structure

```
src/
├── components/          # Reusable React components
│   ├── TodoForm.tsx     # Form for creating new todos
│   ├── TodoTable.tsx    # Table displaying todos with actions
│   └── Pagination.tsx   # Pagination controls
├── pages/               # Page components
│   └── TodoPage.tsx     # Main page layout and orchestration
├── hooks/               # Custom React hooks
│   └── useTodos.ts      # Central state management for todos
├── services/            # API communication layer
│   ├── api.ts           # Axios instance configuration
│   └── todoServices.ts  # Todo API endpoints
├── models/              # TypeScript interfaces and types
│   ├── Todo.ts          # Todo item structure
│   ├── NewTodo.ts       # New todo creation payload
│   ├── PagedResult.ts   # Paginated API response wrapper
│   ├── TodoFilter.ts    # Filter options enumeration
│   ├── TodoSorting.ts   # Sort options enumeration
│   └── UpdateTodoDate.ts # Due date update payload
├── errors/              # Error handling utilities
│   └── apiError.ts      # Error message formatting
├── utils/               # Utility functions
│   └── pagination.ts    # Pagination logic helper
├── App.tsx              # Root component with routing
├── main.tsx             # Application entry point
└── index.css            # Global styles with Tailwind directives
```

## Architecture & Design Patterns

### State Management
- **Custom Hook**: `useTodos()` provides a centralized state management solution
- **Single Responsibility**: Each handler function manages one specific action
- **Automatic Sync**: Page changes trigger automatic data reloads via `useEffect`

### Service Layer
- **Centralized API**: `todoServices.ts` contains all backend communication
- **Error Handling**: Standardized error handling with fallback messages
- **Axios Instance**: Custom configured `api` instance with base URL

### Component Hierarchy
- **TodoPage**: Orchestrates all components and manages global filters/sorting
- **TodoForm**: Encapsulates form logic and validation
- **TodoTable**: Manages todo display and row-level actions
- **Pagination**: Pure presentation component for pagination controls

### Type Safety
- Strong TypeScript typing throughout the application
- Dedicated model interfaces for type checking
- Explicit error types for better error handling

## API Integration

The application communicates with a backend API running at `https://localhost:7176/api`

### Endpoints Used
- `GET /api/todo` - Fetch todos with pagination, filtering, and sorting
- `GET /api/todo/{id}` - Fetch a single todo
- `POST /api/todo` - Create a new todo
- `DELETE /api/todo/{id}` - Delete a todo
- `PATCH /api/todo/{id}/complete` - Mark a todo as complete
- `PATCH /api/todo/{id}/updateDate` - Update todo due date

### Query Parameters
- `page`: Current page number
- `pageSize`: Items per page
- `filterBy`: Filter type (All, Active, Completed, Overdue)
- `sortBy`: Sort type (Az, Za, DueDateEarliestFirst, DueDateLatestFirst)

## Running the Application

### Prerequisites
- Node.js (LTS version)
- Backend API running on `https://localhost:7176`

### Development
```bash
npm install
npm run dev
```
Application runs on `http://localhost:5173`

### Build for Production
```bash
npm run build
```

### Code Quality
```bash
npm run lint
```

### Preview Production Build
```bash
npm preview
```

## Code Quality Standards

- **ESLint**: Configured for React and TypeScript best practices
- **TypeScript Strict Mode**: Enabled for maximum type safety
- **Tailwind CSS**: Utility-first CSS framework for consistent styling
- **PostCSS**: Configured with Autoprefixer for browser compatibility

## Form Validation

### Create Todo Form
- Title must be at least 10 characters long
- Trimmed of whitespace before validation
- Real-time error clearing on user input

### Date Update Form
- Due date cannot be in the past
- Requires confirmation before updating
- Can be cancelled with Escape key or by clicking outside

## Error Handling

The application implements a comprehensive error handling strategy:

- **Network Errors**: "Backend is not reachable" message when API is unavailable
- **Server Errors**: Displays server-provided error messages
- **Validation Errors**: Client-side validation feedback
- **User-Friendly Messages**: All errors are formatted for clarity

## Development Notes

### Key Implementation Details
- Date validation checks only the date portion, ignoring time
- Past date detection normalizes dates to prevent timezone issues
- Pagination adjusts automatically if current page exceeds max pages
- Completed todos cannot be unchecked (UI disabled)
- Edit mode cancellation on outside click using `useRef` and `useEffect`

### Component Communication
- Parent-child communication via props and callbacks
- Sibling communication through shared state in `useTodos` hook
- Page-level state lift-up in `TodoPage` component

### Performance Considerations
- Memoization of component renders where applicable
- Efficient list rendering with proper key usage
- Conditional rendering to minimize DOM updates
- Debounced API calls through controlled pagination

## Styling

- Tailwind CSS for responsive, utility-driven styling
- Custom color scheme with indigo/violet for primary actions
- Red indicators for errors, overdue items
- Gray scale for completed/inactive states
- Hover and transition effects for better UX
