import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';
import './Deck.css';

/** Use Deck API to draw cards one at a time. */
const API_BASE_URL = "https://deckofcardsapi.com/api/deck";

function Deck() {
     const [deck, setDeck] = useState(null);
     const [drawn, setDrawn] = useState([]);
     const [shuffling, setShuffling] = useState(false);

     useEffect(function loadDeckFromAPI() {
          async function loadDeck() {
               const deck = await axios.get(`${API_BASE_URL}/new/shuffle/`);
               setDeck(deck.data);
          }
          loadDeck();
     }, []);


     /** Draw a card from the deck. 
      * Make an API call to draw a card from the deck, 
      * add the card to the drawn list, and update state.
     */

     async function drawCard() {
          try {
               const cardRes = await axios.get(`${API_BASE_URL}/${deck.deck_id}/draw/`);

               if (cardRes.data.remaining === 0) throw new Error('No cards remaining!');

               const card = cardRes.data.cards[0];

               setDrawn(deck => [
                    ...deck,
                    {
                         id: card.code,
                         name: card.suit + " " + card.value,
                         image: card.image
                    }
               ]);
          } catch (err) {
               alert(err);
          }
     }

     /** Shuffle the deck. 
      * Make an API call to shuffle the deck,
      * and update state.
     */

     async function shuffleDeck() {
          setShuffling(true);

          try {
               await axios.get(`${API_BASE_URL}/${deck.deck_id}/shuffle/`);
               setDrawn([]);
          } catch (err) {
               alert(err);
          } finally {
               setShuffling(false);
          }
     }

     /** Return draw button (disabled if shuffling) */
     function renderDrawButton() {
          if (!deck) return null;

          return (
               <button
                    className="Deck-draw"
                    onClick={drawCard}
                    disabled={shuffling}
               >
                    Draw Card
               </button>
          );
     }

     /** Return shuffle button (disabled if already is) */
     function renderShuffleButton() {
          if (!deck) return null;

          return (
               <button
                    className="Deck-shuffle"
                    onClick={shuffleDeck}
                    disabled={shuffling}
               >
                    Shuffle Deck
               </button>
          );
     }

     return (
          <div className="Deck">

               {renderDrawButton()}
               {renderShuffleButton()}

               <div className="Deck-cardarea">{
                    drawn.map(card => (
                         <Card key={card.id} name={card.name} image={card.image} />
                    ))
               }
               </div>
          </div>
     );
}

export default Deck;