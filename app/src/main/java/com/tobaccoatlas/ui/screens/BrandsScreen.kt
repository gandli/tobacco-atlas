package com.tobaccoatlas.ui.screens

import androidx.compose.animation.AnimatedContent
import androidx.compose.animation.SizeTransform
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.animation.togetherWith
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.FilterChip
import androidx.compose.material3.FilterChipDefaults
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.SearchBar
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalConfiguration
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import androidx.lifecycle.viewmodel.compose.viewModel
import com.tobaccoatlas.R
import com.tobaccoatlas.data.model.Product
import com.tobaccoatlas.data.model.ProductCategory
import com.tobaccoatlas.ui.MainViewModel
import com.tobaccoatlas.ui.components.HeroBanner
import com.tobaccoatlas.ui.components.ProductCard

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun BrandsScreen(
    contentPadding: PaddingValues,
    onOpenProduct: (String) -> Unit,
) {
    val viewModel: MainViewModel = viewModel()
    val favoriteIds by viewModel.favoriteIds.collectAsStateWithLifecycle()

    var searchActive by remember { mutableStateOf(false) }
    val query = viewModel.query
    val category = viewModel.categoryFilter
    val brand = viewModel.brandFilter

    val filtered = remember(query, category, brand, viewModel.allProducts) {
        viewModel.allProducts
            .asSequence()
            .filter { product ->
                category == null || product.category == category
            }
            .filter { product ->
                brand == null || product.brand == brand
            }
            .filter { product ->
                if (query.isBlank()) return@filter true
                val q = query.trim()
                listOf(
                    product.brand,
                    product.series.orEmpty(),
                    product.nameZh,
                    product.nameEn,
                    product.type.orEmpty(),
                ).any { it.contains(q, ignoreCase = true) }
            }
            .toList()
    }

    val availableBrands =
        remember(category, query, viewModel.allProducts) {
            viewModel.allProducts
                .asSequence()
                .filter { product -> category == null || product.category == category }
                .filter { product ->
                    if (query.isBlank()) return@filter true
                    val q = query.trim()
                    listOf(
                        product.brand,
                        product.series.orEmpty(),
                        product.nameZh,
                        product.nameEn,
                        product.type.orEmpty(),
                    ).any { it.contains(q, ignoreCase = true) }
                }
                .map { it.brand }
                .distinct()
                .sorted()
                .toList()
        }

    val featuredProducts =
        remember(viewModel.allProducts) {
            viewModel.allProducts.take(12)
        }

    ScreenScaffold(contentPadding) { modifier ->
        Column(modifier = modifier.fillMaxSize()) {
            HeroBanner(
                products = featuredProducts,
                favoriteIds = favoriteIds,
                onToggleFavorite = viewModel::toggleFavorite,
                onOpenProduct = onOpenProduct,
                modifier = Modifier.padding(horizontal = 16.dp, vertical = 12.dp),
            )

            SearchBar(
                query = query,
                onQueryChange = viewModel::updateQuery,
                onSearch = { searchActive = false },
                active = searchActive,
                onActiveChange = { searchActive = it },
                placeholder = { Text(stringResource(R.string.search_hint)) },
                modifier = Modifier.padding(horizontal = 16.dp, vertical = 12.dp),
            ) {
                val suggestions = filtered.take(8)
                if (suggestions.isEmpty()) {
                    Text(
                        text = stringResource(R.string.no_results),
                        style = MaterialTheme.typography.bodyMedium,
                        modifier = Modifier.padding(16.dp),
                    )
                } else {
                    suggestions.forEach { product ->
                        SuggestionRow(product = product, onClick = {
                            searchActive = false
                            onOpenProduct(product.id)
                        })
                    }
                }
            }

            CategoryChipsRow(
                selected = category,
                onSelected = viewModel::updateCategoryFilter,
                modifier = Modifier.padding(horizontal = 16.dp),
            )

            AnimatedContent(
                targetState = availableBrands,
                transitionSpec = {
                    (fadeIn() togetherWith fadeOut()).using(SizeTransform(clip = false))
                },
                label = "brandChips",
            ) { brands ->
                if (brands.isNotEmpty()) {
                    LazyRow(
                        contentPadding = PaddingValues(horizontal = 16.dp, vertical = 10.dp),
                        horizontalArrangement = Arrangement.spacedBy(8.dp),
                    ) {
                        item {
                            FilterChip(
                                selected = brand == null,
                                onClick = { viewModel.updateBrandFilter(null) },
                                label = { Text(stringResource(R.string.filter_all)) },
                                colors = FilterChipDefaults.filterChipColors(
                                    selectedContainerColor = MaterialTheme.colorScheme.tertiary.copy(alpha = 0.18f),
                                ),
                            )
                        }
                        items(brands, key = { it }) { b ->
                            FilterChip(
                                selected = brand == b,
                                onClick = { viewModel.updateBrandFilter(b) },
                                label = { Text(b) },
                                colors = FilterChipDefaults.filterChipColors(
                                    selectedContainerColor = MaterialTheme.colorScheme.tertiary.copy(alpha = 0.18f),
                                ),
                            )
                        }
                    }
                } else {
                    Spacer(modifier = Modifier.height(8.dp))
                }
            }

            HorizontalDivider(modifier = Modifier.padding(horizontal = 16.dp))

            LazyVerticalGrid(
                columns = GridCells.Adaptive(minSize = 160.dp),
                modifier = Modifier.fillMaxSize(),
                contentPadding = PaddingValues(16.dp),
                horizontalArrangement = Arrangement.spacedBy(12.dp),
                verticalArrangement = Arrangement.spacedBy(12.dp),
            ) {
                items(items = filtered, key = { it.id }) { product ->
                    ProductCard(
                        product = product,
                        favorite = favoriteIds.contains(product.id),
                        onToggleFavorite = { viewModel.toggleFavorite(product.id) },
                        onOpen = { onOpenProduct(product.id) },
                        modifier = Modifier.fillMaxWidth(),
                    )
                }
            }
        }
    }
}

@Composable
private fun SuggestionRow(product: Product, onClick: () -> Unit) {
    val isZh = LocalConfiguration.current.locales[0].language == "zh"
    val displayName = if (isZh) product.nameZh else product.nameEn
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .clickable(onClick = onClick)
            .padding(horizontal = 16.dp, vertical = 12.dp),
    ) {
        Text(
            text = "${product.brand} · $displayName",
            style = MaterialTheme.typography.bodyMedium,
            modifier = Modifier.weight(1f),
        )
        Text(
            text = "¥${product.priceCny}",
            style = MaterialTheme.typography.labelMedium,
            color = MaterialTheme.colorScheme.onSurfaceVariant,
        )
    }
}

@Composable
private fun CategoryChipsRow(
    selected: ProductCategory?,
    onSelected: (ProductCategory?) -> Unit,
    modifier: Modifier = Modifier,
) {
    LazyRow(
        modifier = modifier,
        contentPadding = PaddingValues(vertical = 6.dp),
        horizontalArrangement = Arrangement.spacedBy(8.dp),
    ) {
        item {
            FilterChip(
                selected = selected == null,
                onClick = { onSelected(null) },
                label = { Text(stringResource(R.string.filter_all)) },
                colors = FilterChipDefaults.filterChipColors(
                    selectedContainerColor = MaterialTheme.colorScheme.tertiary.copy(alpha = 0.18f),
                ),
            )
        }
        item {
            FilterChip(
                selected = selected == ProductCategory.Cigarette,
                onClick = { onSelected(ProductCategory.Cigarette) },
                label = { Text(stringResource(R.string.filter_cigarettes)) },
                colors = FilterChipDefaults.filterChipColors(
                    selectedContainerColor = MaterialTheme.colorScheme.tertiary.copy(alpha = 0.18f),
                ),
            )
        }
        item {
            FilterChip(
                selected = selected == ProductCategory.Cigar,
                onClick = { onSelected(ProductCategory.Cigar) },
                label = { Text(stringResource(R.string.filter_cigars)) },
                colors = FilterChipDefaults.filterChipColors(
                    selectedContainerColor = MaterialTheme.colorScheme.tertiary.copy(alpha = 0.18f),
                ),
            )
        }
        item {
            FilterChip(
                selected = selected == ProductCategory.ECigarette,
                onClick = { onSelected(ProductCategory.ECigarette) },
                label = { Text(stringResource(R.string.filter_ecigarettes)) },
                colors = FilterChipDefaults.filterChipColors(
                    selectedContainerColor = MaterialTheme.colorScheme.tertiary.copy(alpha = 0.18f),
                ),
            )
        }
    }
}
