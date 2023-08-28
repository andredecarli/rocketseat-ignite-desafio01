import { Database } from "./database.js";
import { randomUUID } from 'node:crypto';
import { buildRoutePath } from "./utils/build-route-paths.js";

const database = new Database();

export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {
            const { search } = req.query;
            const tasks = database.select('tasks', search ? {
                title: search,
                description: search,
            } : null);
            return res.end(JSON.stringify(tasks));
        }
    },
    {
        method: 'POST',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {
            const { title, description } = req.body;

            if (!title) {
                return res
                    .writeHead(400)
                    .end(JSON.stringify(
                        {message: "Titulo da Atividade é um campo necessário"}
                    ));
            }

            if (!description) {
                return res
                    .writeHead(400)
                    .end(JSON.stringify(
                        {message: "Descrição da Atividade é um campo necessário"}
                    ));
            }

            const task = {
                id: randomUUID(),
                title,
                description,
                completed_at: null,
                created_at: Date(),
                updated_at: Date(),
            }

            database.insert('tasks', task);

            return res.writeHead(201).end();
        }
    },
    {
        method: 'PUT',
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {
            const { id } = req.params;
            const { title, description } = req.body;

            if (!title && !description) {
                return res
                    .writeHead(400)
                    .end(JSON.stringify(
                        {message: "Titulo ou Descricao sao necessários"}
                    ));
            }

            const [selectedTask] = database.select('tasks').filter(row => row.id === id);
            if (selectedTask) {
                const updatedTask = {
                    title: title ?? selectedTask.title,
                    description: description ?? selectedTask.description,
                    completed_at: selectedTask.completed_at,
                    created_at: selectedTask.created_at,
                    updated_at: Date(),
                }
                database.update('tasks', id, updatedTask);
                return res.writeHead(204).end();
            }
            return res
                .writeHead(404)
                .end(JSON.stringify({message:"Registro Não Existe"}));
        }
    },
    {
        method: 'DELETE',
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {
            const { id } = req.params;
            const success = database.delete('tasks', id);
            if (success) {
                return res.writeHead(204).end();
            }
            return res
                .writeHead(404)
                .end(JSON.stringify({message: "Registro Não Existe"}));
        }
    },
    {
        method: 'PATCH',
        path: buildRoutePath('/tasks/:id/complete'),
        handler: (req, res) => {
            const { id } = req.params;

            const [selectedTask] = database.select('tasks').filter(row => row.id === id);
            if (selectedTask) {
                const updatedTask = {
                    title: selectedTask.title,
                    description: selectedTask.description,
                    completed_at: selectedTask.completed_at ? null : Date(),
                    created_at: selectedTask.created_at,
                    updated_at: Date(),
                }
                database.update('tasks', id, updatedTask);
                return res.writeHead(204).end();
            }
            return res
                .writeHead(404)
                .end(JSON.stringify({message: "Registro Não Existe"}));
        }
    }
]