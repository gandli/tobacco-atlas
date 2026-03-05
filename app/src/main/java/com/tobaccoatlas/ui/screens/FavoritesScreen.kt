package com.tobaccoatlas.ui.screens

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import androidx.lifecycle.viewmodel.compose.viewModel
import com.tobaccoatlas.R
import com.tobaccoatlas.ui.MainViewModel
import com.tobaccoatlas.ui.components.EmptyState
import com.tobaccoatlas.ui.components.ProductCard

@Composable
fun FavoritesScreen(
    contentPadding: PaddingValues,
    onOpenProduct: (String) -> Unit,
) {
    val viewModel: MainViewModel = viewModel()
    val favoriteIds by viewModel.favoriteIds.collectAsStateWithLifecycle()

    val favorites =
        viewModel.allProducts.filter { favoriteIds.contains(it.id) }

    ScreenScaffold(contentPadding) { modifier ->
        AnimatedVisibility(
            visible = favorites.isEmpty(),
            modifier = modifier.fillMaxSize(),
        ) {
            EmptyState(
                title = stringResource(R.string.favorites_empty_title),
                body = stringResource(R.string.favorites_empty_body),
            )
        }

        AnimatedVisibility(
            visible = favorites.isNotEmpty(),
            modifier = modifier.fillMaxSize(),
        ) {
            LazyVerticalGrid(
                columns = GridCells.Adaptive(minSize = 160.dp),
                modifier = Modifier.fillMaxSize(),
                contentPadding = PaddingValues(16.dp),
                horizontalArrangement = Arrangement.spacedBy(12.dp),
                verticalArrangement = Arrangement.spacedBy(12.dp),
            ) {
                items(items = favorites, key = { it.id }) { product ->
                    ProductCard(
                        product = product,
                        favorite = true,
                        onToggleFavorite = { viewModel.toggleFavorite(product.id) },
                        onOpen = { onOpenProduct(product.id) },
                        modifier = Modifier.fillMaxWidth(),
                    )
                }
            }
        }
    }
}
