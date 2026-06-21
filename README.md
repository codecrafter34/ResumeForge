# ResumeForge AI

Build ATS-Friendly Resume Content in Seconds. ResumeForge AI is a free online tool that helps students, job seekers, and developers create professional ATS-friendly resume content quickly and efficiently.

## Features

1. **Resume Bullet Generator**: Generate 5 ATS-Friendly Resume Bullet Points, Quantified Impact Statements, and Professional Project Summaries.
2. **ATS Keyword Generator**: Extract top hard/soft skills and industry tools based on a target role.
3. **Resume Summary Generator**: Create optimized professional summaries for Fresher, Entry, Mid, and Senior levels based on core skills.
4. **Resume Bullet Enhancer**: Transform basic bullet points into high-impact, quantified ATS power statements.
5. **Action Verb Generator**: Replace weak words (e.g., "Worked", "Made") with strong action verbs.
6. **ATS Score Analyzer**: Paste your resume text to receive an ATS compatibility score and actionable suggestions.
7. **Download & Export**: One-click copy functionality and PDF export (using jsPDF) for generated bullets and summaries.
8. **History**: Easily retain active sessions during your visit.
9. **Quick Templates**: Access ready-to-use, ATS-optimized project descriptions.

## Tech Stack

- **Framework**: React + Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: React Icons
- **PDF Generation**: jsPDF

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## GitHub Setup Steps

To push this project to your own GitHub repository:

1. Initialize a Git repository (if not already initialized):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. Create a new repository on GitHub (leave it completely empty, without a README or .gitignore).

3. Link your local repository to GitHub and push:
   ```bash
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/resumeforge-ai.git
   git push -u origin main
   ```

## Vercel Deployment Steps

This project is optimized for deployment on the Vercel Free Plan.

1. Create a free account at [Vercel](https://vercel.com).
2. From the Vercel dashboard, click **"Add New"** -> **"Project"**.
3. Import your `resumeforge-ai` GitHub repository.
4. Vercel will automatically detect the **Vite** framework.
5. Leave the Build and Output Settings as default:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
6. Click **Deploy**. Your premium web app will be live in seconds!

## Built for Digital Heroes

[https://digitalheroesco.com](https://digitalheroesco.com)
