Add-Type -AssemblyName System.Drawing

$target = 'C:\Users\Ramwi\Desktop\LunaNJake\frontend\public\images\Recommendation'
New-Item -ItemType Directory -Force -Path $target | Out-Null

$items = @(
  @{ File = 'Item1.png'; Kind = 'book' },
  @{ File = 'Item2.png'; Kind = 'music' },
  @{ File = 'Item3.png'; Kind = 'shoe' },
  @{ File = 'Item4.png'; Kind = 'cup' },
  @{ File = 'Item5.png'; Kind = 'dance' }
)

$orange = [System.Drawing.Color]::FromArgb(215, 120, 47)
$shadow = [System.Drawing.Color]::FromArgb(60, 215, 120, 47)

foreach ($item in $items) {
  $bmp = New-Object System.Drawing.Bitmap 220, 220
  $graphics = [System.Drawing.Graphics]::FromImage($bmp)
  $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $graphics.Clear([System.Drawing.Color]::Transparent)

  $thick = New-Object System.Drawing.Pen($orange, 8)
  $thin = New-Object System.Drawing.Pen($orange, 5)
  $ghost = New-Object System.Drawing.Pen($shadow, 14)

  switch ($item.Kind) {
    'book' {
      $graphics.DrawArc($ghost, 36, 48, 58, 120, 180, 180)
      $graphics.DrawArc($ghost, 94, 48, 58, 120, 180, -180)
      $graphics.DrawArc($thick, 36, 48, 58, 120, 180, 180)
      $graphics.DrawArc($thick, 94, 48, 58, 120, 180, -180)
      $graphics.DrawLine($thin, 93, 50, 93, 168)
      $graphics.DrawLine($thin, 102, 50, 102, 168)
    }
    'music' {
      $graphics.DrawEllipse($ghost, 55, 126, 34, 26)
      $graphics.DrawEllipse($ghost, 124, 140, 34, 26)
      $graphics.DrawLine($ghost, 86, 138, 86, 52)
      $graphics.DrawLine($ghost, 154, 152, 154, 65)
      $graphics.DrawLine($ghost, 86, 58, 154, 72)
      $graphics.DrawEllipse($thick, 55, 126, 34, 26)
      $graphics.DrawEllipse($thick, 124, 140, 34, 26)
      $graphics.DrawLine($thick, 86, 138, 86, 52)
      $graphics.DrawLine($thick, 154, 152, 154, 65)
      $graphics.DrawLine($thick, 86, 58, 154, 72)
    }
    'shoe' {
      $points = [System.Drawing.Point[]]@(
        [System.Drawing.Point]::new(42, 128),
        [System.Drawing.Point]::new(84, 122),
        [System.Drawing.Point]::new(116, 102),
        [System.Drawing.Point]::new(150, 132),
        [System.Drawing.Point]::new(176, 138),
        [System.Drawing.Point]::new(176, 156),
        [System.Drawing.Point]::new(48, 156)
      )
      $graphics.DrawLines($ghost, $points)
      $graphics.DrawLines($thick, $points)
      $graphics.DrawLine($thin, 86, 122, 102, 140)
      $graphics.DrawLine($thin, 98, 116, 114, 134)
      $graphics.DrawLine($thin, 112, 109, 128, 128)
    }
    'cup' {
      $graphics.DrawArc($ghost, 52, 70, 90, 88, 0, 180)
      $graphics.DrawArc($thick, 52, 70, 90, 88, 0, 180)
      $graphics.DrawLine($thick, 60, 114, 134, 114)
      $graphics.DrawArc($thick, 128, 86, 42, 42, 280, 220)
      $graphics.DrawArc($thin, 82, 42, 46, 26, 190, 160)
      $graphics.DrawArc($thin, 112, 34, 40, 32, 190, 150)
    }
    'dance' {
      $graphics.DrawEllipse($ghost, 98, 34, 24, 24)
      $graphics.DrawEllipse($thick, 98, 34, 24, 24)
      $graphics.DrawLine($ghost, 110, 58, 110, 112)
      $graphics.DrawLine($ghost, 110, 70, 76, 94)
      $graphics.DrawLine($ghost, 110, 78, 146, 94)
      $graphics.DrawLine($ghost, 110, 112, 76, 162)
      $graphics.DrawLine($ghost, 110, 112, 152, 160)
      $graphics.DrawLine($thick, 110, 58, 110, 112)
      $graphics.DrawLine($thick, 110, 70, 76, 94)
      $graphics.DrawLine($thick, 110, 78, 146, 94)
      $graphics.DrawLine($thick, 110, 112, 76, 162)
      $graphics.DrawLine($thick, 110, 112, 152, 160)
      $graphics.DrawArc($thin, 64, 146, 24, 22, 190, 140)
      $graphics.DrawArc($thin, 148, 144, 24, 22, 210, 140)
    }
  }

  $bmp.Save((Join-Path $target $item.File), [System.Drawing.Imaging.ImageFormat]::Png)

  $ghost.Dispose()
  $thick.Dispose()
  $thin.Dispose()
  $graphics.Dispose()
  $bmp.Dispose()
}
