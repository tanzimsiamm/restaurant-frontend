'use client';

import { useState, useEffect } from 'react';
import { ICategory } from '../types';
import { categoryService } from '../services/categoryService';

export const useCategories = (isActive: boolean = true) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await categoryService.getAll(isActive);
        setCategories(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch categories');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [isActive]);

  return { categories, loading, error };
};