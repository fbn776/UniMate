const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const Users = require("./user/user");
const { hasUserAndPassword, hasUser, getUser } = require("./user/hasUser");
require('dotenv').config()

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post('/signup', (req, res) => {
	const { username, password, name, age, email, course, subjects } = req.body;
	console.log(Users)
	if (hasUser(Users, username)) {
		res.status(201).json({ message: "User already exits" });
	} else {
		Users.push({
			username, password, name, age, email, course, subjects
		});
		res.status(200).json(getUser(Users, username));
	}
})

app.post('/login', (req, res) => {
	const { username, password } = req.body;
	console.log("Requested: ", username, password);

	if (hasUserAndPassword(Users, username, password)) {
		res.status(200).json({ message: 'Login successful', login: true });
	} else {
		res.status(201).json(getUser(Users, username));
	}
});



const genAI = new GoogleGenerativeAI(process.env.Gemini_key);

const model = genAI.getGenerativeModel({ model: "gemini-pro" });

app.post('/chat', async (req, res) => {
	const data = req.body;
	const user = JSON.parse(data.data);

	const prompt = `You are a virtual assistant who's designed to assist collage students with their day to day activities. We are going to provide you with details of a student and a query by the respective student
You are to respond accordingly to the query.

You are to respond to the query in a professional manner.

The details are:
name: ${user.name}
age: ${user.age}
course: ${user.course}
subjects: ${user.subject} (comma separated)
The query is;
Query: ${data.query}

Now respond to the Query`;

	const result = await model.generateContent(prompt);
	const response = await result.response;
	const text = response.text();


	res.status(200).json({ response: text });
});

app.listen(process.env.PORT, () => {
	console.log(`Server started.\nRunning on: http://localhost:${process.env.PORT}`);
});
