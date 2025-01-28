# Chromia Todo App

A multi-user todo list application built on the Chromia blockchain, allowing users to manage their tasks securely and efficiently through blockchain technology.

![Todo List App Screenshot](todo_app/screenshots/app-overview.png)

## Overview

This application demonstrates the implementation of a blockchain-based todo list using Chromia technology. Users can create accounts, manage their tasks, and track their progress - all secured by blockchain technology.

### Features

- **User Authentication**: Secure login via EVM wallet integration (MetaMask, WalletConnect, etc.)
- **Task Management**: 
  - Create, update, and delete tasks
  - Mark tasks as completed
  - Set due dates for tasks
- **Task Organization**: 
  - Filter tasks by status (completed/active)
  - Sort tasks by due date
- **Blockchain Security**: All data is stored securely on the Chromia blockchain

## How It Works

### Application Flow
```mermaid
graph TD
    A[User] -->|Authenticates with MetaMask| B[Frontend]
    B -->|Interacts with| C[Chromia Blockchain]
    C -->|Stores| D[Tasks]
    C -->|Manages| E[User Account]
    B -->|Displays| F[Task List]
    B -->|Enables| G[Task Management]
    G -->|Create/Update/Delete| D
```

### Authentication Flow
```mermaid
sequenceDiagram
    actor User
    participant MetaMask
    participant Frontend
    participant FT4
    participant Chromia

    User->>Frontend: Click "Connect Wallet"
    Frontend->>MetaMask: Request Account Connection
    MetaMask->>User: Show Connection Prompt
    User->>MetaMask: Approve Connection
    MetaMask->>Frontend: Return Ethereum Address
    Frontend->>MetaMask: Request Message Signature
    MetaMask->>User: Show Signature Request
    User->>MetaMask: Approve Signature
    MetaMask->>Frontend: Return Signed Message
    Frontend->>FT4: Verify Signature
    FT4->>Chromia: Create/Verify Account
    Chromia->>Frontend: Return Account Status
    Frontend->>User: Show Authenticated State
```

The authentication process:
1. User initiates wallet connection
2. MetaMask prompts for wallet access
3. After approval, frontend requests a signature to verify ownership
4. Signed message is verified through FT4 library
5. Chromia blockchain creates/verifies the account
6. User is authenticated and can now manage tasks

## Directory Structure

- **`rell/`**: Contains the blockchain operations code
  - Task management logic
  - User authentication
  - Data structures
- **`src/`**: Frontend application code
  - React components
  - Blockchain integration
  - UI/UX implementation
- Configuration files in root directory

## Getting Started

### Prerequisites

- Node.js (v23 or higher)
- pnpm (v9 or higher)
- An EVM-compatible wallet (MetaMask, WalletConnect, etc.)
- Chrome/Firefox browser
- Docker and Docker Compose
- PostgreSQL (optional, only if running locally without Docker)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/chromia-todo-app.git
cd chromia-todo-app
```

2. Install dependencies:
```bash
pnpm install
```


### Blockchain Setup

> **Important Database Setup Notes:**
> - The Chromia node requires PostgreSQL to store blockchain data
> - We use Docker to ensure a consistent PostgreSQL environment
> - Port 5432 must be available for the PostgreSQL container
> - Any local PostgreSQL service must be stopped to avoid port conflicts

1. Ensure Docker is running on your system

2. Stop your local PostgreSQL service if it's running (to avoid port conflicts):
   - Windows:
      1. Press `Windows + R`, type `services.msc` and press Enter
      2. Find "PostgreSQL Server" in the list
      3. Right-click and select "Stop" as shown below
      ![Stopping PostgreSQL in Windows Services](todo_app/screenshots/windows-postgresql-service.png)
   - Linux: `sudo service postgresql stop`
   - macOS: `brew services stop postgresql`

3. Start the PostgreSQL container:
```bash
docker-compose up -d
```

4. Install Chromia dependencies:
```bash
cd rell
chr install
```

5. Start the local node:
```bash
chr node start --wipe
```

6. Return to the project root and configure environment:
```bash
cd ..
```
Create a `.env` file in the `todo_app` directory based on `.env.example`:
```bash
cd todo_app
```
Add the following to your `.env` file:
```bash
NEXT_PUBLIC_NODE_URL=http://localhost:7740
NEXT_PUBLIC_BRID=<Your_BRID>
```
Get your BRID from the startup logs and update your `.env` file:
   - Look for the BRID in the node startup logs
   - Copy the BRID value and paste it into your `.env` file's `NEXT_PUBLIC_BRID` field
   ![Finding BRID in logs](todo_app/screenshots/brid-location.png)

7. Return to the `rell` directory and run tests:
```bash
cd ../rell
chr test
```

### Frontend Setup

1. Ensure you're in the `todo_app` directory:
```bash
cd ../todo_app
```

2. Start the development server:
```bash
pnpm dev
```

2. Access the application at `http://localhost:3000`

## Usage Guide

### Account Creation
![Account Creation](todo_app/screenshots/account-creation.png)
1. Click "Connect Wallet"
2. Follow your wallet's prompts
3. Your account will be created automatically

### Managing Tasks
![Task Management](todo_app/screenshots/task-management.png)
1. Click "Add Task" to create new tasks
2. Use checkboxes to mark tasks complete
3. Click edit/delete icons to modify tasks
4. Use filters to sort and organize tasks

## Technologies Used

- **Frontend**: Next.js, TailwindCSS, React Query
- **Blockchain**: Chromia, Rell
- **Authentication**: MetaMask
- **UI Components**: shadcn/ui, Radix
- **Form Handling**: react-hook-form, zod

## Author

- Name: [Your Name]
- Email: [your.email@example.com]
- GitHub: [@yourusername](https://github.com/yourusername)

---

Made with ❤️ using Chromia Blockchain Technology

