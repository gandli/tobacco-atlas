#!/usr/bin/env sh

# Lightweight Gradle runner.
# - If gradle/wrapper/gradle-wrapper.jar exists, it behaves like the standard Gradle Wrapper.
# - If it's missing, it bootstraps a Gradle distribution from gradle-wrapper.properties and runs it directly.

DIR="$(cd "$(dirname "$0")" && pwd)"

JAVA_CMD="${JAVA_HOME:+$JAVA_HOME/bin/}java"
if [ ! -x "$JAVA_CMD" ]; then
  JAVA_CMD="java"
fi

WRAPPER_JAR="$DIR/gradle/wrapper/gradle-wrapper.jar"
WRAPPER_PROPS="$DIR/gradle/wrapper/gradle-wrapper.properties"

if [ -f "$WRAPPER_JAR" ]; then
  exec "$JAVA_CMD" -classpath "$WRAPPER_JAR" org.gradle.wrapper.GradleWrapperMain "$@"
fi

if [ ! -f "$WRAPPER_PROPS" ]; then
  echo "Missing $WRAPPER_PROPS"
  exit 1
fi

DISTRIBUTION_URL="$(grep -E '^distributionUrl=' "$WRAPPER_PROPS" | sed 's/^distributionUrl=//' | sed 's/\\//g')"
if [ -z "$DISTRIBUTION_URL" ]; then
  echo "Could not read distributionUrl from $WRAPPER_PROPS"
  exit 1
fi

GRADLE_USER_HOME="${GRADLE_USER_HOME:-$DIR/.gradle}"
DISTS_DIR="$GRADLE_USER_HOME/wrapper/dists"
DIST_NAME="$(basename "$DISTRIBUTION_URL")"
DIST_BASE="${DIST_NAME%.zip}"
DIST_TARGET="$DISTS_DIR/$DIST_BASE"
ZIP_PATH="$DIST_TARGET/$DIST_NAME"

mkdir -p "$DIST_TARGET" || exit 1

if [ ! -f "$ZIP_PATH" ]; then
  echo "Bootstrapping Gradle: $DISTRIBUTION_URL"
  if command -v curl >/dev/null 2>&1; then
    curl -L --fail "$DISTRIBUTION_URL" -o "$ZIP_PATH" || exit 1
  elif command -v wget >/dev/null 2>&1; then
    wget "$DISTRIBUTION_URL" -O "$ZIP_PATH" || exit 1
  else
    echo "Neither curl nor wget is available to download Gradle."
    exit 1
  fi
fi

if [ ! -d "$DIST_TARGET/$DIST_BASE" ]; then
  if command -v unzip >/dev/null 2>&1; then
    unzip -q "$ZIP_PATH" -d "$DIST_TARGET" || exit 1
  else
    echo "unzip is required to extract Gradle."
    exit 1
  fi
fi

GRADLE_BIN="$DIST_TARGET/$DIST_BASE/bin/gradle"
if [ ! -x "$GRADLE_BIN" ]; then
  # Some distributions unpack to gradle-x.y without the -bin suffix.
  ALT_DIR="$(ls -1 "$DIST_TARGET" 2>/dev/null | head -n 1)"
  GRADLE_BIN="$DIST_TARGET/$ALT_DIR/bin/gradle"
fi

if [ ! -x "$GRADLE_BIN" ]; then
  echo "Could not find gradle executable under $DIST_TARGET"
  exit 1
fi

exec "$GRADLE_BIN" "$@"
