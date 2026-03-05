package com.tobaccoatlas.ui.theme

import androidx.compose.material3.ColorScheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color

private val DarkColors: ColorScheme =
    darkColorScheme(
        primary = Primary,
        onPrimary = Color.White,
        secondary = Secondary,
        onSecondary = Color.White,
        tertiary = Accent,
        onTertiary = Color.White,
        background = Background,
        onBackground = Color.White,
        surface = Secondary,
        onSurface = Color.White,
        surfaceVariant = Primary,
        onSurfaceVariant = Color.White,
        outline = Color(0xFF3A3A55),
    )

@Composable
fun TobaccoAtlasTheme(content: @Composable () -> Unit) {
    MaterialTheme(
        colorScheme = DarkColors,
        typography = Typography,
        content = content,
    )
}

