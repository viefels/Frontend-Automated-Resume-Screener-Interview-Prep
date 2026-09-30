# Automated Resume Screener & Interview Prep (Frontend)

A powerful, intuitive frontend interface for our automated resume screening and interview preparation application. This project is designed to streamline recruitment workflows, handle resume processing, and provide dynamic interview feedback delivery.

## Key Features

- **User Authentication:** Secure login and registration for candidates and HR personnel.
- **Resume Uploads & Processing:** User-friendly interfaces for document uploads with automated screening results.
- **Interview Preparation:** Interactive mock interview sessions and comprehensive feedback delivery.
- **Dashboards:** Dedicated views and analytics tailored for different user roles.

## Tech Stack

- **Framework:** [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Schema Validation:** [Valibot](https://valibot.dev/)
- **Linting & Formatting:** [Oxlint](https://oxc.rs/) + [ESLint](https://eslint.org/)

## Project Structure

This project follows a feature-based architecture to separate global concerns from domain-specific business logic:

```text
src/
├── assets/      # Static files and images
├── components/  # Global UI components (buttons, inputs, cards, etc.)
├── config/      # Application configuration and environment variables
├── context/     # Global React Context providers
├── features/    # Domain-specific modules (e.g., auth, interview, resume)
├── hooks/       # Global/reusable custom React hooks
├── lib/         # Third-party library initializations and wrappers
├── pages/       # Route-level components mapping directly to URLs
├── routes/      # Application routing and layout definitions
├── schemas/     # Valibot schemas for forms and API validation
├── services/    # API integration and external data fetching
└── utils/       # Helper functions and utilities
```

## Getting Started

### Prerequisites

Ensure you have Node.js (v18 or higher) installed on your machine.

### Installation

1. Clone the repository down to your local machine.
2. Navigate into the project directory.
3. Install the project dependencies:
   ```bash
   npm install
   ```

### Running the Application

To start the Vite development server with Hot Module Replacement (HMR):
```bash
npm run dev
```

To build for production:
```bash
npm run build
```

To preview the production build locally:
```bash
npm run preview
```

## Code Quality & Linting

This project uses a dual-linting setup to maximize performance and strictness.

- **Fast linting:** Run `npm run lint:fast` to run Oxlint for lightning-fast syntax and common error checks.
- **Full linting:** Run `npm run lint` to run both Oxlint and ESLint for comprehensive code quality enforcement.
