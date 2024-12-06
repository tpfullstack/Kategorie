package com.kategorie.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.Formula;

/**
 * A Category.
 */
@Entity
@Table(name = "category")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Category implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Size(min = 1)
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "creation_date")
    private LocalDate creationDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "parentCategory", "childCategories" }, allowSetters = true)
    private Category parentCategory;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "parentCategory")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "parentCategory", "childCategories" }, allowSetters = true)
    private Set<Category> childCategories = new HashSet<>();

    @Formula("(SELECT COUNT(c.id) FROM category c WHERE c.parent_category_id = id)")
    private int numberOfChildren;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Category id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public Category name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getCreationDate() {
        return this.creationDate;
    }

    public Category creationDate(LocalDate creationDate) {
        this.setCreationDate(creationDate);
        return this;
    }

    public void setCreationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
    }

    public Category getParentCategory() {
        return this.parentCategory;
    }

    public void setParentCategory(Category category) {
        this.parentCategory = category;
    }

    public Category parentCategory(Category category) {
        this.setParentCategory(category);
        return this;
    }

    public Set<Category> getChildCategories() {
        return this.childCategories;
    }

    public void setChildCategories(Set<Category> categories) {
        if (this.childCategories != null) {
            this.childCategories.forEach(i -> i.setParentCategory(null));
        }
        if (categories != null) {
            categories.forEach(i -> i.setParentCategory(this));
        }
        this.childCategories = categories;
    }

    public Category childCategories(Set<Category> categories) {
        this.setChildCategories(categories);
        return this;
    }

    public Category addChildCategories(Category category) {
        this.childCategories.add(category);
        category.setParentCategory(this);
        return this;
    }

    public Category removeChildCategories(Category category) {
        this.childCategories.remove(category);
        category.setParentCategory(null);
        return this;
    }

    public int getNumberOfChildren() {
        return numberOfChildren;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Category)) {
            return false;
        }
        return getId() != null && getId().equals(((Category) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Category{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", creationDate='" + getCreationDate() + "'" +
            ", parentCategory='" + getParentCategory() + "'" +
            ", numberOfChildren='" + getNumberOfChildren() + "'" +
            "}";
    }
}
