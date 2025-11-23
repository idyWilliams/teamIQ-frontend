'use client';

import React, { useState, useEffect } from 'react';
import { Edit, Loader } from 'lucide-react';
import {
  useOrgProfile,
  useUpdateOrgProfile,
  OrgProfile,
} from '@/services/hooks/useOrgProfile';
import { Input } from '../ui/input';
import { toast } from 'sonner';
import { useAuthStore } from '@/store/useAuthStore';

interface FieldConfig {
  label: string;
  key: keyof OrgProfile;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'url';
  required?: boolean;
}

const fieldSections: {
  id: string;
  title: string;
  fields: FieldConfig[];
}[] = [
  {
    id: 'profile',
    title: 'Organization Profile',
    fields: [
      {
        label: 'Organization Name',
        key: 'organization_name',
        type: 'text',
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
      { label: 'Email', key: 'email', type: 'email' },
    ],
  },
];

const OrganisationProfile = () => {
  const { data, isLoading, error } = useOrgProfile();
  const updateProfile = useUpdateOrgProfile();
  const { updateUser } = useAuthStore();

  //Track which field is currently being edited
  const [editingField, setEditingField] = useState<keyof OrgProfile | null>(
    null
  );

  // Local state to manage form data
  const [formData, setFormData] = useState<Partial<OrgProfile>>({});

  // Sync fetched data to formData state
  useEffect(() => {
    if (data) {
      setFormData(data);
      updateUser({ data });
    }
  }, [data, updateUser]);

  //Updates a single field in the local form state
  const handleChange = (key: keyof OrgProfile, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  // Resets the form data to the original fetched data and exits edit mode
  const handleCancel = () => {
    if (data) {
      setFormData(data);
    }
    setEditingField(null);
  };

  const handleSave = async (fieldKey: keyof OrgProfile) => {
    setEditingField(null);
    if (!data) return;
    const orgId = data.id;
    const fieldValue = formData[fieldKey]; // Get the current value of the field from formData
    try {
      const res = await updateProfile.mutateAsync({
        org_id: orgId,
        data: { [fieldKey]: fieldValue },
      });
      console.log(res);
      updateUser({ data: { ...(res as any)?.data } });
    } catch (err) {
      toast.error('Failed to update organization profile.');
      console.error('Failed to update field:', err);
    }
  };

  if (isLoading)
    return (
      <div className="flex p-5">
        {' '}
        <Loader className="animate-spin" />{' '}
        <span className="ml-2">Loading organization profile...</span>
      </div>
    );
  if (error)
    return (
      <div className="p-5 text-red-600">
        Unable to load organization profile.
      </div>
    );

  return (
    <div className="mx-auto w-full px-5">
      {fieldSections.map(section => (
        <div key={section.id} className="mb-6">
          <h2 className="mb-3 text-lg font-semibold">{section.title}</h2>
          <div className="flex flex-col gap-3 rounded-xl border p-4">
            {/* Render each field in the section */}
            {section.fields.map(field => {
              const isEditing = editingField === field.key;
              const rawValue = formData[field.key] ?? ''; // Use formData to get the current value

              // Safety check to convert rawValue to string for input display
              const value =
                typeof rawValue === 'object'
                  ? JSON.stringify(rawValue)
                  : String(rawValue);

              //disable email field editing
              const isDisable = field.key === 'email';

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
                        disabled={isDisable}
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
                          disabled={updateProfile.isPending}
                          className="rounded bg-blue-600 px-3 py-1 text-sm text-white"
                          onClick={() => handleSave(field.key)}
                        >
                          {updateProfile?.isPending ? 'saving..,' : 'Save'}
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
                        //email field cannot be edited
                        className={`flex items-center gap-1 text-sm ${isDisable ? 'cursor-not-allowed opacity-30' : 'cursor-pointer text-gray-600'}`}
                        disabled={isDisable}
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
