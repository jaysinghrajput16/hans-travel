Add-Type -AssemblyName System.Drawing

$src = "C:\Users\Mark\.gemini\antigravity-ide\brain\0d40a8bd-f68b-407d-9768-0370c6eca226\.user_uploaded\media_1789121264820.jpg"
$destDir = "C:\Users\Mark\hans travels\public\assets"

if (!(Test-Path $destDir)) {
    New-Item -ItemType Directory -Path $destDir -Force | Out-Null
}

$bmp = [System.Drawing.Bitmap]::FromFile($src)
Write-Host "Original dimensions: $($bmp.Width) x $($bmp.Height)"

# Find the bounding box of non-checkerboard pixels (i.e. the red logo)
# In the checkerboard, pixels are grayscale (R ≈ G ≈ B > 180).
# The red logo has R substantially higher than G and B (e.g. R > 100, R - G > 30, R - B > 30).

$minX = $bmp.Width
$maxX = 0
$minY = $bmp.Height
$maxY = 0

for ($y = 0; $y -lt $bmp.Height; $y++) {
    for ($x = 0; $x -lt $bmp.Width; $x++) {
        $c = $bmp.GetPixel($x, $y)
        # Check if it's red: R is dominant compared to G and B
        $isRed = ($c.R -gt 90) -and ($c.R -gt ($c.G + 25)) -and ($c.R -gt ($c.B + 25))
        if ($isRed) {
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}

Write-Host "Logo bounding box: ($minX, $minY) to ($maxX, $maxY)"
$pad = 20
$cropX = [Math]::Max(0, $minX - $pad)
$cropY = [Math]::Max(0, $minY - $pad)
$cropW = [Math]::Min($bmp.Width - $cropX, ($maxX - $minX) + ($pad * 2))
$cropH = [Math]::Min($bmp.Height - $cropY, ($maxY - $minY) + ($pad * 2))

Write-Host "Crop rect: X=$cropX Y=$cropY W=$cropW H=$cropH"

# Create a transparent PNG with only the logo pixels, or white logo on transparent
# 1. Red logo on transparent background
$outTransparent = New-Object System.Drawing.Bitmap $cropW, $cropH, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

# 2. White logo on transparent background (ideal for dark footer)
$outWhite = New-Object System.Drawing.Bitmap $cropW, $cropH, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

for ($y = 0; $y -lt $cropH; $y++) {
    for ($x = 0; $x -lt $cropW; $x++) {
        $origX = $cropX + $x
        $origY = $cropY + $y
        $c = $bmp.GetPixel($origX, $origY)

        # Measure "redness" / logo opacity
        $diff = [Math]::Max(0, [int]$c.R - [Math]::Max([int]$c.G, [int]$c.B))
        
        if ($diff -gt 20 -and $c.R -gt 80) {
            # Logo pixel - preserve smooth anti-aliased alpha
            $alpha = [Math]::Min(255, [int]($diff * 2.5))
            if ($alpha -gt 255) { $alpha = 255 }
            
            # Red version
            $redCol = [System.Drawing.Color]::FromArgb($alpha, $c.R, $c.G, $c.B)
            $outTransparent.SetPixel($x, $y, $redCol)
            
            # White version for dark footer
            $whiteCol = [System.Drawing.Color]::FromArgb($alpha, 255, 255, 255)
            $outWhite.SetPixel($x, $y, $whiteCol)
        } else {
            # Fully transparent
            $outTransparent.SetPixel($x, $y, [System.Drawing.Color]::Transparent)
            $outWhite.SetPixel($x, $y, [System.Drawing.Color]::Transparent)
        }
    }
}

$outTransparentPath = Join-Path $destDir "hans-logo-footer.png"
$outWhitePath = Join-Path $destDir "hans-logo-footer-white.png"

$outTransparent.Save($outTransparentPath, [System.Drawing.Imaging.ImageFormat]::Png)
$outWhite.Save($outWhitePath, [System.Drawing.Imaging.ImageFormat]::Png)

Write-Host "Saved transparent red logo to: $outTransparentPath"
Write-Host "Saved transparent white logo to: $outWhitePath"

$bmp.Dispose()
$outTransparent.Dispose()
$outWhite.Dispose()
