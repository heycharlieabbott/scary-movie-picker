import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to parse CSV with proper handling of quoted fields
function parseCSVLine(line) {
  const fields = [];
  let currentField = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
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
  
  return fields;
}

// Main function to convert CSV to JSON
function convertCsvToJson() {
  try {
    // Read the CSV file
    const csvPath = path.join(__dirname, 'Question List - Questions.csv');
    const csvContent = fs.readFileSync(csvPath, 'utf8');
    
    // Parse CSV
    const lines = csvContent.split('\n');
    const questions = [];
    
    // Process each line (skip header)
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      
      const fields = parseCSVLine(line);
      
      // Extract question text (first column)
      const questionText = fields[0];
      if (!questionText) continue;
      
      // Build options array
      const options = [];
      
      // Determine the number of options by checking available columns
      // Starting from column 1, each option takes 3 columns (Text, Next Question, Movie ID)
      const maxOptions = Math.floor((fields.length - 1) / 3);
      
      for (let optNum = 1; optNum <= maxOptions; optNum++) {
        const textIndex = (optNum - 1) * 3 + 1;
        const nextIndex = (optNum - 1) * 3 + 2;
        const movieIndex = (optNum - 1) * 3 + 3;
        
        // Make sure we have enough fields
        if (textIndex >= fields.length) break;
        
        const optionText = fields[textIndex];
        
        if (optionText && optionText !== '') {
          const option = {
            id: String(optNum),
            text: optionText
          };
          
          // Check if it has a next question (before movie ID)
          const nextQuestion = fields[nextIndex];
          const movieId = fields[movieIndex];
          
          // Both can be set, but Movie ID takes precedence
          if (movieId && movieId !== '') {
            option.movieId = movieId;
          } else if (nextQuestion && nextQuestion !== '') {
            option.nextQuestion = nextQuestion;
          }
          
          options.push(option);
        }
      }
      
      // Only add question if it has options
      if (options.length > 0) {
        questions.push({
          id: String(i), // Row number as ID
          text: questionText,
          options: options
        });
      }
    }
    
    // Create the final JSON structure
    const jsonOutput = {
      questions: questions
    };
    
    // Write to questions.json
    const outputPath = path.join(__dirname, 'src', 'data', 'questions.json');
    fs.writeFileSync(outputPath, JSON.stringify(jsonOutput, null, 2));
    
    console.log(`Successfully converted ${questions.length} questions to questions.json`);
    console.log('\nQuestions converted:');
    questions.forEach(q => {
      console.log(`- Question ${q.id}: ${q.text} (${q.options.length} options)`);
    });
    
  } catch (error) {
    console.error('Error converting CSV to JSON:', error);
  }
}

// Run the conversion
convertCsvToJson();
