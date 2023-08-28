import { parse } from 'csv-parse';
import fs from 'node:fs';

fs.createReadStream("./data.csv")
        .pipe(parse({delimiter: ',', from_line: 2}))
        .on("data", function(row) {
            const task = { title: row[0], description: row[1] };
            fetch("http://localhost:8080/tasks", {
                method: 'POST',
                body: JSON.stringify(task),
                headers: { 'Content-Type' : 'application/json'},
            });
        })