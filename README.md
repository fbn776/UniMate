# UniMate

UniMate is your go-to companion for navigating college life smoothly
and effortlessly. Designed with college students in mind, Unimate
simplifies your daily routines, helps you stay organized, and empowers
you to excel in your academic journey.

UniMate was built by my team `HackHive` during a 8 hour Hackthon conducted at RIT Kottayam.

## Getting Started

Clone the repository and do the following.

### Backend

Open a terminal session and do the following;

Rename the `/backend/.env.example` file to `/backend/.env` and update the values accordingly.
Obtain the Gemni API key from [aistudio.google](https://aistudio.google.com/app/apikey) and update `backend/.env` as shown below.

```env
Gemini_key=<insert key here>
PORT=5026
```

```bash
cd backend
npm install
npm run server
```

Now the backend server is running on `http://localhost:5026`.

### Frontend

Open a new terminal session and do the following;

```bash
cd frontend
npm install
npm run dev
```

Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to view the application.

## Contributors

- [Abhiram Ahosk](https://github.com/abhi5455)
- [Febin Nelson P](https://github.com/fbn776)
- [Sreelakshmi S](https://github.com/SreelakshmiKSudheer)
- [Tom Cherian](https://github.com/badevil666)