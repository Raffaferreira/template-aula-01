#!/bin/bash
# Hook: preToolUse
# Validates tool usage and can deny dangerous operations

INPUT=$(cat)
TOOL_NAME=$(echo "$INPUT" | jq -r '.toolName')
TOOL_ARGS=$(echo "$INPUT" | jq -r '.toolArgs')

# Log tool usage
echo "[$(date)] Tool: $TOOL_NAME Args: $TOOL_ARGS" >> logs/tool-usage.log

# Block dangerous commands
if [ "$TOOL_NAME" = "bash" ]; then
  COMMAND=$(echo "$TOOL_ARGS" | jq -r '.command')
  
  # Check for dangerous patterns
  if echo "$COMMAND" | grep -qE "rm -rf /|format|DROP TABLE|sudo rm"; then
    echo '{"permissionDecision":"deny","permissionDecisionReason":"Dangerous command blocked by security policy"}'
    exit 0
  fi
fi

# Block editing sensitive files
if [ "$TOOL_NAME" = "edit" ]; then
  PATH_ARG=$(echo "$TOOL_ARGS" | jq -r '.path')
  
  if [[ "$PATH_ARG" =~ (package.json|tsconfig.json|next.config) ]]; then
    echo '{"permissionDecision":"deny","permissionDecisionReason":"Configuration files require manual review"}'
    exit 0
  fi
fi

# Allow by default
echo '{"permissionDecision":"allow"}'
