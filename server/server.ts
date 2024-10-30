import { createServer, IncomingMessage, ServerResponse } from 'http';

type Transaction = {
  id: number;
  name: string;
  amount: number;
  type: 'Income' | 'Expense';
};

// In-memory data storage for transactions
let transactions: Transaction[] = [];

// Helper function to parse JSON from incoming requests - returns a promised
const parseBody = (req: IncomingMessage): Promise<any> =>
  new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        resolve(JSON.parse(body));
      } catch (e) {
        reject(e);
      }
    });
  });

// Server handler function
const requestHandler = async (req: IncomingMessage, res: ServerResponse) => {
  const { method, url } = req;

  // Set response headers
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // CORS preflight response
  if (method === 'OPTIONS') {
    res.writeHead(204);
    return res.end();
  }

  if (url === '/api/transactions' && method === 'GET') {
    // Get all transactions
    res.writeHead(200);
    res.end(JSON.stringify(transactions));
  } else if (url === '/api/transactions' && method === 'POST') {
    // Add a new transaction
    try {
      const transaction: Transaction = await parseBody(req);
      transaction.id = Date.now(); // Assign a unique ID based on timestamp
      transactions.push(transaction);
      res.writeHead(201);
      res.end(JSON.stringify(transaction));
    } catch {
      res.writeHead(400);
      res.end(JSON.stringify({ error: 'Invalid JSON data' }));
    }
  } else if (url?.startsWith('/api/transactions/') && method === 'PUT') {
    // Update an existing transaction
    const transactionId = Number(url.split('/').pop());
    try {
      const updatedTransaction: Partial<Transaction> = await parseBody(req);
      const index = transactions.findIndex(t => t.id === transactionId);
      if (index === -1) {
        res.writeHead(404);
        return res.end(JSON.stringify({ error: 'Transaction not found' }));
      }
      transactions[index] = { ...transactions[index], ...updatedTransaction };
      res.writeHead(200);
      res.end(JSON.stringify(transactions[index]));
    } catch {
      res.writeHead(400);
      res.end(JSON.stringify({ error: 'Invalid JSON data' }));
    }
  } else if (url?.startsWith('/api/transactions/') && method === 'DELETE') {
    // Delete a transaction
    const transactionId = Number(url.split('/').pop());
    const index = transactions.findIndex(t => t.id === transactionId);
    if (index === -1) {
      res.writeHead(404);
      return res.end(JSON.stringify({ error: 'Transaction not found' }));
    }
    transactions.splice(index, 1);
    res.writeHead(204);
    res.end();
  } else {
    // Handle unsupported routes
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Route not found' }));
  }
};

// Create the HTTP server
const server = createServer(requestHandler);

// Start the server
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
