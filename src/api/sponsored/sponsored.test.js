import { vi } from 'vitest';
import { getSponsoredRecommendations } from './sponsored';
import { data } from '../../lib/data-test';
import { fetchRequest } from '../../services/api/api';

vi.mock('../../services/api/api', () => ({
    fetchRequest: vi.fn()
}));

describe('getSponsoredRecommendations function', () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    it('fetches and dispatches sponsored recommendations successfully', async () => {

        const mockData = data;

        const mockedResponse = {
            json: vi.fn().mockResolvedValue(mockData)
        };

        fetchRequest.mockResolvedValue(mockedResponse);

        await getSponsoredRecommendations();

        expect(fetchRequest).toHaveBeenCalledTimes(1);
        expect(fetchRequest).toHaveBeenCalledWith('http://api.taboola.com/1.0/json/taboola-templates/recommendations.get?app.type=desktop&app.apikey=f9040ab1b9c802857aa783c469d0e0ff7e7366e4&count=100&source.type=video&source.id=');
    });

    it('handles errors correctly', async () => {
        const errorMessage = 'Network Error';
        fetchRequest.mockRejectedValue(new Error(errorMessage));

        console.error = vi.fn();

        await getSponsoredRecommendations();

        expect(fetchRequest).toHaveBeenCalledTimes(1);

        expect(console.error).toHaveBeenCalledWith('Error fetching sponsored recommendations:', new Error(errorMessage));
    });
});
