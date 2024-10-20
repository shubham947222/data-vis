// import NextAuth from 'next-auth';
// import Providers from 'next-auth/providers';

// export default NextAuth({
//     providers: [
//         Providers.Credentials({
//             name: 'Credentials',
//             authorize: async (credentials) => {
//                 // Custom authentication logic here
//                 const user = { id: 1, name: 'John Doe' };
//                 return Promise.resolve(user);
//             },
//         }),
//     ],
//     session: {
//         jwt: true,
//     },
// });
