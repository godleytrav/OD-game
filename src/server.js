const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Serve static assets from public folder
app.use(express.static(path.join(__dirname, '../public')));

// In-memory analytics store
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

// Fallback route to serve index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(PORT, () => {
  console.log(`OD Quest Server running on port ${PORT}`);
});
