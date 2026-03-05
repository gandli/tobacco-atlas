package com.tobaccoatlas.ui.navigation

import androidx.annotation.StringRes
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Favorite
import androidx.compose.material.icons.filled.Forum
import androidx.compose.material.icons.filled.List
import androidx.compose.material.icons.filled.Person
import androidx.compose.ui.graphics.vector.ImageVector
import com.tobaccoatlas.R

enum class BottomTab(
    val route: String,
    @StringRes val labelRes: Int,
    val icon: ImageVector,
) {
    Favorites(Routes.Favorites, R.string.tab_favorites, Icons.Filled.Favorite),
    Brands(Routes.Brands, R.string.tab_brands, Icons.Filled.List),
    Community(Routes.Community, R.string.tab_community, Icons.Filled.Forum),
    Profile(Routes.Profile, R.string.tab_profile, Icons.Filled.Person),
}

