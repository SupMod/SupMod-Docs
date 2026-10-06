#!/usr/bin/env python3
"""
Checks the Markdown pages before a build (python3 scripts/check.py):
  - raw <tags> outside code (VitePress compiles the pages with Vue: an unknown tag breaks the build),
  - {{ }} outside code (Vue interpolation),
  - internal links to pages or anchors that do not exist,
  - pages present in one language but not in the other.
"""
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ALLOWED_TAGS = {'span', 'kbd', 'br', 'div', 'HomePaths', 'img', 'a', 'b', 'strong', 'em', 'p', 'sup', 'sub'}
SKIP = {'node_modules', '.vitepress', 'data', 'scripts', '.git', '.github', 'public'}


def pages():
    for folder, dirs, files in os.walk(ROOT):
        dirs[:] = [d for d in dirs if d not in SKIP]
        for name in files:
            if name.endswith('.md') and name != 'README.md':
                yield os.path.join(folder, name)


def strip_code(text):
    text = re.sub(r'^(`{3,}|~{3,}).*?^\1', '', text, flags=re.S | re.M)
    return re.sub(r'`[^`\n]*`', '', text)


def slug(heading):
    """Same as the slugify of VitePress (@mdit-vue/shared)."""
    custom = re.search(r'\{#([\w-]+)\}\s*$', heading)
    if custom:
        return custom.group(1)
    import unicodedata
    text = re.sub(r'<[^>]+>', '', heading).strip()
    text = re.sub(r'`', '', text)
    text = unicodedata.normalize('NFKD', text)
    text = re.sub('[\u0300-\u036f]', '', text)
    text = re.sub(r'[\x00-\x1f]', '', text)
    text = re.sub(r"[\s~`!@#$%^&*()\-_+=\[\]{}|\\;:\"'\u201c\u201d\u2018\u2019<>,.?/]+", '-', text)
    text = re.sub(r'-{2,}', '-', text).strip('-')
    text = re.sub(r'^(\d)', r'_\1', text)
    return text.lower()


def anchors(path):
    text = open(path, encoding='utf-8').read()
    text = re.sub(r'^(`{3,}).*?^\1', '', text, flags=re.S | re.M)
    return {slug(m.group(1)) for m in re.finditer(r'^#{1,6}\s+(.+)$', text, flags=re.M)}


def target(link, current):
    path, _, anchor = link.partition('#')
    if not path:
        return current, anchor
    if path.startswith('/'):
        base = os.path.join(ROOT, path.lstrip('/'))
    else:
        base = os.path.normpath(os.path.join(os.path.dirname(current), path))
    if base.endswith('/') or os.path.isdir(base):
        candidate = os.path.join(base, 'index.md')
    elif base.endswith('.md'):
        candidate = base
    else:
        candidate = base + '.md'
    return candidate, anchor


errors = []
all_pages = list(pages())
for page in all_pages:
    rel = os.path.relpath(page, ROOT)
    raw = open(page, encoding='utf-8').read()
    body = re.sub(r'^---\n.*?\n---\n', '', raw, flags=re.S)
    text = strip_code(body)
    for m in re.finditer(r'<\s*/?\s*([A-Za-z][\w-]*)', text):
        if m.group(1) not in ALLOWED_TAGS:
            line = text[:m.start()].count('\n') + 1
            errors.append(f'{rel}: raw tag <{m.group(1)}> (around line {line}): put it in `code` or write &lt;')
    if '{{' in text:
        errors.append(f'{rel}: {{{{ outside code')
    for m in re.finditer(r'\]\(([^)\s]+)\)', text):
        link = m.group(1)
        if re.match(r'^(https?:|mailto:)', link):
            continue
        file, anchor = target(link, page)
        if not os.path.exists(file):
            errors.append(f'{rel}: dead link {link}')
        elif anchor and anchor not in anchors(file):
            errors.append(f'{rel}: unknown anchor {link}')
    if not rel.startswith('fr' + os.sep):
        twin = os.path.join(ROOT, 'fr', rel)
        if not os.path.exists(twin):
            errors.append(f'{rel}: no French version (fr/{rel})')

for page in all_pages:
    rel = os.path.relpath(page, ROOT)
    if rel.startswith('fr' + os.sep) and not os.path.exists(os.path.join(ROOT, rel[3:])):
        errors.append(f'{rel}: no English version')

print('\n'.join(errors) if errors else f'{len(all_pages)} pages checked, no problem.')
sys.exit(1 if errors else 0)
