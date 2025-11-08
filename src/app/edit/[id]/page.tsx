import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import authOptions from '@/lib/authOptions';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { prisma } from '@/lib/prisma';
import EditContactForm from '@/components/EditContactForm';

export default async function EditContactPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(session as any);

  const id = Number(params.id);
  const contact = await prisma.contact.findUnique({ where: { id } });

  if (!contact) return notFound();

  return (
    <main>
      <EditContactForm contact={contact} />
    </main>
  );
}
