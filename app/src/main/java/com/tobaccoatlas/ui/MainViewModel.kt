package com.tobaccoatlas.ui

import android.app.Application
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewModelScope
import com.tobaccoatlas.data.favorites.FavoritesRepository
import com.tobaccoatlas.data.mock.MockCatalog
import com.tobaccoatlas.data.model.Product
import com.tobaccoatlas.data.model.ProductCategory
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch

class MainViewModel(app: Application) : AndroidViewModel(app) {
    private val favoritesRepository = FavoritesRepository(app.applicationContext)

    val allProducts: List<Product> = MockCatalog.products

    val favoriteIds: StateFlow<Set<String>> =
        favoritesRepository.favoriteIds.stateIn(
            scope = viewModelScope,
            started = SharingStarted.WhileSubscribed(stopTimeoutMillis = 5_000),
            initialValue = emptySet(),
        )

    var query by mutableStateOf("")
        private set

    var categoryFilter: ProductCategory? by mutableStateOf(null)
        private set

    var brandFilter: String? by mutableStateOf(null)
        private set

    fun updateQuery(value: String) {
        query = value
    }

    fun updateCategoryFilter(category: ProductCategory?) {
        categoryFilter = category
        brandFilter = null
    }

    fun updateBrandFilter(brand: String?) {
        brandFilter = brand
    }

    fun toggleFavorite(productId: String) {
        viewModelScope.launch { favoritesRepository.toggle(productId) }
    }
}

