#!/bin/bash

# --- Color Definitions ---
C_RESET='\033[0m'
C_RED='\033[0;31m'
C_GREEN='\033[0;32m'
C_YELLOW='\033[0;33m'
C_BLUE='\033[0;34m'
C_CYAN='\033[0;36m'

# --- Helper Functions ---
print_info() {
    echo -e "${C_BLUE}ℹ️  $1${C_RESET}"
}

print_success() {
    echo -e "${C_GREEN}✅ $1${C_RESET}"
}

print_warning() {
    echo -e "${C_YELLOW}⚠️  $1${C_RESET}"
}

print_error() {
    echo -e "${C_RED}❌ ERROR: $1${C_RESET}"
    exit 1
}

command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# --- Main Script ---
clear
echo -e "${C_CYAN}🚀 --- YouTube LAN Remote Control Setup --- 🚀${C_RESET}"
echo "This script will automatically set up the project for you."
echo

# 1. Check for Git
print_info "Checking for Git..."
if ! command_exists git; then
    print_warning "Git is not installed."
    print_info "Please install Git and re-run the script."
    print_info "On Debian/Ubuntu: sudo apt install git"
    print_info "On macOS (with Homebrew): brew install git"
    exit 1
else
    print_success "Git is installed."
fi

# 2. Check for Node.js and nvm
print_info "Checking for Node.js..."
# Source nvm if it exists to make it available to the script
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

if ! command_exists node; then
    print_warning "Node.js is not installed."
    if ! command_exists nvm; then
        print_info "nvm (Node Version Manager) not found. Installing nvm..."
        curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
        export NVM_DIR="$HOME/.nvm"
        [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # Source nvm again
        print_success "nvm installed."
    fi
    print_info "Installing the latest LTS version of Node.js using nvm... ⏳"
    nvm install --lts || print_error "Failed to install Node.js."
    nvm use --lts
    print_success "Node.js installed."
else
    print_success "Node.js is installed (version: $(node -v))."
fi

# 3. Clone Repository
REPO_DIR="remote-control"
if [ -d "$REPO_DIR" ]; then
    print_warning "Directory '$REPO_DIR' already exists. Updating..."
    cd "$REPO_DIR" || print_error "Could not change to directory '$REPO_DIR'."
    git pull || print_warning "git pull failed. Continuing with the existing version."
    cd ..
else
    print_info "Cloning the repository from GitHub... 📂"
    git clone https://github.com/Omkar-Shetkar/remote-control.git || print_error "Failed to clone repository."
    print_success "Repository cloned into '$REPO_DIR'."
fi

cd "$REPO_DIR" || print_error "Could not change to directory '$REPO_DIR'."

# 4. Install Dependencies
print_info "Installing project dependencies with npm... 📦"
npm install || print_error "npm install failed."
print_success "Dependencies installed."

# 5. Start the Server and Open Player
print_info "Starting the server in the background... ▶️"
npm start &
SERVER_PID=$!

# Give the server a moment to start up
sleep 3

PLAYER_URL="http://localhost:3000/player.html"
print_info "Attempting to open the player page in your default browser... 🌐"

if command_exists xdg-open; then
    xdg-open "$PLAYER_URL" # Linux
elif command_exists open; then
    open "$PLAYER_URL" # macOS
else
    print_warning "Could not automatically open the browser."
fi

echo
print_success "🎉 Setup is complete! 🎉"
echo -e "The server is running in the background (PID: ${C_YELLOW}$SERVER_PID${C_RESET})."
echo -e "The player page should be open in your browser."
echo -e "To stop the server, run: ${C_YELLOW}kill $SERVER_PID${C_RESET}"
echo

