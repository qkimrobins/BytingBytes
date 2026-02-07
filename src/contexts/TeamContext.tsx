'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { z } from 'zod';

const memberSchema = z.object({
  id: z.string(),
  fullName: z.string(),
  email: z.string().email(),
  role: z.string(),
  avatarUrl: z.string(),
});

export type Member = z.infer<typeof memberSchema>;

const addMemberSchema = z.object({
  fullName: z.string().min(1, 'Full name is required.'),
  email: z.string().email('Please enter a valid email.'),
  role: z.string().min(1, 'Role is required.'),
});

type TeamContextType = {
  teamMembers: Member[];
  addMember: (member: z.infer<typeof addMemberSchema>) => void;
  editMember: (id: string, updatedMember: z.infer<typeof addMemberSchema>) => void;
  removeMember: (memberId: string) => void;
};

const initialMembers: Member[] = [
  { id: '1', fullName: 'Robins Yadav', email: 'robby@gmail.com', role: 'Admin', avatarUrl: 'https://picsum.photos/seed/avatar1/100/100' },
  { id: '2', fullName: 'Jane Smith', email: 'jane.smith@example.com', role: 'Member', avatarUrl: 'https://picsum.photos/seed/avatar2/100/100' },
  { id: '3', fullName: 'Sam Wilson', email: 'sam.wilson@example.com', role: 'Member', avatarUrl: 'https://picsum.photos/seed/avatar3/100/100' },
];

const TeamContext = createContext<TeamContextType | undefined>(undefined);

export function TeamProvider({ children }: { children: ReactNode }) {
  const [teamMembers, setTeamMembers] = useState<Member[]>(initialMembers);

  const addMember = (member: z.infer<typeof addMemberSchema>) => {
    const newMember: Member = { ...member, id: Date.now().toString(), avatarUrl: `https://picsum.photos/seed/${member.fullName}/100/100` };
    setTeamMembers(prev => [...prev, newMember]);
  };

  const editMember = (id: string, updatedMemberData: z.infer<typeof addMemberSchema>) => {
     setTeamMembers(prev => prev.map(member => 
        member.id === id ? { ...member, ...updatedMemberData } : member
    ));
  };
  
  const removeMember = (memberId: string) => {
    setTeamMembers(prev => prev.filter(member => member.id !== memberId));
  };

  return (
    <TeamContext.Provider value={{ teamMembers, addMember, editMember, removeMember }}>
      {children}
    </TeamContext.Provider>
  );
}

export function useTeam() {
  const context = useContext(TeamContext);
  if (context === undefined) {
    throw new Error('useTeam must be used within a TeamProvider');
  }
  return context;
}
