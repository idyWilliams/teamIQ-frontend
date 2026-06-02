import re

with open('/Users/mac/teamIQ-frontend/components/constants.ts', 'r') as f:
    content = f.read()

content = re.sub(r'\bstatusColor:', 'status_color:', content)
content = re.sub(r'\bcategoryColor:', 'category_color:', content)
content = re.sub(r'\btaskId:', 'display_task_id:', content)
content = re.sub(r'\bfiles:', 'file_count:', content)
content = re.sub(r'\battachments:', 'attachment_count:', content)
content = re.sub(r'\bmessages:', 'message_count:', content)

# Remove unused colors
content = re.sub(r'\s*taskIdColor:\s*".*?",', '', content)
content = re.sub(r'\s*fileColor:\s*".*?",', '', content)
content = re.sub(r'\s*fileBackground:\s*".*?",', '', content)
content = re.sub(r'\s*attachmentColor:\s*".*?",', '', content)
content = re.sub(r'\s*attahmentBackground:\s*".*?",', '', content)
content = re.sub(r'\s*messageColor:\s*".*?",', '', content)
content = re.sub(r'\s*messageBackground:\s*".*?",', '', content)

with open('/Users/mac/teamIQ-frontend/components/constants.ts', 'w') as f:
    f.write(content)
