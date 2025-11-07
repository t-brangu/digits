import { getServerSession } from 'next-auth';
import { Col, Container, Row } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import { adminProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';
import ContactCardAdmin from '@/components/ContactCardAdmin';

const AdminPage = async () => {
  const session = await getServerSession(authOptions);
  adminProtectedPage(session as any);

  const contacts = await prisma.contact.findMany({
    orderBy: [{ lastName: 'asc' }, { firstName: 'asc' }],
  });

  return (
    <main>
      <Container id="admin" fluid className="py-3">
        <Row>
          <Col>
            <h1 className="text-center mb-4">List Contacts (Admin)</h1>
          </Col>
        </Row>

        <Row xs={1} md={2} lg={3} className="g-4">
          {contacts.map((c) => (
            <ContactCardAdmin
              key={`ContactAdmin-${c.id}`}
              contact={{
                firstName: c.firstName,
                lastName: c.lastName,
                address: c.address,
                image: c.image,
                description: c.description,
                owner: c.owner,
              }}
            />
          ))}
        </Row>
      </Container>
    </main>
  );
};

export default AdminPage;
