import { getServerSession } from 'next-auth';
import { Container, Row } from 'react-bootstrap';
import authOptions from '@/lib/authOptions';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { prisma } from '@/lib/prisma';
import ContactCard from '@/components/ContactCard';
import type { Contact as PrismaContact } from '@prisma/client';

const ListPage = async () => {
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(session as any);

  const owner = session?.user?.email || '';
  const contacts: PrismaContact[] = await prisma.contact.findMany({
    where: { owner },
    orderBy: [{ lastName: 'asc' }, { firstName: 'asc' }],
  });

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
            />
          ))}
        </Row>
      </Container>
    </main>
  );
};

export default ListPage;
