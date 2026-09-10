import React from 'react';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

export interface SubNavProps {
  title: string;
  subtitle?: string;
  badge?: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: React.ReactNode;
}
