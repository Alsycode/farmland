// path: src/components/RoleDropdown.jsx
import React from 'react';

/**
 * Simple role dropdown component.
 * props:
 *  - value: current role
 *  - onChange: (newRole) => void
 *  - disabled: boolean
 */
export default function RoleDropdown({ value, onChange, disabled = false }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange && onChange(e.target.value)}
      className="border rounded px-2 py-1"
      disabled={disabled}
    >
      <option value="user">user</option>
      <option value="manager">manager</option>
      <option value="admin">admin</option>
    </select>
  );
}
