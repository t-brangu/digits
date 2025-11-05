import { PrismaClient, Role, Condition } from '@prisma/client';
import { hash } from 'bcrypt';
import * as config from '../config/settings.development.json';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding the database');

  // Users (existing)
  const password = await hash('changeme', 10);
  for (const account of config.defaultAccounts) {
    const role = (account.role as Role) || Role.USER;
    console.log(`  Creating user: ${account.email} with role: ${role}`);
    // eslint-disable-next-line no-await-in-loop
    await prisma.user.upsert({
      where: { email: account.email },
      update: {},
      create: { email: account.email, password, role },
    });
  }

  // Stuff (existing)
  for (const data of config.defaultData) {
    const condition = (data.condition as Condition) || 'good';
    console.log(`  Adding stuff: ${data.name} (${data.owner})`);
    // eslint-disable-next-line no-await-in-loop
    await prisma.stuff.upsert({
      where: { id: config.defaultData.indexOf(data) + 1 },
      update: {},
      create: {
        name: data.name,
        quantity: data.quantity,
        owner: data.owner,
        condition,
      },
    });
  }

  // Contacts (NEW)
  for (const c of (config as any).defaultContacts) {
    console.log(`  Adding contact: ${c.firstName} ${c.lastName}`);
    // eslint-disable-next-line no-await-in-loop
    await prisma.contact.upsert({
      where: { id: (config as any).defaultContacts.indexOf(c) + 1 },
      update: {},
      create: {
        firstName: c.firstName,
        lastName: c.lastName,
        address: c.address,
        image: c.image,
        description: c.description,
        owner: c.owner,
      },
    });
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
