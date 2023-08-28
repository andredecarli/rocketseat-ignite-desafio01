import { Database } from "./database.js";
import { randomUUID } from 'node:crypto';

const database = new Database();

export const routes = [
    {
        method: 'GET',
        path: '/tasks',
        handler: (req, res) => {
            const tasks = database.select('tasks');
            return res.end(JSON.stringify(tasks));
        }
    },
    {
        method: 'POST',
        path: '/tasks',
        handler: (req, res) => {
            // Insert a Task in the Database
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
        path: '/tasks/:id',
        handler: (req, res) => {
            // Updates a Task in the Database
            return res.end();
        }
    },
    {
        method: 'DELETE',
        path: '/tasks/:id',
        handler: (req, res) => {
            // Deletes a Task in the Database
            return res.end();
        }
    },
    {
        method: 'PATCH',
        path: '/tasks/:id/complete',
        handler: (req, res) => {
            // Toggles complete/incomplete task
            return res.end();
        }
    }
]