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
