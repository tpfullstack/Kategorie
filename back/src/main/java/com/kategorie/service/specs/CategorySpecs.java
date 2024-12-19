
package com.kategorie.service.specs;

import com.kategorie.domain.Category;
import com.kategorie.domain.Category_;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;

public class CategorySpecs {

    private CategorySpecs() {
    }

    public static Specification<Category> getIdSpec(Long id) {
        return (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.equal(root.get("id"), id);
    }

    public static Specification<Category> getChildCategoriesSpecs(Long[] childCategories) {
        return (root, criteriaQuery, criteriaBuilder) -> {
            Join<Category, Category> categoryJoin = root.join(Category_.childCategories);

            Predicate[] predicates = new Predicate[childCategories.length];
            for (int i = 0; i < childCategories.length; i++) {
                predicates[i] = criteriaBuilder.equal(categoryJoin.get("id"), childCategories[i]);
            }

            return criteriaBuilder.or(predicates);
        };
    }

    public static Specification<Category> getNameSpec(String name) {
        return (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.like(criteriaBuilder.lower(root.get(Category_.name)), "%" + name + "%");
    }

    public static Specification<Category> getIsRootSpec(Boolean isRoot) {
        if (isRoot == null) return null; // No filtering if not specified
        return (root, query, builder) ->
            isRoot
                ? builder.isNull(root.get(Category_.PARENT_CATEGORY))
                : builder.isNotNull(root.get(Category_.PARENT_CATEGORY));
    }

    public static Specification<Category> getBetweenDates(LocalDate afterDate, LocalDate beforeDate) {
        return (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.between(root.get(Category_.CREATION_DATE), afterDate, beforeDate);
    }

}
