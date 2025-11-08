// src/lib/dbActions.ts

'use server';

import type {
  Stuff,
  Condition as PrismaCondition,
  Contact as PrismaContact,
  Note as PrismaNote,
} from '@prisma/client';
import { hash } from 'bcrypt';
import { redirect } from 'next/navigation';
import { prisma } from './prisma';

/** ------------------------ Stuff ------------------------ */

export async function addStuff(stuff: {
  name: string; quantity: number; owner: string; condition: string;
}) {
  // map string -> enum
  let condition: PrismaCondition = 'good';
  if (stuff.condition === 'poor') condition = 'poor';
  else if (stuff.condition === 'excellent') condition = 'excellent';
  else condition = 'fair';

  await prisma.stuff.create({
    data: { name: stuff.name, quantity: stuff.quantity, owner: stuff.owner, condition },
  });
  redirect('/list');
}

export async function editStuff(stuff: Stuff) {
  await prisma.stuff.update({
    where: { id: stuff.id },
    data: {
      name: stuff.name, quantity: stuff.quantity, owner: stuff.owner, condition: stuff.condition,
    },
  });
  redirect('/list');
}

export async function deleteStuff(id: number) {
  await prisma.stuff.delete({ where: { id } });
  redirect('/list');
}

/** ------------------------ Users ------------------------ */

export async function createUser(credentials: { email: string; password: string }) {
  const password = await hash(credentials.password, 10);
  await prisma.user.create({ data: { email: credentials.email, password } });
}

export async function changePassword(credentials: { email: string; password: string }) {
  const password = await hash(credentials.password, 10);
  await prisma.user.update({ where: { email: credentials.email }, data: { password } });
}

/** ------------------------ Contacts ------------------------ */

export async function addContact(contact: {
  firstName: string;
  lastName: string;
  address: string;
  image: string;
  description: string;
  owner: string; // must be provided (from session)
}) {
  await prisma.contact.create({ data: contact });
  redirect('/list');
}

export async function editContact(contact: PrismaContact) {
  await prisma.contact.update({
    where: { id: contact.id },
    data: {
      firstName: contact.firstName,
      lastName: contact.lastName,
      address: contact.address,
      image: contact.image,
      description: contact.description,
      owner: contact.owner,
    },
  });
  redirect('/list');
}

/** ------------------------ Notes ------------------------ */

export async function addNote(payload: { note: string; contactId: number; owner: string }) {
  // guardrails to avoid empty notes and ensure numeric contactId
  const text = (payload.note || '').trim();
  if (!text) {
    redirect('/list'); // or simply return; but redirect keeps UX consistent with your other actions
  }

  await prisma.note.create({
    data: {
      note: text,
      contactId: Number(payload.contactId),
      owner: payload.owner,
      // createdAt is set automatically by Prisma default(now())
    },
  });

  redirect('/list');
}
