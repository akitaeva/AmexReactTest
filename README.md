# AmexReactTest - Design System Library

## Getting Started

### Prerequisites

- **Node.js** (>= 16.0.0)
- **npm** or **yarn**

### Installation

```bash
git clone <https://github.com/akitaeva/AmexReactTest.git>
cd amex-react-test
npm install
```

## Project Structure

```mathematica
amex-react-test/
├── src/ # Source code for the project
│ ├── app/ # Root-level application components
│ │ └── App.tsx # Main application entry component
│ ├── components/ # Reusable UI components
│ │ └── Modal/ # Modal component folder
│ │ ├── Modal.tsx # Modal component implementation
│ │ └── Modal.test.tsx # Unit tests for the Modal component
│ ├── index.tsx # Entry point for the component library
│ ├── styles/ # Global and shared CSS styles
│ └── global.css # Global stylesheet
├── public/ # Static assets (e.g., images, fonts)
├── .env.example # Example environment variable file
├── .gitignore # Git ignored files and directories
├── .prettierrc # Prettier configuration for code formatting
├── vitest.setup.ts # Vitest global setup file
├── vite.config.ts # Vite configuration file for bundling
├── eslint.config.js # ESLint configuration for linting
├── tsconfig.json # TypeScript compiler configuration
├── package.json # Project metadata and NPM scripts
└── README.md # Project documentation
```

## Components

- Modal: A reusable and accessible modal dialog component.

## Testing

Run tests using Vitest:

```bash
npm test
```

## Development

Run the development server with:

```bash
npm run dev
```

## License

This project is licensed under the MIT License. See the LICENSE file for details.
