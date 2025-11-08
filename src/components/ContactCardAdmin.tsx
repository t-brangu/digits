'use client';

import { Card, Col, Image, ListGroup } from 'react-bootstrap';
import NoteItem from '@/components/NoteItem';

// Replace with `import type { Note } from '@prisma/client'` once Prisma is generated.
type NoteShape = { id: number; note: string; createdAt: Date | string; contactId: number };

type AdminContact = {
  id: number;
  firstName: string;
  lastName: string;
  address: string;
  image: string;
  description: string;
  owner: string;
};

const ContactCardAdmin = ({ contact, notes }: { contact: AdminContact; notes: NoteShape[] }) => (
  <Col>
    <Card className="h-100">
      <Card.Header className="d-flex align-items-center gap-3">
        <Image
          src={contact.image}
          alt={`${contact.firstName} ${contact.lastName}`}
          width={60}
          height={60}
          rounded
        />
        <div>
          <Card.Title className="mb-0">
            {contact.firstName}
            {' '}
            {contact.lastName}
          </Card.Title>
          <Card.Subtitle className="text-muted">{contact.address}</Card.Subtitle>
        </div>
      </Card.Header>

      <Card.Body>
        <Card.Text>{contact.description}</Card.Text>
        <p className="blockquote-footer mb-3">{contact.owner}</p>

        {/* Notes list (admin sees them too) */}
        <ListGroup variant="flush">
          {notes.map((n) => (
            <NoteItem key={n.id} note={n} />
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  </Col>
);

export default ContactCardAdmin;
