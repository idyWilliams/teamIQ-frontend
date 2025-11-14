

export type FieldType = {
  label: string;
  value: string | string[];
};

export type OrganizationDataType = {
  id: number;
  title: string;
  fields: FieldType[];
}[];

export const organizationData: OrganizationDataType = [
  {
    id: 1,
    title: 'Organization Profile',
    fields: [
      { label: 'Organization Name', value: 'I-Sentry Technologies' },
      { label: 'Business Industry', value: 'Technology' },
      { label: 'Employee Size', value: '25 People' },
    ],
  },
  {
    id: 2,
    title: 'Business Location',
    fields: [
      { label: 'Country', value: 'Your location' },
      { label: 'Location', value: 'Your location' },
    ],
  },
  {
    id: 3,
    title: 'Primary Contact',
    fields: [
      { label: 'Contacts', value: ['+2347000000000', '+234578903430'] },
      { label: 'Email', value: 'jamesalfred@gmail.com' },
    ],
  },
];



// Field sections matching the Figma design
export const fieldSections = [
  {
    id: 'profile',
    title: 'Organization Profile',
    fields: [
      {
        label: 'Organization Name',
        key: 'name',
        type: 'text',
        required: true,
        editable: true,
      },
      {
        label: 'Business Industry',
        key: 'sector',
        type: 'text',
        editable: true,
      },
      {
        label: 'Employee Size',
        key: 'team_size',
        type: 'text',
        editable: true,
      },
    ] as FieldConfig[],
  },
  {
    id: 'location',
    title: 'Business Location',
    fields: [
      { label: 'Country', key: 'country', type: 'text', editable: true },
      { label: 'Location', key: 'address', type: 'text', editable: true },
    ] as FieldConfig[],
  },
  {
    id: 'contact',
    title: 'Primary Contact',
    fields: [
      {
        label: 'Contacts',
        key: 'phone_number',
        type: 'tel',
        editable: true,
      },
      {
        label: 'Email',
        key: 'email',
        type: 'email',
        required: true,
        editable: true,
      },
    ] as FieldConfig[],
  },
];

export type FieldConfig = {
  label: string;
  key: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'url';
  required?: boolean;
  editable?: boolean;
};