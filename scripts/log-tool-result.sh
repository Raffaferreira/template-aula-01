#!/bin/bash
# Hook: postToolUse
# Logs tool execution results

INPUT=$(cat)
TOOL_NAME=$(echo "$INPUT" | jq -r '.toolName')
RESULT_TYPE=$(echo "$INPUT" | jq -r '.toolResult.resultType')
RESULT_TEXT=$(echo "$INPUT" | jq -r '.toolResult.textResultForLlm')

# Log to structured JSON Lines format
jq -n \
  --arg timestamp "$(date +%s)" \
  --arg tool "$TOOL_NAME" \
  --arg result "$RESULT_TYPE" \
  --arg text "$RESULT_TEXT" \
  '{timestamp: $timestamp, tool: $tool, result: $result, text: $text}' >> logs/tool-results.jsonl

# Alert on failures
if [ "$RESULT_TYPE" = "failure" ]; then
  echo "[$(date)] FAILURE: $TOOL_NAME - $RESULT_TEXT" >> logs/failures.log
fi
