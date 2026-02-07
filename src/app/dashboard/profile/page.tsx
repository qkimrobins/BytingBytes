import { UserProfileCard } from '@/components/dashboard/user-profile-card';
import { TeamMembersCard } from '@/components/dashboard/team-members-card';

export default function ProfilePage() {
  // In a real app, you'd get the user role from a hook like useUser()
  const userRole = 'admin'; // or 'member'

  return (
    <div className="grid gap-4 md:gap-8">
      <UserProfileCard />
      {userRole === 'admin' && <TeamMembersCard />}
    </div>
  );
}
