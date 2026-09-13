$git = "C:\Users\Mark\AppData\Local\Microsoft\WinGet\Packages\Git.MinGit_Microsoft.Winget.Source_8wekyb3d8bbwe\cmd\git.exe"
$gh = "C:\Users\Mark\AppData\Local\Microsoft\WinGet\Packages\GitHub.cli_Microsoft.Winget.Source_8wekyb3d8bbwe\bin\gh.exe"

$token = (& $gh auth token).Trim()
$remoteUrl = "https://$token@github.com/jaysinghrajput16/hans-travel.git"

Write-Host "Pushing to origin main..."
& $git push $remoteUrl main
Write-Host "Push completed."
