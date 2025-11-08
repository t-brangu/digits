'use client';

import Link from 'next/link';
import { Card, Col, Image, ListGroup } from 'react-bootstrap';
import AddNoteForm from '@/components/AddNoteForm';
import NoteItem from '@/components/NoteItem';

type NoteShape = { id: number; note: string; createdAt: Date | string };

type ContactCardProps = {
  contact: {
    id: number;
    firstName: string;
    lastName: string;
    address: string;
    image: string;
    description: string;
  };
  notes: NoteShape[];
};

const ContactCard = ({ contact, notes }: ContactCardProps) => (
  <Col>
    <Card className="h-100">
      {/* HEADER */}
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

        <ListGroup variant="flush" className="mt-3 mb-3">
          {notes.map((n) => (
            <NoteItem key={n.id} note={n} />
          ))}
        </ListGroup>

        <AddNoteForm contactId={contact.id} />

      </Card.Body>

      <Card.Footer>
        <Link href={`/edit/${contact.id}`}>Edit</Link>
      </Card.Footer>
    </Card>
  </Col>
);

export default ContactCard;
