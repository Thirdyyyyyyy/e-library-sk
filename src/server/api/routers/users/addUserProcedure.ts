import { z } from 'zod';
import { PrismaClient } from '@prisma/client';

import { publicProcedure } from '~/server/api/trpc';
import { hashPassword } from './shared/passwordHandling/passwordHandling';
// import { Mailer } from '~/server/config/nodemailer';

const prisma = new PrismaClient();

export const addUserProcedure = publicProcedure
  .input(
    z.object({
      email: z.string().email(),
      firstName: z.string(),
      lastName: z.string(),
      password: z.string(),
      agreedToTermsAndConditions: z.boolean(),
    })
  )
  .mutation(async ({ input }) => {
    const { email, firstName, lastName, password, agreedToTermsAndConditions } = input;

    //check if email already exist
    const existingUserData = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUserData) {
      throw new Error('Email already exists');
    }

    const hashedPassword = await hashPassword(password);
    const verificationCode = Math.floor(100000 + Math.random() * 900000);

    //Sending Email for Verification Code
    // const sendEmail = await Mailer(email, verificationCode);

    const user = await prisma.user.create({
      data: {
        email,
        firstName,
        lastName,
        password: hashedPassword,
        isEmailVerified: false,
        userProfile: {
          create: { email: email },
        },
        agreedToTermsAndConditions,
        // userSummary: {
        //   create: { content: 'Edit me' },
        // },
        userEmailVerification: {
          create: {
            email: email,
            isDeleted: false,
            verificationCode: verificationCode,
          },
        },
      },
    });

    return {
      success: true,
      user,
      // emailSent: sendEmail,
    };
  });
