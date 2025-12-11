// @vitest-environment jsdom
import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import { TypeViewer } from './TypeViewer';
import { ExpansionProvider } from '../context/ExpansionProvider';
import { ExpandedType } from '../../core/transformer/types';

const mockScalar: ExpandedType = {
  kind: 'SCALAR',
  name: 'String',
  description: 'A text string',
};

const mockEnum: ExpandedType = {
  kind: 'ENUM',
  name: 'Role',
  values: [
    { name: 'ADMIN', isDeprecated: false },
    { name: 'USER', isDeprecated: false },
  ],
};

const mockObject: ExpandedType = {
  kind: 'OBJECT',
  name: 'User',
  fields: [
    {
      name: 'id',
      type: { kind: 'SCALAR', name: 'ID' },
      isRequired: true,
      isList: false,
      isDeprecated: false,
    },
    {
      name: 'role',
      type: mockEnum,
      isRequired: false,
      isList: false,
      isDeprecated: false,
    },
  ],
};

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <ExpansionProvider>{children}</ExpansionProvider>
);

describe('TypeViewer', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders a SCALAR type correctly', () => {
    render(
      <TestWrapper>
        <TypeViewer type={mockScalar} />
      </TestWrapper>
    );
    expect(screen.getByText('String')).toBeDefined();
  });

  it('renders an OBJECT type with name', () => {
    render(
      <TestWrapper>
        <TypeViewer type={mockObject} />
      </TestWrapper>
    );
    expect(screen.getByText('User')).toBeDefined();
  });

  it('renders fields of an OBJECT when expanded', () => {
    // default expanded levels = 2, so it should be visible initially if depth 0
    render(
      <TestWrapper>
        <TypeViewer type={mockObject} defaultExpandedLevels={2} />
      </TestWrapper>
    );

    // Check for field names
    expect(screen.getByText('id')).toBeDefined();
    expect(screen.getByText('role')).toBeDefined();
    // Check for nested types
    expect(screen.getByText('ID')).toBeDefined();
    expect(screen.getByText('Role')).toBeDefined();
  });

  it('collapses content when toggled', () => {
    render(
      <TestWrapper>
        <TypeViewer type={mockObject} defaultExpandedLevels={2} />
      </TestWrapper>
    );

    const userType = screen.getByText('User');
    expect(screen.getByText('id')).toBeDefined(); // Initially visible

    // Click to collapse
    fireEvent.click(userType);

    // Should verify fields are gone or hidden.
    // Since rendering is conditional {expanded && ...}, they should be removed from DOM.
    expect(screen.queryByText('id')).toBeNull();

    // Click to expand
    fireEvent.click(userType);
    expect(screen.getByText('id')).toBeDefined();
  });

  it('renders LIST types with brackets', () => {
    const listType: ExpandedType = {
      kind: 'LIST',
      ofType: mockScalar,
    };

    render(
      <TestWrapper>
        <TypeViewer type={listType} />
      </TestWrapper>
    );

    // Verify brackets are rendered with the type name
    // Since they are now part of the text content tree of the specific component
    // we just check if it finds the combined text text nodes possibly split?
    // Or just look for the text content.
    expect(screen.getByText('[String]')).toBeDefined();
  });

  it('renders LIST of OBJECTS correctly', () => {
    const listType: ExpandedType = {
      kind: 'LIST',
      ofType: mockObject,
    };

    render(
      <TestWrapper>
        <TypeViewer type={listType} />
      </TestWrapper>
    );

    expect(screen.getByText('[User]')).toBeDefined();
  });
});
