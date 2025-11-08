import { getServerSession } from 'next-auth';
import { Container, Row } from 'react-bootstrap';
import authOptions from '@/lib/authOptions';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { prisma } from '@/lib/prisma';
import ContactCard from '@/components/ContactCard';
import type { Contact as PrismaContact, Note as PrismaNote } from '@prisma/client';

const ListPage = async () => {
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(session as any);

  const owner = (session?.user?.email as string) || '';

  // Fetch contacts and notes for this owner
  const [contacts, notes]: [PrismaContact[], PrismaNote[]] = await Promise.all([
    prisma.contact.findMany({
      where: { owner },
      orderBy: [{ lastName: 'asc' }, { firstName: 'asc' }],
    }),
    prisma.note.findMany({
      where: { owner },
      orderBy: { createdAt: 'asc' }, // or 'desc' if you prefer newest first
    }),
  ]);

  return (
    <main>
      <Container id="list" fluid className="py-3">
        <Row xs={1} md={2} lg={3} className="g-4">
          {contacts.map((c) => (
            <ContactCard
              key={`Contact-${c.id}`}
              contact={{
                id: c.id,
                firstName: c.firstName,
                lastName: c.lastName,
                address: c.address,
                image: c.image,
                description: c.description,
              }}
              notes={notes.filter((n) => n.contactId === c.id)}
            />
          ))}
        </Row>
      </Container>
    </main>
  );
};

export default ListPage;
