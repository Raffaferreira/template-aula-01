#!/bin/bash
# Hook: userPromptSubmitted
# Logs user prompts to a file

INPUT=$(cat)
PROMPT=$(echo "$INPUT" | jq -r '.prompt')
TIMESTAMP=$(echo "$INPUT" | jq -r '.timestamp')

# Create logs directory if it doesn't exist
mkdir -p logs

# Log the prompt
echo "[$TIMESTAMP] User Prompt: $PROMPT" >> logs/user-prompts.log
