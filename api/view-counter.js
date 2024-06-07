import fs from 'fs';
import path from 'path';

// Path to the JSON file
const filePath = path.resolve(process.cwd(), 'view-count.json');

// Function to read the view count from the file
const readViewCount = () => {
  if (!fs.existsSync(filePath)) {
    return { count: 0 };
  }
  const fileData = fs.readFileSync(filePath);
  return JSON.parse(fileData);
};

// Function to write the view count to the file
const writeViewCount = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

export default function handler(req, res) {
  if (req.method === 'POST') {
    // Increment the view count
    const data = readViewCount();
    data.count += 1;
    writeViewCount(data);
    res.status(200).json(data);
  } else if (req.method === 'GET') {
    // Get the current view count
    const data = readViewCount();
    res.status(200).json(data);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
