# 🎬 Scary Movie Picker

A fun, interactive web application that helps you discover your perfect horror movie! Answer a few questions about your preferences, and get personalized movie recommendations.

## What is this?

This is a **Scary Movie Picker** - think of it like a quiz that asks you questions about what kind of scary movies you like, and then suggests the perfect movie for you to watch. It's like having a movie expert friend who knows exactly what you'd enjoy!

## How it works

1. **Start the quiz**: You'll see a question like "What type of scary movie do you prefer?"
2. **Choose your answer**: Click on one of the options (like "Supernatural/Haunted house" or "Slasher/Serial killer")
3. **Answer more questions**: Based on your choice, you'll get follow-up questions to narrow down your preferences
4. **Get your recommendation**: After 2-3 questions, you'll see a movie recommendation with details like the plot, director, and year

## Prerequisites (What you need before starting)

Before you can use this project, you need to install some tools on your computer:

### 1. Install Node.js

- Go to [nodejs.org](https://nodejs.org/)
- Download the "LTS" version (it's the green button)
- Run the installer and follow the instructions
- This gives you the tools needed to run web applications

### 2. Install a Code Editor (Optional but recommended)

- Download [Visual Studio Code](https://code.visualstudio.com/) (it's free!)
- This makes it easier to edit files and see what's happening

## Getting Started (How to run the project)

### Step 1: Download the project

1. If you have this as a ZIP file, extract it to a folder on your computer
2. If you're using Git, open a terminal/command prompt and run:
   ```bash
   git clone [your-repository-url]
   cd scary-movie-picker
   ```

### Step 2: Install dependencies

Open a terminal/command prompt in the project folder and run:

```bash
npm install
```

This downloads all the code libraries the project needs to work.

### Step 3: Start the application

```bash
npm run dev
```

You'll see a message like "Local: http://localhost:5173"
Open that URL in your web browser to see the movie picker!

## Understanding the Project Structure

Here's what each folder and file does:

```
scary-movie-picker/
├── src/                          # Main application code
│   ├── components/              # Reusable pieces of the app
│   │   ├── QuestionComponent.tsx # Shows questions to users
│   │   └── MovieResult.tsx      # Shows movie recommendations
│   ├── data/                    # All the questions and movie info
│   │   ├── questions.json       # The quiz questions and answers
│   │   └── movies.json         # Movie database with details
│   ├── App.tsx                  # Main application logic
│   ├── App.css                  # Styling (how it looks)
│   └── index.css               # Basic styling
├── package.json                 # Project settings and dependencies
└── README.md                   # This file!
```

## How to Customize (Make it your own)

### Adding New Questions

1. Open `src/data/questions.json`
2. Find the questions array
3. Add a new question object like this:

```json
{
  "id": "18",
  "text": "What's your favorite decade for horror movies?",
  "options": [
    {
      "id": "70s",
      "text": "1970s",
      "nextQuestion": "19"
    },
    {
      "id": "80s",
      "text": "1980s",
      "movieId": "halloween"
    }
  ]
}
```

### Adding New Movies

1. Open `src/data/movies.json`
2. Find the movies object
3. Add a new movie like this:

```json
"your-movie-id": {
  "title": "Your Movie Title",
  "year": 2023,
  "director": "Director Name",
  "description": "What the movie is about...",
  "genre": "Horror",
  "rating": "R",
  "runtime": "90 min",
  "image": "https://link-to-movie-poster.jpg"
}
```

### Changing the Look and Feel

1. Open `src/App.css` to change colors, fonts, and layout
2. Open `src/index.css` to change basic styling
3. Look for color codes like `#1a73e8` (blue) and `#f8f9fa` (light gray) to change colors

### Adding New Question Types

You can create different types of questions by modifying the QuestionComponent:

1. Open `src/components/QuestionComponent.tsx`
2. Add new styling or functionality
3. Update the CSS in `src/App.css` to match

## Building for Production (Making it ready to share)

When you want to share your movie picker with others or put it online:

### Step 1: Build the project

```bash
npm run build
```

This creates a `dist` folder with all the files needed to run your app.

### Step 2: Preview the built version

```bash
npm run preview
```

This lets you test the final version before sharing it.

### Step 3: Deploy (Put it online)

You can upload the contents of the `dist` folder to any web hosting service like:

- [Netlify](https://netlify.com) (free and easy)
- [Vercel](https://vercel.com) (free and easy)
- [GitHub Pages](https://pages.github.com) (free)

## Troubleshooting (When things go wrong)

### "npm: command not found"

- You need to install Node.js first (see Prerequisites above)

### "Cannot find module" errors

- Run `npm install` again to make sure all dependencies are installed

### The app won't start

- Make sure you're in the right folder (the one with package.json)
- Try deleting `node_modules` folder and running `npm install` again

### Questions don't work properly

- Check that your JSON files are valid (no missing commas or brackets)
- Make sure question IDs match between questions.json and movies.json

## Available Scripts

- `npm run dev` - Start the development server (for testing)
- `npm run build` - Create production files
- `npm run preview` - Test the production build
- `npm run lint` - Check for code issues

## Learning More

If you want to understand more about how this works:

- **React**: The framework that makes the interactive parts work
- **TypeScript**: Makes the code more reliable and easier to understand
- **Vite**: The tool that builds and runs the application
- **JSON**: The format used to store questions and movie data

## Contributing (How to help improve this)

1. Find something you'd like to change or improve
2. Make your changes
3. Test them by running `npm run dev`
4. If everything works, you can share your improvements!

## License

This project is open source and free to use and modify.

---

**Need help?** If you get stuck, try searching for the error message online or ask for help in programming communities. Most problems have solutions that others have already found!
