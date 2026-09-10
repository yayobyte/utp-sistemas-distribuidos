import React from 'react';

export interface GlobalNavLink {
  label: string;
  path: string;
  icon?: React.ReactNode;
  isSpecial?: boolean;
}
