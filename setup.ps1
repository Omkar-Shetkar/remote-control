# YouTube Remote Control - Windows Setup Script
# This script automates the entire setup process.

# Function to check if running as Administrator
function Test-Admin {
    $currentUser = New-Object Security.Principal.WindowsPrincipal $([Security.Principal.WindowsIdentity]::GetCurrent())
    return $currentUser.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
}

if (-not (Test-Admin)) {
    Write-Host "This script needs to be run with Administrator privileges." -ForegroundColor Red
    Write-Host "Please right-click your PowerShell or Terminal icon and select 'Run as Administrator'." -ForegroundColor Yellow
    Start-Sleep -Seconds 10
    Exit
}

Write-Host "Starting setup for YouTube Remote Control..." -ForegroundColor Cyan

# --- Step 1: Install Chocolatey (Windows Package Manager) if not present ---
Write-Host "Checking for Chocolatey package manager..."
if (-not (Get-Command choco -ErrorAction SilentlyContinue)) {
    Write-Host "Chocolatey not found. Installing..." -ForegroundColor Yellow
    Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
} else {
    Write-Host "Chocolatey is already installed." -ForegroundColor Green
}

# --- Step 2: Install Git and Node.js using Chocolatey ---
Write-Host "Checking for Git and Node.js..."
choco install git nodejs-lts -y --no-progress

# Refresh environment variables to recognize new installations
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

# --- Step 3: Clone the Repository ---
$repoUrl = "https://github.com/Omkar-Shetkar/remote-control.git"
$cloneDir = "remote-control"
if (Test-Path $cloneDir) {
    Write-Host "Project directory '$cloneDir' already exists. Skipping clone." -ForegroundColor Yellow
} else {
    Write-Host "Cloning the project from GitHub..." -ForegroundColor Cyan
    git clone $repoUrl
}
cd $cloneDir

# --- Step 4: Install Dependencies ---
Write-Host "Installing project dependencies with npm..." -ForegroundColor Cyan
npm install

# --- Step 5: Launch the Application ---
Write-Host "Setup complete! Starting the server..." -ForegroundColor Green
Write-Host "You can stop the server at any time by pressing CTRL + C in this window." -ForegroundColor Yellow
npm start
