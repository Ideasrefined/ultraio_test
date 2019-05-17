# ultraio_test
Ultra.io coding test

# API Testing 
Ultra.postman_collection.json file can be used for Postman tool for testing of API.

# Fetch only publisher data using Game API

Postman request name : get game publisher

Get request for browser: http://127.0.0.1:3000/game/p/publisher/God of war


# Trigger a process that will remove games and apply discounts

Postman request name : Game pruning

Get request for browser: http://127.0.0.1:3000/game/prune


# Routes list 

/* --------------------*/
/* Game routing */
/* --------------------*/


/* Get all games */
router.get('/games',game_controller.index);

/* Get one game by title and publisher */
router.get('/game/:title/:publisher',game_controller.getOne);

/* Get only the publisher of a game */
router.get('/game/p/publisher/:title',game_controller.getPublisher);

/* Create a new game */
router.post('/game',game_controller.create);

/* Delete a game by title and publisher */
router.delete('/game/:title/:publisher',game_controller.delete);

/* Update a game by title */
router.put('/game/:title',game_controller.update);

/* Run the pruning job (delete older than 18 months, Discount on games between 12 and 18 months old) */
router.get('/game/prune',game_controller.prune);

/* --------------------*/
/* Publisher routing */
/* --------------------*/

/* Get all publishers */
router.get('/publishers', publisher_controller.index);

/* Create a new publisher */
router.post('/publisher',publisher_controller.create);

/* Delete a publisher by name */
router.delete('/publisher/:name',publisher_controller.delete);

/* Update a publisher by name */
router.put('/publisher/:name',publisher_controller.update);
