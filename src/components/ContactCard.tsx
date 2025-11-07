'use client';

import Link from 'next/link';
import { Card, Col, Image } from 'react-bootstrap';

// Include id so we can build /edit/<id> links
type ContactCardProps = {
  contact: {
    id: number;
    firstName: string;
    lastName: string;
    address: string;
    image: string;
    description: string;
  };
};

const ContactCard = ({ contact }: ContactCardProps) => (
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
            {contact.lastName}
          </Card.Title>
          <Card.Subtitle className="text-muted">
            {contact.address}
          </Card.Subtitle>
        </div>
      </Card.Header>

      <Card.Body>
        <Card.Text>{contact.description}</Card.Text>
      </Card.Body>

      {/* NEW: footer with Edit link */}
      <Card.Footer>
        <Link href={`/edit/${contact.id}`}>Edit</Link>
      </Card.Footer>
    </Card>
  </Col>
);

export default ContactCard;
