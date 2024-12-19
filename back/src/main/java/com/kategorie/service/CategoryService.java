package com.kategorie.service;

import com.kategorie.domain.Category;
import com.kategorie.repository.CategoryRepository;
import com.kategorie.service.dto.CategoryDTO;
import com.kategorie.service.mapper.CategoryMapper;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.kategorie.service.specs.CategorySpecs;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cglib.core.Local;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.HttpClientErrorException;

/**
 * Service Implementation for managing {@link com.kategorie.domain.Category}.
 */
@Service
@Transactional
public class CategoryService {

    private static final Logger LOG = LoggerFactory.getLogger(CategoryService.class);

    private final CategoryRepository categoryRepository;

    private final CategoryMapper categoryMapper;

    public CategoryService(CategoryRepository categoryRepository, CategoryMapper categoryMapper) {
        this.categoryRepository = categoryRepository;
        this.categoryMapper = categoryMapper;
    }

    /**
     * Save a category.
     *
     * @param categoryDTO the entity to save.
     * @return the persisted entity.
     */
    public CategoryDTO save(CategoryDTO categoryDTO) {
        LOG.debug("Request to save Category : {}", categoryDTO);
        categoryDTO.setCreationDate(LocalDate.now());
        Category category = categoryMapper.toEntity(categoryDTO);
        category = categoryRepository.save(category);
        return categoryMapper.toDto(category);
    }

    /**
     * Update a category.
     *
     * @param categoryDTO the entity to save.
     * @return the persisted entity.
     */
    public CategoryDTO update(CategoryDTO categoryDTO) {
        LOG.debug("Request to update Category : {}", categoryDTO);
        Category category = categoryMapper.toEntity(categoryDTO);
        category.setCreationDate(categoryRepository.findById(categoryDTO.getId()).orElseThrow().getCreationDate());
        category = categoryRepository.save(category);
        return categoryMapper.toDto(category);
    }

    /**
     * Partially update a category.
     *
     * @param categoryDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<CategoryDTO> partialUpdate(CategoryDTO categoryDTO) {
        LOG.debug("Request to partially update Category : {}", categoryDTO);

        return categoryRepository
            .findById(categoryDTO.getId())
            .map(existingCategory -> {
                categoryMapper.partialUpdate(existingCategory, categoryDTO);

                return existingCategory;
            })
            .map(categoryRepository::save)
            .map(categoryMapper::toDto);
    }

    /**
     * Get all the categories.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<CategoryDTO> findAll(LocalDate createdAfter, LocalDate createdBefore, Boolean isRoot, Long[] childCategories,
                                     String name, Pageable pageable) {
        Specification<Category> specs = Specification.where(null);
        if (createdAfter != null) {
            if (createdBefore != null) {
                specs = specs.and(CategorySpecs.getBetweenDates(createdAfter, createdBefore));
            }
            else specs = specs.and(CategorySpecs.getBetweenDates(createdAfter, LocalDate.now()));
        }

        if (isRoot != null) {
            specs = specs.and(CategorySpecs.getIsRootSpec(isRoot));
        }

        if (childCategories != null && childCategories.length > 0) {
            specs = specs.and(CategorySpecs.getChildCategoriesSpecs(childCategories));
        }

        if (!StringUtils.isBlank(name)) {
            specs = specs.and(CategorySpecs.getNameSpec(name));
        }
        LOG.debug("Request to get all Categories");
        return categoryRepository.findAll(specs,pageable).map(categoryMapper::toDto);
    }

    /**
     * Get one category by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<CategoryDTO> findOne(Long id) {
        LOG.debug("Request to get Category : {}", id);
        return categoryRepository.findById(id).map(categoryMapper::toDto);
    }

    /**
     * Get category children by  parent id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public List<CategoryDTO> findByParentId(Long id) {
        LOG.debug("Request to get Category by Parent id  : {}", id);
        return categoryRepository.findAllByParentCategoryId(id).stream().map(categoryMapper::toDto).toList();
    }

    /**
     * Delete the category by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        LOG.debug("Request to delete Category : {}", id);
        if (categoryRepository.findById(id).isPresent()) {
            if (categoryRepository.findById(id).orElseThrow(() ->
                new HttpClientErrorException(HttpStatusCode.valueOf(404))).getChildCategories().isEmpty())
                categoryRepository.deleteById(id);
            else {
                categoryRepository.findById(id).orElseThrow(() ->
                    new HttpClientErrorException(HttpStatusCode.valueOf(404))).getChildCategories().
                    forEach(this::updateChildrenToOrphans);
                categoryRepository.deleteById(id);
            }
        }
    }

    public void updateChildrenToOrphans(Category category) {
        category.setParentCategory(null);
        categoryRepository.save(category);
    }
}
