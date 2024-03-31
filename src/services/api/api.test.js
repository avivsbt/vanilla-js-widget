import { vi } from 'vitest';
import { fetchRequest } from './api';

global.fetch = vi.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({ mockData: 'mockValue' }),
    })
);

describe('fetchRequest function', () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    it('fetches data successfully', async () => {
        const url = 'https://example.com/api/data';
        const options = { method: 'GET' };

        const data = await fetchRequest(url, options);

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(url, options);

        expect(data).toEqual({ mockData: 'mockValue' });
    });

    it('throws an error when fetch fails', async () => {
        const errorMessage = 'Network Error';
        global.fetch.mockImplementationOnce(() => Promise.reject(new Error(errorMessage)));

        const url = 'https://example.com/api/data';
        const options = { method: 'GET' };

        await expect(fetchRequest(url, options)).rejects.toThrow(`Failed to fetch: ${errorMessage}`);

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(url, options);
    });
});
