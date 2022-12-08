import express from "express";
import fs from 'fs'
import path from 'path'

const __dirname = path.resolve()
const PORT = 5000;
const app = express()

app.use(express.json())


const read = () => {
	return JSON.parse(
		fs.readFileSync(`${__dirname}/data/data.json`, "utf8")
	)
}

const write =(task) =>{
    fs.writeFileSync(`${__dirname}/data/data.json`, "utf8")
}

// app.get('/', (req,res) =>{
    
//     res.send('change address  to "user" or "task"')
//     res.json(read().tasks)

// });

app.get('/tasks', (req,res) =>{
    // console.log(res.json());
    res.json(read().tasks)
})

app.listen(PORT, () => console.log(`server start on Port ${PORT}...`))