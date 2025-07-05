#!/bin/bash

set -e

if [ -z "$1" ]; then
  echo "Usage: $0 <target-folder>"
  exit 1
fi

TARGET_FOLDER="$1"

GITHUB_USER="joshuajaco"
REPO_NAME="nextjs-template"

REPO_URL="git@github.com:${GITHUB_USER}/${REPO_NAME}.git"

git clone "$REPO_URL" "$TARGET_FOLDER"

rm -f "$TARGET_FOLDER/setup.sh"
rm -rf "$TARGET_FOLDER/.git"

echo "Created template at '$TARGET_FOLDER'."
