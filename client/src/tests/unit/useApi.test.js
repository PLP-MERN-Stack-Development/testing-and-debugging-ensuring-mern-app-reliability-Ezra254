import { renderHook, waitFor, act } from '@testing-library/react';
import axios from 'axios';
import { useApi } from '../../hooks/useApi';

// Mock axios
jest.mock('axios');

describe('useApi hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches data on mount when immediate is true', async () => {
    const mockData = { id: 1, name: 'Test' };
    axios.mockResolvedValue({ data: mockData });

    const { result } = renderHook(() => useApi('/api/test', {}, true));

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe(null);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBe(null);
    expect(axios).toHaveBeenCalledWith('/api/test', {});
  });

  it('does not fetch on mount when immediate is false', () => {
    const { result } = renderHook(() => useApi('/api/test', {}, false));

    expect(result.current.loading).toBe(false);
    expect(axios).not.toHaveBeenCalled();
  });

  it('handles errors correctly', async () => {
    const errorMessage = 'Network Error';
    axios.mockRejectedValue({ message: errorMessage });

    const { result } = renderHook(() => useApi('/api/test', {}, true));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe(errorMessage);
    expect(result.current.data).toBe(null);
  });

  it('handles API errors with response data', async () => {
    const errorResponse = {
      response: {
        data: {
          error: 'Not Found',
        },
      },
    };
    axios.mockRejectedValue(errorResponse);

    const { result } = renderHook(() => useApi('/api/test', {}, true));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe('Not Found');
  });

  it('refetch function works correctly', async () => {
    const mockData1 = { id: 1 };
    const mockData2 = { id: 2 };
    axios
      .mockResolvedValueOnce({ data: mockData1 })
      .mockResolvedValueOnce({ data: mockData2 });

    const { result } = renderHook(() => useApi('/api/test', {}, true));

    await waitFor(() => {
      expect(result.current.data).toEqual(mockData1);
    });

    act(() => {
      result.current.refetch();
    });

    await waitFor(() => {
      expect(result.current.data).toEqual(mockData2);
    });

    expect(axios).toHaveBeenCalledTimes(2);
  });
});

