package com.kategorie.domain;

import static com.kategorie.domain.CategoryTestSamples.*;
import static com.kategorie.domain.CategoryTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.kategorie.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class CategoryTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Category.class);
        Category category1 = getCategorySample1();
        Category category2 = new Category();
        assertThat(category1).isNotEqualTo(category2);

        category2.setId(category1.getId());
        assertThat(category1).isEqualTo(category2);

        category2 = getCategorySample2();
        assertThat(category1).isNotEqualTo(category2);
    }

    @Test
    void parentCategoryTest() {
        Category category = getCategoryRandomSampleGenerator();
        Category categoryBack = getCategoryRandomSampleGenerator();

        category.setParentCategory(categoryBack);
        assertThat(category.getParentCategory()).isEqualTo(categoryBack);

        category.parentCategory(null);
        assertThat(category.getParentCategory()).isNull();
    }

    @Test
    void childCategoriesTest() {
        Category category = getCategoryRandomSampleGenerator();
        Category categoryBack = getCategoryRandomSampleGenerator();

        category.addChildCategories(categoryBack);
        assertThat(category.getChildCategories()).containsOnly(categoryBack);
        assertThat(categoryBack.getParentCategory()).isEqualTo(category);

        category.removeChildCategories(categoryBack);
        assertThat(category.getChildCategories()).doesNotContain(categoryBack);
        assertThat(categoryBack.getParentCategory()).isNull();

        category.childCategories(new HashSet<>(Set.of(categoryBack)));
        assertThat(category.getChildCategories()).containsOnly(categoryBack);
        assertThat(categoryBack.getParentCategory()).isEqualTo(category);

        category.setChildCategories(new HashSet<>());
        assertThat(category.getChildCategories()).doesNotContain(categoryBack);
        assertThat(categoryBack.getParentCategory()).isNull();
    }
}
