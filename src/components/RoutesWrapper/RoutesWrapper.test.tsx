import routes from '@/core/route/routes';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { RoutesWrapper } from './RoutesWrapper';

describe('RoutesWrapper', () => {
  it('should render all routes correctly', () => {
    const { getByText } = render(<RoutesWrapper />);

    routes.forEach((route) => {
      if (typeof route.element === 'string') {
        expect(getByText(route.element)).toBeInTheDocument();
      }
    });
  });
});
