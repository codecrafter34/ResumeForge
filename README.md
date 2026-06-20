# ResumeForge

ResumeForge is a free online tool that helps students create ATS-friendly resume content quickly. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Resume Bullet Generator**: Generate professional, action-oriented resume bullet points, extract ATS keywords, and craft project summaries based on your project details and technologies.
- **Resume Summary Generator**: Craft a compelling professional summary highlighting your skills, experience level, and career goals.
- **Copy to Clipboard**: One-click copying for generated content.
- **Modern & Responsive UI**: Clean, mobile-friendly design ensuring accessibility and ease of use.

## Folder Structure

```
resumeforge/
├── src/
│   ├── app/
│   │   ├── about/
│   │   │   └── page.tsx        # About page
│   │   ├── api/
│   │   │   └── generate/
│   │   │       └── route.ts    # Mock API route for generation logic
│   │   ├── globals.css         # Global Tailwind styles
│   │   ├── layout.tsx          # Root layout with Header and Footer
│   │   └── page.tsx            # Home page containing the generators
│   └── components/
│       ├── Footer.tsx          # Global Footer
│       ├── Header.tsx          # Global Header Navigation
│       ├── ResumeBulletGenerator.tsx   # Bullet Generator Component
│       └── ResumeSummaryGenerator.tsx  # Summary Generator Component
├── public/                     # Static assets
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## Local Development Setup

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd resumeforge
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## GitHub Setup Steps

1. Create a new empty repository on GitHub.
2. Initialize Git in your local project directory (if not already initialized):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```
3. Link your local repository to GitHub:
   ```bash
   git remote add origin https://github.com/your-username/resumeforge.git
   git branch -M main
   git push -u origin main
   ```

## Vercel Deployment Steps

ResumeForge is optimized for seamless deployment on Vercel.

1. Create a free account at [Vercel](https://vercel.com).
2. Click on **Add New...** > **Project**.
3. Import your GitHub repository for `resumeforge`.
4. Vercel will automatically detect the Next.js framework. Leave the default build settings:
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`
5. Click **Deploy**. Vercel will build and deploy your app.
6. Once deployed, you will receive a production URL.

## Future Enhancements
- Connect the `/api/generate` route to a real AI provider (like OpenAI or Gemini) by adding an API Key in `.env.local` and replacing the mock logic.
