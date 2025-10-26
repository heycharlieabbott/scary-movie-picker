import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to create a movie ID from the title
function createMovieId(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/--+/g, '-') // Replace multiple hyphens with single
    .trim();
}

// Function to extract year from title if present
function extractYear(title) {
  const yearMatch = title.match(/\((\d{4})\)/);
  return yearMatch ? parseInt(yearMatch[1]) : null;
}

// Function to clean title (remove year and extra info)
function cleanTitle(title) {
  return title
    .replace(/\(\d{4}\)/, '') // Remove year
    .replace(/\(\d{4}-\d{4}\)/, '') // Remove year ranges
    .replace(/\(\d{4}-\d{2}\)/, '') // Remove partial year ranges
    .trim();
}

// Function to generate a description based on movie info
function generateDescription(title, scareLevel, qualityLevel, goreLevel) {
  const descriptions = {
    'Drag Me to Hell': 'An intense horror experience that will leave you terrified and on the edge of your seat.',
    'Scare Me Some': 'A moderately scary film that provides thrills without being overwhelming.',
    'Easy Watching for the Faint of Heart': 'A gentle introduction to horror that\'s perfect for those who prefer lighter scares.'
  };

  const qualityDescriptions = {
    'Masterpiece': 'A cinematic masterpiece that represents the pinnacle of horror filmmaking.',
    'Excellent': 'An outstanding film that showcases exceptional storytelling and craftsmanship.',
    'Great': 'A well-crafted film that delivers a compelling horror experience.',
    'Good': 'A solid horror film that provides good entertainment value.',
    'Meh': 'An average film that may have some redeeming qualities despite its flaws.'
  };

  const baseDescription = descriptions[scareLevel] || 'A horror film that delivers scares and thrills.';
  const qualityDescription = qualityDescriptions[qualityLevel] || '';
  
  return `${baseDescription} ${qualityDescription}`.trim();
}

// Function to get a generic poster URL (you can replace these with actual URLs later)
function getPosterUrl(movieId) {
  // Using a placeholder service - you can replace these with actual movie poster URLs
  return `https://via.placeholder.com/300x450/1a1a1a/ffffff?text=${encodeURIComponent(movieId.replace(/-/g, ' ').toUpperCase())}`;
}

// Function to determine genre based on title and other factors
function determineGenre(title, scareLevel) {
  const titleLower = title.toLowerCase();
  
  if (titleLower.includes('zombie') || titleLower.includes('living dead')) {
    return 'Zombie Horror';
  }
  if (titleLower.includes('vampire') || titleLower.includes('nosferatu')) {
    return 'Vampire Horror';
  }
  if (titleLower.includes('werewolf') || titleLower.includes('wolf')) {
    return 'Werewolf Horror';
  }
  if (titleLower.includes('alien') || titleLower.includes('predator')) {
    return 'Sci-Fi Horror';
  }
  if (titleLower.includes('slasher') || titleLower.includes('massacre') || titleLower.includes('friday') || titleLower.includes('halloween') || titleLower.includes('nightmare')) {
    return 'Slasher';
  }
  if (titleLower.includes('possession') || titleLower.includes('exorcist') || titleLower.includes('conjuring')) {
    return 'Supernatural Horror';
  }
  if (titleLower.includes('psychological') || titleLower.includes('mind') || titleLower.includes('memory')) {
    return 'Psychological Horror';
  }
  if (scareLevel === 'Easy Watching for the Faint of Heart') {
    return 'Horror Comedy';
  }
  
  return 'Horror';
}

// Function to determine rating based on gore level
function determineRating(goreLevel) {
  if (goreLevel === 'Buckets & Buckets') {
    return 'R';
  }
  if (goreLevel === 'Missing Limbs') {
    return 'R';
  }
  if (goreLevel === 'Paper Cut') {
    return 'PG-13';
  }
  return 'PG-13';
}

// Function to estimate runtime (you can update these with actual runtimes later)
function estimateRuntime(title) {
  // Most horror movies are between 90-120 minutes
  return '95 min';
}

// Function to determine director (placeholder - you can update these with actual directors)
function getDirector(title) {
  // This is a placeholder - you should update this with actual director information
  const directors = {
    'the-shining': 'Stanley Kubrick',
    'alien': 'Ridley Scott',
    'halloween': 'John Carpenter',
    'nightmare-on-elm-street': 'Wes Craven',
    'scream': 'Wes Craven',
    'the-exorcist': 'William Friedkin',
    'hereditary': 'Ari Aster',
    'get-out': 'Jordan Peele',
    'it-follows': 'David Robert Mitchell',
    'the-babadook': 'Jennifer Kent'
  };
  
  const movieId = createMovieId(title);
  return directors[movieId] || 'Unknown Director';
}

// Main function to convert CSV to JSON
function convertCsvToJson() {
  try {
    // Read the CSV file
    const csvPath = path.join(__dirname, 'Film List - Movie list.csv');
    const csvContent = fs.readFileSync(csvPath, 'utf8');
    
    // Parse CSV
    const lines = csvContent.split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    
    const movies = {};
    
    // Process each line (skip header)
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      
      // Split by comma, but handle quoted fields
      const fields = [];
      let currentField = '';
      let inQuotes = false;
      
      for (let j = 0; j < line.length; j++) {
        const char = line[j];
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          fields.push(currentField.trim());
          currentField = '';
        } else {
          currentField += char;
        }
      }
      fields.push(currentField.trim());
      
      if (fields.length < 5) continue; // Skip incomplete lines
      
      const [film, scareLevel, qualityLevel, goreLevel, trailer] = fields;
      
      if (!film) continue; // Skip empty film names
      
      const movieId = createMovieId(film);
      const year = extractYear(film) || 2000; // Default year if not found
      const cleanTitleText = cleanTitle(film);
      
      movies[movieId] = {
        title: cleanTitleText,
        year: year,
        director: getDirector(film),
        description: generateDescription(film, scareLevel, qualityLevel, goreLevel),
        genre: determineGenre(film, scareLevel),
        rating: determineRating(goreLevel),
        runtime: estimateRuntime(film),
        image: getPosterUrl(movieId),
        scareLevel: scareLevel,
        qualityLevel: qualityLevel,
        goreLevel: goreLevel,
        trailer: trailer || ''
      };
    }
    
    // Create the final JSON structure
    const jsonOutput = {
      movies: movies
    };
    
    // Write to movies.json
    const outputPath = path.join(__dirname, 'src', 'data', 'movies.json');
    fs.writeFileSync(outputPath, JSON.stringify(jsonOutput, null, 2));
    
    console.log(`Successfully converted ${Object.keys(movies).length} movies to movies.json`);
    console.log('Movies converted:');
    Object.keys(movies).forEach(id => {
      console.log(`- ${movies[id].title} (${movies[id].year})`);
    });
    
  } catch (error) {
    console.error('Error converting CSV to JSON:', error);
  }
}

// Run the conversion
convertCsvToJson();
