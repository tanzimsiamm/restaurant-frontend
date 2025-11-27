'use client';

import { useState, useEffect } from 'react';
import { ITeam } from '../types';
import { teamService } from '../services/teamService';

export const useTeam = (isActive: boolean = true) => {
  const [teamMembers, setTeamMembers] = useState<ITeam[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        setLoading(true);
        const response = await teamService.getAll(isActive);
        setTeamMembers(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch team members');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, [isActive]);

  return { teamMembers, loading, error };
};