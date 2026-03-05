package com.tobaccoatlas.ui

import androidx.compose.animation.AnimatedContent
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.animation.togetherWith
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import androidx.navigation.NavDestination.Companion.hierarchy
import androidx.navigation.NavGraph.Companion.findStartDestination
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.currentBackStackEntryAsState
import androidx.navigation.compose.rememberNavController
import androidx.navigation.navArgument
import androidx.navigation.NavType
import com.tobaccoatlas.ui.navigation.BottomTab
import com.tobaccoatlas.ui.navigation.Routes
import com.tobaccoatlas.ui.screens.BrandsScreen
import com.tobaccoatlas.ui.screens.CommunityScreen
import com.tobaccoatlas.ui.screens.FavoritesScreen
import com.tobaccoatlas.ui.screens.ProductDetailScreen
import com.tobaccoatlas.ui.screens.ProfileScreen

@Composable
fun AppRoot() {
    val navController = rememberNavController()

    val navBackStackEntry by navController.currentBackStackEntryAsState()
    val currentDestination = navBackStackEntry?.destination
    val currentRoute = currentDestination?.route

    val bottomTabs = BottomTab.entries
    val showBottomBar = bottomTabs.any { it.route == currentRoute }

    Scaffold(
        modifier = Modifier.fillMaxSize(),
        bottomBar = {
            if (showBottomBar) {
                BottomBar(
                    navController = navController,
                    currentDestinationRoute = currentRoute,
                )
            }
        },
    ) { innerPadding ->
        AnimatedContent(
            targetState = innerPadding,
            transitionSpec = { fadeIn() togetherWith fadeOut() },
            label = "rootPadding",
        ) { padding ->
            AppNavHost(navController = navController, contentPadding = padding)
        }
    }
}

@Composable
private fun BottomBar(
    navController: NavHostController,
    currentDestinationRoute: String?,
) {
    val navBackStackEntry by navController.currentBackStackEntryAsState()
    val destination = navBackStackEntry?.destination

    NavigationBar {
        BottomTab.entries.forEach { tab ->
            val selected =
                destination?.hierarchy?.any { it.route == tab.route } == true ||
                    currentDestinationRoute == tab.route

            NavigationBarItem(
                selected = selected,
                onClick = {
                    navController.navigate(tab.route) {
                        popUpTo(navController.graph.findStartDestination().id) {
                            saveState = true
                        }
                        launchSingleTop = true
                        restoreState = true
                    }
                },
                icon = { androidx.compose.material3.Icon(tab.icon, contentDescription = null) },
                label = { Text(stringResource(tab.labelRes)) },
            )
        }
    }
}

@Composable
private fun AppNavHost(
    navController: NavHostController,
    contentPadding: PaddingValues,
) {
    NavHost(
        navController = navController,
        startDestination = Routes.Brands,
    ) {
        composable(Routes.Favorites) {
            FavoritesScreen(
                contentPadding = contentPadding,
                onOpenProduct = { navController.navigate(Routes.productDetail(it)) },
            )
        }
        composable(Routes.Brands) {
            BrandsScreen(
                contentPadding = contentPadding,
                onOpenProduct = { navController.navigate(Routes.productDetail(it)) },
            )
        }
        composable(Routes.Community) {
            CommunityScreen(contentPadding = contentPadding)
        }
        composable(Routes.Profile) {
            ProfileScreen(contentPadding = contentPadding)
        }
        composable(
            route = "${Routes.ProductDetail}/{id}",
            arguments = listOf(navArgument("id") { type = NavType.StringType }),
        ) { backStackEntry ->
            ProductDetailScreen(
                productId = backStackEntry.arguments?.getString("id") ?: "",
                onBack = { navController.popBackStack() },
            )
        }
    }
}

