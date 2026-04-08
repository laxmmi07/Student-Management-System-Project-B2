# Student Management System — Client

## Prerequisites
- Node.js installed
- MongoDB running locally
- API server must be running on http://localhost:5000

## How to Start the API First
```bash
cd api
npm install
npm run seed
npm run dev
```
API runs at `http://localhost:5000`
API Docs at `http://localhost:5000/docs`

## How to Start the Client

### Option 1 — VS Code Live Server (Recommended)
1. Open the `client` folder in VS Code
2. Right-click `index.html`
3. Click **"Open with Live Server"**
4. Client opens at `http://127.0.0.1:5500`

### Option 2 — Using serve
```bash
npm install -g serve
cd client
serve .
```
Then open `http://localhost:3000`

## How to Run Tests
Tests are located in `api/tests/student.test.js`

Make sure both the API and client are running, then:
```bash
cd api
npx testcafe chromium tests/student.test.js
```
Or with Chrome:
```bash
npx testcafe chrome tests/student.test.js
```

## API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/students | Get all students |
| GET | /api/students/:id | Get student by ID |
| POST | /api/students | Create new student |
| PUT | /api/students/:id | Update student |
| DELETE | /api/students/:id | Delete student |

## Features
- View all students in a table
- Add new students via form
- Edit existing student records
- Delete students with confirmation
- Live search by name, course or email
- Stats dashboard showing totals and averages
- API documentation at `http://localhost:5000/docs`

## Project Structure
```
cet252/
├── api/          — Node.js/Express REST API
├── client/       — HTML/CSS/JS frontend
└── apidoc/       — Generated API documentation site
```

## Figma Designs
 - Lo-Fi WireFrames and Hi-Fi Prototype:
 - [Figma Link] link:- https://www.figma.com/design/dCcMTlWHjcbrRtVqmpkjfz/Untitled?node-id=0-1&t=twwpBMPS18DLhgBL-1