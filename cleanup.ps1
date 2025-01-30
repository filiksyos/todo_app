# Stop all Docker containers
docker compose down

# Remove development artifacts
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue

# Clean Docker system
docker system prune -f

# Reset Docker Desktop (if needed)
# Get-Process "Docker Desktop" -ErrorAction SilentlyContinue | Stop-Process -Force
# Start-Process "C:\Program Files\Docker\Docker\Docker Desktop.exe"

# Clear npm/pnpm cache
pnpm store prune

# Reset port 3000 if it's stuck
$port3000 = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue
if ($port3000) {
    Stop-Process -Id ($port3000.OwningProcess) -Force
}

Write-Host "Cleanup completed. You can now restart your application." 