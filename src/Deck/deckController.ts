import deckService from "./deckService";
import { Request, Response } from 'express'

class DeckController {
    public async createDeck(req: Request, res: Response): Promise<void> {
        try {
            const deck = await deckService.createDeck();
            res.status(200).json(deck);
        } catch (error) {
            console.error("Erro ao criar o deck:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    public async getCommander(req: Request, res: Response): Promise<void> {
        try {
            const commander = await deckService.getCommander("Atraxa, Praetors' Voice");
            console.log(commander);
            res.status(200).json(commander);
        } catch (error) {
            console.error("Erro ao buscar o comandate:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    public async getCardsByColor(req: Request, res: Response): Promise<void> {
        try {
            const colors = ["B", "G", "U", "W"];
            const cards = await deckService.getCardsByColor(colors, "Double Masters");
            res.status(200).json(cards);
        } catch (error) {
            console.error("Erro ao buscar cartas pela cor:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
}

export default DeckController;


