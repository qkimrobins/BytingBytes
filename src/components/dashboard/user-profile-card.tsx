'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { EditProfileDialog } from './edit-profile-dialog';
import { z } from 'zod';
import { editProfileSchema } from '@/lib/schemas';

const initialUser = {
  fullName: 'Robins Yadav',
  email: 'robby@gmail.com',
  role: 'Admin',
  avatarUrl: 'https://picsum.photos/seed/avatar1/100/100',
};

export function UserProfileCard() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(initialUser);

  const handleUpdateProfile = (profile: z.infer<typeof editProfileSchema>) => {
    setCurrentUser(prev => ({...prev, fullName: profile.fullName}));
  };

  return (
    <>
      <EditProfileDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onUpdateProfile={handleUpdateProfile}
        defaultValues={{ fullName: currentUser.fullName }}
      />
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">My Profile</CardTitle>
          <CardDescription>Your personal information and role within the team.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row items-center gap-6">
          <Avatar className="h-24 w-24">
            <AvatarImage src={currentUser.avatarUrl} alt={currentUser.fullName} />
            <AvatarFallback>{currentUser.fullName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <h2 className="text-2xl font-semibold">{currentUser.fullName}</h2>
              <Badge variant={currentUser.role === 'Admin' ? 'default' : 'secondary'}>
                {currentUser.role}
              </Badge>
            </div>
            <p className="text-muted-foreground">{currentUser.email}</p>
            <Button variant="outline" className="mt-4" onClick={() => setIsDialogOpen(true)}>Edit Profile</Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
