# Hook: postToolUse
# Logs tool execution results

$input = [Console]::In.ReadToEnd() | ConvertFrom-Json
$toolName = $input.toolName
$resultType = $input.toolResult.resultType
$resultText = $input.toolResult.textResultForLlm

# Create logs directory if it doesn't exist
New-Item -ItemType Directory -Force -Path "logs" | Out-Null

# Log to structured JSON Lines format
$logEntry = @{
  timestamp = [DateTimeOffset]::Now.ToUnixTimeSeconds()
  tool = $toolName
  result = $resultType
  text = $resultText
}
$logEntry | ConvertTo-Json -Compress | Add-Content -Path "logs/tool-results.jsonl"

# Alert on failures
if ($resultType -eq "failure") {
  Add-Content -Path "logs/failures.log" -Value "[$(Get-Date)] FAILURE: $toolName - $resultText"
}
