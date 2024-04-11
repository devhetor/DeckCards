
import { Router } from 'express'
import DeckController from './Deck/deckController'

const routes = Router()
const deckController = new DeckController()

routes.get('/createDeck', deckController.createDeck)
routes.get('/getCommander', deckController.getCommander)
routes.get('/getCardsByColor', deckController.getCardsByColor)

export default routes