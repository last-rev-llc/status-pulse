import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create demo workspace
  const workspace = await prisma.workspace.upsert({
    where: { slug: "demo" },
    update: {},
    create: {
      name: "Demo Workspace",
      slug: "demo",
      plan: "PRO",
    },
  });

  // Demo sites
  const sites = [
    { name: "WOW Marketing", url: "https://www.wowtech.com" },
    { name: "Diligent Corp", url: "https://www.diligent.com" },
    { name: "IAS Platform", url: "https://integralads.com" },
    { name: "Last Rev", url: "https://www.lastrev.com" },
    { name: "AlphaClaw Docs", url: "https://docs.openclaw.ai" },
    { name: "Command Center", url: "https://command-center.adam-harris.alphaclaw.app" },
  ];

  for (const site of sites) {
    await prisma.site.upsert({
      where: {
        id: site.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      },
      update: {},
      create: {
        id: site.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        workspaceId: workspace.id,
        name: site.name,
        url: site.url,
        status: "UP",
        responseTimeMs: Math.floor(Math.random() * 300) + 100,
        uptimePercent: 99.9 + Math.random() * 0.1,
      },
    });
  }

  console.log(`✅ Seeded ${sites.length} sites in workspace "${workspace.name}"`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
