#!/bin/bash

# YouTube Remote Control - macOS & Linux Setup Script
# This script automates the entire setup process.

echo -e "\033[0;36mStarting setup for YouTube Remote Control...\033[0m"

# --- Step 1: Install Git ---
if ! command -v git &> /dev/null
then
    echo -e "\033[0;33mGit not found. Installing...\033[0m"
    # Check for package manager and install Git
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        if command -v apt-get &> /dev/null; then
            sudo apt-get update && sudo apt-get install -y git
        elif command -v yum &> /dev/null; then
            sudo yum install -y git
        else
            echo -e "\033[0;31mCould not find apt-get or yum. Please install Git manually and re-run the script.\033[0m"
            exit 1
        fi
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        # On macOS, the command line tools installer will prompt the user if Git isn't found.
        xcode-select --install
    fi
else
    echo -e "\033[0;32mGit is already installed.\033[0m"
fi


# --- Step 2: Install nvm (Node Version Manager) and Node.js ---
export NVM_DIR="$HOME/.nvm"
if [ ! -s "$NVM_DIR/nvm.sh" ]; then
    echo -e "\033[0;33mNVM (Node Version Manager) not found. Installing...\033[0m"
    # Download and run the nvm install script
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
    # Source nvm to make it available in the current script
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
else
    echo -e "\033[0;32mNVM is already installed.\033[0m"
    # Source nvm if it exists
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
fi

echo -e "\033[0;36mInstalling latest LTS version of Node.js...\033[0m"
nvm install --lts
nvm use --lts


# --- Step 3: Clone the Repository ---
REPO_DIR="remote-control"
if [ -d "$REPO_DIR" ]; then
    echo -e "\033[0;33mProject directory '$REPO_DIR' already exists. Skipping clone.\033[0m"
else
    echo -e "\033[0;36mCloning the project from GitHub...\033[0m"
    git clone https://github.com/Omkar-Shetkar/remote-control.git
fi
cd $REPO_DIR


# --- Step 4: Install Dependencies ---
echo -e "\033[0;36mInstalling project dependencies with npm...\033[0m"
npm install


# --- Step 5: Launch the Application ---
echo -e "\033[0;32mSetup complete! Starting the server...\033[0m"
echo -e "\033[0;33mYou can stop the server at any time by pressing CTRL + C in this window.\033[0m"
npm start
