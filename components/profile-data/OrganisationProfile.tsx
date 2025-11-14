'use client';

import React, { useState, useEffect } from 'react';
import { Edit } from 'lucide-react';
import {
  useOrgProfile,
  useUpdateOrgProfile,
  OrgProfile,
} from '@/services/hooks/useOrgProfile';
import { Input } from '../ui/input';

interface FieldConfig {
  label: string;
  key: keyof OrgProfile;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'url';
  required?: boolean;
}

const fieldSections: { id: string; title: string; fields: FieldConfig[] }[] = [
  {
    id: 'profile',
    title: 'Organization Profile',
    fields: [
      {
        label: 'Organization Name',
        key: 'organization_name',
        type: 'text',
        required: true,
      },
      { label: 'Business Industry', key: 'sector', type: 'text' },
      { label: 'Employee Size', key: 'team_size', type: 'text' },
    ],
  },
  {
    id: 'location',
    title: 'Business Location',
    fields: [
      { label: 'Country', key: 'country', type: 'text' },
      { label: 'Website', key: 'website', type: 'url' },
    ],
  },
  {
    id: 'contact',
    title: 'Primary Contact',
    fields: [
      { label: 'Phone Number', key: 'phone_number', type: 'tel' },
      { label: 'Email', key: 'email', type: 'email', required: true },
    ],
  },
];

const OrganisationProfile = () => {
  const { data: profileData, isLoading, error, refetch } = useOrgProfile();
  const updateProfile = useUpdateOrgProfile();

  const [editingField, setEditingField] = useState<keyof OrgProfile | null>(
    null
  );
  const [formData, setFormData] = useState<Partial<OrgProfile>>({});

  useEffect(() => {
    if (profileData) {
      setFormData(profileData);
    }
  }, [profileData]);

  const handleChange = (key: keyof OrgProfile, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleCancel = () => {
    if (profileData) {
      setFormData(profileData);
    }
    setEditingField(null);
  };

  const handleSave = async (fieldKey: keyof OrgProfile) => {
    if (!profileData?.id) return;

    const orgId = profileData.id.toString();
    const fieldValue = formData[fieldKey];

    try {
      await updateProfile.mutateAsync({
        org_id: orgId,
        data: { [fieldKey]: fieldValue },
      });
      setEditingField(null);
      refetch();
    } catch (err) {
      console.error('Failed to update field:', err);
    }
  };

  if (isLoading)
    return <div className="p-5">Loading organization profile...</div>;
  if (error)
    return (
      <div className="p-5 text-red-600">
        Unable to load organization profile.
      </div>
    );

  return (
    <div className="mx-auto w-full p-5">
      {fieldSections.map(section => (
        <div key={section.id} className="mb-6">
          <h2 className="mb-3 text-lg font-semibold">{section.title}</h2>
          <div className="flex flex-col gap-3 rounded-xl border p-4">
            {section.fields.map(field => {
              const isEditing = editingField === field.key;
              const rawValue = formData[field.key] ?? '';
              const value = typeof rawValue === 'object' ? JSON.stringify(rawValue) : String(rawValue);

              return (
                <div
                  key={field.key}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3 space-y-1">
                    <span className="text-sm font-medium">{field.label}:</span>
                    {isEditing ? (
                      <Input
                        className="rounded-md border px-2 py-1"
                        type={field.type}
                        value={value}
                        onChange={e => handleChange(field.key, e.target.value)}
                        autoFocus
                      />
                    ) : (
                      <span className="text-sm text-gray-600">
                        {value || 'Not set'}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {isEditing ? (
                      <>
                        <button
                          className="rounded bg-blue-600 px-3 py-1 text-sm text-white"
                          onClick={() => handleSave(field.key)}
                        >
                          Save
                        </button>
                        <button
                          className="rounded border px-3 py-1 text-sm"
                          onClick={handleCancel}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => setEditingField(field.key)}
                        className="flex items-center gap-1 text-sm text-blue-600"
                      >
                        Edit <Edit size={16} />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrganisationProfile;
