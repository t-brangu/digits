'use client';

/* eslint-disable react/prop-types */

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { redirect } from 'next/navigation';
import LoadingSpinner from '@/components/LoadingSpinner';
import { EditContactSchema } from '@/lib/validationSchemas';
import { editContact } from '@/lib/dbActions';

type EditContactData = {
  id: number;
  firstName: string;
  lastName: string;
  address: string;
  image: string;
  description: string;
  owner: string;
};

const EditContactForm: React.FC<{ contact: EditContactData }> = ({ contact }) => {
  const { data: session, status } = useSession();
  const currentUser = session?.user?.email || '';

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditContactData>({
    resolver: yupResolver(EditContactSchema),
    defaultValues: {
      id: contact.id,
      firstName: contact.firstName,
      lastName: contact.lastName,
      address: contact.address,
      image: contact.image,
      description: contact.description,
      owner: contact.owner ?? currentUser,
    },
  });

  // keep defaults in sync (also powers Reset)
  useEffect(() => {
    reset({
      id: contact.id,
      firstName: contact.firstName,
      lastName: contact.lastName,
      address: contact.address,
      image: contact.image,
      description: contact.description,
      owner: contact.owner ?? currentUser,
    });
  }, [contact, currentUser, reset]);

  if (status === 'loading') return <LoadingSpinner />;
  if (status === 'unauthenticated') redirect('/auth/signin');

  const onSubmit = async (data: EditContactData) => {
    await editContact(data); // redirects to /list
  };

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Col className="text-center"><h2>Edit Contact</h2></Col>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Row className="g-3">
                  {/* Row 1: First / Last */}
                  <Col md={6}>
                    <Form.Label>First Name</Form.Label>
                    <input
                      {...register('firstName')}
                      className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.firstName?.message}</div>
                  </Col>
                  <Col md={6}>
                    <Form.Label>Last Name</Form.Label>
                    <input
                      {...register('lastName')}
                      className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.lastName?.message}</div>
                  </Col>

                  {/* Row 2: Address / Image */}
                  <Col md={6}>
                    <Form.Label>Address</Form.Label>
                    <input
                      {...register('address')}
                      className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.address?.message}</div>
                  </Col>
                  <Col md={6}>
                    <Form.Label>Image</Form.Label>
                    <input
                      {...register('image')}
                      className={`form-control ${errors.image ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.image?.message}</div>
                  </Col>

                  {/* Row 3: Description */}
                  <Col md={12}>
                    <Form.Label>Description</Form.Label>
                    <textarea
                      rows={4}
                      {...register('description')}
                      className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.description?.message}</div>
                  </Col>
                </Row>

                {/* hidden fields WITHOUT value= so reset() can work */}
                <input type="hidden" {...register('id')} />
                <input type="hidden" {...register('owner')} />

                <Row className="pt-3">
                  <Col>
                    <Button type="submit" variant="primary">Submit</Button>
                  </Col>
                  <Col className="text-end">
                    <Button
                      type="button"
                      variant="warning"
                      onClick={() => reset({
                        id: contact.id,
                        firstName: contact.firstName,
                        lastName: contact.lastName,
                        address: contact.address,
                        image: contact.image,
                        description: contact.description,
                        owner: contact.owner ?? currentUser,
                      })}
                    >
                      Reset
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EditContactForm;
