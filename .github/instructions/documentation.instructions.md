---
applyTo: "{docs,readers}/**/*.md"
---
# Project documentation writing guidelines

## File Naming Convention for Documentation
- **All documentation files in `readers/` directory MUST follow chronological naming**
- **Pattern**: `{number} - {ORIGINAL_NAME}.md`
- **Example**: `1 - README.md`, `2 - DASHBOARD_ROUTES.md`, `49 - ROLES_SUPABASE_SUMMARY.md`
- **Numbering**: Sequential from 1 to N, based on file creation date (oldest = 1, newest = N)
- **Purpose**: Provides visual chronological order of documentation evolution
- **IMPORTANT**: When creating new documentation in `readers/`:
  1. Check the highest number currently used
  2. Add your file with next number: `{N+1} - YOUR_FILE_NAME.md`
  3. Never change existing numbers - they represent creation order history

## General Guidelines
- Write clear and concise documentation.
- Use consistent terminology and style.
- Include code examples where applicable.

## Grammar
* Use present tense verbs (is, open) instead of past tense (was, opened).
* Write factual statements and direct commands. Avoid hypotheticals like "could" or "would".
* Use active voice where the subject performs the action.
* Write in second person (you) to speak directly to readers.

## Language
- Use simple and straightforward language.
- Avoid jargon and technical terms unless necessary; explain them if used.
- Use short sentences and paragraphs for better readability.
- Use bullet points and numbered lists to organize information.
- Include a table of contents for longer documents.
- Use consistent formatting for code snippets and commands.
- Use proper headings and subheadings to structure the content.
- Use links to reference related documents or external resources.
- Proofread for spelling and grammar errors.
- Use images or diagrams to illustrate complex concepts when needed.
- Use a friendly and approachable tone.
- Use pt-br as the primary language for documentation, and do not mix with other languages or consider translations unless absolutely necessary.

## Markdown Guidelines
- Use headings to organize content.
- Use bullet points for lists.
- Include links to related resources.
- Use code blocks for code snippets.

