import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'

export const JobApplications: CollectionConfig = {
  slug: 'job-applications',
  labels: {
    singular: 'Job Application',
    plural: 'Job Applications',
  },
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'email', 'position', 'status', 'createdAt'],
    group: 'Careers',
    description: 'All job applications received from the careers page',
  },
  access: {
    create: () => true, // Public — anyone can submit an application
    read: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'position',
      type: 'relationship',
      relationTo: 'careers',
      required: true,
      label: 'Position Applied For',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'positionTitle',
      type: 'text',
      label: 'Position Title',
      admin: {
        readOnly: true,
        description: 'Snapshot of the job title at time of application',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'fullName',
          type: 'text',
          required: true,
          label: 'Full Name',
          admin: { width: '50%' },
        },
        {
          name: 'email',
          type: 'email',
          required: true,
          label: 'Email Address',
          admin: { width: '50%' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'phone',
          type: 'text',
          required: true,
          label: 'Phone Number',
          admin: { width: '50%' },
        },
        {
          name: 'location',
          type: 'text',
          label: 'Current Location',
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'resume',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Resume / CV',
    },
    {
      name: 'coverLetter',
      type: 'textarea',
      label: 'Cover Letter',
    },
    {
      name: 'linkedIn',
      type: 'text',
      label: 'LinkedIn Profile URL',
    },
    {
      name: 'experience',
      type: 'select',
      label: 'Years of Experience',
      options: [
        { label: '0 - 1 years', value: '0-1' },
        { label: '1 - 3 years', value: '1-3' },
        { label: '3 - 5 years', value: '3-5' },
        { label: '5 - 10 years', value: '5-10' },
        { label: '10+ years', value: '10+' },
      ],
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'new',
      label: 'Application Status',
      options: [
        { label: '🆕 New', value: 'new' },
        { label: '👀 Under Review', value: 'reviewing' },
        { label: '📞 Interview Scheduled', value: 'interview' },
        { label: '✅ Accepted', value: 'accepted' },
        { label: '❌ Rejected', value: 'rejected' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'adminNotes',
      type: 'textarea',
      label: 'Internal Notes',
      admin: {
        position: 'sidebar',
        description: 'Private notes about this applicant (not visible to the applicant)',
      },
    },
  ],
  timestamps: true,
}
