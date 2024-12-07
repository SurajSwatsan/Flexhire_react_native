# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# Add any project specific keep options here:
# Time4J - Preserve classes and methods to avoid R8 warnings
-keep class net.time4j.** { *; }
-keepclassmembers class net.time4j.** { *; }

# Suppress warnings related to Time4J
-dontwarn net.time4j.**
