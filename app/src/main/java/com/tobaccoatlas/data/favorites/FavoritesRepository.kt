package com.tobaccoatlas.data.favorites

import android.content.Context
import androidx.datastore.preferences.core.Preferences
import androidx.datastore.preferences.core.edit
import androidx.datastore.preferences.core.stringSetPreferencesKey
import androidx.datastore.preferences.preferencesDataStore
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map

private val Context.dataStore by preferencesDataStore(name = "favorites")

class FavoritesRepository(private val appContext: Context) {
    private val favoriteIdsKey = stringSetPreferencesKey("favorite_ids")

    val favoriteIds: Flow<Set<String>> =
        appContext.dataStore.data.map { prefs: Preferences ->
            prefs[favoriteIdsKey] ?: emptySet()
        }

    suspend fun toggle(productId: String) {
        appContext.dataStore.edit { prefs ->
            val current = prefs[favoriteIdsKey] ?: emptySet()
            prefs[favoriteIdsKey] =
                if (current.contains(productId)) current - productId else current + productId
        }
    }

    suspend fun setFavorite(productId: String, favorite: Boolean) {
        appContext.dataStore.edit { prefs ->
            val current = prefs[favoriteIdsKey] ?: emptySet()
            prefs[favoriteIdsKey] = if (favorite) current + productId else current - productId
        }
    }
}

