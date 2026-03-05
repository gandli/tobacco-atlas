package com.tobaccoatlas.ui.screens

import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.padding
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier

@Composable
fun ScreenScaffold(
    contentPadding: PaddingValues,
    content: @Composable (Modifier) -> Unit,
) {
    content(Modifier.padding(contentPadding))
}

