// path: src/hooks/useRoleGuard.js
import { useMemo } from 'react';
import { useAuth } from '../context/AuthContext';

/**
 * Hook returns boolean whether current user has at least one of allowed roles.
 * use: const allowed = useRoleGuard(['admin','manager']);
 */
export default function useRoleGuard(roles) {
  const { user } = useAuth();
  const allowed = useMemo(() => {
    if (!user) return false;
    const arr = Array.isArray(roles) ? roles : [roles];
    return arr.includes(user.role);
  }, [user, roles]);
  return allowed;
}
