import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { slugField } from 'payload'

export const Careers: CollectionConfig = {
  slug: 'careers',
  labels: {
    singular: 'Career',
    plural: 'Careers',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'department', 'location', 'type', 'status', 'updatedAt'],
    group: 'Careers',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: () => true,
    update: authenticated,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Job Title',
      admin: {
        description: 'E.g. "Senior Network Engineer", "Sales Representative"',
      },
    },
    {
      name: 'department',
      type: 'select',
      required: true,
      label: 'Department',
      options: [
        { label: 'Engineering', value: 'engineering' },
        { label: 'Sales & Marketing', value: 'sales-marketing' },
        { label: 'Customer Support', value: 'customer-support' },
        { label: 'Operations', value: 'operations' },
        { label: 'Finance', value: 'finance' },
        { label: 'Human Resources', value: 'human-resources' },
        { label: 'Management', value: 'management' },
      ],
    },
    {
      name: 'location',
      type: 'text',
      required: true,
      label: 'Location',
      admin: {
        description: 'E.g. "Nairobi, Kenya" or "Remote"',
      },
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      label: 'Employment Type',
      options: [
        { label: 'Full-Time', value: 'full-time' },
        { label: 'Part-Time', value: 'part-time' },
        { label: 'Contract', value: 'contract' },
        { label: 'Internship', value: 'internship' },
        { label: 'Freelance', value: 'freelance' },
      ],
    },
    {
      name: 'salaryRange',
      type: 'text',
      label: 'Salary Range',
      admin: {
        description: 'E.g. "KES 80,000 - 120,000" or "Competitive"',
      },
    },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
      label: 'Short Summary',
      maxLength: 300,
      admin: {
        description: 'Brief job description shown on the careers listing page (max 300 chars)',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Full Job Description',
    },
    {
      name: 'requirements',
      type: 'array',
      label: 'Requirements',
      minRows: 1,
      fields: [
        {
          name: 'requirement',
          type: 'text',
          required: true,
          label: 'Requirement',
        },
      ],
    },
    {
      name: 'responsibilities',
      type: 'array',
      label: 'Responsibilities',
      fields: [
        {
          name: 'responsibility',
          type: 'text',
          required: true,
          label: 'Responsibility',
        },
      ],
    },
    {
      name: 'benefits',
      type: 'array',
      label: 'Benefits & Perks',
      fields: [
        {
          name: 'benefit',
          type: 'text',
          required: true,
          label: 'Benefit',
        },
      ],
    },
    {
      name: 'deadline',
      type: 'date',
      label: 'Application Deadline',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'dd MMM yyyy',
        },
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'open',
      label: 'Status',
      options: [
        { label: 'Open', value: 'open' },
        { label: 'Closed', value: 'closed' },
        { label: 'On Hold', value: 'on-hold' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Featured Job',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Show this job prominently on the careers page',
      },
    },
    slugField(),
  ],
}
