# --- Helper Functions ---
function Print-Info {
    param([string]$message)
    Write-Host "ℹ️  $message" -ForegroundColor Cyan
}

function Print-Success {
    param([string]$message)
    Write-Host "✅ $message" -ForegroundColor Green
}

function Print-Warning {
    param([string]$message)
    Write-Host "⚠️  $message" -ForegroundColor Yellow
}

function Print-Error {
    param([string]$message)
    Write-Host "❌ ERROR: $message" -ForegroundColor Red
    exit 1
}

function Command-Exists {
    param([string]$command)
    return (Get-Command $command -ErrorAction SilentlyContinue)
}

# --- Main Script ---
Clear-Host
Write-Host "🚀 --- YouTube LAN Remote Control Setup (Windows) --- 🚀" -ForegroundColor Magenta
Write-Host "This script will automatically set up the project for you."
Write-Host ""

# 1. Check for Chocolatey Package Manager
$choco_installed = Command-Exists "choco"
if (-not $choco_installed) {
    Print-Warning "Chocolatey package manager not found."
    Print-Info "Chocolatey is recommended for easy installation of dependencies."
    $confirm = Read-Host "Do you want to install Chocolatey now? (y/n)"
    if ($confirm -eq 'y') {
        Print-Info "Installing Chocolatey... 🍫"
        Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
        if (-not (Command-Exists "choco")) {
            Print-Error "Chocolatey installation failed. Please install it manually and re-run the script."
        }
        Print-Success "Chocolatey installed successfully."
    }
}

# 2. Check for Git
Print-Info "Checking for Git..."
if (-not (Command-Exists "git")) {
    Print-Warning "Git is not installed."
    if ($choco_installed) {
        Print-Info "Installing Git using Chocolatey... ⏳"
        choco install git -y --force || Print-Error "Failed to install Git with Chocolatey."
    } else {
        Print-Error "Please install Git manually and re-run the script."
    }
    Print-Success "Git installed."
} else {
    Print-Success "Git is installed."
}

# 3. Check for Node.js
Print-Info "Checking for Node.js..."
if (-not (Command-Exists "node")) {
    Print-Warning "Node.js is not installed."
     if ($choco_installed) {
        Print-Info "Installing Node.js (LTS) using Chocolatey... ⏳"
        choco install nodejs-lts -y --force || Print-Error "Failed to install Node.js with Chocolatey."
    } else {
        Print-Error "Please install Node.js manually and re-run the script."
    }
    Print-Success "Node.js installed."
} else {
    Print-Success "Node.js is installed (version: $(node -v))."
}


# 4. Clone or Update Repository
$repoDir = "remote-control"
if (Test-Path $repoDir) {
    Print-Warning "Directory '$repoDir' already exists. Attempting to update..."
    Push-Location -Path $repoDir
    git pull
    if ($LASTEXITCODE -ne 0) {
        Print-Warning "Failed to update the repository. Using the current local version."
    } else {
        Print-Success "Repository updated to the latest version."
    }
    Pop-Location
} else {
    Print-Info "Cloning the repository from GitHub... 📂"
    git clone https://github.com/Omkar-Shetkar/remote-control.git
    if ($LASTEXITCODE -ne 0) { Print-Error "Failed to clone repository." }
    Print-Success "Repository cloned into '$repoDir'."
}

Set-Location $repoDir

# 5. Install Dependencies
Print-Info "Installing project dependencies with npm... 📦"
npm install
if ($LASTEXITCODE -ne 0) { Print-Error "npm install failed." }
Print-Success "Dependencies installed."

# 6. Start the Server and Open Player
Print-Info "Starting the server in a new window... ▶️"
$playerUrl = "http://localhost:3000/player.html"

# Start the server in a new PowerShell window
Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm start"

# Give the server a moment to start up
Start-Sleep -Seconds 4

Print-Info "Attempting to open the player page in your default browser... 🌐"
Start-Process $playerUrl

Write-Host ""
Print-Success "🎉 Setup is complete! 🎉"
Write-Host "The server is running in a new PowerShell window."
Write-Host "The player page should be open in your browser."
Write-Host "To stop the server, close the new PowerShell window that was opened."
Write-Host ""

