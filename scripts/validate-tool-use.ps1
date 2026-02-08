# Hook: preToolUse
# Validates tool usage and can deny dangerous operations

$input = [Console]::In.ReadToEnd() | ConvertFrom-Json
$toolName = $input.toolName
$toolArgs = $input.toolArgs | ConvertFrom-Json

# Create logs directory if it doesn't exist
New-Item -ItemType Directory -Force -Path "logs" | Out-Null

# Log tool usage
Add-Content -Path "logs/tool-usage.log" -Value "[$(Get-Date)] Tool: $toolName Args: $($toolArgs | ConvertTo-Json -Compress)"

# Block dangerous commands
if ($toolName -eq "bash") {
  $command = $toolArgs.command
  
  if ($command -match "rm -rf /|format|DROP TABLE|sudo rm") {
    $result = @{
      permissionDecision = "deny"
      permissionDecisionReason = "Dangerous command blocked by security policy"
    }
    $result | ConvertTo-Json -Compress
    exit 0
  }
}

# Block editing sensitive files
if ($toolName -eq "edit") {
  $pathArg = $toolArgs.path
  
  if ($pathArg -match "(package\.json|tsconfig\.json|next\.config)") {
    $result = @{
      permissionDecision = "deny"
      permissionDecisionReason = "Configuration files require manual review"
    }
    $result | ConvertTo-Json -Compress
    exit 0
  }
}

# Allow by default
$result = @{
  permissionDecision = "allow"
}
$result | ConvertTo-Json -Compress
