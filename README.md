# Texas Health Hackathon Project

This repository contains the web-based health screening application.

## Directory Structure
- `app/frontend`: Next.js web application
- `app/backend`: Backend services (API, core algorithms)
- `models`: Machine learning models (CNNs, LLMs)
- `data`: Training and evaluation datasets
- `notebooks`: Jupyter notebooks for exploratory data analysis
- `docs`: Documentation and specification files

## VM Deployment Specifications

- **Service:** Debian Virtual Machine 
- **Hosting Engine:** Next.js via PM2
- **Operating System:** Linux (Debian)
- **Runtime Stack:** Node 22 LTS (or Node 20 LTS, matching our `package.json` requirements)

### Critical App Configurations

- **Process Management:** PM2 must be configured manually on the VM to run Next.js out of the `app/frontend` directory as `texashealth-ui`.
- **GitHub Secrets:** To enable the CI/CD pipeline via `appleboy/ssh-action`, the following secrets MUST be defined in standard GitHub Repository settings:
  - `HOST`: The public IP address of the virtual machine.
  - `USERNAME`: Set to `azureuser` (or the respective user).
  - `SSH_KEY`: The complete contents of the private `.pem` file associated with the server.
