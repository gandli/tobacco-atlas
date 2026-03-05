package com.tobaccoatlas.ui.components

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.tobaccoatlas.data.model.Product

@Composable
fun HeroBanner(
    products: List<Product>,
    favoriteIds: Set<String>,
    onToggleFavorite: (String) -> Unit,
    onOpenProduct: (String) -> Unit,
    modifier: Modifier = Modifier,
) {
    Surface(
        modifier = modifier.fillMaxWidth(),
        color = MaterialTheme.colorScheme.surface,
        shape = RoundedCornerShape(22.dp),
        shadowElevation = 6.dp,
    ) {
        Column(modifier = Modifier.padding(top = 16.dp, bottom = 14.dp)) {
            Text(
                text = "中国烟草图鉴",
                style = MaterialTheme.typography.headlineSmall,
                fontWeight = FontWeight.SemiBold,
                color = MaterialTheme.colorScheme.onSurface,
                modifier = Modifier.padding(horizontal = 16.dp),
            )

            LazyRow(
                contentPadding = PaddingValues(horizontal = 16.dp, vertical = 14.dp),
                horizontalArrangement = Arrangement.spacedBy(12.dp),
            ) {
                items(items = products, key = { it.id }) { product ->
                    ProductCard(
                        product = product,
                        favorite = favoriteIds.contains(product.id),
                        onToggleFavorite = { onToggleFavorite(product.id) },
                        onOpen = { onOpenProduct(product.id) },
                        modifier = Modifier.width(240.dp),
                    )
                }
            }
        }
    }
}

