/** @vitest-environment jsdom */

import { cleanup, render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ROUTES } from '../../../shared/config/routes';
import { RequireLocationLayout } from './RequireLocationLayout';
import { useSearchParamsLocation } from '../../../modules/location/hooks/useSearchParamsLocation';

vi.mock('../../../modules/location/hooks/useSearchParamsLocation', () => ({
  useSearchParamsLocation: vi.fn(),
}));

const mockedUseSearchParamsLocation = vi.mocked(useSearchParamsLocation);

const renderRoute = (initialEntry: string) => {
  const router = createMemoryRouter(
    [
      {
        path: ROUTES.home,
        element: <RequireLocationLayout />,
        children: [{ index: true, element: <div>forecast page</div> }],
      },
      { path: ROUTES.location, element: <div>location page</div> },
    ],
    { initialEntries: [initialEntry] }
  );

  render(<RouterProvider router={router} />);
  return router;
};

afterEach(() => {
  cleanup();
  vi.resetAllMocks();
});

describe('RequireLocationLayout', () => {
  it('opens a valid shared weather URL after its location is resolved', async () => {
    mockedUseSearchParamsLocation.mockReturnValue({
      status: 'valid',
      isLoading: false,
      error: null,
    });

    const router = renderRoute('/?lat=55.75583&lon=37.61778');

    expect(await screen.findByText('forecast page')).toBeTruthy();
    expect(router.state.location.search).toBe('?lat=55.75583&lon=37.61778');
  });

  it.each(['/?foo=bar', '/?lat=55.75'])
  ('clears an incomplete or invalid URL and opens location selection', async (url) => {
    mockedUseSearchParamsLocation.mockReturnValue({
      status: url.includes('lat=') ? 'invalid' : 'missing',
      isLoading: false,
      error: null,
    });

    const router = renderRoute(url);

    expect(await screen.findByText('location page')).toBeTruthy();
    expect(router.state.location).toMatchObject({
      pathname: ROUTES.location,
      search: '',
    });
  });
});
