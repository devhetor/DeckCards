import axios from 'axios';
import { writeFile } from 'fs';

const api = "https://api.scryfall.com";

class deckService {
    async getCommander(commander: string) {
        const response = await axios.get(`${api}/cards/named?exact=${commander}`);
        return response.data
    }
    async getCardsByColor(colors: Array<string>, set: string) {
        const response = await axios.get(`${api}/cards/search?q=colors:${colors?.join(' ')}&unique=cards&order=random&lang=en&page=1&set=${set}`)
        return response.data
    }
    async createDeck() {
        const commander = await this.getCommander("Atraxa, Praetors' Voice");
        const colors = commander.colors;
        const set = commander.set_name;
        const cards = await this.getCardsByColor(colors, set);
        const deck = cards.data.slice(0, 99);

        const commanderType: any = {

            name: commander.name,
            color: commander.colors

        }

        const cardType = deck.map((card: any) => {
            return {
                name: card.name,
                cardColors: card.colors
            }
        }
        )

        const deckType = {
            commanderType,
            cardType

        }

        const jsonData = JSON.stringify(deckType);
        writeFile('deckCards.json', jsonData, (err) => {
            if (err) {
                throw err.message;
            }
            else {
                return "Deck criado com sucesso!"
            }
        }
        )
    }
}
export default new deckService