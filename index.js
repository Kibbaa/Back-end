import { doesNotMatch } from "assert";
import express from "express";
import fs from 'fs'
import path from 'path'
import { nextTick } from "process";
import { v4 as uuidv4 } from 'uuid';

const __dirname = path.resolve()
const PORT = 5000;
const app = express()
const rawData = fs.readFileSync(`${__dirname}/data/data.json`, "utf8")
const parsedData = JSON.parse(rawData)

app.use(express.json())


// const read = () => {
// 	return JSON.parse(
// 		fs.readFileSync(`${__dirname}/data/data.json`, "utf8")
// 	)
// }

// const write =(parsedData) =>{
//     fs.writeFileSync(`${__dirname}/data/data.json`,)
//          JSON.stringify(parsedData)
// }

app.get('/tasks', (req,res) =>{
    res.json(parsedData.tasks)
})
 
 app.post('/tasks',(req,res) =>{
    const task = {
        uuid: uuidv4(),
        name: req.body.name,
        done: false,
        UserId: "a6a18306-2c6b-4597-899c-936ec8277662",
        createdAt: new Date(),
        updatedAt: new Date(),
    }
    ;
    parsedData.tasks.push(task)
    const stringData = JSON.stringify(parsedData, null, 4);
	fs.writeFileSync(`${__dirname}/data/data.json`, stringData)
    res.json(parsedData.tasks)

 })
//  app.get('/tasks/:id',(req,res) => {
//     res.send(`${req.params.id}`)
//  })
 app.delete('/tasks/:id' ,(req,res) =>{
    console.log(req.params);
    const id = req.params.id
    console.log(id);
    const task = parsedData.tasks.splice(id,1)
    const stringData = JSON.stringify(parsedData, null, 4);
    fs.writeFileSync(`${__dirname}/data/data.json`, stringData)
    res.json(task)
 })
 
 app.patch('/tasks/:id', (req,res) => {
    console.log(req.body);
    console.log(req.params.id);
    const id = req.params.id
    const body = req.body
    const task = parsedData.tasks.find((item) => item.uuid === id)
    console.log(task);
    task.done =body.done
    task.name = body.name
    task.updatedAt = new Date()
    const stringData = JSON.stringify(parsedData, null, 4);
    fs.writeFileSync(`${__dirname}/data/data.json`, stringData)
    res.json(task)
 })
// app.get('/', (req,res) =>{
    
//     res.send('change address  to "user" or "task"')
//     res.json(read().tasks)

// });

app.listen(PORT, () => console.log(`server start on Port ${PORT}...`))