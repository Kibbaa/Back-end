import Express from "express";

const PORT = 5000;

const app = Express()

app.get('/', (req,res) =>{
    res.status(200).json('TODOLIST')
});

app.listen(PORT, () => console.log('server start'))