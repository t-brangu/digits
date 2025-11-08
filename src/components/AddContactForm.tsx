'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { redirect } from 'next/navigation';
import LoadingSpinner from '@/components/LoadingSpinner';
import { AddContactSchema } from '@/lib/validationSchemas';
import { addContact } from '@/lib/dbActions';

type AddContactData = {
  firstName: string;
  lastName: string;
  address: string;
  image: string;
  description: string;
  owner: string;
};

const AddContactForm: React.FC = () => {
  const { data: session, status } = useSession();
  const currentUser = session?.user?.email || '';

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<AddContactData>({
    resolver: yupResolver(AddContactSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      address: '',
      image: '',
      description: '',
      owner: currentUser, // initial value; will be re-set once session loads
    },
  });

  // keep owner synced with the signed-in user
  useEffect(() => {
    if (status === 'authenticated' && currentUser) {
      setValue('owner', currentUser, { shouldValidate: true });
    }
  }, [status, currentUser, setValue]);

  if (status === 'loading') return <LoadingSpinner />;
  if (status === 'unauthenticated') redirect('/auth/signin');

  const onSubmit = async (data: AddContactData) => {
    await addContact(data); // redirects to /list
  };

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Col className="text-center"><h2>Add Contact</h2></Col>
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

                  {/* Row 2: Address / Image (side-by-side) */}
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

                  {/* Row 3: Description full width */}
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

                {/* Hidden field WITHOUT value= so reset() works */}
                <input type="hidden" {...register('owner')} />

                <Row className="pt-3">
                  <Col>
                    <Button type="submit" variant="primary">Submit</Button>
                  </Col>
                  <Col className="text-end">
                    <Button type="button" variant="warning" onClick={() => reset()}>
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

export default AddContactForm;
