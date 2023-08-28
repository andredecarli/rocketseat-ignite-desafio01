

export const routes = [
    {
        method: 'GET',
        path: '/tasks',
        handler: (req, res) => {
            // Return all Tasks from Database
            return res.end();
        }
    },
    {
        method: 'POST',
        path: '/tasks',
        handler: (req, res) => {
            // Insert a Task in the Database
            return res.end();
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