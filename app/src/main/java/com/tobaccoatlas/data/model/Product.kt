package com.tobaccoatlas.data.model

data class Product(
    val id: String,
    val category: ProductCategory,
    val brand: String,
    val series: String?,
    val nameZh: String,
    val nameEn: String,
    val type: String?,
    val origin: String,
    val priceCny: Int,
    val descriptionZh: String,
    val descriptionEn: String,
    val specs: List<Spec>,
)

