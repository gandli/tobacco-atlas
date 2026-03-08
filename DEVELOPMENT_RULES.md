# Development Rules

## Server Management
- **Single Development Server Rule**: Only one development server should be running per project at any time.
- When working on a project that already has a development server running (e.g., on port 8080), do not start additional instances.
- Before starting a new development server, check if one is already running for the same project.
- Use `lsof -i :<port>` or `netstat -tulpn | grep <port>` to check if a port is already in use.

## Git Worktree for Parallel Development
- **Always use git worktree for parallel development**: When multiple sub-agents or developers need to work on different features simultaneously, use `git worktree add` to create isolated working directories.
- **Worktree naming convention**: Use descriptive names like `feature-user-profile`, `fix-search-bug`, or `agent-docs-branch`.
- **Benefits of worktrees**:
  - No need to stash changes when switching contexts
  - Each worktree has its own node_modules and build artifacts
  - Independent branch management without affecting the main working directory
  - Perfect for sub-agent parallel development
- **Example workflow**:
  ```bash
  # Create a new worktree for a feature
  git worktree add ../tobacco-atlas-feature-x feature-x
  
  # Work in the new directory
  cd ../tobacco-atlas-feature-x
  npm install
  npm run dev
  
  # Switch back to main project when needed
  cd ../tobacco-atlas-web
  ```
- **Cleanup**: Remove worktrees when done using `git worktree remove <path>` or `git worktree prune`.

## Project Workflow
- Always use git worktrees for feature branches to maintain clean separation
- Keep workspace clean by regularly removing unnecessary files and directories
- Commit frequently with meaningful messages
- Use the established tech stack (React + TypeScript + Tailwind CSS + Vite) for web projects

## Code Quality
- Follow existing code patterns and architecture
- Maintain consistent naming conventions
- Write meaningful commit messages
- Keep dependencies updated and address security warnings

## Resource Management
- Be mindful of disk space usage
- Clean up large temporary files and unused dependencies
- Regularly run `npm audit` to check for security vulnerabilities
- Use `.gitignore` appropriately to avoid committing unnecessary files