import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';
import { loggedInProtectedPage } from '@/lib/page-protection';
import AddContactForm from '@/components/AddContactForm';

const AddPage = async () => {
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(session as any);

  return (
    <main>
      <AddContactForm />
    </main>
  );
};

export default AddPage;
