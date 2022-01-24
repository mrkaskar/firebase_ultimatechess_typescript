# Serverless firebase multiplayer chess PWA
## Tech Stack
> React
> Typescript
> Firestore
> Realtime firebase

### Features
1. Play with computer bots according to different difficulty 
2. Create chess game room with time and color
3. Join the created game room
4. Play chess in real time
5. Change multiple color board theme
6. Login with Google

### Challenges
1. Chess player time synchronization in serverless environment
2. Stockfish engine level is too high for beginner even with 0 difficulty
3. Bot thinking process is blocking the javascript thread (hanging the whole app)
These challenges are solved as below.

### Solving Challenges
1. One player record the other player time taken in the firestore
2. Using js-chess-engine for beginner chess players in addition to stockfish engine. 
3. Make all chess engine process to be "workers" to process behind with another thread 

### Some Screenshots
***Choose a bot to play with***
![This is an image](https://i.ibb.co/qxy67Dr/screenbud-8a3665ab-e6a9-43d8-86ba-083072cec4a1.png)

***Choose color to play***
![This is an image](https://i.ibb.co/QFtyxr3/screenbud-426e6cc8-d84c-408f-a709-df1d29159341.png)

***Enjoy Bot Game***
![This is an image](https://i.ibb.co/bzLPM5t/screenbud-eb53c34c-de4d-40c4-9fbf-24edf423d125.png)

***Create Online Game***
![This is an image](https://i.ibb.co/LQ3vQq1/screenbud-b45692ea-af39-4aff-9c0c-3e62351798c6.png)

***Wait for other player to join***
![This is an image](https://i.ibb.co/rmRWTd2/screenbud-4a459543-6ee2-4ab3-9ac3-2adc7da35a81.png)

***Other player can see and join the game***
![This is an image](https://i.ibb.co/82wWhYn/screenbud-c397bdea-a432-4d82-b27f-f197bb1f4206.png)

***Enjoy the game real time***
![This is an image](https://i.ibb.co/nQcwRj5/screenbud-2cc7f298-16ff-4ce5-962c-ca2949027a3e.png)

***Change theme, name and photo***
![This is an image](https://i.ibb.co/VT28RD8/screenbud-04b3c43a-694b-47b7-a6fe-d2e8899abb13.png)

***Install as Progressive Web Application***
![This is an image](https://i.ibb.co/fS5tvtC/screenbud-098562ea-5e25-40a1-b3ee-778f1f5a73b7.png)
