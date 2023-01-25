import express, { Request, Response } from 'express'
import cors from 'cors'
import { db } from './database/knex'
import { TTaskDB, TTaskWithUsers, TUserDB, TUserTaskDB } from './types'

const app = express()

app.use(cors())
app.use(express.json())

app.listen(3003, () => {
    console.log(`Servidor rodando na porta ${3003}`)
})

app.get("/ping", async (req: Request, res: Response) => {
    try {
	    const result = await db("users")
        res.status(200).send({ message: "Pong!", result })
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

//Daniel: criação de usuários
app.post("/users", async(req:Request, res:Response)=>{
    try {

        const {id,name, email, password} = req.body;

        if(id !== undefined){
            if(typeof id !== "string"){
                res.status(400)
                throw new Error("'id' informada inválida! Favor, inserir id como string!") 
            }
        }else{
            res.status(400)
            throw new Error("Favor, inserir 'id' de usuário")
        }

        if(name !== undefined){
            if(typeof name !== "string"){
                res.status(400)
                throw new Error("'name' informada inválida! Favor, inserir o nome como string!") 
            }
        }else{
            res.status(400)
            throw new Error("Favor, inserir 'name' de usuário")
        }

        if(email !== undefined){
            if(typeof password !== "string"){
                res.status(400)
                throw new Error("'email' informado inválida! Favor, inserir e-mail como string!") 
            }
        }else{
            res.status(400)
            throw new Error("Favor, inserir 'e-mail' de usuário")
        }

        if(password !== undefined){
            if(typeof password !== "string"){
                res.status(400)
                throw new Error("'password' informada inválida! Favor, inserir senha como string!") 
            }
        }else{
            res.status(400)
            throw new Error("Favor, inserir 'password' de usuário")
        }

        const [ userEmailAlreadyExists ]: TUserDB[] | undefined[] = await db("users").where({ email })

        if (userEmailAlreadyExists) {
            res.status(400)
            throw new Error("'email' já existe")
        }

        const newUser: TUserDB = {
            id,
            name,
            email,
            password
        }

        await db("users").insert(newUser)

        res.status(200).send({message: "Usuário inserido com sucesso!", user: newUser})
        
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
        
    }
})

//Daniel: getall users
app.get("/users", async(req:Request, res:Response)=>{
    try {

        const result = await db("users")
        res.status(200).send(result)

    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }       
    }
})

//Daniel: delete user
app.delete("/users/:id",async(req:Request, res:Response)=>{
    try {
        const idToDelete = req.params.id

        const [userIdAlreadyExists]: TUserDB[] | undefined[] = await db("users").where({ id: idToDelete })

        if (!userIdAlreadyExists) {
            res.status(404)
            throw new Error("'id' não encontrado")
        }

        await db("users").del().where({id:idToDelete})

        res.status(200).send({message:"Usuário excluido com sucesso!"})
        
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }       
    }
})

//Daniel: criação de tasks
app.post("/tasks", async(req:Request, res:Response)=>{
    try {

        const {id, title, description} = req.body;

        if(id !== undefined){
            if(typeof id !== "string"){
                res.status(400)
                throw new Error("'id' informada inválida! Favor, inserir id como string!") 
            }
        }else{
            res.status(400)
            throw new Error("Favor, inserir 'id' de usuário")
        }

        if(title !== undefined){
            if(typeof title !== "string"){
                res.status(400)
                throw new Error("'title' informada inválida! Favor, inserir o titulo como string!") 
            }
        }else{
            res.status(400)
            throw new Error("Favor, inserir 'title' de tarefa")
        }

        if(description !== undefined){
            if(typeof description !== "string"){
                res.status(400)
                throw new Error("'description' informado inválida! Favor, inserir a descrição de tarefa como string!") 
            }
        }else{
            res.status(400)
            throw new Error("Favor, inserir 'description' de tarefa")
        }

        const [ taskIdAlreadyExists ]: TTaskDB[] | undefined[] = await db("tasks").where({ id })

        if (taskIdAlreadyExists) {
            res.status(400)
            throw new Error("'id' já existe")
        }

        const newTask = {
            id,
            title,
            description
        }

        await db("tasks").insert(newTask)

        res.status(200).send({message: "Tarefa inserida com sucesso!", task:newTask})
        
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
        
    }
})

//Daniel: getall tasks
app.get("/tasks", async(req:Request, res:Response)=>{
    try {

        const result = await db("tasks")
        res.status(200).send(result)

    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }       
    }
})

app.put("/tasks/:id", async(req:Request, res:Response)=>{
    try {
        const id = req.params.id

        const newId = req.body.id
        const newTitle = req.body.title
        const newDescription = req.body.description
        const newCreatedAt = req.body.created_at
        const newStatus = req.body.status

        if(newId !== undefined){
            if (typeof newId !== "string") {
                res.status(400)
                throw new Error("'id' deve ser string")
            }

				if (newId.length < 1) {
                res.status(400)
                throw new Error("'id' deve possuir no mínimo 1 caractere")
            }
        }

        if(newTitle !== undefined){
            if (typeof newTitle !== "string") {
                res.status(400)
                throw new Error("'newTitle' deve ser string")
            }

				if (newTitle.length < 1) {
                res.status(400)
                throw new Error("'newTitle' deve possuir no mínimo 1 caractere")
            }
        }

        if(newDescription !== undefined){
            if (typeof newDescription !== "string") {
                res.status(400)
                throw new Error("'newDescription' deve ser string")
            }

				if (newDescription.length < 1) {
                res.status(400)
                throw new Error("'newDescription' deve possuir no mínimo 1 caractere")
            }
        }

        if(newStatus !== undefined){
            if (typeof newStatus !== "number") {
                res.status(400)
                throw new Error("'newStatus' deve ser number")
            } 
        }else {
            res.status(400);
            throw new Error ("Confirmação de tarefa não informado.");
        }

        const [task]: TTaskDB[] | undefined[] = await db("tasks").where({id:id})

        if(task){
            const updateTask: TTaskDB = {
                id: newId || task.id,
                title: newTitle || task.title,
                description: newDescription || task.description,
                created_at: task.created_at,
                status: newStatus || task.status
            }

            await db("tasks").update(updateTask).where({id:id})
        } else {
            res.status(404)
            throw new Error("Tarefa não encontrada")
        }

        res.status(200).send({ message: "Atualização realizada com sucesso" })

        
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }        
    }
})

//Daniel: delete task
app.delete("/tasks/:id",async(req:Request, res:Response)=>{
    try {
        const idToDelete = req.params.id

        const [task]: TTaskDB[] | undefined[] = await db("tasks").where({id:idToDelete})

        if(!task){
            res.status(404)
            throw new Error("Tarefa não encontrada!")
        }

        await db("tasks").del().where({id:idToDelete})

        res.status(200).send({message:"Tarefa excluida com sucesso!"})
        
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }       
    }
})

app.get("/tasks/users_tasks", async(req:Request, res:Response)=>{
    try {
        
        const tasks: TTaskDB[] = await db("tasks")

        const result: TTaskWithUsers[] = []

        for (let task of tasks) {
            const responsibles = []
            const users_tasks: TUserTaskDB[] = await db("users_tasks").where({ task_id: task.id })
            
            for (let user_task of users_tasks) {
                const [ user ]: TUserDB[] = await db("users").where({ id: user_task.user_id })
                responsibles.push(user)
            }

            const newTaskWithUsers: TTaskWithUsers = {
                ...task,
                responsibles
            }

            result.push(newTaskWithUsers)
        }

        res.status(200).send(result)

    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }   
        
    }
})