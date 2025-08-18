# Saudia Express App

A simple and beautiful Node.js/Express application that serves a modern, responsive HTML page.

## Features

- 🚀 **Fast**: Built with Express.js for optimal performance
- 🎨 **Modern**: Beautiful, responsive design with CSS3
- 🔧 **Flexible**: Easy to customize and extend
- 📱 **Responsive**: Works perfectly on all devices

## Prerequisites

- Node.js (version 14 or higher)
- npm (comes with Node.js)

## Installation

1. Clone or download this project
2. Navigate to the project directory
3. Install dependencies:

```bash
npm install
```

## Usage

### Development Mode (with auto-reload)

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

The application will be available at `http://localhost:3000`

## Project Structure

```
saudia-express-app/
├── public/
│   └── index.html          # Main HTML file with beautiful UI
├── server.js               # Express server configuration
├── package.json            # Project dependencies and scripts
└── README.md              # This file
```

## Customization

- **Port**: Change the port by setting the `PORT` environment variable or modifying `server.js`
- **Styling**: Modify the CSS in `public/index.html` to change the appearance
- **Content**: Update the HTML content in `public/index.html`

## Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start the development server with nodemon (auto-reload)

## Dependencies

- **express**: Web framework for Node.js
- **nodemon**: Development dependency for auto-reloading (dev mode only)

## License

MIT License - feel free to use this project for any purpose.
