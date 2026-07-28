const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// In-memory analytics store for pilot demo
const odAnalytics = [];

app.post('/api/character-build', (req, res) => {
  const entry = req.body;
  odAnalytics.push(entry);
  console.log('New OD Submission Logged:', entry.determinedPersona);
  res.status(200).json({ status: 'success', message: 'Data saved successfully' });
});

app.get('/api/od-analytics', (req, res) => {
  res.json({
    totalSubmissions: odAnalytics.length,
    responses: odAnalytics
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
