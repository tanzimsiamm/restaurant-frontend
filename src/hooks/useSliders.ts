'use client';

import { useState, useEffect } from 'react';
import { ISlider } from '../types';
import { sliderService } from '../services/sliderService';

export const useSliders = (isActive: boolean = true) => {
  const [sliders, setSliders] = useState<ISlider[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSliders = async () => {
      try {
        setLoading(true);
        const response = await sliderService.getAll(isActive);
        setSliders(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch sliders');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSliders();
  }, [isActive]);

  return { sliders, loading, error };
};