package com.tobaccoatlas.ui.navigation

object Routes {
    const val Favorites = "favorites"
    const val Brands = "brands"
    const val Community = "community"
    const val Profile = "profile"
    const val ProductDetail = "product"

    fun productDetail(id: String): String = "$ProductDetail/$id"
}

