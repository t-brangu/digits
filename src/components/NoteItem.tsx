'use client';

import { ListGroup } from 'react-bootstrap';

// Minimal shape used by the UI
type NoteShape = { id: number; note: string; createdAt: Date | string };

export default function NoteItem({ note }: { note: NoteShape }) {
  const date = new Date(note.createdAt).toLocaleDateString('en-US');
  return (
    <ListGroup.Item>
      <p className="fw-lighter mb-1">{date}</p>
      <p className="mb-0">{note.note}</p>
    </ListGroup.Item>
  );
}
