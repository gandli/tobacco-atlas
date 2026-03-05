@echo off
setlocal

set DIR=%~dp0
set WRAPPER_JAR=%DIR%gradle\wrapper\gradle-wrapper.jar

if not exist "%WRAPPER_JAR%" (
  echo Missing %WRAPPER_JAR%
  echo Open the project in Android Studio and generate the Gradle Wrapper, or add gradle-wrapper.jar.
  exit /b 1
)

if defined JAVA_HOME (
  "%JAVA_HOME%\bin\java.exe" -classpath "%WRAPPER_JAR%" org.gradle.wrapper.GradleWrapperMain %*
) else (
  java -classpath "%WRAPPER_JAR%" org.gradle.wrapper.GradleWrapperMain %*
)

endlocal

