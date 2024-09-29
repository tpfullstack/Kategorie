
package com.kategorie.service.specs;

import com.kategorie.domain.Category;
import com.kategorie.domain.Category_;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import org.springframework.cglib.core.Local;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;
import java.util.List;

public class CategorySpecs {

    private CategorySpecs() {
    }

    public static Specification<Category> getIdSpec(Long id) {
        return (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.equal(root.get("id"), id);
    }

    public static Specification<Category> getChildCategoriesSpecs(List<Long> childCategories) {
        return (root, criteriaQuery, criteriaBuilder) -> {
            Join<Category, Category> categoryJoin = root.join(Category_.childCategories);

            Predicate[] predicates = new Predicate[childCategories.size()];
            for (int i = 0; i < childCategories.size(); i++) {
                predicates[i] = criteriaBuilder.equal(categoryJoin.get("id"), childCategories.get(i));
            }

            return criteriaBuilder.or(predicates);
        };
    }

    public static Specification<Category> getNameSpec(String name) {
        return (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.like(criteriaBuilder.lower(root.get(Category_.name)), "%" + name + "%");
    }

    public static Specification<Category> getIsRootSpec() {
        return (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.isNull(root.get(Category_.PARENT_CATEGORY));
    }

    public static Specification<Category> getBetweenDates(LocalDate afterDate, LocalDate beforeDate) {
        return (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.between(root.get(Category_.CREATION_DATE), afterDate, beforeDate);
    }


}
