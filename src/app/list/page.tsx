import { getServerSession } from 'next-auth';
import { Col, Container, Row } from 'react-bootstrap';
import authOptions from '@/lib/authOptions';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { prisma } from '@/lib/prisma';
import ContactCard from '@/components/ContactCard';

const ListPage = async () => {
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(session as any);

  const owner = (session && session.user && session.user.email) || '';
  const contacts = await prisma.contact.findMany({
    where: { owner },
    orderBy: [{ lastName: 'asc' }, { firstName: 'asc' }],
  });

  return (
    <main>
      <Container id="list" fluid className="py-3">
        <Row>
          <Col>
            <h1 className="text-center mb-4">List Contacts</h1>
          </Col>
        </Row>

        <Row xs={1} md={2} lg={3} className="g-4">
          {contacts.map((c) => (
            <ContactCard
              key={`Contact-${c.id}`}
              contact={{
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
