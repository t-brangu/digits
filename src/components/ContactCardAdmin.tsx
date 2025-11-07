'use client';

import { Card, Col, Image } from 'react-bootstrap';

type AdminContact = {
  firstName: string;
  lastName: string;
  address: string;
  image: string;
  description: string;
  owner: string;
};

const ContactCardAdmin = ({ contact }: { contact: AdminContact }) => (
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
        <p className="blockquote-footer mb-0">{contact.owner}</p>
      </Card.Body>
    </Card>
  </Col>
);

export default ContactCardAdmin;
