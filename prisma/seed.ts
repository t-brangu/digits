import { PrismaClient, Role } from '@prisma/client';
import { hash } from 'bcrypt';
import * as config from '../config/settings.development.json';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding the database');

  const password = await hash('changeme', 10);

  // Seed Users
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

  // Seed Contacts (ONLY contacts now)
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
