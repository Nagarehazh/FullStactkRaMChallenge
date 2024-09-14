import cron from 'node-cron';
import { CharacterService } from '../service/characterService';
import { RickAndMortyRequest } from '../infrastructure/requests/getCharactersFromApi';
import CharacterRepository from '../infrastructure/respository/characterRepository';

const rickAndMortyRequest = new RickAndMortyRequest();
const characterRepository = new CharacterRepository();
const characterService = new CharacterService(characterRepository, rickAndMortyRequest);

export function startCharacterUpdateJob() {
    cron.schedule('0 */12 * * *', async () => {
        const startTime = new Date();
        console.log(`⏰ Cron Job Iniciado: Actualización de personajes a las ${startTime.toISOString()}`);

        const quantity = 15;

        try {
            await characterService.importCharacters(quantity);
            const endTime = new Date();
            const duration = (endTime.getTime() - startTime.getTime()) / 1000; // Calcular la duración en segundos
            console.log(`✅ Cron Job Finalizado: Personajes actualizados con éxito a las ${endTime.toISOString()}`);
            console.log(`🕒 Duración del Cron Job: ${duration} segundos`);
        } catch (error) {
            console.error('❌ Error al actualizar personajes:', error);
        }
    });
}
