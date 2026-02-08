# Hook: userPromptSubmitted
# Logs user prompts to a file

$input = [Console]::In.ReadToEnd() | ConvertFrom-Json
$prompt = $input.prompt
$timestamp = $input.timestamp

# Create logs directory if it doesn't exist
New-Item -ItemType Directory -Force -Path "logs" | Out-Null

# Log the prompt
Add-Content -Path "logs/user-prompts.log" -Value "[$timestamp] User Prompt: $prompt"
