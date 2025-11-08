'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Button, Card, Form as RBForm } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AddNoteSchema } from '@/lib/validationSchemas';
import { addNote } from '@/lib/dbActions';

type AddNoteData = {
  note: string;
  contactId: number;
  owner: string;
};

export default function AddNoteForm({ contactId }: { contactId: number }) {
  const { data: session } = useSession();
  const currentUser = (session?.user?.email as string) || '';

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<AddNoteData>({
    resolver: yupResolver(AddNoteSchema),
    defaultValues: { note: '', contactId, owner: currentUser },
  });

  // keep owner/contactId synced just in case
  useEffect(() => {
    setValue('contactId', contactId, { shouldValidate: false });
  }, [contactId, setValue]);

  useEffect(() => {
    if (currentUser) {
      setValue('owner', currentUser, { shouldValidate: false });
    }
  }, [currentUser, setValue]);

  const onSubmit = async (data: AddNoteData) => {
    await addNote(data);
  };

  return (
    <Card className="mt-3">
      <Card.Header className="py-2">Add Timestamped Note</Card.Header>
      <Card.Body>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <RBForm.Group className="mb-3">
            <RBForm.Label>Note</RBForm.Label>
            <input
              {...register('note')}
              className={`form-control ${errors.note ? 'is-invalid' : ''}`}
              autoComplete="off"
            />
            <div className="invalid-feedback">{errors.note?.message}</div>
          </RBForm.Group>

          <input type="hidden" {...register('contactId', { valueAsNumber: true })} />
          <input type="hidden" {...register('owner')} />
          <div className="d-flex">
            <Button type="submit" disabled={isSubmitting}>
              Submit
            </Button>

            <Button
              type="button"
              variant="warning"
              style={{ marginLeft: '125px' }}
              onClick={() => reset({ note: '', contactId, owner: currentUser })}
            >
              Reset
            </Button>
          </div>
        </form>
      </Card.Body>
    </Card>
  );
}
