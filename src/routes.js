import { Database } from "./database.js";
import { randomUUID } from 'node:crypto';
import { buildRoutePath } from "./utils/build-route-paths.js";

const database = new Database();

export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {
            const tasks = database.select('tasks');
            return res.end(JSON.stringify(tasks));
        }
    },
    {
        method: 'POST',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {
            const { title, description } = req.body;

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

            const selectedTask = database.select('tasks').filter(row => row.id === id)[0];
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
            return res.writeHead(404).end("Registro não existe");
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
            return res.writeHead(404).end("Registro Não existe");
        }
    },
    {
        method: 'PATCH',
        path: buildRoutePath('/tasks/:id/complete'),
        handler: (req, res) => {
            // Toggles complete/incomplete task
            return res.end();
        }
    }
]