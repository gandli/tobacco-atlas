package com.tobaccoatlas.ui.screens

import androidx.compose.animation.AnimatedContent
import androidx.compose.animation.core.spring
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.animation.togetherWith
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.Scaffold
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material.icons.filled.Favorite
import androidx.compose.material.icons.filled.FavoriteBorder
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.platform.LocalConfiguration
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import androidx.lifecycle.viewmodel.compose.viewModel
import com.tobaccoatlas.R
import com.tobaccoatlas.data.model.Product
import com.tobaccoatlas.data.model.Spec
import com.tobaccoatlas.ui.MainViewModel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ProductDetailScreen(
    productId: String,
    onBack: () -> Unit,
) {
    val viewModel: MainViewModel = viewModel()
    val favoriteIds by viewModel.favoriteIds.collectAsStateWithLifecycle()

    val product = viewModel.allProducts.firstOrNull { it.id == productId }
    val isFavorite = product?.let { favoriteIds.contains(it.id) } == true
    val isZh = LocalConfiguration.current.locales[0].language == "zh"
    val title = product?.let { if (isZh) it.nameZh else it.nameEn } ?: "Product"

    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    Text(
                        text = title,
                        maxLines = 1,
                        overflow = TextOverflow.Ellipsis,
                    )
                },
                navigationIcon = {
                    IconButton(onClick = onBack) {
                        Icon(Icons.Filled.ArrowBack, contentDescription = null)
                    }
                },
                actions = {
                    if (product != null) {
                        AnimatedContent(
                            targetState = isFavorite,
                            transitionSpec = { fadeIn() togetherWith fadeOut() },
                            label = "favoriteIcon",
                        ) { fav ->
                            IconButton(onClick = { viewModel.toggleFavorite(product.id) }) {
                                Icon(
                                    imageVector = if (fav) Icons.Filled.Favorite else Icons.Filled.FavoriteBorder,
                                    contentDescription = null,
                                    tint = if (fav) MaterialTheme.colorScheme.tertiary else MaterialTheme.colorScheme.onSurfaceVariant,
                                )
                            }
                        }
                    }
                },
            )
        },
    ) { innerPadding ->
        AnimatedContent(
            targetState = product,
            transitionSpec = { fadeIn(spring()) togetherWith fadeOut() },
            label = "detailContent",
        ) { p ->
            if (p == null) {
                Column(
                    modifier = Modifier
                        .fillMaxSize()
                        .padding(innerPadding)
                        .padding(24.dp),
                    verticalArrangement = Arrangement.Center,
                ) {
                    Text(text = stringResource(R.string.no_results), style = MaterialTheme.typography.titleMedium)
                    Text(
                        text = "ID: $productId",
                        style = MaterialTheme.typography.bodyMedium,
                        color = MaterialTheme.colorScheme.onSurfaceVariant,
                        modifier = Modifier.padding(top = 8.dp),
                    )
                }
            } else {
                ProductDetailContent(
                    product = p,
                    contentPadding = innerPadding,
                )
            }
        }
    }
}

@Composable
private fun ProductDetailContent(
    product: Product,
    contentPadding: PaddingValues,
) {
    val isZh = LocalConfiguration.current.locales[0].language == "zh"
    val title = if (isZh) product.nameZh else product.nameEn
    val about = if (isZh) product.descriptionZh else product.descriptionEn

    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .padding(contentPadding),
        contentPadding = PaddingValues(16.dp),
        verticalArrangement = Arrangement.spacedBy(14.dp),
    ) {
        item {
            Surface(
                shape = RoundedCornerShape(22.dp),
                tonalElevation = 2.dp,
            ) {
                Column(modifier = Modifier.fillMaxWidth().padding(16.dp)) {
                    BoxHeader(brand = product.brand, title = title, priceCny = product.priceCny)
                    Text(
                        text = stringResource(R.string.mock_notice),
                        style = MaterialTheme.typography.labelSmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant,
                        modifier = Modifier.padding(top = 10.dp),
                    )
                }
            }
        }

        item {
            Text(text = stringResource(R.string.detail_about), style = MaterialTheme.typography.titleMedium)
            Text(
                text = about,
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
                modifier = Modifier.padding(top = 6.dp),
            )
        }

        item {
            Text(text = stringResource(R.string.detail_specs), style = MaterialTheme.typography.titleMedium)
        }

        items(items = product.specs, key = { it.labelEn }) { spec ->
            SpecRow(spec = spec, isZh = isZh)
            HorizontalDivider(modifier = Modifier.padding(top = 10.dp))
        }
        item { Spacer(modifier = Modifier.height(12.dp)) }
    }
}

@Composable
private fun BoxHeader(brand: String, title: String, priceCny: Int) {
    Column {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .height(132.dp)
                .clip(RoundedCornerShape(18.dp))
                .background(
                    Brush.linearGradient(
                        listOf(
                            MaterialTheme.colorScheme.primary.copy(alpha = 0.95f),
                            MaterialTheme.colorScheme.secondary.copy(alpha = 0.95f),
                        ),
                    ),
                )
                .padding(16.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
        ) {
            Column(modifier = Modifier.weight(1f)) {
                Text(
                    text = brand,
                    style = MaterialTheme.typography.labelLarge,
                    color = MaterialTheme.colorScheme.onPrimary,
                    maxLines = 1,
                    overflow = TextOverflow.Ellipsis,
                )
                Text(
                    text = title,
                    style = MaterialTheme.typography.titleLarge,
                    color = MaterialTheme.colorScheme.onPrimary,
                    modifier = Modifier.padding(top = 6.dp),
                    maxLines = 2,
                    overflow = TextOverflow.Ellipsis,
                )
            }
            Text(
                text = "¥$priceCny",
                style = MaterialTheme.typography.titleMedium,
                color = MaterialTheme.colorScheme.tertiary,
                modifier = Modifier.padding(start = 10.dp),
            )
        }
    }
}

@Composable
private fun SpecRow(spec: Spec, isZh: Boolean) {
    Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.SpaceBetween,
    ) {
        Text(
            text = if (isZh) spec.labelZh else spec.labelEn,
            style = MaterialTheme.typography.bodyMedium,
            color = MaterialTheme.colorScheme.onSurface,
        )
        Text(
            text = spec.value,
            style = MaterialTheme.typography.bodyMedium,
            color = MaterialTheme.colorScheme.onSurfaceVariant,
            modifier = Modifier.padding(start = 16.dp),
        )
    }
}
