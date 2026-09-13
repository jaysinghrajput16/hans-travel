Add-Type -AssemblyName System.Drawing

$src = "C:\Users\Mark\.gemini\antigravity-ide\brain\0d40a8bd-f68b-407d-9768-0370c6eca226\.user_uploaded\media_1789121264820.jpg"
$destDir = "C:\Users\Mark\hans travels\public\assets"

$bmp = [System.Drawing.Bitmap]::FromFile($src)

# Bounding box
$minX = 349; $maxX = 680
$minY = 456; $maxY = 571
$pad = 10
$cropX = [Math]::Max(0, $minX - $pad)
$cropY = [Math]::Max(0, $minY - $pad)
$cropW = ($maxX - $minX) + ($pad * 2)
$cropH = ($maxY - $minY) + ($pad * 2)

$out = New-Object System.Drawing.Bitmap $cropW, $cropH, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

for ($y = 0; $y -lt $cropH; $y++) {
    for ($x = 0; $x -lt $cropW; $x++) {
        $c = $bmp.GetPixel($cropX + $x, $cropY + $y)
        
        # In the original image, logo pixels are red (R: 130-180, G: 20-40, B: 20-40)
        # Background is checkerboard (white: ~255,255,255 or gray: ~204,204,204)
        $diff = [int]$c.R - [Math]::Max([int]$c.G, [int]$c.B)
        
        if ($diff -gt 35 -and $c.R -gt 90) {
            # Pure red logo pixel
            # Make sure it's slightly vibrant for dark background
            $r = [Math]::Min(255, [int]($c.R * 1.25))
            $g = [int]($c.G * 0.7)
            $b = [int]($c.B * 0.7)
            $alpha = 255
            $out.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($alpha, $r, $g, $b))
        } elseif ($diff -gt 15 -and $c.R -gt 80) {
            # Anti-aliased edge pixel: blend smoothly to prevent halo
            $alphaCalc = [int](($diff / 35.0) * 255)
            $alpha = [Math]::Min(255, [Math]::Max(0, $alphaCalc))
            $r = [Math]::Min(255, [int]($c.R * 1.2))
            $out.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($alpha, $r, 25, 25))
        } else {
            $out.SetPixel($x, $y, [System.Drawing.Color]::Transparent)
        }
    }
}

$savePath = Join-Path $destDir "hans-logo-footer.png"
$out.Save($savePath, [System.Drawing.Imaging.ImageFormat]::Png)
Write-Host "Updated $savePath successfully!"

$bmp.Dispose()
$out.Dispose()
