import { CharacterResolver } from "../src/infrastructure/graphql/resolvers/characterResolver";
import { CharacterService } from "../src/service/characterService";
import { getCachedData, setCachedData } from "../src/service/cacheService";

jest.mock('../src/service/characterService');
jest.mock('../src/service/cacheService');

describe('CharacterResolver', () => {
    let characterResolver: CharacterResolver;
    let mockCharacterService: jest.Mocked<CharacterService>;
    let consoleLogSpy: jest.SpyInstance;
    let consoleErrorSpy: jest.SpyInstance;

    beforeAll(() => {
        consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterAll(() => {
        consoleLogSpy.mockRestore();
        consoleErrorSpy.mockRestore();
    });

    beforeEach(() => {
        mockCharacterService = {
            getCharacters: jest.fn(),
        } as any;

        (CharacterService as jest.Mock).mockImplementation(() => mockCharacterService);

        characterResolver = new CharacterResolver();
    });

    describe('getCharacters', () => {
        it('should return cached data if available', async () => {
            const cachedCharacters = [{ id: 1, name: 'Rick' }, { id: 2, name: 'Morty' }];
            (getCachedData as jest.Mock).mockResolvedValue(JSON.stringify(cachedCharacters));

            const result = await characterResolver.getCharacters();

            expect(result).toEqual(cachedCharacters);
            expect(getCachedData).toHaveBeenCalledWith('characters_all_all_all_all_all');
            expect(mockCharacterService.getCharacters).not.toHaveBeenCalled();
        });

        it('should fetch and cache data if not in cache', async () => {
            const characters: any = [{ id: 1, name: 'Rick' }, { id: 2, name: 'Morty' }];
            (getCachedData as jest.Mock).mockResolvedValue(null);
            mockCharacterService.getCharacters.mockResolvedValue(characters);

            const result = await characterResolver.getCharacters();

            expect(result).toEqual(characters);
            expect(getCachedData).toHaveBeenCalledWith('characters_all_all_all_all_all');
            expect(mockCharacterService.getCharacters).toHaveBeenCalledWith({});
            expect(setCachedData).toHaveBeenCalledWith(
                'characters_all_all_all_all_all',
                JSON.stringify(characters),
                3600
            );
        });

        it('should pass filter parameters to the service', async () => {
            const characters: any = [{ id: 1, name: 'Rick' }];
            (getCachedData as jest.Mock).mockResolvedValue(null);
            mockCharacterService.getCharacters.mockResolvedValue(characters);

            await characterResolver.getCharacters('Alive', 'Human', 'Male', 'Rick', 'Earth');

            expect(mockCharacterService.getCharacters).toHaveBeenCalledWith({
                status: 'Alive',
                species: 'Human',
                gender: 'Male',
                name: 'Rick',
                origin: 'Earth'
            });
        });

        it('should throw an error if fetching characters fails', async () => {
            (getCachedData as jest.Mock).mockResolvedValue(null);
            mockCharacterService.getCharacters.mockRejectedValue(new Error('Service error'));

            await expect(characterResolver.getCharacters()).rejects.toThrow('Failed to fetch characters. Please try again later.');

            expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching characters:', expect.any(Error));
        });

        it('should construct the correct cache key', async () => {
            (getCachedData as jest.Mock).mockResolvedValue(null);
            mockCharacterService.getCharacters.mockResolvedValue([]);

            await characterResolver.getCharacters('Alive', 'Human', 'Male', 'Rick', 'Earth');

            expect(getCachedData).toHaveBeenCalledWith('characters_Alive_Human_Male_Rick_Earth');
        });
    });
});