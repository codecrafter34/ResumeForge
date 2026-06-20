import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { type } = body;

    // Simulate AI generation delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (type === "bullet") {
      const { projectName, technologies, description } = body;
      
      return NextResponse.json({
        summary: `Spearheaded the development of ${projectName || "the project"} using ${technologies || "modern technologies"}. ${description ? `Key focus included: ${description.slice(0, 50)}...` : ""} Achieved significant improvements in performance and user experience.`,
        bullets: [
          `Architected and implemented ${projectName || "the solution"} utilizing ${technologies || "best practices"}, demonstrating strong problem-solving skills and technical proficiency.`,
          `Collaborated with cross-functional teams to translate complex requirements into scalable features.`,
          `Optimized application performance, resulting in a 30% reduction in load times.`,
          `Designed resilient data pipelines that handled increased data throughput efficiently.`
        ],
        keywords: [
          "Architecture", 
          "Performance Optimization", 
          "Scalability", 
          "Cross-functional Collaboration", 
          "Problem Solving",
          ...(technologies ? technologies.split(",").map((t: string) => t.trim()) : [])
        ].filter(Boolean)
      });
    }

    if (type === "summary") {
      const { skills, experienceLevel, careerGoal } = body;
      
      const skillsList = skills ? skills.split(",").slice(0, 3).join(", ") : "various technical and soft skills";
      
      return NextResponse.json({
        summary: `Highly motivated ${experienceLevel} professional with a strong foundation in ${skillsList}. Detail-oriented and proactive, with a proven track record of delivering quality results. Actively seeking to leverage my expertise to transition into a ${careerGoal || "challenging new role"}, where I can contribute to innovative projects and drive organizational success.`
      });
    }

    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
 